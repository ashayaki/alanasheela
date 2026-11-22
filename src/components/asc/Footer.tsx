'use client';

import React from 'react';
import { InfoModalType } from './InfoModal';

interface FooterProps {
  onOpenInfoModal: (type: InfoModalType) => void;
}

export function Footer({ onOpenInfoModal }: FooterProps) {
  const socialIcons = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/asc.lala/',
      title: 'Instagram @asc.lala',
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@asc.lala',
      title: 'TikTok @asc.lala',
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-.86-.06A6.33 6.33 0 0 0 3 15.59a6.33 6.33 0 0 0 6.33 6.34c3.49 0 6.33-2.84 6.33-6.34V9.08a8.16 8.16 0 0 0 4.93 1.63v-3.5c-.35 0-.69-.17-1-.52z"/>
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      url: 'https://id.pinterest.com/asclala/',
      title: 'Pinterest @asclala',
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.5.02-3.58l.75-3.18s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.4.8.89 0 .55-.35 1.37-.53 2.13-.15.63.32 1.15.94 1.15 1.13 0 2-.19 2-2.9 0-1.52-1.09-2.58-2.65-2.58-1.8 0-2.87 1.35-2.87 2.75 0 .55.21 1.13.48 1.45.05.06.06.12.04.18l-.18.73c-.03.11-.1.15-.22.1-1.03-.48-1.68-2-1.68-3.21 0-2.61 1.9-5.01 5.47-5.01 2.87 0 5.1 2.05 5.1 4.78 0 2.85-1.8 5.15-4.3 5.15-.84 0-1.63-.44-1.9-.96l-.52 1.97c-.19.72-.7 1.62-1.04 2.17A12 12 0 1 0 12 0z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@asc-lala',
      title: 'YouTube @asc-lala',
      svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#f4eee4] text-[#424b37] border-t border-[#e2d8ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Brand & Social Media Icons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#e5dcce] text-center sm:text-left">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="font-serif-luxury text-3xl font-bold tracking-widest text-[#2c3420]">
                ASC
              </span>
              <span className="text-xs tracking-[0.2em] text-[#6d755f] font-semibold uppercase">
                Lala Style Picks
              </span>
            </div>
            <p className="text-[11px] text-[#55623f] tracking-[0.15em] uppercase font-bold mt-0.5">
              INSPIRED BY LALA, PICKED FOR YOU
            </p>
            <p className="text-xs text-[#6e7762] font-light">
              Inspirasi Belanja Modis Ala Lala • <span className="font-medium text-[#2c3420]">alanasheela.shop</span>
            </p>
          </div>

          {/* Clean Social Media Icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#4a5438] border border-[#ded5c6] hover:border-[#4a5438] text-[#4a5438] hover:text-white transition-all flex items-center justify-center shadow-2xs hover:shadow cursor-pointer"
              >
                {item.svg}
              </a>
            ))}
          </div>

        </div>

        {/* Clickable Info Links (Modal) & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#626c57]">
          
          {/* Footer Pop-up Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              onClick={() => onOpenInfoModal('about')}
              className="hover:text-[#24291e] hover:underline cursor-pointer transition-colors"
            >
              About
            </button>
            <span className="text-[#c8c0b2] hidden sm:inline">•</span>
            <button
              onClick={() => onOpenInfoModal('disclaimer')}
              className="hover:text-[#24291e] hover:underline cursor-pointer transition-colors font-medium text-[#4a5438]"
            >
              Disclaimer
            </button>
            <span className="text-[#c8c0b2] hidden sm:inline">•</span>
            <button
              onClick={() => onOpenInfoModal('terms')}
              className="hover:text-[#24291e] hover:underline cursor-pointer transition-colors"
            >
              Aturan &amp; Ketentuan
            </button>
            <span className="text-[#c8c0b2] hidden sm:inline">•</span>
            <button
              onClick={() => onOpenInfoModal('privacy')}
              className="hover:text-[#24291e] hover:underline cursor-pointer transition-colors"
            >
              Kebijakan Privasi
            </button>
            <span className="text-[#c8c0b2] hidden sm:inline">•</span>
            <button
              onClick={() => onOpenInfoModal('contact')}
              className="hover:text-[#24291e] hover:underline cursor-pointer transition-colors"
            >
              Kontak
            </button>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-[#78826c] text-center md:text-right">
            &copy; 2026 <strong className="text-[#24291e]">ASC (Alana Sheela Clarissa)</strong>. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}
