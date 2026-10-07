import React from 'react';
import { RECOMMEND_TARGETS } from '../data/saengsikData';
import { Clock, Utensils, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface RecommendSectionProps {
  onOpenOrder: () => void;
}

export const RecommendSection: React.FC<RecommendSectionProps> = ({ onOpenOrder }) => {
  return (
    <section id="recommend" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E3DAC7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EFE2] text-[#244E1F] text-sm sm:text-base font-bold mb-4 border border-[#CEE0C8]">
            <HeartHandshake className="w-4 h-4 text-[#2D5A27]" />
            <span>맞춤 식사 제안</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A3316] tracking-tight leading-snug mb-5">
            이런 분들께 <span className="text-[#2D5A27]">추천합니다</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#515D4C] leading-relaxed">
            복잡한 준비 없이, 내 몸을 위한 순수한 한끼가 필요한 일상 속 세 가지 순간
          </p>
        </div>

        {/* 3 Prominent Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {RECOMMEND_TARGETS.map((target, idx) => {
            const icons = [
              <Clock key="1" className="w-8 h-8 text-[#2D5A27]" />,
              <Utensils key="2" className="w-8 h-8 text-[#2D5A27]" />,
              <HeartHandshake key="3" className="w-8 h-8 text-[#2D5A27]" />,
            ];

            return (
              <div
                key={target.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#DED4C1] shadow-md flex flex-col justify-between hover:border-[#2D5A27] transition-all"
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs sm:text-sm font-bold text-[#2D5A27] bg-[#E8F2E6] px-3 py-1.5 rounded-lg">
                      {target.badge}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F8F3] border border-[#D5E6D2] flex items-center justify-center">
                      {icons[idx]}
                    </div>
                  </div>

                  {/* Title (Big and clear) */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#193215] mb-3">
                    {target.title}
                  </h3>

                  {/* Problem Statement */}
                  <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E9E1D2] text-[#697463] text-sm sm:text-base font-medium mb-4">
                    "{target.problem}"
                  </div>

                  {/* Solution */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                      <p className="font-extrabold text-base sm:text-lg text-[#203D1B]">
                        {target.solution}
                      </p>
                    </div>
                  </div>

                  {/* Detail */}
                  <p className="text-sm sm:text-base text-[#5A6553] leading-relaxed">
                    {target.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2ECE0] text-center">
                  <span className="text-xs sm:text-sm font-bold text-[#2D5A27]">
                    ✓ 하루 한 잔으로 든든함 충전
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner with large CTA */}
        <div className="bg-gradient-to-r from-[#2D5A27] to-[#396F32] rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
            오늘부터 시작하는 간편한 한끼 습관
          </h3>
          <p className="text-lg sm:text-xl text-[#D8EBD4] mb-6 max-w-2xl mx-auto">
            국내산 50가지 원물로 속 편하게, 30초 만에 가볍게 챙겨보세요.
          </p>
          <button
            onClick={onOpenOrder}
            className="px-8 py-4 sm:py-5 bg-white hover:bg-[#FAF7F0] text-[#244A1E] font-black text-xl sm:text-2xl rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>지금 특가로 주문하기</span>
          </button>
        </div>
      </div>
    </section>
  );
};
