import { useState, useEffect } from "react";

export default function AnimatedCodeEditor() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  const codeSnippets = [
    {
      lines: [
        "import { useState } from 'react';",
        "",
        "function App() {",
        "  const [data, setData] = useState([]);",
        "  ",
        "  return (",
        "    <div className='app'>",
        "      <h1>Modern Web App</h1>",
        "    </div>",
        "  );",
        "}",
      ],
      language: "tsx",
    },
    {
      lines: [
        "const api = async () => {",
        "  const response = await fetch('/api');",
        "  const data = await response.json();",
        "  return data;",
        "};",
        "",
        "// Process results",
        "const results = await api();",
        "console.log('Success!');",
      ],
      language: "js",
    },
    {
      lines: [
        ".container {",
        "  display: flex;",
        "  background: linear-gradient(",
        "    to right,",
        "    #3b82f6,",
        "    #7c3aed",
        "  );",
        "  border-radius: 1rem;",
        "}",
      ],
      language: "css",
    },
  ];

  // Switch snippet every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
      setDisplayedCode("");
      setCurrentLine(0);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Animate line-by-line
  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    if (currentLine < snippet.lines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + snippet.lines[currentLine] + "\n");
        setCurrentLine((prev) => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentSnippet]);

  const snippet = codeSnippets[currentSnippet];

  const highlightCode = (code) => {
    const keywords = [
      "import",
      "from",
      "function",
      "const",
      "return",
      "await",
      "async",
      "export",
      "default",
    ];
    const strings = /(['"`])(.*?)\1/g;
    const comments = /(\/\/.*$)/gm;

    let highlighted = code;

    highlighted = highlighted.replace(
      comments,
      '<span class="text-gray-400">$1</span>'
    );

    highlighted = highlighted.replace(
      strings,
      '<span class="text-emerald-400">$1$2$1</span>'
    );

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span class="text-violet-400">${keyword}</span>`
      );
    });

    highlighted = highlighted.replace(
      /<(\/?[\w]+)/g,
      '<span class="text-blue-400"><$1</span>'
    );

    highlighted = highlighted.replace(
      /\.([\w]+)/g,
      '.<span class="text-cyan-300">$1</span>'
    );

    return highlighted;
  };

  return (
    <div className="
      relative code-editor-frame rounded-3xl overflow-hidden 
      shadow-[0_0_40px_rgba(255,255,255,0.15)]
      border border-white/100
      backdrop-blur-xl 
      bg-gradient-to-br from-slate-900/95 to-blue-950/95
    ">

      {/* HEADER */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        <div className="ml-4 text-sm text-blue-300">App.{snippet.language}</div>
      </div>

      {/* CONTENT */}
      <div className="code-editor-content p-6 relative">

        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Code */}
        <div className="relative font-mono text-sm leading-relaxed z-10">
          {displayedCode.split("\n").map((line, index) => (
            <div
              key={index}
              className="flex group hover:bg-blue-500/5 transition-colors"
            >
              <div className="w-10 text-right pr-4 text-slate-500 select-none">
                {index + 1}
              </div>

              <div
                className="text-blue-100 flex-1"
                dangerouslySetInnerHTML={{
                  __html:
                    line !== ""
                      ? highlightCode(
                          line.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                        )
                      : "&nbsp;",
                }}
              />
            </div>
          ))}

          {/* Cursor */}
          {currentLine < snippet.lines.length && (
            <div className="flex">
              <div className="w-10" />
              <div className="w-2 h-5 bg-blue-400 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
