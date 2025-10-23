export const searchTemplates = [
  {
    id: 1,
    category: "Belgeler",
    icon: "FileText",
    title: "PDF, DOC, PPT, XLS Belgeleri",
    description: "Tüm ofis belgelerini ve PDF dosyalarını arayın",
    template: '(filetype:pdf OR filetype:doc OR filetype:docx OR filetype:ppt OR filetype:pptx OR filetype:xls OR filetype:xlsx) "{keyword}"',
    keywords: ["eski rapor", "kılavuz", "manual", "ders notu", "notlar", "project report", "study material"],
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    category: "Arşivler",
    icon: "Archive",
    title: "Arşiv Dosyaları (RAR, ZIP, 7z, ISO)",
    description: "Sıkıştırılmış ve arşiv dosyalarını bulun",
    template: '(filetype:rar OR filetype:zip OR filetype:7z OR filetype:iso OR filetype:tar) "{keyword}"',
    keywords: ["eski oyun", "full version", "archive", "backup", "old files"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    category: "Video",
    icon: "Video",
    title: "Video Dosyaları",
    description: "MP4, AVI, MKV ve diğer video formatları",
    template: '(filetype:mp4 OR filetype:avi OR filetype:mkv OR filetype:mov OR filetype:wmv) "{keyword}"',
    keywords: ["trailer", "old video", "documentary", "clip", "demo"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    category: "Ses",
    icon: "Music",
    title: "Ses Dosyaları",
    description: "MP3, WAV, FLAC ve diğer ses formatları",
    template: '(filetype:mp3 OR filetype:wav OR filetype:flac OR filetype:ogg) "{keyword}"',
    keywords: ["old song", "demo", "recording", "soundtrack", "audio sample"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    category: "Görseller",
    icon: "Image",
    title: "Görsel ve Grafik Dosyaları",
    description: "PNG, JPG, GIF, SVG, PSD formatları",
    template: '(filetype:png OR filetype:jpg OR filetype:jpeg OR filetype:gif OR filetype:svg OR filetype:bmp OR filetype:psd) "{keyword}"',
    keywords: ["old logo", "concept art", "game art", "texture", "sprite"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 6,
    category: "Açık Dizinler",
    icon: "FolderOpen",
    title: "Index of - Açık Dizinler",
    description: "Açık sunucu dizinlerini keşfedin",
    template: 'intitle:"index of" (pdf OR rar OR zip OR iso OR mp4 OR mp3 OR 7z) "{keyword}"',
    keywords: ["backup", "old", "archive", "uploads"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 7,
    category: "Tarihli Arama",
    icon: "Calendar",
    title: "Eski Yıllara Ait Dosyalar",
    description: "Belirli tarihten önceki dosyaları bulun",
    template: '(filetype:pdf OR filetype:doc OR filetype:rar) "{keyword}" before:{year}',
    keywords: ["report", "manual", "game", "setup"],
    hasYearInput: true,
    color: "from-rose-500 to-red-500"
  },
  {
    id: 8,
    category: "Akademik",
    icon: "GraduationCap",
    title: "Üniversite ve Devlet Siteleri",
    description: "Akademik ve resmi kaynaklardan arama",
    template: 'site:edu OR site:ac.tr OR site:gov OR site:gov.tr filetype:pdf "{keyword}"',
    keywords: ["lecture notes", "thesis", "report", "istatistik raporu"],
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: 9,
    category: "Geniş Arama",
    icon: "Search",
    title: "Karma ve Geniş Arama",
    description: "Tüm dosya türlerinde kapsamlı arama",
    template: '(intitle:"index of" OR inurl:downloads OR inurl:backup OR inurl:archives) (filetype:pdf OR filetype:rar OR filetype:zip OR filetype:mp4 OR filetype:iso OR filetype:mp3) "{keyword}"',
    keywords: ["archive", "old", "eski", "backup", "collection"],
    color: "from-slate-600 to-slate-800"
  },
  {
    id: 10,
    category: "Teknik",
    icon: "Code",
    title: "Teknik Belgeler ve Yazılım",
    description: "Driver, firmware, kaynak kod ve teknik dokümanlar",
    template: '(filetype:pdf OR filetype:zip OR filetype:tar.gz) "{keyword}" before:{year}',
    keywords: ["driver", "manual", "documentation", "firmware", "source code"],
    hasYearInput: true,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 11,
    category: "Yedekler",
    icon: "Database",
    title: "Web Site Yedekleri",
    description: "Eski web sitesi yedekleri ve veritabanları",
    template: '(intitle:"index of" OR inurl:backup OR inurl:old) (filetype:zip OR filetype:tar OR filetype:sql) "{keyword}"',
    keywords: ["site backup", "database", "old website"],
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 12,
    category: "Tezler",
    icon: "BookOpen",
    title: "Akademik Tezler ve Araştırmalar",
    description: "Üniversite tezleri ve araştırma makaleleri",
    template: 'site:ac.tr OR site:edu filetype:pdf "{keyword}" before:{year}',
    keywords: ["tez", "thesis", "research paper", "report"],
    hasYearInput: true,
    color: "from-sky-500 to-blue-600"
  },
  {
    id: 13,
    category: "Hepsi",
    icon: "Sparkles",
    title: "Her Şeyi Bul - Süper Arama",
    description: "Tüm kategorilerde maksimum kapsamlı arama",
    template: '(intitle:"index of" OR inurl:backup OR inurl:downloads OR inurl:archives) (filetype:pdf OR filetype:rar OR filetype:zip OR filetype:iso OR filetype:7z OR filetype:mp4 OR filetype:mp3 OR filetype:doc OR filetype:xls OR filetype:ppt) "{keyword}"',
    keywords: ["old", "eski", "archive", "collection", "backup", "full version"],
    color: "from-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
  },
  {
    id: 14,
    category: "E-Kitaplar",
    icon: "BookOpen",
    title: "E-Kitap ve Dijital Kitaplar",
    description: "PDF, EPUB, MOBI formatında e-kitaplar",
    template: '(filetype:pdf OR filetype:epub OR filetype:mobi) "{keyword}" "book" OR "kitap" OR "ebook"',
    keywords: ["roman", "hikaye", "tarih", "bilim", "felsefe", "edebiyat"],
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 15,
    category: "Yazılım",
    icon: "Download",
    title: "Yazılım ve Program İndirme",
    description: "Setup dosyaları ve kurulum programları",
    template: '(filetype:exe OR filetype:msi OR filetype:dmg) "{keyword}" "setup" OR "installer" OR "download"',
    keywords: ["software", "program", "tool", "utility", "application"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 16,
    category: "Kurslar",
    icon: "Video",
    title: "Online Kurslar ve Eğitimler",
    description: "Video dersler ve eğitim materyalleri",
    template: 'intitle:"index of" (filetype:mp4 OR filetype:mkv) "{keyword}" "course" OR "tutorial" OR "lesson"',
    keywords: ["programming", "design", "language", "music", "art"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: 17,
    category: "Şablonlar",
    icon: "FileText",
    title: "Şablon ve Doküman Örnekleri",
    description: "CV, sunum, rapor şablonları",
    template: '(filetype:docx OR filetype:pptx OR filetype:xlsx) "{keyword}" "template" OR "şablon" OR "örnek"',
    keywords: ["cv", "resume", "presentation", "report", "invoice"],
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 18,
    category: "Veri Setleri",
    icon: "Database",
    title: "Veri Setleri ve CSV Dosyaları",
    description: "Açık veri setleri ve istatistikler",
    template: '(filetype:csv OR filetype:json OR filetype:xml) "{keyword}" "dataset" OR "data" OR "statistics"',
    keywords: ["population", "economy", "weather", "sports", "finance"],
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: 19,
    category: "Font",
    icon: "Type",
    title: "Font ve Yazı Tipleri",
    description: "TTF, OTF font dosyaları",
    template: '(filetype:ttf OR filetype:otf OR filetype:woff) "{keyword}" "font" OR "typeface"',
    keywords: ["serif", "sans-serif", "handwriting", "display", "monospace"],
    color: "from-purple-500 to-violet-600"
  },
  {
    id: 20,
    category: "3D Modeller",
    icon: "Box",
    title: "3D Model Dosyaları",
    description: "OBJ, FBX, STL 3D modeller",
    template: '(filetype:obj OR filetype:fbx OR filetype:stl OR filetype:blend) "{keyword}" "3d model" OR "mesh"',
    keywords: ["character", "building", "vehicle", "furniture", "weapon"],
    color: "from-lime-500 to-green-600"
  }
];

export const quickSearches = [
  { label: "Eski Oyunlar", query: '(filetype:iso OR filetype:zip OR filetype:rar) "old game" OR "full version" OR "setup"', icon: "Gamepad2", category: "Eğlence" },
  { label: "Ders Notları", query: 'site:edu OR site:ac.tr filetype:pdf "ders notu" OR "lecture notes"', icon: "BookOpen", category: "Eğitim" },
  { label: "Eski Filmler", query: 'filetype:mp4 OR filetype:avi "old movie" OR "classic film"', icon: "Film", category: "Eğlence" },
  { label: "Müzik Arşivi", query: 'filetype:mp3 OR filetype:flac "album" OR "collection"', icon: "Music", category: "Medya" },
  { label: "E-Kitaplar", query: 'filetype:pdf OR filetype:epub "book" OR "kitap" OR "ebook"', icon: "BookOpen", category: "Eğitim" },
  { label: "Yazılım Arşivi", query: 'intitle:"index of" (filetype:zip OR filetype:rar) "software" OR "program"', icon: "Package", category: "Yazılım" },
  { label: "Ücretsiz Kurslar", query: 'intitle:"index of" filetype:mp4 "course" OR "tutorial" "free"', icon: "GraduationCap", category: "Eğitim" },
  { label: "CV Şablonları", query: 'filetype:docx "cv template" OR "resume template"', icon: "FileText", category: "Belgeler" },
  { label: "Wallpaper 4K", query: 'filetype:jpg OR filetype:png "wallpaper" "4k" OR "hd"', icon: "Image", category: "Medya" },
  { label: "Programlama Kitapları", query: 'filetype:pdf "programming" OR "coding" "book" OR "tutorial"', icon: "BookOpen", category: "Eğitim" },
  { label: "Ücretsiz VST", query: 'filetype:zip OR filetype:rar "vst" OR "plugin" "free"', icon: "Music", category: "Yazılım" },
  { label: "Photoshop Fırçaları", query: 'filetype:abr "photoshop brush" OR "ps brush"', icon: "Image", category: "Tasarım" },
  { label: "Font Paketleri", query: 'filetype:zip "font pack" OR "font collection"', icon: "FileText", category: "Tasarım" },
  { label: "3D Modeller", query: 'filetype:obj OR filetype:fbx "3d model" "free"', icon: "Package", category: "Tasarım" },
  { label: "Kod Örnekleri", query: 'site:github.com OR site:stackoverflow.com "code example"', icon: "FileText", category: "Yazılım" },
  { label: "Belgesel", query: 'filetype:mp4 "documentary" OR "belgesel"', icon: "Film", category: "Eğlence" },
  { label: "Ses Efektleri", query: 'filetype:wav OR filetype:mp3 "sound effect" "free"', icon: "Music", category: "Medya" },
  { label: "İkon Paketleri", query: 'filetype:zip "icon pack" OR "icon set"', icon: "Image", category: "Tasarım" },
];
