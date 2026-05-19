'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, MonitorPlay, Settings } from 'lucide-react';
import { PaymentMethod, Plan } from '@/types';
import { plans } from '@/data';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: string;
  onSelectPlan: (plan: Plan) => void;
  onConfirmPayment: (method: PaymentMethod) => void;
  paymentMethods: PaymentMethod[];
  onAddPayment: (m: any) => void;
}

export const SubscriptionModal = ({ 
  isOpen, 
  onClose, 
  step, 
  onSelectPlan, 
  onConfirmPayment, 
  paymentMethods, 
  onAddPayment 
}: SubscriptionModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(paymentMethods[0] || null);

  useEffect(() => {
    if (paymentMethods.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentMethods[0]);
    }
  }, [paymentMethods, selectedMethod]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
            onClick={onClose} 
          />
          
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-6 lg:p-10 overflow-hidden"
          >
            {step === 'plans' ? (
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">Choose Your Plan</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">Select the best experience for your arena</p>
                  </div>
                  <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col h-full ${selectedPlan.id === plan.id ? 'border-[var(--color-brand)] bg-[var(--color-brand-light)]/10' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex flex-col gap-1 mb-6">
                        <span className="text-sm font-bold">{plan.name}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black">${plan.price}</span>
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{plan.id === 'monthly' ? '/mo' : '/yr'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        {plan.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                             <Check size={14} className="text-[var(--color-brand)]" />
                             {f}
                          </div>
                        ))}
                      </div>
                      {selectedPlan.id === plan.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center shadow-lg shadow-[var(--color-brand)]/20">
                           <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onSelectPlan(selectedPlan)}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-gray-300 hover:bg-[var(--color-brand)] active:scale-95 transition-all mt-2"
                >
                  CONTINUE TO PAYMENT
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">Payment</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">Verify your payment details</p>
                  </div>
                  <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                   <div className="p-5 rounded-2xl bg-[var(--color-bg-main)] border border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Plan</span>
                         <span className="text-sm font-bold text-gray-900">{selectedPlan.name}</span>
                      </div>
                      <span className="text-xl font-black font-mono">${selectedPlan.price}</span>
                   </div>

                   <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Choose Payment Method</span>
                      {paymentMethods.map(method => (
                        <div 
                          key={method.id}
                          onClick={() => setSelectedMethod(method)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedMethod?.id === method.id ? 'border-[var(--color-brand)] bg-white' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}
                        >
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                {method.type === 'Card' ? <Settings size={18} /> : <MonitorPlay size={18} />}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-xs font-bold">{method.provider}</span>
                                <span className="text-[10px] text-gray-400 font-mono">•••• {method.last4}</span>
                             </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod?.id === method.id ? 'border-[var(--color-brand)] bg-[var(--color-brand)]' : 'border-gray-200'}`}>
                             {selectedMethod?.id === method.id && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                      ))}
                      <button 
                         onClick={() => onAddPayment(null)}
                         className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-200 text-xs font-bold text-gray-400 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all"
                      >
                         <Plus size={16} />
                         Add Payment Method
                      </button>
                   </div>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <button 
                    disabled={!selectedMethod}
                    onClick={() => selectedMethod && onConfirmPayment(selectedMethod)}
                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-gray-300 hover:bg-[var(--color-brand)] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    CONFIRM & PAY ${selectedPlan.price}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-medium px-8 text-balance">By clicking confirm, you agree to our Terms of Service and Privacy Policy. This is a recurring subscription.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
