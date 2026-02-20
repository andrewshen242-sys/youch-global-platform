
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import AboutHero from './components/AboutHero';
import AcademyBackground from './components/AcademyBackground';
import CoreValues from './components/CoreValues';
import TeamSection from './components/TeamSection';
import AboutCTA from './components/AboutCTA';
import Footer from '../home/components/Footer';

const LANGUAGE_ORDER = [
  { code: 'en', native: 'English' },
  { code: 'zh', native: '中文' },
  { code: 'es', native: 'Español' },
  { code: 'fr', native: 'Français' },
  { code: 'de', native: 'Deutsch' },
  { code: 'it', native: 'Italiano' },
  { code: 'ja', native: '日本語' },
  { code: 'ko', native: '한국어' },
  { code: 'vi', native: 'Tiếng Việt' },
  { code: 'th', native: 'ภาษาไทย' },
  { code: 'ms', native: 'Bahasa Melayu' },
  { code: 'ar', native: 'العربية' },
];

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t } = useTranslation('common');
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const currentLang = lang || 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (code: string) => {
    navigate(`/${code}/about`);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentNative = LANGUAGE_ORDER.find(l => l.code === currentLang)?.native || 'English';

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-4">
            <div className="flex items-center flex-shrink-0 max-w-[60%] sm:max-w-none">
              <h1>
                <a href={`/${currentLang}`} className="flex items-center cursor-pointer">
                  <img
                    src="https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/f12a2e01137610acd85c80f5993de871.png"
                    alt="CPET & YOUCH Global Online Academy"
                    className="h-9 sm:h-12 lg:h-14 w-auto object-contain"
                  />
                </a>
              </h1>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-red-700 cursor-pointer flex-shrink-0"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>

            <div className="hidden lg:flex items-center space-x-8 flex-shrink-0">
              <a href={`/${currentLang}`} className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer">{t('nav.home')}</a>
              <a href={`/${currentLang}/about`} className="text-sm font-medium text-red-700 whitespace-nowrap cursor-pointer">{t('nav.about')}</a>
              <a href={`/${currentLang}#academics`} className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer">{t('nav.academics')}</a>
              <a href={`/${currentLang}#admissions`} className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer">{t('nav.admissions')}</a>
              <a href={`/${currentLang}#faculty`} className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer">{t('nav.faculty')}</a>
              <a href={`/${currentLang}#contact`} className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer">{t('nav.contact')}</a>

              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer flex items-center">
                  <i className="ri-global-line mr-1.5"></i>
                  <span>{currentNative}</span>
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </button>
                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all max-h-96 overflow-y-auto">
                  {LANGUAGE_ORDER.map((language, index) => (
                    <a
                      key={language.code}
                      href={`/${language.code}/about`}
                      onClick={(e) => { e.preventDefault(); switchLanguage(language.code); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors whitespace-nowrap cursor-pointer ${
                        currentLang === language.code ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-red-700'
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${index === LANGUAGE_ORDER.length - 1 ? 'rounded-b-lg' : ''}`}
                    >
                      {language.native}
                    </a>
                  ))}
                </div>
              </div>

              <a href={`/${currentLang}#admissions`} className="px-6 py-2.5 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors whitespace-nowrap cursor-pointer">
                {t('nav.apply')}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-3">
            <a href={`/${currentLang}`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors cursor-pointer">{t('nav.home')}</a>
            <a href={`/${currentLang}/about`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-red-700 cursor-pointer">{t('nav.about')}</a>
            <a href={`/${currentLang}#academics`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors cursor-pointer">{t('nav.academics')}</a>
            <a href={`/${currentLang}#admissions`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors cursor-pointer">{t('nav.admissions')}</a>
            <a href={`/${currentLang}#faculty`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors cursor-pointer">{t('nav.faculty')}</a>
            <a href={`/${currentLang}#contact`} onClick={closeMobileMenu} className="block py-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors cursor-pointer">{t('nav.contact')}</a>

            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{t('nav.language')}</div>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGE_ORDER.map((language) => (
                  <a
                    key={language.code}
                    href={`/${language.code}/about`}
                    onClick={(e) => { e.preventDefault(); switchLanguage(language.code); }}
                    className={`py-2 px-3 text-sm rounded-md transition-colors cursor-pointer text-left ${
                      currentLang === language.code ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-red-700'
                    }`}
                  >
                    {language.native}
                  </a>
                ))}
              </div>
            </div>

            <a href={`/${currentLang}#admissions`} onClick={closeMobileMenu} className="block w-full py-3 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors text-center cursor-pointer mt-4">
              {t('nav.apply')}
            </a>
          </div>
        </div>
      </nav>

      {/* Page Sections */}
      <AboutHero />
      <AcademyBackground />
      <CoreValues />
      <TeamSection />
      <AboutCTA />
      <Footer />

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-red-700 text-white rounded-full shadow-lg hover:bg-red-800 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line text-xl"></i>
      </button>
    </div>
  );
}
