import { t } from "i18next";
import { useCookieConsent } from "../contexts/CookieConsentContext";

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openModal } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-[9999] 
        bg-slate-900/90 backdrop-blur-xl 
        border-t border-white/10
        px-6 py-5
        shadow-2xl
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-white text-sm md:text-base leading-relaxed max-w-3xl">
          {t("cookieBanner.message")}{" "}
          <a
            href="/privacy"
            className="underline text-blue-300 hover:text-blue-200"
          >
            {t("cookieBanner.privacyPolicy")}
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={rejectAll}
            className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 text-sm"
          >
            {t("cookieBanner.rejectAll")}
          </button>

          <button
            onClick={openModal}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm"
          >
            {t("cookieBanner.customize")}
          </button>

          <button
            onClick={acceptAll}
            className="px-5 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-sm font-semibold"
          >
            {t("cookieBanner.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
