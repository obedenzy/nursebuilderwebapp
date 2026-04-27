'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const VoicesFromTheUnit = () => (
 <section className="py-12 bg-transparent text-center relative z-10">
 <div className="max-w-6xl mx-auto px-6">
 <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
 Voices from the Unit
 </h2>
 <p className="text-slate-500 font-medium mb-16">
 Hear from nurses who reclaimed their sanity.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
 {[
 {
 quote: '"I used the Formal Escalation script when my manager tried to guilt me into a 16-hour shift. It worked without the usual drama."',
 name: "Sarah J., ICU",
 title: "CRITICAL CARE",
 initial: "S",
 color: "text-[#6366F1] bg-indigo-50"
 },
 {
 quote: '"The \'Nurse No More Pleaser\' track changed how I interact with doctors. I don\'t apologize for things that aren\'t my fault anymore."',
 name: "Michael T., ER",
 title: "EMERGENCY MEDICINE",
 initial: "M",
 color: "text-[#6366F1] bg-indigo-50"
 },
 {
 quote: '"Lateral violence was killing my soul. These scripts gave me the words to stand up for myself professionally."',
 name: "Elena R., Med-Surg",
 title: "STAFF NURSE",
 initial: "E",
 color: "text-[#6366F1] bg-indigo-50"
 }
 ].map((voice, i) => (
 <div key={i} className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative flex flex-col">
 <div className="absolute top-8 right-8 text-indigo-50 pointer-events-none">
 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 <path d="M14.017 21L16.41 14.593H10.518V3H21.488V14.593L19.096 21H14.017ZM3.511 21L5.904 14.593H0.012V3H10.982V14.593L8.59 21H3.511Z" />
 </svg>
 </div>
 <div className="flex gap-1 mb-6">
 {[1,2,3,4,5].map(s => <Sparkles key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
 </div>
 <p className="text-slate-800 font-bold italic leading-relaxed mb-8 relative z-10 flex-1 text-[15px]">
 {voice.quote}
 </p>
 <div className="flex items-center gap-4">
 <div className={`w-10 h-10 rounded-full ${voice.color} font-bold flex items-center justify-center shrink-0`}>
 {voice.initial}
 </div>
 <div>
 <div className="font-bold text-slate-900 text-xs">{voice.name}</div>
 <div className={`text-[9px] uppercase tracking-widest font-bold mt-0.5 text-[#6366F1]`}>{voice.title}</div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
);
