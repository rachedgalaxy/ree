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
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileSearchOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus search input when opened on mobile
  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50); // Faster focus
    }
  }, [isMobileSearchOpen]);

  // Local state for debounced search input
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce the global search update to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 200); // Slightly faster debounce
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const showOverlaySearch = isMobile && isMobileSearchOpen;

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${searchQuery ? 'bg-white shadow-lg border-b border-gray-200' : 'glass-panel border-b border-white/10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 gap-4">
          
          {/* Default Header State (Logo + Actions) */}
          <div className={`flex items-center justify-between w-full transition-opacity duration-300 ${showOverlaySearch ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
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
            </div>

            {/* Desktop Search Center */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <Search className={`w-4 h-4 transition-colors ${isFocused ? 'text-[#e11e3b]' : 'text-gray-400'}`} />
                </div>
                <input 
                  id="desktop-search-input"
                  name="q"
                  type="text" 
                  value={localSearch}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder={i18n.language === 'ar' ? 'بحث' : 'Search'}
                  className="w-full bg-white border border-gray-200 text-gray-900 text-[13px] font-medium rounded-full outline-none focus:shadow-[0_4px_20px_rgba(0,0,0,0.06)] block ps-10 pe-11 p-2 shadow-sm transition-all duration-300"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {isMobile && (
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="w-9 h-9 rounded-full bg-red-500/5 border border-red-500/10 text-red-500 flex items-center justify-center transition-all active:scale-95"
                >
                  <Search size={16} />
                </button>
              )}
              <a 
                href={getLocalizedLink('https://redeem-dz.com/my-account/', i18n.language)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:border-black transition-all"
              >
                <FontAwesomeIcon icon={faUser} className="text-sm md:text-base" />
              </a>
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center p-1"
              >
                <img 
                  src={currentLang === 'ar' 
                    ? "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg" 
                    : "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/dz.svg"}
                  alt="lang"
                  className="w-5 md:w-6 h-auto shadow-sm"
                />
              </button>
            </div>
          </div>

          {/* Mobile Search Overlay - DESKTOP STYLE */}
          <AnimatePresence>
            {showOverlaySearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-50 flex items-center bg-white px-4"
              >
                <div className="relative w-full flex items-center">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Search className="w-4 h-4 text-[#e11e3b]" />
                  </div>
                  <input 
                    id="mobile-search-input"
                    name="q_mobile"
                    ref={searchInputRef}
                    type="text" 
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder={i18n.language === 'ar' ? 'بحث...' : 'Search...'}
                    className="w-full bg-white border border-gray-200 text-gray-900 text-[13px] font-medium rounded-full outline-none block ps-10 pe-11 p-2 shadow-sm"
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    onClick={() => {
                      setIsMobileSearchOpen(false);
                      setLocalSearch('');
                    }}
                    className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
