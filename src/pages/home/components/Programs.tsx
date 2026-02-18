import { useTranslation } from 'react-i18next';

export default function Programs() {
  const { t } = useTranslation('common');

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
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {t('programs.admissionsTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('programs.admissionsDescription')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border-2 p-8 transition-all hover:shadow-xl ${
                program.highlight
                  ? 'border-red-700 shadow-lg'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              {program.highlight && (
                <div className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-semibold rounded-full mb-4">
                  {t('programs.popularTag')}
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {program.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {program.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <i className="ri-check-line text-red-700 mr-2 w-5 h-5 flex items-center justify-center"></i>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full py-3 text-center font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  program.highlight
                    ? 'bg-red-700 text-white hover:bg-red-800'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {t('programs.learnMore')}
              </a>
            </div>
          ))}
        </div>

        {/* Admissions Process */}
        <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
          <h3 className="text-3xl font-light text-gray-900 mb-8 text-center">
            {t('programs.processTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: t('programs.process.step1.title'), desc: t('programs.process.step1.desc') },
              { step: '2', title: t('programs.process.step2.title'), desc: t('programs.process.step2.desc') },
              { step: '3', title: t('programs.process.step3.title'), desc: t('programs.process.step3.desc') },
              { step: '4', title: t('programs.process.step4.title'), desc: t('programs.process.step4.desc') }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
