import React from "react";
import {
  Sparkles,
  Shield,
  Award,
  Brain,
  Zap,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Image from 'next/image';

interface HomePageProps {
  onGenerate: (bundle: any, issue: string, context: string) => void;
  isLoggedIn: boolean;
  onJoin: (plan?: any) => void;
  creditsUsed: number;
  setCurrentPage: (page: any) => void;
  userTier?: string;
  pricingPlans: any[];
}

const HomePage: React.FC<HomePageProps> = ({
  onGenerate,
  isLoggedIn,
  onJoin,
  creditsUsed,
  setCurrentPage,
  userTier,
  pricingPlans,
}) => {
  return (
    <div className="bg-[#0B0E14] min-h-screen font-sans">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-800 bg-[#131620] mb-8">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              CLINICAL SUPPORT ENGINE V2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            Master Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
              Professional Sanity.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            The only boundary-building platform designed specifically for nurses. High-impact scripts for Lateral Violence, Managerial Gaslighting, and Clinical Exhaustion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage("generate")}
              className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 text-white rounded-full flex items-center justify-center gap-2 font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              Start Building Boundaries <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage("pricing")}
              className="px-8 py-4 bg-[#131620] hover:bg-[#1a1f2e] text-white border border-slate-800 rounded-full font-medium transition-colors"
            >
              View Premium Access
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {['ICU SUPPORT', 'ER ADVOCATE', 'UNIT SHIELD', 'CARE GUARD'].map((tag, i) => {
              const words = tag.split(' ');
              return (
                <div key={i} className="text-sm font-bold uppercase tracking-widest text-slate-600">
                  <span className="text-slate-400">{words[0]}</span> {words[1]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 2. THE FEATURES --- */}
      <section className="py-32 bg-[#F8FAFC] relative z-10 rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative -top-48 mb-[-12rem]">
          {[
            {
              icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
              iconBg: 'bg-rose-50',
              title: "Lateral Violence Shield",
              desc: "Scripts to neutralize toxic peer behavior and unit bullying instantly."
            },
            {
              icon: <Brain className="w-6 h-6 text-[#6366F1]" />,
              iconBg: 'bg-indigo-50',
              title: "Managerial Neutralizer",
              desc: "Professional responses for gaslighting, guilt-tripping, and shift-dumping."
            },
            {
              icon: <Award className="w-6 h-6 text-emerald-500" />,
              iconBg: 'bg-emerald-50',
              title: "Clinical Authority",
              desc: "Reclaim your voice during physician rounds and patient family conflicts."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-start hover:-translate-y-1 transition-transform">
              <div className={`p-4 rounded-2xl ${feature.iconBg} mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- 3. THE CLINICAL CRISIS --- */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-20">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[#6366F1] text-[10px] font-bold uppercase tracking-widest mb-2">
              THE CLINICAL CRISIS
            </div>
            <h2 className="text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Burnout isn't <br /> a lack of care.
            </h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-md">
              It's a lack of boundaries. Hospital systems are designed to consume your empathy. NurseBuilder is designed to protect it.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                "92% of nurses report lateral violence.",
                "74% struggle to say 'no' to extra shifts.",
                "Mastering scripts reduces workplace stress by 40%."
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-slate-900 font-bold text-sm tracking-tight">{stat}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="w-full aspect-[4/5] md:aspect-auto md:h-[500px] relative rounded-[3rem] overflow-hidden bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] shadow-xl">
                 <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Scrubs" className="absolute object-cover w-full h-full opacity-40 mix-blend-overlay" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/40 to-transparent" />
             </div>
             {/* Float Card */}
             <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white p-6 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 max-w-[300px]">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                     <Shield className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-bold text-slate-900 tracking-tight">Boundary Alert</span>
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  "I am unavailable for an extra shift. I need this time to ensure I can provide safe patient care tomorrow."
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- 4. RESILIENCE LOOP --- */}
      <section className="py-32 bg-[#0B0E14] relative z-10 text-center">
         <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
               The 4-Phase <br/>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">Resilience Loop</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium mb-20">
               A systematic approach to professional self-defense.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
               {[
                 {num:"01", icon:<Brain className="w-5 h-5 text-[#6366F1]" />, title: "Specialty Mapping", desc: "Identify psychological traps specific to your clinical role.", color: "text-[#6366F1]"},
                 {num:"02", icon:<Zap className="w-5 h-5 text-yellow-400" />, title: "Script Generation", desc: "Build assertive responses: Peer, Managerial, Escalation.", color: "text-yellow-400"},
                 {num:"03", icon:<ShieldAlert className="w-5 h-5 text-rose-400" />, title: "Pushback Prep", desc: "Neutralize gaslighting from hospital management and rude physicians.", color: "text-rose-400"},
                 {num:"04", icon:<Award className="w-5 h-5 text-emerald-400" />, title: "Mental Integration", desc: "Build the muscle for guilt-free clinical support.", color: "text-emerald-400"}
               ].map((part, i) => (
                 <div key={i} className="bg-[#131620] border border-slate-800 rounded-3xl p-8 hover:bg-[#1a1f2e] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      {part.icon}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 mb-6 tracking-widest flex items-center gap-2">
                      {part.icon} {part.num}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{part.title}</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{part.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 5. VOICES --- */}
      <section className="py-32 bg-white text-center relative z-10">
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

      {/* --- 6. PRICING --- */}
      <section id="pricing" className="py-32 bg-[#F8FAFC] relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-8">
            <Award className="w-3 h-3 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              PROFESSIONAL RESILIENCE TRACK
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B0E14] mb-4 tracking-tight leading-tight">
            Invest in Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] italic">Mental Resilience.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium mb-16 max-w-2xl mx-auto">
            Mastering professional boundaries is the #1 way to prevent individual clinical exhaustion.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
            {[
              { icon: <ShieldAlert className="w-5 h-5 text-rose-400" />, title: "15%", sub: "BURNOUT REDUCTION" },
              { icon: <Brain className="w-5 h-5 text-[#6366F1]" />, title: "4.2 hrs", sub: "WEEKLY RECLAIMED" },
              { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "50k+", sub: "NURSES PROTECTED" },
              { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: "35%", sub: "GUILT REDUCTION" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center justify-center">
                <div className="mb-3">{stat.icon}</div>
                <div className="text-xl font-extrabold text-slate-900">{stat.title}</div>
                <div className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto text-left">
             {/* Plan 1 */}
             <div className="flex-1 bg-white rounded-[2.5rem] p-10 md:p-12 border-2 border-[#6366F1] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)] relative transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6366F1] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  BEST FOR SELF-CARE
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">3 Months Access</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-6xl font-extrabold text-slate-900 tracking-tighter">$19</span>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-400 line-through decoration-rose-400/60">$40</span>
                   </div>
                </div>
                
                <div className="space-y-4 mb-10 text-sm font-medium text-slate-600">
                   {[
                    "250 Strategy Generations",
                    "Full Support Strategy Engine",
                    "Unlimited Protocol Generation",
                    "Personal Burnout Dashboard",
                    "Private History Library"
                   ].map((feat, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full border border-indigo-100 flex items-center justify-center shrink-0">
                         <CheckCircle className="w-3.5 h-3.5 text-[#6366F1]" />
                       </div>
                       <span className="tracking-tight">{feat}</span>
                     </div>
                   ))}
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  Secure My Sanity
                </button>
             </div>

             {/* Plan 2 */}
             <div className="flex-1 bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-200 shadow-sm relative">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">1 Year Access</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-6xl font-extrabold text-slate-900 tracking-tighter">$49</span>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-400 line-through decoration-rose-400/60">$97</span>
                   </div>
                </div>
                
                <div className="space-y-4 mb-10 text-sm font-medium text-slate-600">
                   {[
                    "Unlimited Strategy Generations",
                    "All Professional Features",
                    "Regular Protocol Updates",
                    "Permanent Profile Identity"
                   ].map((feat, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full border border-slate-100 flex items-center justify-center shrink-0">
                         <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                       </div>
                       <span className="tracking-tight">{feat}</span>
                     </div>
                   ))}
                </div>

                <button className="w-full py-4 bg-[#0B0E14] hover:bg-[#1a1f2e] text-white rounded-full font-bold transition-all">
                  Lifetime Protection
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

