
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function AboutHero() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Modern%20university%20campus%20aerial%20view%20with%20contemporary%20architecture%20buildings%2C%20warm%20golden%20hour%20lighting%2C%20lush%20green%20trees%20and%20pathways%2C%20academic%20atmosphere%2C%20clean%20minimalist%20design%2C%20professional%20educational%20institution%2C%20high%20quality%20architectural%20photography%20with%20warm%20tones&width=1600&height=900&seq=about-hero-bg-001&orientation=landscape"
          alt="CPET-YouCH Campus"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs font-semibold text-white uppercase tracking-widest">
              {t('aboutPage.hero.badge')}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6 transition-all duration-700 delay-200"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            {t('aboutPage.hero.title')}
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl transition-all duration-700 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            {t('aboutPage.hero.subtitle')}
          </p>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mt-8 text-sm text-white/60 transition-all duration-700 delay-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            <a href={`/${t('aboutPage.hero.breadcrumbLangCode', { defaultValue: 'en' })}`} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.home')}
            </a>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white">{t('nav.about')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
