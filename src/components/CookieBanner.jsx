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
          We use cookies to improve your experience, analyze traffic, and
          provide personalized content. You can accept all, reject all, or
          customize your preferences.{" "}
          <a
            href="/privacy"
            className="underline text-blue-300 hover:text-blue-200"
          >
            Privacy Policy
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={rejectAll}
            className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 text-sm"
          >
            Reject All
          </button>

          <button
            onClick={openModal}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm"
          >
            Customize
          </button>

          <button
            onClick={acceptAll}
            className="px-5 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-sm font-semibold"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
