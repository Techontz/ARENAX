'use client';

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';

import {
  MoreVertical,
  Send,
  Heart,
  MessageCircle,
  ThumbsDown,
} from 'lucide-react';

import { chatMessages as initialMessages } from '@/data';

interface ChatPanelProps {
  isMobile?: boolean;
}

interface MessageType {
  id: string;
  user: string;
  avatar: string;
  message: string;
  time: string;

  likes?: number;
  dislikes?: number;
  replies?: MessageType[];
}

export const ChatPanel = ({
  isMobile = false,
}: ChatPanelProps) => {
  const [msg, setMsg] = useState('');

  const [replyingTo, setReplyingTo] =
    useState<string | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const preparedMessages = initialMessages.map(
        (m) => ({
          ...m,
    
          likes: Math.floor(
            Math.random() * 20
          ),
    
          dislikes: Math.floor(
            Math.random() * 5
          ),
    
          replies: [],
        })
      );
    
      setMessages(preparedMessages);
    }, []);
    
  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  // VIEWERS
  const viewers = useMemo(() => {
    return `${(1.2 + messages.length / 100).toFixed(
      1
    )}K`;
  }, [messages]);

  // LIKE
  const handleLike = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              likes: (m.likes || 0) + 1,
            }
          : m
      )
    );
  };

  // DISLIKE
  const handleDislike = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              dislikes: (m.dislikes || 0) + 1,
            }
          : m
      )
    );
  };

  // SEND MESSAGE / REPLY
  const handleSend = () => {
    if (!msg.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      user: 'You',
      avatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      message: msg,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    // REPLY
    if (replyingTo) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === replyingTo
            ? {
                ...m,
                replies: [
                  ...(m.replies || []),
                  newMessage,
                ],
              }
            : m
        )
      );

      setReplyingTo(null);
    } else {
      // NORMAL MESSAGE
      setMessages((prev) => [...prev, newMessage]);
    }

    setMsg('');
  };

  // ENTER SEND
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      className={`premium-card flex flex-col overflow-hidden ${
        isMobile ? 'h-[400px]' : 'h-full'
      }`}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-[var(--color-border-main)] flex items-center justify-between bg-white/70 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="font-black text-[15px] text-[var(--color-text-primary)]">
            Live Chat
          </span>

          <span className="text-[10px] text-[var(--color-text-secondary)]">
            {viewers} watching
          </span>
        </div>

        <button className="w-9 h-9 rounded-2xl hover:bg-[#F3F3F8] flex items-center justify-center text-[var(--color-text-secondary)] transition-all">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar flex flex-col gap-3 bg-[#FAFAFD]">
        {messages.map((m) => {
          const isMe = m.user === 'You';

          return (
            <div key={m.id} className="flex flex-col">
              {/* MAIN MESSAGE */}
              <div
                className={`flex gap-2 ${
                  isMe ? 'justify-end' : ''
                }`}
              >
                {!isMe && (
                  <img
                    src={m.avatar}
                    alt={m.user}
                    className="w-7 h-7 rounded-full shrink-0 ring-2 ring-white shadow-sm"
                  />
                )}

                <div
                  className={`flex flex-col max-w-[88%] ${
                    isMe ? 'items-end' : ''
                  }`}
                >
                  {/* NAME */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[11px] font-black ${
                        isMe
                          ? 'text-[#5B3DF5]'
                          : 'text-[var(--color-text-primary)]'
                      }`}
                    >
                      {m.user}
                    </span>

                    <span className="text-[9px] text-[var(--color-text-secondary)]">
                      {m.time}
                    </span>
                  </div>

                  {/* BUBBLE */}
                  <div
                    className={`px-3 py-2 rounded-[18px] text-[12px] leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-[#5B3DF5] text-white rounded-br-md'
                        : 'bg-white text-[var(--color-text-primary)] rounded-bl-md border border-[#ECECF2]'
                    }`}
                  >
                    {m.message}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4 mt-1.5 px-1">
                    {/* LIKE */}
                    <button
                      onClick={() =>
                        handleLike(m.id)
                      }
                      className="flex items-center gap-1 text-[#8B8B98] hover:text-pink-500 transition-all"
                    >
                      <Heart size={13} />

                      <span className="text-[10px] font-bold">
                        {m.likes}
                      </span>
                    </button>

                    {/* DISLIKE */}
                    <button
                      onClick={() =>
                        handleDislike(m.id)
                      }
                      className="flex items-center gap-1 text-[#8B8B98] hover:text-red-500 transition-all"
                    >
                      <ThumbsDown size={13} />

                      <span className="text-[10px] font-bold">
                        {m.dislikes}
                      </span>
                    </button>

                    {/* REPLY */}
                    <button
                      onClick={() =>
                        setReplyingTo(m.id)
                      }
                      className="flex items-center gap-1 text-[#8B8B98] hover:text-[#5B3DF5] transition-all"
                    >
                      <MessageCircle size={13} />

                      <span className="text-[10px] font-bold">
                        Reply
                      </span>
                    </button>
                  </div>

                  {/* REPLIES */}
                  {m.replies &&
                    m.replies.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2 pl-3 border-l border-[#E7E7EF]">
                        {m.replies.map((r) => (
                          <div
                            key={r.id}
                            className="flex gap-2"
                          >
                            <img
                              src={r.avatar}
                              alt={r.user}
                              className="w-6 h-6 rounded-full"
                            />

                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-[#5B3DF5]">
                                  {r.user}
                                </span>

                                <span className="text-[8px] text-[#A0A0AE]">
                                  {r.time}
                                </span>
                              </div>

                              <div className="bg-[#F3F3F8] rounded-[14px] px-3 py-2 text-[11px] mt-1 text-[#222]">
                                {r.message}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {isMe && (
                  <img
                    src={m.avatar}
                    alt={m.user}
                    className="w-7 h-7 rounded-full shrink-0 ring-2 ring-white shadow-sm"
                  />
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-[var(--color-border-main)] bg-white">
        {/* REPLYING */}
        {replyingTo && (
          <div className="mb-2 text-[11px] text-[#5B3DF5] font-bold">
            Replying to message...
          </div>
        )}

        <div className="flex items-center gap-3 bg-[#F3F3F8] rounded-[22px] px-4 py-2">
          <input
            type="text"
            placeholder={
              replyingTo
                ? 'Write a reply...'
                : 'Say something...'
            }
            className="flex-1 bg-transparent outline-none text-[12px] font-medium text-[var(--color-text-primary)] placeholder:text-[#A0A0AE]"
            value={msg}
            onChange={(e) =>
              setMsg(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSend}
            className={`w-9 h-9 rounded-[14px] flex items-center justify-center text-white shrink-0 shadow-lg transition-all ${
              msg.trim()
                ? 'bg-[#5B3DF5] hover:scale-105 active:scale-95'
                : 'bg-[#C9C9D8] cursor-not-allowed'
            }`}
            disabled={!msg.trim()}
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};