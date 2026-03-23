"use client";

import React, { useState } from "react";
import { MousePointer2, Type, Square, Circle, Minus, PenTool, Image as ImageIcon } from "lucide-react";

interface SidebarPanelProps {
    bgTab: "solid" | "gradients";
    setBgTab: (tab: "solid" | "gradients") => void;
    backgroundStyle: string;
    setBackgroundStyle: (style: string) => void;
    noise: number;
    setNoise: (val: number) => void;
    borderRadius: number;
    setBorderRadius: (val: number) => void;
    padding: number;
    setPadding: (val: number) => void;
}

export default function SidebarPanel({
    bgTab, setBgTab,
    backgroundStyle, setBackgroundStyle,
    // noise, setNoise,
    borderRadius, setBorderRadius,
    padding, setPadding
}: SidebarPanelProps) {

    return (
        <div className="w-64 border-l-2 border-dashed border-neutral-800 h-full p-4 flex flex-col gap-6 text-sm font-mono text-neutral-400 bg-neutral-950">

            {/* Annotation Tools */}
            <section className="flex flex-col gap-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Annotation Tools</h3>

            </section>

            {/* Background */}
            <section className="flex flex-col gap-2 border-t border-dashed border-neutral-800 pt-5 mt-1">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Background</h3>

                <div className="flex bg-neutral-900 rounded border border-neutral-800 p-0.5 mb-2">
                    {["solid", "gradients"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setBgTab(tab as any)}
                            className={`flex-1 text-[10px] font-semibold uppercase py-1.5 rounded transition-colors ${bgTab === tab ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Solid Colors */}
                {bgTab === "solid" && (
                    <div className="grid grid-cols-5 gap-2 mt-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                        {[
                            "#000000", "#171717", "#262626", "#404040", "#525252", 
                            "#020617", "#0f172a", "#1e293b", "#334155", "#475569",
                            "#450a0a", "#7f1d1d", "#991b1b", "#b91c1c", "#dc2626",
                            "#4a044e", "#701a75", "#86198f", "#a21caf", "#c026d3",
                            "#042f2e", "#134e4a", "#115e59", "#0f766e", "#0d9488",
                            "#172554", "#1e3a8a", "#1e40af", "#1d4ed8", "#2563eb",
                            "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", 
                            "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", 
                            "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", 
                            "#ec4899", "#f43f5e", "#94a3b8", "#fbbf24", "#fb923c"
                        ].map((color) => (
                            <button
                                key={color}
                                onClick={() => setBackgroundStyle(color)}
                                className={`w-full aspect-square rounded border transition-colors shadow-sm ${backgroundStyle === color ? "border-neutral-300 ring-1 ring-neutral-300" : "border-neutral-800 hover:border-neutral-500"}`}
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                )}

                {/* Gradients */}
                {bgTab === "gradients" && (
                    <div className="grid grid-cols-3 gap-2 mt-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                        {[
                            "linear-gradient(to right, #ef4444, #f97316)",
                            "linear-gradient(to right, #3b82f6, #06b6d4)",
                            "linear-gradient(to right, #8b5cf6, #d946ef)",
                            "linear-gradient(to right, #10b981, #14b8a6)",
                            "linear-gradient(to right, #6366f1, #a855f7)",
                            "linear-gradient(to right, #f43f5e, #8b5cf6)",
                            "linear-gradient(to right, #fbbf24, #f97316)",
                            "linear-gradient(to right, #2dd4bf, #0ea5e9)",
                            "linear-gradient(to right, #a855f7, #ec4899)",
                            "linear-gradient(to bottom right, #1e293b, #0f172a)",
                            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
                            "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
                            "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
                            "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
                            "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
                            "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
                            "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                            "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
                        ].map((gradient, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBackgroundStyle(gradient)}
                                className={`w-full aspect-square rounded border transition-colors shadow-sm ${backgroundStyle === gradient ? "border-neutral-300 ring-1 ring-neutral-300" : "border-neutral-800 hover:border-neutral-500"}`}
                                style={{ background: gradient }}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Background Effects */}
            <section className="flex flex-col gap-5 border-t border-dashed border-neutral-800 pt-5 mt-1">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Background Effects</h3>

                {/* <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-neutral-400">NOISE</span>
                        <div className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                            {noise}%
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={noise}
                        onChange={(e) => setNoise(Number(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:bg-neutral-700 outline-none"
                        style={{ accentColor: '#a3a3a3' }}
                    />
                </div> */}

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-neutral-400">BORDER RADIUS</span>
                        <div className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                            {borderRadius}px
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(Number(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:bg-neutral-700 outline-none"
                        style={{ accentColor: '#a3a3a3' }}
                    />
                </div>
                
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-neutral-400">CANVAS PADDING</span>
                        <div className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                            {padding}px
                        </div>
                    </div>
                    <input
                        type="range"
                        min="16" max="128" step="8"
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer hover:bg-neutral-700 outline-none"
                        style={{ accentColor: '#a3a3a3' }}
                    />
                </div>
            </section>

        </div>
    );
}
