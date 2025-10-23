import { useState } from 'react';
import { Search, Sparkles, Copy, ExternalLink, ChevronDown, ChevronUp, Info } from 'lucide-react';
import SearchCard from './components/SearchCard';
import QuickSearch from './components/QuickSearch';
import CustomSearch from './components/CustomSearch';
import { searchTemplates, quickSearches } from './data/searchTemplates';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [showInfo, setShowInfo] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

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

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-primary-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Gelişmiş Google Arama
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Google'ın gücünü kullanarak istediğiniz dosyaları, belgeleri ve arşivleri kolayca bulun
          </p>
        </div>

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

        {/* Quick Searches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <Search className="w-6 h-6 mr-2 text-primary-600" />
            Hızlı Aramalar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickSearches.map((quick, index) => (
              <QuickSearch
                key={index}
                label={quick.label}
                query={quick.query}
                onCopy={copyToClipboard}
                onSearch={openGoogleSearch}
              />
            ))}
          </div>
        </div>

        {/* Search Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Arama Kategorileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchTemplates.map((template) => (
              <SearchCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        </div>

        {/* Custom Search Builder */}
        {selectedTemplate && (
          <CustomSearch
            template={selectedTemplate}
            onGenerate={generateQuery}
            generatedQuery={generatedQuery}
            onCopy={copyToClipboard}
            onSearch={openGoogleSearch}
            copiedId={copiedId}
          />
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-slate-500 text-sm">
          <p>💡 İpucu: Daha iyi sonuçlar için spesifik anahtar kelimeler kullanın</p>
          <p className="mt-2">Bu araç Google'ın gelişmiş arama operatörlerini kullanır</p>
        </div>
      </div>
    </div>
  );
}

export default App;
