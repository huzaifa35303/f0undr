import { useState, useEffect, useRef } from 'react';
import { Bold, List, Code, Copy, Download, Trash2, Check, Heading1, Heading2, CheckSquare } from 'lucide-react';

const DEFAULT_MARKDOWN = `# f0undr Sovereign Architecture Notes
*Document systems design, algorithmic proofs, or product specs.*

## Core Objectives
- [x] Zero external runtime dependency overhead
- [x] Sub-millisecond client state synchronization
- [ ] Implement WebGL shader post-processing pipeline

\`\`\`ts
interface SovereignSystem {
  id: string;
  throughput: number;
  encryption: 'SHA-256' | 'ChaCha20';
  latencyMs: number;
}
\`\`\`
`;

export const MarkdownScratchpad = () => {
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('f0undr_scratchpad') || DEFAULT_MARKDOWN;
  });
  const [copied, setCopied] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem('f0undr_scratchpad', content);
  }, [content]);

  const insertSnippet = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${before}${selected}${after}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `f0undr-notes-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Clear all notes in the scratchpad?')) {
      setContent('');
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-col relative text-[#f4f1ea]">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[rgba(244,241,234,0.08)]">
        <div className="flex items-center gap-1 bg-[#0a0a0b] p-1 rounded-xl border border-[rgba(244,241,234,0.12)]">
          <button
            onClick={() => insertSnippet('# ')}
            title="Heading 1"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('## ')}
            title="Heading 2"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('**', '**')}
            title="Bold"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('- ')}
            title="Bullet List"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('- [ ] ')}
            title="Task Checkbox"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('```ts\n', '\n```')}
            title="Code Block"
            className="p-1.5 text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-[#16161a] rounded-lg transition-colors cursor-pointer"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-xs text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/50 transition-all cursor-pointer"
            title="Export .md File"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-red-400 hover:border-red-500/50 transition-all cursor-pointer"
            title="Clear Scratchpad"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compose notes, architectural specs, or technical memos..."
          rows={12}
          className="w-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.14)] rounded-2xl p-4 font-mono text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86] focus:outline-none focus:border-cyan-400 resize-y leading-relaxed shadow-inner"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-xs font-mono text-[#8d8b86]">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-[#f4f1ea]">{wordCount}</strong></span>
          <span>Characters: <strong className="text-[#f4f1ea]">{charCount}</strong></span>
          <span>Reading: <strong className="text-[#f4f1ea]">{readingTime} min</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Auto-Saved in Sovereign Storage</span>
        </div>
      </div>
    </div>
  );
};
