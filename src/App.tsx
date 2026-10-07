import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientSection } from './components/IngredientSection';
import { RecommendSection } from './components/RecommendSection';
import { HowToDrinkSection } from './components/HowToDrinkSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { GithubModal } from './components/GithubModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { MAIN_PRODUCT } from './data/saengsikData';
import {
  testFirestoreConnection,
  getSavedSessionUser,
  logoutUser,
  AppUser,
  auth,
} from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => getSavedSessionUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState('주문하시려면 먼저 로그인 또는 회원가입을 진행해주세요.');

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const [orderBundleCount, setOrderBundleCount] = useState(1);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderTotalAmount, setOrderTotalAmount] = useState(MAIN_PRODUCT.salePrice);

  // Store pending order parameters if auth was needed
  const [pendingOrder, setPendingOrder] = useState<{
    bundleCount: number;
    quantity: number;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    // Validate connection to Firestore on boot
    testFirestoreConnection();

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '안젤라',
        };
        setCurrentUser(appUser);
      }
    });

    return () => unsubscribe();
  }, []);

  // When user clicks general "주문하기" button (Header, Hero, StickyBar)
  const handleOpenOrderDefault = () => {
    if (!currentUser) {
      setPendingOrder({
        bundleCount: 1,
        quantity: 1,
        totalAmount: MAIN_PRODUCT.salePrice,
      });
      setAuthReason('주문하시려면 먼저 로그인 또는 회원가입을 진행해주세요.');
      setIsAuthModalOpen(true);
      return;
    }

    const orderElem = document.getElementById('order');
    if (orderElem) {
      orderElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsOrderModalOpen(true);
    }
  };

  // When user clicks "주문하기" from Product section with custom bundle/quantity
  const handleOpenOrderWithData = (bundleCount: number, quantity: number, totalAmount: number) => {
    setOrderBundleCount(bundleCount);
    setOrderQuantity(quantity);
    setOrderTotalAmount(totalAmount);

    if (!currentUser) {
      setPendingOrder({ bundleCount, quantity, totalAmount });
      setAuthReason('주문하시려면 먼저 로그인 또는 회원가입을 진행해주세요.');
      setIsAuthModalOpen(true);
      return;
    }

    setIsOrderModalOpen(true);
  };

  // Handle successful login or signup
  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    // If user was in the process of ordering, open the order modal immediately!
    if (pendingOrder) {
      setOrderBundleCount(pendingOrder.bundleCount);
      setOrderQuantity(pendingOrder.quantity);
      setOrderTotalAmount(pendingOrder.totalAmount);
      setPendingOrder(null);
      setIsOrderModalOpen(true);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#242A20] flex flex-col font-sans selection:bg-[#2D5A27] selection:text-white">
      {/* Top Navigation with "안젤라님 환영합니다." */}
      <Header
        currentUser={currentUser}
        onOpenOrder={handleOpenOrderDefault}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenAuth={() => {
          setPendingOrder(null);
          setAuthReason('');
          setIsAuthModalOpen(true);
        }}
        onOpenGithub={() => setIsGithubModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero with '하루한잔. 간편한 한끼' & Large CTA */}
        <Hero onOpenOrder={handleOpenOrderDefault} />

        {/* 2. 국내산 50가지 곡물, 채소로 만들었다는 소개 */}
        <IngredientSection />

        {/* 3. 이런분들께 좋아요 (3가지) */}
        <RecommendSection onOpenOrder={handleOpenOrderDefault} />

        {/* 4. 물이나 우유에 타서 드세요 (1 -> 2 -> 3 순서 표시) */}
        <HowToDrinkSection />

        {/* 5. 상품 1개와 가격, 주문하기 버튼 */}
        <ProductOrderSection onOpenOrderWithData={handleOpenOrderWithData} />

        {/* 6. FAQ & 안심 안내 */}
        <FaqSection />
      </main>

      {/* Footer with statutory notices & customer center */}
      <Footer
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenGithub={() => setIsGithubModalOpen(true)}
      />

      {/* Mobile Sticky Order Bar */}
      <StickyBottomBar onOpenOrder={handleOpenOrderDefault} />

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        reason={authReason}
      />

      {/* Customer Real Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        bundleCount={orderBundleCount}
        quantity={orderQuantity}
        totalAmount={orderTotalAmount}
        currentUser={currentUser}
      />

      {/* Store Owner Admin Orders Dashboard */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* GitHub Repository Connection Modal */}
      <GithubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}
