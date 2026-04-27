
'use client';

import React from 'react';
import { ShieldCheck, Mail, Twitter, Linkedin, Heart, AlertTriangle } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
 setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
 return (
 <footer className="bg-white border-t border-slate-200">
 <div className="max-w-7xl mx-auto px-8 py-24">
 <div className="grid grid-cols-12 gap-16">
 {/* Brand Column */}
 <div className="col-span-12 lg:col-span-4 space-y-8">
 <div 
 className="flex items-center gap-3 font-medium text-slate-900 text-3xl cursor-pointer tracking-tight"
 onClick={() => setCurrentPage('home')}
 >
 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
 <ShieldCheck className="w-6 h-6 text-[#6366F1]" />
 </div>
 <span className="text-[#6366F1] font-bold">NurseBuilder</span>
 </div>
 <p className="text-slate-500 font-medium leading-relaxed max-w-sm text-sm">
 Empowering individual healthcare professionals through strategic communication and burnout recovery tools.<br/><br/>Built by nurses. for nurses.
 </p>
 <div className="flex gap-4">
 <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all"><Twitter className="w-4 h-4" /></a>
 <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all"><Linkedin className="w-4 h-4" /></a>
 <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all"><Mail className="w-4 h-4" /></a>
 </div>
 </div>

 {/* Links Columns */}
 <div className="col-span-6 lg:col-span-4">
 <h4 className="font-bold text-slate-900 mb-8 text-xs uppercase tracking-widest">Support</h4>
 <ul className="space-y-4 text-slate-500 text-sm font-medium">
 <li><button onClick={() => setCurrentPage('help')} className="hover:text-[#6366F1] transition-colors text-left">Help Center</button></li>
 <li><button onClick={() => setCurrentPage('contact')} className="hover:text-[#6366F1] transition-colors text-left">Contact Us</button></li>
 <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-[#6366F1] transition-colors text-left">Privacy Policy</button></li>
 <li><button onClick={() => setCurrentPage('terms')} className="hover:text-[#6366F1] transition-colors text-left">Terms of Service</button></li>
 </ul>
 </div>

 {/* Newsletter Bento Card */}
 <div className="col-span-12 lg:col-span-4">
 <div className="bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] border border-indigo-400/30">
 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform -rotate-12 translate-x-4 -translate-y-4"><Heart className="w-48 h-48 fill-white" /></div>
 <div className="relative z-10 space-y-3">
 <h4 className="text-2xl font-bold tracking-tight">Unit Wellness Newsletter</h4>
 <p className="text-white/80 text-sm font-medium">Strategic self-care tips delivered to your inbox weekly.</p>
 </div>
 <div className="flex gap-3 relative z-10 mt-8">
 <input type="email" placeholder="Email" className="w-full px-6 py-3 rounded-full bg-white/20 border border-white/20 text-white placeholder:text-white/60 outline-none font-medium text-sm focus:bg-white/30 transition-all shadow-inner" />
 <button className="bg-white text-[#6366F1] px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-50 transition-all shadow-md">Join</button>
 </div>
 </div>
 </div>
 </div>

 {/* Disclaimer Area */}
 <div className="mt-20 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
 <AlertTriangle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
 <p className="text-[10px] leading-relaxed font-bold uppercase tracking-[0.1em] text-slate-400 text-left">
 <span className="text-slate-600">Professional Disclaimer:</span> This platform and the provided strategy plans are for individual educational and support purposes only. They do not constitute clinical advice, medical diagnosis, legal counsel, or professional nursing certification. Users engage with this site at their own risk. NurseBuilder is not liable for personal or professional outcomes resulting from use.
 </p>
 </div>

 {/* Bottom Bar */}
 <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
 <p>© 2025 NurseBuilder. Protecting those who protect us.</p>
 <div className="flex items-center gap-2 whitespace-nowrap">
 Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by the nursing community
 </div>
 </div>
 </div>
 </footer>
 );
};

export default Footer;
