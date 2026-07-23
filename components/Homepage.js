'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Page() {
  const [amount, setAmount] = useState(3);
  const [customVal, setCustomVal] = useState('');
  const [openIndex, setOpenIndex] = React.useState(null);
  const router = useRouter();

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomVal('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomVal(val);
    setAmount(val === '' ? 0 : Number(val));
  };

  return (

    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white">

      {/* --- header --- */}
      <header className="fixed top-0 w-full z-50 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-slate-200/50 font-jakarta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <span className="w-8 h-8 md:w-9 md:h-9 text-indigo-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                <path d="m2 16 6 6" />
                <circle cx="16" cy="9" r="2.9" />
                <circle cx="6" cy="5" r="3" />
              </svg>
            </span>
            <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Funderly
            </span>
          </Link>

          <button onClick={() => router.push('/create')} className="relative h-10 px-5 overflow-hidden text-sm font-bold border border-slate-200 hover:border-slate-300 bg-slate-50/50 rounded-full transition-all duration-300 cursor-pointer group text-slate-800">
            <span className="absolute inset-0 bg-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            <span className="relative z-10">Sign In</span>
          </button>
        </div>
      </header>

      {/* --- google fonts --- */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        .font-outfit { font-family: 'Outfit', sans-serif !important; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        @keyframes orbit-1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(2.5px, -3px); }
        }
        @keyframes orbit-2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-3px, 1.5px); }
        }
        .animate-float-badge { animation: float 6s ease-in-out infinite; }
        .animate-ball-1 { animation: orbit-1 4.5s ease-in-out infinite; }
        .animate-ball-2 { animation: orbit-2 5.5s ease-in-out infinite; }
      `}</style>

      {/* backdrop */}
      <div className="absolute inset-0 w-full overflow-x-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-[150px]"></div>
      </div>

      {/* --- hero section --- */}
      <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center font-jakarta relative z-10">
        <div className="mb-8 animate-float-badge relative cursor-pointer group flex items-center justify-center">
          <div className="absolute w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 blur-3xl rounded-full scale-75 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#hero-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full overflow-visible drop-shadow-[0_10px_20px_rgba(79,70,229,0.15)]">
              <defs>
                <linearGradient id="hero-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
              <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 16 6 6" />
              <circle cx="16" cy="9" r="2.9" className="animate-ball-1 fill-purple-600/10 stroke-purple-600" />
              <circle cx="6" cy="5" r="3" className="animate-ball-2 fill-indigo-600/15 stroke-indigo-600" />
            </svg>
          </div>
        </div>

        <h1 className="font-outfit text-4xl sm:text-6xl lg:text-7.5xl font-extrabold tracking-tight leading-[1.05] mb-6 max-w-4xl text-slate-900">
          Receive funding directly <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            from your biggest fans.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-2xl">
          No mandatory platform cuts. No holding cycles. Just a highly polished, single-tap layout designed to let your audience back your work.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 relative z-20">
          <button onClick={() => router.push('/create')} className="group relative w-full sm:w-auto bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-indigo-600/10 hover:shadow-xl hover:shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer text-base">
            <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="relative z-10">Create Page</span>
          </button>
          <button onClick={() => router.push('/explore')} className="group relative w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 font-bold px-8 py-3.5 rounded-full hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer text-base">
            <span className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore Creators</span>
              <svg className="w-4.5 h-4.5 text-slate-400 group-hover:text-slate-600 transition-all duration-300 transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* --- link section --- */}
      <section className="py-24 bg-[#090D16] border-y border-slate-800/80 relative overflow-hidden font-jakarta">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-50/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
          <div className="lg:col-span-7">
            <h2 className="font-outfit text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              Claim your unique <br />
              funderly link today.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
              Grab your personalized vanity URL before someone else locks it down. Setup your premium creator node profile and start receiving support in less than 60 seconds.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-2.5 rounded-2xl flex items-center focus-within:border-indigo-500/70 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-2xl shadow-black/40">
              <span className="pl-4 text-slate-500 font-bold text-sm tracking-tight select-none">funderly.com/</span>
              <input type="text" placeholder="username" className="bg-transparent border-none outline-none text-white font-semibold text-sm py-2 px-2 w-full placeholder:text-slate-600 focus:ring-0" />
              <button onClick={() => router.push('/create')} className="group relative bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shrink-0 cursor-pointer overflow-hidden shadow-lg shadow-indigo-600/20 active:scale-95">
                <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">Claim Page</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 pl-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-indigo-500/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              No reservation fee.
            </p>
          </div>
        </div>
      </section>

      {/* --- why-creators-love-us section --- */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100 font-jakarta relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-outfit text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Why creators love Funderly</h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">We stripped away the complexity. Here is why global creators are making the switch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white border border-slate-200/60 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" /></svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-950 mb-3">Direct Safepay Payouts</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Withdraw your earnings directly to your Safepay account. Safe, secure, and fully optimized.</p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 text-xs font-semibold text-indigo-600">Seamless global payouts</div>
            </div>
            <div className="group bg-white border border-slate-200/60 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-950 mb-3">0% Platform Fees</h3>
                <p className="text-sm text-slate-600 leading-relaxed">We do not take a cut of your hard work. You keep 100% of the tips and support.</p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 text-xs font-semibold text-emerald-600">Keep 100% of your earnings</div>
            </div>
            <div className="group bg-white border border-slate-200/60 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-950 mb-3">Zero-Login Supporter Flow</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Supporters don't need to create accounts. They can support your journey in 10 seconds.</p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 text-xs font-semibold text-rose-600">Frictionless support in seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- how-it-works section --- */}
      <section className="py-24 bg-[#090D16] border-y border-slate-800/80 font-jakarta relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <h2 className="font-outfit text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">Three steps to <br /> global support</h2>
              <p className="text-base text-slate-400 leading-relaxed max-w-md">No complicated integrations, no setup fees. We built Funderly to get you up, running, and earning in minutes.</p>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="absolute left-[27px] top-7 bottom-[20%] w-[2px] bg-slate-800" />
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative group flex gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-lg shrink-0 z-10 group-hover:border-indigo-500/50 group-hover:ring-4 group-hover:ring-indigo-500/10 transition-all duration-300 shadow-xl shadow-black/50">01</div>
                  <div className="pt-2">
                    <h3 className="font-outfit text-xl font-bold text-white mb-2">Setup Your Profile</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Create your account, personalize your link, and securely connect your Safepay payout details in less than a minute.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative group flex gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-purple-400 font-bold text-lg shrink-0 z-10 group-hover:border-purple-500/50 group-hover:ring-4 group-hover:ring-purple-500/10 transition-all duration-300 shadow-xl shadow-black/50">02</div>
                  <div className="pt-2">
                    <h3 className="font-outfit text-xl font-bold text-white mb-2">Share Your Link</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Paste your personalized Funderly link directly into your Instagram, TikTok, or YouTube bio so your audience knows where to find you.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative group flex gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-lg shrink-0 z-10 group-hover:border-emerald-500/50 group-hover:ring-4 group-hover:ring-emerald-500/10 transition-all duration-300 shadow-xl shadow-black/50">03</div>
                  <div className="pt-2">
                    <h3 className="font-outfit text-xl font-bold text-white mb-2">Receive Support Directly</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Your supporters pay you seamlessly in just a tap—without needing to register, download apps, or create accounts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- faqs section --- */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 font-jakarta">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
            <p className="text-slate-500">Everything you need to know about getting started.</p>
          </div>
          <div className="space-y-4">
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 0 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 0 ? null : 0)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 0 ? 'text-indigo-600' : 'text-slate-800'}`}>Is there a cost to start using Funderly?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 0 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 0 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">Funderly is free to launch and does not take a platform cut. Support flows through Safepay, so you receive payments directly to your own payout account, with only any Safepay processing fees applying.</div></div>
              </div>
            </div>
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 1 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 1 ? null : 1)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 1 ? 'text-indigo-600' : 'text-slate-800'}`}>How do supporters pay me?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 1 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 1 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">Supporters pay securely through Safepay. They can send tips or one-time support without creating an account, then your payout lands directly to your linked Safepay account.</div></div>
              </div>
            </div>
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 2 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 2 ? null : 2)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 2 ? 'text-indigo-600' : 'text-slate-800'}`}>Do I need a Safepay account?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 2 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 2 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">Yes. You’ll connect your Safepay API keys in the dashboard so Funderly can route payments directly to your payout account. Your keys are stored securely and are only used for processing support.</div></div>
              </div>
            </div>
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 3 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 3 ? null : 3)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 3 ? 'text-indigo-600' : 'text-slate-800'}`}>Can I customize my creator page?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 3 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 3 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">Yes. Your dashboard lets you set your profile name, bio, avatar, cover image, social links, and support message so your page reflects your brand.</div></div>
              </div>
            </div>
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 4 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 4 ? null : 4)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 4 ? 'text-indigo-600' : 'text-slate-800'}`}>How fast can I start receiving support?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 4 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 4 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">Very quickly. Create your page, claim your custom URL, and connect Safepay in minutes. Once live, your supporters can immediately send support.</div></div>
              </div>
            </div>
            <div className={`rounded-3xl border transition-all duration-300 ${openIndex === 5 ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === 5 ? null : 5)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                <span className={`font-outfit font-semibold text-lg transition-colors duration-300 ${openIndex === 5 ? 'text-indigo-600' : 'text-slate-800'}`}>What happens after a supporter pays?</span>
                <span className={`ml-4 transform transition-transform duration-300 ${openIndex === 5 ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === 5 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><div className="px-8 pb-6 text-slate-500 leading-relaxed text-sm">The payment is processed through Safepay and recorded on your creator page. Your dashboard updates with the new supporter, recent activity, and total raised amount.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- footer --- */}
      <footer className="bg-slate-50/80 py-6 border-t border-slate-200/60 px-6 lg:px-12 font-jakarta relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-start text-xs text-slate-500 font-medium">
          <div className="flex items-center flex-wrap justify-start gap-x-2.5 gap-y-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-indigo-600 overflow-visible">
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
              <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 16 6 6" />
              <circle cx="16" cy="9" r="2.9" className="fill-indigo-600/10" />
              <circle cx="6" cy="5" r="3" className="fill-indigo-600/15" />
            </svg>
            <span className="text-slate-900 font-bold tracking-tight">Funderly</span>
            <span className="text-slate-300 select-none">•</span>
            <span>© {new Date().getFullYear()} Funderly Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}