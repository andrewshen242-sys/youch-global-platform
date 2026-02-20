
import { useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['en', 'zh', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'vi', 'th', 'ms', 'ar'];

const LANG_HTML_MAP: Record<string, string> = {
  en: 'en',
  zh: 'zh-TW',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  vi: 'vi',
  th: 'th',
  ms: 'ms',
  ar: 'ar',
};

const RTL_LANGS = ['ar'];

export default function LanguageWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n, t } = useTranslation('common');
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

  // Update document title, html lang, dir, and meta tags when language changes
  useEffect(() => {
    if (!lang || !SUPPORTED_LANGS.includes(lang)) return;

    // Update html lang attribute
    document.documentElement.lang = LANG_HTML_MAP[lang] || lang;

    // Update html dir attribute for RTL languages
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';

    // Update document title
    document.title = t('seo.title');

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo.description'));
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('seo.keywords'));
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('seo.ogTitle'));
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', t('seo.ogDescription'));
    }

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', t('seo.ogTitle'));
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', t('seo.ogDescription'));
    }
  }, [lang, t]);

  if (!lang || !SUPPORTED_LANGS.includes(lang)) {
    return null;
  }

  return <Outlet />;
}

export { SUPPORTED_LANGS };
