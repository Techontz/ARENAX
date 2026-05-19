'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, User, Settings, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEADER_TABS } from '@/constants';
import { User as UserType } from '@/types';

interface HeaderProps {
  active: string;
  setActive: (v: string) => void;
  user: UserType | null;
  onLogin: () => void;
  onSubscribe: () => void;
  onLogoutClick: () => void;
}

export const Header = ({ 
  active, 
  setActive, 
  user, 
  onLogin, 
  onSubscribe,
  onLogoutClick 
}: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-[64px] lg:h-[72px] bg-white border-b border-[var(--color-border-main)] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 lg:gap-12 h-full">
        <div className="flex items-center gap-2 lg:pr-6 shrink-0">
          <span className="text-lg lg:text-xl font-bold tracking-tight">ArenaX</span>
          <span className="bg-[var(--color-live-red)] text-white text-[9px] lg:text-[10px] font-bold px-1 lg:px-1.5 py-0.5 rounded-[2px] uppercase">Live</span>
        </div>
        
        <nav className="hidden md:flex items-center h-full gap-4 lg:gap-8">
          {HEADER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative h-full px-1 text-[14px] lg:text-[15px] font-medium transition-colors"
            >
              <span className={active === tab ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}>
                {tab}
              </span>
              {active === tab && (
                <motion.div 
                  layoutId="header-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-brand)]"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 lg:gap-6 flex-1 max-w-[600px] justify-center px-2 lg:px-8">
        <div className="relative w-full">
          <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={16} />
          <input 
            type="text" 
            placeholder="Search matches..."
            className="w-full bg-[#F0F0F5] border-transparent focus:bg-white focus:border-[var(--color-border-main)] rounded-full py-2 pl-10 lg:pl-12 pr-4 text-xs lg:text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-5">
        {!user?.isPremium && (
          <button 
            onClick={onSubscribe} 
            className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-3 lg:px-5 py-1.5 lg:py-2 rounded-lg text-[10px] sm:text-xs lg:text-sm font-bold transition-all shadow-sm whitespace-nowrap active:scale-95"
          >
            Subscribe <span className="hidden sm:inline">$2/month</span>
          </button>
        )}
        
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 lg:gap-2 pl-1 cursor-pointer group shrink-0"
          >
            <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden border-2 transition-all ${showDropdown ? 'border-[var(--color-brand)]' : 'border-transparent group-hover:border-[var(--color-brand-light)]'}`}>
              <img 
                src={user ? user.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder"} 
                alt="user" 
                className="w-full h-full object-cover" 
              />
            </div>
            <ChevronDown size={12} className={`text-[var(--color-text-secondary)] hidden lg:block transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[var(--color-border-main)] py-2 z-20"
                >
                  {user ? (
                    <div className="px-4 py-3 border-b border-[var(--color-border-main)] mb-1">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)] truncate">{user.email}</p>
                    </div>
                  ) : (
                    <div className="px-4 py-3 border-b border-[var(--color-border-main)] mb-1">
                      <p className="text-sm font-bold">Welcome to ArenaX</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)]">Sign in to sync your watchlist</p>
                    </div>
                  )}

                  <div className="flex flex-col">
                    {user ? (
                      <>
                        <button 
                          onClick={() => { setActive('Profile'); setShowDropdown(false); }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                          <User size={16} />
                          My Profile
                        </button>
                        <div className="h-px bg-[var(--color-border-main)] my-1" />
                        <button 
                          onClick={() => { onLogoutClick(); setShowDropdown(false); }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Plus size={16} className="rotate-45" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => { onLogin(); setShowDropdown(false); }}
                        className="flex items-center gap-3 px-4 py-3 mx-2 my-1 bg-white border border-[var(--color-border-main)] rounded-lg text-sm font-bold hover:bg-[var(--color-bg-main)] transition-all shadow-sm"
                      >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/icon_google.svg" alt="google" className="w-4 h-4" />
                        Login with Google
                      </button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
