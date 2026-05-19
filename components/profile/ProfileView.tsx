'use client';

import React, { useEffect, useState } from 'react';
import {
  User,
  CreditCard,
  Shield,
  Smartphone,
  ChevronRight,
  Plus,
  Trash2,
  Settings,
  Play,
  Wallet,
  CheckCircle2,
  X,
} from 'lucide-react';

import { User as UserType, PaymentMethod } from '@/types';

interface ProfileViewProps {
  paymentMethods: PaymentMethod[];
  onAddPayment: (m: any) => void;
  onDeletePayment: (id: string) => void;
  onEditPayment: (m: any) => void;
  user: UserType | null;
  onLogin: () => void;
}

export const ProfileView = ({
  paymentMethods,
  onAddPayment,
  onDeletePayment,
  onEditPayment,
  user,
  onLogin,
}: ProfileViewProps) => {
  const [subSection, setSubSection] = useState('Personal Info');
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);

  const [newMethodType, setNewMethodType] = useState<
    'Card' | 'Mobile Money'
  >('Card');

  const [formData, setFormData] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: '',
    mmProvider: 'M-Pesa',
    phoneNumber: '',
  });

  useEffect(() => {
    if (editingMethod) {
      setNewMethodType(editingMethod.type);

      setFormData({
        cardNumber:
          editingMethod.type === 'Card'
            ? `•••• •••• •••• ${editingMethod.last4}`
            : '',
        holderName: editingMethod.holderName || '',
        expiry: editingMethod.expiry || '',
        cvv: '',
        mmProvider:
          editingMethod.type === 'Mobile Money'
            ? editingMethod.provider
            : 'M-Pesa',
        phoneNumber:
          editingMethod.type === 'Mobile Money'
            ? `•••• ••• ${editingMethod.last4}`
            : '',
      });
    } else {
      setNewMethodType('Card');

      setFormData({
        cardNumber: '',
        holderName: '',
        expiry: '',
        cvv: '',
        mmProvider: 'M-Pesa',
        phoneNumber: '',
      });
    }
  }, [editingMethod]);

  const handleSubmit = () => {
    if (editingMethod) {
      const updated = {
        ...editingMethod,
        type: newMethodType,
        provider:
          newMethodType === 'Card'
            ? 'Mastercard'
            : formData.mmProvider,
        last4:
          newMethodType === 'Card'
            ? formData.cardNumber.slice(-4)
            : formData.phoneNumber.slice(-4),
        expiry:
          newMethodType === 'Card'
            ? formData.expiry
            : 'N/A',
        holderName: formData.holderName,
      };

      onEditPayment(updated);
    } else {
      const id = Math.random().toString(36).substr(2, 9);

      const newMethod =
        newMethodType === 'Card'
          ? {
              id,
              type: 'Card',
              provider: 'Mastercard',
              last4: formData.cardNumber.slice(-4),
              expiry: formData.expiry,
              holderName: formData.holderName,
              isPrimary: false,
            }
          : {
              id,
              type: 'Mobile Money',
              provider: formData.mmProvider,
              last4: formData.phoneNumber.slice(-4),
              expiry: 'N/A',
              holderName: formData.holderName,
              isPrimary: false,
            };

      onAddPayment(newMethod);
    }

    setShowModal(false);
    setEditingMethod(null);
  };

  const openEdit = (method: any) => {
    setEditingMethod(method);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingMethod(null);
    setShowModal(true);
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div className="h-full flex flex-col justify-center items-center text-center px-6 py-20">
          <div className="w-28 h-28 rounded-[32px] bg-[#F3F1FF] flex items-center justify-center mb-7">
            <User size={48} className="text-[#5B3DF5]" />
          </div>

          <h2 className="text-[38px] font-black text-[#111111] leading-tight">
            Personal Info
            <br />
            Unavailable
          </h2>

          <p className="text-[#8B8B98] mt-4 text-[16px] max-w-md leading-relaxed">
            Please log in to your account to manage subscriptions,
            payment methods and profile information.
          </p>

          <button
            onClick={onLogin}
            className="mt-9 px-10 h-[58px] rounded-[22px] bg-[#5B3DF5] text-white font-black text-[15px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Login with Google
          </button>
        </div>
      );
    }

    switch (subSection) {
      case 'Personal Info':
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-[34px] font-black text-[#111111]">
                Personal Information
              </h3>

              <p className="text-[#8B8B98] mt-2 text-[15px]">
                Manage your profile details and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: 'FULL NAME',
                  value: user.name,
                },
                {
                  label: 'EMAIL ADDRESS',
                  value: user.email,
                },
                {
                  label: 'PHONE NUMBER',
                  value: '+255 742 000 123',
                },
                {
                  label: 'MEMBERSHIP',
                  value: user?.isPremium
                    ? 'Premium Member'
                    : 'Free Plan',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#F7F7FB] rounded-[28px] p-7 border border-[#ECECF2]"
                >
                  <p className="text-[11px] tracking-[0.25em] font-black text-[#A1A1B0] mb-3">
                    {item.label}
                  </p>

                  <p className="text-[17px] font-bold text-[#111111]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-fit px-9 h-[56px] rounded-[22px] bg-[#5B3DF5] text-white font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              Edit Profile
            </button>
          </div>
        );

      case 'Payment Methods':
        return (
          <div className="flex flex-col gap-7">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-[34px] font-black text-[#111111]">
                  Payment Methods
                </h3>

                <p className="text-[#8B8B98] mt-2 text-[15px]">
                  Add and manage your payment options
                </p>
              </div>

              <button
                onClick={openAdd}
                className="h-[56px] px-7 rounded-[22px] bg-[#5B3DF5] text-white font-black flex items-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Plus size={18} />
                Add Method
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`relative overflow-hidden rounded-[36px] p-8 group transition-all transform rotate-[-2deg] hover:rotate-0 hover:scale-[1.02] ${
                    method.type === 'Card'
                      ? 'bg-gradient-to-br from-[#17171D] via-[#23232D] to-[#2F2F3A] text-white'
                      : 'bg-white border border-[#ECECF2]'
                  }`}
                >
                  {/* Glow */}
                  {method.type === 'Card' && (
                    <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#5B3DF5]/20 blur-3xl rounded-full" />
                  )}

                  {/* Actions */}
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => openEdit(method)}
                      className={`w-11 h-11 rounded-[18px] flex items-center justify-center transition-all ${
                        method.type === 'Card'
                          ? 'bg-white/10 hover:bg-white/20'
                          : 'bg-[#F3F3F8] hover:bg-[#ECECF2]'
                      }`}
                    >
                      <Settings size={16} />
                    </button>

                    <button
                      onClick={() =>
                        onDeletePayment(method.id)
                      }
                      className={`w-11 h-11 rounded-[18px] flex items-center justify-center transition-all ${
                        method.type === 'Card'
                          ? 'bg-white/10 hover:bg-red-500/30'
                          : 'bg-red-50 hover:bg-red-100 text-red-500'
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Top */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-[20px] flex items-center justify-center ${
                          method.type === 'Card'
                            ? 'bg-white/10'
                            : 'bg-[#F3F1FF]'
                        }`}
                      >
                        {method.type === 'Card' ? (
                          <CreditCard
                            size={24}
                            className="text-white"
                          />
                        ) : (
                          <Wallet
                            size={24}
                            className="text-[#5B3DF5]"
                          />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-[12px] uppercase tracking-[0.25em] font-black ${
                            method.type === 'Card'
                              ? 'text-white/60'
                              : 'text-[#A1A1B0]'
                          }`}
                        >
                          {method.type}
                        </p>

                        <h4 className="text-[20px] font-black mt-1">
                          {method.provider}
                        </h4>
                      </div>
                    </div>

                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20" />
                      <div className="w-10 h-10 rounded-full bg-white/40" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mt-10 relative z-10">
                    <p className="text-[30px] font-black tracking-[0.2em]">
                      •••• •••• •••• {method.last4}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-10 flex items-center justify-between relative z-10">
                    <div>
                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] font-black ${
                          method.type === 'Card'
                            ? 'text-white/50'
                            : 'text-[#A1A1B0]'
                        }`}
                      >
                        Holder
                      </p>

                      <p className="font-bold mt-1">
                        {method.holderName || user.name ||
                          user.name}
                      </p>
                    </div>

                    <div>
                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] font-black ${
                          method.type === 'Card'
                            ? 'text-white/50'
                            : 'text-[#A1A1B0]'
                        }`}
                      >
                        Expiry
                      </p>

                      <p className="font-bold mt-1">
                        {method.expiry}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={18}
                        className="text-green-400"
                      />

                      <span className="font-bold text-sm">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Card */}
              <button
                onClick={openAdd}
                className="min-h-[290px] rounded-[36px] border-2 border-dashed border-[#D9D9E7] bg-white hover:border-[#5B3DF5] hover:bg-[#F9F8FF] transition-all flex flex-col items-center justify-center gap-5"
              >
                <div className="w-20 h-20 rounded-[28px] bg-[#F3F1FF] flex items-center justify-center">
                  <Plus
                    size={34}
                    className="text-[#5B3DF5]"
                  />
                </div>

                <div>
                  <h4 className="text-[22px] font-black text-[#111111]">
                    Add Payment Method
                  </h4>

                  <p className="text-[#8B8B98] mt-2 text-sm">
                    Card or Mobile Money
                  </p>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center text-[#8B8B98] text-lg font-bold">
            This section is coming soon.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6FA] px-4 lg:px-8 py-8">
      {/* HEADER */}
      <div className="mb-9">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[22px] bg-[#ECE9FF] flex items-center justify-center">
            <User size={24} className="text-[#5B3DF5]" />
          </div>

          <div>
            <h1 className="text-[42px] font-black tracking-tight text-[#111111]">
              My Profile
            </h1>

            <p className="text-[#8B8B98] text-[15px] mt-1">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-[38px] p-10 border border-[#ECECF2]">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#5B3DF5]/10 blur-2xl rounded-full" />

                <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-[10px] border-[#F5F5FB] shadow-lg">
                  <img
                    src={
                      user
                        ? user.avatar
                        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="mt-8 text-[42px] font-black text-[#111111] leading-tight">
                {user ? user.name : 'Guest User'}
              </h2>

              <p className="text-[#8B8B98] mt-3 text-[16px]">
                {user
                  ? user.email
                  : 'Sign in to unlock all features'}
              </p>

              {!user && (
                <button
                  onClick={onLogin}
                  className="mt-9 w-full h-[60px] rounded-[22px] bg-[#5B3DF5] text-white font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Login Now
                </button>
              )}
            </div>
          </div>

          {/* SETTINGS */}
          <div className="bg-white rounded-[38px] p-7 border border-[#ECECF2]">
            <p className="text-[12px] tracking-[0.25em] font-black text-[#A1A1B0] mb-5">
              ACCOUNT SETTINGS
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  name: 'Personal Info',
                  icon: <User size={18} />,
                },
                {
                  name: 'Payment Methods',
                  icon: <CreditCard size={18} />,
                },
                {
                  name: 'Security',
                  icon: <Shield size={18} />,
                },
                {
                  name: 'Privacy',
                  icon: <Smartphone size={18} />,
                },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() =>
                    setSubSection(item.name)
                  }
                  className={`h-[66px] rounded-[22px] px-5 flex items-center justify-between transition-all ${
                    subSection === item.name
                      ? 'bg-[#F1EEFF] text-[#5B3DF5]'
                      : 'hover:bg-[#F8F8FC] text-[#7B7B8B]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-[18px] flex items-center justify-center ${
                        subSection === item.name
                          ? 'bg-white'
                          : 'bg-[#F3F3F8]'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <span className="font-black text-[15px]">
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-8">
          {/* CONTENT */}
          <div className="bg-white rounded-[38px] p-8 lg:p-10 border border-[#ECECF2] min-h-[420px]">
            {renderContent()}
          </div>

          {/* WATCH HISTORY */}
          <div className="bg-white rounded-[38px] p-8 border border-[#ECECF2]">
            <h3 className="text-[30px] font-black text-[#111111] mb-7">
              Watching History
            </h3>

            <div className="flex flex-col gap-4">
              {[
                {
                  title: 'Real Madrid vs Man City',
                  date: 'Yesterday',
                },
                {
                  title: 'Liverpool vs Chelsea',
                  date: '2 days ago',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="h-[96px] rounded-[28px] bg-[#F7F7FB] px-6 flex items-center justify-between border border-[#EFEFF5]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <Play
                        size={20}
                        className="text-[#5B3DF5] fill-[#5B3DF5]"
                      />
                    </div>

                    <div>
                      <h4 className="font-black text-[19px] text-[#111111]">
                        {item.title}
                      </h4>

                      <p className="text-[#8B8B98] text-sm mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <button className="text-[#5B3DF5] font-black text-sm hover:underline">
                    Watch Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-5">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />

          <div className="relative bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-[18px] bg-[#F5F5FA] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-9">
              <h3 className="text-[36px] font-black text-[#111111]">
                {editingMethod
                  ? 'Edit Payment Method'
                  : 'Add Payment Method'}
              </h3>

              <p className="text-[#8B8B98] mt-2">
                Add a debit card or mobile money account
              </p>
            </div>

            {/* Type */}
            <div className="flex bg-[#F5F5F9] rounded-[24px] p-1.5 mb-8">
              {[
                {
                  type: 'Card',
                  icon: <CreditCard size={18} />,
                },
                {
                  type: 'Mobile Money',
                  icon: <Wallet size={18} />,
                },
              ].map((item: any) => (
                <button
                  key={item.type}
                  onClick={() =>
                    setNewMethodType(item.type)
                  }
                  className={`flex-1 h-[62px] rounded-[20px] font-black transition-all flex items-center justify-center gap-3 ${
                    newMethodType === item.type
                      ? 'bg-white shadow-sm text-[#111111]'
                      : 'text-[#8B8B98]'
                  }`}
                >
                  {item.icon}
                  {item.type}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                  ACCOUNT HOLDER
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.holderName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      holderName: e.target.value,
                    })
                  }
                  className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                />
              </div>

              {newMethodType === 'Card' ? (
                <>
                  <div>
                    <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                      CARD NUMBER
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cardNumber: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                        EXPIRY DATE
                      </label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiry: e.target.value,
                          })
                        }
                        className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cvv: e.target.value,
                          })
                        }
                        className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                      MOBILE MONEY PROVIDER
                    </label>

                    <select
                      value={formData.mmProvider}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mmProvider: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                    >
                      <option>M-Pesa</option>
                      <option>Airtel Money</option>
                      <option>Tigo Pesa</option>
                      <option>HaloPesa</option>
                      <option>MTN MoMo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-black tracking-[0.25em] text-[#A1A1B0]">
                      PHONE NUMBER
                    </label>

                    <input
                      type="text"
                      placeholder="+255 742 000 123"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="mt-2 w-full h-[64px] rounded-[22px] border border-[#ECECF2] px-6 outline-none focus:ring-2 ring-[#5B3DF5]/20 bg-[#FAFAFD]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="mt-9 w-full h-[66px] rounded-[24px] bg-[#111111] text-white font-black tracking-[0.15em] hover:bg-[#5B3DF5] transition-all shadow-xl"
            >
              {editingMethod
                ? 'SAVE CHANGES'
                : 'ADD PAYMENT METHOD'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};