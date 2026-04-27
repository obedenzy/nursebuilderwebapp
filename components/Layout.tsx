'use client';

import React, { useState } from 'react';
import { ShieldCheck, LogOut, Menu, X, LogIn, Sparkles, Home, FileText, CreditCard, User, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout?: () => void;
  creditsUsed?: number;
  userTier?: string;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, setCurrentPage, children, isLoggedIn, onLogout, creditsUsed = 0, userTier }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = isLoggedIn ? [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'generate', label: 'Generate', icon: FileText },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ] : [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
  ];

  const handleNavClick = (id: Page) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10 bg-slate-50 relative font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-indigo-900 tracking-tight">NurseBuilder</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-slate-50/80 py-1.5 px-3 rounded-full border border-slate-100">
              {isLoggedIn && userTier && (
                 <div className="px-4 py-1.5 bg-indigo-100/50 rounded-full flex items-center gap-2">
                   <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                   <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest">
                     {userTier.toLowerCase() !== 'free' ? "1 YEAR ACCESS" : "FREE TIER"}
                   </span>
                 </div>
              )}

              {navItems.map((item) => {
                 const isActive = currentPage === item.id;
                 return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as Page)}
                    className={`px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-full transition-all ${
                      isActive 
                        ? 'bg-white text-[#6366F1] shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                 );
              })}
            </div>

            <div className="flex items-center">
              {!isLoggedIn ? (
                <button
                  onClick={() => handleNavClick('auth')}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 text-white rounded-full flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(99,102,241,0.39)]"
                >
                  <LogIn className="w-4 h-4" /> Login / Signup
                </button>
              ) : (
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-full text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all" 
                  onClick={() => onLogout ? onLogout() : window.location.reload()}
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-3 bg-slate-50 text-slate-600 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 px-6 py-6 shadow-xl space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as Page)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                  currentPage === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'bg-slate-50 text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            {!isLoggedIn ? (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full flex items-center justify-center gap-3 p-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm mt-4"
              >
                <LogIn className="w-5 h-5" />
                Enter Sanctuary
              </button>
            ) : (
              <button 
                className="w-full flex items-center justify-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm mt-4" 
                onClick={() => onLogout ? onLogout() : window.location.reload()}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 w-full bg-[#0B0E14]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
