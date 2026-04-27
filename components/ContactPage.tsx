
'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

const ContactPage: React.FC = () => {
 return (
 <div className="bg-slate-50">
 <div className="animate-in fade-in duration-700 space-y-12 pb-24 max-w-7xl mx-auto px-8 py-24">
 <div className="grid grid-cols-12 gap-8">
 <div className="col-span-12 lg:col-span-4 bg-white p-12 text-white rounded-[2.5rem] shadow-md space-y-12 relative overflow-hidden flex flex-col justify-between border border-white/5">
 <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
 <ShieldCheck className="w-64 h-64" />
 </div>
 
 <div className="space-y-6 relative z-10">
 <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
 <MessageSquare className="w-3 h-3 text-indigo-600" />
 <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600">Professional Concierge</span>
 </div>
 <h1 className="text-5xl md:text-7xl font-medium tracking-tight">Executive Liaison.</h1>
 <p className="text-slate-600 font-medium text-lg leading-relaxed">Our specialized liaison team is here to assist in your professional governance.</p>
 </div>

 <div className="space-y-10 relative z-10">
 <div className="flex items-center gap-6">
 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-md">
 <Mail className="w-6 h-6 text-indigo-600" />
 </div>
 <div>
 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Electronic Mail</p>
 <p className="font-medium text-xl">liaison@nursebuilder.io</p>
 </div>
 </div>

 <div className="flex items-center gap-6">
 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-md">
 <Clock className="w-6 h-6 text-indigo-600" />
 </div>
 <div>
 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Operational Status</p>
 <p className="font-medium text-xl">24/7 Professional Sanctuary</p>
 </div>
 </div>
 </div>
 </div>

 <div className="col-span-12 lg:col-span-8 bg-white p-12 md:p-16 rounded-[2.5rem] border border-slate-200 shadow-md space-y-12 flex flex-col justify-between">
 <div className="space-y-4">
 <h2 className="text-4xl font-medium text-slate-900 tracking-tight">Strategic Inquiry</h2>
 <p className="text-slate-500 font-medium text-lg">Have a specific inquiry regarding institutional agency tools? Dispatch a message below.</p>
 </div>

 <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={(e) => e.preventDefault()}>
 <div className="space-y-4">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-1">Practitioner Name</label>
 <input type="text" placeholder="Sarah Jenkins" className="w-full px-6 py-5 bg-slate-50 border border-slate-50 rounded-full focus:border-indigo-500/50 focus:bg-white focus:shadow-md outline-none font-medium transition-all" />
 </div>
 <div className="space-y-4">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-1">Professional Credentials</label>
 <input type="email" placeholder="nurse@institution.com" className="w-full px-6 py-5 bg-slate-50 border border-slate-50 rounded-full focus:border-indigo-500/50 focus:bg-white focus:shadow-md outline-none font-medium transition-all" />
 </div>
 <div className="md:col-span-2 space-y-4">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-1">Engagement Domain</label>
 <select className="w-full px-6 py-5 bg-slate-50 border border-slate-50 rounded-full focus:border-indigo-500/50 focus:bg-white focus:shadow-md outline-none font-medium appearance-none cursor-pointer">
 <option>Professional Support</option>
 <option>Strategic Billing</option>
 <option>Enterprise Integration</option>
 <option>Feedback & Contributions</option>
 </select>
 </div>
 <div className="md:col-span-2 space-y-4">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-1">Protocol Detail</label>
 <textarea placeholder="Please delineate your specific inquiry..." className="w-full px-6 py-5 bg-slate-50 border border-slate-50 rounded-full focus:border-indigo-500/50 focus:bg-white focus:shadow-md outline-none font-medium h-48 resize-none transition-all" />
 </div>
 <div className="md:col-span-2 pt-6">
 <button className="w-full py-6 bg-[#1a1f36] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-md flex items-center justify-center gap-4 active:scale-[0.98] group">
 Dispatch Communication <Send className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-indigo-600" />
 </button>
 </div>
 </form>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {[
 { icon: MessageSquare, title:"Liaison Dialogue", desc:"Consult with a professional liaison in real-time.", action:"Initiate Dialogue" },
 { icon: ShieldCheck, title:"Identity Sanctuary", desc:"Understanding our commitment to your professional privacy.", action:"Review Protocol" },
 { icon: MapPin, title:"Global Network", desc:"Empowering practitioners across 50 international domains.", action:"View Reach" }
 ].map((item, i) => (
 <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-md space-y-8 text-center group hover:-translate-y-1 transition-all duration-500">
 <div className="w-20 h-20 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center mx-auto group-hover:bg-white group-hover:text-white transition-all shadow-md">
 <item.icon className="w-9 h-9" />
 </div>
 <div className="space-y-3">
 <h3 className="text-2xl font-medium text-slate-900 tracking-tight">{item.title}</h3>
 <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
 </div>
 <button className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em] hover:text-indigo-800 transition-colors border-b border-indigo-100 pb-1">{item.action}</button>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};

export default ContactPage;
