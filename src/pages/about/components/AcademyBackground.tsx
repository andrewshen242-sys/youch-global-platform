
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

export default function AcademyBackground() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsTimelineVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  const milestones = [
    { year: t('aboutPage.background.timeline.m1.year'), title: t('aboutPage.background.timeline.m1.title'), desc: t('aboutPage.background.timeline.m1.desc') },
    { year: t('aboutPage.background.timeline.m2.year'), title: t('aboutPage.background.timeline.m2.title'), desc: t('aboutPage.background.timeline.m2.desc') },
    { year: t('aboutPage.background.timeline.m3.year'), title: t('aboutPage.background.timeline.m3.title'), desc: t('aboutPage.background.timeline.m3.desc') },
    { year: t('aboutPage.background.timeline.m4.year'), title: t('aboutPage.background.timeline.m4.title'), desc: t('aboutPage.background.timeline.m4.desc') },
    { year: t('aboutPage.background.timeline.m5.year'), title: t('aboutPage.background.timeline.m5.title'), desc: t('aboutPage.background.timeline.m5.desc') },
  ];

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Story Section */}
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Left - Image */}
          <div
            className="relative w-full h-80 lg:h-[460px] transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            }}
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-50 rounded-2xl -z-10"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20educators%20in%20a%20modern%20conference%20room%20having%20a%20collaborative%20discussion%2C%20warm%20lighting%2C%20contemporary%20interior%20design%2C%20diverse%20group%20of%20teachers%20and%20professors%20engaged%20in%20academic%20planning%2C%20clean%20minimalist%20setting%20with%20warm%20earth%20tones%20and%20natural%20light&width=800&height=600&seq=about-story-001&orientation=landscape"
                alt="Academy Story"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className="transition-all duration-700 delay-200"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
                {t('aboutPage.background.badge')}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 leading-tight">
              {t('aboutPage.background.title')}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              {t('aboutPage.background.desc1')}
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t('aboutPage.background.desc2')}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'ri-shield-check-line', text: t('aboutPage.background.highlight1') },
                { icon: 'ri-global-line', text: t('aboutPage.background.highlight2') },
                { icon: 'ri-graduation-cap-line', text: t('aboutPage.background.highlight3') },
                { icon: 'ri-team-line', text: t('aboutPage.background.highlight4') },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-red-700 text-sm`}></i>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
              <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
                {t('aboutPage.background.timelineBadge')}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              {t('aboutPage.background.timelineTitle')}
            </h3>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden lg:block"></div>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 lg:hidden"></div>

            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative flex items-start lg:items-center"
                    style={{
                      opacity: isTimelineVisible ? 1 : 0,
                      transform: isTimelineVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
                    }}
                  >
                    {/* Mobile dot */}
                    <div className="absolute left-6 w-3 h-3 bg-red-600 rounded-full -translate-x-1/2 mt-2 lg:hidden z-10 ring-4 ring-white"></div>

                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 w-full items-center">
                      {isLeft ? (
                        <>
                          <div className="text-right pr-12">
                            <div className="inline-block px-3 py-1 bg-red-700 text-white text-sm font-semibold rounded-full mb-3">
                              {milestone.year}
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{milestone.desc}</p>
                          </div>
                          <div></div>
                        </>
                      ) : (
                        <>
                          <div></div>
                          <div className="pl-12">
                            <div className="inline-block px-3 py-1 bg-red-700 text-white text-sm font-semibold rounded-full mb-3">
                              {milestone.year}
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{milestone.desc}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Desktop center dot */}
                    <div className="absolute left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 hidden lg:block z-10 ring-4 ring-white shadow-md"></div>

                    {/* Mobile layout */}
                    <div className="lg:hidden pl-14">
                      <div className="inline-block px-3 py-1 bg-red-700 text-white text-sm font-semibold rounded-full mb-3">
                        {milestone.year}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
