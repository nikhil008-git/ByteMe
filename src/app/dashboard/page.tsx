"use client";
import SidebarPanel from "@/components/common/SidebarPanel";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState, useRef } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import * as htmlToImage from "html-to-image";
import UserSnippetpanel from "@/components/pages/dashboard/userSnippetPanel";

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


  const editorRef = useRef<HTMLDivElement>(null);
  const exportAsImage = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(editorRef.current, { pixelRatio: 2 });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "snippet.png";
      link.click();
    } catch (error) {
      console.error("Failed to export image:", error);
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
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl top-0 z-10 sticky">
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
            <button className="px-4 py-2 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-white/60 hover:text-white rounded-lg text-[10px] font-semibold tracking-widest uppercase transition-all duration-300">
              Save Code
            </button>
            <button
              onClick={exportAsImage}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-lg text-[10px] font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              Export PNG
            </button>
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