'use client';

import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

export function AffiliateNotice() {
  return (
    <section id="affiliate-section" className="w-full py-16 bg-[#fbf9f5] border-b border-[#eae1d4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#f0f4ea] border border-[#c9d7be] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#c4d2b9] text-[#424e31] text-xs font-semibold tracking-widest uppercase shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#4a5438]" />
                <span>Official ASC Fashion &amp; Affiliate Shopping Platform</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-medium text-[#24291e]">
                Belanja Aman &amp; Terverifikasi di <span className="text-[#4a5438]">alanasheela.shop</span>
              </h2>

              <p className="text-[#555e4b] text-sm leading-relaxed">
                Website ini merupakan platform resmi <strong className="text-[#24291e]">ASC (Alana Sheela Clarissa)</strong> untuk fashion boutique &amp; affiliate shopping. Setiap gaun, tautan kurasi, dan rekomendasi yang dipandu oleh Fashion Muse kami (<strong className="text-[#3c472a]">Lala</strong>) telah melalui uji kualitas material, keaslian rancangan, dan standar modest couture terbaik.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-[#d6e2cd] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4a5438] mb-2" />
                  <p className="font-semibold text-xs text-[#24291e] uppercase tracking-wider">
                    100% Curated
                  </p>
                  <p className="text-xs text-[#68735d] mt-1">
                    Dikurasi khusus oleh Alana Sheela Clarissa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#d6e2cd] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4a5438] mb-2" />
                  <p className="font-semibold text-xs text-[#24291e] uppercase tracking-wider">
                    VIP Concierge
                  </p>
                  <p className="text-xs text-[#68735d] mt-1">
                    Layanan pemesanan &amp; konsultasi ukuran via WhatsApp.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#d6e2cd] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4a5438] mb-2" />
                  <p className="font-semibold text-xs text-[#24291e] uppercase tracking-wider">
                    Official Guarantee
                  </p>
                  <p className="text-xs text-[#68735d] mt-1">
                    Jaminan keaslian bahan satin &amp; lace premium.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4 p-6 rounded-2xl bg-white border border-[#d0dec7] shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#eef5e9] border border-[#a8bc98] flex items-center justify-center text-[#4a5438]">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <p className="font-serif-luxury text-lg text-[#24291e] font-medium">
                  Butuh Bantuan Memilih Gaun?
                </p>
                <p className="text-xs text-[#6a745e] mt-1">
                  Tim stylist resmi ASC siap membantu mencocokkan siluet &amp; warna untuk acara Anda.
                </p>
              </div>
              <a
                href="https://wa.me/?text=Halo%20Stylist%20ASC%20(Alana%20Sheela%20Clarissa)%20Official,%20saya%20ingin%20konsultasi%20pemilihan%20gaun%20yang%20cocok%20untuk%20acara%20saya%20di%20alanasheela.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#4a5438] hover:bg-[#3b442b] text-white font-medium text-xs tracking-wider uppercase py-3 rounded-full transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Konsultasi Stylist Gratis</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
