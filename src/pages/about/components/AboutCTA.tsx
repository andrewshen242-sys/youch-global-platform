
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AboutCTA() {
  const { t } = useTranslation('common');
  const { lang } = useParams<{ lang: string }>();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('email', email);
      formBody.append('source', 'about-page');

      const response = await fetch('https://readdy.ai/api/form/d6cd282ff40lgbk6ct70', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-400 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}></div>

          <div className="relative px-8 py-16 lg:px-20 lg:py-20 text-center">
            <h3 className="text-3xl sm:text-4xl font-light text-white mb-4">
              {t('aboutPage.cta.title')}
            </h3>
            <p className="text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('aboutPage.cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={`/${lang || 'en'}#admissions`}
                className="px-8 py-4 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer shadow-lg"
              >
                {t('aboutPage.cta.applyBtn')}
              </a>
              <a
                href={`/${lang || 'en'}#contact`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer"
              >
                {t('aboutPage.cta.contactBtn')}
              </a>
            </div>

            {/* Newsletter */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3">{t('aboutPage.cta.newsletterLabel')}</p>
              <form id="about-contact-form" data-readdy-form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-red-700 text-white text-sm font-medium rounded-r-lg hover:bg-red-800 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? '...' : t('aboutPage.cta.subscribeBtn')}
                </button>
              </form>
              {submitStatus === 'success' && (
                <p className="text-xs text-green-400 mt-2">{t('footer.newsletter.success')}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-xs text-red-400 mt-2">{t('footer.newsletter.error')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
