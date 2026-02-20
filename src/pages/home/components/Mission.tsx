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

function StatCard({ number, suffix, label, icon, delay, isVisible }: {
  number: number;
  suffix: string;
  label: string;
  icon: string;
  delay: number;
  isVisible: boolean;
}) {
  const count = useCountUp(number, 2200, isVisible);

  return (
    <div
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
        {/* Decorative background circle */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-50/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Icon */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-red-200/50 group-hover:scale-110 transition-transform duration-500">
          <i className={`${icon} text-white text-xl`}></i>
        </div>

        {/* Number */}
        <div className="relative flex items-baseline gap-0.5 mb-2">
          <span className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {count.toLocaleString()}
          </span>
          <span className="text-2xl lg:text-3xl font-bold text-red-600">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-sm text-gray-500 font-medium leading-relaxed">{label}</p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400 w-0 group-hover:w-full transition-all duration-700 rounded-b-2xl"></div>
      </div>
    </div>
  );
}

export default function Mission() {
  const { t } = useTranslation('common');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isMissionPointsVisible, setIsMissionPointsVisible] = useState(false);
  const [isDualFocusVisible, setIsDualFocusVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const missionPointsRef = useRef<HTMLDivElement>(null);
  const dualFocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          statsObserver.disconnect();
        }
      },
      observerOptions
    );

    const missionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMissionPointsVisible(true);
          missionObserver.disconnect();
        }
      },
      observerOptions
    );

    const dualObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDualFocusVisible(true);
          dualObserver.disconnect();
        }
      },
      observerOptions
    );

    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (missionPointsRef.current) missionObserver.observe(missionPointsRef.current);
    if (dualFocusRef.current) dualObserver.observe(dualFocusRef.current);

    return () => {
      statsObserver.disconnect();
      missionObserver.disconnect();
      dualObserver.disconnect();
    };
  }, []);

  const stats = [
    { number: 5000, suffix: '+', label: t('mission.stat1'), icon: 'ri-user-heart-line' },
    { number: 800, suffix: '+', label: t('mission.stat2'), icon: 'ri-award-line' },
    { number: 12000, suffix: '+', label: t('mission.stat3'), icon: 'ri-folder-chart-line' },
  ];

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
              {t('mission.partnership.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('mission.partnership.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('mission.partnership.description')}
          </p>
        </div>

        {/* Stats Section - Enhanced with more spacing */}
        <div ref={statsRef} className="mb-28">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-400 rounded-full blur-3xl"></div>
            </div>
            {/* Dot pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}></div>

            <div className="relative px-8 py-16 lg:px-16 lg:py-20">
              {/* Section header */}
              <div className="text-center mb-14">
                <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full mb-5">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">{t('mission.achievements')}</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-light text-white">
                  {t('mission.title1')} <span className="text-red-400">{t('mission.title2')}</span>
                </h3>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    number={stat.number}
                    suffix={stat.suffix}
                    label={stat.label}
                    icon={stat.icon}
                    delay={index * 200}
                    isVisible={isStatsVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Points - Enhanced with decorative elements */}
        <div ref={missionPointsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Left Content */}
          <div>
            {/* Mission Points with fade-in animation */}
            <div className="space-y-6">
              {[
                { icon: 'ri-lightbulb-line', key: 'point1' },
                { icon: 'ri-compass-line', key: 'point2' },
                { icon: 'ri-team-line', key: 'point3' },
              ].map((point, index) => (
                <div
                  key={point.key}
                  className="flex items-start transition-all duration-700"
                  style={{
                    opacity: isMissionPointsVisible ? 1 : 0,
                    transform: isMissionPointsVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-red-200 transition-colors">
                    <i className={`${point.icon} text-red-700`}></i>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {t(`mission.${point.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image with decorative frame */}
          <div 
            className="relative w-full h-80 lg:h-96 transition-all duration-700"
            style={{
              opacity: isMissionPointsVisible ? 1 : 0,
              transform: isMissionPointsVisible ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: '300ms',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-50 rounded-2xl -z-10"></div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20collaborative%20learning%20environment%20with%20students%20working%20together%20on%20projects%20in%20a%20bright%20contemporary%20classroom%2C%20warm%20lighting%2C%20educational%20technology%2C%20diverse%20group%20of%20students%20engaged%20in%20discussion%2C%20clean%20minimalist%20interior%20design%20with%20warm%20tones&width=800&height=600&seq=mission-visual-001&orientation=landscape"
                alt="Mission"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Dual Focus - Enhanced with fade-in animation */}
        <div ref={dualFocusRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-500"
            style={{
              opacity: isDualFocusVisible ? 1 : 0,
              transform: isDualFocusVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0ms',
            }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i className="ri-graduation-cap-line text-red-700 text-2xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">{t('mission.dualFocus.student.title')}</h4>
            <p className="text-base text-gray-600 leading-relaxed">
              {t('mission.dualFocus.student.description')}
            </p>
          </div>

          <div 
            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-500"
            style={{
              opacity: isDualFocusVisible ? 1 : 0,
              transform: isDualFocusVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i className="ri-user-star-line text-gray-700 text-2xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">{t('mission.dualFocus.teacher.title')}</h4>
            <p className="text-base text-gray-600 leading-relaxed">
              {t('mission.dualFocus.teacher.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
