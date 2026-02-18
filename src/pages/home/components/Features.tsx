import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation('common');

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
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {t('features.academicTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('features.academicDescription')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-red-700 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic Standards */}
        <div className="bg-white rounded-2xl p-10 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-light text-gray-900 mb-6">
                {t('features.standards.title')}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {t('features.standards.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-fill text-red-700 mr-3"></i>
                  <span className="text-sm text-gray-700">{t('features.standards.feature1')}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-fill text-red-700 mr-3"></i>
                  <span className="text-sm text-gray-700">{t('features.standards.feature2')}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-fill text-red-700 mr-3"></i>
                  <span className="text-sm text-gray-700">{t('features.standards.feature3')}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-fill text-red-700 mr-3"></i>
                  <span className="text-sm text-gray-700">{t('features.standards.feature4')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">{t('features.subjects.title')}</h4>
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
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{subject}</span>
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
