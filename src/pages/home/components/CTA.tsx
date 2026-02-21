import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function CTA() {
  const { t } = useTranslation('common');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled * 0.003);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="cta-section" className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 100}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          src="https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/33bed01683b3dd20d886f2c957f1f67f.png" 
          alt="CTA Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Title */}
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h2 className="text-6xl lg:text-7xl font-bold text-white leading-tight lowercase animate-fade-in-up">
                {t('cta.title1')}
                <br />
                <span className="text-red-400">{t('cta.title2')}</span>
              </h2>
            </div>
          </div>

          {/* Right - Description */}
          <div className="lg:text-right space-y-6">
            <div className="overflow-hidden">
              <p className="text-xl lg:text-2xl text-white font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {t('cta.description1')}
                <br />
                {t('cta.description2')}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#programs"
            className="inline-flex items-center bg-white rounded-full pr-2 pl-8 py-2 hover:translate-x-4 hover:shadow-2xl transition-all duration-500 shadow-lg cursor-pointer group"
          >
            <span className="text-gray-900 font-semibold text-lg mr-4 whitespace-nowrap">{t('cta.button')}</span>
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center group-hover:rotate-90 group-hover:scale-110 transition-all duration-500">
              <i className="ri-arrow-right-line text-white text-xl"></i>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
