import React from "react";
import { useTranslation } from "react-i18next";

function Footer({ simple = false }) {
  const { t } = useTranslation();
  return (
    <footer className="py-3 ">
      {!simple && (
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nn nav-link px-2 text-body-secondary">{t('footer.home')}</a>
          </li>
          <li className="nav-item">
            <a href="/city-categories" className="nn nav-link px-2 text-body-secondary">{t('footer.explore')}</a>
          </li>
          <li className="nav-item">
            <a href="/user-post" className="nn nav-link px-2 text-body-secondary">{t('footer.share')}</a>
          </li>
        </ul>
      )}

      <p className="text-center text-body-secondary text-bold mb-0">
        {t('footer.copyright')}
      </p>

      <p className="text-center mt-1">
        <a
          href="mailto:realhede7@gmail.com"
          className="text-decoration-none d-inline-flex align-items-center justify-content-center"
        >
          <span className="text-primary me-2">{t('footer.developer')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-envelope email-icon me-2" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" style={{ color: "black" }} />
          </svg>
        </a>
      </p>
    </footer>
  );
}
export default Footer;
