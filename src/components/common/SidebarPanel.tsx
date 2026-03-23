"use client";

import React from "react";
import { MousePointer2, Type, Square, Circle, Minus, PenTool, Image as ImageIcon } from "lucide-react";

interface SidebarPanelProps {
    bgTab: "mesh" | "gradients" | "solid";
    setBgTab: (tab: "mesh" | "gradients" | "solid") => void;
    backgroundStyle: string;
    setBackgroundStyle: (style: string) => void;
    noise: number;
    setNoise: (val: number) => void;
    borderRadius: number;
    setBorderRadius: (val: number) => void;
    padding: number;
    setPadding: (val: number) => void;
    shadow: number;
    setShadow: (val: number) => void;
    glass: number;
    setGlass: (val: number) => void;
}

export default function SidebarPanel({
    bgTab, setBgTab,
    backgroundStyle, setBackgroundStyle,
    noise, setNoise,
    borderRadius, setBorderRadius,
    padding, setPadding,
    shadow, setShadow,
    glass, setGlass
}: SidebarPanelProps) {

    return (
        <div className="w-[20rem] min-w-[20rem] border-l border-white/5 h-full p-6 flex flex-col gap-6 text-sm font-sans text-neutral-400 bg-[#050505] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-all">

            {/* Annotation Tools */}
            <section className="flex flex-col p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">Annotation Tools</h3>
            </section>

            {/* Background */}
            <section className="flex flex-col p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Background Identity</h3>

                <div className="flex bg-black/40 rounded-lg border border-white/5 p-1 mb-4 relative z-10 shadow-inner scroll-y-overflow">
                    {(["mesh", "gradients", "solid"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setBgTab(tab)}
                            className={`flex-1 text-[10px] font-medium tracking-wide uppercase py-2 rounded-md transition-all duration-300 ${bgTab === tab ? "bg-white/10 text-white shadow-sm scale-[0.98]" : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
                                } truncate px-2`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>


                {/* Mesh Gradients */}
                {bgTab === "mesh" && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        {[
                            "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%) #000000",
                            "radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0, transparent 50%) #fdf4ff",
                            "radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0, transparent 50%), radial-gradient(at 0% 50%, hsla(28,100%,74%,1) 0, transparent 50%) #1e1b4b",
                            "radial-gradient(at 80% 100%, hsla(240,100%,70%,1) 0, transparent 50%), radial-gradient(at 0% 0%, hsla(340,100%,70%,1) 0, transparent 50%) #0f172a",
                            "radial-gradient(at 0% 100%, hsla(140,100%,70%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(200,100%,70%,1) 0, transparent 50%) #1e293b",
                            "radial-gradient(at 50% 50%, hsla(300,100%,70%,1) 0, transparent 50%), radial-gradient(at 0% 0%, hsla(40,100%,70%,1) 0, transparent 50%) #312e81"
                        ].map((mesh, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBackgroundStyle(mesh)}
                                className={`w-full aspect-video rounded-xl border transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer ${backgroundStyle === mesh ? "border-white/50 ring-2 ring-white/20" : "border-white/5 hover:border-white/20"}`}
                                style={{ background: mesh }}
                            />
                        ))}
                    </div>
                )}

                {/* Solid Colors */}
                {bgTab === "solid" && (
                    <div className="grid grid-cols-5 gap-2 mt-2 relative z-10">
                        {[
                            "#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb",
                            "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
                            "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
                            "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
                            "#ec4899", "#f43f5e", "#94a3b8", "#fbbf24", "#fb923c"
                        ].map((color) => (
                            <button
                                key={color}
                                onClick={() => setBackgroundStyle(color)}
                                className={`w-full aspect-square rounded-full border transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 cursor-pointer ${backgroundStyle === color ? "border-white/50 ring-2 ring-white/20" : "border-white/10 hover:border-white/30"}`}
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                )}

                {/* Gradients */}
                {bgTab === "gradients" && (
                    <div className="grid grid-cols-3 gap-3 mt-2 relative z-10">
                        {[
                            "linear-gradient(to right, #ef4444, #f97316)",
                            "linear-gradient(to right, #3b82f6, #06b6d4)",
                            "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
                            "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
                            "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
                            "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
                            "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                            "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
                        ].map((gradient, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBackgroundStyle(gradient)}
                                className={`w-full aspect-square rounded-xl border transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${backgroundStyle === gradient ? "border-white/50 ring-2 ring-white/20" : "border-white/5 hover:border-white/20"}`}
                                style={{ background: gradient }}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Background Effects */}
            <section className="flex flex-col p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Aesthetic Parameters</h3>

                <div className="flex flex-col gap-6 relative z-10">

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-medium tracking-wide">
                            <span className="text-white/60">Glass Intensity</span>
                            <div className="bg-black/60 border border-white/10 px-2 py-0.5 rounded text-white/80 tabular-nums">
                                {glass}%
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={glass}
                            onChange={(e) => setGlass(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 outline-none transition-all"
                            style={{ accentColor: '#a855f7' }}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-medium tracking-wide">
                            <span className="text-white/60">Grain Texture</span>
                            <div className="bg-black/60 border border-white/10 px-2 py-0.5 rounded text-white/80 tabular-nums">
                                {noise}%
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={noise}
                            onChange={(e) => setNoise(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 outline-none transition-all"
                            style={{ accentColor: '#ffffff' }}
                        />
                    </div>



                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-medium tracking-wide">
                            <span className="text-white/60">Drop Shadow</span>
                            <div className="bg-black/60 border border-white/10 px-2 py-0.5 rounded text-white/80 tabular-nums">
                                {shadow}px
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={shadow}
                            onChange={(e) => setShadow(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 outline-none transition-all"
                            style={{ accentColor: '#ffffff' }}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-medium tracking-wide">
                            <span className="text-white/60">Border Radius</span>
                            <div className="bg-black/60 border border-white/10 px-2 py-0.5 rounded text-white/80 tabular-nums">
                                {borderRadius}px
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0" max="64"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 outline-none transition-all"
                            style={{ accentColor: '#ffffff' }}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-medium tracking-wide">
                            <span className="text-white/60">Canvas Padding</span>
                            <div className="bg-black/60 border border-white/10 px-2 py-0.5 rounded text-white/80 tabular-nums">
                                {padding}px
                            </div>
                        </div>
                        <input
                            type="range"
                            min="16" max="128" step="8"
                            value={padding}
                            onChange={(e) => setPadding(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 outline-none transition-all"
                            style={{ accentColor: '#ffffff' }}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}
