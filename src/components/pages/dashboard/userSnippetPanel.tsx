import React, { useState, useEffect } from "react";
import axios from "axios"

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
        <div className="flex flex-col w-64 border-r border-neutral-800 bg-neutral-950 overflow-y-auto scrollbar-thin h-full">
            <div className="p-4 border-b border-neutral-800 sticky top-0 bg-neutral-950/90 backdrop-blur z-10">
                <h2 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Your Snippets</h2>
            </div>
            <div className="flex flex-col p-2 gap-1">
                {snippet.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => onSelectSnippet && onSelectSnippet(user)}

                        className="text-left px-3 py-2 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded transition-colors truncate font-mono"
                    >
                        {user.title || "untitled.txt"}
                    </button>
                ))}
            </div>
        </div>
    )
}