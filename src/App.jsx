import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config'; // Setup i18next

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-[#f5f5f7] selection:bg-blue-200 selection:text-blue-900">
      <Navigation 
        currentLang={i18n.language} 
        toggleLanguage={toggleLanguage} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />
      
      <main>
        {!searchQuery && <Hero />}
        <ProductGrid searchQuery={searchQuery} />
      </main>
      
      {!searchQuery && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
