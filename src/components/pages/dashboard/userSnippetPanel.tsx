import React, { useState, useEffect } from "react";
import axios from "axios"
import { Terminal, FileCode2 } from "lucide-react";

type map = {
    id: number | string,
    title: string,
    language: string,
    code: string
}

interface UserSnippetPanelProps {
    onSelectSnippet?: (snippet: map) => void;
}

export default function UserSnippetpanel({ onSelectSnippet }: UserSnippetPanelProps) {
    const [snippet, setSnippet] = useState<map[]>([])

    const handleDelete = async () => {
        try {
            // const deleteHandle = await axios.delete('/api/snippets', {
            //     withCredentials: true,
            //     data: 

            // })

        }
        catch (err) {
            console.error(err)

        }

    }

    const getitems = async () => {
        try {
            const response = await axios.get("/api/snippetc", {
                withCredentials: true,
            });
            setSnippet(response.data);
        } catch (error) {
            console.error("Error fetching snippets:", error);
        }
    };
    useEffect(() => {
        getitems();
    }, []);
    return (
        <div className="flex flex-col w-[20rem] border-r border-white/5 bg-[#050505] overflow-y-auto scrollbar-hide h-full">
            <div className="p-6 border-b border-white/5 sticky top-0 bg-[#050505]/90 backdrop-blur-xl z-10 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white/50" />
                <h2 className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em]">Your Snippets</h2>
            </div>
            <div className="flex flex-col p-4 gap-2">
                {snippet.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => onSelectSnippet && onSelectSnippet(user)}
                        className="group flex flex-col text-left px-4 py-3 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5 rounded-xl transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-3 w-full relative z-10">
                            <FileCode2 className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                            <span className="text-[11px] font-mono text-white/50 group-hover:text-white/90 truncate tracking-wide">
                                {user.title || "untitled.txt"}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}