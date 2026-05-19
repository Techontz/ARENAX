'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SIDEBAR_ITEMS } from '@/constants';

interface MobileNavProps {
  active: string;
  setActive: (v: string) => void;
}

export const MobileNav = ({ active, setActive }: MobileNavProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--color-border-main)] px-2 flex items-center justify-around z-50">
      {SIDEBAR_ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className="flex flex-col items-center gap-1 relative px-2"
        >
          <item.icon 
            size={20} 
            className={`transition-colors stroke-[1.5px] ${active === item.label ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)]'}`} 
          />
          <span className={`text-[10px] font-medium transition-colors ${active === item.label ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)]'}`}>
            {item.label}
          </span>
          {active === item.label && (
            <motion.div 
              layoutId="mobile-nav-indicator"
              className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[var(--color-brand)] rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
};
