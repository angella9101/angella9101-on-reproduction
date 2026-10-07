import React from 'react';
import { HOW_TO_STEPS } from '../data/saengsikData';
import { Droplet, Milk, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';

export const HowToDrinkSection: React.FC = () => {
  return (
    <section id="how-to" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E6DDCC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F1E5] text-[#244E1F] text-sm sm:text-base font-bold mb-4 border border-[#CEE0C8]">
            <Droplet className="w-4 h-4 text-[#2D5A27]" />
            <span>30초 완성 간편 섭취 가이드</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A3417] tracking-tight leading-snug mb-5">
            물이나 우유에 타서 드세요!
          </h2>

          <p className="text-lg sm:text-xl text-[#505D4B] leading-relaxed">
            취향에 따라 시원한 물이나 우유, 두유에 타서 드시면 더욱 고소합니다.<br className="hidden sm:inline" />
            1부터 3까지, 순서대로 따라 하시면 뭉침 없이 부드럽게 섞입니다.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Sequential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-14">
          {HOW_TO_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#DFD5C2] shadow-sm flex flex-col justify-between relative group hover:border-[#2D5A27] transition-all"
            >
              <div>
                {/* Step Number Circle (BIG & CLEAR) */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center font-black text-3xl shadow-sm">
                    {stepItem.step}
                  </div>
                  <span className="text-xs font-black tracking-widest text-[#2D5A27] bg-[#EAF2E8] px-3 py-1.5 rounded-full">
                    {stepItem.stepTitle}
                  </span>
                </div>

                {/* Step Action Name */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#1D3618] mb-3">
                  {stepItem.action}
                </h3>

                {/* Step Core Instruction (Big text) */}
                <p className="text-base sm:text-lg text-[#3E4A3B] font-bold leading-snug mb-3">
                  {stepItem.description}
                </p>

                {/* Step Detail Tip */}
                <div className="bg-[#F7F4EC] p-3.5 rounded-xl border border-[#E9E1CE] text-sm text-[#667261] leading-relaxed">
                  💡 <strong className="text-[#32452F]">꿀팁:</strong> {stepItem.tip}
                </div>
              </div>

              {/* Bottom Spec Badge */}
              <div className="mt-6 pt-4 border-t border-[#F2ECE0] flex items-center justify-between text-sm">
                <span className="text-[#7F8B7A] font-medium">기준량</span>
                <span className="font-extrabold text-[#2D5A27] text-base">{stepItem.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Liquid Choice Recommendation (Water vs Milk) */}
        <div className="bg-[#F2ECE0] rounded-3xl p-6 sm:p-9 border border-[#DDD0BB]">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F3A1A] mb-4 text-center">
            내 입맛에 맞는 음용 방법 선택
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Milk / Soy milk */}
            <div className="bg-white rounded-2xl p-5 border border-[#D9CEB9] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#FFF6E9] text-[#A6701B] flex items-center justify-center shrink-0">
                <Milk className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#233C1E] mb-1">
                  우유 또는 두유 (200ml)
                </h4>
                <p className="text-sm sm:text-base text-[#576451] leading-relaxed">
                  미숫가루나 라떼처럼 <strong>더욱 진하고 고소한 풍미</strong>를 원하실 때 추천합니다. 포만감이 더욱 오래 유지됩니다.
                </p>
              </div>
            </div>

            {/* Pure Water */}
            <div className="bg-white rounded-2xl p-5 border border-[#D9CEB9] flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#E8F3FA] text-[#25689E] flex items-center justify-center shrink-0">
                <Droplet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#233C1E] mb-1">
                  시원한 생수 (200ml)
                </h4>
                <p className="text-sm sm:text-base text-[#576451] leading-relaxed">
                  곡물과 채소 본연의 <strong>맑고 깔끔한 맛</strong>을 원하실 때 좋습니다. 텁텁함 없이 개운하게 목을 넘어갑니다.
                </p>
              </div>
            </div>
          </div>

          {/* Important Tip Box */}
          <div className="mt-5 bg-[#FAF7F0] rounded-xl p-4 border border-[#E3DAC8] flex items-start gap-3 text-sm sm:text-base text-[#5D6B58]">
            <AlertCircle className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
            <span>
              <strong>안내:</strong> 뜨거운 물은 곡물 분말이 엉길 수 있으므로, <strong>미지근한 물이나 시원한 음료</strong>에 타서 드시는 것을 권장합니다.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
