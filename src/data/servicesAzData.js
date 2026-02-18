import {
  Code,
  ShieldCheck,
  Search,
  Share2,
  Briefcase,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Veb Proqramlaşdırma",
    description:
      "Müasir texnologiyalardan istifadə edərək güclü, miqyaslana bilən və etibarlı veb tətbiqlər hazırlayırıq.",
    features: [
      "Xüsusi veb tətbiqlər",
      "E-ticarət həlləri",
      "Biznes saytları",
      "API inteqrasiyası",
      "Performans optimizasiyası",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "Mobil Tətbiq İnkişafı",
    description:
      "Native & cross-platform mobil tətbiqlər — yüksək sürət və UX ilə.",
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
    icon: ShieldCheck,
    title: "İT Konsaltinq",
    description:
      "Biznes məqsədlərinizə uyğun texnoloji həllər qurmaq, səmərəliliyi artırmaq və təhlükəsiz, miqyaslana bilən sistemlər yaratmaq üçün strateji İT konsaltinq xidmətləri təqdim edirik.",
    features: [
      "İT strategiyası",
      "Rəqəmsal transformasiya",
      "Sistem inteqrasiyası",
      "Bulud və infrastruktur",
      "Təhlükəsizlik və uyğunluq",
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Search,
    title: "Search Engine Optimizasiyası",
    description:
      "Axtarış nəticələrində mövqelərinizi yüksəldərək orqanik trafik və görünürlüyü artırırıq.",
    features: [
      "SEO auditi",
      "E-ticarət üçün SEO",
      "Texniki SEO",
      "Lokal SEO",
      "Taksonomiya",
    ],
    color: "from-blue-500 to-violet-600",
  },
  {
    icon: Share2,
    title: "Rəqəmsal Marketinq",
    description:
      "Hədəf auditoriyanızla effektiv əlaqə quraraq brend görünürlüğünü və satış potensialını artırırıq.",
    features: [
      "Kontent yaradılması",
      "SMM",
      "E-mail marketinq",
      "Ödənişli reklamlar",
      "Bazar araşdırması",
    ],
    color: "from-purple-500 to-pink-600",
  },  
  {
    icon: Briefcase,
    title: "Brend Strategiyası",
    description:
      "Hədəf auditoriyanızın yaddaşında qalan güclü və ardıcıl brend kimliyi formalaşdırırıq.",
    features: [
      "Mövqeləndirmə",
      "Vizual kimlik",
      "Brend qaydaları",
      "Kommunikasiya strategiyası",
      "Təcrübə dizaynı",
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

