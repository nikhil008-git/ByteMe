"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Terminal, Shield, Zap, Layers, Code2, Copy, Monitor } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex-1 w-full relative overflow-x-hidden">
      
      {/* Background Radials */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-black to-black pointer-events-none z-0"></div>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 mt-12">
          
          <div className="flex-1 flex flex-col items-start gap-8 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-white/60" />
              <span className="text-[10px] font-medium tracking-widest uppercase text-white/60">Aesthetic Driven</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.1] text-white font-medium">
              A calm, visual <br/> editor for <br/> beautiful code.
            </h1>
            
            <p className="text-lg text-white/40 max-w-md font-sans leading-relaxed">
              ByteMe transforms your raw snippets into stunning, production-ready graphics instantly. Build your library, share with your team, ship with the best UI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <button 
                onClick={() => router.push("/sign-up")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Start for free <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          {/* Right Visualizer */}
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-transparent blur-2xl opacity-50 rounded-full pointer-events-none"></div>
            <div className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col group">
               {/* Mock Traffic Lights */}
               <div className="flex items-center gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-500/80 transition-colors"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-yellow-500/80 transition-colors"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500/80 transition-colors"></div>
                 <div className="text-[10px] text-white/20 font-mono tracking-widest mx-auto -ml-3">App.tsx</div>
               </div>
               
               {/* Mock Code */}
               <div className="p-6 font-mono text-[11px] leading-loose text-white/50 relative flex-1 bg-black/40">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
                 <div className="relative z-10">
                   <span className="text-white/30 mr-4">1</span> <span className="text-blue-400">export default function</span> <span className="text-yellow-200">ByteMeUI</span>() {'{'}<br/>
                   <span className="text-white/30 mr-4">2</span> &nbsp;&nbsp;<span className="text-blue-400">return</span> (<br/>
                   <span className="text-white/30 mr-4">3</span> &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">GlassCard</span> <span className="text-green-300">intensity</span>=<span className="text-white">"max"</span>&gt;<br/>
                   <span className="text-white/30 mr-4">4</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">Code</span> <span className="text-green-300">theme</span>=<span className="text-white">"cyber-luxury"</span> /&gt;<br/>
                   <span className="text-white/30 mr-4">5</span> &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-red-400">GlassCard</span>&gt;<br/>
                   <span className="text-white/30 mr-4">6</span> &nbsp;&nbsp;);<br/>
                   <span className="text-white/30 mr-4">7</span> {'}'}
                 </div>
                 
                 {/* Floating Badges */}
                 <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white text-black px-2 py-1 rounded text-[9px] font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]">PNG</span>
                    <span className="bg-white/10 text-white px-2 py-1 rounded border border-white/20 text-[9px] font-bold backdrop-blur-md">1080p</span>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* BRANDS SECTION */}
        <section className="w-full mt-40 border-y border-white/[0.02] py-16 flex flex-col items-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none"></div>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/30 mb-8">Generated by Devs At</span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-default"><Zap className="w-5 h-5"/> <span className="text-lg font-bold font-sans tracking-tight">Vercel</span></div>
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-default"><Layers className="w-5 h-5"/> <span className="text-lg font-bold font-sans tracking-tight">OpenAI</span></div>
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-default"><Shield className="w-5 h-5"/> <span className="text-lg font-bold font-sans tracking-tight">Stripe</span></div>
            <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-default"><Monitor className="w-5 h-5"/> <span className="text-lg font-bold font-sans tracking-tight">Linear</span></div>
          </div>
        </section>

        {/* FEATURES SECTION (One app, multiple agents style) */}
        <section className="mt-40 flex flex-col items-start w-full">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-8 flex items-center gap-3">
              <Terminal className="w-3 h-3" /> Core Features
            </span>
            
            <h2 className="text-3xl md:text-5xl font-sans text-white mb-4 tracking-tight">One tool, gorgeous aesthetics.</h2>
            <p className="text-white/40 max-w-xl text-sm leading-relaxed mb-16">
              Switch between backgrounds and layouts instantly. Tweak shadows, glassmorphism, and neon meshes down to the pixel.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Feature 1 */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Code2 className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white/90">Monaco Engine</h3>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-sans relative z-10">
                  The original coding engine from VS Code. Deep syntax highlighting, auto-formatting, careful edits, and language support built entirely into the browser.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Copy className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white/90">Instant Output</h3>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-sans relative z-10">
                  DOM-to-Image rendering allows instant transparent PNG or WebP exports directly into your clipboard without hitting a backend. Ship your code instantly.
                </p>
              </div>
            </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/[0.05] mt-32 py-12 relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
                <Terminal className="w-4 h-4 text-white" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">ByteMe Software © 2026</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-white/40">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
        </div>
      </footer>
    </div>
  );
}