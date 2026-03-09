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
    title: "Web Development",
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    path: "/services/web-development",
    description: "Build powerful, scalable web solutions tailored to your business goals.",
    features: [
      {
        label: "Custom web apps",
        path: "/services/web-development/custom-web-apps",
      },
      {
        label: "Business websites",
        path: "/services/web-development/business-websites",
      },
      {
        label: "E-commerce websites",
        path: "/services/web-development/ecommerce",
      },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    path: "/services/mobile-app-development",
    description: "Native and cross-platform mobile apps designed for performance and usability.",
    features: [
      {
        label: "iOS & Android",
        path: "/services/mobile-app-development/ios-android-app-development",
      },
      {
        label: "Cross Platform",
        path: "/services/mobile-app-development/cross-platform-app-development",
      },
      {
        label: "App Store Optimization",
        path: "/services/mobile-app-development/app-store-optimization",
      },
    ],
  },
  {
    title: "Brand Strategy",
    icon: Target,
    color: "from-violet-500 to-purple-600",
    path: "/services/brand-strategy",
    description:
      "Strategic brand positioning that helps your business communicate clearly and grow with consistency.",
    features: [],
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    color: "from-pink-500 to-rose-600",
    path: "/services/digital-marketing",
    description:
      "Integrated digital marketing services built to increase visibility, traffic, and conversions.",
    features: [
      { label: "SEO", path: "/services/digital-marketing/seo" },
      { label: "SEM", path: "/services/digital-marketing/sem" },
      { label: "SMM", path: "/services/digital-marketing/smm" },
      { label: "Design", path: "/services/digital-marketing/design" },
    ],
  },
];

const processPhases = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your goals, challenges and audience.",
    color: "bg-blue-500",
    colorDot: "bg-blue-400"
  },
  {
    number: "02",
    title: "Strategy",
    description: "We plan the best solution for your business.",
    color: "bg-violet-500",
    colorDot: "bg-violet-400"
  },
  {
    number: "03",
    title: "Execution",
    description: "We build everything with precision and quality.",
    color: "bg-rose-500",
    colorDot: "bg-rose-400"
  },
    {
    number: "04",
    title: "Optimization",
    description: "We refine, improve, and grow results continuously.",
    color: "bg-fuchsia-500",
    colorDot: "bg-fuchsia-400"
  }
];

export default {
  services,
  processPhases,
};
