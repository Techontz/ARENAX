'use client';

import React, {
  useState,
  useEffect,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { Sidebar } from '@/components/layout/Sidebar';

import { Header } from '@/components/layout/Header';

import { MobileNav } from '@/components/layout/MobileNav';

import { VideoPlayer } from '@/components/player/VideoPlayer';

import { ChatPanel } from '@/components/chat/ChatPanel';

import { LiveMatchesView } from '@/components/matches/LiveMatchesView';

import { ScheduleView } from '@/components/matches/ScheduleView';

import { MyListView } from '@/components/matches/MyListView';

import { ProfileView } from '@/components/profile/ProfileView';

import { SubscriptionPromo } from '@/components/subscription/SubscriptionPromo';

import { LogoutDialog } from '@/components/modals/LogoutDialog';

import { SubscriptionModal } from '@/components/modals/SubscriptionModal';

import {
  User,
  PaymentMethod,
  Plan,
} from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] =
  useState('Live');

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTab =
      localStorage.getItem(
        'activeTab'
      );

    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        'activeTab',
        activeTab
      );
    }
  }, [activeTab, mounted]);

  const [user, setUser] =
    useState<User | null>({
      name: 'tech tech',

      email:
        'techtech@gmail.com',

      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',

      isPremium: false,
    });

  const [
    showLogoutDialog,
    setShowLogoutDialog,
  ] = useState(false);

  const [
    showSubModal,
    setShowSubModal,
  ] = useState(false);

  const [subStep, setSubStep] =
    useState<
      'plans' | 'payment'
    >('plans');

  const [
    paymentMethods,
    setPaymentMethods,
  ] = useState<
    PaymentMethod[]
  >([
    {
      id: '1',

      type: 'Card',

      provider: 'Visa',

      last4: '4242',

      expiry: '12/26',

      isPrimary: true,
    },

    {
      id: '2',

      type: 'Mobile Money',

      provider: 'M-Pesa',

      last4: '8812',

      expiry: 'N/A',

      isPrimary: false,
    },
  ]);

  const handleLogin = () => {
    setUser({
      name: 'tech tech',

      email:
        'techtech@gmail.com',

      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',

      isPremium: false,
    });
  };

  const handleLogout = () => {
    setUser(null);

    setShowLogoutDialog(
      false
    );
  };

  const handleSubscribe =
    () => {
      setSubStep('plans');

      setShowSubModal(true);
    };

  const handlePlanSelect = (
    plan: Plan
  ) => {
    setSubStep('payment');
  };

  const handlePaymentConfirm =
    (
      method: PaymentMethod
    ) => {
      if (user) {
        setUser({
          ...user,

          isPremium: true,
        });
      }

      setShowSubModal(false);
    };

  const handleAddPayment = (
    method: any
  ) => {
    if (method) {
      setPaymentMethods([
        ...paymentMethods,

        method,
      ]);
    } else {
      setActiveTab(
        'Profile'
      );
    }
  };

  const handleDeletePayment = (
    id: string
  ) => {
    setPaymentMethods(
      paymentMethods.filter(
        (p) => p.id !== id
      )
    );
  };

  const handleEditPayment = (
    updated: PaymentMethod
  ) => {
    setPaymentMethods(
      paymentMethods.map((p) =>
        p.id === updated.id
          ? updated
          : p
      )
    );
  };

  if (!mounted) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-main)]">
      <Sidebar
        active={activeTab}
        setActive={
          setActiveTab
        }
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          active={activeTab}
          setActive={
            setActiveTab
          }
          user={user}
          onLogin={
            handleLogin
          }
          onSubscribe={
            handleSubscribe
          }
          onLogoutClick={() =>
            setShowLogoutDialog(
              true
            )
          }
        />

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 flex flex-col xl:flex-row gap-8 max-w-[1600px] mx-auto w-full">
          <div className="flex-1 flex flex-col gap-8 min-w-0 order-2 xl:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="flex flex-col gap-8"
              >
                {activeTab ===
                'Live' ? (
                  <>
                    <VideoPlayer />

                    <div className="flex flex-col gap-10">
                      {/* LIVE MATCHES */}
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-1">
                          <h2 className="text-lg lg:text-xl font-bold">
                            Trending
                            Live
                          </h2>

                          <button
                            onClick={() =>
                              setActiveTab(
                                'All Matches'
                              )
                            }
                            className="text-[var(--color-brand)] text-xs lg:text-sm font-bold hover:underline"
                          >
                            View
                            All
                          </button>
                        </div>

                        <LiveMatchesView />
                      </div>

                      {/* COMING SOON */}
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-1">
                          <div>
                            <h2 className="text-lg lg:text-xl font-bold">
                              Coming
                              Soon
                              Matches
                            </h2>

                            <p className="text-xs text-[var(--color-text-secondary)]">
                              Today's
                              upcoming
                              football
                              fixtures
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              setActiveTab(
                                'Schedule'
                              )
                            }
                            className="text-[var(--color-brand)] text-xs lg:text-sm font-bold hover:underline"
                          >
                            View
                            All
                          </button>
                        </div>

                        <ScheduleView showHeader={false} />
                      </div>
                    </div>

                    <SubscriptionPromo
                      onSubscribe={
                        handleSubscribe
                      }
                      isPremium={
                        user?.isPremium ||
                        false
                      }
                    />
                  </>
                ) : activeTab ===
                  'Schedule' ? (
                  <ScheduleView />
                ) : activeTab ===
                  'All Matches' ? (
                  <div className="flex flex-col gap-10">
                    {/* LIVE MATCHES */}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">
                            Live
                            Matches
                          </h2>

                          <p className="text-sm text-[var(--color-text-secondary)]">
                            Currently
                            streaming
                            football
                            matches
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setActiveTab(
                              'Live'
                            )
                          }
                          className="px-4 py-2 rounded-full border border-[var(--color-border-main)] text-sm font-bold hover:bg-[var(--color-brand)] hover:text-white transition-all"
                        >
                          Back
                        </button>
                      </div>

                      <LiveMatchesView />
                    </div>

                    {/* TODAY FIXTURES */}
                    <div className="flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Today's
                          Matches
                        </h2>

                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Upcoming
                          football
                          fixtures
                          today
                        </p>
                      </div>

                      <ScheduleView />
                    </div>
                  </div>
                ) : activeTab ===
                  'My List' ? (
                  <MyListView
                    matches={[]}
                  />
                ) : activeTab ===
                  'Chat' ? (
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <VideoPlayer />
                    </div>

                    <div className="flex-1 min-h-[600px]">
                      <ChatPanel />
                    </div>
                  </div>
                ) : activeTab ===
                  'Profile' ? (
                  <ProfileView
                    paymentMethods={
                      paymentMethods
                    }
                    onAddPayment={
                      handleAddPayment
                    }
                    onDeletePayment={
                      handleDeletePayment
                    }
                    onEditPayment={
                      handleEditPayment
                    }
                    user={user}
                    onLogin={
                      handleLogin
                    }
                  />
                ) : (
                  <div className="premium-card p-20 flex flex-col items-center justify-center text-center gap-4 bg-white/50 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <p className="text-4xl">
                        ⚙️
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">
                        {
                          activeTab
                        }{' '}
                        section is
                        coming
                        soon
                      </h3>

                      <p className="text-[var(--color-text-secondary)]">
                        We are
                        working on
                        bringing
                        premium
                        football
                        content to
                        your
                        screen.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setActiveTab(
                          'Live'
                        )
                      }
                      className="mt-4 px-6 py-2 bg-[var(--color-brand)] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Return to
                      Live
                      Matches
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT CHAT */}
          {activeTab !==
            'Chat' &&
            activeTab !==
              'Profile' && (
              <div className="hidden lg:block lg:w-full lg:max-w-none xl:w-[350px] shrink-0 h-auto xl:h-[calc(100vh-144px)] xl:sticky xl:top-[104px] order-3">
                <ChatPanel />
              </div>
            )}
        </main>
      </div>

      <MobileNav
        active={activeTab}
        setActive={
          setActiveTab
        }
      />

      <LogoutDialog
        isOpen={
          showLogoutDialog
        }
        onClose={() =>
          setShowLogoutDialog(
            false
          )
        }
        onConfirm={
          handleLogout
        }
      />

      <SubscriptionModal
        isOpen={showSubModal}
        onClose={() =>
          setShowSubModal(
            false
          )
        }
        step={subStep}
        onSelectPlan={
          handlePlanSelect
        }
        onConfirmPayment={
          handlePaymentConfirm
        }
        paymentMethods={
          paymentMethods
        }
        onAddPayment={
          handleAddPayment
        }
      />
    </div>
  );
}