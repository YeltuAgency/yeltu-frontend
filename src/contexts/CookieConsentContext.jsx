import { createContext, useContext, useEffect, useState } from "react";

const CookieConsentContext = createContext();

export const useCookieConsent = () => useContext(CookieConsentContext);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const [loaded, setLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load consent from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("yeltu_cookie_consent");
    if (saved) {
      setConsent(JSON.parse(saved));
      setLoaded(true);
      return;
    }

    // If no saved consent → show banner
    setShowBanner(true);
    setLoaded(true);
  }, []);

  // Save to localStorage
  const updateConsent = (newConsent) => {
    setConsent(newConsent);
    localStorage.setItem("yeltu_cookie_consent", JSON.stringify(newConsent));
  };

  // Utility handlers
  const acceptAll = () => {
    const full = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    updateConsent(full);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const none = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    updateConsent(none);
    setShowBanner(false);
  };

  const saveCustom = () => {
    updateConsent({ ...consent, essential: true });
    setShowModal(false);
    setShowBanner(false);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        updateConsent,
        acceptAll,
        rejectAll,
        saveCustom,
        showBanner,
        showModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
