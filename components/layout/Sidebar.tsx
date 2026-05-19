'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SIDEBAR_ITEMS } from '@/constants';

interface SidebarProps {
  active: string;
  setActive: (v: string) => void;
}

export const Sidebar = ({ active, setActive }: SidebarProps) => {
  return (
    <div className="hidden lg:flex w-[80px] bg-white border-r border-[var(--color-border-main)] flex-col items-center py-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8 w-full items-center">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className="flex flex-col items-center gap-1.5 transition-all group relative px-2 py-1 w-full"
          >
            <item.icon 
              size={22} 
              className={`transition-colors stroke-[1.5px] ${active === item.label ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'}`} 
            />
            <span className={`text-[10px] font-medium transition-colors ${active === item.label ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'}`}>
              {item.label}
            </span>
            {active === item.label && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 w-[3px] h-8 bg-[var(--color-brand)] rounded-r-full"
              />
            )}
            {active === item.label && (
              <div className="absolute inset-0 bg-[var(--color-brand-light)] opacity-50 -z-10 mx-2 rounded-lg" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
