'use client';

import React from 'react';
import { X, Heart, Trash2, ExternalLink } from 'lucide-react';
import { ASC_PRODUCTS, ASCProduct } from '@/data/asc-products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveItem: (id: string) => void;
  onOpenProduct: (product: ASCProduct) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveItem,
  onOpenProduct,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const wishlistedProducts = ASC_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/45 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#ded5c6] flex flex-col justify-between text-[#24291e]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#eae1d4] flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4a5438] fill-[#4a5438]" />
            <h3 className="font-serif-luxury text-lg font-medium text-[#24291e]">
              Baju Disimpan ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#f0eae0] text-[#555d48] hover:text-[#24291e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20 text-[#7d8774] space-y-3">
              <Heart className="w-12 h-12 mx-auto stroke-1 text-[#aab3a0]" />
              <p className="text-sm font-medium">Belum ada baju yang disimpan ke wishlist.</p>
              <p className="text-xs text-[#8c9483]">
                Klik ikon hati pada produk untuk menyimpan rekomendasi favoritmu.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#fbf9f5] border border-[#e5dcce] group shadow-2xs"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  onClick={() => {
                    onOpenProduct(p);
                    onClose();
                  }}
                  className="w-16 h-20 object-cover rounded-xl cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-wider uppercase text-[#55623f] font-bold">
                      {p.categoryLabel}
                    </span>
                    <span className="text-[10px] text-[#4a5438] font-bold">
                      ★ {p.rating}
                    </span>
                  </div>
                  <h4
                    onClick={() => {
                      onOpenProduct(p);
                      onClose();
                    }}
                    className="font-serif-luxury text-sm font-medium text-[#24291e] truncate cursor-pointer hover:text-[#4a5438]"
                  >
                    {p.name}
                  </h4>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#4a5438] hover:underline font-medium mt-1.5"
                  >
                    <span>Cek di Toko</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button
                  onClick={() => onRemoveItem(p.id)}
                  className="p-2 text-[#8b9580] hover:text-[#963c4a] transition-colors cursor-pointer"
                  title="Hapus dari wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#eae1d4] bg-[#fbf9f5] text-center text-xs text-[#747e68]">
          <p>Lala Style Picks • alanasheela.shop</p>
        </div>

      </div>
    </div>
  );
}
