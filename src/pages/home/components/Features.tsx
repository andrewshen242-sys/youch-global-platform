import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

export default function Features() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isStandardsVisible, setIsStandardsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStandardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (standardsRef.current) {
      observer.observe(standardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: 'ri-search-line',
      title: t('features.feature1.title'),
      description: t('features.feature1.description'),
    },
    {
      icon: 'ri-flask-line',
      title: t('features.feature2.title'),
      description: t('features.feature2.description'),
    },
    {
      icon: 'ri-group-line',
      title: t('features.feature3.title'),
      description: t('features.feature3.description'),
    }
  ];

  return (
    <div className="py-14 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('features.academicTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('features.academicDescription')}
          </p>
        </div>

        {/* Features Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
              }}
            >
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-700 group-hover:scale-110 transition-all duration-500">
                <i className={`${feature.icon} text-red-700 text-2xl group-hover:text-white transition-colors duration-500`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic Standards */}
        <div ref={standardsRef} className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div
              style={{
                opacity: isStandardsVisible ? 1 : 0,
                transform: isStandardsVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-red-700 rounded-full mr-4"></div>
                <h3 className="text-3xl font-light text-gray-900">
                  {t('features.standards.title')}
                </h3>
              </div>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                {t('features.standards.description')}
              </p>
              <div className="space-y-4">
                {[
                  t('features.standards.feature1'),
                  t('features.standards.feature2'),
                  t('features.standards.feature3'),
                  t('features.standards.feature4')
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center group cursor-pointer"
                    style={{
                      opacity: isStandardsVisible ? 1 : 0,
                      transform: isStandardsVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${200 + idx * 100}ms`,
                    }}
                  >
                    <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-700 transition-all duration-300">
                      <i className="ri-checkbox-circle-fill text-red-700 group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-8 border border-gray-200 relative"
              style={{
                opacity: isStandardsVisible ? 1 : 0,
                transform: isStandardsVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
              }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-red-700 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-red-700 rounded-bl-xl"></div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <i className="ri-book-open-line text-red-700 mr-2"></i>
                {t('features.subjects.title')}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  t('features.subjects.humanities'),
                  t('features.subjects.science'),
                  t('features.subjects.math'),
                  t('features.subjects.socialScience'),
                  t('features.subjects.language'),
                  t('features.subjects.arts'),
                  t('features.subjects.computerScience'),
                  t('features.subjects.interdisciplinary')
                ].map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center group cursor-pointer"
                    style={{
                      opacity: isStandardsVisible ? 1 : 0,
                      transform: isStandardsVisible ? 'scale(1)' : 'scale(0.8)',
                      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${400 + index * 80}ms`,
                    }}
                  >
                    <div className="w-2 h-2 bg-red-700 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors duration-300">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
