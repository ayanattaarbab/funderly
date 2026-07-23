'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut } from "next-auth/react";

/* icons */
const IconGoogle = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.66Z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.4 7.4 0 0 1-4.07 1.14c-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z" />
        <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4-3.11Z" />
        <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
);
const IconGithub = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.29 9.42 7.86 10.95.57.11.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.29-5.24-5.72 0-1.26.44-2.29 1.17-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.7 10.7 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.77.11 3.06.73.81 1.17 1.84 1.17 3.1 0 4.44-2.69 5.42-5.25 5.71.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.67.79.55A10.53 10.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
);
const IconFacebook = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
);
const IconInstagram = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
        <defs>
            <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
                <stop offset="0" stopColor="#FFDD55" />
                <stop offset="0.5" stopColor="#E1306C" />
                <stop offset="1" stopColor="#7024C4" />
            </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
        <circle cx="12" cy="12" r="4.4" stroke="#fff" strokeWidth="1.6" />
        <circle cx="17.4" cy="6.6" r="1.15" fill="#fff" />
    </svg>
);
const IconYoutube = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="#FF0000" d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 3 12 3 12 3h-.01s-4.89 0-8.19.14c-.46.05-1.46.06-2.36 1C.73 4.86.5 6.5.5 6.5S.26 8.42.26 10.35v1.83C.26 14.11.5 16.03.5 16.03s.23 1.64.94 2.36c.9.94 2.08.91 2.61 1.01C5.9 19.55 12 19.61 12 19.61s4.9-.01 8.2-.15c.46-.06 1.46-.07 2.36-1 .71-.72.94-2.36.94-2.36s.24-1.92.24-3.85v-1.83c0-1.93-.24-3.85-.24-3.85Z" />
        <path fill="#fff" d="M9.55 14.9V8.4l6.27 3.25-6.27 3.25Z" />
    </svg>
);
const IconTiktok = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 2h-3.3v13.9c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .6.05.9.13V9.8a6.2 6.2 0 0 0-.9-.07A6.2 6.2 0 0 0 4.2 15.9a6.2 6.2 0 0 0 6.2 6.2 6.2 6.2 0 0 0 6.2-6.2V8.6a8.3 8.3 0 0 0 4.7 1.45V6.75a5 5 0 0 1-4.7-4.75Z" />
    </svg>
);
const IconX = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.24 2.75h3.32l-7.25 8.29 8.53 11.21h-6.68l-5.23-6.84-5.99 6.84H1.62l7.75-8.86L1.2 2.75h6.85l4.73 6.25 5.46-6.25Zm-1.17 17.5h1.84L7.02 4.65H5.04l11.03 15.6Z" />
    </svg>
);
const IconLink = ({ className = 'w-5 h-5' }) => (
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
const IconCamera = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9a2 2 0 0 1 2-2h1.5l1-1.6A2 2 0 0 1 9.2 4.5h5.6a2 2 0 0 1 1.7.9L17.5 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <circle cx="12" cy="13" r="3.5" />
    </svg>
);
const IconArrowLeft = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5m0 0 6 6m-6-6 6-6" />
    </svg>
);
const IconArrowRight = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);
const IconX_Close = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);
const IconSpinner = ({ className = 'w-4 h-4' }) => (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

/* shared primitives  */
const PrimaryButton = ({ children, onClick, disabled, loading, className = '', type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`group relative flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-indigo-600/10 hover:shadow-xl hover:shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${className}`}
    >
        <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        <span className="relative z-10 flex items-center gap-2">
            {loading && <IconSpinner />}
            {children}
        </span>
    </button>
);
const BackRow = ({ onBack, label = 'Back' }) => (
    <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-3 cursor-pointer"
    >
        <IconArrowLeft className="w-3.5 h-3.5" /> {label}
    </button>
);
const FieldLabel = ({ children }) => (
    <label className="block text-xs font-bold text-slate-800 mb-1.5">{children}</label>
);
const TextInput = (props) => (
    <input
        {...props}
        className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${props.className || ''}`}
    />
);
const TextArea = (props) => (
    <textarea
        {...props}
        className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none ${props.className || ''}`}
    />
);

/* dark backdrop */
const DarkBackdrop = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-indigo-500/10 rounded-full blur-[120px]" />
    </div>
);

/* brand mark */
const BrandMark = () => (
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
);

/* step wrapper */
const StepShell = ({ children, maxW = 'max-w-md' }) => (
    <div className={`w-full ${maxW} mx-auto`}>{children}</div>
);

/* main page */
export default function ClientCreate({ session }) {
    const router = useRouter();
    const [flow, setFlow] = useState(session?.user ? 'creator-profile' : 'creator-auth');
    const [connecting, setConnecting] = useState(null);
    const [redirecting, setRedirecting] = useState(false);
    const [launching, setLaunching] = useState(false);
    const [launchError, setLaunchError] = useState('');

    // username availability: 'idle' | 'checking' | 'available' | 'taken' | 'invalid' | 'error'
    const [usernameStatus, setUsernameStatus] = useState('idle');
    const [usernameMessage, setUsernameMessage] = useState('');
    const usernameDebounceRef = useRef(null);
    const usernameRequestIdRef = useRef(0);

    const handleClose = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const [creator, setCreator] = useState({
        provider: null,
        coverFile: null,
        coverPreview: null,
        avatarFile: null,
        avatarPreview: null,
        name: 'Ayan Arbab',
        username: 'ayanattaarbab',
        role: 'Developer',
        bio: '',
        safepayPublicKey: '',
        safepaySecretKey: '',
        links: { instagram: '', youtube: '', tiktok: '', x: '' },
        customLinks: [],
        country: 'Pakistan',
        language: 'English',
    });

    useEffect(() => {
        if (session?.user) {
            setCreator((prev) => ({
                ...prev,
                name: session.user.name || prev.name,
                username: session.user.email?.split("@")[0] || prev.username,
                avatarPreview: session.user.image || prev.avatarPreview,
            }));

            setFlow('creator-profile');
        }
    }, [session]);

    useEffect(() => {
        if (flow === 'creator-success') {
            setRedirecting(true);
            const t = setTimeout(() => router.push('/dashboard'), 1800);
            return () => clearTimeout(t);
        }
    }, [flow, router]);

    // check username availability as the user types (debounced)
    useEffect(() => {
        const trimmed = creator.username.trim();

        if (usernameDebounceRef.current) clearTimeout(usernameDebounceRef.current);

        if (!trimmed) {
            setUsernameStatus('idle');
            setUsernameMessage('');
            return;
        }

        setUsernameStatus('checking');
        setUsernameMessage('');

        usernameDebounceRef.current = setTimeout(async () => {
            const requestId = ++usernameRequestIdRef.current;
            try {
                const res = await fetch(`/api/check-username?username=${encodeURIComponent(trimmed)}`);
                const data = await res.json();

                if (requestId !== usernameRequestIdRef.current) return; // stale response, ignore

                if (data.available) {
                    setUsernameStatus('available');
                    setUsernameMessage('');
                } else {
                    setUsernameStatus(data.reason === 'invalid' ? 'invalid' : 'taken');
                    setUsernameMessage(data.message || 'This username is already taken!');
                }
            } catch (err) {
                if (requestId !== usernameRequestIdRef.current) return;
                setUsernameStatus('error');
                setUsernameMessage('Could not check username. Please try again.');
            }
        }, 450);

        return () => clearTimeout(usernameDebounceRef.current);
    }, [creator.username]);

    const handleImagePick = (e, key) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setCreator((c) => ({ ...c, [`${key}File`]: file, [`${key}Preview`]: preview }));
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
            method: 'POST',
            body: form,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
            throw new Error(uploadData?.error?.message || 'Image upload failed');
        }
        return { url: uploadData.secure_url, publicId: uploadData.public_id };
    };

    const handleLaunch = async () => {
        setLaunchError('');

        if (!creator.name.trim() || !creator.username.trim() || !creator.role || !creator.bio.trim()
            || !creator.country || !creator.language || !creator.safepayPublicKey.trim() || !creator.safepaySecretKey.trim()) {
            setLaunchError('Please complete all required steps before launching.');
            return;
        }

        setLaunching(true);
        try {
            const [avatarUpload, coverUpload] = await Promise.all([
                uploadToCloudinary(creator.avatarFile, 'creators/avatars'),
                uploadToCloudinary(creator.coverFile, 'creators/covers'),
            ]);

            const avatarUrl = avatarUpload?.url || creator.avatarPreview || '';
            const coverUrl = coverUpload?.url || creator.coverPreview || '';

            console.log('[handleLaunch] sending creator payload, cookies:', typeof document !== 'undefined' ? document.cookie : '<ssr>');
            const res = await fetch('/api/creator', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: creator.name,
                    username: creator.username,
                    role: creator.role,
                    bio: creator.bio,
                    country: creator.country,
                    language: creator.language,
                    avatarUrl,
                    avatarPublicId: avatarUpload?.publicId || '',
                    coverUrl,
                    coverPublicId: coverUpload?.publicId || '',
                    safepayPublicKey: creator.safepayPublicKey,
                    safepaySecretKey: creator.safepaySecretKey,
                    links: creator.links,
                    customLinks: creator.customLinks,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 409 && data.field === 'username') {
                    setLaunchError('That username is already taken — go back and pick another.');
                } else if (res.status === 422 && data.fieldErrors) {
                    const firstError = Object.values(data.fieldErrors)[0]?.[0];
                    setLaunchError(firstError || 'Please check your details and try again.');
                } else if (res.status === 401) {
                    setLaunchError('Your session expired — please sign in again.');
                } else {
                    setLaunchError(data.error || 'Something went wrong. Please try again.');
                }
                return;
            }

            setFlow('creator-success');
        } catch (err) {
            console.error('[handleLaunch]', err);
            setLaunchError('Network error — please check your connection and try again.');
        } finally {
            setLaunching(false);
        }
    };

    const isCreatorFlow = ['creator-profile', 'creator-role', 'creator-payment', 'creator-social'].includes(flow);

    return (
        <div className="h-[100dvh] w-full bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden relative flex flex-col">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

            <style>{`
                .font-outfit { font-family: 'Outfit', sans-serif !important; }
                .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }
                @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-up { animation: fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
                @keyframes pop { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                .animate-pop { animation: pop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .slim-scroll { scrollbar-width: thin; scrollbar-color: rgba(99,102,241,0.3) transparent; }
                .slim-scroll::-webkit-scrollbar { width: 5px; }
                .slim-scroll::-webkit-scrollbar-track { background: transparent; }
                .slim-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 999px; }
                .slim-scroll::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.5); }
            `}</style>

            <div className="absolute inset-0 w-full pointer-events-none z-0">
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-[150px]" />
            </div>

            <header className="fixed top-0 left-0 w-full z-50 bg-[#F8FAFC]/80 backdrop-blur-md border-b border-slate-200/50 font-jakarta">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
                    <BrandMark />
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close and sign out"
                        className="relative w-10 h-10 overflow-hidden flex items-center justify-center border border-slate-200 hover:border-slate-300 bg-slate-50/50 rounded-full transition-all duration-300 cursor-pointer group text-slate-500 hover:text-slate-800 shrink-0"
                    >
                        <span className="absolute inset-0 bg-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                        <span className="relative z-10 flex items-center justify-center">
                            <IconX_Close className="w-4 h-4" />
                        </span>
                    </button>
                </div>
            </header>

            <main className={`flex-1 min-h-0 relative z-10 overflow-y-auto slim-scroll font-jakarta w-full flex px-5 sm:px-6 pt-20 pb-6 transition-all duration-300 ${isCreatorFlow ? 'items-start justify-center' : 'items-center justify-center'}`}>
                {isCreatorFlow ? (
                    <div className="w-full max-w-xl flex flex-col pt-8">
                        {/* profile step */}
                        {flow === 'creator-profile' && (
                            <StepShell maxW="max-w-xl">
                                <div className="animate-fade-up">
                                    <BackRow onBack={() => setFlow('creator-auth')} />
                                    <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                                        Build your page
                                    </h2>
                                    <p className="text-slate-600 text-xs mb-5 leading-relaxed max-w-md">
                                        This is what your supporters see first. You can update these images anytime.
                                    </p>

                                    <div className="relative mb-8">
                                        <label className="block w-full h-28 sm:h-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer group relative">
                                            {creator.coverPreview ? (
                                                <img src={creator.coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400 bg-gradient-to-br from-slate-50 to-slate-100">
                                                    <IconCamera className="w-5 h-5" />
                                                    <span className="text-[11px] font-semibold">Upload cover photo</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-bold bg-black/50 px-2.5 py-1 rounded-full">
                                                    {creator.coverPreview ? 'Change cover' : 'Click to upload'}
                                                </span>
                                            </div>
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImagePick(e, 'cover')} />
                                        </label>

                                        <label className="absolute -bottom-7 left-5 w-16 h-16 rounded-full border-4 border-[#F8FAFC] bg-slate-100 overflow-hidden cursor-pointer group shadow-lg">
                                            {creator.avatarPreview ? (
                                                <img src={creator.avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-indigo-50 to-purple-50">
                                                    <IconCamera className="w-4 h-4" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                <IconCamera className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImagePick(e, 'avatar')} />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <FieldLabel>Your name</FieldLabel>
                                            <TextInput
                                                type="text"
                                                placeholder="e.g. Maya Chen"
                                                value={creator.name}
                                                onChange={(e) => setCreator((c) => ({ ...c, name: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <FieldLabel>Your link</FieldLabel>
                                            <div
                                                className={`w-full bg-white border rounded-xl flex items-center transition-all focus-within:ring-4 ${
                                                    usernameStatus === 'taken' || usernameStatus === 'invalid' || usernameStatus === 'error'
                                                        ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10'
                                                        : usernameStatus === 'available'
                                                        ? 'border-green-400 focus-within:border-green-500 focus-within:ring-green-500/10'
                                                        : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-500/10'
                                                }`}
                                            >
                                                <span className="pl-3 text-slate-400 font-semibold text-xs select-none">funderly.com/</span>
                                                <input
                                                    type="text"
                                                    placeholder="username"
                                                    value={creator.username}
                                                    onChange={(e) => setCreator((c) => ({ ...c, username: e.target.value.replace(/\s/g, '') }))}
                                                    className="bg-transparent border-none outline-none text-slate-900 font-semibold text-xs py-2.5 px-1 w-full placeholder:text-slate-400"
                                                />
                                                <span className="pr-3 flex items-center justify-center w-6 h-5 shrink-0">
                                                    {usernameStatus === 'checking' && (
                                                        <IconSpinner className="w-3.5 h-3.5 text-slate-400" />
                                                    )}
                                                    {usernameStatus === 'available' && (
                                                        <IconCheck className="w-5  h-5 text-green-500" />
                                                    )}
                                                    {(usernameStatus === 'taken' || usernameStatus === 'invalid' || usernameStatus === 'error') && (
                                                        <IconX_Close className="w-5 h-5 text-red-500" />
                                                    )}
                                                </span>
                                            </div>
                                            {usernameMessage && (
                                                <p className="mt-1.5 text-[11px] font-semibold text-red-500 leading-snug">
                                                    {usernameMessage}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton
                                            disabled={!creator.name.trim() || !creator.username.trim() || usernameStatus !== 'available'}
                                            onClick={() => setFlow('creator-role')}
                                        >
                                            Continue <IconArrowRight />
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </StepShell>
                        )}

                        {/* about-you step */}
                        {flow === 'creator-role' && (
                            <StepShell maxW="max-w-xl">
                                <div className="animate-fade-up">
                                    <BackRow onBack={() => setFlow('creator-profile')} />

                                    <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                                        Define Your Creator Profile
                                    </h2>
                                    <p className="text-slate-600 text-xs mb-4 leading-relaxed max-w-md">
                                        Help supporters understand your work, location, and language at a glance.
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {['Artist', 'Musician', 'Writer', 'Podcaster', 'Streamer', 'Educator', 'Developer', 'Photographer', 'Other'].map((role) => (
                                            <button
                                                key={role}
                                                onClick={() => setCreator((c) => ({ ...c, role }))}
                                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${creator.role === role
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                                    }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                        <div>
                                            <FieldLabel>Country</FieldLabel>
                                            <TextInput
                                                type="text"
                                                placeholder="e.g. Pakistan"
                                                value={creator.country || ''}
                                                onChange={(e) => setCreator((c) => ({ ...c, country: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <FieldLabel>Primary language</FieldLabel>
                                            <TextInput
                                                type="text"
                                                placeholder="e.g. English"
                                                value={creator.language || ''}
                                                onChange={(e) => setCreator((c) => ({ ...c, language: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <FieldLabel>Short bio</FieldLabel>
                                            <span className="text-[10px] text-slate-400 font-medium">{creator.bio?.length || 0}/140</span>
                                        </div>
                                        <TextArea
                                            rows={2}
                                            maxLength={140}
                                            placeholder="Tell supporters a little about your work in one or two sentences..."
                                            value={creator.bio || ''}
                                            onChange={(e) => setCreator((c) => ({ ...c, bio: e.target.value }))}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton
                                            disabled={!creator.role || !creator.bio?.trim() || !creator.country || !creator.language}
                                            onClick={() => setFlow('creator-payment')}
                                        >
                                            Continue <IconArrowRight />
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </StepShell>
                        )}

                        {/* payment step */}
                        {flow === 'creator-payment' && (
                            <StepShell maxW="max-w-xl">
                                <div className="animate-fade-up">
                                    <BackRow onBack={() => setFlow('creator-role')} />
                                    <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                                        Configure direct payouts
                                    </h2>
                                    <p className="text-slate-600 text-xs mb-4 leading-relaxed max-w-md">
                                        Connect your local Safepay account to authorize seamless transactions and fast settlements within Pakistan.
                                    </p>

                                    <div className="bg-white border border-slate-200/60 rounded-2xl p-5 mb-6">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">

                                                    <img
                                                        src="https://getsafepay.pk/favicon.ico"
                                                        alt="Safepay"
                                                        className={`w-5 h-5 object-contain`}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-outfit font-bold text-slate-900 text-sm">Safepay API Gateway</h3>
                                                    <p className="text-[11px] text-slate-500">Supports Cards, Mobile Wallets &amp; Raast.</p>
                                                </div>
                                            </div>
                                            <a
                                                href="https://getsafepay.pk"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold underline underline-offset-2"
                                            >
                                                Get API Keys ↗
                                            </a>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <FieldLabel>Safepay Public Key</FieldLabel>
                                                <TextInput
                                                    type="text"
                                                    placeholder="sec_xxxx... or pub_xxxx..."
                                                    value={creator.safepayPublicKey}
                                                    onChange={(e) => setCreator((c) => ({ ...c, safepayPublicKey: e.target.value.trim() }))}
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel>Safepay Secret Key</FieldLabel>
                                                <TextInput
                                                    type="password"
                                                    placeholder="Enter your dashboard secret token"
                                                    value={creator.safepaySecretKey}
                                                    onChange={(e) => setCreator((c) => ({ ...c, safepaySecretKey: e.target.value.trim() }))}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-[10px] text-slate-400 mt-4 flex items-start gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-indigo-500/70 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            Credentials are encrypted downstream and isolated securely away from public-facing screens.
                                        </p>
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton
                                            disabled={!creator.safepayPublicKey.trim() || !creator.safepaySecretKey.trim()}
                                            onClick={() => setFlow('creator-social')}
                                        >
                                            Continue <IconArrowRight />
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </StepShell>
                        )}

                        {/* socials step */}
                        {flow === 'creator-social' && (
                            <SocialStep
                                creator={creator}
                                setCreator={setCreator}
                                onBack={() => setFlow('creator-payment')}
                                onFinish={handleLaunch}
                                launching={launching}
                                launchError={launchError}
                            />
                        )}
                    </div>
                ) : (
                    <>
                        {/* creator auth / default entry */}
                        {flow === 'creator-auth' && (
                            <StepShell maxW="max-w-4xl">
                                <div className="relative animate-fade-up">
                                    <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center px-2 sm:px-4">

                                        {/* left — big plain heading, no card/bg */}
                                        <div>
                                            <h2 className="font-outfit text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                                                Set up your<br /> creator profile
                                            </h2>
                                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4 max-w-sm">
                                                Claim your Funderly link and start receiving support from your audience, directly.
                                            </p>

                                            <p className="hidden md:block mt-8 text-sm text-slate-500">
                                                Just here to support someone?{' '}
                                                <Link href="/explore" className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4">
                                                    Explore creators
                                                </Link>
                                            </p>
                                        </div>

                                        {/* right — auth providers */}
                                        <div>
                                            <div className="space-y-3">
                                                {['GitHub', 'Google', 'Facebook'].map((provider) => (
                                                    <button
                                                        key={provider}
                                                        type="button"
                                                        onClick={async () => {
                                                            setConnecting(provider);
                                                            await signIn(provider.toLowerCase(), { callbackUrl: '/create' });
                                                        }}
                                                        disabled={!!connecting}
                                                        className="group w-full flex items-center gap-3.5 bg-white text-slate-900 font-bold py-4 px-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-[15px] shadow-sm hover:shadow-md disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
                                                    >
                                                        <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                                                            {connecting === provider ? (
                                                                <IconSpinner className="w-4.5 h-4.5 text-slate-500" />
                                                            ) : (
                                                                provider === 'GitHub' ? <IconGithub className="w-4.5 h-4.5" /> :
                                                                    provider === 'Google' ? <IconGoogle className="w-4.5 h-4.5" /> :
                                                                        <IconFacebook className="w-4.5 h-4.5" />
                                                            )}
                                                        </span>
                                                        <span className="flex-1 text-left">
                                                            {connecting === provider ? 'Connecting…' : `Continue with ${provider}`}
                                                        </span>
                                                        <IconArrowRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                                                    </button>
                                                ))}
                                            </div>

                                            <p className="mt-5 text-xs leading-relaxed text-slate-400">
                                                By continuing you agree to Funderly's{' '}
                                                <Link href="/terms" className="text-slate-500 hover:text-slate-700 underline underline-offset-4">Terms</Link>
                                                {' '}and{' '}
                                                <Link href="/privacy" className="text-slate-500 hover:text-slate-700 underline underline-offset-4">Privacy Policy</Link>.
                                            </p>

                                            <div className="mt-6 pt-5 border-t border-slate-200 text-center md:hidden">
                                                <p className="text-xs text-slate-500">
                                                    Are you a fan? You can directly fund creators.{' '}
                                                    <Link href="/explore" className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4">
                                                        Explore creators
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StepShell>
                        )}

                        {/* creator confirmation */}
                        {flow === 'creator-success' && (
                            <StepShell maxW="max-w-sm">
                                <div className="text-center animate-fade-up">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-5 animate-pop shadow-xl shadow-indigo-600/20">
                                        <IconCheck className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                        Your page is live!
                                    </h2>
                                    <p className="text-slate-600 text-xs leading-relaxed mb-2">
                                        Welcome to Funderly, {creator.name || 'creator'}. Taking you to your dashboard...
                                    </p>
                                    {redirecting && (
                                        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 mt-4">
                                            <IconSpinner className="w-3 h-3" /> Redirecting
                                        </div>
                                    )}
                                </div>
                            </StepShell>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

/* social-links step */
const SOCIAL_PLATFORMS = [
    { key: 'instagram', label: 'Instagram', icon: IconInstagram, bg: 'bg-slate-100' },
    { key: 'youtube', label: 'YouTube', icon: IconYoutube, bg: 'bg-slate-100' },
    { key: 'tiktok', label: 'TikTok', icon: IconTiktok, bg: 'bg-slate-100 text-slate-900' },
    { key: 'x', label: 'X / Twitter', icon: IconX, bg: 'bg-slate-100 text-slate-900' },
];

function SocialStep({ creator, setCreator, onBack, onFinish, launching, launchError }) {
    const listRef = useRef(null);
    const customLinks = creator.customLinks || [];
    const canAddMore = (4 + customLinks.length) < 10;

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [customLinks.length]);

    const updateLink = (key, value) =>
        setCreator((c) => ({ ...c, links: { ...c.links, [key]: value } }));

    const addCustomLink = () => {
        if (canAddMore) {
            setCreator((c) => ({ ...c, customLinks: [...customLinks, { label: '', url: '' }] }));
        }
    };

    const updateCustomLink = (idx, field, value) =>
        setCreator((c) => {
            const next = [...c.customLinks];
            next[idx] = { ...next[idx], [field]: value };
            return { ...c, customLinks: next };
        });

    const removeCustomLink = (idx) =>
        setCreator((c) => ({ ...c, customLinks: customLinks.filter((_, i) => i !== idx) }));

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col animate-fade-up">
            <div className="shrink-0">
                <BackRow onBack={onBack} />
                <h2 className="font-outfit text-xl font-extrabold text-slate-900 mb-1">Link your world</h2>
                <p className="text-slate-600 text-xs mb-4">Manage your social links (Max 10).</p>
            </div>

            <div
                ref={listRef}
                className="h-[220px] md:h-[220px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 -mr-2 space-y-3 py-1 transition-all duration-300"
            >
                {SOCIAL_PLATFORMS.map((p) => (
                    <div key={p.key} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${p.bg}`}>
                            <p.icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="w-20 text-xs font-bold text-slate-700 truncate">{p.label}</div>
                        <TextInput
                            placeholder={`Your ${p.label} URL`}
                            value={creator.links[p.key] || ''}
                            onChange={(e) => updateLink(p.key, e.target.value)}
                        />
                    </div>
                ))}

                {customLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 transition-all duration-300">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 text-slate-500">
                            <IconLink className="w-4 h-4" />
                        </div>
                        <TextInput
                            className="w-1/3"
                            placeholder="Label"
                            value={link.label}
                            onChange={(e) => updateCustomLink(idx, 'label', e.target.value)}
                        />
                        <TextInput
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) => updateCustomLink(idx, 'url', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => removeCustomLink(idx)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <IconX_Close className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between shrink-0">
                <button
                    type="button"
                    onClick={addCustomLink}
                    disabled={!canAddMore}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-all ${canAddMore ? 'text-indigo-600 hover:text-indigo-700' : 'text-slate-300 cursor-not-allowed'}`}
                >
                    <span className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">+</span>
                    {canAddMore ? 'Add link' : 'Limit reached'}
                </button>

                <PrimaryButton onClick={onFinish} loading={launching} disabled={launching}>
                    {launching ? 'Launching…' : 'Launch my page'}
                </PrimaryButton>
            </div>

            {launchError && (
                <p className="mt-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 animate-fade-up">
                    {launchError}
                </p>
            )}
        </div>
    );
}