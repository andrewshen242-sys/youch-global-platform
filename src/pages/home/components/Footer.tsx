
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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/1745d77b694c6f3d19804cb26390aa9a.png" alt="CPET-YouCH Online Academy" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: 'ri-facebook-fill', label: 'Facebook' },
                { icon: 'ri-instagram-line', label: 'Instagram' },
                { icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                { icon: 'ri-youtube-fill', label: 'YouTube' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all duration-300 cursor-pointer group"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} group-hover:rotate-12 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4 relative inline-block">
              {t('footer.quickLinks')}
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-600"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#about', text: t('footer.about') },
                { href: '#academics', text: t('nav.academics') },
                { href: '#admissions', text: t('nav.admissions') },
                { href: '#faculty', text: t('nav.faculty') },
                { href: '#community', text: t('footer.community') }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer group"
                  >
                    <span className="group-hover:border-b group-hover:border-red-600">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4 relative inline-block">
              {t('footer.newsletter.title')}
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-600"></div>
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
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-700 text-white rounded-r-lg hover:bg-red-800 hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </form>
            {submitStatus === 'success' && (
              <p className="text-xs text-green-400 animate-fade-in">{t('footer.newsletter.success')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-xs text-red-400 animate-fade-in">{t('footer.newsletter.error')}</p>
            )}
          </div>
        </div>

        {/* Partnership */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <i className="ri-shield-check-line text-red-700 text-lg"></i>
            <span>{t('footer.academicPartner')}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2018 CPET-YouCH Online Academy. {t('footer.copyright')}</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="hover:text-white transition-colors">Powered by CPET-YouCH</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}
