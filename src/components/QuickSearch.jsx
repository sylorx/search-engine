import { Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

function QuickSearch({ label, query, onCopy, onSearch }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        className="w-full btn-secondary text-sm py-2 px-3 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all"
      >
        {label}
      </button>
      
      {showActions && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-effect rounded-lg p-2 flex gap-2 z-10 animate-fadeIn">
          <button
            onClick={() => onCopy(query)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs text-slate-700 transition-all"
            title="Kopyala"
          >
            <Copy className="w-3 h-3" />
            Kopyala
          </button>
          <button
            onClick={() => onSearch(query)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-primary-100 hover:bg-primary-200 rounded text-xs text-primary-700 transition-all"
            title="Google'da Ara"
          >
            <ExternalLink className="w-3 h-3" />
            Ara
          </button>
        </div>
      )}
    </div>
  );
}

export default QuickSearch;
