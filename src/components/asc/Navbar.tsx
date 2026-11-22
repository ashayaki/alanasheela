'use client';

import React, { useState } from 'react';
import { Heart, Search, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function Navbar({
  wishlistCount,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  activeCategory,
  onSelectCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation categories including Tas, Sepatu, Shopee, and TikTok Shop
  const menuItems = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'gamis', label: 'Gamis' },
    { id: 'abaya', label: 'Abaya' },
    { id: 'hijab', label: 'Hijab' },
    { id: 'accessories', label: 'Aksesoris' },
    { id: 'tas', label: 'Tas' },
    { id: 'sepatu', label: 'Sepatu' },
    { id: 'shopee', label: 'Shopee' },
    { id: 'tiktok', label: 'TikTok Shop' },
  ];

  const handleNavClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-[#f4eee4] border-b border-[#e5dcce] text-[#555d44] text-xs py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#6c7853]" />
        <span>ASC • Lala Style Picks • alanasheela.shop</span>
        <Sparkles className="w-3.5 h-3.5 text-[#6c7853]" />
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#eae1d4] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <img
                src="/images/asc-logo.png"
                alt="ASC Logo"
                className="h-11 w-auto max-h-11 object-contain shrink-0 transition-transform group-hover:scale-105"
                style={{ maxHeight: '44px', width: 'auto' }}
              />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#2c3420]">
                    ASC
                  </span>
                  <span className="text-[11px] tracking-[0.18em] text-[#6b735c] font-semibold uppercase hidden sm:inline">
                    Lala Style Picks
                  </span>
                </div>
                <p className="text-[9px] tracking-[0.16em] text-[#5c6846] uppercase -mt-0.5 font-sans">
                  Inspired by Lala, Picked for You
                </p>
              </div>
            </button>
          </div>

          {/* Menu Items for Desktop */}
          <nav className="hidden md:flex items-center gap-2.5 lg:gap-4 text-[11px] lg:text-xs font-medium tracking-wider uppercase text-[#4d5541]">
            {menuItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 relative transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#2c3420] font-bold border-b-2 border-[#4a5438]'
                      : 'hover:text-[#2c3420]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search & Wishlist */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden lg:block w-48">
              <input
                type="text"
                placeholder="Cari baju / warna..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#ded5c6] text-[#2c3420] text-xs rounded-full pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#5c6846] placeholder:text-[#98a08c] shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-[#7c866d] absolute left-2.5 top-2.5" />
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full bg-white border border-[#ded5c6] text-[#4d5541] hover:text-[#2c3420] hover:border-[#5c6846] transition-all cursor-pointer shadow-2xs"
              title="Disimpan / Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4a5438] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4d5541] hover:text-[#2c3420]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fbf9f5] border-b border-[#eae1d4] px-4 pt-3 pb-6 space-y-3">
            <div className="relative w-full mb-3">
              <input
                type="text"
                placeholder="Cari baju / warna..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#ded5c6] text-[#2c3420] text-xs rounded-full pl-8 pr-3 py-2 focus:outline-none focus:border-[#5c6846]"
              />
              <Search className="w-3.5 h-3.5 text-[#7c866d] absolute left-3 top-3" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium tracking-wider uppercase text-[#4d5541]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    activeCategory === item.id
                      ? 'bg-[#4a5438] text-white border-[#4a5438] font-bold'
                      : 'bg-white border-[#eae1d4] hover:text-[#2c3420]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
