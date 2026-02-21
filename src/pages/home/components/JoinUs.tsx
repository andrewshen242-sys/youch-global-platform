import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function JoinUs() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [visibleBenefits, setVisibleBenefits] = useState<boolean[]>([false, false, false, false]);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = benefitsRef.current.map((benefit, index) => {
      if (!benefit) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleBenefits(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 100);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(benefit);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && benefitsRef.current[index]) {
          observer.unobserve(benefitsRef.current[index]!);
        }
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d6al1hlt1k61917cmseg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', role: '', interest: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    { icon: 'ri-lightbulb-line', title: t('joinUs.benefit1.title'), desc: t('joinUs.benefit1.description') },
    { icon: 'ri-team-line', title: t('joinUs.benefit2.title'), desc: t('joinUs.benefit2.description') },
    { icon: 'ri-trophy-line', title: t('joinUs.benefit3.title'), desc: t('joinUs.benefit3.description') },
    { icon: 'ri-rocket-line', title: t('joinUs.benefit4.title'), desc: t('joinUs.benefit4.description') }
  ];

  return (
    <div className="py-14 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('joinUs.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('joinUs.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  ref={el => benefitsRef.current[index] = el}
                  className={`flex items-start group transition-all duration-500 ${
                    visibleBenefits[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
                    <i className={`${benefit.icon} text-red-700 group-hover:text-white text-xl transition-colors`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-500">
            <form id="join-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.name')} {t('joinUs.form.required')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all text-sm"
                  placeholder={t('joinUs.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.email')} {t('joinUs.form.required')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all text-sm"
                  placeholder={t('joinUs.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all text-sm"
                  placeholder={t('joinUs.form.phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.role')} {t('joinUs.form.required')}
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all text-sm cursor-pointer"
                >
                  <option value="">{t('joinUs.form.roleOptions.select')}</option>
                  <option value="student">{t('joinUs.form.roleOptions.student')}</option>
                  <option value="teacher">{t('joinUs.form.roleOptions.teacher')}</option>
                  <option value="parent">{t('joinUs.form.roleOptions.parent')}</option>
                  <option value="educator">{t('joinUs.form.roleOptions.educator')}</option>
                  <option value="other">{t('joinUs.form.roleOptions.other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.interest')}
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all text-sm cursor-pointer"
                >
                  <option value="">{t('joinUs.form.interestOptions.select')}</option>
                  <option value="inquiry">{t('joinUs.form.interestOptions.inquiry')}</option>
                  <option value="project">{t('joinUs.form.interestOptions.project')}</option>
                  <option value="teacher">{t('joinUs.form.interestOptions.teacher')}</option>
                  <option value="custom">{t('joinUs.form.interestOptions.custom')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('joinUs.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:bg-white outline-none transition-all resize-none text-sm"
                  placeholder={t('joinUs.form.messagePlaceholder')}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.message.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 hover:shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? t('joinUs.form.submitting') : t('joinUs.form.submit')}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-fade-in">
                  {t('joinUs.form.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                  {t('joinUs.form.errorMessage')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
