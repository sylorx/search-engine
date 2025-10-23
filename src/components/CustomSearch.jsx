import { useState } from 'react';
import { Search, Copy, ExternalLink, Sparkles, Calendar, Share2 } from 'lucide-react';
import ShareModal from './ShareModal';

function CustomSearch({ template, onGenerate, generatedQuery, onCopy, onSearch, copiedId, onTemplateChange, allTemplates, searchInputRef }) {
  const [keyword, setKeyword] = useState('');
  const [year, setYear] = useState('2015');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const handleGenerate = () => {
    if (keyword.trim()) {
      onGenerate(keyword, year);
    }
  };

  const handleKeywordSelect = (selectedKeyword) => {
    setKeyword(selectedKeyword);
    setShowSuggestions(false);
    onGenerate(selectedKeyword, year);
  };

  return (
    <div className="card bg-gradient-to-br from-white to-primary-50 dark:from-slate-800 dark:to-slate-700 border-2 border-primary-200 dark:border-primary-700 animate-slideUp">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Özel Arama Oluştur</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Seçili: {template.title}</p>
          </div>
        </div>
        <button
          onClick={() => setShowTemplateSelector(!showTemplateSelector)}
          className="btn-secondary py-2 px-4 text-sm"
        >
          🔄 Şablon Değiştir
        </button>
      </div>
      
      {/* Template Selector */}
      {showTemplateSelector && allTemplates && (
        <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg max-h-64 overflow-y-auto">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Şablon Seçin:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onTemplateChange(t);
                  setShowTemplateSelector(false);
                }}
                className={`p-3 rounded-lg text-left text-sm transition-all ${
                  t.id === template.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500'
                }`}
              >
                <p className="font-semibold">{t.title}</p>
                <p className="text-xs opacity-75 mt-1">{t.category}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Keyword Input */}
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Anahtar Kelime
          </label>
          <input
            ref={searchInputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleGenerate();
              }
            }}
            placeholder="Aramak istediğiniz kelimeyi girin... (Ctrl+K)"
            className="input-field"
          />
          
          {/* Keyword Suggestions */}
          {showSuggestions && template.keywords.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-lg p-3 max-h-48 overflow-y-auto z-30">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Önerilen Kelimeler:</p>
              <div className="flex flex-wrap gap-2">
                {template.keywords.map((kw, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordSelect(kw)}
                    className="text-sm px-3 py-1 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full transition-all"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Year Input (if needed) */}
        {template.hasYearInput && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Tarih (Bu yıldan önce)
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2015"
              min="1990"
              max={new Date().getFullYear()}
              className="input-field"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!keyword.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Search className="w-5 h-5 inline mr-2" />
          Arama Sorgusu Oluştur
        </button>

        {/* Generated Query Display */}
        {generatedQuery && (
          <div className="mt-6 p-4 bg-slate-800 dark:bg-slate-900 rounded-lg animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300 dark:text-slate-200">Oluşturulan Sorgu:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onCopy(generatedQuery, 'generated')}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-all"
                >
                  <Copy className="w-4 h-4" />
                  {copiedId === 'generated' ? 'Kopyalandı!' : 'Kopyala'}
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Paylaş
                </button>
                <button
                  onClick={() => onSearch(generatedQuery)}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ara
                </button>
              </div>
            </div>
            <code className="block text-sm text-green-400 font-mono break-all">
              {generatedQuery}
            </code>
          </div>
        )}

        {/* Template Preview */}
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Şablon Önizleme:</p>
          <code className="block text-xs text-slate-700 dark:text-slate-200 font-mono break-all">
            {template.template}
          </code>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          query={generatedQuery}
          template={template.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

export default CustomSearch;
