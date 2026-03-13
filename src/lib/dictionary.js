// ============================================
// ARCTECH - CENTRALIZED TRANSLATION DICTIONARY
// ============================================
// Structure: dictionary[language][section][key]
// Supports: English (en), Turkish (tr)

export const dictionary = {
  en: {
    // ========================================
    // HEADER & NAVIGATION
    // ========================================
    header: {
      nav: {
        home: "Home",
        projects: "Projects",
        about: "About Us",
        contact: "Contact",
      },
      contact_us: "Contact Us",
    },

    // ========================================
    // HERO SECTION
    // ========================================
    hero: {
      tagline: "Build Your Dreams",
    },

    // ========================================
    // PROJECTS SECTION
    // ========================================
    projects: {
      title: "Featured",
      title_highlight: "Project",
      catalog_btn: "Get Project Catalog",
      categories: {
        all: "All Works",
        construction: "Construction",
        architecture: "Architecture",
        building: "Building",
        interior: "Interior",
      },
    },

    // ========================================
    // ABOUT SECTION
    // ========================================
    about: {
      quote:
        "Your vision is our blueprint. We approach every project with a problem-solving mindset, dedicated to delivering results that add real value to your investment",
      values: [
        {
          title: "Trust & Transparency",
          description:
            "We believe in open books and clear timelines. Our transparent workflow ensures you are informed, confident, and in control at every stage of the construction process.",
        },
        {
          title: "Best Quality",
          description:
            "We take pride in our work so you can take pride in your property. Our team delivers high-performance construction designed to last for generations.",
        },
      ],
    },

    // ========================================
    // PARTNERS SECTION
    // ========================================
    partners: {
      title: "Trusted by",
      title_highlight: "Industry Leaders",
    },

    // ========================================
    // CONTACT / REQUEST QUOTE SECTION
    // ========================================
    contact: {
      title: "Request A",
      title_highlight: "Quote",
      subtitle: "Fill in the form below and we'll get back to you as soon as possible.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        service: "Select Your Service",
        details: "Additional Details",
        submit: "Submit Request",
      },
      info_title: "Contact Info",
      info: {
        location: {
          title: "Our Location",
          lines: [
            "32 Shamsi Rahimov St, Narimanov District",
            "Baku, AZ1106, Azerbaijan",
          ],
        },
        contact: {
          title: "Quick Contact",
          lines: ["Email: info@arctech.tr", "Phone: +994 (50) 309-69-49"],
        },
        hours: {
          title: "Opening Hours",
          lines: ["Monday – Friday", "09:00 AM – 06:00 PM"],
        },
      },
      services: [
        { value: "construction", label: "Construction" },
        { value: "renovation", label: "Renovation" },
        { value: "architecture", label: "Architecture Design" },
        { value: "interior", label: "Interior Design" },
        { value: "consulting", label: "Consulting" },
        { value: "maintenance", label: "Building Maintenance" },
      ],
    },

    // ========================================
    // FOOTER
    // ========================================
    footer: {
      description:
        "We have the confidence to provide the best service for you, with the support of Professional and Certified HR that we currently have and the high-quality materials we use and structured work techniques, we will be able to realize timely completion of work.",
      quick_links: "Quick Links",
      rights: "All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },

    // ========================================
    // GALLERY MODAL
    // ========================================
    gallery: {
      title: "Gallery",
      description: "Image gallery viewer with keyboard navigation",
    },
  },

  // ============================================
  // TURKISH TRANSLATIONS
  // ============================================
  tr: {
    // ========================================
    // HEADER & NAVIGATION
    // ========================================
    header: {
      nav: {
        home: "Ana Sayfa",
        projects: "Projeler",
        about: "Hakkımızda",
        contact: "İletişim",
      },
      contact_us: "Bize Ulaşın",
    },

    // ========================================
    // HERO SECTION
    // ========================================
    hero: {
      tagline: "Hayallerinizi İnşa Edin",
    },

    // ========================================
    // PROJECTS SECTION
    // ========================================
    projects: {
      title: "Öne Çıkan",
      title_highlight: "Projeler",
      catalog_btn: "Proje Kataloğunu Al",
      categories: {
        all: "Tüm Çalışmalar",
        construction: "İnşaat",
        architecture: "Mimarlık",
        building: "Yapı",
        interior: "İç Mekan",
      },
    },

    // ========================================
    // ABOUT SECTION
    // ========================================
    about: {
      quote:
        "Vizyonunuz bizim projemizdir. Her projeye problem çözme anlayışıyla yaklaşıyor, yatırımınıza gerçek değer katan sonuçlar sunmaya kendimizi adıyoruz",
      values: [
        {
          title: "Güven ve Şeffaflık",
          description:
            "Açık defterlere ve net zaman çizelgelerine inanıyoruz. Şeffaf iş akışımız, inşaat sürecinin her aşamasında bilgilendirilmenizi, güvenli ve kontrol altında olmanızı sağlar.",
        },
        {
          title: "En İyi Kalite",
          description:
            "İşimizle gurur duyuyoruz ki siz de mülkünüzle gurur duyun. Ekibimiz, nesiller boyu dayanacak şekilde tasarlanmış yüksek performanslı yapılar sunar.",
        },
      ],
    },

    // ========================================
    // PARTNERS SECTION
    // ========================================
    partners: {
      title: "Güvenilen",
      title_highlight: "Sektör Liderleri",
    },

    // ========================================
    // CONTACT / REQUEST QUOTE SECTION
    // ========================================
    contact: {
      title: "Teklif",
      title_highlight: "İsteyin",
      subtitle: "Aşağıdaki formu doldurun, en kısa sürede size geri dönelim.",
      form: {
        name: "Ad Soyad",
        email: "E-posta",
        phone: "Telefon",
        service: "Hizmet Seçin",
        details: "Ek Detaylar",
        submit: "Talebi Gönder",
      },
      info_title: "İletişim Bilgileri",
      info: {
        location: {
          title: "Konumumuz",
          lines: [
            "Şəmsi Rəhimov Küç., No: 32, Nərimanov Rayonu",
            "Bakü, AZ1106, Azerbaycan",
          ],
        },
        contact: {
          title: "Hızlı İletişim",
          lines: ["E-posta: info@arctech.tr", "Telefon: +994 (50) 309-69-49"],
        },
        hours: {
          title: "Çalışma Saatleri",
          lines: ["Pazartesi – Cuma", "09:00 – 18:00"],
        },
      },
      services: [
        { value: "construction", label: "İnşaat" },
        { value: "renovation", label: "Tadilat" },
        { value: "architecture", label: "Mimari Tasarım" },
        { value: "interior", label: "İç Mekan Tasarımı" },
        { value: "consulting", label: "Danışmanlık" },
        { value: "maintenance", label: "Bina Bakımı" },
      ],
    },

    // ========================================
    // FOOTER
    // ========================================
    footer: {
      description:
        "Profesyonel ve Sertifikalı İK desteğimiz, kullandığımız yüksek kaliteli malzemeler ve yapılandırılmış çalışma tekniklerimizle size en iyi hizmeti sunma konusunda özgüvenimiz tam. Zamanında iş teslimi bizim için önceliktir.",
      quick_links: "Hızlı Bağlantılar",
      rights: "Tüm hakları saklıdır.",
      terms: "Kullanım Şartları",
      privacy: "Gizlilik Politikası",
    },

    // ========================================
    // GALLERY MODAL
    // ========================================
    gallery: {
      title: "Galeri",
      description: "Klavye navigasyonlu resim galerisi görüntüleyici",
    },
  },
};
