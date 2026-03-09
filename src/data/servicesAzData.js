import {
  Code,
  Search,
  Share2,
  Briefcase,
  Smartphone,
  ShieldCheck,
  Code2,
  Target,
  Megaphone,
} from "lucide-react";

const services = [
  {
    title: "Veb İnkişafı",
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    path: "/services/web-development",
    description: "Biznes məqsədlərinizə uyğun güclü və genişlənə bilən veb həllər hazırlayırıq.",
    features: [
      {
        label: "Xüsusi veb tətbiqlər",
        path: "/services/web-development/custom-web-apps",
      },
      {
        label: "Biznes veb saytları",
        path: "/services/web-development/business-websites",
      },
      {
        label: "E-commerce saytları",
        path: "/services/web-development/ecommerce",
      },
    ],
  },
  {
    title: "Mobil Tətbiq İnkişafı",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    path: "/services/mobile-app-development",
    description: "Yüksək performans və istifadə rahatlığı üçün native və cross-platform mobil tətbiqlər hazırlayırıq.",
    features: [
      {
        label: "iOS və Android",
        path: "/services/mobile-app-development/ios-android-app-development",
      },
      {
        label: "Cross Platform",
        path: "/services/mobile-app-development/cross-platform-app-development",
      },
      {
        label: "App Store optimizasiyası",
        path: "/services/mobile-app-development/app-store-optimization",
      },
    ],
  },
  {
    title: "Brend Strategiyası",
    icon: Target,
    color: "from-violet-500 to-purple-600",
    path: "/services/brand-strategy",
    description:
      "Biznesinizin bazarda güclü mövqe qazanması və aydın brend kimliyi qurması üçün strateji yanaşma təqdim edirik.",
    features: [],
  },
  {
    title: "Rəqəmsal Marketinq",
    icon: Megaphone,
    color: "from-pink-500 to-rose-600",
    path: "/services/digital-marketing",
    description:
      "Görünürlüğü artırmaq, trafik və konversiyaları yüksəltmək üçün kompleks rəqəmsal marketinq xidmətləri.",
    features: [
      { label: "SEO", path: "/services/digital-marketing/seo" },
      { label: "SEM", path: "/services/digital-marketing/sem" },
      { label: "SMM", path: "/services/digital-marketing/smm" },
      { label: "Dizayn", path: "/services/digital-marketing/design" },
    ],
  },
];

const processPhases = [
  {
    number: "01",
    title: "Araşdırma",
    description: "Biz sizin məqsədlərinizi, problemlərinizi və auditoriyanızı öyrənirik.",
    color: "bg-blue-500",
    colorDot: "bg-blue-400"
  },
  {
    number: "02",
    title: "Strategiya",
    description: "Biznesiniz üçün ən uyğun həlli planlaşdırırıq.",
    color: "bg-violet-500",
    colorDot: "bg-violet-400"
  },
  {
    number: "03",
    title: "İcra",
    description: "Hər şeyi yüksək dəqiqlik və keyfiyyətlə hazırlayırıq.",
    color: "bg-rose-500",
    colorDot: "bg-rose-400"
  },
  {
    number: "04",
    title: "Optimallaşdırma",
    description: "Nəticələri davamlı olaraq təkmilləşdirir və inkişaf etdiririk.",
    color: "bg-fuchsia-500",
    colorDot: "bg-fuchsia-400"
  }
];

export default {
  services,
  processPhases,
};