
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

export default function TeamSection() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const leadershipTeam = [
    {
      name: 'Andrew Sheng',
      title: t('aboutPage.team.leader1.title'),
      desc: t('aboutPage.team.leader1.desc'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/71285de8c250263873cbb3e117953f87.jpeg',
    },
    {
      name: 'Roberta Lenger Kang',
      title: t('aboutPage.team.leader2.title'),
      desc: t('aboutPage.team.leader2.desc'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/b096c47e5c27748ccd014cdb91eb2a66.jpeg',
    },
    {
      name: 'Yubin Lin',
      title: t('aboutPage.team.leader3.title'),
      desc: t('aboutPage.team.leader3.desc'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/c895e5666ae8508147acb444662ca2d4.jpeg',
    },
  ];

  const academicTeam = [
    {
      name: 'Faith Little',
      title: t('aboutPage.team.academic1.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/d12f97141c1071061a972457809dedca.jpeg',
    },
    {
      name: 'Jingquan Wu',
      title: t('aboutPage.team.academic2.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/e0ed7a50e2fb0664095b0601c15def8e.jpeg',
    },
    {
      name: 'Courtney Brown',
      title: t('aboutPage.team.academic3.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/3f7768b3200d31bc90dcbb96aa24adfb.jpeg',
    },
    {
      name: 'LANCE OZIER',
      title: t('aboutPage.team.academic4.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/762fb874bc85b56c2b7f92e7536c1a89.jpeg',
    },
    {
      name: 'LAURA RIGOLOSIL',
      title: t('aboutPage.team.academic5.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/1933871fc272662764190aed20ace0eb.jpeg',
    },
    {
      name: 'Kelsey Hammond',
      title: t('aboutPage.team.academic6.title'),
      image: 'https://static.readdy.ai/image/3af05d3b472ac0100d31991f59cc9c0c/cfcedcb58d07173e6746c721aa33649f.jpeg',
    },
  ];

  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
            <span className="text-xs font-semibold text-red-800 uppercase tracking-widest">
              {t('aboutPage.team.badge')}
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            {t('aboutPage.team.title')}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutPage.team.subtitle')}
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h4 className="text-xl font-semibold text-gray-900 mb-10 text-center">
            <a href="#leadership" className="hover:text-red-700 transition-colors">
              {t('aboutPage.team.leadershipTitle')}
            </a>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
                }}
              >
                <div className="w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-100 group-hover:ring-red-200 transition-all duration-500 shadow-md group-hover:shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                  {member.name}
                </h4>
                <p className="text-sm text-red-700 font-medium mb-2">{member.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic & Advisory Team */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-10 text-center">
            <a href="#academic-team" className="hover:text-red-700 transition-colors">
              {t('aboutPage.team.academicTitle')}
            </a>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {academicTeam.map((member, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 3) * 100}ms`,
                }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-100 group-hover:ring-red-200 transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h5 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">
                  {member.name}
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '64%', label: t('aboutPage.team.stat1'), icon: 'ri-graduation-cap-line' },
            { number: '15+', label: t('aboutPage.team.stat2'), icon: 'ri-time-line' },
            { number: '1:13', label: t('aboutPage.team.stat3'), icon: 'ri-user-heart-line' },
            { number: '8+', label: t('aboutPage.team.stat4'), icon: 'ri-earth-line' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors duration-300 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 6) * 100}ms`,
              }}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <i className={`${stat.icon} text-red-700`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {stat.number}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
