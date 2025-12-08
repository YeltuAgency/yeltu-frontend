import { useCookieConsent } from "../contexts/CookieConsentContext";
import { X } from "lucide-react";

export default function CookieModal() {
  const { showModal, closeModal, consent, updateConsent, saveCustom } =
    useCookieConsent();

  if (!showModal) return null;

  const toggle = (key) =>
    updateConsent({
      ...consent,
      [key]: !consent[key],
    });

  return (
    <div
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]
        flex items-center justify-center p-4
      "
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-700 hover:text-black"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">Cookie Preferences</h2>
        <p className="text-slate-600 mb-6 text-sm">
          You can enable or disable cookie categories below.
        </p>

        <div className="space-y-5">
          {/* ESSENTIAL */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Essential Cookies</h3>
              <p className="text-sm text-slate-500">
                Required for website security and functionality.
              </p>
            </div>
            <input type="checkbox" checked readOnly disabled />
          </div>

          {/* ANALYTICS */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Analytics Cookies</h3>
              <p className="text-sm text-slate-500">
                Helps us understand traffic & improve UX (GA4, GTM).
              </p>
            </div>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={() => toggle("analytics")}
            />
          </div>

          {/* MARKETING */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Marketing Cookies</h3>
              <p className="text-sm text-slate-500">
                Used for personalized ads (Meta, TikTok, etc.)
              </p>
            </div>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={() => toggle("marketing")}
            />
          </div>

          {/* FUNCTIONAL */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Functional Cookies</h3>
              <p className="text-sm text-slate-500">
                Enhances website features (like remembering preferences).
              </p>
            </div>
            <input
              type="checkbox"
              checked={consent.functional}
              onChange={() => toggle("functional")}
            />
          </div>
        </div>

        <button
          onClick={saveCustom}
          className="
            mt-8 w-full py-3 rounded-xl 
            bg-gradient-to-r from-blue-500 to-violet-600 
            text-white font-semibold
          "
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
