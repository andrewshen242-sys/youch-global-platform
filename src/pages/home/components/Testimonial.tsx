import { useTranslation } from 'react-i18next';

export default function Testimonial() {
  const { t } = useTranslation('common');

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            {t('testimonial.facultyTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('testimonial.facultyDescription')}
          </p>
        </div>

        {/* Main Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Quote */}
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{t('testimonial.teacherVoice')}</span>
            </div>

            <blockquote className="text-2xl lg:text-3xl font-light text-gray-900 leading-relaxed mb-8">
              {t('testimonial.mainTeacherQuote')}
            </blockquote>

            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
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

          {/* Right - Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{t('testimonial.stats.phd')}</span>
                <span className="text-2xl font-bold text-red-700">64%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-700 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{t('testimonial.stats.experience')}</span>
                <span className="text-2xl font-bold text-red-700">{t('testimonial.stats.experienceValue')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-700 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{t('testimonial.stats.ratio')}</span>
                <span className="text-2xl font-bold text-red-700">1:13</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-700 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: t('testimonial.faculty1.name'),
              title: t('testimonial.faculty1.title'),
              degree: t('testimonial.faculty1.degree'),
              image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20professor%20portrait%20friendly%20smile%20wearing%20glasses%20professional%20attire%20bright%20natural%20light%20clean%20background&width=200&height=200&seq=faculty-002&orientation=squarish'
            },
            {
              name: t('testimonial.faculty2.name'),
              title: t('testimonial.faculty2.title'),
              degree: t('testimonial.faculty2.degree'),
              image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20professor%20portrait%20confident%20smile%20wearing%20professional%20attire%20bright%20natural%20light%20clean%20background&width=200&height=200&seq=faculty-003&orientation=squarish'
            },
            {
              name: t('testimonial.faculty3.name'),
              title: t('testimonial.faculty3.title'),
              degree: t('testimonial.faculty3.degree'),
              image: 'https://readdy.ai/api/search-image?query=professional%20asian%20teacher%20portrait%20warm%20expression%20wearing%20professional%20attire%20bright%20natural%20light%20clean%20background&width=200&height=200&seq=faculty-004&orientation=squarish'
            }
          ].map((faculty, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="w-full h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={faculty.image} 
                  alt={faculty.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{faculty.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{faculty.title}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <i className="ri-graduation-cap-line mr-1"></i>
                  {faculty.degree}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
