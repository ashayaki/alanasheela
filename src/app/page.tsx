'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/asc/Navbar';
import { BannerCarousel } from '@/components/asc/BannerCarousel';
import { CatalogSection } from '@/components/asc/CatalogSection';
import { Footer } from '@/components/asc/Footer';
import { ProductDetailModal } from '@/components/asc/ProductDetailModal';
import { WishlistDrawer } from '@/components/asc/WishlistDrawer';
import { InfoModal, InfoModalType } from '@/components/asc/InfoModal';
import { ASC_PRODUCTS, ASCProduct } from '@/data/asc-products';

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ASCProduct | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['asc-gm-01', 'asc-ab-01']);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<InfoModalType>(null);

  // Sync with localStorage on client mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('asc_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('asc_wishlist', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = prev.filter((item) => item !== id);
      try {
        localStorage.setItem('asc_wishlist', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return ASC_PRODUCTS.filter((product) => {
      let matchesCat = true;
      if (activeCategory === 'shopee') {
        matchesCat = product.platforms.includes('shopee');
      } else if (activeCategory === 'tiktok' || activeCategory === 'tiktokshop') {
        matchesCat = product.platforms.includes('tiktok');
      } else if (activeCategory !== 'all') {
        matchesCat = product.category === activeCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.color.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.fabric.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#24281e] flex flex-col selection:bg-[#e4ede0] selection:text-[#2d361f]">
      {/* 1. Header & Strict 6 Categories Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* 2. Banner Berjalan / Slider Horizontal (Langsung di paling atas dengan Logo ASC terintegrasi & siap slot iklan) */}
      <BannerCarousel />

      {/* 3. Katalog Belanja Terkurasi (Tops, Bottoms, Gamis, Abaya, Hijab, Aksesoris) */}
      <CatalogSection
        products={filteredProducts}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenDetail={(product) => setSelectedProduct(product)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 4. Minimalist Footer with Social Media Icons & Info Popups */}
      <Footer onOpenInfoModal={(type) => setInfoModalType(type)} />

      {/* Pop-up Modals & Wishlist Drawer */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveItem={handleRemoveWishlist}
        onOpenProduct={(product) => setSelectedProduct(product)}
      />

      {/* Info & Legal Pop-up Modal */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </main>
  );
}
