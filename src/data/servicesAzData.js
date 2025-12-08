import {
  Code,
  Palette,
  Search,
  Share2,
  Briefcase,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Veb İnkişafı",
    description:
      "Müasir frameworklərdən istifadə edərək güclü və genişlənəbilən veb tətbiqləri hazırlayın.",
    features: [
      "Xüsusi veb tətbiqlər",
      "E-ticarət",
      "PWA-lar",
      "API inteqrasiyası",
      "Performans optimizasiyası",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "Mobil Tətbiq İnkişafı",
    description:
      "Yerlinə & cross-platform mobil tətbiqlər — yüksək sürət və UX ilə.",
    features: [
      "iOS və Android",
      "Cross-platform",
      "UI/UX dizayn",
      "Mağaza optimizasiyası",
      "Texniki dəstək",
    ],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Palette,
    title: "UI/UX Dizayn",
    description:
      "İstifadəçi mərkəzli, vizual cəhətdən təsirli dizaynlar — strategiya və araşdırmaya əsaslanır.",
    features: [
      "Personalar",
      "Wireframing",
      "Dizayn sistemləri",
      "Responsiv dizayn",
      "İstifadəçi testləri",
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Search,
    title: "SEO Optimizasiya",
    description: "Axtarış sıralamalarını artırın və orqanik trafiki yüksəldin.",
    features: [
      "Açar söz tədqiqatı",
      "On-page SEO",
      "Texniki auditlər",
      "Backlink-lər",
      "Analitika",
    ],
    color: "from-blue-500 to-violet-600",
  },
  {
    icon: Share2,
    title: "Sosial Media Marketinqi",
    description: "İzləyiciləri cəlb edin və brend görünürlüğünüzü artırın.",
    features: [
      "Kontent yaradılması",
      "Cəmiyyət idarəçiliyi",
      "Reklam kampaniyaları",
      "Analitika",
      "Influencer marketinqi",
    ],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Briefcase,
    title: "Brend Strategiyası",
    description: "İzləyicinizin yadda saxlayacağı güclü brend kimliyi yaradın.",
    features: [
      "Pozisioninq",
      "Vizual kimlik",
      "Brend qaydaları",
      "Mesajlaşdırma",
      "Auditlər",
    ],
    color: "from-indigo-500 to-purple-600",
  },
];

const processPhases = [
  {
    number: "01",
    title: "Kəşf",
    description: "Məqsədlərinizi, çətinliklərinizi və auditoriyanızı öyrənirik.",
    color: "bg-blue-500",
    colorDot: "bg-blue-400",
  },
  {
    number: "02",
    title: "Strategiya",
    description: "Biznesiniz üçün ən uyğun həlli planlaşdırırıq.",
    color: "bg-violet-500",
    colorDot: "bg-violet-400",
  },
  {
    number: "03",
    title: "İcra",
    description: "Hər şeyi dəqiqlik və yüksək keyfiyyətlə qururuq.",
    color: "bg-rose-500",
    colorDot: "bg-rose-400",
  },
  {
    number: "04",
    title: "Optimizasiya",
    description: "Nəticələri davamlı şəkildə yaxşılaşdırır və genişləndiririk.",
    color: "bg-fuchsia-500",
    colorDot: "bg-fuchsia-400",
  },
];
export default {
  services,
  processPhases,
};

