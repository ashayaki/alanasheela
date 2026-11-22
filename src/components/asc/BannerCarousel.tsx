'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Megaphone, ArrowRight, ArrowUpRight } from 'lucide-react';

interface SlideItem {
  id: string;
  type: 'brand' | 'showcase' | 'ad-slot';
  title: string;
  tagline?: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isExternal?: boolean;
  showLogo?: boolean;
}

export function BannerCarousel() {
  const slides: SlideItem[] = [
    {
      id: 'banner-brand',
      type: 'brand',
      title: 'Lala Style Picks',
      tagline: 'INSPIRED BY LALA, PICKED FOR YOU',
      subtitle: 'Inspirasi Belanja Modis Ala Lala',
      badge: 'Official Platform',
      image: '/lala-dress/lala-kondangan-01-sage-champagne.jpg',
      ctaText: 'Lihat Koleksi Baju',
      ctaLink: '#catalog-section',
      showLogo: true,
    },
    {
      id: 'banner-ad-1',
      type: 'ad-slot',
      title: 'Slot Banner Iklan Tersedia',
      tagline: 'PROMOSI & SPONSORSHIP BRAND',
      subtitle: 'Ingin produk atau brand fashion Anda dilihat ribuan pengunjung alanasheela.shop? Pasang banner di sini!',
      badge: 'Ruang Promosi & Iklan',
      image: '/lala-dress/lala-look-01-emerald-gold.jpg',
      ctaText: 'Pasang Iklan Sekarang',
      ctaLink: 'https://wa.me/?text=Halo%20Admin%20ASC%20Official,%20saya%20berminat%20untuk%20pasang%20banner%20iklan%20di%20alanasheela.shop.%20Mohon%20info%20ketentuan%20dan%20biayanya.',
      isExternal: true,
    },
    {
      id: 'banner-showcase',
      type: 'showcase',
      title: 'Nordic Series & Earth Tone Collection',
      tagline: 'WARNA TENANG & ANGGUN',
      subtitle: 'Paduan warna tenang olive, krem alami, dan dusty pastel yang sejuk di mata.',
      badge: 'Rekomendasi Favorit',
      image: '/lala-dress/lala-nordic-06-nordic-blue.jpg',
      ctaText: 'Jelajahi Pilihan',
      ctaLink: '#catalog-section',
      showLogo: true,
    },
    {
      id: 'banner-ad-2',
      type: 'ad-slot',
      title: 'Kerja Sama Brand & Sponsor Partner',
      tagline: 'KOLABORASI AFFILIATE',
      subtitle: 'Buka peluang kolaborasi affiliasi dan promosi produk busana Anda bersama ASC (Alana Sheela Clarissa).',
      badge: 'Open Partnership',
      image: '/lala-dress/abaya-2layer-1.jpg',
      ctaText: 'Hubungi Admin Iklan',
      ctaLink: 'https://wa.me/?text=Halo%20Admin%20ASC%20Official,%20kami%20ingin%20mengajukan%20kerja%20sama%20promosi/iklan%20produk%20di%20alanasheela.shop.',
      isExternal: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-sm border border-[#e2d8ca] bg-[#f4eee4] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => {
            const isAd = slide.type === 'ad-slot';

            return (
              <div
                key={slide.id}
                className="w-full shrink-0 relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[24/9] min-h-[290px] sm:min-h-[340px] md:min-h-[370px] flex items-center"
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />

                {/* Gradient Dimmer for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#171e15]/95 via-[#1d261b]/80 sm:via-[#1d261b]/70 to-transparent pointer-events-none" />

                {/* Slide Content: With ASC Logo Integrated */}
                <div className="relative z-10 px-6 sm:px-12 md:px-16 py-6 max-w-2xl text-white space-y-3">
                  
                  {/* Top Badge & ASC Lily Logo Icon */}
                  <div className="flex items-center gap-3">
                    {slide.showLogo && (
                      <div className="p-1 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xs shrink-0">
                        <img
                          src="/images/asc-logo.png"
                          alt="ASC Logo"
                          className="h-9 sm:h-11 w-auto object-contain brightness-105"
                          style={{ maxHeight: '44px', width: 'auto' }}
                        />
                      </div>
                    )}

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {isAd ? (
                        <Megaphone className="w-3.5 h-3.5 text-[#e6f2dc]" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-[#e6f2dc]" />
                      )}
                      <span>{slide.badge}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.1] text-white">
                    {slide.title}
                  </h2>

                  {/* Tagline if available */}
                  {slide.tagline && (
                    <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#dbe8d2] pt-0.5">
                      {slide.tagline}
                    </p>
                  )}

                  {/* Subtitle */}
                  <p className="text-xs sm:text-base text-[#e0e8db] font-light leading-relaxed max-w-lg line-clamp-2">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <a
                      href={slide.ctaLink}
                      target={slide.isExternal ? '_blank' : '_self'}
                      rel={slide.isExternal ? 'noopener noreferrer' : ''}
                      className={`inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full transition-all cursor-pointer shadow-sm ${
                        isAd
                          ? 'bg-[#5c6d48] hover:bg-[#4a5839] text-white'
                          : 'bg-white hover:bg-[#f6f2eb] text-[#2c3420]'
                      }`}
                    >
                      <span>{slide.ctaText}</span>
                      {slide.isExternal ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </a>
                  </div>

                </div>

                {/* Ad Tag on top right if ad slot */}
                {isAd && (
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-[10px] text-[#e0e8db] border border-white/20 uppercase tracking-widest">
                    Ad Space
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Manual Left/Right Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2c3420] border border-white/60 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-sm"
          title="Geser ke kiri"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2c3420] border border-white/60 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-sm"
          title="Geser ke kanan"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/75'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
