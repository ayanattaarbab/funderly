'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

/* ============================== decorative backdrop ============================== */
const AmbientBackdrop = ({ className = '' }) => (
  <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(#c7d2fe_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
    <div className="orbit-a absolute -top-24 left-[8%] w-72 h-72 bg-indigo-400/15 rounded-full blur-[100px]" />
    <div className="orbit-b absolute -top-10 right-[5%] w-64 h-64 bg-purple-400/15 rounded-full blur-[100px]" />
    <div className="orbit-a absolute top-20 left-[45%] w-56 h-56 bg-teal-300/10 rounded-full blur-[90px]" style={{ animationDelay: '1.4s' }} />
  </div>
);

/* ============================== icons ============================== */
const IconInstagram = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconYoutube = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" stroke="none" />
  </svg>
);
const IconTiktok = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.7 0h-3.4v15.6a3.1 3.1 0 1 1-2.4-3.02V8.9a6.6 6.6 0 1 0 5.8 6.55V7.9a8.4 8.4 0 0 0 4.9 1.57V6.1A5.1 5.1 0 0 1 16.7 0Z" />
  </svg>
);
const IconX = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m13.6 10.3 7.2-8.3h-1.7l-6.2 7.2-5-7.2H2l7.6 10.9L2 22.1h1.7l6.6-7.6 5.2 7.6H21l-7.4-11.8Zm-2.3 2.7-.8-1.1L4.4 3h2.6l4.9 7 .8 1.1 6.4 9.1h-2.6l-5.2-7.2Z" />
  </svg>
);
const IconTwitch = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.3 0 1.1 3.2v17.6h6v3.2h3.2l3.2-3.2H18l4.9-4.9V0H4.3Zm16.8 15.5-3.2 3.2h-4.9L9.9 22V18.7H4.9V1.9h16.2v13.6Z" />
    <rect x="14.5" y="5.8" width="1.8" height="5.5" />
    <rect x="9.4" y="5.8" width="1.8" height="5.5" />
  </svg>
);
const IconDiscord = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5c1.8.5 2.9 1.1 4 1.9a13.6 13.6 0 0 0-15.9 0c1.1-.8 2.2-1.4 4-1.9L7 3a19.8 19.8 0 0 0-4.9 1.4C.3 8.7-.4 12.8.2 16.8a20 20 0 0 0 6 3l1-1.6a11.6 11.6 0 0 1-1.9-.9l.4-.3a14.1 14.1 0 0 0 12.6 0l.4.3c-.6.4-1.2.6-1.9.9l1 1.6a19.9 19.9 0 0 0 6-3c.7-4.6-.4-8.6-3.5-12.4ZM8.5 14.6c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.9.9 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Zm7 0c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.9.9 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Z" />
  </svg>
);
const IconLinkedin = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0ZM7.1 20.5H3.6V9h3.6v11.5ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM20.5 20.5H17v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.5V9H13v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3Z" />
  </svg>
);
const IconFacebook = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);
const IconLink = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 14.5 14.5 9.5" />
    <path d="M11.5 6 13 4.5a3.54 3.54 0 0 1 5 5L16.5 11" />
    <path d="M12.5 18 11 19.5a3.54 3.54 0 0 1-5-5L7.5 13" />
  </svg>
);
const IconCheck = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconXMark = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconSpinner = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const IconShare = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" />
    <path d="m8.3 10.7 7.4-4.1M8.3 13.3l7.4 4.1" />
  </svg>
);
const IconLock = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  </svg>
);
const IconPin = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);
const IconGlobe = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
);
const IconHeartHands = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 16 6 6" />
    <circle cx="16" cy="9" r="2.9" />
    <circle cx="6" cy="5" r="3" />
  </svg>
);
const IconUsers = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
    <circle cx="9" cy="7" r="3.2" />
    <path d="M22 21v-1a4 4 0 0 0-3-3.87" />
    <path d="M16.5 3.4a3.2 3.2 0 0 1 0 6.2" />
  </svg>
);
const IconWallet = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1" />
    <path d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19H19a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H6" />
    <circle cx="16.2" cy="13.5" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: IconInstagram, color: 'text-pink-600 bg-pink-50 hover:bg-pink-100' },
  { key: 'youtube', label: 'YouTube', icon: IconYoutube, color: 'text-red-600 bg-red-50 hover:bg-red-100' },
  { key: 'tiktok', label: 'TikTok', icon: IconTiktok, color: 'text-slate-900 bg-slate-100 hover:bg-slate-200' },
  { key: 'x', label: 'X / Twitter', icon: IconX, color: 'text-slate-900 bg-slate-100 hover:bg-slate-200' },
  { key: 'twitch', label: 'Twitch', icon: IconTwitch, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
  { key: 'discord', label: 'Discord', icon: IconDiscord, color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' },
  { key: 'linkedin', label: 'LinkedIn', icon: IconLinkedin, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
  { key: 'facebook', label: 'Facebook', icon: IconFacebook, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
];

/* ============================== helpers ============================== */
const fmtMoney = (n, currency = 'PKR') =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

const fmtCompact = (n) => new Intl.NumberFormat('en-PK', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

const fmtWhole = (n) => new Intl.NumberFormat('en-PK').format(n);

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join('');

/* ============================== small primitives ============================== */
const PrimaryButton = ({ children, onClick, disabled, loading, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`group relative flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-indigo-600/15 hover:shadow-xl hover:shadow-indigo-600/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${className}`}
  >
    <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
    <span className="relative z-10 flex items-center gap-2">
      {loading && <IconSpinner />}
      {children}
    </span>
  </button>
);

/* ============================== full-page payment result overlay ============================== */
function PaymentResultOverlay({ status, amount, currency, name, message, onDismiss }) {
  const [drawn, setDrawn] = useState(false);
  const isSuccess = status === 'success';

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDrawn(true));
    const timer = setTimeout(() => onDismiss?.(), 6000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-slate-900/55 backdrop-blur-md animate-fade-up">
      <div style={{ perspective: 1000 }} className="w-full max-w-sm">
        <div className="relative glass-card border border-white/50 rounded-3xl shadow-2xl shadow-slate-900/25 px-6 sm:px-8 py-9 sm:py-10 text-center animate-card3d">
          <button
            onClick={onDismiss}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <IconXMark className="w-4 h-4" />
          </button>

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`absolute inset-0 rounded-full border-2 ${isSuccess ? 'border-emerald-400/50' : 'border-rose-400/50'} animate-ripple`}
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            ))}
            <div
              className={`relative w-full h-full rounded-full flex items-center justify-center shadow-xl ${
                isSuccess
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-emerald-600/30'
                  : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-600/30'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 sm:w-12 sm:h-12 text-white">
                {isSuccess ? (
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    className="tick-path"
                    style={{ strokeDashoffset: drawn ? 0 : 1 }}
                  />
                ) : (
                  <>
                    <path
                      d="M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength="1"
                      className="cross-path-1"
                      style={{ strokeDashoffset: drawn ? 0 : 1 }}
                    />
                    <path
                      d="M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength="1"
                      className="cross-path-2"
                      style={{ strokeDashoffset: drawn ? 0 : 1 }}
                    />
                  </>
                )}
              </svg>
            </div>
          </div>

          <h3 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
            {isSuccess ? 'Payment successful!' : 'Payment cancelled'}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-7">
            {isSuccess ? (
              <>
                Your support of <span className="font-bold text-slate-800">{fmtMoney(amount || 0, currency)}</span>
                {name ? <> is on its way to <span className="font-bold text-slate-800">{name}</span></> : ' is on its way'}. Thank you!
              </>
            ) : (
              message || 'You were not charged. Feel free to try again whenever you\u2019re ready.'
            )}
          </p>

          <PrimaryButton className="w-full" onClick={onDismiss}>
            {isSuccess ? 'Back to profile' : 'Try again'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ============================== support / payment panel ============================== */
const PRESETS = [100, 500, 1000, 2500];

function SupportPanel({ creator, onPulse, initialThankYou }) {
  const currency = 'PKR';
  const [amount, setAmount] = useState(initialThankYou?.amount || 500);
  const [custom, setCustom] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [stage, setStage] = useState(initialThankYou ? 'done' : 'form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flyChip, setFlyChip] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    if (initialThankYou) {
      setAmount(initialThankYou.amount);
      setStage('done');
    }
  }, [initialThankYou]);

  const finalAmount = custom !== '' ? Number(custom) : amount;
  const firstName = (creator.name || 'this creator').split(' ')[0];

  const pickPreset = (v) => {
    setAmount(v);
    setCustom('');
    triggerFly(v);
  };

  const triggerFly = (v) => {
    const id = Date.now();
    setFlyChip({ amount: v, id });
    onPulse?.();
    setTimeout(() => setFlyChip((c) => (c?.id === id ? null : c)), 700);
  };

  const handleContinue = () => {
    if (!finalAmount || finalAmount <= 0) return;
    setStage('review');
  };

  const handleConfirm = async () => {
    setStage('processing');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: creator.username,
          amount: finalAmount,
          currency: currency,
          supporterName: name,
          supporterMessage: message,
          isAnonymous: anonymous
        }),
      });
      
      const data = await res.json();
      if (!res.ok || !data.url || !data.orderId) throw new Error(data.error || 'Init failed');

      const isAutoAnon = !name && !anonymous;
      const supporterPayload = {
        name: (anonymous || isAutoAnon) ? null : name,
        amount: finalAmount,
        message: message,
        anonymous: anonymous || isAutoAnon,
        status: 'pending',
        orderId: data.orderId,
        time: 'Just now'
      };
      const key = `funderly_pending_support_${data.orderId}`;
      typeof window !== 'undefined' && sessionStorage.setItem(key, JSON.stringify(supporterPayload));

      window.location.assign(data.url);
    } catch (err) {
      console.error('Submission error:', err);
      setPaymentError('Failed to load gateway.');
      setStage('review');
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStage('form');
    setMessage('');
    setCustom('');
    setName('');
    setAnonymous(false);
    setAmount(500);
  };

  return (
    <div className="relative glass-card border border-slate-200/70 rounded-3xl shadow-2xl shadow-indigo-900/[0.08] overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-slate-100 bg-gradient-to-br from-indigo-50/60 to-purple-50/40">
        <div className="flex items-center gap-2 text-indigo-600 mb-1.5">
          <IconHeartHands className="w-4 h-4" />
          <span className="text-[11px] font-extrabold tracking-wide uppercase">Support</span>
        </div>
        <h3 className="font-outfit text-lg font-extrabold text-slate-900 leading-snug">
          Support {firstName}
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">One-time. No subscription, no tiers — it goes straight to {firstName}.</p>
      </div>

      {stage === 'done' ? (
        <div className="px-6 py-8 text-center animate-fade-up">
          <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <IconCheck className="w-5 h-5" />
          </div>
          <h4 className="font-outfit text-base font-extrabold text-slate-900 mb-1">Sent — thank you!</h4>
          <p className="text-xs text-slate-500 mb-5">
            {fmtMoney(finalAmount, currency)} is on its way to {firstName}. Your support helps keep this channel alive!
          </p>
          <button onClick={reset} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer">
            Support again
          </button>
        </div>
      ) : stage === 'review' ? (
        <div className="px-6 py-6 animate-fade-up">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">Review your support</p>
          <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
            <span className="text-xs text-slate-500">Amount</span>
            <span className="text-sm font-extrabold text-slate-900">{fmtMoney(finalAmount, currency)}</span>
          </div>
          <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
            <span className="text-xs text-slate-500">From</span>
            <span className="text-sm font-bold text-slate-900">{anonymous ? 'Anonymous' : (name || 'Guest Supporter')}</span>
          </div>
          {message && (
            <div className="py-2.5 border-b border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Message</span>
              <p className="text-sm text-slate-800 italic leading-relaxed">&ldquo;{message}&rdquo;</p>
            </div>
          )}
          <div className="flex items-center justify-between py-2.5 mb-5">
            <span className="text-xs text-slate-500">Goes to</span>
            <span className="text-sm font-bold text-slate-900">{firstName}&rsquo;s payout account</span>
          </div>

          {paymentError && (
            <p className="text-xs text-red-500 font-semibold mb-3 -mt-2">{paymentError}</p>
          )}

          <PrimaryButton className="w-full" loading={isSubmitting} onClick={handleConfirm}>
            Confirm &amp; pay {fmtMoney(finalAmount, currency)}
          </PrimaryButton>
          <button
            onClick={() => setStage('form')}
            className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-slate-600 mt-3 cursor-pointer"
          >
            Back to edit
          </button>
        </div>
      ) : stage === 'processing' ? (
        <div className="px-6 py-14 text-center">
          <IconSpinner className="w-6 h-6 text-indigo-600 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">Redirecting you to Safepay…</p>
        </div>
      ) : (
        <div className="px-6 py-6">
          <div className="grid grid-cols-4 gap-2 mb-4 relative">
            {PRESETS.map((v) => {
              const active = custom === '' && amount === v;
              return (
                <button
                  key={v}
                  onClick={() => pickPreset(v)}
                  className={`relative flex flex-col items-center justify-center gap-0.5 py-2.5 sm:py-3 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <span className={`text-[9px] font-bold uppercase tracking-wide ${active ? 'text-white/70' : 'text-slate-400'}`}>PKR</span>
                  <span className="text-sm sm:text-base font-extrabold leading-none">{fmtWhole(v)}</span>
                  {flyChip?.id && flyChip.amount === v && (
                    <span className="fly-chip pointer-events-none absolute left-1/2 -top-1 -translate-x-1/2 text-[11px] font-extrabold text-indigo-600 whitespace-nowrap">
                      +PKR {fmtWhole(v)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative mb-4">
            <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pr-3 border-r border-slate-200 pointer-events-none">
              <span className="text-slate-500 font-bold text-sm">PKR</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min="1"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-20 pr-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <textarea
            rows={2}
            maxLength={200}
            placeholder={`Your Message (optional)`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none mb-3"
          />

          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              disabled={anonymous}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 shrink-0 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-indigo-600"
              />
              Give anonymously
            </label>
          </div>

          <PrimaryButton className="w-full" disabled={!finalAmount || finalAmount <= 0} onClick={handleContinue}>
            Support {firstName} · {finalAmount ? fmtMoney(finalAmount, currency) : '—'}
          </PrimaryButton>

          <p className="text-[10px] text-slate-400 mt-4 flex items-start gap-1.5">
            <IconLock className="w-3 h-3 mt-0.5 shrink-0 text-indigo-500/70" />
            Encrypted checkout. Funds go straight to {firstName}&rsquo;s payout account — no holding period, no platform tier.
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================== supporters wall ============================== */
function SupportersWall({ supporters = [], currency = 'PKR' }) {
  if (!supporters || supporters.length === 0) {
    return (
      <div className="glass-card border border-slate-200/70 rounded-3xl p-6 text-center shadow-lg shadow-slate-900/[0.03]">
        <h3 className="font-outfit text-base font-extrabold text-slate-900 mb-1">Recent support</h3>
        <p className="text-xs text-slate-400 py-4">Be the first to back this creator!</p>
      </div>
    );
  }

  return (
    <div className="glass-card border border-slate-200/70 rounded-3xl p-6 shadow-lg shadow-slate-900/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-outfit text-base font-extrabold text-slate-900">Recent support</h3>
        <span className="text-[11px] font-semibold text-slate-400">{supporters.length} shown</span>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto slim-scroll pr-1">
        {supporters.map((s, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0 transition-colors hover:bg-slate-50/60 rounded-xl -mx-2 px-2 py-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-extrabold ${
              s.anonymous ? 'bg-slate-100 text-slate-400' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700'
            }`}>
              {s.anonymous ? '?' : initials(s.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-slate-800 truncate">{s.anonymous ? 'Anonymous' : s.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-extrabold text-indigo-600">{fmtMoney(s.amount, currency)}</span>
                  {s.status === 'success' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0" title="Payment successful">
                      <IconCheck className="w-3 h-3" />
                    </span>
                  )}
                  {s.status === 'cancelled' && (
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0" title="Payment cancelled">
                      <IconXMark className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
              {s.message && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.message}</p>}
              <span className="text-[10px] text-slate-400 mt-1 block">{s.time || 'Recently'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== main component ============================== */
export default function CreatorProfile({ creator }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [avatarPulse, setAvatarPulse] = useState(false);
  const [copied, setCopied] = useState(false);
  const [justPaid, setJustPaid] = useState(null);
  const [resultOverlay, setResultOverlay] = useState(null);

  const [supporters, setSupporters] = useState(creator.supporters || []);
  const [stats, setStats] = useState(creator.stats || { supporterCount: 0, totalRaised: 0 });

  const supportRef = useRef(null);

  const socials = useMemo(
    () => SOCIAL_PLATFORMS.filter((p) => creator.links?.[p.key]),
    [creator.links]
  );

  const customLinks = creator.customLinks || [];
  const goal = creator.goal;
  const goalPct = goal ? Math.min(100, Math.round((goal.raised / goal.target) * 100)) : 0;

  const pulseAvatar = () => {
    setAvatarPulse(true);
    setTimeout(() => setAvatarPulse(false), 900);
  };

  const handleNewSupport = (newSupporter) => {
    setSupporters((prev) => {
      const existing = newSupporter.orderId ? prev.some((s) => s.orderId === newSupporter.orderId) : false;
      const next = newSupporter.orderId
        ? [newSupporter, ...prev.filter((s) => s.orderId !== newSupporter.orderId)]
        : [newSupporter, ...prev];

      if (!existing) {
        setStats((prevStats) => ({
          supporterCount: prevStats.supporterCount + 1,
          totalRaised: prevStats.totalRaised + newSupporter.amount
        }));
      }

      return next;
    });
  };

  useEffect(() => {
    const payment = searchParams.get('payment');
    const orderId = searchParams.get('order_id');

    if (payment === 'success' && orderId) {
      const key = `funderly_pending_support_${orderId}`;
      const stored = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
      if (stored) {
        try {
          const payload = JSON.parse(stored);
          handleNewSupport({ ...payload, status: 'success', orderId });
          setJustPaid({ ...payload, status: 'success', orderId });
          setResultOverlay({
            status: 'success',
            amount: payload.amount,
            currency: creator.currency,
            name: creator.name?.split(' ')[0],
          });
          pulseAvatar();
        } catch (err) {
          console.error('Failed to parse pending support payload:', err);
        }
        sessionStorage.removeItem(key);
      }
      router.replace(`/${creator.username}`, { scroll: false });
    } else if (payment === 'cancelled') {
      setResultOverlay({
        status: 'failed',
        message: 'Payment was cancelled — you were not charged.',
      });
      router.replace(`/${creator.username}`, { scroll: false });
    }
  }, [searchParams]);

  const scrollToSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

const handleShare = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : 'https://funderly.com');
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/${creator.username}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const dismissOverlay = () => {
    const wasFailed = resultOverlay?.status === 'failed';
    setResultOverlay(null);
    if (wasFailed) scrollToSupport();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] font-jakarta antialiased">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        html { scroll-behavior: smooth; }
        .font-outfit { font-family: 'Outfit', sans-serif !important; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes pop { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop { animation: pop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes ring-pulse { 0% { box-shadow: 0 0 0 0 rgba(79,70,229,0.45); } 100% { box-shadow: 0 0 0 18px rgba(79,70,229,0); } }
        .avatar-pulse { animation: ring-pulse 0.9s ease-out; }
        @keyframes fly-up { 0% { opacity: 0; transform: translate(-50%, 4px) scale(0.8); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -26px) scale(1); } }
        .fly-chip { animation: fly-up 0.7s ease-out both; }
        @keyframes orbit-a { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(4px, -6px); } }
        @keyframes orbit-b { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(-5px, 5px); } }
        .orbit-a { animation: orbit-a 5s ease-in-out infinite; }
        .orbit-b { animation: orbit-b 6.5s ease-in-out infinite; }
        @keyframes ripple { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        .animate-ripple { animation: ripple 1.8s ease-out infinite; }
        @keyframes card3d { 0% { transform: rotateX(35deg) translateY(40px) scale(0.92); opacity: 0; } 60% { transform: rotateX(-6deg) translateY(-4px) scale(1.02); opacity: 1; } 100% { transform: rotateX(0deg) translateY(0) scale(1); opacity: 1; } }
        .animate-card3d { animation: card3d 0.65s cubic-bezier(0.16,1,0.3,1) both; transform-style: preserve-3d; }
        .tick-path { stroke-dasharray: 1; transition: stroke-dashoffset 0.55s cubic-bezier(0.65,0,0.35,1) 0.25s; }
        .cross-path-1 { stroke-dasharray: 1; transition: stroke-dashoffset 0.4s cubic-bezier(0.65,0,0.35,1) 0.25s; }
        .cross-path-2 { stroke-dasharray: 1; transition: stroke-dashoffset 0.4s cubic-bezier(0.65,0,0.35,1) 0.55s; }
        .glass-card { background: rgba(255,255,255,0.72); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
        .slim-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.25); border-radius: 999px; }
        @media (prefers-reduced-motion: reduce) {
          .orbit-a, .orbit-b, .animate-pop, .animate-fade-up, .avatar-pulse, .fly-chip, .animate-ripple, .animate-card3d { animation: none !important; }
          .tick-path, .cross-path-1, .cross-path-2 { transition: none !important; }
        }
      `}</style>

      {/* Cover / Header section */}
      <div className="relative">
        <AmbientBackdrop className="h-[calc(100%+120px)]" />

        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-slate-200 overflow-hidden">
          {creator.coverUrl ? (
            <img src={creator.coverUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-black/10 to-black/35" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <div className="absolute -bottom-12 sm:-bottom-14 lg:-bottom-16">
            <span className="orbit-a absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-indigo-500/70 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)] z-10" />
            <span className="orbit-b absolute bottom-1 -left-2 w-2 h-2 rounded-full bg-purple-500/60 shadow-[0_0_8px_2px_rgba(168,85,247,0.35)] z-10" />
            <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-[3px] bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 shadow-xl ${avatarPulse ? 'avatar-pulse' : ''}`}>
              <div className="w-full h-full rounded-full border-[3px] border-[#F8FAFC] bg-slate-100 overflow-hidden">
                {creator.avatarUrl ? (
                  <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-extrabold text-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50">
                    {initials(creator.name)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography and Info */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-6 animate-fade-up">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-700">
                {creator.name}
              </h1>
              {creator.verified && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0" title="Verified creator">
                  <IconCheck className="w-3 h-3" />
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm font-semibold mt-0.5">@{creator.username}</p>
          </div>

          <div className="flex items-center gap-2">
            {creator.role && (
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-600 whitespace-nowrap shadow-sm">
                {creator.role}
              </span>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
            >
              {copied ? <IconCheck className="w-3.5 h-3.5 text-indigo-600" /> : <IconShare className="w-3.5 h-3.5" />}
              {copied ? 'Link copied' : 'Share profile'}
            </button>
          </div>
        </div>

        {(creator.country || creator.language) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {creator.country && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                <IconPin className="w-3 h-3 text-slate-400" /> {creator.country}
              </span>
            )}
            {creator.language && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                <IconGlobe className="w-3 h-3 text-slate-400" /> {creator.language}
              </span>
            )}
          </div>
        )}

        {creator.bio && (
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mb-5">{creator.bio}</p>
        )}

        {(socials.length > 0 || customLinks.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {socials.map((p) => (
              <a
                key={p.key}
                href={creator.links[p.key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 ${p.color}`}
                aria-label={p.label}
              >
                <p.icon />
              </a>
            ))}
            {customLinks.filter((l) => l.url).map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <IconLink className="w-3.5 h-3.5" /> {l.label || 'Link'}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Metric counts and Goal counters */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 mb-8">
        <Reveal>
          <div className={`grid gap-3 ${goal ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-2'}`}>
            <div className="glass-card border border-slate-200/70 rounded-2xl px-5 py-4 shadow-lg shadow-slate-900/[0.03] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <IconUsers className="w-3.5 h-3.5" />
              </div>
              <p className="text-xl font-extrabold text-slate-900 font-outfit tracking-tight">{fmtCompact(stats.supporterCount)}</p>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Supporters</p>
            </div>
            <div className="glass-card border border-slate-200/70 rounded-2xl px-5 py-4 shadow-lg shadow-slate-900/[0.03] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <IconWallet className="w-3.5 h-3.5" />
              </div>
              <p className="text-xl font-extrabold text-slate-900 font-outfit tracking-tight">{fmtMoney(stats.totalRaised, creator.currency)}</p>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Raised all-time</p>
            </div>

            {goal && (
              <div className="col-span-2 glass-card border border-slate-200/70 rounded-2xl px-5 py-4 shadow-lg shadow-slate-900/[0.03] flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 truncate pr-2">{goal.label}</span>
                  <span className="text-[11px] font-semibold text-indigo-600 shrink-0">{goalPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-700"
                    style={{ width: `${goalPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {fmtMoney(goal.raised, creator.currency)} of {fmtMoney(goal.target, creator.currency)}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Layout Columns content */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pb-28 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-6 order-2 md:order-1">
            <Reveal>
              <div className="glass-card border border-slate-200/70 rounded-3xl p-6 shadow-lg shadow-slate-900/[0.03]">
                <h3 className="font-outfit text-base font-extrabold text-slate-900 mb-3">About {creator.name?.split(' ')[0]}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {creator.bio || 'This creator hasn\u2019t written a longer story yet — but every bit of support here goes straight to their work, no platform holding period.'}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <SupportersWall supporters={supporters} currency={creator.currency} />
            </Reveal>
          </div>
          <div ref={supportRef} className="order-1 md:order-2 md:sticky md:top-6 scroll-mt-6">
            <Reveal delay={150}>
              <SupportPanel
                creator={creator}
                onPulse={pulseAvatar}
                initialThankYou={justPaid}
              />
            </Reveal>
          </div>
        </div>
      </div>
{/* NEW: Minimalist Funderly Footer Branding */}
      <div className="pt-2 pb-32 md:pb-16 flex justify-center items-center w-full animate-fade-up">
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-slate-200/50 active:bg-slate-200/70 transition-all duration-300"
        >
           <IconHeartHands className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors duration-300" />
           <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors tracking-wide">
             Powered by <span className="font-black text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">Funderly</span>
           </span>
        </Link>
      </div>

      {/* Sticky footer tracking panel for smaller displays */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 glass-card border-t border-slate-200 px-5 py-3 flex items-center justify-between shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
        <div>
          <p className="text-xs font-bold text-slate-900">{creator.name}</p>
          <p className="text-[10px] text-slate-400">@{creator.username}</p>
        </div>
        <PrimaryButton onClick={scrollToSupport} className="px-6 py-2.5">
          Support
        </PrimaryButton>
      </div>

      {resultOverlay && (
        <PaymentResultOverlay
          status={resultOverlay.status}
          amount={resultOverlay.amount}
          currency={resultOverlay.currency || creator.currency}
          name={resultOverlay.name}
          message={resultOverlay.message}
          onDismiss={dismissOverlay}
        />
      )}
    </div>
  );
}
