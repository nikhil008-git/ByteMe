"use client";
import SidebarPanel from "@/components/common/SidebarPanel";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState, useRef } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import * as htmlToImage from "html-to-image";


export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [bgTab, setBgTab] = useState<"solid" | "gradients" | "wallpapers">("solid");
  const [backgroundStyle, setBackgroundStyle] = useState<string>("#171717");
  const [noise, setNoise] = useState(0);
  const [borderRadius, setBorderRadius] = useState(16);


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
    <div className="flex h-screen w-full bg-neutral-950 overflow-hidden font-mono">
      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col relative w-full h-full">
        <header className="flex justify-between items-center p-4 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur top-0 z-10">
          <div className="flex gap-2">
            <h1 className="text-white text-sm font-semibold tracking-wider uppercase opacity-80">
              {user.name || "User"}'s Workspace
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-neutral-500 text-xs mr-2">{user.email}</span>
            <button className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs transition-colors">
              Save Code
            </button>
            <button
              onClick={exportAsImage}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
            >
              Download Image
            </button>
            <button
              onClick={() => signOut()}
              className="px-4 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded text-xs transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 bg-neutral-950 flex items-center justify-center overflow-auto pattern-dots pattern-neutral-900 pattern-size-4 opacity-100">

          <div
            ref={editorRef} //here like we targetted the container. we wanna donwload

            className="w-full h-full max-w-5xl rounded-lg shadow-2xl transition-all duration-300 relative group flex items-center justify-center p-12 overflow-hidden "
            style={{
              background: backgroundStyle,
            }}
          >
            {/* Noise overlay */}
            {noise > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(/noise.png)`,
                  opacity: noise / 100,
                  mixBlendMode: "overlay" // Looks better for noise
                }}
              />
            )}

            <div
              className="w-full h-full relative z-10 overflow-hidden shadow-2xl border border-neutral-800/50"
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <CodeEditor />
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
      />
    </div>
  );
}