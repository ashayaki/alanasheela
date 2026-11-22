'use client';

import React from 'react';
import { X, ShieldAlert, Info, FileText, CheckCircle2, MessageCircle, ExternalLink, HelpCircle } from 'lucide-react';

export type InfoModalType = 'about' | 'disclaimer' | 'terms' | 'privacy' | 'contact' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

export function InfoModal({ type, onClose }: InfoModalProps) {
  if (!type) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-[#ded5c6] rounded-3xl p-6 sm:p-8 text-[#24291e] shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#fbf9f5] hover:bg-[#f0eae0] text-[#555d48] hover:text-[#24291e] border border-[#d8cfbf] transition-colors cursor-pointer"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. ABOUT US */}
        {type === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
              <Info className="w-4 h-4" />
              <span>Tentang Kami</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
              Tentang ASC — Lala Style Picks
            </h3>
            
            <div className="text-xs sm:text-sm text-[#5a634e] space-y-3 font-light leading-relaxed">
              <p>
                <strong className="text-[#24291e] font-medium">ASC (Alana Sheela Clarissa)</strong> melalui website resmi <strong className="text-[#24291e]">alanasheela.shop</strong> adalah platform kurasi gaya busana muslimah dan portal rekomendasi affiliate yang terinspirasi dari gaya berbusana sehari-hari <strong className="text-[#3c472a] font-medium">Lala</strong>.
              </p>
              
              <div className="p-4 rounded-2xl bg-[#f7f2ea] border border-[#e5dcce] space-y-2 text-xs">
                <p className="font-semibold text-[#24291e] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4a5438]" />
                  <span>Visi Kami:</span>
                </p>
                <p className="text-[#555d49]">
                  Membantu wanita muslimah menemukan pakaian yang modis, sopan, dan anggun tanpa harus bingung mencari di antara ribuan produk marketplace. Kami memilihkan baju dengan kualitas ulasan terbaik dan harga yang terjangkau.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#24291e] text-xs uppercase tracking-wider">
                  Model Kurasi Belanja Kami:
                </h4>
                <p>
                  Kami <strong>tidak memiliki gudang atau menjual stok fisik secara langsung</strong>. Tim kami menyisir berbagai toko resmi dan penjual terpercaya di marketplace (seperti Shopee dll) untuk memilihkan gamis, abaya, atasan (tops), bawahan (bottoms), hijab, dan aksesoris yang memiliki rating kepuasan pembeli tinggi (minimal 4.5★).
                </p>
              </div>

              <p>
                Setiap tautan yang kamu klik akan mengarahkanmu langsung ke toko penjual di aplikasi marketplace terkait untuk melakukan pembelian secara aman.
              </p>
            </div>
          </div>
        )}

        {/* 2. AFFILIATE DISCLAIMER */}
        {type === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Pernyataan Afiliasi</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
              Affiliate Disclaimer
            </h3>

            <div className="text-xs sm:text-sm text-[#5a634e] space-y-3.5 font-light leading-relaxed">
              <p>
                Website <strong className="text-[#24291e]">alanasheela.shop</strong> berpartisipasi dalam program pemasaran afiliasi (Affiliate Marketing Program), termasuk di antaranya Shopee Affiliate Program dan jaringan affiliate marketplace partner lainnya.
              </p>

              <div className="p-4 rounded-2xl bg-[#f5efe4] border border-[#e5dcce] space-y-2 text-xs">
                <p className="font-semibold text-[#24291e]">Bagaimana Program Affiliate Bekerja?</p>
                <p className="text-[#555d49]">
                  Saat kamu mengklik tautan belanja produk yang ada di website ini dan melakukan transaksi pembelian di toko partner, kami dapat memperoleh komisi rujukan kecil dari pihak marketplace.
                </p>
                <p className="text-[#24291e] font-medium pt-1">
                  Biaya Tidak Berubah: Komisi ini sepenuhnya ditanggung oleh sistem promosi marketplace dan <strong>sama sekali tidak membebankan biaya tambahan apapun</strong> kepada kamu sebagai pembeli.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#24291e] text-xs uppercase tracking-wider">
                  Kriteria Pemilihan &amp; Fluktuasi Rating:
                </h4>
                <p>
                  Seluruh produk yang ada di website ini kami kurasi dengan standar <strong className="text-[#24291e]">rating minimal 4.5★</strong> saat pertama kali dimasukkan ke katalog. Namun, rating ulasan, ketersediaan ukuran, stok, dan harga promo diskon dapat berubah sewaktu-waktu tergantung update toko penjual di marketplace.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. ATURAN & KETENTUAN (TERMS) */}
        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
              <FileText className="w-4 h-4" />
              <span>Syarat &amp; Ketentuan</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
              Aturan Layanan Pengunjung
            </h3>

            <div className="text-xs sm:text-sm text-[#5a634e] space-y-3 font-light leading-relaxed">
              <p>
                Dengan mengakses dan menggunakan situs <strong className="text-[#24291e]">alanasheela.shop</strong>, kamu menyetujui ketentuan-ketentuan berikut:
              </p>

              <ul className="space-y-2 text-xs list-disc pl-5">
                <li>
                  <strong className="text-[#24291e]">Sifat Layanan:</strong> Konten di situs ini bersifat kurasi rekomendasi gaya, ulasan inspiratif, dan rujukan belanja semata.
                </li>
                <li>
                  <strong className="text-[#24291e]">Tanggung Jawab Transaksi:</strong> Segala transaksi jual-beli, proses pembayaran, penagihan, pengiriman paket, klaim garansi, dan retur/tukar barang adalah hubungan hukum langsung antara pembeli dan toko penjual di aplikasi marketplace (bukan dengan ASC).
                </li>
                <li>
                  <strong className="text-[#24291e]">Hak Cipta Konten:</strong> Foto lookbook, identitas visual ASC, dan ulasan gaya di situs ini dilindungi hak cipta dan tidak boleh disalahgunakan tanpa izin tertulis.
                </li>
                <li>
                  <strong className="text-[#24291e]">Perubahan Ketentuan:</strong> Ketentuan ini dapat diperbarui sewaktu-waktu untuk menyesuaikan perkembangan operasional situs.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. PRIVACY POLICY */}
        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Kebijakan Privasi</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
              Privasi &amp; Keamanan Data
            </h3>

            <div className="text-xs sm:text-sm text-[#5a634e] space-y-3 font-light leading-relaxed">
              <p>
                Kami sangat menghargai privasi setiap pengunjung situs <strong className="text-[#24291e]">alanasheela.shop</strong>.
              </p>
              
              <div className="p-3.5 rounded-xl bg-[#f7f2ea] border border-[#e5dcce] text-xs space-y-1">
                <p className="font-semibold text-[#24291e]">Data Finansial Aman:</p>
                <p>
                  Website kami <strong>tidak pernah meminta, mencatat, atau menyimpan</strong> nomor rekening bank, kartu kredit/debit, kata sandi akun, atau data pembayaran sensitif pengunjung.
                </p>
              </div>

              <p>
                <strong className="text-[#24291e] font-medium">Tautan Pihak Ketiga &amp; Cookies:</strong> Ketika kamu mengklik tombol menuju marketplace, browser kamu mungkin menggunakan cookies standar affiliate untuk memastikan rujukan tercatat dengan tepat di sistem toko partner.
              </p>
              <p>
                Data wishlist baju yang kamu simpan hanya tersimpan secara lokal di browser perangkatmu sendiri dan tidak kami unggah ke server luar.
              </p>
            </div>
          </div>
        )}

        {/* 5. CONTACT & HUBUNGI KAMI */}
        {type === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#24291e]">
              Kontak &amp; Bantuan
            </h3>

            <div className="text-xs sm:text-sm text-[#5a634e] space-y-4 font-light leading-relaxed">
              <p>
                Punya pertanyaan seputar rekomendasi gaya Lala, kerja sama kolaborasi affiliate, atau sekadar ingin menyapa? Kamu bisa menghubungi kami melalui:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="https://wa.me/?text=Halo%20Admin%20ASC%20(Alana%20Sheela%20Clarissa)%20Official,%20saya%20ingin%20bertanya%20seputar%20alanasheela.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#f5efe4] border border-[#e5dcce] hover:border-[#4a5438] transition-all flex items-center gap-3 group"
                >
                  <MessageCircle className="w-5 h-5 text-[#4a5438] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#24291e] text-xs group-hover:text-[#4a5438]">
                      WhatsApp Admin
                    </p>
                    <p className="text-[11px] text-[#6d7663]">
                      Chat cepat untuk info &amp; kolaborasi
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/asc.lala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#f5efe4] border border-[#e5dcce] hover:border-[#4a5438] transition-all flex items-center gap-3 group"
                >
                  <ExternalLink className="w-5 h-5 text-[#4a5438] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#24291e] text-xs group-hover:text-[#4a5438]">
                      Instagram @asc.lala
                    </p>
                    <p className="text-[11px] text-[#6d7663]">
                      Kirim pesan DM langsung ke Lala
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Action */}
        <div className="pt-6 mt-6 border-t border-[#ede5d8] text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#4a5438] hover:bg-[#3b442b] text-white text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
