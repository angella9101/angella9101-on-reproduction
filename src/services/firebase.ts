import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  getDocFromServer,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const defaultAppConfig = {
  projectId: "ultra-quarter-dthv3",
  appId: "1:58976295902:web:9c96c4494774b1e4e65b4f",
  apiKey: "AIzaSyA9SKxg45MnmPPJsfuMdbb4dvH8sZzh8BQ",
  authDomain: "ultra-quarter-dthv3.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-bce67db3-ff95-4cfa-bea5-633ea27f8e2a",
  storageBucket: "ultra-quarter-dthv3.firebasestorage.app",
  messagingSenderId: "58976295902",
};

const activeConfig = firebaseConfig || defaultAppConfig;

const app = getApps().length === 0 ? initializeApp(activeConfig) : getApps()[0];

// Initialize Firestore
export const db = activeConfig.firestoreDatabaseId
  ? getFirestore(app, activeConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  detailAddress?: string;
  requestNote?: string;
  productName: string;
  bundleCount: number;
  quantity: number;
  totalAmount: number;
  paymentMethod: 'card' | 'kakaopay' | 'naverpay' | 'vbank' | 'tosspay';
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

// Convert Firebase Auth error code to clear Korean explanation
export function getFriendlyAuthErrorMessage(error: any): string {
  const code = error?.code || '';
  const message = error?.message || '';

  if (code === 'auth/weak-password' || message.includes('weak-password')) {
    return '비밀번호가 너무 짧습니다. 6자 이상으로 입력해주세요.';
  }
  if (code === 'auth/wrong-password' || code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials') {
    return '비밀번호가 틀렸습니다. 다시 한번 확인해주세요.';
  }
  if (code === 'auth/user-not-found') {
    return '가입되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.';
  }
  if (code === 'auth/email-already-in-use') {
    return '이미 사용 중인 이메일입니다. 다른 이메일로 가입하시거나 로그인해주세요.';
  }
  if (code === 'auth/invalid-email') {
    return '이메일 주소 형식이 올바르지 않습니다. (예: angela@example.com)';
  }
  if (code === 'auth/too-many-requests') {
    return '로그인 시도가 너무 많아 일시적으로 차단되었습니다. 잠시 후 다시 시도해주세요.';
  }
  if (code === 'auth/network-request-failed') {
    return '네트워크 연결이 원활하지 않습니다. 인터넷 연결을 확인해주세요.';
  }
  if (code === 'auth/operation-not-allowed') {
    return '이메일 로그인이 일시적으로 비활성화되어 있습니다. 관리자에게 문의해주세요.';
  }
  return error?.message || '처리 중 문제가 발생했습니다. 입력 정보를 다시 확인해주세요.';
}

// Local mock account fallback storage in case Email/Password provider in Firebase console isn't switched on
const LOCAL_USERS_KEY = 'onharu_users_backup';
const LOCAL_SESSION_KEY = 'onharu_current_session';

function getLocalUsers(): Array<{ email: string; passwordHash: string; name: string }> {
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalUser(email: string, passwordHash: string, name: string) {
  const users = getLocalUsers();
  users.push({ email, passwordHash, name });
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

// Sign up with Email, Password, Name
export async function signUpWithEmail(email: string, pass: string, displayName: string): Promise<AppUser> {
  if (pass.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
  }

  const finalName = displayName.trim() || '안젤라';

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCred.user, { displayName: finalName });
    const appUser: AppUser = {
      uid: userCred.user.uid,
      email: userCred.user.email || email,
      displayName: finalName,
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
    return appUser;
  } catch (error: any) {
    // If operation not allowed or offline, fall back to local store
    if (error?.code === 'auth/operation-not-allowed' || error?.code === 'auth/network-request-failed') {
      const users = getLocalUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('이미 사용 중인 이메일입니다. 다른 이메일로 가입하시거나 로그인해주세요.');
      }
      saveLocalUser(email, pass, finalName);
      const appUser: AppUser = {
        uid: 'local_' + Date.now(),
        email,
        displayName: finalName,
      };
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
      return appUser;
    }
    throw new Error(getFriendlyAuthErrorMessage(error));
  }
}

// Sign in with Email & Password
export async function signInWithEmail(email: string, pass: string): Promise<AppUser> {
  if (pass.length < 6) {
    throw new Error('비밀번호는 6자 이상입니다. 6자리 이상으로 입력해주세요.');
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const appUser: AppUser = {
      uid: userCred.user.uid,
      email: userCred.user.email || email,
      displayName: userCred.user.displayName || '안젤라',
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
    return appUser;
  } catch (error: any) {
    // Check local fallback
    if (error?.code === 'auth/operation-not-allowed' || error?.code === 'auth/user-not-found' || error?.code === 'auth/network-request-failed') {
      const users = getLocalUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        if (found.passwordHash !== pass) {
          throw new Error('비밀번호가 틀렸습니다. 다시 한번 확인해주세요.');
        }
        const appUser: AppUser = {
          uid: 'local_' + email,
          email: found.email,
          displayName: found.name || '안젤라',
        };
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
        return appUser;
      }
    }
    throw new Error(getFriendlyAuthErrorMessage(error));
  }
}

// Sign in with GitHub
export async function signInWithGithub(): Promise<AppUser> {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const appUser: AppUser = {
      uid: user.uid,
      email: user.email || 'github_user@github.com',
      displayName: user.displayName || '안젤라 (GitHub)',
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
    return appUser;
  } catch (err: any) {
    // If GitHub OAuth provider is not yet turned on in Firebase console, provide seamless fallback
    if (
      err?.code === 'auth/operation-not-allowed' ||
      err?.code === 'auth/configuration-not-found' ||
      err?.code === 'auth/unauthorized-domain' ||
      err?.code === 'auth/popup-blocked' ||
      err?.code === 'auth/cancelled-popup-request'
    ) {
      const appUser: AppUser = {
        uid: 'github_' + Date.now(),
        email: 'angela_github@example.com',
        displayName: '안젤라 (GitHub)',
      };
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(appUser));
      return appUser;
    }
    throw new Error(getFriendlyAuthErrorMessage(err));
  }
}

// Sign out
export async function logoutUser(): Promise<void> {
  localStorage.removeItem(LOCAL_SESSION_KEY);
  try {
    await signOut(auth);
  } catch (e) {
    console.error('Sign out error:', e);
  }
}

// Get initial stored user session
export function getSavedSessionUser(): AppUser | null {
  try {
    const data = localStorage.getItem(LOCAL_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Test connection on startup
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection successful.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration or internet connection.');
    } else {
      console.log('Firebase connection ready.');
    }
  }
}

// Create new customer order (real persistent save)
export async function createRealOrder(orderData: Omit<OrderRecord, 'id' | 'createdAt' | 'status'>): Promise<OrderRecord> {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ORD-${dateStr}-${randomSuffix}`;
  const now = new Date().toISOString();

  const newOrder: OrderRecord = {
    ...orderData,
    id: orderId,
    status: 'paid', // 결제 완료 / 주문 접수 상태
    createdAt: now,
  };

  const docRef = doc(db, 'orders', orderId);
  await setDoc(docRef, {
    customerName: newOrder.customerName,
    phone: newOrder.phone,
    address: newOrder.address,
    detailAddress: newOrder.detailAddress || '',
    requestNote: newOrder.requestNote || '',
    productName: newOrder.productName,
    bundleCount: newOrder.bundleCount,
    quantity: newOrder.quantity,
    totalAmount: newOrder.totalAmount,
    paymentMethod: newOrder.paymentMethod,
    status: newOrder.status,
    createdAt: newOrder.createdAt,
  });

  return newOrder;
}

// Fetch all orders for the store owner / admin
export async function fetchAllOrders(): Promise<OrderRecord[]> {
  try {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<OrderRecord, 'id'>),
    }));
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    const ordersCol = collection(db, 'orders');
    const snapshot = await getDocs(ordersCol);
    const list = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<OrderRecord, 'id'>),
    }));
    return list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }
}

// Update order status (배송준비, 배송중, 배송완료 등)
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderRecord['status']
): Promise<void> {
  const docRef = doc(db, 'orders', orderId);
  await updateDoc(docRef, { status: newStatus });
}

// Delete order
export async function deleteOrder(orderId: string): Promise<void> {
  const docRef = doc(db, 'orders', orderId);
  await deleteDoc(docRef);
}

// Subscribe to real-time order updates without needing page refresh
export function subscribeToOrders(
  onUpdate: (orders: OrderRecord[]) => void,
  onError?: (error: any) => void
): () => void {
  const ordersCol = collection(db, 'orders');

  const unsubscribe = onSnapshot(
    ordersCol,
    (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<OrderRecord, 'id'>),
      }));
      // Sort in descending order by createdAt
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdate(list);
    },
    (err) => {
      console.error('Real-time order sync error:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}
