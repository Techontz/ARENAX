'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutDialog = ({ isOpen, onClose, onConfirm }: LogoutDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl p-8 flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
               <Plus size={32} className="rotate-45" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Heads up!</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Are you sure you want to logout? You'll need to sign in again to access your watchlist.</p>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
              >
                Logout
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
