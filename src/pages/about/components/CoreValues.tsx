
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

export default function CoreValues() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const values = [
    { icon: 'ri-lightbulb-line', title: t('aboutPage.values.v1.title'), desc: t('aboutPage.values.v1.desc'), color: 'from-red-50 to-white', border: 'border-red-100' },
    { icon: 'ri-heart-line', title: t('aboutPage.values.v2.title'), desc: t('aboutPage.values.v2.desc'), color: 'from-amber-50 to-white', border: 'border-amber-100' },
    { icon: 'ri-rocket-line', title: t('aboutPage.values.v3.title'), desc: t('aboutPage.values.v3.desc'), color: 'from-emerald-50 to-white', border: 'border-emerald-100' },
    { icon: 'ri-earth-line', title: t('aboutPage.values.v4.title'), desc: t('aboutPage.values.v4.desc'), color: 'from-rose-50 to-white', border: 'border-rose-100' },
  ];

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-gray-50">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
            <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
              {t('aboutPage.values.badge')}
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            {t('aboutPage.values.title')}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutPage.values.subtitle')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${value.color} p-8 lg:p-10 rounded-2xl border ${value.border} hover:shadow-lg transition-all duration-500 group`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
              }}
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <i className={`${value.icon} text-red-700 text-2xl`}></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-base text-gray-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <div
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10 overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms',
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-eye-line text-white text-xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-white mb-4">{t('aboutPage.values.vision.title')}</h4>
              <p className="text-base text-gray-300 leading-relaxed">{t('aboutPage.values.vision.desc')}</p>
            </div>
          </div>

          <div
            className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 rounded-2xl p-10 overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 750ms',
            }}
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <i className="ri-compass-3-line text-white text-xl"></i>
              </div>
              <h4 className="text-2xl font-semibold text-white mb-4">{t('aboutPage.values.mission.title')}</h4>
              <p className="text-base text-red-100 leading-relaxed">{t('aboutPage.values.mission.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
