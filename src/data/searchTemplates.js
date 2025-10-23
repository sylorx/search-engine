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
  }
];

export const quickSearches = [
  { label: "Eski Oyunlar", query: '(filetype:iso OR filetype:zip OR filetype:rar) "old game" OR "full version" OR "setup"' },
  { label: "Ders Notları", query: 'site:edu OR site:ac.tr filetype:pdf "ders notu" OR "lecture notes"' },
  { label: "Eski Filmler", query: 'filetype:mp4 OR filetype:avi "old movie" OR "classic film"' },
  { label: "Müzik Arşivi", query: 'filetype:mp3 OR filetype:flac "album" OR "collection"' },
  { label: "E-Kitaplar", query: 'filetype:pdf OR filetype:epub "book" OR "kitap" OR "ebook"' },
  { label: "Yazılım Arşivi", query: 'intitle:"index of" (filetype:zip OR filetype:rar) "software" OR "program"' },
];
