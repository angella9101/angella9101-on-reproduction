import React, { useState } from 'react';
import { FAQ_LIST } from '../data/saengsikData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E3DAC7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EFE2] text-[#244E1F] text-sm sm:text-base font-bold mb-4 border border-[#CEE0C8]">
            <HelpCircle className="w-4 h-4 text-[#2D5A27]" />
            <span>궁금한 점을 확인하세요</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#1A3416] tracking-tight mb-3">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-base sm:text-lg text-[#556250]">
            온하루 생식을 처음 접하시는 분들이 가장 많이 물어보시는 내용입니다.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-[#DED4C1] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F0] transition-colors"
                >
                  <span className="font-extrabold text-lg sm:text-xl text-[#1E3719] flex items-center gap-3">
                    <span className="text-[#2D5A27] font-black text-xl">Q.</span>
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#F3ECE0] flex items-center justify-center text-[#2D5A27] shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F2ECE0] text-base sm:text-lg text-[#525F4E] leading-relaxed bg-[#FAF8F3]">
                    <div className="flex gap-2.5">
                      <span className="font-black text-[#2D5A27] text-lg shrink-0">A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
