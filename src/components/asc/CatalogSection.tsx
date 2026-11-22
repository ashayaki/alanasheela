'use client';

import React from 'react';
import { Heart, Eye, ExternalLink, Star, ShoppingBag } from 'lucide-react';
import { ASCProduct } from '@/data/asc-products';

interface CatalogSectionProps {
  products: ASCProduct[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenDetail: (product: ASCProduct) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export function CatalogSection({
  products,
  activeCategory,
  onSelectCategory,
  onOpenDetail,
  wishlist,
  onToggleWishlist,
}: CatalogSectionProps) {
  // Category list including Tas, Sepatu, Mix & Match, Shopee, and TikTok Shop
  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'tas', label: 'Tas' },
    { id: 'sepatu', label: 'Sepatu' },
    { id: 'gamis', label: 'Gamis' },
    { id: 'abaya', label: 'Abaya' },
    { id: 'hijab', label: 'Hijab' },
    { id: 'accessories', label: 'Aksesoris' },
    { id: 'mix-match', label: 'Mix & Match' },
    { id: 'shopee', label: 'Shopee' },
    { id: 'tiktok', label: 'TikTok Shop' },
  ];

  return (
    <section id="catalog-section" className="w-full py-12 lg:py-16 bg-[#fbf9f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Minimalist Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <p className="text-xs font-bold tracking-[0.25em] text-[#55623f] uppercase">
            Inspirasi Belanja Modis
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#24291e]">
            Katalog <span className="italic font-normal text-[#4a5438]">Lala Style Picks</span>
          </h2>
          <p className="text-[#5f6655] text-xs sm:text-sm">
            Rekomendasi busana pilihan Lala dengan ulasan terpercaya &amp; rating 4.5★+
          </p>
        </div>

        {/* Category Filter Pills - Clean & Aesthetic */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4a5438] text-white shadow-xs font-semibold'
                    : 'bg-white text-[#4d5541] hover:text-[#24291e] hover:bg-[#f6f2ec] border border-[#e5dcce]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 text-[#69705f]">
            <p className="text-base">Tidak ada produk yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 text-xs font-semibold tracking-wider text-[#4a5438] underline cursor-pointer"
            >
              Tampilkan Semua Koleksi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="olive-cream-card rounded-2xl overflow-hidden flex flex-col group bg-white"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4eee4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/95 backdrop-blur-md border border-[#cdd8be] text-[#3e4a2d] shadow-2xs">
                          {product.badge}
                        </span>
                      )}
                      {product.isLalaPick && (
                        <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#4a5438] text-white flex items-center gap-1 shadow-2xs">
                          <Star className="w-3 h-3 fill-white" />
                          Lala Pick
                        </span>
                      )}
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#252b20]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                      <button
                        onClick={() => onOpenDetail(product)}
                        className="px-4 py-2.5 rounded-full bg-white hover:bg-[#f6f2eb] text-[#2c3420] text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 border border-white/80 transition-all cursor-pointer shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4a5438]" />
                        <span>Lihat Detail</span>
                      </button>

                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                          isWishlisted
                            ? 'bg-[#8c4b57] text-white'
                            : 'bg-white text-[#4d5541] hover:text-[#8c4b57]'
                        }`}
                        title="Simpan ke Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[10px] tracking-[0.18em] uppercase text-[#616e49] font-bold">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[#717a66]">
                          {product.soldCount} terjual
                        </span>
                      </div>

                      <h3
                        onClick={() => onOpenDetail(product)}
                        className="font-serif-luxury text-base text-[#24291e] font-medium hover:text-[#4a5438] transition-colors cursor-pointer mt-0.5 line-clamp-2 leading-snug"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#636c58] line-clamp-2 mt-1.5 font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Affiliate Store Link (Tanpa Harga, Pengunjung Cek Sendiri) */}
                    <div className="pt-2.5 border-t border-[#ede5d8] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.platforms?.map((plat) => (
                            <span
                              key={plat}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                plat === 'shopee'
                                  ? 'bg-[#fff5f2] border-[#fcd8cf] text-[#e04523]'
                                  : 'bg-[#f4f4f4] border-[#d8d8d8] text-[#1a1a1a]'
                              }`}
                            >
                              {plat === 'shopee' ? 'Shopee' : 'TikTok Shop'}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-[#717a66]">
                          Cek harga &amp; promo
                        </span>
                      </div>

                      {/* Direct Affiliate Shop Button */}
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-[#4a5438] hover:bg-[#3b442b] text-white text-xs font-medium tracking-wider uppercase py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Cek di Toko</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
