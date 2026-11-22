'use client';

import React from 'react';
import { X, Heart, Star, ShoppingBag, ExternalLink, Info } from 'lucide-react';
import { ASCProduct } from '@/data/asc-products';

interface ProductDetailModalProps {
  product: ASCProduct | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/55 backdrop-blur-xs">
      <div
        className="relative w-full max-w-3xl bg-white border border-[#ded5c6] rounded-3xl overflow-hidden shadow-2xl my-8 text-[#24291e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#4d5541] hover:text-[#24291e] border border-[#d8cfbf] transition-all cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Product Visual */}
          <div className="md:col-span-6 relative bg-[#f4eee4] aspect-[3/4] md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/95 backdrop-blur-md border border-[#cdd8bf] text-[#3e4a2d] shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Details & Affiliate Purchase Link (Tanpa Harga) */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-5 flex flex-col justify-between bg-white">
            
            {/* Header info */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.2em] text-[#55623f] uppercase">
                  {product.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[#4a5438] font-bold text-xs bg-[#eef3e8] px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#4a5438]" />
                  <span>Rating {product.rating}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif-luxury font-medium text-[#24291e] leading-snug">
                {product.name}
              </h2>

              {/* Marketplace Partner badge */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {product.platforms?.map((plat) => (
                  <span
                    key={plat}
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      plat === 'shopee'
                        ? 'bg-[#fff5f2] border-[#fcd8cf] text-[#e04523]'
                        : 'bg-[#f4f4f4] border-[#d8d8d8] text-[#1a1a1a]'
                    }`}
                  >
                    {plat === 'shopee' ? 'Tersedia di Shopee' : 'Tersedia di TikTok Shop'}
                  </span>
                ))}
                <span className="text-xs text-[#717a66]">
                  {product.soldCount} terjual
                </span>
              </div>
            </div>

            {/* Lala's Style Note */}
            <div className="p-4 rounded-2xl bg-[#f5efe4] border border-[#e5dcce] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#4a5438]">
                <Star className="w-3.5 h-3.5 fill-[#4a5438]" />
                <span>Catatan Gaya Lala:</span>
              </div>
              <p className="text-xs sm:text-sm italic text-[#39422f] leading-relaxed">
                “{product.lalaNote}”
              </p>
            </div>

            {/* Product Specs */}
            <div className="space-y-2 text-xs text-[#4d5541]">
              <p>
                <strong className="text-[#24291e] uppercase tracking-wider">Bahan:</strong>{' '}
                {product.fabric}
              </p>
              <p>
                <strong className="text-[#24291e] uppercase tracking-wider">Pilihan Warna:</strong>{' '}
                {product.color}
              </p>
              <p className="text-[#646b5a] leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Check Price in Store Notice */}
            <div className="p-3 rounded-xl bg-[#f8f5ee] border border-[#e8dfd2] text-[11px] text-[#69725f] flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-[#55623f] shrink-0 mt-0.5" />
              <span>
                Harga promo, voucher diskon toko, dan ketersediaan stok ukuran dapat dicek langsung di halaman produk marketplace tujuan.
              </span>
            </div>

            {/* Actions: Check Price & Buy via Affiliate */}
            <div className="pt-3 border-t border-[#ede5d8] space-y-2.5">
              <div className="flex items-center gap-3">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#4a5438] hover:bg-[#3b442b] text-white font-medium text-xs tracking-wider uppercase py-3.5 px-6 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cek di Toko</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#8c4b57] border-[#8c4b57] text-white'
                      : 'bg-white border-[#ded5c6] text-[#4d5541] hover:text-[#8c4b57]'
                  }`}
                  title="Simpan ke Wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              <p className="text-[10px] text-center text-[#747e68]">
                Tautan resmi program affiliate toko partner • alanasheela.shop
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
