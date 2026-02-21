import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemsRef.current.map((item, index) => {
      if (!item) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleItems(prev => {
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
      
      observer.observe(item);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && itemsRef.current[index]) {
          observer.unobserve(itemsRef.current[index]!);
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

      const response = await fetch('https://readdy.ai/api/form/d6al1hlt1k61917cmse0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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

  const contactMethods = [
    {
      icon: 'ri-mail-line',
      title: t('contact.email.title'),
      content: t('contact.email.value'),
      link: `mailto:${t('contact.email.value')}`
    },
    {
      icon: 'ri-phone-line',
      title: t('contact.phone.title'),
      content: t('contact.phone.value'),
      subtitle: t('contact.phone.hours')
    },
    {
      icon: 'ri-map-pin-line',
      title: t('contact.address.title'),
      content: t('contact.address.value')
    },
    {
      icon: 'ri-time-line',
      title: t('contact.hours.title'),
      content: `${t('contact.hours.weekday')} / ${t('contact.hours.weekend')}`
    }
  ];

  return (
    <div className="py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header - Unified Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div>
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  ref={el => itemsRef.current[index] = el}
                  className={`flex items-start group transition-all duration-500 ${
                    visibleItems[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
                    <i className={`${method.icon} text-red-700 group-hover:text-white text-xl transition-colors`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">{method.title}</h4>
                    {method.link ? (
                      <a href={method.link} className="text-gray-600 hover:text-red-700 transition-colors cursor-pointer">
                        {method.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">{method.content}</p>
                    )}
                    {method.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">{method.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h4 className="font-semibold text-gray-900 mb-4">{t('contact.social')}</h4>
              <div className="flex space-x-4">
                {[
                  { icon: 'ri-facebook-fill', label: 'Facebook' },
                  { icon: 'ri-instagram-line', label: 'Instagram' },
                  { icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                  { icon: 'ri-youtube-fill', label: 'YouTube' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-red-700 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-500">
            <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name')} {t('contact.form.required')}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:shadow-md outline-none transition-all text-sm"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')} {t('contact.form.required')}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:shadow-md outline-none transition-all text-sm"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.subject')} {t('contact.form.required')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:shadow-md outline-none transition-all text-sm cursor-pointer"
                >
                  <option value="">{t('contact.form.subjectOptions.select')}</option>
                  <option value="course">{t('contact.form.subjectOptions.course')}</option>
                  <option value="cooperation">{t('contact.form.subjectOptions.cooperation')}</option>
                  <option value="feedback">{t('contact.form.subjectOptions.feedback')}</option>
                  <option value="technical">{t('contact.form.subjectOptions.technical')}</option>
                  <option value="other">{t('contact.form.subjectOptions.other')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')} {t('contact.form.required')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent focus:shadow-md outline-none transition-all resize-none text-sm"
                  placeholder={t('contact.form.messagePlaceholder')}
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
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-fade-in">
                  {t('contact.form.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                  {t('contact.form.errorMessage')}
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
