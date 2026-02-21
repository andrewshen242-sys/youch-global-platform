import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function Community() {
  const { t } = useTranslation('common');
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && cardsRef.current[index]) {
          observer.unobserve(cardsRef.current[index]!);
        }
      });
    };
  }, []);

  const activities = [
    {
      title: t('community.activity1.title'),
      date: t('community.activity1.date'),
      description: t('community.activity1.description'),
      image: 'https://readdy.ai/api/search-image?query=educational%20workshop%20with%20teachers%20and%20students%20in%20modern%20bright%20classroom%20discussing%20and%20collaborating%20with%20red%20accents%20contemporary%20learning%20space%20warm%20tones&width=800&height=600&seq=community-001-v2&orientation=landscape',
      tag: t('community.activity1.tag')
    },
    {
      title: t('community.activity2.title'),
      date: t('community.activity2.date'),
      description: t('community.activity2.description'),
      image: 'https://readdy.ai/api/search-image?query=student%20project%20showcase%20event%20with%20presentations%20and%20displays%20in%20modern%20exhibition%20space%20with%20red%20and%20white%20design%20bright%20contemporary%20setting%20warm%20atmosphere&width=800&height=600&seq=community-002-v2&orientation=landscape',
      tag: t('community.activity2.tag')
    },
    {
      title: t('community.activity3.title'),
      date: t('community.activity3.date'),
      description: t('community.activity3.description'),
      image: 'https://readdy.ai/api/search-image?query=teacher%20community%20gathering%20with%20educators%20networking%20and%20sharing%20ideas%20in%20cozy%20modern%20cafe%20setting%20with%20red%20color%20accents%20warm%20collaborative%20atmosphere&width=800&height=600&seq=community-003-v2&orientation=landscape',
      tag: t('community.activity3.tag')
    },
    {
      title: t('community.activity4.title'),
      date: t('community.activity4.date'),
      description: t('community.activity4.description'),
      image: 'https://readdy.ai/api/search-image?query=online%20learning%20forum%20interface%20on%20laptop%20screen%20showing%20discussion%20threads%20and%20resources%20in%20modern%20workspace%20with%20red%20UI%20design%20clean%20digital%20environment&width=800&height=600&seq=community-004-v2&orientation=landscape',
      tag: t('community.activity4.tag')
    }
  ];

  return (
    <div className="py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('community.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('community.subtitle')}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-red-300 transition-all duration-500 hover:shadow-xl cursor-pointer ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-red-700 text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-lg">
                    {activity.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-red-700 font-medium mb-3">
                  <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  {activity.date}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <div className="flex items-center text-red-700 font-medium group-hover:translate-x-2 transition-transform cursor-pointer">
                  <span className="whitespace-nowrap">{t('community.learnMore')}</span>
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
