import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { getLocalizedLink } from '../utils/url';

const Navigation = ({ currentLang, toggleLanguage, searchQuery, setSearchQuery }) => {
  const { i18n } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus search input when opened on mobile
  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isMobileSearchOpen]);

  // Check if we should expand search (mobile only)
  const showFullSearch = isMobile && isMobileSearchOpen;

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${searchQuery ? 'bg-white shadow-lg border-gray-200' : 'glass-panel border-white/10 dark:border-black/10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4 border-b border-transparent">
          
          {/* Logo Area - Hidden on mobile focus only */}
          <AnimatePresence>
            {(!showFullSearch) && (
              <motion.div 
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-shrink-0 flex items-center md:w-1/4"
              >
                <a 
                  href="#/" 
                  onClick={() => setSearchQuery('')}
                  className="cursor-pointer"
                >
                  <img 
                    src="https://redeem-dz.com/wp-content/uploads/2025/09/logo-redeem-dz.svg" 
                    alt="Redeem Logo" 
                    width="160"
                    height="40"
                    className="h-8 w-auto md:h-10" 
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Area */}
          <div className={`transition-all duration-300 ${showFullSearch ? 'flex-1 block' : 'flex-1 max-w-xl hidden md:block'}`}>
            <div className="relative w-full group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <Search className={`w-4 h-4 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <input 
                ref={searchInputRef}
                type="text" 
                name="search"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={i18n.language === 'ar' ? 'بحث' : 'Search'}
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-full outline-none focus:shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus:ring-1 focus:ring-gray-300 block ps-11 pe-11 p-2.5 transition-all duration-300"
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              />
              
              <AnimatePresence>
                {(searchQuery || showFullSearch) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    aria-label={i18n.language === 'ar' ? 'إغلاق البحث' : 'Close search'}
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                        if (searchInputRef.current) searchInputRef.current.focus();
                      } else if (isMobile) {
                        setIsMobileSearchOpen(false);
                      }
                    }}
                    className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Action Area - Hidden on mobile focus only */}
          <AnimatePresence>
            {(!showFullSearch) && (
              <motion.div 
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-shrink-0 items-center justify-end md:w-1/4 gap-2 md:gap-3"
              >
                {/* Mobile Search Button */}
                {isMobile && (
                  <button
                    onClick={() => setIsMobileSearchOpen(true)}
                    aria-label={i18n.language === 'ar' ? 'فتح البحث' : 'Open search'}
                    className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 backdrop-blur-md hover:bg-red-500/20 transition-all duration-300 group relative"
                    title={i18n.language === 'ar' ? 'بحث' : 'Search'}
                  >
                    <Search size={15} className="group-hover:scale-110 transition-transform" />
                    {searchQuery && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                )}

                {/* Login Button */}
                <a 
                  href={getLocalizedLink('https://redeem-dz.com/my-account/', i18n.language)}
                  target="_self"
                  aria-label={i18n.language === 'ar' ? 'حسابي' : 'My Account'}
                  className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all duration-300 group"
                  title={i18n.language === 'ar' ? 'حسابي / تسجيل الدخول' : 'My Account / Login'}
                >
                  <FontAwesomeIcon icon={faUser} className="text-sm md:text-base group-hover:scale-110 transition-transform" />
                </a>

                {/* Language Toggle */}
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  title={currentLang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
                  className="flex items-center justify-center p-1 transition-transform duration-300 focus:outline-none"
                >
                  <img 
                    src={currentLang === 'ar' 
                      ? "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg" 
                      : "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/dz.svg"}
                    alt={currentLang === 'ar' ? "English" : "العربية"}
                    width="24"
                    height="18"
                    className="w-5 h-auto md:w-6 shadow-sm rounded-[2px] object-cover hover:scale-110 transition-transform duration-300"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
