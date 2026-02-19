
import { useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['en', 'zh', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'vi', 'th', 'ms'];

export default function LanguageWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lang || !SUPPORTED_LANGS.includes(lang)) {
      navigate('/en', { replace: true });
      return;
    }
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate]);

  if (!lang || !SUPPORTED_LANGS.includes(lang)) {
    return null;
  }

  return <Outlet />;
}

export { SUPPORTED_LANGS };
