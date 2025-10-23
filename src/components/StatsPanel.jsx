import { TrendingUp, Clock, Star, Search, BarChart3 } from 'lucide-react';

function StatsPanel({ searchHistory, favorites, onSearch }) {
  // Calculate stats
  const totalSearches = searchHistory.length;
  const totalFavorites = favorites.length;
  
  // Get most used templates
  const templateCounts = searchHistory.reduce((acc, item) => {
    acc[item.template] = (acc[item.template] || 0) + 1;
    return acc;
  }, {});
  
  const topTemplates = Object.entries(templateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Get recent searches
  const recentSearches = searchHistory.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Total Stats */}
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">Toplam Arama</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalSearches}</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
            <Search className="w-7 h-7 text-white" />
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {totalSearches > 0 ? 'Arama geçmişiniz kaydediliyor' : 'Henüz arama yapmadınız'}
        </p>
      </div>
      
      {/* Favorites Stats */}
      <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-200 dark:border-yellow-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">Favoriler</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{totalFavorites}</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-yellow-600 dark:bg-yellow-500 flex items-center justify-center">
            <Star className="w-7 h-7 text-white" fill="currentColor" />
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {totalFavorites > 0 ? 'Favori kategorileriniz' : 'Henüz favori eklemediniz'}
        </p>
      </div>
      
      {/* Popular Templates */}
      <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">En Popüler</p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {topTemplates.length > 0 ? topTemplates[0][0].substring(0, 15) + '...' : 'Yok'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-purple-600 dark:bg-purple-500 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {topTemplates.length > 0 ? `${topTemplates[0][1]} kez kullanıldı` : 'İstatistik yok'}
        </p>
      </div>
      
      {/* Recent Activity */}
      {recentSearches.length > 0 && (
        <div className="card md:col-span-3 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Son Aramalar</h3>
          </div>
          <div className="space-y-2">
            {recentSearches.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all cursor-pointer"
                onClick={() => onSearch(item.query)}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.template}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(item.timestamp).toLocaleTimeString('tr-TR')}
                  </p>
                </div>
                <button className="text-green-600 dark:text-green-400 hover:text-green-700 text-sm font-semibold">
                  Tekrar Ara →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Top Templates Chart */}
      {topTemplates.length > 0 && (
        <div className="card md:col-span-3 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">En Çok Kullanılan Kategoriler</h3>
          </div>
          <div className="space-y-3">
            {topTemplates.map(([template, count], index) => (
              <div key={template} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {index + 1}. {template}
                  </span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{count}x</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(count / topTemplates[0][1]) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
