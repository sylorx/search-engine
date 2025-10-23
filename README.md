# 🔍 Gelişmiş Google Dosya Arama Aracı

Modern ve kullanıcı dostu bir web uygulaması ile Google'ın gelişmiş arama operatörlerini kullanarak istediğiniz dosyaları, belgeleri ve arşivleri kolayca bulun.

![React](https://img.shields.io/badge/React-18.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## ✨ Özellikler

- 🎯 **13 Farklı Arama Kategorisi**: PDF, DOC, arşivler, videolar, ses dosyaları ve daha fazlası
- ⚡ **Hızlı Aramalar**: Önceden hazırlanmış popüler arama şablonları
- 🎨 **Modern ve Şık Arayüz**: React + TailwindCSS ile geliştirilmiş responsive tasarım
- 📋 **Tek Tıkla Kopyalama**: Oluşturulan sorguları kolayca kopyalayın
- 🚀 **Direkt Google Araması**: Sorguları doğrudan Google'da açın
- 🎓 **Akademik Arama**: Üniversite ve devlet sitelerinde özel arama
- 📅 **Tarih Filtreleme**: Belirli yıllardan önceki dosyaları bulun
- 💡 **Akıllı Öneriler**: Her kategori için önerilen anahtar kelimeler

## 🎯 Arama Kategorileri

1. **Belgeler** - PDF, DOC, PPT, XLS dosyaları
2. **Arşivler** - RAR, ZIP, 7z, ISO, TAR dosyaları
3. **Video** - MP4, AVI, MKV, MOV dosyaları
4. **Ses** - MP3, WAV, FLAC, OGG dosyaları
5. **Görseller** - PNG, JPG, GIF, SVG, PSD dosyaları
6. **Açık Dizinler** - "Index of" sunucu dizinleri
7. **Tarihli Arama** - Eski yıllara ait dosyalar
8. **Akademik** - Üniversite ve devlet siteleri
9. **Geniş Arama** - Tüm dosya türlerinde kapsamlı arama
10. **Teknik** - Driver, firmware, kaynak kod
11. **Yedekler** - Web sitesi yedekleri ve veritabanları
12. **Tezler** - Akademik tezler ve araştırmalar
13. **Süper Arama** - Maksimum kapsamlı arama

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın:**
```bash
git clone <https://github.com/sylorx/search-engine.git>
cd search-engine
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📖 Kullanım

### Temel Kullanım

1. **Kategori Seçin**: Ana sayfada istediğiniz dosya türü kategorisini seçin
2. **Anahtar Kelime Girin**: Aramak istediğiniz kelimeyi yazın
3. **Sorgu Oluştur**: "Arama Sorgusu Oluştur" butonuna tıklayın
4. **Kopyala veya Ara**: Oluşan sorguyu kopyalayın veya direkt Google'da arayın

### Hızlı Aramalar

Üst kısımda bulunan hızlı arama butonlarını kullanarak popüler aramaları tek tıkla yapabilirsiniz:

- Eski Oyunlar
- Ders Notları
- Eski Filmler
- Müzik Arşivi
- E-Kitaplar
- Yazılım Arşivi

### Tarihli Arama

Bazı kategorilerde (Tarihli Arama, Teknik Belgeler, Tezler) tarih filtresi kullanabilirsiniz. Belirttiğiniz yıldan önceki dosyaları bulur.

### Önerilen Kelimeler

Anahtar kelime kutusuna tıkladığınızda, seçili kategoriye özel önerilen kelimeler görünür. Bunları kullanarak daha iyi sonuçlar alabilirsiniz.

## 🛠️ Teknolojiler

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool ve dev server
- **TailwindCSS 3.3** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Proje Yapısı

```
search-engine/
├── src/
│   ├── components/
│   │   ├── SearchCard.jsx       # Kategori kartları
│   │   ├── QuickSearch.jsx      # Hızlı arama butonları
│   │   └── CustomSearch.jsx     # Özel arama oluşturucu
│   ├── data/
│   │   └── searchTemplates.js   # Arama şablonları ve kategoriler
│   ├── App.jsx                  # Ana uygulama bileşeni
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global stiller
├── public/                      # Static dosyalar
├── index.html                   # HTML template
├── package.json                 # Proje bağımlılıkları
├── vite.config.js              # Vite yapılandırması
├── tailwind.config.js          # TailwindCSS yapılandırması
└── postcss.config.js           # PostCSS yapılandırması
```

## 🎨 Özelleştirme

### Yeni Kategori Ekleme

`src/data/searchTemplates.js` dosyasını düzenleyerek yeni arama kategorileri ekleyebilirsiniz:

```javascript
{
  id: 14,
  category: "Yeni Kategori",
  icon: "IconName",
  title: "Kategori Başlığı",
  description: "Kategori açıklaması",
  template: 'filetype:ext "{keyword}"',
  keywords: ["örnek1", "örnek2"],
  color: "from-color-500 to-color-600"
}
```

### Renk Teması Değiştirme

`tailwind.config.js` dosyasındaki `primary` renklerini değiştirerek tema renklerini özelleştirebilirsiniz.

## 📝 Google Arama Operatörleri

Bu uygulama aşağıdaki Google arama operatörlerini kullanır:

- `filetype:` - Belirli dosya türlerini arar
- `site:` - Belirli web sitelerinde arar
- `intitle:` - Sayfa başlığında arar
- `inurl:` - URL'de arar
- `before:` - Belirli tarihten önceki sonuçları gösterir
- `OR` - Birden fazla terimi birleştirir
- `" "` - Tam eşleşme arar

## 🔒 Güvenlik ve Gizlilik

- Bu uygulama tamamen tarayıcınızda çalışır
- Hiçbir veri sunucuya gönderilmez
- Aramalar Google'ın kendi arama motorunu kullanır
- Kaynak kodu açık ve incelenebilir

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 💡 İpuçları

- **Spesifik olun**: Daha spesifik anahtar kelimeler daha iyi sonuçlar verir
- **Kombinasyonlar**: Farklı kategorileri deneyerek en iyi sonuçları bulun
- **Tarih filtresi**: Eski dosyalar için tarih filtresini kullanın
- **Açık dizinler**: "Index of" aramaları genellikle büyük dosya arşivleri bulur
- **Akademik kaynaklar**: .edu ve .ac.tr siteleri güvenilir kaynaklardır

## 🐛 Sorun Bildirme

Bir sorun mu buldunuz? Lütfen [GitHub Issues](https://github.com/your-repo/issues) üzerinden bildirin.

## 📧 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
web browsing
