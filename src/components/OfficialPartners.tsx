import React from 'react';

export interface PartnerItem {
  id: string;
  testId: string;
  title: string;
  link: string;
  logo: string;
}

// Anda bisa langsung mengedit daftar partner, link tujuan, dan logo di bawah ini:
export const OFFICIAL_PARTNERS: PartnerItem[] = [
  {
    id: '1',
    testId: 'home-partner-1',
    title: 'TEXASPOKERCC',
    link: 'https://texaspoker.space/cc',
    logo: 'https://cf.ruangok.com/public/banner/id/texaspoker/logo/logo-TPK-Gif-New.webp?1782421396',
  },
  {
    id: '4',
    testId: 'home-partner-4',
    title: 'JAYAPOKER',
    link: 'https://jayapoker.shop/jp',
    logo: 'https://cf.ruangok.com/public/banner/id/jayapoker/logo/jpk.webp?1782362501#',
  },
  {
    id: '18',
    testId: 'home-partner-18',
    title: 'POKERBOYA',
    link: 'https://pokerboya.shop/boya',
    logo: 'https://cf.ruangok.com/public/banner/id/pokerboya/logo/Logo-Glichtess.gif?1782776452',
  },
  {
    id: '3',
    testId: 'home-partner-3',
    title: 'AFAPOKER',
    link: 'https://afapoker.shop/afa',
    logo: 'https://cf.ruangok.com/public/banner/id/afapoker/logo/gologolo.gif?1784498947#',
  },
  {
    id: '5',
    testId: 'home-partner-5',
    title: 'RGOPOKER',
    link: 'https://rpenergy.site/rgo/',
    logo: 'https://cf.ruangok.com/public/banner/id/rgopoker/logo/LOGO%20GIF%20RGOPOKER%20NEW%202025%201%20(2).gif?1782420097#',
  },
];

export const OfficialPartners: React.FC = () => {
  return (
    <section
      className="py-16 container mx-auto px-4 border-t border-white/5 relative"
      data-testid="partner-resmi-section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-32 bg-yellow-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/3 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
          PARTNER RESMI EXTRA TIME
        </h2>
        <p className="text-gray-400">Partner Resmi Situs Terbaik &amp; Terpercaya</p>
      </div>

      {/* Partner Cards Grid */}
      <div className="partner-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center max-w-6xl mx-auto">
        {OFFICIAL_PARTNERS.map((partner) => (
          <a
            key={partner.id}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-card group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-[#141720] to-[#0c0f16] hover:from-[#1a2130] hover:to-[#101622] border border-[#202738] hover:border-yellow-400/70 transition-all duration-300 shadow-md hover:shadow-yellow-500/10 hover:-translate-y-1 min-h-[96px] w-full text-center overflow-hidden cursor-pointer"
            data-testid={partner.testId}
            title={partner.title}
          >
            <img
              alt={partner.title}
              loading="lazy"
              src={partner.logo}
              referrerPolicy="no-referrer"
              className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.partner-fallback');
                if (fallback) {
                  (fallback as HTMLElement).style.display = 'flex';
                }
              }}
            />
            {/* Fallback badge if image fails to load */}
            <div className="partner-fallback hidden flex-col items-center justify-center text-xs font-bold text-white tracking-wider">
              <span>{partner.title}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
