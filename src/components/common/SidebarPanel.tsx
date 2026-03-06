"use client";

import React, { useState } from "react";
import { MousePointer2, Type, Square, Circle, Minus, PenTool, Image as ImageIcon } from "lucide-react";

interface SidebarPanelProps {
    bgTab: "solid" | "gradients" | "wallpapers";
    setBgTab: (tab: "solid" | "gradients" | "wallpapers") => void;
    backgroundStyle: string;
    setBackgroundStyle: (style: string) => void;
    noise: number;
    setNoise: (val: number) => void;
    borderRadius: number;
    setBorderRadius: (val: number) => void;
}

export default function SidebarPanel({
    bgTab, setBgTab,
    backgroundStyle, setBackgroundStyle,
    // noise, setNoise,
    borderRadius, setBorderRadius
}: SidebarPanelProps) {
    const [wallpaperTab, setWallpaperTab] = useState<"wallpapers" | "mac">("wallpapers");

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
                    {["solid", "gradients", "wallpapers"].map((tab) => (
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
                    <div className="grid grid-cols-5 gap-2 mt-1">
                        {["#000000", "#171717", "#262626", "#404040", "#525252", "#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7"].map((color) => (
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
                    <div className="grid grid-cols-3 gap-2 mt-1">
                        {[
                            "linear-gradient(to right, #ef4444, #f97316)",
                            "linear-gradient(to right, #3b82f6, #06b6d4)",
                            "linear-gradient(to right, #8b5cf6, #d946ef)",
                            "linear-gradient(to right, #10b981, #14b8a6)",
                            "linear-gradient(to right, #6366f1, #a855f7)",
                            "linear-gradient(to bottom right, #1e293b, #0f172a)"
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

                {/* Wallpapers */}
                {bgTab === "wallpapers" && (
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex border-b border-neutral-800 mb-2">
                            {["wallpapers", "mac"].map((wTab) => (
                                <button
                                    key={wTab}
                                    onClick={() => setWallpaperTab(wTab as any)}
                                    className={`flex-1 text-[10px] font-bold uppercase py-1.5 border-b-2 transition-colors -mb-[1px] ${wallpaperTab === wTab ? "border-neutral-400 text-neutral-300" : "border-transparent text-neutral-600 hover:text-neutral-400"
                                        }`}
                                >
                                    {wTab}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-video bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer group">
                                    <ImageIcon size={14} className="text-neutral-700 group-hover:text-neutral-400" />
                                </div>
                            ))}
                        </div>
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
            </section>

        </div>
    );
}
