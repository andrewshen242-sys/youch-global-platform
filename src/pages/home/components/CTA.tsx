import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation('common');

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=wide%20panoramic%20view%20of%20collaborative%20learning%20space%20with%20students%20working%20together%20around%20large%20table%20with%20whiteboards%20and%20mind%20maps%20visible%20bright%20natural%20light%20from%20large%20windows%20teal%20and%20white%20color%20scheme%20modern%20educational%20environment&width=1920&height=1080&seq=cta-bg-001&orientation=landscape" 
          alt="CTA Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Title */}
          <div>
            <h2 className="text-6xl lg:text-7xl font-bold text-white leading-tight lowercase">
              {t('cta.title1')}
              <br />
              {t('cta.title2')}
            </h2>
          </div>

          {/* Right - Description */}
          <div className="lg:text-right">
            <p className="text-xl lg:text-2xl text-white font-light leading-relaxed">
              {t('cta.description1')}
              <br />
              {t('cta.description2')}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-16">
          <a 
            href="#programs"
            className="inline-flex items-center bg-white rounded-full pr-2 pl-8 py-2 hover:translate-x-2 transition-all shadow-lg cursor-pointer group"
          >
            <span className="text-gray-900 font-semibold text-lg mr-4 whitespace-nowrap">{t('cta.button')}</span>
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
              <i className="ri-arrow-right-line text-white text-xl"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
