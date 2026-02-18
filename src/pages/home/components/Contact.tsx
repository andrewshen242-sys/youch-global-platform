import { useState } from 'react';
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

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-medium text-gray-900 mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {t('contact.description')}
            </p>

            {/* Contact Methods */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-mail-line text-teal-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t('contact.email.title')}</h4>
                  <a href={`mailto:${t('contact.email.value')}`} className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                    {t('contact.email.value')}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-phone-line text-teal-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t('contact.phone.title')}</h4>
                  <p className="text-gray-600">{t('contact.phone.value')}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('contact.phone.hours')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-map-pin-line text-teal-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t('contact.address.title')}</h4>
                  <p className="text-gray-600">{t('contact.address.value')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="ri-time-line text-teal-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t('contact.hours.title')}</h4>
                  <p className="text-gray-600">{t('contact.hours.weekday')}</p>
                  <p className="text-gray-600">{t('contact.hours.weekend')}</p>
                </div>
              </div>
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
                    className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all text-sm cursor-pointer"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition-all resize-none text-sm"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.message.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-sm">
                  {t('contact.form.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {t('contact.form.errorMessage')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
