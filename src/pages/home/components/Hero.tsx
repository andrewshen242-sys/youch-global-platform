
export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* YouTube Video Background - Desktop Only */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <iframe
          className="absolute inset-0 w-full h-full"
          style={{ 
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
          src="https://www.youtube.com/embed/AWXRB1WUsGE?autoplay=1&mute=1&loop=1&playlist=AWXRB1WUsGE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Mobile Background Image */}
      <div className="absolute inset-0 z-0 md:hidden bg-black">
        <img 
          src="https://readdy.ai/api/search-image?query=Modern%20educational%20technology%20background%20with%20abstract%20geometric%20patterns%2C%20digital%20learning%20concept%2C%20clean%20minimalist%20design%20with%20soft%20gradients%20in%20dark%20tones%2C%20professional%20academic%20atmosphere%2C%20subtle%20tech%20elements%2C%20contemporary%20online%20education%20visual%2C%20high%20quality%20digital%20illustration&width=800&height=1200&seq=hero-mobile-bg-001&orientation=portrait"
          alt="Education Background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Academic Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-white leading-tight mb-4 sm:mb-6">
              <span className="block">Project-Based</span>
              <span className="block">Online Learning Academy</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* Partnership Badge */}
            <div className="flex items-start space-x-3 sm:space-x-4 mb-8 sm:mb-10 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <i className="ri-shield-check-line text-white text-lg sm:text-xl"></i>
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  {t('hero.partnership.title')}
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  {t('hero.partnership.subtitle')}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#admissions" className="px-6 sm:px-8 py-3 sm:py-4 bg-red-700 text-white text-sm sm:text-base font-medium rounded-md hover:bg-red-800 transition-all whitespace-nowrap cursor-pointer shadow-lg text-center">
                {t('hero.applyNow')}
              </a>
              <a href="#about" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-medium rounded-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all whitespace-nowrap cursor-pointer text-center">
                {t('hero.learnMore')}
              </a>
            </div>
          </div>

          {/* Right side - empty for video focus on desktop */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
}
