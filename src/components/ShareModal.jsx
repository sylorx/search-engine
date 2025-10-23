import { X, Copy, Share2, Download, Check } from 'lucide-react';
import { useState } from 'react';

function ShareModal({ query, template, onClose }) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const shareText = `${template} için Google arama sorgusu:\n${query}`;
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const content = `Gelişmiş Google Arama Sorgusu\n\nKategori: ${template}\nSorgu: ${query}\nURL: ${shareUrl}\n\nOluşturulma: ${new Date().toLocaleString('tr-TR')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-search-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gelişmiş Google Arama',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy(shareUrl);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="card max-w-lg w-full animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-primary-600" />
            Sorguyu Paylaş
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Query Display */}
          <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Kategori:</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">{template}</p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Sorgu:</p>
            <code className="block text-sm text-slate-700 dark:text-slate-200 break-all">{query}</code>
          </div>
          
          {/* URL Display */}
          <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
            <p className="text-xs font-semibold text-primary-700 dark:text-primary-300 mb-2">Google Arama URL:</p>
            <code className="block text-xs text-primary-600 dark:text-primary-400 break-all">{shareUrl}</code>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleCopy(query)}
              className="btn-secondary py-3 flex flex-col items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs">{copied ? 'Kopyalandı!' : 'Sorguyu Kopyala'}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="btn-secondary py-3 flex flex-col items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">Paylaş</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="btn-secondary py-3 flex flex-col items-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span className="text-xs">İndir</span>
            </button>
          </div>
          
          {/* Direct Search Button */}
          <button
            onClick={() => window.open(shareUrl, '_blank')}
            className="btn-primary w-full"
          >
            Google'da Ara
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
