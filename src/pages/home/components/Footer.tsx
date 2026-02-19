import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('email', email);

      const response = await fetch('https://readdy.ai/api/form/d6al1hlt1k61917cmsdg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/c9924d4bacd0352065e597a2bacd10b1.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <i className="ri-youtube-fill"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#academics" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {t('nav.academics')}
                </a>
              </li>
              <li>
                <a href="#admissions" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {t('nav.admissions')}
                </a>
              </li>
              <li>
                <a href="#faculty" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {t('nav.faculty')}
                </a>
              </li>
              <li>
                <a href="#community" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {t('footer.community')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              {t('footer.newsletter.title')}
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.newsletter.description')}
            </p>
            <form data-readdy-form onSubmit={handleNewsletterSubmit} className="mb-3">
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-700 text-white rounded-r-lg hover:bg-red-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </form>
            {submitStatus === 'success' && (
              <p className="text-xs text-green-400">{t('footer.newsletter.success')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-xs text-red-400">{t('footer.newsletter.error')}</p>
            )}
          </div>
        </div>

        {/* Partnership */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <i className="ri-shield-check-line text-red-700"></i>
            <span>{t('footer.academicPartner')}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Online High School. {t('footer.copyright')}</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">{t('footer.terms')}</a>
              <span className="hover:text-white transition-colors">Powered by CPET&YOUCH</span>
              <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
                {t('footer.poweredBy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
