import React from 'react';
import { ShoppingBag, PhoneCall, Sparkles, ClipboardList, LogIn, LogOut, UserCheck } from 'lucide-react';
import { AppUser } from '../services/firebase';

interface HeaderProps {
  currentUser: AppUser | null;
  onOpenOrder: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenGithub: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenOrder,
  onOpenAdmin,
  onOpenAuth,
  onOpenGithub,
  onLogout,
}) => {
  const userName = currentUser?.displayName || '안젤라';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E3DAC9]">
      {/* Top Welcome / Announcement Banner */}
      <div className="bg-[#2D5A27] text-[#F3EFE6] px-4 py-2 text-center text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold">
              ✨ {userName}님 환영합니다.
            </span>
            <span className="text-white/70 hidden sm:inline">|</span>
            <span className="hidden sm:inline">오늘 주문 시 전용 쉐이커 보틀 무료 증정 + 무료배송</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">🌾 100% 국내산 자연 원료 50종 그대로</span>
            <span className="text-white/60 hidden sm:inline">|</span>
            <span>지금 회원가입 시 <strong>전용 보틀 무료 증정</strong> + 무료배송</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold text-xl shadow-sm">
            온
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-[#1F3D1A] tracking-tight">온하루 생식</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#E4EFE3] text-[#2D5A27] font-semibold hidden xs:inline">100% 국내산</span>
            </div>
            <p className="text-xs text-[#6B7564] font-medium hidden sm:block">하루한잔으로 채우는 자연의 순수한 한끼</p>
          </div>
        </a>

        {/* Navigation items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-[#3F483B] font-semibold text-base">
          <a href="#intro" className="hover:text-[#2D5A27] transition-colors">제품 소개</a>
          <a href="#ingredients" className="hover:text-[#2D5A27] transition-colors">50가지 원료</a>
          <a href="#recommend" className="hover:text-[#2D5A27] transition-colors">추천 대상</a>
          <a href="#how-to" className="hover:text-[#2D5A27] transition-colors">드시는 방법</a>
          <a href="#order" className="hover:text-[#2D5A27] transition-colors">가격 및 혜택</a>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-[#2D5A27] font-black hover:underline cursor-pointer flex items-center gap-1"
          >
            <ClipboardList className="w-4 h-4" />
            <span>주문관리</span>
          </button>
        </nav>

        {/* Right CTA Buttons & User State */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Status or Login Trigger */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF2E8] border border-[#CEE0C8] text-[#22441D] text-xs sm:text-sm font-extrabold">
                <UserCheck className="w-4 h-4 text-[#2D5A27]" />
                <span>{userName}님 환영합니다.</span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#6D7A68] hover:text-[#22441D] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-[#D5C9B3] bg-white hover:bg-[#F4ECE0] text-[#3A4936] text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#2D5A27]" />
              <span className="hidden xs:inline">로그인·회원가입</span>
              <span className="xs:hidden">로그인</span>
            </button>
          )}

          {/* GitHub Connection Button */}
          <button
            onClick={onOpenGithub}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-[#D5C9B3] bg-white hover:bg-[#F4ECE0] text-[#24292F] text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            title="GitHub 저장소 연결 및 소스코드 연동"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </button>

          {/* Seller Order Management Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-[#2D5A27] bg-[#F2F7F0] hover:bg-[#E4EFE2] text-[#1E3A1A] text-xs sm:text-sm font-black shadow-xs transition-colors cursor-pointer"
            title="실시간 판매자 주문관리 대시보드"
          >
            <ClipboardList className="w-4 h-4 text-[#2D5A27]" />
            <span>주문관리</span>
          </button>

          {/* Main Large Order Button */}
          <button
            onClick={onOpenOrder}
            className="flex items-center gap-2 bg-[#2D5A27] hover:bg-[#23471E] active:scale-95 text-white font-bold text-base sm:text-lg px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
