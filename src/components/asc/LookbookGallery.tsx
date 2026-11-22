'use client';

import React from 'react';
import { Camera, ExternalLink } from 'lucide-react';

interface LookbookGalleryProps {
  onSelectLook: (productName: string) => void;
}

export function LookbookGallery({ onSelectLook }: LookbookGalleryProps) {
  const looks = [
    {
      title: 'Nordic Blue Series',
      subtitle: 'Minimalist Architecture in Modest Form',
      image: '/lala-dress/lala-nordic-06-nordic-blue.jpg',
      target: 'ASC Nordic 06 — Nordic Blue Minimalist',
    },
    {
      title: 'Midnight Burgundy Cut',
      subtitle: 'Evening Gala & Ballroom Silhouette',
      image: '/lala-dress/lala-look-05-midnight-burgundy.jpg',
      target: 'ASC Muse Look 05 — Midnight Burgundy',
    },
    {
      title: 'Autumn Haze Tone',
      subtitle: 'Earthy Warmth & Soft Organic Drape',
      image: '/lala-dress/lala-nordic-07-autumn-haze.jpg',
      target: 'ASC Nordic 11 — Sunset Terracotta',
    },
    {
      title: 'Crimson Brocade Couture',
      subtitle: 'Rich Hand-woven Texture & Royal Flair',
      image: '/lala-dress/lala-look-08-crimson-brocade.jpg',
      target: 'ASC Muse Look 08 — Crimson Brocade',
    },
  ];

  return (
    <section id="lookbook-section" className="w-full py-16 lg:py-24 bg-[#f4eee4] border-b border-[#eae1d4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#55623f] uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>Editorial Lookbook</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-[#24291e]">
              Styled by Muse <span className="italic font-normal text-[#4a5438]">Lala</span>
            </h2>
            <p className="text-[#5f6655] text-sm max-w-xl">
              Inspirasi padu-padan busana modest berkelas langsung dari Alana Sheela Clarissa. Temukan harmoni warna olive, krem, dan earth tone yang menenangkan persona anggun Anda.
            </p>
          </div>

          <a
            href="https://id.pinterest.com/asclala/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#4a5438] hover:text-[#313923] transition-colors"
          >
            <span>Lihat Selengkapnya di Pinterest @asclala</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {looks.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectLook(item.target)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-white border border-[#ded5c6] hover:border-[#8b9973] transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20251c]/90 via-[#20251c]/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] tracking-widest uppercase text-[#cddbbe] font-semibold">
                  Muse Edit 0{idx + 1}
                </span>
                <h3 className="font-serif-luxury text-lg text-white font-medium group-hover:text-[#cddbbe] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#d2dac8] font-light mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
