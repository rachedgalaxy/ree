import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import './i18n/config'; // Setup i18next

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SEO from './components/SEO';

import ProductModal from './components/ProductModal';
import storeData from './data/storeData.json';

function App() {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hash routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      
      // Deep link for products: #/product/123
      if (hash.startsWith('#/product/')) {
        const productId = parseInt(hash.replace('#/product/', ''));
        if (!isNaN(productId)) {
          // Find product in all categories
          let found = null;
          for (const cat of storeData) {
            found = cat.products?.find(p => p.id === productId);
            if (found) break;
          }
          if (found) {
            setSelectedProduct(found);
          }
        }
      } else if (selectedProduct) {
        // Clear selection if we navigated away from product URL
        setSelectedProduct(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initial language and direction setup
  useEffect(() => {
    const initApp = async () => {
      const savedLang = localStorage.getItem('redeem-lang') || 'ar';
      if (savedLang !== i18n.language) {
        await i18n.changeLanguage(savedLang);
      }
      
      const dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = savedLang;
      
      // Give React one tick to stabilize
      setIsLoaded(true);
    };

    initApp();
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    
    const dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = newLang;
    localStorage.setItem('redeem-lang', newLang);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const closeProductModal = () => {
    setSelectedProduct(null);
    // Return to home or previous category hash
    const hash = window.location.hash;
    if (hash.startsWith('#/product/')) {
        window.location.hash = '#/';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] selection:bg-blue-200 selection:text-blue-900">
      <SEO />
      
      {/* Hidden SEO Keywords Block for Algeria Market - Analyzed by Googlebot but invisible to users */}
      <div className="sr-only">
        <h1>متجر ريديم الجزائر - Redeem DZ</h1>
        <p>
          أفضل متجر إلكتروني في الجزائر لشحن الالعاب عن طريق بريدي موب (Baridimob) وتطبيق OCPay.
          بيع بطاقات الهدايا (Gift Cards)، شحن جواهر فري فاير الجزائر (Free Fire)، شحن شدات ببجي (PUBG Mobile UC)،
          رصيد باينانس بالدينار الجزائري (Binance USDT in DZD)، وشحن كول اوف ديوتي وبلايستيشن واكس بوكس.
          الدفع محلي وآمن ومتوفر لجميع ولايات الجزائر. 
          اشتري الآن أرخص المنتجات الرقمية والمحافظ مع تسليم فوري!
        </p>
      </div>
      <Navigation 
        currentLang={i18n.language} 
        toggleLanguage={toggleLanguage} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />
      
      <main>
        {currentHash === '#/about-us' ? (
          <AboutUs />
        ) : currentHash === '#/privacy-policy' ? (
          <PrivacyPolicy />
        ) : currentHash === '#/terms-of-service' ? (
          <TermsOfService />
        ) : (
          <>
            {!searchQuery && <Hero />}
            <ProductGrid searchQuery={searchQuery} />
          </>
        )}
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={closeProductModal} 
          />
        )}
      </AnimatePresence>
      
      {!searchQuery && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
