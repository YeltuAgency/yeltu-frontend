import { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Instagram,
  Dribbble,
  MessageCircle,
  Clock,
  Globe,
  ArrowRight,
  Facebook,
} from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import AnimatedCard from "./AnimatedCard";
import { useLanguage } from "../contexts/LanguageContext";
import SEO from "./SEO";

// GTM safe helper
const pushToDataLayer = (eventName, params = {}) => {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...params });
};

export default function ContactPage() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) return;

    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lang: language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      pushToDataLayer("contact_submit", {
        lang: t("langCode"),
        form_name: "contact_main",
        page_path:
          typeof window !== "undefined"
            ? window.location.pathname
            : "/contact",
      });

      const toast = document.createElement("div");
      toast.className =
        "fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-3 rounded-xl shadow-xl animate-fade-up z-[9999]";
      toast.innerText = t("contact.form.success.title");
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);

      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      pushToDataLayer("contact_error", {
        lang: t("langCode"),
        message: err.message,
      });

      alert(err.message);
    }
  };

  const handleWhatsApp = () => {
    const phone = "994103240782";
    const message = encodeURIComponent(t("contact.whatsappMessage"));

    pushToDataLayer("whatsapp_click", {
      lang: t("langCode"),
      target: "contact_whatsapp_button",
      page_path:
        typeof window !== "undefined"
          ? window.location.pathname
          : "/contact",
    });

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // Memoized data
  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        label: t("contact.cards.email.label"),
        value: t("contact.cards.email.value"),
        link: `mailto:${t("contact.cards.email.value")}`,
      },
      {
        icon: Phone,
        label: t("contact.cards.phone.label"),
        value: t("contact.cards.phone.value"),
        link: `tel:${t("contact.cards.phone.value")}`,
      },
      {
        icon: MapPin,
        label: t("contact.cards.location.label"),
        value: t("contact.cards.location.value"),
        link: null,
      },
      {
        icon: Clock,
        label: t("contact.cards.hours.label"),
        value: t("contact.cards.hours.value"),
        link: null,
      },
    ],
    [t]
  );

  const socialLinks = useMemo(
    () => [
      {
        icon: Linkedin,
        name: "LinkedIn",
        href: "#",
      },
      {
        icon: Instagram,
        name: "Instagram",
        href: "https://www.instagram.com/yeltuagency/",
      },
      {
        icon: Facebook,
        name: "Facebook",
        href: "https://www.facebook.com/YeltuAgency",
      },
    ],
    [t]
  );

  const seo = {
    title: t("contact.seo.title"),
    description: t("contact.seo.description"),
    image: "/og-contact.jpg",
    url: "https://yeltu.com/contact",
  };

  return (
    <div className="bg-slate-900 text-white">
      <SEO {...seo} />

      {/* MAIN CONTENT WRAPPER */}
      <main id="main-content" role="main" tabIndex={-1}>
        {/* HERO */}
        <header
          className="relative overflow-hidden text-white min-h-[50vh] flex items-center hero-bg"
          aria-labelledby="contact-title"
        >
          {/* Background Grid */}
          <div aria-hidden="true" className="absolute inset-0 hero-grid" />

          {/* Floating Background Blobs */}
          <div
            className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/35 blur-[160px]"
            aria-hidden="true"
          />
          <div
            className="absolute top-40 left-0 w-[320px] h-[320px] bg-indigo-500/30 blur-[130px]"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative text-center max-w-7xl mx-auto px-4 z-10">

            <span
              className="inline-block mb-6 px-5 py-2 bg-white/10 border border-white/15 backdrop-blur-xl rounded-full fade-in-1"
              aria-hidden="true"
            >
              💬 {t("contact.tag")}
            </span>

            <h1
              id="contact-title"
              className="text-5xl md:text-7xl font-extrabold fade-in-2"
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 40%, #7c3aed 70%, #6d28d9 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("contact.title")}
            </h1>

            <p className="max-w-3xl mx-auto text-blue-100 text-lg fade-in-3">
              {t("contact.subtitle")}
            </p>
          </div>
        </header>

        {/* CONTACT CARDS */}
        <section
          className="py-20 bg-gradient-to-b from-white via-slate-50 to-white"
          aria-labelledby="contact-info-heading"
        >
          <h2 id="contact-info-heading" className="sr-only">
            {t("contact.cards.heading") || "Contact details"}
          </h2>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.1}
                className="group bg-white/80 border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-3xl"
                role="region"
                aria-label={info.label}
              >
                <CardContent className="p-8 text-center space-y-3">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    <info.icon size={28} className="text-white" />
                  </div>

                  <div className="text-slate-500">{info.label}</div>

                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-slate-900 font-medium hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label={`${info.label}: ${info.value}`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-slate-900 font-medium">
                      {info.value}
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section
          className="py-20 bg-gradient-to-b from-white via-slate-50 to-white"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
            {/* LEFT CONTENT */}
            <div>
              <h2
                id="contact-form-heading"
                className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text"
              >
                {t("contact.form.title")}
              </h2>

              <p className="text-slate-600 mb-8">
                {t("contact.form.subtitle")}
              </p>

              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="w-full mb-10 bg-[#25D366] text-white hover:bg-[#1ebe5c] shadow-xl rounded-2xl"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={20} className="mr-2" />
                {t("contact.whatsapp")}
              </Button>

              {/* WHY US */}
              <div className="space-y-4" role="list">
                <Card className="border border-slate-200 hover:border-blue-400 rounded-3xl transition-all">
                  <CardContent className="p-6 flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shadow"
                      aria-hidden="true"
                    >
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-semibold">
                        {t("contact.why.fast.title")}
                      </h3>
                      <p className="text-slate-600">
                        {t("contact.why.fast.description")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200 hover:border-violet-400 rounded-3xl transition-all">
                  <CardContent className="p-6 flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow"
                      aria-hidden="true"
                    >
                      <Globe size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-semibold">
                        {t("contact.why.global.title")}
                      </h3>
                      <p className="text-slate-600">
                        {t("contact.why.global.description")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SOCIAL LINKS */}
              <h3 className="mt-12 mb-4 text-slate-900 font-semibold">
                {t("contact.socials.title")}
              </h3>

              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${s.name} page`}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <s.icon size={22} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* FORM */}
            <Card className="border border-slate-200 rounded-3xl shadow-lg">
              <CardContent className="p-10">
                <h3 className="text-slate-900 text-2xl font-bold mb-6">
                  {t("contact.form.heading")}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />

                  <fieldset className="space-y-6">
                    <legend className="sr-only">Contact form fields</legend>

                    <div>
                      <label htmlFor="name" className="text-slate-700 mb-1 block">
                        {t("contact.form.name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.form.namePlaceholder")}
                        className="rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-slate-700 mb-1 block">
                        {t("contact.form.email")}
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.emailPlaceholder")}
                        className="rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="text-slate-700 mb-1 block">
                        {t("contact.form.message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.form.messagePlaceholder")}
                        className="rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </fieldset>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl"
                    aria-label="Submit contact form"
                  >
                    {t("contact.form.submit")}
                    <Send className="ml-2" size={18} aria-hidden="true" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* MAP */}
        <section
          className="py-20 bg-white"
          aria-labelledby="map-section-title"
        >
          <h2
            id="map-section-title"
            className="mb-4 text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text text-center"
          >
            {t("contact.map.title")}
          </h2>

          <p className="text-slate-600 mb-8 text-center">
            {t("contact.map.subtitle")}
          </p>

          <AnimatedCard>
            <div className="h-[420px] rounded-3xl overflow-hidden shadow-2xl relative">
              <iframe
                title="Yeltu location map"
                aria-label="Google Maps location of Yeltu Agency"
                loading="lazy"
                src="https://www.google.com/maps?q=Baku+Azerbaijan&output=embed"
                className="w-full h-full"
              />

              <a
                href="https://maps.google.com/?q=Baku+Azerbaijan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open location in Google Maps"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-8 py-3 rounded-xl shadow-lg"
              >
                {t("contact.map.button")}{" "}
                <ArrowRight
                  size={18}
                  className="ml-1 inline"
                  aria-hidden="true"
                />
              </a>
            </div>
          </AnimatedCard>
        </section>
      </main>
    </div>
  );
}
