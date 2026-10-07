import React, { useState } from 'react';
import { MAIN_PRODUCT } from '../data/saengsikData';
import { Check, ShieldCheck, Truck, Gift, ShoppingBag, Plus, Minus, ArrowRight, Phone } from 'lucide-react';

interface ProductOrderSectionProps {
  onOpenOrderWithData: (bundleCount: number, quantity: number, totalAmount: number) => void;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({ onOpenOrderWithData }) => {
  const [selectedBundle, setSelectedBundle] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const currentBundleObj = MAIN_PRODUCT.bundles.find((b) => b.count === selectedBundle) || MAIN_PRODUCT.bundles[0];
  const totalPrice = currentBundleObj.price * quantity;
  const originalTotalPrice = currentBundleObj.origPrice * quantity;

  const handleOrderClick = () => {
    onOpenOrderWithData(selectedBundle, quantity, totalPrice);
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E6DDCC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EFE2] text-[#244E1F] text-sm sm:text-base font-bold mb-4 border border-[#CEE0C8]">
            <Gift className="w-4 h-4 text-[#2D5A27]" />
            <span>오늘의 특별 혜택 · 무료배송</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#193215] tracking-tight leading-snug mb-5">
            자연을 담은 온하루 생식 <br className="sm:hidden" />
            <span className="text-[#2D5A27]">정기 특별가</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#4F5B49] leading-relaxed">
            100% 국내산 50가지 원료 그대로, 매일 아침을 채워줄 든든한 동반자입니다.
          </p>
        </div>

        {/* Product Box Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DCD1BC] shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Product Visual Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#F7F4EB] to-[#E9F0E5] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2D8C6]">
              <div>
                <span className="inline-block bg-[#2D5A27] text-white text-xs sm:text-sm font-black px-3 py-1 rounded-md mb-4">
                  1개월분 (30포)
                </span>

                {/* Simulated High-End Product Package Graphics */}
                <div className="bg-white rounded-2xl p-6 border border-[#DDD0BC] shadow-sm text-center my-4 relative">
                  <div className="text-xs font-bold text-[#83917F] tracking-widest mb-1">
                    NATURAL MEAL 50
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#1E3719] mb-2">
                    온하루 생식
                  </div>
                  <div className="text-sm text-[#4E5B4A] font-medium mb-4">
                    국내산 50곡 비가열 자연생식
                  </div>

                  <div className="w-28 h-36 mx-auto bg-gradient-to-b from-[#35632E] to-[#244A1E] rounded-xl text-white flex flex-col justify-between p-3 shadow-md mb-3">
                    <span className="text-[10px] text-[#A6CEA0] font-bold">100% KOREAN</span>
                    <div className="text-xs font-bold leading-tight">
                      하루한잔<br />간편한 한끼
                    </div>
                    <span className="text-[10px] bg-white/20 rounded py-0.5">30g × 30포</span>
                  </div>

                  <div className="text-xs text-[#6F7B6B] font-semibold bg-[#FAF7F0] py-1.5 px-3 rounded-lg border border-[#E9E1CE]">
                    총 900g (30g × 30개입)
                  </div>
                </div>
              </div>

              {/* Free Gift Badge */}
              <div className="bg-[#EAF3E8] border border-[#CDE0C7] rounded-xl p-3.5 text-xs sm:text-sm text-[#254F20] font-bold flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#2D5A27] shrink-0" />
                <span>[무료 증정] 전용 쉐이커 보틀 1개 전원 증정</span>
              </div>
            </div>

            {/* Right: Pricing, Options & Order Action */}
            <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#2D5A27] bg-[#E9F3E8] px-2.5 py-1 rounded">
                    무료배송
                  </span>
                  <span className="text-xs font-bold text-[#A56B1B] bg-[#FFF5E6] px-2.5 py-1 rounded">
                    당일출고 (오후 2시 이전 주문 시)
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A3316] mb-1">
                  {MAIN_PRODUCT.name}
                </h3>
                <p className="text-sm sm:text-base text-[#616E5D] mb-5">
                  {MAIN_PRODUCT.subName}
                </p>

                {/* Price Display (BIG & CLEAR) */}
                <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#E5DEC9] mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-sm sm:text-base text-[#8C9886] line-through font-medium">
                      {originalTotalPrice.toLocaleString()}원
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#D32F2F]">
                      {currentBundleObj.discount}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A3416]">
                      {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#1A3416]">원</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#5B6755] ml-2">
                      (1포당 약 {(Math.round(totalPrice / (30 * selectedBundle * quantity))).toLocaleString()}원)
                    </span>
                  </div>
                </div>

                {/* Package Bundle Selection */}
                <div className="mb-5">
                  <label className="block text-sm sm:text-base font-extrabold text-[#293B26] mb-2">
                    구성 선택
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MAIN_PRODUCT.bundles.map((bundle) => {
                      const isSelected = selectedBundle === bundle.count;
                      return (
                        <button
                          key={bundle.count}
                          type="button"
                          onClick={() => setSelectedBundle(bundle.count)}
                          className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#2D5A27] bg-[#F1F7EF] text-[#1E3A1A]'
                              : 'border-[#E0D7C4] bg-white text-[#4B5646] hover:border-[#B5C7B0]'
                          }`}
                        >
                          <div className="text-xs font-bold text-[#818E7C]">{bundle.count}박스</div>
                          <div className="font-extrabold text-sm sm:text-base">{bundle.count === 1 ? '1개월분' : bundle.count === 2 ? '2개월분' : '3개월분'}</div>
                          <div className="text-xs font-bold text-[#2D5A27] mt-1">{bundle.price.toLocaleString()}원</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ECE3D2]">
                  <span className="text-base sm:text-lg font-extrabold text-[#243621]">수량</span>
                  <div className="flex items-center gap-3 bg-[#FAF7F0] border border-[#DED4C1] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg bg-white hover:bg-[#F2ECE0] flex items-center justify-center text-[#2D5A27] font-bold shadow-2xs cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-lg text-[#1C3317]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-white hover:bg-[#F2ECE0] flex items-center justify-center text-[#2D5A27] font-bold shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* VERY LARGE "주문하기" BUTTON */}
              <div>
                <button
                  type="button"
                  onClick={handleOrderClick}
                  className="w-full py-5 sm:py-6 bg-[#2D5A27] hover:bg-[#21431C] active:scale-[0.98] text-white rounded-2xl font-black text-2xl sm:text-3xl shadow-xl shadow-[#2D5A27]/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span>주문하기</span>
                  <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Telephone order & reassurance */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-[#6C7767]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#2D5A27]" />
                    전국 어디나 <strong>무료배송</strong> (우체국택배)
                  </span>
                  <a
                    href="tel:1588-0000"
                    className="flex items-center gap-1 text-[#2D5A27] font-bold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    어르신 간편 전화 주문: 1588-0000
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
