import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/SEO";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent } from "../../components/ui/card";
import webImg from "../../assets/services/customwebapps.webp";

function getServiceContent(lang) {
  const dict = {
    en: {
      h1: "Custom Web Apps Service",
      heroTitle: "Build interactive systems that run your business",
      heroIntro:
        "At YELTU Agency, we design and develop custom web applications that solve real business problems. Unlike standard websites, our web apps are interactive systems built to improve efficiency, automate processes, and support scalability. Each solution is tailored to your workflows, helping your business operate smarter, faster, and more effectively.",

      sections: [
        {
          kicker: "What is a custom web application?",
          title: "What Is a Custom Web Application?",
          paragraphs: [
            "A custom web application is a software solution that runs in a web browser and is built for a specific business purpose. It allows users to log in, manage data, perform actions, and interact with the system in real time.",
            "Unlike ready-made platforms, a custom web application is designed around your company’s exact processes, ensuring it fits your operational needs rather than forcing you to adapt.",
          ],
        },
        {
          kicker: "Website vs web app",
          title: "How Are They Different from a Standard Website?",
          paragraphs: [
            "A standard website is mainly informational. It presents content such as company details, services, or articles, with limited user interaction.",
            "A custom web application, however, is functional and interactive. Users can enter data, manage accounts, track progress, and complete tasks.",
            "If the main value lies in performing actions rather than reading content, the solution is a web application, not a website.",
          ],
        },
        {
          kicker: "Web app vs native app",
          title: "Custom Web App vs. Mobile App (Native)",
          paragraphs: [
            "A native mobile app must be downloaded and developed separately for each platform, such as iOS or Android. A custom web application works directly in a browser and can be accessed from any device.",
            "This makes web apps easier to maintain, faster to update, and more cost-effective. For many businesses, a web app delivers the same functionality without the complexity of native app development.",
          ],
        },
        {
          kicker: "Business value",
          title: "Why Invest in a Custom Web Application?",
          paragraphs: [
            "A custom web application helps businesses increase efficiency by automating workflows, reducing manual work, and centralizing data. It offers full control over features, security, and scalability.",
            "Unlike subscription-based tools, a custom solution grows with your business and becomes a long-term digital asset rather than an ongoing limitation.",
          ],
        },
        {
          kicker: "Examples",
          title: "Real-World Examples: What Does a Custom Web App Look Like?",
          paragraphs: [
            "Custom web applications can include internal dashboards, booking and reservation systems, client portals, CRM platforms, reporting tools, and custom eCommerce systems.",
            "These applications are designed to handle daily operations, manage data, and support decision-making in a way that standard websites or off-the-shelf tools cannot.",
          ],
        },
        {
          kicker: "Project brief",
          title: "How to Write an Effective Project Brief (RFP)",
          paragraphs: [
            "An effective project brief clearly explains your business, the problem you want to solve, and who will use the application.",
            "It should outline required features, integrations with existing systems, and your expected timeline and budget.",
            "A clear brief helps ensure accurate planning, development efficiency, and successful project delivery.",
          ],
        },
      ],

      backlinksTitle: "Related links",
      backlinks: [
        { label: "Web Development", to: "/services/web-development" },
        { label: "All Services", to: "/services" },
        { label: "Contact", to: "/contact" },
      ],

      seoTitle: "Custom Web Applications | YELTU Agency",
      seoDesc:
        "Custom web application development by YELTU Agency: interactive systems that automate workflows, centralize data, and scale with your business.",
    },

    az: {
      h1: "Xüsusi Veb Tətbiqlər Xidməti",
      heroTitle: "Biznesinizi idarə edən interaktiv sistemlər qurun",
      heroIntro:
        "YELTU Agency olaraq real biznes problemlərini həll edən xüsusi veb tətbiqlər hazırlayırıq. Standart saytlardan fərqli olaraq, veb tətbiqlərimiz effektivliyi artıran, prosesləri avtomatlaşdıran və miqyaslana bilməni dəstəkləyən interaktiv sistemlərdir. Hər bir həll iş axınlarınıza uyğunlaşdırılır və biznesinizin daha ağıllı, daha sürətli və daha səmərəli işləməsinə kömək edir.",

      sections: [
        {
          kicker: "Xüsusi veb tətbiq nədir?",
          title: "Xüsusi Veb Tətbiq Nədir?",
          paragraphs: [
            "Xüsusi veb tətbiq brauzerdə işləyən və müəyyən biznes məqsədi üçün hazırlanan proqram həllidir. İstifadəçilər sistemə daxil ola, məlumatları idarə edə, əməliyyatlar icra edə və real vaxtda qarşılıqlı əlaqə qura bilirlər.",
            "Hazır platformalardan fərqli olaraq, xüsusi veb tətbiq şirkətinizin dəqiq prosesləri əsasında qurulur — yəni siz sistemi deyil, sistem sizi dəstəkləyir.",
          ],
        },
        {
          kicker: "Sayt vs veb tətbiq",
          title: "Standart Veb Saytdan Nə ilə Fərqlənir?",
          paragraphs: [
            "Standart veb sayt əsasən məlumat xarakterlidir. Şirkət, xidmətlər və ya məqalələr kimi kontenti təqdim edir və istifadəçi interaksiyası məhduddur.",
            "Xüsusi veb tətbiq isə funksional və interaktivdir. İstifadəçilər məlumat daxil edə, hesabları idarə edə, prosesləri izləyə və tapşırıqları tamamlayırlar.",
            "Əsas dəyər kontenti oxumaq deyil, əməliyyat icra etməkdirsə — bu artıq sayt yox, veb tətbiqdir.",
          ],
        },
        {
          kicker: "Veb tətbiq vs mobil tətbiq",
          title: "Xüsusi Veb Tətbiq vs. Mobil Tətbiq (Native)",
          paragraphs: [
            "Native mobil tətbiq yüklənməli və iOS/Android kimi hər platforma üçün ayrıca hazırlanmalıdır. Xüsusi veb tətbiq isə birbaşa brauzerdə işləyir və istənilən cihazdan açılır.",
            "Bu isə veb tətbiqləri daha asan saxlanılan, daha sürətli yenilənən və daha sərfəli edir. Bir çox biznes üçün veb tətbiq native inkişafın mürəkkəbliyi olmadan eyni funksionallığı verir.",
          ],
        },
        {
          kicker: "Biznes faydası",
          title: "Niyə Xüsusi Veb Tətbiqə İnvestisiya Etməlisiniz?",
          paragraphs: [
            "Xüsusi veb tətbiq iş axınlarını avtomatlaşdırmaqla, əl əməyini azaltmaqla və məlumatları mərkəzləşdirməklə səmərəliliyi artırır. Funksiyalar, təhlükəsizlik və miqyaslana bilmə üzərində tam nəzarət verir.",
            "Abunəlik əsaslı alətlərdən fərqli olaraq, xüsusi həll biznesinizlə birlikdə böyüyür və uzunmüddətli rəqəmsal aktivə çevrilir.",
          ],
        },
        {
          kicker: "Nümunələr",
          title: "Real Nümunələr: Xüsusi Veb Tətbiq Necə Görünür?",
          paragraphs: [
            "Xüsusi veb tətbiqlərə daxili idarəetmə panelləri, rezervasiya sistemləri, müştəri portalları, CRM platformaları, hesabat alətləri və xüsusi eCommerce sistemləri daxildir.",
            "Bu tətbiqlər gündəlik əməliyyatları idarə etmək, məlumatları toplamaq və qərarverməni dəstəkləmək üçün hazırlanır — standart sayt və ya hazır alətlərin edə bilmədiyi səviyyədə.",
          ],
        },
        {
          kicker: "Texniki tapşırıq",
          title: "Effektiv Layihə Brifi (RFP) Necə Yazılmalıdır?",
          paragraphs: [
            "Yaxşı layihə brifi biznesinizi, həll etmək istədiyiniz problemi və tətbiqdən kimlərin istifadə edəcəyini aydın izah edir.",
            "Tələb olunan funksiyalar, mövcud sistemlərlə inteqrasiyalar, gözlənilən zaman planı və büdcə qeyd olunmalıdır.",
            "Aydın brif planlamanı dəqiq edir, inkişaf prosesini sürətləndirir və layihənin uğurlu təhvilini təmin edir.",
          ],
        },
      ],

      backlinksTitle: "Faydalı keçidlər",
      backlinks: [
        { label: "Veb Proqramlaşdırma", to: "/services/web-development" },
        { label: "Bütün Xidmətlər", to: "/services" },
        { label: "Əlaqə", to: "/contact" },
      ],

      seoTitle: "Xüsusi Veb Tətbiqlər | YELTU Agency",
      seoDesc:
        "YELTU Agency ilə xüsusi veb tətbiq hazırlanması: proseslərin avtomatlaşdırılması, məlumatların mərkəzləşdirilməsi və biznesinizlə birlikdə miqyaslanan interaktiv sistemlər.",
    },

    ru: {
      h1: "Услуга разработки кастомных веб-приложений",
      heroTitle: "Создайте интерактивную систему для управления бизнесом",
      heroIntro:
        "В YELTU Agency мы проектируем и разрабатываем кастомные веб-приложения, которые решают реальные задачи бизнеса. В отличие от обычных сайтов, наши веб-приложения — это интерактивные системы для повышения эффективности, автоматизации процессов и масштабирования. Каждое решение создается под ваши рабочие процессы, чтобы бизнес работал быстрее, умнее и эффективнее.",

      sections: [
        {
          kicker: "Что такое веб-приложение?",
          title: "Что такое кастомное веб-приложение?",
          paragraphs: [
            "Кастомное веб-приложение — это программное решение, которое работает в браузере и создается под конкретную задачу бизнеса. Пользователи могут входить в систему, управлять данными, выполнять действия и взаимодействовать с сервисом в реальном времени.",
            "В отличие от готовых платформ, кастомное веб-приложение проектируется вокруг процессов вашей компании — оно подстраивается под вас, а не заставляет менять работу под шаблон.",
          ],
        },
        {
          kicker: "Сайт vs веб-приложение",
          title: "Чем оно отличается от обычного сайта?",
          paragraphs: [
            "Обычный сайт чаще всего информационный: он показывает контент — о компании, услугах или статьях — и имеет ограниченную интерактивность.",
            "Кастомное веб-приложение — функциональное и интерактивное. Пользователи вводят данные, управляют аккаунтами, отслеживают процессы и выполняют задачи.",
            "Если основная ценность в действиях, а не в чтении контента — вам нужно веб-приложение, а не сайт.",
          ],
        },
        {
          kicker: "Веб vs native",
          title: "Веб-приложение vs мобильное приложение (Native)",
          paragraphs: [
            "Нативное мобильное приложение нужно скачивать и разрабатывать отдельно под каждую платформу — iOS или Android. Кастомное веб-приложение работает в браузере и доступно с любого устройства.",
            "Это упрощает поддержку, ускоряет обновления и снижает стоимость. Для многих компаний веб-приложение дает ту же функциональность без сложности нативной разработки.",
          ],
        },
        {
          kicker: "Польза для бизнеса",
          title: "Зачем инвестировать в кастомное веб-приложение?",
          paragraphs: [
            "Кастомное веб-приложение повышает эффективность: автоматизирует процессы, уменьшает ручную работу и централизует данные. Оно дает полный контроль над функционалом, безопасностью и масштабированием.",
            "В отличие от подписочных инструментов, кастомное решение растет вместе с бизнесом и становится долгосрочным цифровым активом, а не постоянным ограничением.",
          ],
        },
        {
          kicker: "Примеры",
          title: "Примеры: как выглядит кастомное веб-приложение?",
          paragraphs: [
            "Это могут быть внутренние дашборды, системы бронирования, клиентские порталы, CRM-платформы, отчётные инструменты и кастомные eCommerce-системы.",
            "Такие приложения управляют ежедневными операциями, данными и поддерживают принятие решений — на уровне, недоступном стандартным сайтам и готовым решениям.",
          ],
        },
        {
          kicker: "ТЗ / RFP",
          title: "Как написать эффективный проектный бриф (RFP)?",
          paragraphs: [
            "Хороший бриф ясно описывает ваш бизнес, проблему, которую нужно решить, и пользователей системы.",
            "Укажите необходимые функции, интеграции с текущими сервисами, ожидаемые сроки и бюджет.",
            "Четкий бриф помогает точно спланировать работу, ускоряет разработку и повышает вероятность успешной сдачи проекта.",
          ],
        },
      ],

      backlinksTitle: "Полезные ссылки",
      backlinks: [
        { label: "Веб-разработка", to: "/services/web-development" },
        { label: "Все услуги", to: "/services" },
        { label: "Контакты", to: "/contact" },
      ],

      seoTitle: "Кастомные веб-приложения | YELTU Agency",
      seoDesc:
        "Разработка кастомных веб-приложений от YELTU Agency: автоматизация процессов, централизованные данные и масштабируемые интерактивные системы для бизнеса.",
    },
  };

  return dict[lang] || dict.en;
}

export default function CustomWebAppsPage() {
  const { language } = useLanguage();
  const location = useLocation();

  const t = useMemo(() => getServiceContent(language), [language]);

  const canonicalPath =
    language === "en"
      ? "/services/web-development/custom-web-apps"
      : `/${language}/services/web-development/custom-web-apps`;

  const pageUrl = `https://yeltu.com${canonicalPath}`;

  const servicesUrl =
    language === "en"
      ? "https://yeltu.com/services"
      : `https://yeltu.com/${language}/services`;

  const parentUrl =
    language === "en"
      ? "https://yeltu.com/services/web-development"
      : `https://yeltu.com/${language}/services/web-development`;

  const breadcrumbs = [
    {
      name: language === "az" ? "Xidmətlər" : language === "ru" ? "Услуги" : "Services",
      item: servicesUrl,
    },
    {
      name: language === "az" ? "Veb Proqramlaşdırma" : language === "ru" ? "Веб-разработка" : "Web Development",
      item: parentUrl,
    },
    { name: t.h1, item: pageUrl },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${t.h1} – YELTU Agency`,
      description: t.seoDesc,
      url: pageUrl,
      inLanguage: language,
      provider: {
        "@type": "Organization",
        name: "YELTU Agency",
        url: "https://yeltu.com",
      },
      areaServed: "AZ",
      serviceType: "Custom Web Application Development",
    },
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
    <main className="min-h-screen bg-slate-900 smooth-fade" role="main" aria-label="Custom Web Apps Page">
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        canonical={canonicalPath}
        image={webImg}
        lang={language}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Card className="group relative bg-white/95 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-500 to-blue-600" aria-hidden="true" />
            <CardContent className="relative p-7 md:p-10 grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">{t.h1}</h1>
                <p className="mt-3 text-lg font-semibold text-slate-900">{t.heroTitle}</p>

                <p className="mt-4 text-slate-600 leading-relaxed">{t.heroIntro}</p>

                <div className="mt-7">
                  <p className="text-sm font-semibold text-slate-900 mb-3">{t.backlinksTitle}</p>
                  <div className="flex flex-wrap gap-3">
                    {t.backlinks.map((b) => (
                      <Link
                        key={b.to}
                        to={withLang(b.to)}
                        className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 hover:shadow-md transition"
                      >
                        {b.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <img src={webImg} alt={t.h1} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 space-y-8">
          {t.sections.map((s) => (
            <Card
              key={s.title}
              className="group relative bg-white/95 rounded-3xl border border-slate-200 hover:shadow-2xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-all"
                aria-hidden="true"
              />
              <CardContent className="relative p-7 md:p-9">
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{s.kicker}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{s.title}</h2>

                <div className="mt-4 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* FINAL BACKLINKS */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={withLang("/services/web-development")}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-95 transition"
            >
              {language === "az"
                ? "Veb Proqramlaşdırmaya qayıt"
                : language === "ru"
                ? "Назад к веб-разработке"
                : "Back to Web Development"}
            </Link>

            <Link
              to={withLang("/contact")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 hover:shadow-md transition"
            >
              {language === "az" ? "Layihəni müzakirə edək" : language === "ru" ? "Обсудить проект" : "Discuss a project"}
            </Link>

            <Link
              to={withLang("/services")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-900 hover:shadow-md transition"
            >
              {language === "az" ? "Bütün xidmətlər" : language === "ru" ? "Все услуги" : "All services"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}