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
    title: "Web Development",
    description:
      "Build powerful, scalable web applications using modern frameworks.",
    features: [
      "Custom web apps",
      "E-commerce",
      "PWAs",
      "API integration",
      "Performance optimization",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native & cross-platform mobile apps with incredible speed and UX.",
    features: [
      "iOS & Android",
      "Cross-platform",
      "UI/UX design",
      "Store optimization",
      "Maintenance",
    ],
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centric, stunning designs backed by strategy and research.",
    features: [
      "Personas",
      "Wireframing",
      "Design systems",
      "Responsive design",
      "Usability testing",
    ],
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Increase rankings and drive organic traffic.",
    features: [
      "Keyword research",
      "On-page SEO",
      "Technical audits",
      "Backlinks",
      "Analytics",
    ],
    color: "from-blue-500 to-violet-600",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Engage audiences and grow your brand presence.",
    features: [
      "Content creation",
      "Community management",
      "Advertising",
      "Analytics",
      "Influencers",
    ],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Briefcase,
    title: "Brand Strategy",
    description: "Define a brand identity that your audience remembers.",
    features: [
      "Positioning",
      "Visual identity",
      "Brand guidelines",
      "Messaging",
      "Audits",
    ],
    color: "from-indigo-500 to-purple-600",
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
