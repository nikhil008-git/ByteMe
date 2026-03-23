"use client"
import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
import { Sparkles, Loader2 } from "lucide-react";
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
    const handleEditorWillMount = (monaco: any) => {
        monaco.editor.defineTheme("pure-black", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#00000000",
                "editorGutter.background": "#00000000",
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
    };
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
            className="w-full h-full flex flex-col rounded-xl bg-transparent overflow-hidden relative"
        >
            <div className="w-full h-full flex flex-col rounded-xl bg-transparent overflow-hidden relative">
                {/* Editor Header / Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 py-3 bg-white/[0.03] backdrop-blur-md border-b border-white/5 w-full">
                    {/* Left side: Title input */}
                    <div className="flex items-center w-full sm:w-auto relative group">
                        <div className="absolute -inset-1 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity pointer-events-none"></div>
                        <input
                            type="text"
                            placeholder="untitled_snippet.tsx"
                            value={title.title}
                            onChange={(e) => setTitle({ ...title, title: e.target.value })}
                            spellCheck={false}
                            className="bg-transparent text-[11px] font-mono tracking-wide text-white/90 placeholder:text-white/20 focus:outline-none w-full sm:min-w-[200px] px-2 py-1"
                        />
                        <div className="h-4 w-px bg-white/10 ml-4 hidden sm:block"></div>
                    </div>

                    {/* Right side: AI, Language, Save */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        {/* AI Input */}
                        <div className="relative flex items-center bg-black/60 border border-white/5 rounded-lg p-1 focus-within:border-white/30 focus-within:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex-grow sm:flex-grow-0 group hover:border-white/20">
                            <Sparkles className="w-3.5 h-3.5 text-white/50 ml-2 group-focus-within:animate-pulse" />
                            <input
                                type="text"
                                placeholder="Generate with AI..."
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                className="bg-transparent text-[11px] font-sans text-white placeholder-white/20 focus:outline-none px-3 w-full sm:w-56"
                                disabled={isGenerating}
                            />
                            <button
                                type="button"
                                onClick={handleAIGenerate}
                                disabled={isGenerating}
                                className="bg-white/10 hover:bg-white/20 border border-white/5 text-white px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-md transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-lg whitespace-nowrap"
                            >
                                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : "GZ AI"}
                            </button>
                        </div>

                        {/* Language Selector */}
                        <div className="relative group">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-white/70 text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded-lg outline-none transition-all duration-300 cursor-pointer appearance-none pr-8 shadow-sm hover:shadow-md"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' opacity='0.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 10px center",
                                }}
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang.id} value={lang.id} className="bg-neutral-900 text-white">
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition-all duration-300 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Monaco Editor Container */}
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={language}
                        theme="pure-black"
                        value={code}
                        onChange={handleEditorChange}
                        beforeMount={handleEditorWillMount}
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
