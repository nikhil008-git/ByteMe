"use client"
import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios"
interface CodeEditorProps {
    initialCode?: string;
    onCodeChange?: (code: string | undefined) => void;
    activeSnippet?: { title: string, language: string, code: string } | null;
}

const LANGUAGES = [
    { id: "typescript", name: "TypeScript" },
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
    { id: "json", name: "JSON" },
    { id: "markdown", name: "Markdown" },
    { id: "go", name: "Go" },
    { id: "rust", name: "Rust" },
    { id: "java", name: "Java" },
    { id: "csharp", name: "C#" },
    { id: "cpp", name: "C++" },
];

export default function CodeEditor({ initialCode, onCodeChange, activeSnippet }: CodeEditorProps) {
    const monaco = useMonaco();
    const [title, setTitle] = useState({ title: "" })
    const [language, setLanguage] = useState("typescript");
    const [code, setCode] = useState(initialCode || "// Write your code snippet here...\n\nfunction helloWorld() {\n  console.log('Hello, ByteMe!');\n}\n");
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");


    useEffect(() => {
        if (activeSnippet) {
            setTitle({ title: activeSnippet.title });
            setLanguage(activeSnippet.language);
            setCode(activeSnippet.code);
        }
    }, [activeSnippet]);
    useEffect(() => {
        if (!monaco) return;

        monaco.editor.defineTheme("pure-black", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#000000",
                "editorGutter.background": "#000000",
                "editorLineNumber.foreground": "#555555",
                "editorCursor.foreground": "#ffffff",
                "editor.lineHighlightBackground": "#0a0a0a",
                "editor.selectionBackground": "#1a1a1a",
                "editor.inactiveSelectionBackground": "#111111",
                "editorIndentGuide.background": "#111111",
                "editorIndentGuide.activeBackground": "#222222",
                "scrollbarSlider.background": "#222222",
                "scrollbarSlider.hoverBackground": "#333333",
                "scrollbarSlider.activeBackground": "#444444",
            },
        });
    }, [monaco]);
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || "");
        if (onCodeChange) {
            onCodeChange(value);
        }
    };
    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);
        try {
            const response = await axios.post("/api/generate", {
                prompt: aiPrompt,
                language: language
            });

            setCode(response.data.code);
            setTitle({ title: `AI Generated: ${aiPrompt.slice(0, 30)}...` });
        } catch (error) {
            console.error("Error generating code:", error);
            alert("Failed to generate code");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return

        const payload = {
            title: title.title,
            language,
            code
        }
        try {
            const response = await axios.post(
                "/api/snippetc",  // URL
                payload,          // Data
                { withCredentials: true } // Config
            );
        }
        catch (err: any) {
            console.error(err);
            alert(
                err
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col rounded-lg bg-neutral-950 overflow-hidden shadow-2xl relative"
        >
            <div className="w-full h-full flex flex-col rounded-lg  bg-neutral-950 overflow-hidden shadow-2xl relative">
                {/* Editor Header / Toolbar */}
                <div className="flex justify-between items-center px-4 py-2 bg-black border-b border-neutral-800">
                    <div className="flex gap-1.5 items-center">
                    </div>
                    <div className="border border-neutral-900 text-white">
                        <input
                            type="text"
                            placeholder="enter title.txt"
                            value={title.title}
                            onChange={(e) => {
                                setTitle({
                                    ...title,
                                    title: e.target.value
                                }
                                )

                            }}

                        />
                    </div>

                    {/* Language Selector */}
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded outline-none border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer appearance-none pr-6 font-mono"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 6px center",
                        }}
                    >
                        {LANGUAGES.map((lang) => (
                            <option key={lang.id} value={lang.id}>
                                {lang.name}
                            </option>
                        ))}
                    </select> <button
                        type="submit"
                        className="bg-black border border-neutral-800 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                        save
                    </button>

                </div>
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Ask AI to generate code..."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded outline-none border border-neutral-700 hover:border-neutral-500 transition-colors"
                    />
                    <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                        {isGenerating ? "Generating..." : "Generate"}
                    </button>
                </div>

                {/* Monaco Editor Container */}
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={language}
                        theme="pure-black"
                        value={code}
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "'JetBrains Mono', monospace",
                            padding: { top: 16, bottom: 16 },
                            scrollBeyondLastLine: false,
                            smoothScrolling: true,
                            cursorBlinking: "smooth",
                            renderLineHighlight: "all",
                            contextmenu: true,
                            scrollbar: {
                                vertical: "visible",
                                horizontal: "visible",
                                verticalScrollbarSize: 8,
                                horizontalScrollbarSize: 8,
                            },
                        }}
                    />
                </div>
            </div>
        </form>
    );
}
