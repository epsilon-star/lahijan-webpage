/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureStrip } from './components/FeatureStrip';
import { StorySection } from './components/StorySection';
import { ProductsSection } from './components/ProductsSection';
import { BrewingSimulator } from './components/BrewingSimulator';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { StoryModal } from './components/StoryModal';
import { SearchModal } from './components/SearchModal';
import { MobileMenu } from './components/MobileMenu';
import { PixelMusicPlayer } from './components/PixelMusicPlayer';
import { Product, CartItem, Language } from './types';
import { sfx } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<Language>('fa');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync document dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.enabled = next;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (product: Product, quantity = 1, weight = product.selectedWeight) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.weight === weight);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, weight }];
    });

    const msg = lang === 'fa'
      ? `«${product.nameFa}» به سبد خرید اضافه شد!`
      : `"${product.nameEn}" added to tea basket!`;
    showToast(msg);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#071710] text-[#e8f2e9] font-persian-text flex flex-col selection:bg-[#285e3c] selection:text-[#d3f5c7]`}>
      
      {/* Pixel Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section matching reference */}
        <Hero
          lang={lang}
          onExploreProducts={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBrewBar={() => {
            document.getElementById('brew-bar')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. 4-Column Feature Strip */}
        <FeatureStrip lang={lang} />

        {/* 3. Story / About Section with Iran Map */}
        <StorySection
          lang={lang}
          onOpenStoryModal={() => setIsStoryModalOpen(true)}
        />

        {/* 4. Interactive Pixel Tea Brewing Bar */}
        <BrewingSimulator lang={lang} />

        {/* 5. Products Catalog & Vintage Postcard */}
        <ProductsSection
          lang={lang}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Product Quick-View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* Story / History Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        lang={lang}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        lang={lang}
      />

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        lang={lang}
      />

      {/* Persistent Lo-Fi Iranian Music Player */}
      <PixelMusicPlayer lang={lang} />

      {/* Pixel Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2d1e] text-[#bbf7d0] border-2 border-[#4ade80] px-4 py-2.5 font-persian-pixel text-sm shadow-[4px_4px_0_#000] flex items-center gap-2 animate-bounce">
          <span>🌿</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
