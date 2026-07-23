'use client';

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';

/* =========================================================================
   ICONS
   ========================================================================= */
const IconInstagram = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>
);

const IconExternalLink = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconYoutube = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" stroke="none" /></svg>
);
const IconTiktok = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 0h-3.4v15.6a3.1 3.1 0 1 1-2.4-3.02V8.9a6.6 6.6 0 1 0 5.8 6.55V7.9a8.4 8.4 0 0 0 4.9 1.57V6.1A5.1 5.1 0 0 1 16.7 0Z" /></svg>
);
const IconX = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="m13.6 10.3 7.2-8.3h-1.7l-6.2 7.2-5-7.2H2l7.6 10.9L2 22.1h1.7l6.6-7.6 5.2 7.6H21l-7.4-11.8Zm-2.3 2.7-.8-1.1L4.4 3h2.6l4.9 7 .8 1.1 6.4 9.1h-2.6l-5.2-7.2Z" /></svg>
);
const IconTwitch = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4.3 0 1.1 3.2v17.6h6v3.2h3.2l3.2-3.2H18l4.9-4.9V0H4.3Zm16.8 15.5-3.2 3.2h-4.9L9.9 22V18.7H4.9V1.9h16.2v13.6Z" /><rect x="14.5" y="5.8" width="1.8" height="5.5" /><rect x="9.4" y="5.8" width="1.8" height="5.5" /></svg>
);
const IconDiscord = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5c1.8.5 2.9 1.1 4 1.9a13.6 13.6 0 0 0-15.9 0c1.1-.8 2.2-1.4 4-1.9L7 3a19.8 19.8 0 0 0-4.9 1.4C.3 8.7-.4 12.8.2 16.8a20 20 0 0 0 6 3l1-1.6a11.6 11.6 0 0 1-1.9-.9l.4-.3a14.1 14.1 0 0 0 12.6 0l.4.3c-.6.4-1.2.6-1.9.9l1 1.6a19.9 19.9 0 0 0 6-3c.7-4.6-.4-8.6-3.5-12.4ZM8.5 14.6c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.9.9 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Zm7 0c-1 0-1.8-.9-1.8-2.1s.8-2.1 1.8-2.1 1.9.9 1.8 2.1c0 1.2-.8 2.1-1.8 2.1Z" /></svg>
);
const IconLinkedin = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0ZM7.1 20.5H3.6V9h3.6v11.5ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM20.5 20.5H17v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.5V9H13v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3Z" /></svg>
);
const IconFacebook = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" /></svg>
);
const IconLink = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 14.5 14.5 9.5" /><path d="M11.5 6 13 4.5a3.54 3.54 0 0 1 5 5L16.5 11" /><path d="M12.5 18 11 19.5a3.54 3.54 0 0 1-5-5L7.5 13" /></svg>
);
const IconCheck = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const IconCamera = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9a2 2 0 0 1 2-2h1.5l1-1.6A2 2 0 0 1 9.2 4.5h5.6a2 2 0 0 1 1.7.9L17.5 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
const IconX_Close = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
);
const IconSpinner = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
);
const IconGrid = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></svg>
);
const IconUserCircle = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.5a6.5 6.5 0 0 1 11.6 0" /></svg>
);
const IconCard = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 9.5h19" /><path d="M6 14.5h4" /></svg>
);

const SafepayIcon = ({ className = 'w-5 h-5' }) => (
  <img
    src="https://getsafepay.pk/favicon.ico"
    alt="Safepay"
    className={`${className} object-contain`}
  />
);

const IconShare = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" /></svg>
);
const IconGear = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);
const IconLogout = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
);
const IconCopy = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);
const IconExternal = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></svg>
);
const IconMenu = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const IconTrendUp = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 16 6-6 4 4 6-8" /><path d="M14 6h6v6" /></svg>
);
const IconTrendDown = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 8 6 6 4-4 6 8" /><path d="M14 18h6v-6" /></svg>
);
const IconDollar = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.4-5 3.2c0 4 10 2.3 10 6.5 0 2-2.2 3.3-5 3.3s-5-1.1-5-3" /></svg>
);
const IconUsers = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 19a6.5 6.5 0 0 1 13 0" /><path d="M16.5 5.3a3.2 3.2 0 0 1 0 6.2" /><path d="M18.5 13.2c2.3.6 4 2.8 4 5.8" /></svg>
);
const IconEye = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconSparkle = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>
);
const IconCompass = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
);

const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: IconInstagram, color: 'text-pink-600 bg-pink-50' },
  { key: 'youtube', label: 'YouTube', icon: IconYoutube, color: 'text-red-600 bg-red-50' },
  { key: 'tiktok', label: 'TikTok', icon: IconTiktok, color: 'text-slate-900 bg-slate-100' },
  { key: 'x', label: 'X / Twitter', icon: IconX, color: 'text-slate-900 bg-slate-100' },
  { key: 'twitch', label: 'Twitch', icon: IconTwitch, color: 'text-purple-600 bg-purple-50' },
  { key: 'discord', label: 'Discord', icon: IconDiscord, color: 'text-indigo-600 bg-indigo-50' },
  { key: 'linkedin', label: 'LinkedIn', icon: IconLinkedin, color: 'text-blue-600 bg-blue-50' },
  { key: 'facebook', label: 'Facebook', icon: IconFacebook, color: 'text-blue-600 bg-blue-50' },
];

/* =========================================================================
   SHARED PRIMITIVES
   ========================================================================= */
const PrimaryButton = ({ children, onClick, disabled, loading, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`group relative flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none ${className}`}
  >
    <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
    <span className="relative z-10 flex items-center gap-2">{loading && <IconSpinner />}{children}</span>
  </button>
);

const SecondaryButton = ({ children, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 font-bold px-5 py-2.5 rounded-xl hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 cursor-pointer text-sm overflow-hidden ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

const FieldLabel = ({ children }) => <label className="block text-xs font-bold text-slate-700 mb-1.5">{children}</label>;

const TextInput = (props) => (
  <input {...props} className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${props.className || ''}`} />
);

const TextArea = (props) => (
  <textarea {...props} className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none ${props.className || ''}`} />
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200/70 rounded-2xl shadow-sm shadow-slate-100/50 ${className}`}>{children}</div>
);

const BrandMark = () => (
  <div className="flex items-center gap-3 cursor-pointer">
    <span className="w-7 h-7 md:w-8 md:h-8 text-indigo-600">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    </span>
    <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
      Funderly
    </span>
  </div>
);

const Toast = ({ message }) => (
  <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
    <div className="flex items-center gap-3 bg-white text-slate-800 text-sm font-bold px-4 py-3 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><IconCheck className="w-4 h-4" /></span>
      {message}
    </div>
  </div>
);

/* =========================================================================
   STATE & DATA HELPERS
   ========================================================================= */
function profileFromCreator(creator) {
  const c = creator || {};
  return {
    name: c.name || '',
    username: c.username || '',
    role: c.role || '',
    bio: c.bio || '',
    country: c.country || '',
    language: c.language || '',
    avatarUrl: c.avatarUrl || '',
    avatarPublicId: c.avatarPublicId || '',
    avatarPreview: c.avatarUrl || null,
    avatarFile: null,
    coverUrl: c.coverUrl || '',
    coverPublicId: c.coverPublicId || '',
    coverPreview: c.coverUrl || null,
    coverFile: null,
    safepayPublicKey: c.safepayPublicKey || '',
    safepaySecretKey: c.safepaySecretKey || '',
    links: {
      instagram: '', youtube: '', tiktok: '', x: '', twitch: '', discord: '', linkedin: '', facebook: '',
      ...(c.links || {}),
    },
    customLinks: c.customLinks || [],
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatPKR = (value) =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(value);

const buildRecentSupporters = (fans) =>
  [...fans]
    .sort((a, b) => new Date(b.paidAt || 0) - new Date(a.paidAt || 0))
    .slice(0, 6)
    .map((fan) => ({
      name: fan.anonymous ? 'Anonymous' : fan.name || 'Anonymous',
      amount: fan.amount,
      note: fan.message || '',
      time: fan.paidAt ? new Date(fan.paidAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' }) : 'Recently',
      tier: fan.amount >= 1000 ? 'Large one-time' : 'Support',
    }));

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: IconGrid },
  { key: 'profile', label: 'Profile', icon: IconUserCircle },
  { key: 'payments', label: 'Payments', icon: IconCard },
  { key: 'socials', label: 'Socials', icon: IconShare },
  { key: 'settings', label: 'Settings', icon: IconGear },
];

/* =========================================================================
   MAIN LAYOUT
   ========================================================================= */
export default function ClientDashboard({ creator }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profile, setProfile] = useState(() => profileFromCreator(creator));
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const fans = Array.isArray(creator.fans) ? creator.fans.filter((fan) => fan.status === 'success') : [];
  const totalRaised = fans.reduce((sum, fan) => sum + (fan.amount || 0), 0);
  const supporterCount = fans.length;
  const avgSupport = supporterCount ? totalRaised / supporterCount : 0;
  const recentSupporters = buildRecentSupporters(fans);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`funderly.com/${profile.username}`);
      setToast('Page link copied to clipboard');
    } catch {
      setToast('Could not copy — copy it manually');
    }
  };

  const uploadToCloudinary = async (file, folder) => {
    if (!file) return null;
    const signRes = await fetch('/api/upload/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder }),
    });
    if (!signRes.ok) throw new Error('Could not authorize image upload');
    const { signature, timestamp, cloudName, apiKey, folder: signedFolder } = await signRes.json();

    const form = new FormData();
    form.append('file', file);
    form.append('api_key', apiKey);
    form.append('timestamp', timestamp);
    form.append('signature', signature);
    form.append('folder', signedFolder);

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST', body: form,
    });
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(uploadData?.error?.message || 'Image upload failed');
    return { url: uploadData.secure_url, publicId: uploadData.public_id };
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const [avatarUpload, coverUpload] = await Promise.all([
        uploadToCloudinary(profile.avatarFile, 'creators/avatars'),
        uploadToCloudinary(profile.coverFile, 'creators/covers'),
      ]);

      const avatarUrl = avatarUpload?.url || profile.avatarUrl || '';
      const avatarPublicId = avatarUpload?.publicId || profile.avatarPublicId || '';
      const coverUrl = coverUpload?.url || profile.coverUrl || '';
      const coverPublicId = coverUpload?.publicId || profile.coverPublicId || '';

      console.log('[handleSaveProfile] cookies:', typeof document !== 'undefined' ? document.cookie : '<ssr>');
      const res = await fetch('/api/creator', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          username: profile.username,
          role: profile.role,
          bio: profile.bio,
          country: profile.country,
          language: profile.language,
          avatarUrl, avatarPublicId, coverUrl, coverPublicId,
          safepayPublicKey: profile.safepayPublicKey,
          safepaySecretKey: profile.safepaySecretKey,
          links: profile.links,
          customLinks: profile.customLinks,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.field === 'username') setSaveError('That username is already taken — pick another.');
        else if (res.status === 422 && data.fieldErrors) setSaveError(Object.values(data.fieldErrors)[0]?.[0] || 'Please check your details.');
        else if (res.status === 401) setSaveError('Your session expired — please sign in again.');
        else setSaveError(data.error || 'Something went wrong saving your changes.');
        return false;
      }

      setProfile((p) => ({
        ...p,
        avatarUrl, avatarPublicId, avatarFile: null,
        coverUrl, coverPublicId, coverFile: null,
      }));
      setToast('Changes saved successfully');
      return true;
    } catch (err) {
      setSaveError('Network error — please check your connection and try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const SidebarContent = () => (
    <div className="relative z-10 flex flex-col h-full px-4 py-6">
      <div className="mb-9 px-2.5 shrink-0"><BrandMark /></div>

      <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Menu</p>
      <nav aria-label="Primary" className="flex-1 min-h-0 overflow-y-auto slim-scroll space-y-0.5">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setMobileNavOpen(false); }}
              aria-current={active ? 'page' : undefined}
              className={`group relative w-full flex items-center gap-3 pl-3.5 pr-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${active
                ? 'text-indigo-700 bg-indigo-50'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-indigo-600 transition-all duration-200 ${active ? 'h-5 opacity-100' : 'h-0 opacity-0'}`} aria-hidden="true" />
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors duration-200 ${active ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'}`}>
                <Icon className="w-4 h-4" />
              </span>
              {label}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 mt-4 border-t border-slate-100 shrink-0 space-y-2">
        <a
          href="/explore"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
        >
          <span className="flex items-center gap-2.5"><IconCompass className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" /> Explore creators</span>
          <IconExternal className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400" />
        </a>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden ring-2 ring-white">
            {profile.avatarPreview ? <img src={profile.avatarPreview} alt="" className="w-full h-full object-cover" /> : (profile.name ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '??')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate leading-tight">{profile.name || 'Creator Name'}</p>
            <p className="text-[11px] font-semibold text-slate-400 truncate">@{profile.username || 'username'}</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-slate-300 hover:text-rose-600 transition-colors shrink-0 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40" aria-label="Sign out">
            <IconLogout className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased flex overflow-hidden">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        .font-outfit { font-family: 'Outfit', sans-serif !important; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes modal-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-modal-in { animation: modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-backdrop-in { animation: backdrop-in 0.2s ease-out both; }
        .slim-scroll { scrollbar-width: thin; scrollbar-color: rgba(148, 163, 184, 0.3) transparent; }
        .slim-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .slim-scroll::-webkit-scrollbar-track { background: transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 999px; }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen shrink-0 bg-white border-r border-slate-200/70 relative overflow-hidden font-jakarta">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 opacity-40 blur-3xl pointer-events-none" aria-hidden="true" />
        <SidebarContent />
      </aside>

      {/* Mobile account sheet — profile, explore, sign out */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-backdrop-in" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Account menu"
            className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl animate-modal-in font-jakarta"
          >
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
              <div className="w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                {profile.avatarPreview ? <img src={profile.avatarPreview} alt="" className="w-full h-full object-cover" /> : (profile.name ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '??')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">{profile.name || 'Creator Name'}</p>
                <p className="text-[11px] font-semibold text-slate-500 truncate">@{profile.username || 'username'}</p>
              </div>
            </div>

            <a
              href="/explore"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 hover:bg-indigo-100 transition-colors mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <span className="flex items-center gap-2"><IconCompass className="w-4 h-4" /> Explore Creators</span>
              <IconExternal className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100/50 hover:bg-rose-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
            >
              <IconLogout className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 h-screen overflow-y-auto slim-scroll font-jakarta">
        <header role="banner" className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="lg:hidden shrink-0"><BrandMark /></span>
            <div className="hidden lg:block min-w-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-indigo-500 mb-0.5">Dashboard</p>
              <h1 className="font-outfit font-extrabold text-xl text-slate-900 truncate leading-tight">
                {NAV_ITEMS.find((n) => n.key === activeTab)?.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://funderly.com'}/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full pl-3.5 pr-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer shadow-sm shadow-slate-100 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <IconExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">
                {process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '') : 'funderly.com'}/{profile.username}
              </span>
              <span className="sm:hidden">View page</span>
            </a>

            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden cursor-pointer ring-2 ring-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              aria-label="Open account menu"
              aria-haspopup="dialog"
            >
              {profile.avatarPreview ? <img src={profile.avatarPreview} alt="" className="w-full h-full object-cover" /> : (profile.name ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '??')}
            </button>
          </div>
        </header>

        <div className="lg:hidden px-4 sm:px-8 pt-4">
          <p className="text-[11px] font-black uppercase tracking-wider text-indigo-500 mb-0.5">Dashboard</p>
          <h1 className="font-outfit font-extrabold text-lg text-slate-900 truncate leading-tight">
            {NAV_ITEMS.find((n) => n.key === activeTab)?.label}
          </h1>
        </div>

        <main role="main" className="p-4 sm:p-8 pb-28 lg:pb-8 max-w-5xl mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              totalRaised={totalRaised}
              supporterCount={supporterCount}
              avgSupport={avgSupport}
              recentSupporters={recentSupporters}
            />
          )}
          {activeTab === 'profile' && <ProfileTab profile={profile} setProfile={setProfile} onSave={handleSaveProfile} saving={saving} saveError={saveError} />}
          {activeTab === 'payments' && <PaymentsTab profile={profile} setProfile={setProfile} onSave={handleSaveProfile} saving={saving} saveError={saveError} />}
          {activeTab === 'socials' && <SocialsTab profile={profile} setProfile={setProfile} onSave={handleSaveProfile} saving={saving} saveError={saveError} />}
          {activeTab === 'settings' && <SettingsTab profile={profile} />}
        </main>

        {/* Mobile floating bottom nav */}
        <nav
          aria-label="Primary"
          className="lg:hidden fixed bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl px-1.5 py-1.5 flex items-stretch justify-between shadow-[0_8px_30px_rgba(15,23,42,0.12)]"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                aria-current={active ? 'page' : undefined}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-bold truncate max-w-full ${active ? 'text-indigo-700' : 'text-slate-400'}`}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}

/* =========================================================================
   OVERVIEW TAB
   ========================================================================= */
function StatCard({ icon: Icon, label, value, trend, trendUp = true, iconBg }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}><Icon className="w-5 h-5" /></div>
        {trend && (
          <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${trendUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
            {trendUp ? <IconTrendUp /> : <IconTrendDown />} {trend}
          </span>
        )}
      </div>
      <p className="font-outfit text-2xl font-black text-slate-900">{value}</p>
      <p className="text-xs font-semibold text-slate-500 mt-1">{label}</p>
    </Card>
  );
}

function OverviewTab({ totalRaised, supporterCount, avgSupport, recentSupporters }) {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={IconDollar} iconBg="bg-indigo-50 text-indigo-600" label="Total earnings" value={formatPKR(totalRaised)} />
        <StatCard icon={IconUsers} iconBg="bg-purple-50 text-purple-600" label="Supporters" value={supporterCount.toString()} />
        <StatCard icon={IconSparkle} iconBg="bg-emerald-50 text-emerald-600" label="Avg. support" value={supporterCount ? formatPKR(avgSupport) : '—'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 sm:p-8 lg:col-span-3">
          <h3 className="font-outfit font-extrabold text-lg text-slate-900 mb-5">Recent supporters</h3>
          <div className="space-y-1">
            {recentSupporters.length > 0 ? recentSupporters.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-xl px-2 -mx-2 transition-colors">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-inner">
                  {s.name ? s.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '??'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 truncate">{s.name}</p>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">· {s.tier}</span>
                  </div>
                  {s.note && <p className="text-xs font-medium text-slate-500 truncate">{s.note}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-slate-900">{formatPKR(s.amount)}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{s.time}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500">No supporter payments have been recorded yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* =========================================================================
   PROFILE TAB
   ========================================================================= */
const ROLES = ['Artist', 'Musician', 'Writer', 'Podcaster', 'Streamer', 'Educator', 'Developer', 'Photographer', 'Other'];

function ProfileTab({ profile, setProfile, onSave, saving, saveError }) {
  const handleImagePick = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, [`${key}Preview`]: preview, [`${key}File`]: file }));
  };

  return (
    <div className="max-w-3xl animate-fade-up">
      <Card className="p-6 sm:p-8">
        <div className="relative mb-12">
          <label className="block w-full h-40 sm:h-52 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer group relative shadow-inner">
            {profile.coverPreview ? (
              <img src={profile.coverPreview} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400">Upload a cover image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold bg-slate-900/80 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <IconCamera className="w-4 h-4" /> {profile.coverPreview ? 'Change cover' : 'Upload cover'}
              </span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImagePick(e, 'cover')} />
          </label>

          <label className="absolute -bottom-10 left-6 sm:left-8 w-24 h-24 rounded-full border-4 border-white bg-slate-100 overflow-hidden cursor-pointer group shadow-xl shadow-slate-200/50 z-10">
            {profile.avatarPreview ? (
              <img src={profile.avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-2xl font-black bg-linear-to-br from-indigo-500 to-purple-600">
                {profile.name ? profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '??'}
              </div>
            )}
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all flex items-center justify-center">
              <IconCamera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImagePick(e, 'avatar')} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <FieldLabel>Display Name</FieldLabel>
            <TextInput type="text" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <FieldLabel>Page Link</FieldLabel>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl flex items-center focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all overflow-hidden">
              <span className="pl-4 text-slate-400 font-bold text-sm select-none">funderly.com/</span>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value.replace(/\s/g, '') }))}
                className="bg-transparent border-none outline-none text-slate-900 font-bold text-sm py-2.5 px-1 w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <FieldLabel>What do you create?</FieldLabel>
          <div className="flex flex-wrap gap-2.5">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setProfile((p) => ({ ...p, role }))}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${profile.role === role
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Short Bio</FieldLabel>
            <span className="text-[11px] text-slate-400 font-bold">{profile.bio.length}/140</span>
          </div>
          <TextArea maxLength={140} rows={3} value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} placeholder="Tell your supporters a bit about what you do..." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <FieldLabel>Country</FieldLabel>
            <TextInput placeholder="e.g. Pakistan" type="text" value={profile.country} onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))} />
          </div>
          <div>
            <FieldLabel>Language</FieldLabel>
            <TextInput placeholder="e.g. English" type="text" value={profile.language} onChange={(e) => setProfile((p) => ({ ...p, language: e.target.value }))} />
          </div>
        </div>
      </Card>

      {saveError && (
        <p className="mt-6 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 flex items-center gap-2">
          {saveError}
        </p>
      )}

      <div className="flex justify-end mt-6">
        <PrimaryButton className="py-3 px-8" loading={saving} onClick={onSave}>Save Profile</PrimaryButton>
      </div>
    </div>
  );
}

/* =========================================================================
   PAYMENTS TAB
   ========================================================================= */
function PaymentsTab({ profile, setProfile, onSave, saving, saveError }) {
  return (
    <div className="max-w-2xl animate-fade-up space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-inner">
            <SafepayIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-lg text-slate-900">Safepay Integration</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">Connect your Safepay API keys to accept payments directly.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <FieldLabel>Public Key</FieldLabel>
            <TextInput placeholder="pk_..." type="text" value={profile.safepayPublicKey} onChange={(e) => setProfile((p) => ({ ...p, safepayPublicKey: e.target.value }))}
              className="font-mono text-sm"
            />
          </div>
          <div>
            <FieldLabel>Secret Key</FieldLabel>
            <TextInput placeholder="sk_..." type="password" value={profile.safepaySecretKey} onChange={(e) => setProfile((p) => ({ ...p, safepaySecretKey: e.target.value }))}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-600 flex items-start gap-2 leading-relaxed">
            <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            Your API keys are encrypted at rest and are exclusively used to route funds directly to your merchant account.
          </p>
        </div>
      </Card>

      {saveError && (
        <p className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
          {saveError}
        </p>
      )}

      <div className="flex justify-end">
        <PrimaryButton className="py-3 px-8" loading={saving} onClick={onSave}>Save Payment Settings</PrimaryButton>
      </div>
    </div>
  );
}

/* =========================================================================
   SOCIALS TAB
   ========================================================================= */
function SocialsTab({ profile, setProfile, onSave, saving, saveError }) {
  const popularPlatforms = SOCIAL_PLATFORMS.slice(0, 4);
  const customLinks = profile.customLinks || [];
  const canAddMore = (4 + customLinks.length) < 10;

  const updateLink = (key, value) => setProfile((p) => ({ ...p, links: { ...p.links, [key]: value } }));

  const addCustomLink = () => {
    if (canAddMore) setProfile((p) => ({ ...p, customLinks: [...customLinks, { label: '', url: '' }] }));
  };
  const updateCustomLink = (idx, field, value) =>
    setProfile((p) => {
      const next = [...p.customLinks];
      next[idx] = { ...next[idx], [field]: value };
      return { ...p, customLinks: next };
    });
  const removeCustomLink = (idx) => setProfile((p) => ({ ...p, customLinks: customLinks.filter((_, i) => i !== idx) }));

  return (
    <div className="max-w-2xl animate-fade-up">
      <Card className="p-6 sm:p-8">
        <h3 className="font-outfit font-extrabold text-lg text-slate-900 mb-2">Social Links</h3>
        <p className="text-sm font-medium text-slate-500 mb-8">Add your social profiles to display on your Funderly page.</p>

        <div className="space-y-4 mb-6">
          {popularPlatforms.map((p) => (
            <div key={p.key} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 ${p.color}`}>
                <p.icon className="w-4 h-4" />
              </div>
              <div className="w-24 text-sm font-bold text-slate-700 truncate shrink-0">{p.label}</div>
              <TextInput
                placeholder={`Your ${p.label} URL`}
                value={profile.links[p.key] || ''}
                onChange={(e) => updateLink(p.key, e.target.value)}
                className="flex-1"
              />
            </div>
          ))}

          {customLinks.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-500 border border-slate-200">
                <IconLink className="w-4 h-4" />
              </div>
              <TextInput
                className="w-1/3!"
                placeholder="Label"
                value={link.label}
                onChange={(e) => updateCustomLink(idx, 'label', e.target.value)}
              />
              <TextInput placeholder="https://..." value={link.url} onChange={(e) => updateCustomLink(idx, 'url', e.target.value)} className="flex-1" />
              <button type="button" onClick={() => removeCustomLink(idx)} className="text-slate-400 hover:text-rose-500 shrink-0 p-2 cursor-pointer transition-colors" aria-label="Remove link">
                <IconX_Close className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addCustomLink}
          disabled={!canAddMore}
          className={`flex items-center gap-2.5 text-sm font-bold transition-all ${canAddMore ? 'text-indigo-600 hover:text-indigo-700 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
        >
          <span className={`w-6 h-6 rounded-md flex items-center justify-center ${canAddMore ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50 border border-slate-200'}`}>
            <IconLink className="w-3 h-3" />
          </span>
          {canAddMore ? 'Add another link' : 'Limit reached (10 max)'}
        </button>
      </Card>

      {saveError && (
        <p className="mt-6 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
          {saveError}
        </p>
      )}

      <div className="flex justify-end mt-6">
        <PrimaryButton className="py-3 px-8" loading={saving} onClick={onSave}>Save Links</PrimaryButton>
      </div>
    </div>
  );
}

/* =========================================================================
   SETTINGS TAB
   ========================================================================= */
function SettingsTab({ profile }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmUsername, setConfirmUsername] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteAccount = async () => {
    if (confirmUsername !== profile.username) {
      setDeleteError('Username does not match.');
      return;
    }

    setDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch('/api/creator', {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        setDeleteError(data.error || 'Failed to delete account.');
        setDeleting(false);
        return;
      }

      await signOut({ callbackUrl: '/' });
    } catch (err) {
      setDeleteError('Network error. Please try again.');
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl animate-fade-up space-y-6">
      <Card className="p-6 sm:p-8">
        <h3 className="font-outfit font-extrabold text-lg text-slate-900 mb-5">Account Details</h3>
        <div>
          <FieldLabel>Email address</FieldLabel>
          <TextInput className="opacity-70 cursor-not-allowed" defaultValue={profile.email || `${profile.username}@example.com`} disabled type="email" />
          <p className="text-xs font-semibold text-slate-400 mt-2">Your email address is managed through your authentication provider.</p>
        </div>
      </Card>

      {/* Danger Zone Card */}
      <Card className="p-6 sm:p-8 border-rose-200/60 bg-rose-50/30">
        <h3 className="font-outfit font-extrabold text-lg text-rose-700 mb-2">Danger Zone</h3>
        <p className="text-sm font-medium text-slate-600 mb-6 leading-relaxed">
          Permanently delete your Funderly page and all associated data from our database. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="text-sm font-bold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 hover:border-rose-300 px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Delete my page
        </button>
      </Card>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-backdrop-in"
            onClick={() => { setShowDeleteModal(false); setConfirmUsername(''); setDeleteError(''); }}
            aria-hidden="true"
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-slate-900/20 border border-slate-200 animate-modal-in"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>

            <h3 id="delete-account-title" className="font-outfit font-extrabold text-xl text-slate-900 mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              This will permanently wipe your page and profile data from our servers. Type <span className="font-bold text-slate-900">@{profile.username}</span> below to confirm.
            </p>

            <div className="mb-6">
              <FieldLabel>Confirm Username</FieldLabel>
              <TextInput
                type="text"
                placeholder={profile.username}
                value={confirmUsername}
                onChange={(e) => setConfirmUsername(e.target.value)}
                autoFocus
              />
            </div>

            {deleteError && (
              <p className="text-xs font-bold text-rose-600 mb-4">{deleteError}</p>
            )}

            <div className="flex items-center justify-end gap-3">
              <SecondaryButton onClick={() => { setShowDeleteModal(false); setConfirmUsername(''); setDeleteError(''); }}>
                Cancel
              </SecondaryButton>
              <button
                type="button"
                disabled={confirmUsername !== profile.username || deleting}
                onClick={handleDeleteAccount}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50"
              >
                {deleting && <IconSpinner />} Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer shrink-0 border ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-200 border-slate-300'}`}
      >
        <span className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}