import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Wallet,
  Building2,
  Lock,
} from 'lucide-react';
import { MAIN_PRODUCT } from '../data/saengsikData';
import { createRealOrder, OrderRecord, AppUser } from '../services/firebase';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundleCount: number;
  quantity: number;
  totalAmount: number;
  currentUser?: AppUser | null;
  onOrderCompleted?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  bundleCount,
  quantity,
  totalAmount,
  currentUser,
  onOrderCompleted,
}) => {
  // Step navigation: 1 = Shipping info, 2 = Simulated Payment, 3 = Completed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Shipping Form State
  const [name, setName] = useState(currentUser?.displayName || '안젤라');
  const [phone, setPhone] = useState('010-1234-5678');
  const [address, setAddress] = useState('서울특별시 강남구 테헤란로 152');
  const [detailAddress, setDetailAddress] = useState('온하루빌딩 3층');
  const [requestNote, setRequestNote] = useState('문 앞에 놓아주세요');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'naverpay' | 'kakaopay' | 'tosspay' | 'vbank'>('card');
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('777');
  const [cardOwner, setCardOwner] = useState(currentUser?.displayName || '안젤라');
  const [installment, setInstallment] = useState('일시불');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync name when user changes
  useEffect(() => {
    if (currentUser?.displayName) {
      setName(currentUser.displayName);
      setCardOwner(currentUser.displayName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // Step 1: Validate shipping and proceed to payment screen
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('받으시는 분 성함을 입력해주세요.');
      return;
    }
    if (!phone.trim()) {
      alert('연락처(휴대폰 번호)를 입력해주세요.');
      return;
    }
    if (!address.trim()) {
      alert('배송지 주소를 입력해주세요.');
      return;
    }

    setErrorMessage(null);
    setStep(2);
  };

  // Step 2: Execute simulated fake payment and create order
  const handleExecutePayment = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Simulate real bank/PG network latency (1.2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const order = await createRealOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        detailAddress: detailAddress.trim(),
        requestNote: requestNote.trim(),
        productName: '온하루 50곡 자연생식',
        bundleCount,
        quantity,
        totalAmount,
        paymentMethod,
      });

      setCompletedOrder(order);
      setStep(3);
      if (onOrderCompleted) {
        onOrderCompleted();
      }
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(
        '결제 처리 중 오류가 발생했습니다. (' + (err?.message || 'DB Error') + ')'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setCompletedOrder(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F0] w-full max-w-xl rounded-3xl border-2 border-[#D9CDB7] shadow-2xl overflow-hidden my-6 relative">
        {/* Header */}
        <div className="bg-[#2D5A27] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded text-white">
                {step === 1 && '1단계: 배송 정보'}
                {step === 2 && '2단계: 연습용 가짜 결제'}
                {step === 3 && '3단계: 주문완료'}
              </span>
              <span className="text-xs text-[#BFDEB8]">온하루 50곡 자연생식</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              {step === 1 && '주문서 및 배송지 작성'}
              {step === 2 && '결제하기 (연습용 가짜 결제)'}
              {step === 3 && '주문이 완료되었습니다!'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ---------------- STEP 1: 배송지 작성 ---------------- */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-5">
            {/* Order Item Summary */}
            <div className="bg-white rounded-2xl p-4 border border-[#DFD4C0] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#2D5A27] bg-[#E8F2E6] px-2 py-0.5 rounded">
                  무료배송 + 전용보틀 증정
                </span>
                <h5 className="font-extrabold text-lg text-[#1E3719] mt-1">
                  온하루 50곡 자연생식 ({bundleCount}박스)
                </h5>
                <p className="text-sm text-[#6C7767]">수량: {quantity}개 / 총 {bundleCount * 30 * quantity}포</p>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-[#2D5A27]">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>

            {currentUser && (
              <div className="bg-[#EBF3E8] border border-[#CFE0CC] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#234C1E] flex items-center justify-between">
                <span>✨ 회원 주문: <strong>{currentUser.displayName || '안젤라'}님 계정</strong></span>
                <span className="text-xs text-[#5D7057]">{currentUser.email}</span>
              </div>
            )}

            {/* Recipient Input Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#243720] mb-1">
                  받으시는 분 성함 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white px-4 py-3 sm:py-3.5 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-[#243720] mb-1">
                  연락처 (휴대폰 번호) <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white px-4 py-3 sm:py-3.5 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-[#243720] mb-1">
                  배송지 주소 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="도로명 주소 또는 지번 주소"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white px-4 py-3 sm:py-3.5 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27] mb-2"
                />
                <input
                  type="text"
                  placeholder="상세 주소 (동/호수 등)"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#243720] mb-1">
                  배송 요청사항
                </label>
                <select
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#D5C7B0] text-sm text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                >
                  <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                  <option value="배송 전 미리 연락 바랍니다">배송 전 미리 연락 바랍니다</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                </select>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-5 bg-[#2D5A27] hover:bg-[#20401B] active:scale-[0.98] text-white rounded-2xl font-black text-xl sm:text-2xl shadow-xl shadow-[#2D5A27]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>다음: 결제 화면으로 이동하기</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        )}

        {/* ---------------- STEP 2: 연습용 가짜 결제 화면 ---------------- */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-5">
            {/* PROMINENT WARNING BANNER: "실제로 결제되지 않는 연습용입니다." */}
            <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border-2 border-[#2D5A27] rounded-2xl p-4 sm:p-5 text-center shadow-md">
              <div className="inline-flex items-center gap-2 text-[#1E4319] text-lg sm:text-2xl font-black mb-1">
                <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-[#2D5A27]" />
                <span>실제로 결제되지 않는 연습용입니다.</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3E5538] font-bold">
                ⚠️ 실제 돈이나 카드 대금이 청구되지 않는 모의 결제 화면입니다. 안심하고 테스트하세요.
              </p>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-2xl p-4 border border-[#DFD4C0] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7B8777] block">최종 결제 금액</span>
                <strong className="text-2xl sm:text-3xl font-black text-[#2D5A27]">
                  {totalAmount.toLocaleString()}원
                </strong>
              </div>
              <div className="text-right text-xs text-[#62705D]">
                <span>배송비 0원 (무료배송)</span>
                <span className="block font-medium">받는 분: {name}</span>
              </div>
            </div>

            {/* Payment Method Selector (Card, Naver, Toss, Kakao, VBank) */}
            <div>
              <label className="block text-sm sm:text-base font-extrabold text-[#243720] mb-2.5">
                결제 수단 선택 (네이버, 토스, 카카오페이, 카드 등)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'card', label: '신용/체크카드', icon: '💳' },
                  { id: 'naverpay', label: '네이버페이', icon: '🟢' },
                  { id: 'tosspay', label: '토스페이', icon: '🔵' },
                  { id: 'kakaopay', label: '카카오페이', icon: '🟡' },
                  { id: 'vbank', label: '무통장입금', icon: '🏦' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === pm.id
                        ? 'border-[#2D5A27] bg-[#EEF5EC] text-[#22441D] shadow-xs'
                        : 'border-[#DFD4C0] bg-white text-[#55614F] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    <span className="text-lg">{pm.icon}</span>
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1) CARD PAYMENT VIEW: PREFILLED 1111-2222-3333-4444 */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl p-5 border-2 border-[#D9CDB7] space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-2.5">
                  <span className="text-xs font-bold text-[#2D5A27] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    연습용 가상 카드 정보 (미리 입력됨)
                  </span>
                  <span className="text-[11px] bg-[#E8F2E6] text-[#2D5A27] px-2 py-0.5 rounded font-bold">
                    테스트 모드
                  </span>
                </div>

                {/* Simulated Card Chip Graphic */}
                <div className="bg-gradient-to-r from-[#2D5A27] to-[#3B7533] text-white p-4 rounded-xl shadow-md space-y-3">
                  <div className="flex justify-between items-center text-xs text-[#B9DDB3] font-bold">
                    <span>온하루 안전결제</span>
                    <span>TEST CARD</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-mono tracking-widest font-black text-center py-1">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#DBEED8]">
                    <span>{cardOwner || '안젤라'}</span>
                    <span>{cardExpiry}</span>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-[#626F5E] mb-1">
                      카드번호 (미리 입력됨)
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#FAF7F0] px-4 py-2.5 rounded-xl border border-[#D5C7B0] font-mono text-base font-bold text-[#23381F] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#626F5E] mb-1">
                        유효기간 (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#FAF7F0] px-3 py-2.5 rounded-xl border border-[#D5C7B0] font-mono text-sm font-bold text-[#23381F] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#626F5E] mb-1">
                        CVC 뒷 3자리
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#FAF7F0] px-3 py-2.5 rounded-xl border border-[#D5C7B0] font-mono text-sm font-bold text-[#23381F] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#626F5E] mb-1">
                      할부 기간
                    </label>
                    <select
                      value={installment}
                      onChange={(e) => setInstallment(e.target.value)}
                      className="w-full bg-[#FAF7F0] px-3 py-2.5 rounded-xl border border-[#D5C7B0] text-sm font-bold text-[#23381F]"
                    >
                      <option value="일시불">일시불 (수수료 없음)</option>
                      <option value="2개월">2개월 무이자 할부</option>
                      <option value="3개월">3개월 무이자 할부</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 2) NAVER PAY VIEW */}
            {paymentMethod === 'naverpay' && (
              <div className="bg-[#03C75A]/10 border-2 border-[#03C75A] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-[#03C75A] text-white flex items-center justify-center font-black text-sm">
                    N
                  </span>
                  <strong className="text-base text-[#085C2A]">네이버페이 간편결제 (연습용)</strong>
                </div>
                <p className="text-sm text-[#2B543B] leading-relaxed">
                  네이버 아이디로 등록된 카드/포인트로 안전하게 모의 결제됩니다.<br />
                  <strong>현재 결제 금액: {totalAmount.toLocaleString()}원</strong> (실제 차감 0원)
                </p>
                <div className="bg-white p-3 rounded-xl border border-[#B3E8C8] text-xs text-[#03C75A] font-bold">
                  ✓ 네이버페이 연습용 원클릭 결제 모드가 준비되었습니다.
                </div>
              </div>
            )}

            {/* 3) TOSS PAY VIEW */}
            {paymentMethod === 'tosspay' && (
              <div className="bg-[#0064FF]/10 border-2 border-[#0064FF] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-[#0064FF] text-white flex items-center justify-center font-black text-sm">
                    T
                  </span>
                  <strong className="text-base text-[#0042A6]">토스페이 간편결제 (연습용)</strong>
                </div>
                <p className="text-sm text-[#1B3F73] leading-relaxed">
                  토스 앱 설치나 본인 인증 없이 바로 결제 승인을 테스트할 수 있습니다.<br />
                  <strong>현재 결제 금액: {totalAmount.toLocaleString()}원</strong> (실제 차감 0원)
                </p>
                <div className="bg-white p-3 rounded-xl border border-[#BDD6FF] text-xs text-[#0064FF] font-bold">
                  ✓ 토스페이 가상 승인 모드가 준비되었습니다.
                </div>
              </div>
            )}

            {/* 4) KAKAO PAY VIEW */}
            {paymentMethod === 'kakaopay' && (
              <div className="bg-[#FEE500]/20 border-2 border-[#E5CE00] rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-[#FEE500] text-[#191919] flex items-center justify-center font-black text-sm">
                    K
                  </span>
                  <strong className="text-base text-[#473E00]">카카오페이 간편결제 (연습용)</strong>
                </div>
                <p className="text-sm text-[#5C5000] leading-relaxed">
                  카카오톡 메시지 승인 대기 없이 바로 모의 결제가 처리됩니다.<br />
                  <strong>현재 결제 금액: {totalAmount.toLocaleString()}원</strong> (실제 차감 0원)
                </p>
                <div className="bg-white p-3 rounded-xl border border-[#ECE078] text-xs text-[#635700] font-bold">
                  ✓ 카카오페이 가상 머니 결제 준비 완료
                </div>
              </div>
            )}

            {/* 5) VBANK VIEW */}
            {paymentMethod === 'vbank' && (
              <div className="bg-white border-2 border-[#D9CDB7] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#2D5A27]" />
                  <strong className="text-base text-[#243A1E]">무통장입금 / 가상계좌 (연습용)</strong>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6755] leading-relaxed">
                  신한은행 110-123-456789 (예금주: 주식회사 온하루)<br />
                  (연습용이므로 실제로 입금하지 않으셔도 즉시 결제완료 처리됩니다.)
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons: Back to Step 1 & Big "결제하기" */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isSubmitting}
                className="w-full py-5 bg-[#2D5A27] hover:bg-[#20401B] active:scale-[0.98] text-white rounded-2xl font-black text-xl sm:text-2xl shadow-xl shadow-[#2D5A27]/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>가짜 결제 승인 처리 중...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    <span>{totalAmount.toLocaleString()}원 결제하기</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="w-full py-3 text-sm font-bold text-[#63725F] hover:text-[#213F1B] hover:bg-[#F2ECE0] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>배송지 정보 수정하기</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP 3: 주문완료 화면 ---------------- */}
        {step === 3 && completedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#E5EFE2] text-[#2D5A27] mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="inline-block bg-[#E5EFE2] text-[#2D5A27] text-xs font-black px-3.5 py-1 rounded-full">
              가짜 결제 승인 완료 · DB 정상 등록
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-[#1B3616] mb-1.5">
                주문이 성공적으로 완료되었습니다!
              </h4>
              <p className="text-sm text-[#525E4D]">
                실제 결제는 이루어지지 않았으며, 사장님 주문접수함에 정상 기록되었습니다.
              </p>
            </div>

            {/* ORDER NUMBER DISPLAY (예시: ORD-20261007-3843) */}
            <div className="bg-[#FAF7F0] border-2 border-[#2D5A27] rounded-2xl p-4 sm:p-5 text-center shadow-xs">
              <span className="text-xs font-bold text-[#6D7B69] block mb-1">발급된 주문번호</span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-[#2D5A27] tracking-wider">
                {completedOrder.id}
              </div>
            </div>

            {/* Receipt Details */}
            <div className="bg-white rounded-2xl p-5 border border-[#E0D5C1] text-left text-sm sm:text-base space-y-2.5 shadow-xs">
              <div className="flex justify-between border-b border-[#F2ECE0] pb-2">
                <span className="text-[#758170]">주문 상품</span>
                <span className="font-bold text-[#1C3317]">
                  온하루 50곡 생식 ({bundleCount}박스 × {quantity}개)
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F2ECE0] pb-2">
                <span className="text-[#758170]">결제 수단</span>
                <span className="font-bold text-[#1C3317]">
                  {paymentMethod === 'card' && '신용카드 (1111-2222-3333-4444)'}
                  {paymentMethod === 'naverpay' && '네이버페이 (연습 승인)'}
                  {paymentMethod === 'tosspay' && '토스페이 (연습 승인)'}
                  {paymentMethod === 'kakaopay' && '카카오페이 (연습 승인)'}
                  {paymentMethod === 'vbank' && '무통장입금 (가상계좌)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F2ECE0] pb-2">
                <span className="text-[#758170]">받으시는 분</span>
                <span className="font-bold text-[#1C3317]">{completedOrder.customerName} ({completedOrder.phone})</span>
              </div>
              <div className="flex justify-between border-b border-[#F2ECE0] pb-2">
                <span className="text-[#758170] shrink-0">배송지 주소</span>
                <span className="font-medium text-[#1C3317] text-right truncate max-w-[240px]">
                  {completedOrder.address} {completedOrder.detailAddress}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#758170] font-bold">결제 금액</span>
                <span className="font-black text-xl text-[#2D5A27]">
                  {completedOrder.totalAmount?.toLocaleString()}원 (무료배송)
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-4.5 bg-[#2D5A27] hover:bg-[#22451D] text-white font-extrabold text-xl rounded-2xl shadow-md cursor-pointer transition-all"
            >
              확인 및 쇼핑 계속하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
