import React from 'react';
import { Phone, Mail, ShieldAlert, Award, Leaf } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenGithub?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenGithub }) => {
  return (
    <footer className="bg-[#243320] text-[#D8E2D5] pt-14 pb-28 sm:pb-16 border-t border-[#34452F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Important General Food Legal Notice Box */}
        <div className="bg-[#1C2819] border border-[#3A4E33] rounded-2xl p-5 mb-10 text-xs sm:text-sm text-[#A5B8A1] leading-relaxed">
          <div className="flex items-center gap-2 text-white font-bold mb-1.5 text-sm sm:text-base">
            <ShieldAlert className="w-4 h-4 text-[#7FC074]" />
            <span>식품 등의 표시·광고에 관한 법률 준수 안내</span>
          </div>
          <p>
            • 본 제품은 질병의 예방 및 치료를 위한 의약품이 아니며, 건강기능식품이 아닌 순수 자연 곡물과 채소로 만든 <strong>일반식품(생식제품)</strong>입니다.<br />
            • 특이 체질이나 알레르기 체질이신 분은 원재료명(곡물류, 메밀, 대두, 견과 등)을 확인 후 섭취하시기 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3C6934] text-white flex items-center justify-center font-bold text-lg">
                온
              </div>
              <span className="text-2xl font-black text-white">온하루 생식</span>
            </div>
            <p className="text-sm text-[#B4C4B1] leading-relaxed">
              자연의 신선함을 정직하게 전하는 건강한 식탁 파트너.<br />
              100% 국내산 50가지 원료로 바쁜 현대인에게 간편하고 순수한 하루 한 잔을 선물합니다.
            </p>
            <div className="pt-2 text-xs text-[#8A9E86] space-y-1">
              <p>상호명: (주)온하루푸드 | 대표자: 김온유 | 사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 제2026-서울강남-0123호 | 식품제조가공업 제2024-001234호</p>
              <p>사업장 주소: 대한민국 서울특별시 강남구 자연대로 50 온하루빌딩 4층</p>
            </div>
          </div>

          {/* Customer Service & Consultation */}
          <div className="md:col-span-6 md:text-right space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#93A88F] font-bold block">
              고객만족센터 & 간편 전화 주문
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              1588-0000
            </div>
            <p className="text-sm text-[#A8BAA5]">
              평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00) / 주말·공휴일 휴무
            </p>
            <p className="text-xs text-[#8A9E86]">
              이메일 문의: cs@onharu-saengsik.kr
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#34452F] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#83977F] gap-2">
          <p>© 2026 ONHARU SAENGSIK. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 items-center">
            <span className="hover:text-white cursor-pointer">이용약관</span>
            <span className="hover:text-white cursor-pointer font-bold text-[#A5B8A1]">개인정보처리방침</span>
            <span className="hover:text-white cursor-pointer">원산지표시</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-xs text-[#A8C7A3] hover:text-white underline cursor-pointer"
              >
                [판매자 주문관리]
              </button>
            )}
            {onOpenGithub && (
              <button
                type="button"
                onClick={onOpenGithub}
                className="text-xs text-[#C5E4BE] hover:text-white underline cursor-pointer flex items-center gap-1"
              >
                [GitHub 저장소]
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
