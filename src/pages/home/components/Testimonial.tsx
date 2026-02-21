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

function CircularProgress({ value, maxValue, size = 100, strokeWidth = 6, isVisible, delay }: {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  isVisible: boolean;
  delay: number;
}) {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setProgress((value / maxValue) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, value, maxValue, delay]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Testimonial() {
  const { t } = useTranslation('common');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isFacultyVisible, setIsFacultyVisible] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const facultyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFacultyVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (facultyRef.current) {
      observer.observe(facultyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuoteVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const phdCount = useCountUp(64, 2000, isStatsVisible);
  const expCount = useCountUp(15, 2000, isStatsVisible);

  return (
    <div className="py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('testimonial.facultyTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('testimonial.facultyDescription')}
          </p>
        </div>

        {/* Main Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Quote */}
          <div
            ref={quoteRef}
            className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl p-10 border border-gray-200 relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            style={{
              opacity: isQuoteVisible ? 1 : 0,
              transform: isQuoteVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Decorative Quote Mark */}
            <div className="absolute top-6 left-6 text-8xl text-red-700 opacity-10 font-serif leading-none">"</div>
            <div className="absolute bottom-6 right-6 text-8xl text-red-700 opacity-10 font-serif leading-none">"</div>
            
            <div className="flex items-center mb-6 relative z-10">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{t('testimonial.teacherVoice')}</span>
            </div>

            <blockquote className="text-2xl lg:text-3xl font-light text-gray-900 leading-relaxed mb-8 relative z-10">
              {t('testimonial.mainTeacherQuote')}
            </blockquote>

            <div className="flex items-center relative z-10">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gray-200 ring-4 ring-white shadow-md">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20asian%20teacher%20portrait%20warm%20smile%20wearing%20professional%20attire%20bright%20natural%20light%20clean%20background%20confident%20expression&width=200&height=200&seq=faculty-001&orientation=squarish" 
                  alt="Faculty" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{t('testimonial.mainTeacherName')}</div>
                <div className="text-sm text-gray-600">{t('testimonial.mainTeacherRole')}</div>
              </div>
            </div>
          </div>

          {/* Right - Enhanced Stats */}
          <div ref={statsRef} className="space-y-5">
            {/* PhD Stat */}
            <div
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group"
              style={{
                opacity: isStatsVisible ? 1 : 0,
                transform: isStatsVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
            >
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <CircularProgress value={64} maxValue={100} size={80} strokeWidth={6} isVisible={isStatsVisible} delay={200} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{phdCount}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-500 mb-1">{t('testimonial.stats.phd')}</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-700 to-red-400 rounded-full"
                      style={{
                        width: isStatsVisible ? '64%' : '0%',
                        transition: 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Stat */}
            <div
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group"
              style={{
                opacity: isStatsVisible ? 1 : 0,
                transform: isStatsVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
              }}
            >
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <CircularProgress value={15} maxValue={20} size={80} strokeWidth={6} isVisible={isStatsVisible} delay={400} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{expCount}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-500 mb-1">{t('testimonial.stats.experience')}</div>
                  <div className="text-lg font-semibold text-gray-900">{t('testimonial.stats.experienceValue')}</div>
                </div>
              </div>
            </div>

            {/* Ratio Stat */}
            <div
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group"
              style={{
                opacity: isStatsVisible ? 1 : 0,
                transform: isStatsVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
            >
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <CircularProgress value={85} maxValue={100} size={80} strokeWidth={6} isVisible={isStatsVisible} delay={600} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>1:13</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-500 mb-1">{t('testimonial.stats.ratio')}</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-white text-xs"></i>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 13 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-3.5 bg-red-100 rounded-full flex items-center justify-center"
                          style={{
                            opacity: isStatsVisible ? 1 : 0,
                            transition: `opacity 0.3s ease ${600 + i * 60}ms`,
                          }}
                        >
                          <i className="ri-user-line text-red-400" style={{ fontSize: '8px' }}></i>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Highlights - 9 Teachers in 3-column Grid */}
        <div ref={facultyRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {[
            {
              name: t('testimonial.faculty1.name'),
              title: t('testimonial.faculty1.title'),
              degree: t('testimonial.faculty1.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/71285de8c250263873cbb3e117953f87.jpeg'
            },
            {
              name: t('testimonial.faculty2.name'),
              title: t('testimonial.faculty2.title'),
              degree: t('testimonial.faculty2.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/b096c47e5c27748ccd014cdb91eb2a66.jpeg'
            },
            {
              name: t('testimonial.faculty3.name'),
              title: t('testimonial.faculty3.title'),
              degree: t('testimonial.faculty3.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/c895e5666ae8508147acb444662ca2d4.jpeg'
            },
            {
              name: t('testimonial.faculty4.name'),
              title: t('testimonial.faculty4.title'),
              degree: t('testimonial.faculty4.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/d12f97141c1071061a972457809dedca.jpeg'
            },
            {
              name: t('testimonial.faculty5.name'),
              title: t('testimonial.faculty5.title'),
              degree: t('testimonial.faculty5.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/e0ed7a50e2fb0664095b0601c15def8e.jpeg'
            },
            {
              name: t('testimonial.faculty6.name'),
              title: t('testimonial.faculty6.title'),
              degree: t('testimonial.faculty6.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/3f7768b3200d31bc90dcbb96aa24adfb.jpeg'
            },
            {
              name: t('testimonial.faculty7.name'),
              title: t('testimonial.faculty7.title'),
              degree: t('testimonial.faculty7.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/762fb874bc85b56c2b7f92e7536c1a89.jpeg'
            },
            {
              name: t('testimonial.faculty8.name'),
              title: t('testimonial.faculty8.title'),
              degree: t('testimonial.faculty8.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/1933871fc272662764190aed20ace0eb.jpeg'
            },
            {
              name: t('testimonial.faculty9.name'),
              title: t('testimonial.faculty9.title'),
              degree: t('testimonial.faculty9.degree'),
              image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/cfcedcb58d07173e6746c721aa33649f.jpeg'
            }
          ].map((faculty, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
              style={{
                opacity: isFacultyVisible ? 1 : 0,
                transform: isFacultyVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
              }}
            >
              {/* Circular Photo */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-100 group-hover:ring-red-200 transition-all duration-500 shadow-md group-hover:shadow-xl">
                <img 
                  src={faculty.image} 
                  alt={faculty.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Name */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3 tracking-wide group-hover:text-red-700 transition-colors duration-300">
                {faculty.name}
              </h4>
              
              {/* Title */}
              <p className="text-base text-gray-600 mb-2 leading-relaxed tracking-wide">
                {faculty.title}
              </p>
              
              {/* Degree */}
              {faculty.degree && (
                <div className="flex items-center justify-center text-sm text-gray-500 tracking-wide">
                  <i className="ri-graduation-cap-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  <span>{faculty.degree}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
