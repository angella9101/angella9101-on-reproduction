import React from 'react';
import { ArrowRight, ShieldCheck, Sprout, Clock3, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE6] to-[#FAF7F0] pt-8 pb-16 sm:pt-14 sm:pb-20 border-b border-[#E7DFCE]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8F0E4]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F5EBDC]/80 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EFE2] text-[#244E1F] text-sm sm:text-base font-bold mb-5 border border-[#CEE0C8] shadow-xs">
            <Sprout className="w-4 h-4 text-[#2D5A27]" />
            <span>100% 국내산 50가지 곡물 & 채소 그대로</span>
          </div>

          {/* MAIN PROMINENT HEADLINE AS REQUESTED */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1B3616] tracking-tight leading-[1.15] mb-5 sm:mb-6">
            하루한잔. <br className="xs:hidden" />
            <span className="text-[#2D5A27] underline decoration-[#A9C8A4] decoration-wavy decoration-2 underline-offset-8">
              간편한 한끼
            </span>
          </h1>

          {/* Subtext highlighting ingredients and convenience */}
          <p className="text-xl sm:text-2xl md:text-2xl text-[#4A5445] font-medium leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
            바쁜 일상 속, 물이나 우유에 타서 <strong className="text-[#1F3D1A] font-bold">30초 만에 든든하게!</strong><br />
            땅에서 자란 50가지 자연 원물을 비가열로 온전히 담아냈습니다.
          </p>

          {/* LARGE CTA BUTTON AS REQUESTED */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenOrder}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] px-8 py-5 sm:py-6 bg-[#2D5A27] hover:bg-[#22471E] active:scale-[0.98] text-white rounded-2xl font-black text-2xl sm:text-3xl shadow-xl shadow-[#2D5A27]/25 flex items-center justify-center gap-3 transition-all cursor-pointer group"
            >
              <span>주문하기</span>
              <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Key Quick Benefit Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto pt-2 pb-2 text-[#3D4739]">
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/70 border border-[#E5DEC9] shadow-xs">
              <span className="text-2xl sm:text-3xl mb-1">🌾</span>
              <span className="font-bold text-sm sm:text-base text-[#1E3719]">국내산 50종</span>
              <span className="text-xs text-[#717C6B]">곡물·채소·과일</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/70 border border-[#E5DEC9] shadow-xs">
              <span className="text-2xl sm:text-3xl mb-1">⏱️</span>
              <span className="font-bold text-sm sm:text-base text-[#1E3719]">30초 완성</span>
              <span className="text-xs text-[#717C6B]">흔들면 끝나는 한끼</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/70 border border-[#E5DEC9] shadow-xs">
              <span className="text-2xl sm:text-3xl mb-1">🌱</span>
              <span className="font-bold text-sm sm:text-base text-[#1E3719]">무첨가 순수</span>
              <span className="text-xs text-[#717C6B]">인공첨가물 0%</span>
            </div>
          </div>
        </div>

        {/* Realistic Natural Visual Card */}
        <div className="mt-12 sm:mt-14 max-w-3xl mx-auto rounded-3xl bg-white border-2 border-[#D9CEBA] p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual representation of raw meal powder bottle and pouches */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#F5F1E8] to-[#E9F0E5] rounded-2xl p-6 text-center border border-[#E0D8C5] relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl bg-[#2D5A27] text-white flex flex-col items-center justify-between p-2.5 shadow-md transform -rotate-3 mb-2 border border-[#3E7436]">
                <span className="text-[10px] tracking-widest text-[#B3D6AF] font-bold">100% KOREAN</span>
                <div className="text-center">
                  <span className="block text-xs font-semibold text-[#E2F0DE]">온하루</span>
                  <span className="block text-lg font-black tracking-tight leading-tight">50곡<br/>자연생식</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-medium">1포 30g</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-[#2D5A27] shadow-xs border border-[#CDE0C7]">
                <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
                전용 보틀 + 30포 1박스 구성
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2D5A27] bg-[#EAF2E8] px-2.5 py-1 rounded-md">
                  일반식품 · 생식제품
                </span>
                <span className="text-xs text-[#7B8675]">한 포로 간편하게 채우는 식사</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3616] leading-snug">
                자연 원물 그대로의 맛,<br />
                <span className="text-[#2D5A27]">구수하고 담백한 온하루 생식</span>
              </h2>
              <p className="text-base sm:text-lg text-[#556050] leading-relaxed">
                가열하지 않고 수분만 쏙 뺀 비가열 공법으로 원재료 고유의 맛과 향을 살렸습니다. 
                설탕이나 합성 착향료 없이 50가지 자연 곡물과 채소 본연의 깊은 고소함을 느껴보세요.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-sm font-semibold text-[#304B28]">
                <span className="inline-flex items-center gap-1 bg-[#F5F2EB] px-3 py-1.5 rounded-lg border border-[#E3DCB]"><CheckCircle2 className="w-4 h-4 text-[#2D5A27]" /> 설탕 0%</span>
                <span className="inline-flex items-center gap-1 bg-[#F5F2EB] px-3 py-1.5 rounded-lg border border-[#E3DCB]"><CheckCircle2 className="w-4 h-4 text-[#2D5A27]" /> 합성착향료 0%</span>
                <span className="inline-flex items-center gap-1 bg-[#F5F2EB] px-3 py-1.5 rounded-lg border border-[#E3DCB]"><CheckCircle2 className="w-4 h-4 text-[#2D5A27]" /> 인공보존료 0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
