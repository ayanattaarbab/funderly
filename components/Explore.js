'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ============================== icons ============================== */
const IconSearch = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IconX = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconCheck = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconGhost = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 0-7 7v11l2.5-2 2 2 2.5-2 2.5 2 2-2 2.5 2V9a7 7 0 0 0-7-7Z" />
    <circle cx="9.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';

/* ============================== skeleton card ============================== */
function SkeletonCard() {
  return (
    <div className="glass-card border border-slate-200/70 rounded-3xl overflow-hidden">
      <div className="h-28 shimmer" />
      <div className="px-6 pb-6">
        <div className="w-16 h-16 rounded-full border-4 border-[#F8FAFC] -mt-8 mb-4 shimmer" />
        <div className="h-4 w-2/3 rounded-full shimmer mb-2.5" />
        <div className="h-3 w-1/3 rounded-full shimmer mb-4" />
        <div className="h-6 w-20 rounded-full shimmer" />
      </div>
    </div>
  );
}

/* ============================== creator card ============================== */
function CreatorCard({ c }) {
  return (
    <Link
      href={`/${c.username}`}
      className="group relative glass-card border border-slate-200/70 rounded-3xl overflow-hidden shadow-lg shadow-slate-900/[0.03] hover:shadow-2xl hover:shadow-indigo-900/[0.08] hover:-translate-y-1 hover:border-indigo-200/70 transition-all duration-300 ease-out"
    >
      <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        {c.coverUrl ? (
          <img
            src={c.coverUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="px-6 pb-6">
        <div className="w-16 h-16 rounded-full border-4 border-[#F8FAFC] -mt-8 mb-4 bg-slate-100 shadow-md overflow-hidden relative">
          {c.avatarUrl ? (
            <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-extrabold text-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50">
              {initials(c.name)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight truncate">{c.name}</h3>
          {c.verified && (
            <span className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0" title="Verified creator">
              <IconCheck />
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-slate-400 mb-3">@{c.username}</p>

        {c.bio && (
          <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{c.bio}</p>
        )}

        {c.role && (
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
            {c.role}
          </span>
        )}
      </div>
    </Link>
  );
}

/* ============================== main page ============================== */
export default function Explore({ isSignedIn = false, initialCreator = null }) {
    const router = useRouter();
    const [creators, setCreators] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [currentCreator, setCurrentCreator] = useState(initialCreator);
    const [menuOpen, setMenuOpen] = useState(false);

    // Guards against duplicate/overlapping requests (e.g. React StrictMode
    // double-invoking effects in dev, or fast repeated scroll triggers).
    // This is what was producing the duplicate-key warning: page 1 was
    // being fetched twice and both results appended to the same list.
    const fetchLock = useRef(false);
    const sentinelRef = useRef(null);
    const menuCloseTimer = useRef(null);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Close the profile dropdown on outside click/tap (covers mobile,
    // where there's no hover), and on Escape from anywhere in the menu.
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        function handleEscape(e) {
            if (e.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    const fetchCreators = useCallback(async (pageNum, searchTerm, replace) => {
        if (fetchLock.current) return;
        fetchLock.current = true;
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(pageNum) });
            if (searchTerm) params.set('search', searchTerm);
            const res = await fetch(`/api/creators?${params.toString()}`);
            const data = await res.json();
            const incoming = data.creators || [];

            if (incoming.length < 9) setHasMore(false); else setHasMore(true);

            setCreators((prev) => {
                const base = replace ? [] : prev;
                const seen = new Set(base.map((c) => c.userId));
                const deduped = incoming.filter((c) => !seen.has(c.userId));
                return [...base, ...deduped];
            });
        } catch (err) {
            console.error('Error fetching creators:', err);
        } finally {
            setLoading(false);
            setInitialLoading(false);
            fetchLock.current = false;
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchCreators(1, '', true);
    }, [fetchCreators]);

    useEffect(() => {
        if (!isSignedIn) return;
        const loadCreator = async () => {
            try {
                const res = await fetch('/api/creator');
                if (!res.ok) return;
                const data = await res.json();
                if (data.creator) setCurrentCreator(data.creator);
            } catch (err) {
                console.error('Failed to load current creator:', err);
            }
        };
        loadCreator();
    }, [isSignedIn]);

    // Debounced search — resets pagination and refetches from page 1
    useEffect(() => {
        const handle = setTimeout(() => {
            if (searchInput === search) return;
            setSearch(searchInput);
            setPage(1);
            setHasMore(true);
            setInitialLoading(true);
            fetchCreators(1, searchInput, true);
        }, 400);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        const nextPage = page + 1;
        setPage(nextPage);
        fetchCreators(nextPage, search, false);
    }, [loading, hasMore, page, search, fetchCreators]);

    // Infinite scroll via IntersectionObserver on a sentinel below the grid
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { rootMargin: '400px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [loadMore]);

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] font-jakarta antialiased pt-32 pb-20">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

            <style>{`
                .font-outfit { font-family: 'Outfit', sans-serif !important; }
                .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }
                .glass-card { background: rgba(255,255,255,0.72); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
                .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
                .shimmer {
                    background: linear-gradient(90deg, #eef1f6 25%, #f7f8fb 37%, #eef1f6 63%);
                    background-size: 800px 100%;
                    animation: shimmer 1.4s ease-in-out infinite;
                }
                @keyframes fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-up { animation: fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin 0.8s linear infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .shimmer, .animate-fade-up, .animate-spin-slow { animation: none !important; }
                }
            `}</style>

            {/* Header */}
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
                        <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                          Funderly
                        </span>
                      </Link>
            
                      {isSignedIn ? (
                        <div
                          ref={menuRef}
                          className="relative"
                          onMouseEnter={() => {
                            clearTimeout(menuCloseTimer.current);
                            setMenuOpen(true);
                          }}
                          onMouseLeave={() => {
                            menuCloseTimer.current = setTimeout(() => setMenuOpen(false), 150);
                          }}
                        >
                          <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setMenuOpen((v) => !v)}
                            onFocus={() => {
                              clearTimeout(menuCloseTimer.current);
                              setMenuOpen(true);
                            }}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            aria-label={currentCreator?.name ? `${currentCreator.name}, open profile menu` : 'Open profile menu'}
                            className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700 border border-slate-200 hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] cursor-pointer transition-all duration-300"
                          >
                            {currentCreator?.avatarUrl ? (
                              <img src={currentCreator.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              initials(currentCreator?.name || '')
                            )}
                          </button>

                          <div
                            role="menu"
                            aria-label="Profile menu"
                            className={`absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/[0.08] transition-all duration-200 ease-out ${
                              menuOpen
                                ? 'translate-y-0 scale-100 opacity-100'
                                : 'pointer-events-none -translate-y-1 scale-95 opacity-0'
                            }`}
                          >
                            <Link
                              href="/dashboard"
                              role="menuitem"
                              tabIndex={menuOpen ? 0 : -1}
                              onFocus={() => {
                                clearTimeout(menuCloseTimer.current);
                                setMenuOpen(true);
                              }}
                              onClick={() => setMenuOpen(false)}
                              className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 cursor-pointer transition-colors"
                            >
                              Dashboard
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => router.push('/create')} className="relative h-10 px-5 overflow-hidden text-sm font-bold border border-slate-200 hover:border-slate-300 bg-slate-50/50 rounded-full transition-all duration-300 cursor-pointer group text-slate-800">
                          <span className="absolute inset-0 bg-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                          <span className="relative z-10">Sign In</span>
                        </button>
                      )}
                    </div>
                  </header>

            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 mb-3 font-outfit">
                            Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Creators</span>
                        </h1>
                        <p className="text-sm font-semibold text-slate-400">Support the people making things you love, directly.</p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80 shrink-0">
                        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search creators..."
                            className="w-full h-11 pl-10 pr-9 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                                aria-label="Clear search"
                            >
                                <IconX />
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {initialLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : creators.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                            <IconGhost />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-1">No creators found</h3>
                        <p className="text-sm text-slate-400 max-w-xs">
                            {search ? `Nothing matches "${search}". Try a different name or handle.` : 'Check back soon — new creators are joining all the time.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                        {creators.map((c) => (
                            <CreatorCard key={c.userId} c={c} />
                        ))}
                    </div>
                )}

                {/* Infinite scroll sentinel + trailing loader */}
                {!initialLoading && hasMore && (
                    <div ref={sentinelRef} className="mt-12 flex justify-center h-10">
                        {loading && (
                            <div className="flex items-center gap-2.5 text-slate-400 text-sm font-semibold">
                                <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
                                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                                Loading more creators...
                            </div>
                        )}
                    </div>
                )}

                {!initialLoading && !hasMore && creators.length > 0 && (
                    <p className="mt-12 text-center text-xs font-semibold text-slate-300">You've reached the end — that's everyone.</p>
                )}
            </div>
        </div>
    );
}