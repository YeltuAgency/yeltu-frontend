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
    title: "Веб-разработка",
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    path: "/services/web-development",
    description: "Создание мощных и масштабируемых веб-решений, адаптированных под цели вашего бизнеса.",
    features: [
      {
        label: "Индивидуальные веб-приложения",
        path: "/services/web-development/custom-web-apps",
      },
      {
        label: "Бизнес-сайты",
        path: "/services/web-development/business-websites",
      },
      {
        label: "E-commerce сайты",
        path: "/services/web-development/ecommerce",
      },
    ],
  },
  {
    title: "Мобильная разработка",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    path: "/services/mobile-app-development",
    description: "Нативные и кроссплатформенные мобильные приложения с высокой производительностью и удобным UX.",
    features: [
      {
        label: "iOS и Android",
        path: "/services/mobile-app-development/ios-android-app-development",
      },
      {
        label: "Cross Platform",
        path: "/services/mobile-app-development/cross-platform-app-development",
      },
      {
        label: "Оптимизация App Store",
        path: "/services/mobile-app-development/app-store-optimization",
      },
    ],
  },
  {
    title: "Бренд-стратегия",
    icon: Target,
    color: "from-violet-500 to-purple-600",
    path: "/services/brand-strategy",
    description:
      "Стратегическое развитие бренда, помогающее вашему бизнесу выстроить сильную позицию на рынке.",
    features: [],
  },
  {
    title: "Цифровой маркетинг",
    icon: Megaphone,
    color: "from-pink-500 to-rose-600",
    path: "/services/digital-marketing",
    description:
      "Комплексные услуги цифрового маркетинга для увеличения видимости, трафика и конверсий.",
    features: [
      { label: "SEO", path: "/services/digital-marketing/seo" },
      { label: "SEM", path: "/services/digital-marketing/sem" },
      { label: "SMM", path: "/services/digital-marketing/smm" },
      { label: "Дизайн", path: "/services/digital-marketing/design" },
    ],
  },
];

const processPhases = [
  {
    number: "01",
    title: "Исследование",
    description: "Мы изучаем ваши цели, задачи и целевую аудиторию.",
    color: "bg-blue-500",
    colorDot: "bg-blue-400"
  },
  {
    number: "02",
    title: "Стратегия",
    description: "Мы планируем оптимальное решение для вашего бизнеса.",
    color: "bg-violet-500",
    colorDot: "bg-violet-400"
  },
  {
    number: "03",
    title: "Реализация",
    description: "Мы создаем всё с высокой точностью и качеством.",
    color: "bg-rose-500",
    colorDot: "bg-rose-400"
  },
  {
    number: "04",
    title: "Оптимизация",
    description: "Мы постоянно улучшаем и развиваем результаты.",
    color: "bg-fuchsia-500",
    colorDot: "bg-fuchsia-400"
  }
];

export default {
  services,
  processPhases,
};