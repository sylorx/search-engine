import { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Moon, Sun, History, Star, Filter, X, TrendingUp, Info, Keyboard, Download, Upload } from 'lucide-react';
import SearchCard from './components/SearchCard';
import QuickSearch from './components/QuickSearch';
import CustomSearch from './components/CustomSearch';
import StatsPanel from './components/StatsPanel';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import AnimatedBackground from './components/AnimatedBackground';
import { searchTemplates, quickSearches } from './data/searchTemplates';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [showInfo, setShowInfo] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [quickSearchFilter, setQuickSearchFilter] = useState('all');
  const [showAllQuickSearches, setShowAllQuickSearches] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const searchInputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    setDarkMode(savedDarkMode);
    setSearchHistory(savedHistory);
    setFavorites(savedFavorites);
    
    if (savedDarkMode) {
      document.body.classList.add('dark');
    }
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      // Ctrl + K: Focus search
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Ctrl + /: Show shortcuts
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
      // Ctrl + D: Toggle dark mode
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
      }
      // Ctrl + H: Toggle history
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        setShowHistory(!showHistory);
      }
      // Ctrl + F: Toggle favorites
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setShowFavorites(!showFavorites);
      }
    };
    
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [showHistory, showFavorites]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark');
  };

  // Add to search history
  const addToHistory = (query, template) => {
    const historyItem = {
      query,
      template: template.title,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    const newHistory = [historyItem, ...searchHistory].slice(0, 20);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Toggle favorite
  const toggleFavorite = (template) => {
    const isFavorite = favorites.some(fav => fav.id === template.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== template.id);
    } else {
      newFavorites = [...favorites, template];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Clear history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };
  
  // Export settings
  const exportSettings = () => {
    const data = {
      favorites,
      searchHistory,
      darkMode,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-search-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Import settings
  const importSettings = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.favorites) {
          setFavorites(data.favorites);
          localStorage.setItem('favorites', JSON.stringify(data.favorites));
        }
        if (data.searchHistory) {
          setSearchHistory(data.searchHistory);
          localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory));
        }
        if (data.darkMode !== undefined) {
          setDarkMode(data.darkMode);
          localStorage.setItem('darkMode', data.darkMode);
          if (data.darkMode) {
            document.body.classList.add('dark');
          } else {
            document.body.classList.remove('dark');
          }
        }
        alert('✅ Ayarlar başarıyla yüklendi!');
      } catch (error) {
        alert('❌ Ayarlar yüklenirken hata oluştu!');
      }
    };
    reader.readAsText(file);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setGeneratedQuery('');
  };

  const generateQuery = (keyword, year = '2015') => {
    if (!selectedTemplate) return;
    
    let query = selectedTemplate.template.replace('{keyword}', keyword);
    if (selectedTemplate.hasYearInput) {
      query = query.replace('{year}', year);
    }
    
    setGeneratedQuery(query);
    addToHistory(query, selectedTemplate);
  };

  const copyToClipboard = (text, id = null) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const openGoogleSearch = (query) => {
    const encodedQuery = encodeURIComponent(query);
    window.open(`https://www.google.com/search?q=${encodedQuery}`, '_blank');
  };

  // Filter templates
  const filteredTemplates = categoryFilter === 'all' 
    ? searchTemplates 
    : categoryFilter === 'favorites'
    ? searchTemplates.filter(t => favorites.some(f => f.id === t.id))
    : searchTemplates.filter(t => t.category === categoryFilter);

  const categories = ['all', 'favorites', ...new Set(searchTemplates.map(t => t.category))];
  
  // Filter quick searches
  const quickSearchCategories = ['all', ...new Set(quickSearches.map(q => q.category))];
  const filteredQuickSearches = quickSearchFilter === 'all' 
    ? quickSearches 
    : quickSearches.filter(q => q.category === quickSearchFilter);
  const displayedQuickSearches = showAllQuickSearches ? filteredQuickSearches : filteredQuickSearches.slice(0, 6);

  return (
    <div className="min-h-screen py-8 px-4 transition-colors duration-500 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slideUp">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-primary-600 mr-3 animate-bounce-slow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Gelişmiş Google Arama
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Google'ın gücünü kullanarak istediğiniz dosyaları, belgeleri ve arşivleri kolayca bulun
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={toggleDarkMode}
              className="btn-secondary py-2 px-4 flex items-center gap-2"
              title={darkMode ? 'Açık Mod (Ctrl+D)' : 'Karanlık Mod (Ctrl+D)'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="hidden sm:inline">{darkMode ? 'Açık' : 'Karanlık'}</span>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="btn-secondary py-2 px-4 flex items-center gap-2 relative"
              title="Arama Geçmişi (Ctrl+H)"
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">Geçmiş</span>
              {searchHistory.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {searchHistory.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="btn-secondary py-2 px-4 flex items-center gap-2 relative"
              title="Favoriler (Ctrl+F)"
            >
              <Star className="w-5 h-5" />
              <span className="hidden sm:inline">Favoriler</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="btn-secondary py-2 px-4 flex items-center gap-2"
              title="Klavye Kısayolları (Ctrl+/)"
            >
              <Keyboard className="w-5 h-5" />
              <span className="hidden sm:inline">Kısayollar</span>
            </button>
            <button
              onClick={exportSettings}
              className="btn-secondary py-2 px-4 flex items-center gap-2"
              title="Ayarları Dışa Aktar"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Dışa Aktar</span>
            </button>
            <label className="btn-secondary py-2 px-4 flex items-center gap-2 cursor-pointer" title="Ayarları İçe Aktar">
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">İçe Aktar</span>
              <input type="file" accept=".json" onChange={importSettings} className="hidden" />
            </label>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && searchHistory.length > 0 && (
          <div className="card mb-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <History className="w-6 h-6 text-primary-600" />
                Arama Geçmişi
              </h3>
              <div className="flex gap-2">
                <button onClick={clearHistory} className="text-red-600 hover:text-red-700 text-sm font-semibold">
                  Temizle
                </button>
                <button onClick={() => setShowHistory(false)} className="text-slate-600 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {searchHistory.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.template}</p>
                      <code className="text-xs text-slate-600 dark:text-slate-300 block mt-1 break-all">{item.query}</code>
                    </div>
                    <button
                      onClick={() => openGoogleSearch(item.query)}
                      className="ml-2 text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Ara
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(item.timestamp).toLocaleString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Banner */}
        {showInfo && (
          <div className="card mb-8 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Nasıl Kullanılır?</h3>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• Aşağıdaki kategorilerden birini seçin</li>
                    <li>• Aramak istediğiniz kelimeyi girin</li>
                    <li>• Oluşturulan sorguyu kopyalayın veya direkt Google'da arayın</li>
                    <li>• Hızlı aramalar için hazır şablonları kullanabilirsiniz</li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-primary-600 hover:text-primary-800 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Quick Search Builder - Always Visible */}
        <div className="mb-12">
          <CustomSearch
            template={selectedTemplate || searchTemplates[0]}
            onGenerate={generateQuery}
            generatedQuery={generatedQuery}
            onCopy={copyToClipboard}
            onSearch={openGoogleSearch}
            copiedId={copiedId}
            onTemplateChange={setSelectedTemplate}
            allTemplates={searchTemplates}
            searchInputRef={searchInputRef}
          />
        </div>

        {/* Stats Panel */}
        {(searchHistory.length > 0 || favorites.length > 0) && (
          <StatsPanel 
            searchHistory={searchHistory}
            favorites={favorites}
            onSearch={openGoogleSearch}
          />
        )}

        {/* Quick Searches */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Search className="w-6 h-6 text-primary-600" />
              Hızlı Aramalar
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({filteredQuickSearches.length} arama)</span>
            </h2>
            <button
              onClick={() => setShowAllQuickSearches(!showAllQuickSearches)}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold"
            >
              {showAllQuickSearches ? 'Daha Az Göster' : `Tümünü Göster (${filteredQuickSearches.length})`}
            </button>
          </div>
          
          {/* Quick Search Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSearchCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setQuickSearchFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                  quickSearchFilter === cat
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {cat === 'all' ? '🌐 Tümü' : cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {displayedQuickSearches.map((quick, index) => (
              <QuickSearch
                key={index}
                label={quick.label}
                query={quick.query}
                icon={quick.icon}
                onCopy={copyToClipboard}
                onSearch={openGoogleSearch}
              />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Filtrele:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  categoryFilter === cat
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 shadow-md'
                }`}
              >
                {cat === 'all' ? '🌐 Tümü' : cat === 'favorites' ? '⭐ Favoriler' : cat}
                {cat === 'favorites' && favorites.length > 0 && ` (${favorites.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Search Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            Arama Kategorileri
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({filteredTemplates.length} kategori)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="relative group">
                <SearchCard
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={handleTemplateSelect}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(template);
                  }}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
                    favorites.some(f => f.id === template.id)
                      ? 'bg-yellow-400 text-white scale-110'
                      : 'bg-white/80 dark:bg-slate-700/80 text-slate-400 hover:text-yellow-500 hover:scale-110'
                  } shadow-lg`}
                  title={favorites.some(f => f.id === template.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                >
                  <Star className="w-4 h-4" fill={favorites.some(f => f.id === template.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            ))}
          </div>
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">Bu kategoride henüz şablon yok</p>
            </div>
          )}
        </div>


        {/* Footer */}
        <div className="mt-16 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>💡 İpucu: Daha iyi sonuçlar için spesifik anahtar kelimeler kullanın</p>
          <p className="mt-2">Bu araç Google'ın gelişmiş arama operatörlerini kullanır</p>
          <p className="mt-4 text-xs">Toplam {searchTemplates.length} arama şablonu • {searchHistory.length} arama geçmişi • {favorites.length} favori</p>
          <button
            onClick={() => setShowKeyboardShortcuts(true)}
            className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 text-xs font-semibold"
          >
            ⌨️ Klavye Kısayolları (Ctrl + /)
          </button>
        </div>
      </div>
      
      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
      )}
    </div>
  );
}

export default App;
