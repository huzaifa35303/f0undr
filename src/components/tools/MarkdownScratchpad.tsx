import { useState, useEffect } from 'react';
import { Copy, Download, Trash2, Check, Heading1, Heading2, Bold, List, CheckSquare, Code } from 'lucide-react';

const DEFAULT_NOTE = `# Founder Scratchpad
## Priority Directives
- [ ] Review Unit 3: Algorithmic Logic in f0undr Book
- [ ] Refine distributed concurrency contracts
- [ ] Calibrate team equity & milestones

### Core Philosophy
> "Extreme leverage compounds when software systems eliminate proportional human labor."

\`\`\`ts
const compoundGrowth = (effort: number, consistency: number) => {
  return Math.pow(effort * consistency, 365);
};
\`\`\`
`;

export const MarkdownScratchpad: React.FC = () => {
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('f0undr_scratchpad') || DEFAULT_NOTE;
  });
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('f0undr_scratchpad', content);
  }, [content]);

  const insertSnippet = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('scratchpad-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 4));
    }, 10);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `f0undr-scratchpad-${new Date().toISOString().slice(0, 10)}.md`;
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
    <div className="flex flex-col relative">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e7e5e4]">
        <div className="flex items-center gap-1 bg-[#f5f2eb] p-1 rounded-xl border border-[#e7e5e4]">
          <button
            onClick={() => insertSnippet('# ')}
            title="Heading 1"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('## ')}
            title="Heading 2"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('**', '**')}
            title="Bold"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('- ')}
            title="Bullet List"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('- [ ] ')}
            title="Task Checkbox"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSnippet('```ts\n', '\n```')}
            title="Code Block"
            className="p-1.5 text-[#57534e] hover:text-[#1c1917] hover:bg-white rounded-lg transition-colors"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg btn-editorial-outline text-[#1c1917] transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2b5346]" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg btn-editorial-primary transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export .md
          </button>

          <button
            onClick={handleClear}
            title="Clear all"
            className="p-1.5 text-[#a8a29e] hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Textarea with clean linen paper aesthetic */}
      <div className="relative">
        <textarea
          id="scratchpad-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Jot down venture architecture, raw thoughts, meeting takeaways, or code snippets..."
          rows={12}
          className="w-full bg-[#fcfbf9] border border-[#e7e5e4] rounded-xl p-4 font-mono text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] resize-y leading-relaxed shadow-inner"
        />
      </div>

      {/* Footer Word & Time Metrics */}
      <div className="flex items-center justify-between text-xs text-[#78716c] mt-3 pt-3 border-t border-[#e7e5e4]">
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span>~{readingTime} min read</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#2b5346] font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#2b5346] animate-pulse" />
          <span>Autosaved in local vault</span>
        </div>
      </div>
    </div>
  );
};
