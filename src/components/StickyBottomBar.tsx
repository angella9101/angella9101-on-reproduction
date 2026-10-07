import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { MAIN_PRODUCT } from '../data/saengsikData';

interface StickyBottomBarProps {
  onOpenOrder: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onOpenOrder }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t-2 border-[#D9CDB8] p-3 sm:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="pl-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#D32F2F]">27% 할인</span>
            <span className="text-xs text-[#8C9886] line-through font-medium">
              {MAIN_PRODUCT.originalPrice.toLocaleString()}원
            </span>
          </div>
          <div className="text-2xl font-black text-[#1A3416] leading-tight">
            {MAIN_PRODUCT.salePrice.toLocaleString()}원
          </div>
        </div>

        <button
          onClick={onOpenOrder}
          className="flex-1 py-4 px-6 bg-[#2D5A27] active:bg-[#1E3E1A] text-white font-black text-xl rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <ShoppingBag className="w-6 h-6" />
          <span>주문하기</span>
        </button>
      </div>
    </div>
  );
};
