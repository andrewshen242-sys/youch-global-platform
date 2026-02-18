import { useTranslation } from 'react-i18next';

export default function Mission() {
  const { t } = useTranslation('common');

  const stats = [
    { number: '5000+', label: t('mission.stat1') },
    { number: '800+', label: t('mission.stat2') },
    { number: '12000+', label: t('mission.stat3') }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Partnership Banner */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-red-50 border border-red-200 rounded-full mb-6">
            <i className="ri-award-line text-red-700 mr-2"></i>
            <span className="text-sm font-semibold text-red-800 uppercase tracking-wide">
              {t('mission.partnership.badge')}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {t('mission.partnership.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('mission.partnership.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-8">
              {t('mission.title1')} {t('mission.title2')}
            </h3>

            {/* Mission Points */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <i className="ri-lightbulb-line text-red-700"></i>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {t('mission.point1')}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <i className="ri-compass-line text-red-700"></i>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {t('mission.point2')}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <i className="ri-team-line text-red-700"></i>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {t('mission.point3')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-8">{t('mission.achievements')}</h4>
            <div className="grid grid-cols-1 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-4 border-red-700 pl-6">
                  <div className="text-4xl font-bold text-red-700 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dual Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border border-red-100">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <i className="ri-graduation-cap-line text-red-700 text-2xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">{t('mission.dualFocus.student.title')}</h4>
            <p className="text-base text-gray-600 leading-relaxed">
              {t('mission.dualFocus.student.description')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-6">
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
