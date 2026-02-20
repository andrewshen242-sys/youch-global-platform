
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!startCounting) return;
    setCount(0);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, startCounting]);

  return count;
}

export default function GLA() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isSummitVisible, setIsSummitVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const summitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = { threshold: 0.2 };

    const sectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        sectionObserver.disconnect();
      }
    }, options);

    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsStatsVisible(true);
        statsObserver.disconnect();
      }
    }, options);

    const summitObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSummitVisible(true);
        summitObserver.disconnect();
      }
    }, options);

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (summitRef.current) summitObserver.observe(summitRef.current);

    return () => {
      sectionObserver.disconnect();
      statsObserver.disconnect();
      summitObserver.disconnect();
    };
  }, []);

  const countriesCount = useCountUp(8, 2200, isStatsVisible);
  const schoolsCount = useCountUp(100, 2200, isStatsVisible);

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
              {t('gla.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('gla.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('gla.subtitle')}
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
        >
          {/* Left - Text Content */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            }}
          >
            <div className="inline-flex items-center px-3 py-1.5 bg-red-100 rounded-lg mb-6">
              <i className="ri-global-line text-red-700 mr-2 text-sm"></i>
              <span className="text-xs font-semibold text-red-800 tracking-wide">
                Global Learners Alliance (GLA)
              </span>
            </div>

            <p className="text-base text-gray-700 leading-relaxed mb-5">
              {t('gla.description1')}
            </p>

            <p className="text-base text-gray-700 leading-relaxed mb-5">
              {t('gla.description2')}
            </p>

            {/* Core Question Highlight */}
            <div className="relative bg-gradient-to-r from-red-50 to-white border-l-4 border-red-600 rounded-r-xl p-5 mb-6">
              <i className="ri-double-quotes-l text-red-200 text-3xl absolute top-3 right-4"></i>
              <p className="text-sm text-gray-800 leading-relaxed italic relative z-10">
                {t('gla.coreQuestion')}
              </p>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              {t('gla.description3')}
            </p>
          </div>

          {/* Right - Image */}
          <div
            className="relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: '200ms',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-50 rounded-2xl -z-10"></div>

            <div className="relative w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=International%20education%20conference%20with%20diverse%20educators%20and%20researchers%20sitting%20in%20elegant%20lecture%20hall%20with%20warm%20wooden%20interior%20and%20orange%20chairs%2C%20academic%20presentation%20setting%2C%20professional%20educational%20summit%20atmosphere%2C%20warm%20lighting%2C%20high%20quality%20photography&width=800&height=600&seq=gla-main-001&orientation=landscape"
                alt="Global Learning Alliance Conference"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-earth-line text-red-700 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        {t('gla.imageBadgeTitle')}
                      </p>
                      <p className="text-[11px] text-gray-500">{t('gla.imageBadgeDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/3 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-red-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative px-8 py-12 lg:px-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div
                  className="transition-all duration-700"
                  style={{
                    opacity: isStatsVisible ? 1 : 0,
                    transform: isStatsVisible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-4xl lg:text-5xl font-bold text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {countriesCount}
                    </span>
                    <span className="text-2xl font-bold text-red-400">+</span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">{t('gla.stat1')}</p>
                </div>

                <div
                  className="transition-all duration-700"
                  style={{
                    opacity: isStatsVisible ? 1 : 0,
                    transform: isStatsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: '150ms',
                  }}
                >
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-4xl lg:text-5xl font-bold text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {schoolsCount}
                    </span>
                    <span className="text-2xl font-bold text-red-400">+</span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">{t('gla.stat2')}</p>
                </div>

                <div
                  className="transition-all duration-700"
                  style={{
                    opacity: isStatsVisible ? 1 : 0,
                    transform: isStatsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: '300ms',
                  }}
                >
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-4xl lg:text-5xl font-bold text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      2
                    </span>
                    <span className="text-lg font-medium text-red-400">
                      {t('gla.stat3Unit')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">{t('gla.stat3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2025 Summit Highlight */}
        <div ref={summitRef} className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Shanghai%20modern%20skyline%20at%20golden%20hour%20with%20Pudong%20financial%20district%20and%20Oriental%20Pearl%20Tower%2C%20warm%20sunset%20colors%2C%20professional%20cityscape%20photography%2C%20clean%20composition%20with%20warm%20amber%20and%20golden%20tones%2C%20architectural%20beauty&width=1200&height=500&seq=gla-shanghai-001&orientation=landscape"
              alt="Shanghai Skyline"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>

          <div
            className="relative px-8 py-14 lg:px-16 lg:py-16 transition-all duration-700"
            style={{
              opacity: isSummitVisible ? 1 : 0,
              transform: isSummitVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full mb-5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                  {t('gla.summitBadge')}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 leading-tight">
                {t('gla.summitTitle')}
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 max-w-xl">
                {t('gla.summitDescription')}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                  <i className="ri-map-pin-line text-red-400"></i>
                  <span className="text-sm text-white font-medium whitespace-nowrap">
                    {t('gla.summitLocation')}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                  <i className="ri-calendar-event-line text-red-400"></i>
                  <span className="text-sm text-white font-medium whitespace-nowrap">
                    {t('gla.summitYear')}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10">
                  <i className="ri-group-line text-red-400"></i>
                  <span className="text-sm text-white font-medium whitespace-nowrap">
                    {t('gla.summitScope')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
