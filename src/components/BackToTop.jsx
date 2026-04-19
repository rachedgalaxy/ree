import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNotHome, setIsNotHome] = useState(false);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkHash = () => {
      const hash = window.location.hash;
      // Consider home as empty, #, or #/
      setIsNotHome(hash !== '' && hash !== '#' && hash !== '#/');
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('hashchange', checkHash);
    
    // Initial check
    checkHash();
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <AnimatePresence>
        {/* Back Button - On the OPPOSITE side from Scroll to Top */}
        {isNotHome && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: isRtl ? 20 : -20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className={`fixed bottom-24 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 border-2 border-gray-400/60 bg-white/10 hover:bg-[#e11e3b] hover:border-[#e11e3b] hover:text-white group ${
              isRtl ? 'right-8' : 'left-8'
            }`}
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="relative">
              {isRtl ? (
                <ChevronRight size={28} className="text-gray-600 group-hover:text-white transition-colors duration-300 group-hover:translate-x-[2px]" />
              ) : (
                <ChevronLeft size={28} className="text-gray-600 group-hover:text-white transition-colors duration-300 group-hover:translate-x-[-2px]" />
              )}
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}

        {/* Scroll To Top Button - Original side */}
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-24 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 border-2 border-gray-400/60 bg-white/10 hover:bg-[#e11e3b] hover:border-[#e11e3b] hover:text-white group ${
              isRtl ? 'left-8' : 'right-8'
            }`}
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="relative">
              <ChevronUp size={28} className="text-gray-600 group-hover:text-white transition-colors duration-300 group-hover:translate-y-[-2px]" />
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackToTop;
