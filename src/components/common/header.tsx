"use client";
import { useRouter } from "next/navigation";
import { Github, MessageSquare, Terminal } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const router = useRouter();
    return (
        <header className="fixed top-0 w-full border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                    <Terminal className="w-5 h-5 text-white" />
                    <span className="text-[13px] font-bold tracking-widest uppercase text-white">ByteMe</span>
                    <span className="text-[10px] text-white/40 ml-2 font-mono hidden sm:inline-block">beta</span>
                </div>
                
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors">Docs</Link>
                        <Link href="#" className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors">
                            <Github className="w-3.5 h-3.5" /> 5.3k
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" /> Discord
                        </Link>
                    </nav>
                    
                    <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                        <button onClick={() => router.push("/sign-in")} className="text-[11px] font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">Log In</button>
                        <button onClick={() => router.push("/sign-up")} className="bg-white text-black px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors">Sign Up</button>
                    </div>
                </div>
            </div>
        </header>
    );
}