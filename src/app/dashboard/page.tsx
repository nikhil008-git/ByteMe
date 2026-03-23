"use client";
import SidebarPanel from "@/components/common/SidebarPanel";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState, useRef } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import * as htmlToImage from "html-to-image";
import UserSnippetpanel from "@/components/pages/dashboard/userSnippetPanel";
import { ChevronDown, Download, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [bgTab, setBgTab] = useState<"solid" | "gradients" | "mesh">("mesh");
  const [backgroundStyle, setBackgroundStyle] = useState<string>("#171717");
  const [noise, setNoise] = useState(0);
  const [borderRadius, setBorderRadius] = useState(16);
  const [padding, setPadding] = useState(48);
  const [shadow, setShadow] = useState(24);
  const [glass, setGlass] = useState(40);
  const [activeSnippet, setActiveSnippet] = useState<{ title: string, language: string, code: string } | null>(null);

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [exportQuality, setExportQuality] = useState<"high" | "medium" | "low">("medium");
  const [exportScale, setExportScale] = useState<number>(2);
  const [isExporting, setIsExporting] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const editorRef = useRef<HTMLDivElement>(null);
  const exportAsImage = async () => {
    if (!editorRef.current) return;
    setIsExporting(true);

    try {
      const qualityMap = { high: 1.0, medium: 0.85, low: 0.6 };
      const quality = qualityMap[exportQuality];

      let dataUrl = "";

      if (exportFormat === "png") {
        dataUrl = await htmlToImage.toPng(editorRef.current, { pixelRatio: exportScale, quality });
      } else if (exportFormat === "jpeg") {
        dataUrl = await htmlToImage.toJpeg(editorRef.current, { pixelRatio: exportScale, quality });
      } else if (exportFormat === "webp") {
        const canvas = await htmlToImage.toCanvas(editorRef.current, { pixelRatio: exportScale });
        dataUrl = canvas.toDataURL("image/webp", quality);
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `snippet-${Date.now()}.${exportFormat}`;
      link.click();
      setIsExportMenuOpen(false);
    } catch (error) {
      console.error("Failed to export image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden font-sans">
      <UserSnippetpanel onSelectSnippet={(snippet) => setActiveSnippet(snippet)} />
      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col relative w-full h-full">
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl top-0 z-50 sticky">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neutral-500 to-neutral-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="text-[10px] font-bold text-white tracking-widest leading-none">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <h1 className="text-[9px] text-white/40 font-semibold tracking-[0.2em] uppercase">
              {user.name || "User"}'s Workspace
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-white/20 text-[10px] font-mono mr-2 hidden sm:block">{user.email}</span>

            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-lg text-[10px] font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300"
              >
                <span>Export</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExportMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isExportMenuOpen && (
                <div className="absolute top-12 right-0 w-64 p-4 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* Format selection */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">Format</span>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
                      {(["png", "jpeg", "webp"] as const).map(fmt => (
                        <button key={fmt} onClick={() => { setExportFormat(fmt); if (fmt === 'png') setExportQuality('high'); }} className={`py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${exportFormat === fmt ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}>
                          {fmt}
                        </button>
                      ))}
                    </div>
                    {exportFormat === "webp" && <span className="text-[9px] text-white/30 italic">Smaller files, great for sharing</span>}
                  </div>

                  {/* Quality selection */}
                  <div className="flex flex-col gap-2 relative z-10">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold cursor-default">
                      Quality <span className="text-white/30 normal-case tracking-normal ml-1">({exportFormat === 'png' ? 'Lossless' : exportQuality})</span>
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
                      {(["high", "medium", "low"] as const).map(q => (
                        <button disabled={exportFormat === 'png'} key={q} onClick={() => setExportQuality(q)} className={`py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${exportQuality === q && exportFormat !== 'png' ? "bg-white/10 text-white shadow-sm" : "text-white/40"} ${exportFormat === 'png' ? 'opacity-30 cursor-not-allowed' : 'hover:text-white/70'}`}>
                          {q}
                        </button>
                      ))}
                    </div>
                    {(exportQuality === "medium" && exportFormat !== "png") && <span className="text-[9px] text-white/30 italic">85% quality, sharp & shareable</span>}
                  </div>

                  {/* Scale selection */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">Scale</span>
                    <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
                      {[
                        { label: "1x", val: 1 },
                        { label: "2x", val: 2 },
                        { label: "3x", val: 3 },
                        { label: "4K", val: 4 }
                      ].map(s => (
                        <button key={s.label} onClick={() => setExportScale(s.val)} className={`py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${exportScale === s.val ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/5 my-1"></div>

                  <button
                    onClick={exportAsImage}
                    disabled={isExporting}
                    className="w-full py-2.5 bg-white text-black hover:bg-neutral-200 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-70"
                  >
                    {isExporting ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Exporting...</>
                    ) : (
                      <><Download className="w-3.5 h-3.5" /> Download {exportFormat.toUpperCase()}</>
                    )}
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 text-red-500/60 hover:text-red-400 rounded-lg text-[10px] font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 bg-[#000000] flex items-center justify-center overflow-auto relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:32px_32px]"></div>

          <div
            ref={editorRef} //here like we targetted the container. we wanna donwload

            className="w-full h-full max-w-5xl rounded-lg shadow-2xl transition-all duration-300 relative group flex items-center justify-center overflow-hidden "
            style={{
              background: backgroundStyle,
              padding: `${padding}px`,
            }}
          >
            {/* Noise overlay */}
            {noise > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(/noise.png)`,
                  opacity: noise / 100,
                  mixBlendMode: "overlay" // Looks better for noise .... kets see
                }}
              />
            )}

            <div
              className={`w-full h-full relative z-10 overflow-hidden shadow-2xl transition-all duration-300 border border-white/5`}
              style={{
                borderRadius: `${borderRadius}px`,
                backgroundColor: `rgba(0,0,0, ${glass / 100})`,
                backdropFilter: `blur(${glass > 0 ? glass / 2 : 0}px)`,
                boxShadow: shadow > 0
                  ? `0px ${shadow}px ${shadow * 2.5}px -${shadow / 4}px rgba(0,0,0,0.6)`
                  : 'none'
              }}
            >
              <CodeEditor activeSnippet={activeSnippet} />
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar Panel */}
      <SidebarPanel
        bgTab={bgTab}
        setBgTab={setBgTab}
        backgroundStyle={backgroundStyle}
        setBackgroundStyle={setBackgroundStyle}
        noise={noise}
        setNoise={setNoise}
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
        padding={padding}
        setPadding={setPadding}
        shadow={shadow}
        setShadow={setShadow}
        glass={glass}
        setGlass={setGlass}
      />
    </div>
  );
}