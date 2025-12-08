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
    title: "Веб-Разработка",
    description:
      "Создание мощных и масштабируемых веб-приложений на современных фреймворках.",
    features: [
      "Кастомные веб-приложения",
      "E-commerce",
      "PWA",
      "Интеграция API",
      "Оптимизация производительности",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "Разработка Мобильных Приложений",
    description:
      "Нативные и кроссплатформенные мобильные приложения с отличной скоростью и UX.",
    features: [
      "iOS и Android",
      "Кроссплатформа",
      "UI/UX дизайн",
      "Оптимизация магазинов",
      "Поддержка",
    ],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Palette,
    title: "UI/UX Дизайн",
    description:
      "Ориентированный на пользователя привлекательный дизайн, основанный на стратегии и исследованиях.",
    features: [
      "Персоны",
      "Вайрфреймы",
      "Дизайн-системы",
      "Адаптивный дизайн",
      "Юзабилити-тестирование",
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Search,
    title: "SEO Оптимизация",
    description: "Повышайте позиции и увеличивайте органический трафик.",
    features: [
      "Анализ ключевых слов",
      "On-page SEO",
      "Технические аудиты",
      "Бэклинки",
      "Аналитика",
    ],
    color: "from-blue-500 to-violet-600",
  },
  {
    icon: Share2,
    title: "SMM — Маркетинг",
    description: "Увеличивайте вовлечённость и укрепляйте присутствие бренда.",
    features: [
      "Создание контента",
      "Управление сообществом",
      "Реклама",
      "Аналитика",
      "Инфлюенсеры",
    ],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Briefcase,
    title: "Бренд-Стратегия",
    description: "Создание уникального бренда, который запоминается аудитории.",
    features: [
      "Позиционирование",
      "Визуальная айдентика",
      "Гайдлайны бренда",
      "Сообщения",
      "Аудиты",
    ],
    color: "from-indigo-500 to-purple-600",
  },
];

const processPhases = [
  {
    number: "01",
    title: "Исследование",
    description: "Мы изучаем ваши цели, проблемы и аудиторию.",
    color: "bg-blue-500",
    colorDot: "bg-blue-400",
  },
  {
    number: "02",
    title: "Стратегия",
    description: "Мы планируем лучшее решение для вашего бизнеса.",
    color: "bg-violet-500",
    colorDot: "bg-violet-400",
  },
  {
    number: "03",
    title: "Реализация",
    description: "Мы создаём продукт с точностью и высоким качеством.",
    color: "bg-rose-500",
    colorDot: "bg-rose-400",
  },
  {
    number: "04",
    title: "Оптимизация",
    description: "Мы постоянно улучшаем и усиливаем результаты.",
    color: "bg-fuchsia-500",
    colorDot: "bg-fuchsia-400",
  },
];
export default {
  services,
  processPhases,
};
