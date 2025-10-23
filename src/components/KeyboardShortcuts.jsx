import { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';

function KeyboardShortcuts({ onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const shortcuts = [
    { key: 'Ctrl + K', description: 'Arama kutusuna odaklan' },
    { key: 'Ctrl + /', description: 'Kısayolları göster' },
    { key: 'Ctrl + D', description: 'Karanlık modu aç/kapat' },
    { key: 'Ctrl + H', description: 'Geçmişi göster/gizle' },
    { key: 'Ctrl + F', description: 'Favorileri göster/gizle' },
    { key: 'Ctrl + Enter', description: 'Sorgu oluştur' },
    { key: 'Ctrl + C', description: 'Sorguyu kopyala' },
    { key: 'Ctrl + S', description: 'Ayarları kaydet' },
    { key: 'Esc', description: 'Modalları kapat' },
    { key: '1-9', description: 'Hızlı arama seç' },
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="card max-w-2xl w-full animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-primary-600" />
            Klavye Kısayolları
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              <span className="text-sm text-slate-700 dark:text-slate-200">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-xs font-mono text-slate-700 dark:text-slate-200 shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            💡 <strong>İpucu:</strong> Kısayolları kullanarak daha hızlı arama yapabilirsiniz!
          </p>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;
