import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faMobileAlt, faCreditCard, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { wcApi } from '../utils/wcApi';

const getCategoryIcon = (id) => {
  // Map slugs or IDs to icons
  const lowerId = id?.toLowerCase() || '';
  if (lowerId.includes('mobile')) return faMobileAlt;
  if (lowerId.includes('pc') || lowerId.includes('game')) return faGamepad;
  if (lowerId.includes('gift') || lowerId.includes('card')) return faCreditCard;
  if (lowerId.includes('sub') || lowerId.includes('vip')) return faLayerGroup;
  return faGamepad;
};

const CategorySlider = ({ category, i18n }) => {
  const scrollRef = useRef(null);
  const isRtl = i18n.language === 'ar';
  
  // Drag State Management
  const [isDragging, setIsDragging] = React.useState(false);
  const [isDragMoved, setIsDragMoved] = React.useState(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    setIsDragging(true);
    setIsDragMoved(false);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
    setTimeout(() => setIsDragMoved(false), 50);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
    setTimeout(() => setIsDragMoved(false), 50);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault(); 
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    
    if (Math.abs(walk) > 10) {
      setIsDragMoved(true); 
    }
    
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85; 
      const multiplier = isRtl ? -1 : 1; 
      const offset = direction === 'next' ? scrollAmount : -scrollAmount;
      scrollRef.current.scrollBy({ left: offset * multiplier, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/slider">
      
      <button 
        onClick={() => scroll('prev')} 
        className={`absolute top-[40%] -translate-y-[40%] z-10 w-9 h-9 md:w-11 md:h-11 bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-700 hover:text-black hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover/slider:opacity-100 focus:outline-none cursor-pointer ${isRtl ? '-right-3 md:-right-5' : '-left-3 md:-left-5'}`}
      >
        {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      <button 
        onClick={() => scroll('next')} 
        className={`absolute top-[40%] -translate-y-[40%] z-10 w-9 h-9 md:w-11 md:h-11 bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-700 hover:text-black hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover/slider:opacity-100 focus:outline-none cursor-pointer ${isRtl ? '-left-3 md:-left-5' : '-right-3 md:-right-5'}`}
      >
        {isRtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <div 
        ref={scrollRef} 
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto no-scrollbar gap-4 md:gap-5 lg:gap-6 pb-6 pt-2 px-1 ${isDragging ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
      >
        <AnimatePresence mode="popLayout">
          {category.products.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              key={product.id}
              className={`snap-start shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-15px)] lg:w-[calc(16.666%-20px)] ${isDragMoved ? 'pointer-events-none' : ''}`}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProductGrid = ({ searchQuery }) => {
  const { i18n } = useTranslation();
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await wcApi.getStoreData();
      if (data) setStoreData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredCategories = useMemo(() => {
    const query = (searchQuery || '').toLowerCase();
    
    if (!query) return storeData;

    return storeData.map(category => {
      const filteredProducts = category.products.filter(p => {
        const nameAr = (p.translations?.ar?.name || p.name).toLowerCase();
        const nameEn = (p.translations?.en?.name || p.name).toLowerCase();
        return nameAr.includes(query) || nameEn.includes(query);
      });
      return { ...category, products: filteredProducts };
    }).filter(category => category.products.length > 0);
  }, [searchQuery, storeData]);

  if (loading && storeData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#f5f5f7]">
        <Loader2 className="w-10 h-10 text-[#e11e3b] animate-spin opacity-80" />
        <p className={`text-gray-400 text-sm font-medium ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
          {i18n.language === 'ar' ? 'جاري تحميل المتجر...' : 'Loading Storefront...'}
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 bg-[#f5f5f7] min-h-[50vh] transition-all duration-500 ${searchQuery ? 'pt-20 md:pt-28' : 'pt-2 md:pt-3'}`}>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <AnimatePresence mode="popLayout">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <motion.div 
              layout 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20, scale: 0.95 }} 
              transition={{ duration: 0.4, ease: "easeInOut" }}
              key={category.id} 
              className="mb-5 md:mb-7 last:mb-0"
            >
              <motion.div layout="position" className="flex items-center gap-2 mb-2 md:mb-3 border-b border-gray-100 pb-2">
                <FontAwesomeIcon icon={getCategoryIcon(category.id)} className="text-[#e11e3b] text-sm md:text-base opacity-90" />
                <h2 className={`text-sm md:text-base font-[600] text-gray-800 tracking-tight uppercase ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                  {category.title[i18n.language] || category.title['en']}
                </h2>
              </motion.div>
              
              {searchQuery ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 lg:gap-6 mt-4 pb-4">
                  {category.products.map((product) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <CategorySlider 
                    category={category} 
                    i18n={i18n} 
                />
              )}
              
            </motion.div>
          ))
        ) : (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
              {i18n.language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </h3>
            <p className="text-gray-500">
              {i18n.language === 'ar' ? 'لم نتمكن من العثور على أي منتج يطابق بحثك.' : 'We could not find any products matching your search.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
