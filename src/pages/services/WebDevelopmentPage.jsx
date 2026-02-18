import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/SEO";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent } from "../../components/ui/card";
import webImg from "../../assets/services/webdevelopment.webp";
// Icons for the pillars (Imported but not used in render per previous request to remove icons, kept for safety or can be removed if strictly cleaning up)
import { Code2, ShoppingBag, Globe, Share2, Zap } from "lucide-react";

function getServiceContent(lang) {
  const dict = {
    en: {
      h1: "Website Development Services",
      heroTitle: "Grow your web presence with YELTU Agency",
      heroIntro:
        "A high-performing website is more than just a digital storefront — it’s the foundation of your online success. At YELTU Agency, we provide comprehensive website development services designed to meet your business needs and strengthen your brand’s digital presence.",
      heroIntro2:
        "Whether you need a custom-built website, mobile-friendly functionality, or continuous technical support, our experienced team ensures your website performs smoothly while delivering an excellent user experience.",

      // Pillars
      pillarsTitle: "Specialized Solutions",
      pillars: [
        { label: "Custom Web Apps", to: "/services/web-development/custom-web-apps" },
        { label: "E-commerce", to: "/services/web-development/ecommerce" },
        { label: "Business Websites", to: "/services/web-development/business-websites" },
        { label: "API Integration", to: "/services/web-development/api-integration" },
        { label: "Performance", to: "/services/web-development/performance-optimization" },
      ],

      sections: [
        {
          kicker: "How website development builds a business",
          title: "How website development builds a business",
          paragraphs: [
            "Your website is often the first point of contact between your brand and potential customers. That’s why making a strong first impression is critical. YELTU Agency’s website development services focus on creating reliable, modern, and user-friendly websites that build trust and credibility from the very first visit.",
            "Our development solutions are built to improve usability, enhance performance, and increase conversions — helping your business stand out in a competitive digital environment.",
            "Beyond visual appeal, we focus on speed, responsiveness, scalability, and long-term growth. By working with YELTU Agency, you get a website that is not only attractive but also strategically developed to deliver real business results and adapt to evolving digital trends.",
          ],
        },
        {
          kicker: "Our web development services",
          title: "Our web development services",
          paragraphs: [
            "We offer a full range of website development solutions covering performance, functionality, security, and scalability — ensuring your website grows alongside your business.",
          ],
        },
        {
          kicker: "Strategic web solutions",
          title: "Results-driven website development services",
          paragraphs: [
            "At YELTU Agency, we don’t just build websites — we create digital solutions that drive measurable results. From strengthening brand identity to improving operational efficiency and maximizing ROI, our development services are aligned with your business goals.",
            "Our strategic, results-oriented approach is supported by practical experience and proven methodologies. Every project is developed with long-term success in mind, ensuring your digital presence delivers consistent value.",
            "Partnering with YELTU Agency means working with a dedicated team that aligns every development decision with your growth strategy. We are committed to innovation, quality, and measurable outcomes.",
          ],
        },
        {
          kicker: "Why YELTU Agency?",
          title: "Why choose YELTU Agency as your web development partner?",
          paragraphs: [
            "YELTU Agency combines technical expertise with a client-focused approach to build websites that truly support your business. Our end-to-end development process ensures your website is optimized for performance, scalability, and security from start to finish.",
            "We handle everything — from planning and development to optimization and ongoing support — so you can focus on growing your business. With cross-platform expertise and a collaborative workflow, we deliver solutions tailored to your industry, audience, and objectives.",
            "Whether you are launching a new website, redesigning an existing one, or enhancing functionality, YELTU Agency is committed to delivering measurable digital success that empowers your brand.",
          ],
        },
      ],

      ecommerceTitle: "Custom eCommerce website development",
      ecommerceParas: [
        "YELTU Agency integrates essential features such as advanced product search, detailed product information, seamless order processing, and secure transactional systems into eCommerce website design to deliver a high-quality online shopping experience.",
        "We have refined our expertise in custom eCommerce website development to support a wide range of business models, providing scalable, mobile-friendly, and performance-driven solutions tailored to each client’s needs.",
        "YELTU Agency specializes in custom eCommerce website development, integrating essential features such as advanced product search, detailed product pages, streamlined order processing, and secure payment and transactional systems. Our eCommerce website design solutions are built to deliver a fast, intuitive, and high-quality online shopping experience that increases conversions and customer satisfaction.",
        "We have refined our expertise to support all types of business models, from startups to enterprise-level online stores. Every eCommerce website we develop is mobile-friendly, scalable, SEO-ready, and performance-driven, ensuring your online store ranks well in search engines and performs seamlessly across desktop, tablet, and mobile devices.",
      ],

      seoTitle: "Website Development Services | Yeltu Agency",
      seoDesc:
        "Website development by YELTU Agency: high-performing websites, scalable solutions, and custom eCommerce development with secure payments, fast UX, and mobile-friendly performance.",
    },

    az: {
      h1: "Veb Sayt Hazırlanması Xidmətləri",
      heroTitle: "YELTU Agency ilə veb mövcudluğunuzu gücləndirin",
      heroIntro:
        "Yüksək performanslı veb sayt təkcə rəqəmsal vitrindən ibarət deyil — o, onlayn uğurunuzun təməlidir. YELTU Agency olaraq, biznes ehtiyaclarınıza uyğun və brendinizin rəqəmsal mövcudluğunu gücləndirən hərtərəfli veb sayt hazırlanması xidmətləri təqdim edirik.",
      heroIntro2:
        "İstər sıfırdan xüsusi sayt, istər mobil uyğun funksionallıq, istərsə də davamlı texniki dəstək lazım olsun — təcrübəli komandamız saytınızın stabil işləməsini təmin edir və mükəmməl istifadəçi təcrübəsi yaradır.",

      pillarsTitle: "İxtisaslaşdırılmış Həllər",
      pillars: [
        { label: "Xüsusi Veb Tətbiqlər", to: "/services/web-development/custom-web-apps" },
        { label: "E-ticarət", to: "/services/web-development/ecommerce" },
        { label: "Biznes Saytları", to: "/services/web-development/business-websites" },
        { label: "API İnteqrasiyası", to: "/services/web-development/api-integration" },
        { label: "Optimizasiya", to: "/services/web-development/performance-optimization" },
      ],

      sections: [
        {
          kicker: "Veb sayt hazırlanması biznesi necə böyüdür",
          title: "Veb sayt hazırlanması biznesi necə böyüdür",
          paragraphs: [
            "Veb saytınız çox vaxt brendinizlə potensial müştərilər arasındakı ilk təmas nöqtəsidir. Buna görə də ilk təəssüratın güclü olması çox vacibdir. YELTU Agency-nin veb sayt hazırlanması xidmətləri ilk ziyarətdən etibarən etibar və güvən yaradan, müasir, etibarlı və istifadəçi dostu saytların hazırlanmasına fokuslanır.",
            "Hazırladığımız həllər istifadə rahatlığını artırmaq, performansı yaxşılaşdırmaq və konversiyanı yüksəltmək üçün qurulur — beləliklə biznesiniz rəqabətli rəqəmsal mühitdə daha çox seçilir.",
            "Vizual görünüşdən əlavə, biz sürət, responsivlik, miqyaslana bilmə və uzunmüddətli böyüməyə önəm veririk. YELTU Agency ilə işlədikdə, siz təkcə gözəl görünən deyil, həm də real biznes nəticələri gətirən və rəqəmsal trendlərə uyğun inkişaf edən strateji sayt əldə edirsiniz.",
          ],
        },
        {
          kicker: "Veb inkişaf xidmətlərimiz",
          title: "Veb inkişaf xidmətlərimiz",
          paragraphs: [
            "Biz performans, funksionallıq, təhlükəsizlik və miqyaslana bilmə üzrə tam spektrli veb sayt hazırlanması həlləri təqdim edirik — saytınızın biznesinizlə birlikdə böyüməsini təmin edirik.",
          ],
        },
        {
          kicker: "Strateji veb həllər",
          title: "Nəticə yönümlü veb sayt hazırlanması xidmətləri",
          paragraphs: [
            "YELTU Agency-də biz sadəcə sayt hazırlamırıq — ölçülə bilən nəticələr verən rəqəmsal həllər yaradırıq. Brend identikliyini gücləndirməkdən əməliyyat səmərəliliyini artırmağa və ROI-ni maksimumlaşdırmağa qədər, inkişaf xidmətlərimizi biznes hədəflərinizə uyğunlaşdırırıq.",
            "Strateji və nəticə yönümlü yanaşmamız praktiki təcrübə və yoxlanmış metodologiyalarla dəstəklənir. Hər bir layihə uzunmüddətli uğur üçün hazırlanır ki, rəqəmsal mövcudluğunuz davamlı dəyər yaratsın.",
            "YELTU Agency ilə tərəfdaşlıq etdikdə, inkişaf qərarlarını böyümə strategiyanızla uyğunlaşdıran xüsusi komanda ilə işləyirsiniz. Biz innovasiya, keyfiyyət və ölçülə bilən nəticələrə sadiqik.",
          ],
        },
        {
          kicker: "Niyə YELTU Agency?",
          title: "Niyə veb inkişaf tərəfdaşı olaraq YELTU Agency-ni seçməlisiniz?",
          paragraphs: [
            "YELTU Agency texniki ekspertizanı müştəriyönümlü yanaşma ilə birləşdirərək biznesinizi həqiqətən dəstəkləyən saytlar hazırlayır. Ucdan-uca prosesimiz planlama, inkişaf, optimizasiya və təhlükəsizlik üzrə bütün mərhələləri əhatə edir.",
            "Biz hər şeyi idarə edirik — planlama və inkişafdan tutmuş optimizasiya və davamlı dəstəyə qədər — siz isə biznesinizi böyütməyə fokuslana bilərsiniz. Kross-platform təcrübə və əməkdaşlığa əsaslanan iş axını ilə sənayenizə, auditoriyanıza və məqsədlərinizə uyğun həllər təqdim edirik.",
            "İstər yeni sayt açın, istər mövcud saytı yeniləyin, istərsə də funksionallığı artırın — YELTU Agency brendinizi gücləndirən ölçülə bilən rəqəmsal uğur təqdim etməyə sadiqdir.",
          ],
        },
      ],

      ecommerceTitle: "Xüsusi eCommerce sayt hazırlanması",
      ecommerceParas: [
        "YELTU Agency eCommerce sayt dizaynında yüksək keyfiyyətli onlayn alış-veriş təcrübəsi yaratmaq üçün inkişaf etmiş məhsul axtarışı, detallı məhsul məlumatları, problemsiz sifariş emalı və təhlükəsiz tranzaksiya sistemləri kimi əsas funksiyaları inteqrasiya edir.",
        "Biz fərqli biznes modellərini dəstəkləmək üçün xüsusi eCommerce sayt hazırlanması üzrə ekspertizamızı inkişaf etdirmişik və hər bir müştərinin ehtiyacına uyğun miqyaslana bilən, mobil uyğun və performans yönümlü həllər təqdim edirik.",
        "YELTU Agency xüsusi eCommerce sayt hazırlanmasında ixtisaslaşır: inkişaf etmiş məhsul axtarışı, detallı məhsul səhifələri, sadələşdirilmiş sifariş prosesi və təhlükəsiz ödəniş/tranzaksiya sistemlərini inteqrasiya edirik. eCommerce dizayn həllərimiz sürətli, intuitiv və yüksək keyfiyyətli alış-veriş təcrübəsi yaradaraq konversiyanı və müştəri məmnuniyyətini artırır.",
        "Startaplardan enterprise səviyyəli onlayn mağazalara qədər bütün modelləri dəstəkləyirik. Hazırladığımız hər bir eCommerce sayt mobil uyğundur, miqyaslana bilir, SEO-ya hazırdır və performans yönümlüdür — mağazanızın axtarış nəticələrində yaxşı sıralanmasına və bütün cihazlarda problemsiz işləməsinə kömək edir.",
      ],

      seoTitle: "Veb Sayt Hazırlanması | Yeltu Agency",
      seoDesc:
        "YELTU Agency veb sayt hazırlanması: yüksək performanslı saytlar, miqyaslana bilən həllər və təhlükəsiz ödənişli, mobil uyğun, sürətli eCommerce inkişafı.",
    },

    ru: {
      h1: "Услуги разработки сайтов",
      heroTitle: "Развивайте онлайн-присутствие вместе с YELTU Agency",
      heroIntro:
        "Высокопроизводительный сайт — это не просто цифровая витрина, а фундамент вашего онлайн-успеха. В YELTU Agency мы предоставляем комплексные услуги по разработке сайтов, чтобы закрыть потребности бизнеса и усилить цифровое присутствие вашего бренда.",
      heroIntro2:
        "Нужен сайт «с нуля», адаптация под мобильные устройства или постоянная техническая поддержка — наша команда обеспечивает стабильную работу сайта и отличный пользовательский опыт.",

      pillarsTitle: "Специализированные Решения",
      pillars: [
        { label: "Веб-приложения", to: "/services/web-development/custom-web-apps" },
        { label: "E-commerce", to: "/services/web-development/ecommerce" },
        { label: "Бизнес Сайты", to: "/services/web-development/business-websites" },
        { label: "Интеграция API", to: "/services/web-development/api-integration" },
        { label: "Оптимизация", to: "/services/web-development/performance-optimization" },
      ],

      sections: [
        {
          kicker: "Как разработка сайта помогает бизнесу",
          title: "Как разработка сайта помогает бизнесу",
          paragraphs: [
            "Ваш сайт часто становится первой точкой контакта между брендом и потенциальными клиентами. Поэтому сильное первое впечатление критически важно. Услуги YELTU Agency по разработке сайтов ориентированы на создание надежных, современных и удобных решений, которые формируют доверие с первого визита.",
            "Наши решения улучшают удобство использования, повышают производительность и увеличивают конверсию — помогая вашему бизнесу выделяться в конкурентной цифровой среде.",
            "Помимо визуальной части мы уделяем внимание скорости, адаптивности, масштабируемости и долгосрочному росту. Работая с YELTU Agency, вы получаете не только красивый, но и стратегически продуманный сайт, который приносит бизнес-результат и развивается вместе с трендами.",
          ],
        },
        {
          kicker: "Наши услуги",
          title: "Наши услуги веб-разработки",
          paragraphs: [
            "Мы предлагаем полный спектр решений по разработке сайтов — производительность, функциональность, безопасность и масштабируемость — чтобы ваш сайт рос вместе с бизнесом.",
          ],
        },
        {
          kicker: "Стратегические веб-решения",
          title: "Разработка сайтов, ориентированная на результат",
          paragraphs: [
            "В YELTU Agency мы не просто делаем сайты — мы создаем цифровые решения, которые дают измеримые результаты. От усиления бренда до повышения эффективности процессов и максимизации ROI — наша разработка всегда связана с целями вашего бизнеса.",
            "Наш подход опирается на практический опыт и проверенные методологии. Каждый проект строится с прицелом на долгосрочный успех, чтобы ваше онлайн-присутствие приносило стабильную ценность.",
            "Партнерство с YELTU Agency — это работа с командой, которая выстраивает каждое техническое решение в соответствии со стратегией роста. Мы ориентированы на инновации, качество и измеримый эффект.",
          ],
        },
        {
          kicker: "Почему YELTU Agency?",
          title: "Почему стоит выбрать YELTU Agency как партнера по веб-разработке?",
          paragraphs: [
            "YELTU Agency сочетает техническую экспертизу и клиентоориентированный подход, создавая сайты, которые действительно поддерживают ваш бизнес. Наш полный цикл разработки обеспечивает оптимизацию по производительности, масштабируемости и безопасности на каждом этапе.",
            "Мы берем на себя всё — от планирования и разработки до оптимизации и поддержки — чтобы вы могли сосредоточиться на росте бизнеса. Благодаря кроссплатформенной экспертизе и совместной работе мы создаем решения под вашу отрасль, аудиторию и задачи.",
            "Запускаете новый сайт, делаете редизайн или расширяете функциональность — YELTU Agency нацелено на измеримый цифровой успех, который усиливает ваш бренд.",
          ],
        },
      ],

      ecommerceTitle: "Индивидуальная разработка eCommerce-сайтов",
      ecommerceParas: [
        "YELTU Agency интегрирует ключевые функции в eCommerce-дизайн: продвинутый поиск товаров, подробную информацию о продукте, удобную обработку заказов и безопасные транзакционные системы — чтобы обеспечить качественный онлайн-шопинг.",
        "Мы развили экспертизу в кастомной разработке eCommerce-сайтов для широкого спектра бизнес-моделей, предлагая масштабируемые, адаптивные и производительные решения под задачи каждого клиента.",
        "YELTU Agency специализируется на разработке eCommerce-сайтов под ключ: продвинутый поиск, детальные карточки товаров, упрощенный процесс заказа, безопасные платежи и транзакции. Наши решения обеспечивают быстрый, интуитивный опыт покупок, повышая конверсию и удовлетворенность клиентов.",
        "Мы поддерживаем любые модели — от стартапов до enterprise-магазинов. Каждый eCommerce-сайт, который мы создаем, адаптивный, масштабируемый, SEO-готовый и ориентирован на производительность — чтобы ваш магазин хорошо ранжировался и стабильно работал на десктопе, планшете и смартфоне.",
      ],

      seoTitle: "Разработка сайтов | Yeltu Agency",
      seoDesc:
        "Разработка сайтов от YELTU Agency: производительные решения, масштабируемая архитектура и кастомная разработка eCommerce с безопасными платежами, быстрым UX и адаптацией под мобильные устройства.",
    },
  };

  return dict[lang] || dict.en;
}

export default function WebDevelopmentPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const t = useMemo(() => getServiceContent(language), [language]);

  const baseUrl = "https://yeltu.com";

  const canonicalPath =
    language === "en"
      ? "/services/web-development"
      : `/${language}/services/web-development`;

  const pageUrl = `${baseUrl}${canonicalPath}`;

  const servicesUrl =
    language === "en"
      ? `${baseUrl}/services`
      : `${baseUrl}/${language}/services`;

  // Keywords per language (kept realistic and not spammy)
  const keywordsByLang = {
    en: [
      "website development",
      "web development agency",
      "custom website development",
      "business website",
      "ecommerce website development",
      "responsive web design",
      "website maintenance",
      "performance optimization",
      "API integration",
      "Yeltu Agency",
      "Baku web development",
      "Azerbaijan web development",
    ],
    az: [
      "veb sayt hazırlanması",
      "veb inkişaf",
      "xüsusi veb sayt",
      "biznes saytı",
      "e-ticarət sayt hazırlanması",
      "responsiv dizayn",
      "sayt dəstəyi",
      "performans optimizasiyası",
      "API inteqrasiyası",
      "Yeltu Agency",
      "Bakı veb inkişaf",
      "Azərbaycan veb inkişaf",
    ],
    ru: [
      "разработка сайтов",
      "веб разработка",
      "создание сайта",
      "корпоративный сайт",
      "разработка интернет-магазина",
      "адаптивный сайт",
      "поддержка сайта",
      "оптимизация скорости",
      "интеграция API",
      "Yeltu Agency",
      "веб разработка Баку",
      "веб разработка Азербайджан",
    ],
  };

  const keywords = (keywordsByLang[language] || keywordsByLang.en).join(", ");

  // Breadcrumbs
  const breadcrumbs = [
    {
      name: language === "az" ? "Xidmətlər" : language === "ru" ? "Услуги" : "Services",
      item: servicesUrl,
    },
    {
      name: t.h1,
      item: pageUrl,
    },
  ];

  // JSON-LD (array supported by your SEO.jsx)
  const jsonLd = [
    // Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "YELTU Agency",
      url: baseUrl,
      logo: `${baseUrl}/logo.webp`,
      sameAs: [
        "https://instagram.com/yeltu",
        "https://linkedin.com/company/yeltu",
      ],
    },

    // Website
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "YELTU Agency",
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: language,
    },

    // WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: t.seoTitle,
      description: t.seoDesc,
      inLanguage: language,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${pageUrl}#service` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${baseUrl}${String(webImg).startsWith("/") ? "" : "/"}${webImg}`,
      },
    },

    // Service
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: `${t.h1} – YELTU Agency`,
      description: t.seoDesc,
      url: pageUrl,
      inLanguage: language,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "Azerbaijan",
      },
      serviceType: "Website Development",
    },

    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        item: b.item,
      })),
    },
  ];

  const withLang = (to) => {
    if (to.startsWith("http")) return to;
    if (language === "en") return to;
    return `/${language}${to === "/" ? "" : to}`;
  };

  return (
    <main
      className="min-h-screen bg-white smooth-fade relative overflow-hidden"
      role="main"
      aria-label="Web Development Page"
    >
      {/* Background aurora-style pulses */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/5 blur-[120px] rounded-full" />
      </div>

      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        canonical={canonicalPath}
        image={webImg}
        lang={language}
        meta={[
          { name: "keywords", content: keywords },
        ]}
        jsonLd={jsonLd}
      />

      {/* HERO SECTION - Light Blue Theme (bg-blue-50) */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="bg-blue-50 shadow-none border-none rounded-[3rem] overflow-hidden">
            <CardContent className="p-8 md:p-14 lg:p-16 grid gap-12 lg:grid-cols-12 items-center">
              {/* Text Side - Adjusted to 6 columns */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                    {t.h1}
                  </h1>
                  <p className="mt-4 text-lg font-medium text-blue-600 tracking-wide">
                    {t.heroTitle}
                  </p>
                </div>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>{t.heroIntro}</p>
                  <p>{t.heroIntro2}</p>
                </div>
              </div>

              {/* Image Box - Adjusted to 6 columns (Balanced with text) */}
              <div className="lg:col-span-6 relative flex justify-end">
                <div className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl">
                  <img
                    src={webImg}
                    alt={t.h1}
                    className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PILLARS - Enhanced Visibility & Animation */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.pillars?.map((p) => (
              <Link
                key={p.to}
                to={withLang(p.to)}
                className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase text-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                  {p.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {t.sections.map((s) => (
            <Card
              key={s.title}
              className="group bg-white rounded-[3rem] border border-slate-100 p-10 md:p-14 hover:bg-blue-50/40 transition-all duration-700 shadow-sm"
            >
              <CardContent className="p-0">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  {s.title}
                </h2>
                <div className="mt-10">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-500 text-lg leading-relaxed font-light max-w-5xl mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* ECOMMERCE SECTION */}
          <Card className="group bg-white rounded-[3rem] border border-slate-100 p-10 md:p-14 hover:bg-blue-50/40 transition-all duration-700 shadow-sm">
            <CardContent className="p-0">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {t.ecommerceTitle}
              </h2>
              <div className="mt-10">
                {t.ecommerceParas.map((p, i) => (
                  <p key={i} className="text-slate-500 text-lg leading-relaxed font-light max-w-5xl mb-4">
                    {p}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16">
            <Link
              to={withLang("/contact")}
              className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-[0_15px_30px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              {language === "az" ? "Layihəni müzakirə edək" : language === "ru" ? "Обсудить проект" : "Discuss a project"}
            </Link>
            <Link
              to={withLang("/services")}
              className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-sm"
            >
              {language === "az" ? "Xidmətlərə qayıt" : language === "ru" ? "Назад к услугам" : "Back to services"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}