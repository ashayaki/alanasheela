'use client';

import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const sizeData = [
    { size: 'S', bust: '88 - 92 cm', waist: '68 - 72 cm', hip: '94 - 98 cm', length: '138 - 140 cm' },
    { size: 'M', bust: '94 - 98 cm', waist: '74 - 78 cm', hip: '100 - 104 cm', length: '140 - 142 cm' },
    { size: 'L', bust: '100 - 104 cm', waist: '80 - 84 cm', hip: '106 - 110 cm', length: '142 - 144 cm' },
    { size: 'XL', bust: '106 - 112 cm', waist: '86 - 92 cm', hip: '112 - 118 cm', length: '144 - 145 cm' },
    { size: 'Custom', bust: 'Sesuai request', waist: 'Sesuai request', hip: 'Sesuai request', length: 'Sesuai request' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-white border border-[#ded5c6] rounded-3xl p-6 sm:p-8 text-[#24291e] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#fbf9f5] hover:bg-[#f2ecdf] text-[#555e4b] hover:text-[#24291e] border border-[#d8cfbf] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#55623f] uppercase">
            <Ruler className="w-4 h-4" />
            <span>ASC Atelier Measurement Guide</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
            Panduan Ukuran Gaun ASC
          </h3>

          <p className="text-xs sm:text-sm text-[#5f6655]">
            Pastikan ukuran pas di tubuh Anda untuk mendapatkan tampilan drape yang sempurna dan kenyamanan maksimal saat beraktivitas.
          </p>

          {/* Size Chart Table */}
          <div className="overflow-x-auto rounded-xl border border-[#e5dcce] mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f7f2ea] text-[#3c4430] uppercase tracking-wider text-[11px] border-b border-[#e5dcce]">
                <tr>
                  <th className="p-3 font-semibold text-[#4a5438]">Size</th>
                  <th className="p-3 font-semibold">Lingkar Dada</th>
                  <th className="p-3 font-semibold">Lingkar Pinggang</th>
                  <th className="p-3 font-semibold">Lingkar Pinggul</th>
                  <th className="p-3 font-semibold">Panjang Gaun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee7dc] bg-white text-[#4d5541]">
                {sizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-[#fbf9f5]">
                    <td className="p-3 font-bold text-[#24291e]">{row.size}</td>
                    <td className="p-3">{row.bust}</td>
                    <td className="p-3">{row.waist}</td>
                    <td className="p-3">{row.hip}</td>
                    <td className="p-3">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note on Custom Size */}
          <div className="p-4 rounded-xl bg-[#f5efe4] border border-[#e5dcce] space-y-1.5 text-xs text-[#525946]">
            <div className="flex items-center gap-1.5 text-[#24291e] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#4a5438]" />
              <span>Layanan Custom Size (Made to Order):</span>
            </div>
            <p>
              ASC menerima pesanan ukuran kustom sesuai proporsi tinggi dan lingkar badan Anda. Cukup sampaikan ukuran saat chat WhatsApp dengan admin kami.
            </p>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#4a5438] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#3b442b] transition-colors cursor-pointer shadow-sm"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
