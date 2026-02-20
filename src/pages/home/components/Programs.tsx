import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

export default function Programs() {
  const { t } = useTranslation('common');
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      name: t('programs.fullTime.name'),
      description: t('programs.fullTime.description'),
      features: [
        t('programs.fullTime.feature1'),
        t('programs.fullTime.feature2'),
        t('programs.fullTime.feature3'),
        t('programs.fullTime.feature4')
      ],
      highlight: false
    },
    {
      name: t('programs.elective.name'),
      description: t('programs.elective.description'),
      features: [
        t('programs.elective.feature1'),
        t('programs.elective.feature2'),
        t('programs.elective.feature3'),
        t('programs.elective.feature4')
      ],
      highlight: true
    },
    {
      name: t('programs.teacherTraining.name'),
      description: t('programs.teacherTraining.description'),
      features: [
        t('programs.teacherTraining.feature1'),
        t('programs.teacherTraining.feature2'),
        t('programs.teacherTraining.feature3'),
        t('programs.teacherTraining.feature4')
      ],
      highlight: false
    }
  ];

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
            <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
              {t('programs.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('programs.admissionsTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('programs.admissionsDescription')}
          </p>
        </div>

        {/* Programs Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border-2 p-8 transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                program.highlight
                  ? 'border-red-700 shadow-xl hover:shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-red-300 hover:shadow-xl'
              }`}
              style={{
                opacity: isCardsVisible ? 1 : 0,
                transform: isCardsVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
              }}
            >
              {/* Decorative Background */}
              {program.highlight && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              )}
              
              {program.highlight && (
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-red-700 to-red-600 text-white text-xs font-semibold rounded-full mb-4 shadow-md">
                  {t('programs.popularTag')}
                </div>
              )}
              
              <h3 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
                program.highlight ? 'text-red-700' : 'text-gray-900 group-hover:text-red-700'
              }`}>
                {program.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {program.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700 group/item">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-all duration-300 ${
                      program.highlight 
                        ? 'bg-red-50 group-hover/item:bg-red-700' 
                        : 'bg-gray-100 group-hover/item:bg-red-700'
                    }`}>
                      <i className={`ri-check-line transition-colors duration-300 ${
                        program.highlight 
                          ? 'text-red-700 group-hover/item:text-white' 
                          : 'text-gray-600 group-hover/item:text-white'
                      }`}></i>
                    </div>
                    <span className="group-hover/item:text-red-700 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full py-3 text-center font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  program.highlight
                    ? 'bg-red-700 text-white hover:bg-red-800 shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-red-700 hover:text-white'
                }`}
              >
                {t('programs.learnMore')}
              </a>
            </div>
          ))}
        </div>

        {/* Admissions Process */}
        <div ref={processRef} className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2"></div>
          
          <h3 className="text-3xl font-light text-gray-900 mb-8 text-center relative z-10">
            {t('programs.processTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {[
              { step: '1', title: t('programs.process.step1.title'), desc: t('programs.process.step1.desc') },
              { step: '2', title: t('programs.process.step2.title'), desc: t('programs.process.step2.desc') },
              { step: '3', title: t('programs.process.step3.title'), desc: t('programs.process.step3.desc') },
              { step: '4', title: t('programs.process.step4.title'), desc: t('programs.process.step4.desc') }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div
                      className="h-full bg-gradient-to-r from-red-700 to-red-400"
                      style={{
                        width: isProcessVisible ? '100%' : '0%',
                        transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 200 + 400}ms`,
                      }}
                    ></div>
                  </div>
                )}
                
                <div
                  className="relative z-10"
                  style={{
                    opacity: isProcessVisible ? 1 : 0,
                    transform: isProcessVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
                  }}
                >
                  <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer relative">
                    <span className="relative z-10">{item.step}</span>
                    <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
