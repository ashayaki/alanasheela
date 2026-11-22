'use client';

import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ExternalLink, ArrowRight, Star, Layers, Check } from 'lucide-react';
import { ASC_MIX_MATCH_LOOKS, MixMatchLook, MixMatchItem } from '@/data/asc-mix-match';

interface MixMatchSectionProps {
  onSelectCategory: (cat: string) => void;
  onOpenProductById?: (productId: string) => void;
}

export function MixMatchSection({ onSelectCategory }: MixMatchSectionProps) {
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const currentLook: MixMatchLook = ASC_MIX_MATCH_LOOKS[activeLookIndex];

  const handleNavigateToCategory = (cat: string) => {
    onSelectCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderComponentCard = (item: MixMatchItem, iconLabel: string) => {
    return (
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#e5dcce] shadow-2xs hover:border-[#8b9973] transition-all flex flex-col justify-between group">
        <div>
          {/* Header Tag */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#55623f] bg-[#f0f4ea] px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>{iconLabel}</span>
              <span>{item.typeLabel}</span>
            </span>
            <span
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                item.platform === 'shopee'
                  ? 'bg-[#fff5f2] border-[#fcd8cf] text-[#e04523]'
                  : 'bg-[#f4f4f4] border-[#d8d8d8] text-[#1a1a1a]'
              }`}
            >
              {item.marketplaceName}
            </span>
          </div>

          {/* Product Thumbnail & Name */}
          <div className="flex gap-3 items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#f4eee4] shrink-0 border border-[#eae1d4]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-serif-luxury text-xs sm:text-sm font-medium text-[#24291e] line-clamp-2 leading-snug">
                {item.name}
              </h4>
              <p className="text-[11px] text-[#78826b] mt-0.5 truncate">
                Warna: <span className="font-medium text-[#444d36]">{item.color}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Cek di Toko & Menu Category Link */}
        <div className="pt-3 mt-3 border-t border-[#f0e9dd] space-y-2">
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-[#4a5438] hover:bg-[#3b442b] text-white text-[11px] font-medium tracking-wider uppercase py-2 px-3 rounded-lg transition-all shadow-2xs"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Cek di Toko</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <button
            onClick={() => handleNavigateToCategory(item.categoryTab)}
            className="w-full text-center text-[10px] font-medium text-[#5c6846] hover:text-[#2a321e] hover:underline flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <span>Tersedia di Menu {item.categoryTab.toUpperCase()}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="mix-match-section" className="w-full py-12 lg:py-16 bg-[#fbf9f5] border-b border-[#eae1d4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-[0.2em] text-[#55623f] bg-[#f0f4ea] uppercase border border-[#cdd8bf]">
            <Sparkles className="w-3.5 h-3.5 text-[#55623f]" />
            <span>Inspirasi Padu-Padan Lengkap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#24291e]">
            Mix &amp; Match <span className="italic font-normal text-[#4a5438]">Style Studio</span>
          </h2>
          <p className="text-[#5f6655] text-xs sm:text-sm">
            Satu set tampilan utuh kurasi Lala. Lihat foto full look dan langsung temukan atasan, bawahan, tas, serta sepatu yang serasi di menu masing-masing!
          </p>
        </div>

        {/* Look Selector Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {ASC_MIX_MATCH_LOOKS.map((look, idx) => {
            const isActive = activeLookIndex === idx;
            return (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#4a5438] text-white shadow-xs font-semibold'
                    : 'bg-white text-[#4d5541] hover:text-[#24291e] hover:bg-[#f6f2ec] border border-[#e5dcce]'
                }`}
              >
                {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                <span>Look 0{idx + 1}: {look.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Mix & Match Showcase */}
        <div className="bg-[#f6f1e8] border border-[#e4dcce] rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left: Slot Foto Full Look (Slot OOTD Lengkap Model / Lala) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-white border border-[#ded5c6] shadow-sm group">
                <img
                  src={currentLook.fullLookImage}
                  alt={currentLook.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md border border-[#cdd8bf] text-[#3e4a2d] shadow-2xs">
                    {currentLook.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#4a5438] text-white flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-[#d2dac8]" />
                    <span>Full Outfit Look</span>
                  </span>
                </div>

                {/* Bottom Overlay Gradient with Occasion */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b2216]/80 via-[#1b2216]/30 to-transparent p-4 text-white">
                  <p className="text-[10px] tracking-wider uppercase text-[#d6e3c9] font-medium">
                    {currentLook.occasion}
                  </p>
                  <h3 className="font-serif-luxury text-lg font-medium text-white">
                    {currentLook.title}
                  </h3>
                </div>
              </div>

              {/* Lala Style Advice Box */}
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-[#ded5c6] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#4a5438]">
                  <Star className="w-3.5 h-3.5 fill-[#4a5438]" />
                  <span>Catatan Gaya Lala:</span>
                </div>
                <p className="text-xs text-[#39422f] italic leading-relaxed">
                  “{currentLook.lalaQuote}”
                </p>
              </div>
            </div>

            {/* Right: Kotak Preview Top, Bottom, Sepatu, dan Tas */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#24291e]">
                    Komponen Outfit Look Ini
                  </h3>
                  <p className="text-xs text-[#69725f] mt-0.5">
                    Tersedia di masing-masing kategori menu dan siap dicek langsung di toko partner:
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-[#5c6846] bg-white px-3 py-1 rounded-full border border-[#ded5c6]">
                  <Layers className="w-3.5 h-3.5 text-[#4a5438]" />
                  <span>4 Item Serasi</span>
                </div>
              </div>

              {/* 2x2 Grid Preview Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Atasan (Top) */}
                {renderComponentCard(currentLook.items.top, '👗')}

                {/* 2. Bawahan (Bottom) */}
                {renderComponentCard(currentLook.items.bottom, '👖')}

                {/* 3. Tas (Bag) */}
                {renderComponentCard(currentLook.items.bag, '👜')}

                {/* 4. Sepatu (Shoes) */}
                {renderComponentCard(currentLook.items.shoes, '👠')}
              </div>

              {/* Banner Footer Callout */}
              <div className="p-3.5 rounded-xl bg-white/80 border border-[#e2d8c9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#586249]">
                  Ingin melihat variasi model lain untuk setiap kategori?
                </span>
                <button
                  onClick={() => handleNavigateToCategory('all')}
                  className="text-xs font-semibold tracking-wider text-[#4a5438] hover:text-[#2d3420] underline flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Buka Semua Katalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
