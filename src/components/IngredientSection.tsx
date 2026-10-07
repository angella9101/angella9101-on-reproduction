import React, { useState } from 'react';
import { INGREDIENTS_50, INGREDIENT_CATEGORIES, IngredientItem } from '../data/saengsikData';
import { Search, Sprout, Check, ShieldCheck, MapPin } from 'lucide-react';

export const IngredientSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const filteredIngredients = INGREDIENTS_50.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.includes(searchKeyword.trim()) ||
      item.origin.includes(searchKeyword.trim()) ||
      item.char.includes(searchKeyword.trim());
    return matchesCat && matchesSearch;
  });

  const displayedList = isExpanded ? filteredIngredients : filteredIngredients.slice(0, 16);

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E7DFCE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with large readable text */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF2E8] text-[#244E1F] text-sm sm:text-base font-bold mb-4 border border-[#CEE0C8]">
            <Sprout className="w-4 h-4 text-[#2D5A27]" />
            <span>원산지 100% 대한민국</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#193215] tracking-tight leading-snug mb-5">
            국내산 50가지<br className="sm:hidden" />
            <span className="text-[#2D5A27]"> 곡물과 채소</span>로 가득 채웠습니다
          </h2>

          <p className="text-lg sm:text-xl text-[#4D5847] leading-relaxed">
            비옥한 우리 땅에서 건강하게 자란 50가지 자연 원료만을 엄선했습니다.<br className="hidden sm:inline" />
            가열 조리하지 않고 원물의 영양과 담백함을 그대로 분말화하여 속 편한 한끼를 완성합니다.
          </p>
        </div>

        {/* 3 Core Quality Guarantees (Clean beige cards with green accents) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#E2D8C6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8F1E6] text-[#2D5A27] flex items-center justify-center font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F391A] mb-2">
                100% 국내산 계약재배
              </h3>
              <p className="text-base sm:text-lg text-[#55614F] leading-relaxed">
                해남 발아현미부터 안동 서리태, 제주 당근까지 전국 우수 산지에서 수확한 신선한 원물만 사용합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center gap-2 text-sm font-bold text-[#2D5A27]">
              <Check className="w-4 h-4" /> 수입산 원료 0%
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#E2D8C6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8F1E6] text-[#2D5A27] flex items-center justify-center font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F391A] mb-2">
                비가열 동결건조 공법
              </h3>
              <p className="text-base sm:text-lg text-[#55614F] leading-relaxed">
                고온으로 볶거나 튀기지 않고, 영하의 온도에서 수분만을 부드럽게 승화시켜 자연 원물의 맛과 향을 보존했습니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center gap-2 text-sm font-bold text-[#2D5A27]">
              <Check className="w-4 h-4" /> 가열 파괴 최소화
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#E2D8C6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8F1E6] text-[#2D5A27] flex items-center justify-center font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F391A] mb-2">
                불필요한 첨가물 배제
              </h3>
              <p className="text-base sm:text-lg text-[#55614F] leading-relaxed">
                정제 설탕, 합성 착향료, 인공 감미료, 보존료를 일절 넣지 않고 원재료 본연의 담백하고 구수한 풍미를 살렸습니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center gap-2 text-sm font-bold text-[#2D5A27]">
              <Check className="w-4 h-4" /> 순수 자연 원물 100%
            </div>
          </div>
        </div>

        {/* 50 Ingredients Interactive Browser */}
        <div className="bg-[#F4ECE0] rounded-3xl p-6 sm:p-9 border border-[#DDD0BC]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3719]">
                50가지 원료 둘러보기
              </h3>
              <p className="text-base text-[#5E6A58] mt-1">
                원하는 곡물이나 채소를 직접 확인해보세요.
              </p>
            </div>

            {/* Simple Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="원료명 검색 (예: 케일, 보리)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-[#D5C7B0] text-[#2C3827] text-base focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Search className="w-5 h-5 text-[#889481] absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {INGREDIENT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsExpanded(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2D5A27] text-white shadow-md'
                      : 'bg-white/80 text-[#4D5847] hover:bg-white border border-[#DDD1BE]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Ingredient Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {displayedList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#DFD3BF] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-base sm:text-lg text-[#1E381A]">
                      {item.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#EAF2E8] text-[#2D5A27] font-semibold">
                      국산
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#667260] line-clamp-2">
                    {item.char}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#F2ECE1] text-[11px] sm:text-xs text-[#8A9684] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#2D5A27] shrink-0" />
                  <span className="truncate">{item.origin}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredIngredients.length === 0 && (
            <div className="text-center py-12 text-[#6D7767] text-lg font-medium">
              검색하신 원료를 찾을 수 없습니다.
            </div>
          )}

          {/* Expand/Collapse Button if more than 16 items */}
          {filteredIngredients.length > 16 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-8 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F0] border-2 border-[#2D5A27] text-[#2D5A27] font-bold text-base sm:text-lg shadow-sm cursor-pointer transition-colors"
              >
                {isExpanded ? '접기 ▲' : `50가지 원료 전체 보기 (${filteredIngredients.length}종) ▼`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
