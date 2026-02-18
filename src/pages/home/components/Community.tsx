import { useTranslation } from 'react-i18next';

export default function Community() {
  const { t } = useTranslation('common');

  const activities = [
    {
      title: t('community.activity1.title'),
      date: t('community.activity1.date'),
      description: t('community.activity1.description'),
      image: 'https://readdy.ai/api/search-image?query=educational%20workshop%20with%20teachers%20and%20students%20in%20modern%20bright%20classroom%20discussing%20and%20collaborating%20with%20teal%20accents%20contemporary%20learning%20space&width=800&height=600&seq=community-001&orientation=landscape',
      tag: t('community.activity1.tag')
    },
    {
      title: t('community.activity2.title'),
      date: t('community.activity2.date'),
      description: t('community.activity2.description'),
      image: 'https://readdy.ai/api/search-image?query=student%20project%20showcase%20event%20with%20presentations%20and%20displays%20in%20modern%20exhibition%20space%20with%20teal%20and%20white%20design%20bright%20contemporary%20setting&width=800&height=600&seq=community-002&orientation=landscape',
      tag: t('community.activity2.tag')
    },
    {
      title: t('community.activity3.title'),
      date: t('community.activity3.date'),
      description: t('community.activity3.description'),
      image: 'https://readdy.ai/api/search-image?query=teacher%20community%20gathering%20with%20educators%20networking%20and%20sharing%20ideas%20in%20cozy%20modern%20cafe%20setting%20with%20teal%20color%20accents%20warm%20collaborative%20atmosphere&width=800&height=600&seq=community-003&orientation=landscape',
      tag: t('community.activity3.tag')
    },
    {
      title: t('community.activity4.title'),
      date: t('community.activity4.date'),
      description: t('community.activity4.description'),
      image: 'https://readdy.ai/api/search-image?query=online%20learning%20forum%20interface%20on%20laptop%20screen%20showing%20discussion%20threads%20and%20resources%20in%20modern%20workspace%20with%20teal%20UI%20design%20clean%20digital%20environment&width=800&height=600&seq=community-004&orientation=landscape',
      tag: t('community.activity4.tag')
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-medium text-gray-900 mb-4">
            {t('community.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('community.subtitle')}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-teal-600 transition-all hover:shadow-xl cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                    {activity.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-teal-600 font-medium mb-3">
                  <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  {activity.date}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <div className="flex items-center text-teal-600 font-medium group-hover:translate-x-2 transition-transform cursor-pointer">
                  <span className="whitespace-nowrap">{t('community.learnMore')}</span>
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="#join" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
            {t('community.cta')}
            <i className="ri-calendar-check-line ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
