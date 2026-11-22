'use client';

import React from 'react';
import { Sparkles, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

interface MuseSpotlightProps {
  onFilterMusePicks: () => void;
}

export function MuseSpotlight({ onFilterMusePicks }: MuseSpotlightProps) {
  const museLooks = [
    {
      title: 'Lala Kondangan 02 — Dusty Rose',
      image: '/lala-dress/lala-kondangan-02-dusty-rose.jpg',
      quote: 'Kelembutan warna dusty rose yang menenangkan hati.',
    },
    {
      title: 'Lala Nordic 08 — Winter Glow',
      image: '/lala-dress/lala-nordic-08-winter-glow.jpg',
      quote: 'Sentuhan micro-pleat yang memberi flow dramatis saat bergerak.',
    },
    {
      title: 'Lala Signature — Abaya 2-Layer',
      image: '/lala-dress/abaya-2layer-1.jpg',
      quote: 'Kombinasi syar’i dan royal elegance dalam satu potongan megah.',
    },
  ];

  return (
    <section id="muse-spotlight" className="w-full py-16 lg:py-24 bg-[#f6f0e6] relative overflow-hidden border-b border-[#eae1d4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#55623f] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Central Fashion Muse</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-medium text-[#24291e]">
            Alana Sheela Clarissa <span className="italic font-normal text-[#55623f]">(Lala)</span>
          </h2>
          <p className="text-[#5f6655] text-sm sm:text-base leading-relaxed">
            Sebagai muse sentral brand <strong className="text-[#24291e]">ASC (Alana Sheela Clarissa)</strong>, Lala merefleksikan karakter wanita modern yang teguh menjaga kesantunan, menyukai palet warna tenang yang damai, dan selalu tampil memikat dengan keunikan gayanya sendiri.
          </p>
        </div>

        {/* Editorial Muse Card - Pure Cream with Olive accents */}
        <div className="bg-white border border-[#e5dcce] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Quote & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <Quote className="w-12 h-12 text-[#8b9973]/30" />
              <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#2c3420] leading-snug italic">
                “Modest fashion bukan tentang menyembunyikan diri, melainkan tentang merayakan martabat, keanggunan, dan pesona sejati setiap wanita dalam balutan warna-warna tenang yang menyejukkan hati. Di ASC, kami merancang setiap gaun agar Anda menemukan karakter terbaik Anda.”
              </blockquote>
              <div className="pt-2">
                <p className="font-serif-luxury text-lg text-[#4a5438] font-semibold">
                  Alana Sheela Clarissa
                </p>
                <p className="text-xs text-[#737c66] tracking-wider uppercase">
                  Fashion Muse of ASC • alanasheela.shop
                </p>
              </div>

              {/* Muse Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#ede5d8]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#55623f] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#525946]">
                    <strong className="text-[#24291e]">Fabric Curation:</strong> Hanya menggunakan material sutra, chiffon, &amp; lace berstandar tinggi.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#55623f] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#525946]">
                    <strong className="text-[#24291e]">Modest Silhouettes:</strong> Nyaman, syar’i, tidak menerawang, dan wudhu-friendly.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#55623f] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#525946]">
                    <strong className="text-[#24291e]">Serene Palette:</strong> Harmoni warna olive, krem alami, dusty pastel, &amp; earth tone.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#55623f] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#525946]">
                    <strong className="text-[#24291e]">Handmade Details:</strong> Payet kristal &amp; bordir presisi buatan tangan artisan.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onFilterMusePicks}
                  className="inline-flex items-center gap-2 bg-[#4a5438] hover:bg-[#3b442b] text-white font-medium text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Lihat Koleksi Pilihan Muse Lala</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Muse Look Cards Gallery */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {museLooks.map((look, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden aspect-[9/16] bg-[#fbf9f5] border border-[#e5dcce] shadow-2xs">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20251c]/80 via-transparent to-transparent flex items-end p-2.5">
                    <p className="text-[10px] text-white font-medium leading-tight">
                      {look.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
