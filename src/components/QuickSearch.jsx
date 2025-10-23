import { Copy, ExternalLink, Gamepad2, BookOpen, Film, Music, Package, GraduationCap, FileText, Image, Sparkles } from 'lucide-react';
import { useState } from 'react';

const iconMap = {
  Gamepad2, BookOpen, Film, Music, Package, GraduationCap, FileText, Image, Sparkles
};

function QuickSearch({ label, query, icon, onCopy, onSearch }) {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[icon] || Sparkles;

  const handleCopy = () => {
    onCopy(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        onClick={() => onSearch(query)}
        className="w-full btn-secondary text-sm py-3 px-4 hover:bg-primary-50 dark:hover:bg-slate-600 hover:border-primary-300 hover:text-primary-700 dark:hover:text-primary-400 transition-all flex items-center gap-2 justify-center group-hover:scale-105"
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
      
      {showActions && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-xl p-3 flex flex-col gap-2 z-10 animate-fadeIn shadow-2xl">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-200 transition-all font-semibold"
            title="Sorguyu Kopyala"
          >
            <Copy className="w-4 h-4" />
            {copied ? '✓ Kopyalandı!' : 'Sorguyu Kopyala'}
          </button>
          <button
            onClick={() => onSearch(query)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-all font-semibold shadow-lg"
            title="Google'da Ara"
          >
            <ExternalLink className="w-4 h-4" />
            Google'da Ara
          </button>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
            <p className="text-xs text-slate-500 dark:text-slate-400 break-all">{query}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickSearch;
