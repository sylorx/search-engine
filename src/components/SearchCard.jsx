import { 
  FileText, Archive, Video, Music, Image, FolderOpen, 
  Calendar, GraduationCap, Search, Code, Database, 
  BookOpen, Sparkles 
} from 'lucide-react';

const iconMap = {
  FileText, Archive, Video, Music, Image, FolderOpen,
  Calendar, GraduationCap, Search, Code, Database,
  BookOpen, Sparkles
};

function SearchCard({ template, isSelected, onSelect }) {
  const Icon = iconMap[template.icon] || Search;

  return (
    <div
      onClick={() => onSelect(template)}
      className={`card cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-primary-400 shadow-2xl' : ''
      }`}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <div className="mb-2">
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
          {template.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        {template.title}
      </h3>
      
      <p className="text-sm text-slate-600 mb-4">
        {template.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {template.keywords.slice(0, 3).map((keyword, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
          >
            {keyword}
          </span>
        ))}
        {template.keywords.length > 3 && (
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
            +{template.keywords.length - 3}
          </span>
        )}
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-primary-200">
          <span className="text-sm font-semibold text-primary-600">
            ✓ Seçildi
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchCard;
