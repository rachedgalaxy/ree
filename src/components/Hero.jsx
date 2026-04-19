import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowLeft, ArrowRight, X, ChevronDown, HelpCircle, Info, ShieldCheck, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLocalizedLink } from '../utils/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faStore, faShoppingBag, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faXbox } from '@fortawesome/free-brands-svg-icons';
import PlatformTicker from './PlatformTicker';
import storeData from '../data/storeData.json';

const banners = [
  {
    type: "topup",
    bg: "https://redeem-dz.com/wp-content/uploads/2023/07/topup-new-redeem-dz-01-1-01-1-01-1-1-scaled.png",
    svgAr: "https://redeem-dz.com/wp-content/uploads/2023/07/cha7n-ar-4.svg",
    svgEn: "https://redeem-dz.com/wp-content/uploads/2023/07/cha7n-en-4.svg",
    btnTextAr: "كن قائدا",
    btnTextEn: "BE A LEADER",
    btnLinkAr: "https://redeem-dz.com/product-category/top-up/",
    btnLinkEn: "https://redeem-dz.com/en/product-category/top-up/"
  },
  {
    type: "visa",
    bg: "https://redeem-dz.com/wp-content/uploads/2023/07/visa-new-redeem-dz2-1.webp",
    logo: "https://redeem-dz.com/wp-content/uploads/2023/07/Rewarble-logo-REDEEM-12.svg",
    svgAr: "https://redeem-dz.com/wp-content/uploads/2023/07/VISA-AR2.svg",
    svgEn: "https://redeem-dz.com/wp-content/uploads/2023/07/VISA-EN2.svg",
    btnTextAr: "أطلب الآن",
    btnTextEn: "ORDER NOW",
    btnLinkAr: "https://redeem-dz.com/product/virtual-visa-rewarble/",
    btnLinkEn: "https://redeem-dz.com/en/product/virtual-visa-rewarble/"
  },
  {
    type: "freepik",
    bg: "https://redeem-dz.com/wp-content/uploads/2023/07/freepik-redeem-dz-6-01-1.png",
    svgAr: "https://redeem-dz.com/wp-content/uploads/2023/07/freepik-arw.svg",
    svgEn: "https://redeem-dz.com/wp-content/uploads/2023/07/freepik-enw.svg",
    btnTextAr: "أطلب الآن",
    btnTextEn: "ORDER NOW",
    btnLinkAr: "https://redeem-dz.com/product/freepik/",
    btnLinkEn: "https://redeem-dz.com/en/product/freepik/"
  }
];

const MatrixRain = ({ isMobile }) => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const hints = ["REDEEM", "GIFT", "CARD", "TOPUP", "GAMES", "FUN"];
  const columns = isMobile ? 12 : 25;
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex opacity-20" dir="ltr">
      {[...Array(columns)].map((_, i) => {
        const isHintColumn = i % 4 === 0;
        const hint = hints[(i / 4) % hints.length];
        
        return (
          <div 
            key={i} 
            className="relative flex-none"
            style={{ 
              width: `${100 / columns}%`,
              opacity: Math.max(0.1, (columns - i) / columns * 0.8),
            }}
          >
            <div className="absolute top-0 left-0 w-full flex flex-col items-center">
              <motion.div
                initial={{ y: -500 }}
                animate={{ y: 500 }}
                transition={{ 
                  duration: 10 + Math.random() * 15, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 10 
                }}
                className="flex flex-col gap-1"
              >
                {[...Array(20)].map((_, j) => {
                  let char;
                  if (isHintColumn) {
                    char = hint[j % hint.length];
                  } else {
                    char = characters[Math.floor(Math.random() * characters.length)];
                  }
                  
                  return (
                    <span 
                      key={j} 
                      className="text-[10px] md:text-[14px] font-mono font-bold text-gray-500"
                      style={{ opacity: (20 - j) / 20 }}
                    >
                      {char}
                    </span>
                  );
                })}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FAQOverlay = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl max-h-[85vh] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/40 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff9500] flex items-center justify-center text-white shadow-lg">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-black">{t('faq.title')}</h2>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/40 hover:text-black transition-all group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {/* Legal Links Quick Access - Minimalist Light Theme */}
              <div className="flex items-center justify-between gap-1.5 md:gap-2 mb-6 w-full flex-nowrap">
                <a 
                  href="#/about-us" 
                  onClick={onClose}
                  className="flex flex-1 justify-center items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/70 hover:text-black text-[10px] sm:text-xs font-bold border border-black/5 hover:border-black/10 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Info size={12} className="opacity-70 group-hover:opacity-100 hidden sm:block" />
                  {i18n.language === 'ar' ? 'من نحن' : 'About Us'}
                </a>
                <a 
                  href="#/privacy-policy" 
                  onClick={onClose}
                  className="flex flex-1 justify-center items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/70 hover:text-black text-[10px] sm:text-xs font-bold border border-black/5 hover:border-black/10 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                >
                  <ShieldCheck size={12} className="opacity-70 group-hover:opacity-100 hidden sm:block" />
                  {i18n.language === 'ar' ? 'الخصوصية' : 'Privacy'}
                </a>
                <a 
                  href="#/terms-of-service" 
                  onClick={onClose}
                  className="flex flex-1 justify-center items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-black/70 hover:text-black text-[10px] sm:text-xs font-bold border border-black/5 hover:border-black/10 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
                >
                  <FileText size={12} className="opacity-70 group-hover:opacity-100 hidden sm:block" />
                  {i18n.language === 'ar' ? 'الشروط والأحكام' : 'Terms'}
                </a>
              </div>

              <div className="space-y-3">
                {faqData.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl bg-white/40 border border-white/60 hover:border-black/10 transition-colors">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-start group"
                    >
                      <span className="text-sm md:text-base font-semibold text-black pr-4 transition-colors group-hover:text-red-600">{item.q}</span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        className="flex-shrink-0 text-black/30 group-hover:text-red-600 transition-colors"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-sm md:text-[15px] leading-relaxed text-black/80 font-medium border-t border-black/5 pt-3">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                 <div className="text-center md:text-start">
                    <h3 className="font-bold text-base">{i18n.language === 'ar' ? 'هل لا تزال بحاجة لمساعدة؟' : 'Still need help?'}</h3>
                    <p className="text-[11px] opacity-70 mt-1">{i18n.language === 'ar' ? 'فريق الدعم الفني متواجد لمساعدتك في أي وقت.' : 'Our support team is here to help you 24/7.'}</p>
                 </div>
                 <a 
                   href="https://api.whatsapp.com/send/?phone=213562033668"
                   target="_blank" rel="noreferrer"
                   className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-white rounded-full text-xs font-bold transition-transform hover:scale-105 shadow-lg flex items-center gap-2"
                 >
                   <FontAwesomeIcon icon={faWhatsapp} />
                   {i18n.language === 'ar' ? 'تحدث معنا' : 'Chat with us'}
                 </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const topDiscounts = React.useMemo(() => {
    try {
      let allProducts = [];
      const seenCategories = new Set();
      storeData.forEach(cat => {
        if (!cat.products) return;
        cat.products.forEach(p => {
          if (p.regular_price && p.price) {
            const regular = parseFloat(p.regular_price);
            const current = parseFloat(p.price);
            if (regular > current && p.image) {
              allProducts.push({
                ...p,
                discountRatio: (regular - current) / regular,
                catId: cat.id
              });
            }
          }
        });
      });
      allProducts.sort((a, b) => b.discountRatio - a.discountRatio);
      let best = [];
      for (const p of allProducts) {
        if (!seenCategories.has(p.catId)) {
          best.push(p);
          seenCategories.add(p.catId);
        }
        if (best.length === 2) break;
      }
      return best;
    } catch {
      return [];
    }
  }, []);

  const currentIndex = Math.abs(page % banners.length);

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000); 
    return () => clearInterval(timer);
  }, [paginate]);

  const isRtl = i18n.language === 'ar';

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <div className="w-full pt-20 pb-2 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Slider (Flex 3/4) */}
          <div className="w-full lg:w-3/4 relative aspect-[16/9] md:aspect-[21/9] lg:aspect-auto lg:h-[450px] rounded-xl overflow-hidden group shadow-sm z-10">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image & Effects */}
                <div className="absolute inset-0 md:hidden">
                  <MatrixRain isMobile={true} />
                </div>
                {banners[currentIndex].type === 'topup' && (
                  <div className="hidden md:block absolute inset-0">
                    <MatrixRain isMobile={false} />
                  </div>
                )}
                
                <img 
                  src={banners[currentIndex].bg} 
                  alt="Featured Promo" 
                  width="1200"
                  height="500"
                  className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-500 block" 
                  draggable="false"
                />

                {/* Overlays */}
                <div className={`absolute top-0 bottom-0 left-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 w-[65%] sm:w-[50%] z-20 ${isRtl ? 'items-end' : 'items-start'} pointer-events-none`}>
                  {banners[currentIndex].logo && (
                    <motion.img 
                      initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                      src={banners[currentIndex].logo} alt="Brand Logo" 
                      className="h-5 md:h-7 lg:h-9 w-auto mb-3 md:mb-5 drop-shadow-sm" 
                    />
                  )}

                  <motion.img 
                    initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    src={isRtl ? banners[currentIndex].svgAr : banners[currentIndex].svgEn} alt="Banner Promos" 
                    className="w-[70%] sm:w-[80%] max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[210px] mb-2 md:mb-3 drop-shadow-sm" 
                  />
                  
                  <motion.a 
                    href={getLocalizedLink(isRtl ? banners[currentIndex].btnLinkAr : banners[currentIndex].btnLinkEn, i18n.language)}
                    target="_self"
                    initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="bg-[#e11e3b] hover:bg-red-700 text-white font-bold py-1.5 md:py-2 px-4 md:px-6 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105 shadow-md group/btn text-[10px] md:text-[12px] border border-transparent hover:border-red-400 pointer-events-auto"
                  >
                    {isRtl && <ArrowLeft size={16} className="transition-transform group-hover/btn:-translate-x-1" />}
                    <span className={`${isRtl ? 'font-kufi' : 'font-sans'} tracking-wide`}>
                      {isRtl ? banners[currentIndex].btnTextAr : banners[currentIndex].btnTextEn}
                    </span>
                    {!isRtl && <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />}
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            <button 
              onClick={() => paginate(isRtl ? 1 : -1)} 
              aria-label={isRtl ? 'السابق' : 'Previous'}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/5 hover:bg-black/20 rounded-full text-white/90 hover:text-white backdrop-blur-md transition-all z-30 opacity-0 group-hover:opacity-100">
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(isRtl ? -1 : 1)} 
              aria-label={isRtl ? 'التالي' : 'Next'}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/5 hover:bg-black/20 rounded-full text-white/90 hover:text-white backdrop-blur-md transition-all z-30 opacity-0 group-hover:opacity-100">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Premium Bento Sidebar (Flex 1/4) */}
          <div className="grid w-full lg:w-1/4 grid-cols-2 grid-rows-4 gap-3 h-[450px] mt-2 lg:mt-0">
            
            {/* Top Left: The Store */}
            <a 
              href={getLocalizedLink('https://redeem-dz.com/shop/', i18n.language)}
              target="_self"
              className="col-span-1 row-span-1 bg-white hover:bg-white/90 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all cursor-pointer group border border-gray-100 overflow-hidden relative"
            >
               <div className={`absolute ${isRtl ? '-left-2' : '-right-2'} -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                 <FontAwesomeIcon icon={faStore} size="3x" />
               </div>
               <FontAwesomeIcon icon={faStore} className="text-[#007aff] text-xl" />
               <span className={`text-[13px] font-[600] text-gray-800 ${isRtl ? 'font-kufi' : 'font-sans'}`}>
                 {isRtl ? 'المتجر' : 'The Store'}
               </span>
            </a>

            {/* Top Right: My Orders */}
            <a 
              href={getLocalizedLink('https://redeem-dz.com/my-account/orders/', i18n.language)}
              target="_self"
              className="col-span-1 row-span-1 bg-white hover:bg-white/90 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all cursor-pointer group border border-gray-100 overflow-hidden relative"
            >
               <div className={`absolute ${isRtl ? '-left-2' : '-right-2'} -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                 <FontAwesomeIcon icon={faShoppingBag} size="3x" />
               </div>
               <FontAwesomeIcon icon={faShoppingBag} className="text-[#34c759] text-xl" />
               <span className={`text-[13px] font-[600] text-gray-800 ${isRtl ? 'font-kufi' : 'font-sans'}`}>
                 {isRtl ? 'طلباتي' : 'My Orders'}
               </span>
            </a>

            {/* Middle Full: Trending Spotlight or Top 2 Discounts */}
            {topDiscounts.length === 2 ? (
              topDiscounts.map((product, idx) => {
                const discountPercent = Math.round(product.discountRatio * 100);
                const isFirst = idx === 0;
                return (
                  <a 
                    key={product.id}
                    href={getLocalizedLink(product.woocommerceUrl || `https://redeem-dz.com/product/${product.id}`, i18n.language)}
                    target="_self"
                    className="col-span-1 row-span-2 relative rounded-xl overflow-hidden group shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer bg-black"
                  >
                    {product.image && (
                      <>
                        <img 
                          src={product.image} 
                          alt=""
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 px-[-20%] py-[-20%] scale-125" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-2 mb-16">
                          <img 
                            src={product.image} 
                            alt={product.translations?.[i18n.language]?.name || product.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" 
                          />
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent transition-opacity group-hover:opacity-90"></div>
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white flex flex-col items-start justify-end h-full z-10">
                       <span className="bg-[#ff2d55] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center justify-center shadow-lg mb-1.5 animate-pulse uppercase tracking-wider">
                          {isRtl ? `خصم ${discountPercent}%` : `-${discountPercent}% OFF`}
                       </span>
                       <h3 className={`text-[12px] md:text-[13px] font-[600] leading-tight drop-shadow-md line-clamp-2 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                         {product.translations?.[i18n.language]?.name || product.name}
                       </h3>
                       <div className={`mt-1.5 text-[11px] md:text-[12px] font-black text-[#34c759] tracking-tight ${i18n.language === 'ar' ? 'font-sans' : 'font-sans'}`}>
                         {product.price} {isRtl ? 'دج' : 'DA'}
                       </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <a 
                href={getLocalizedLink('https://redeem-dz.com/product/xbox/', i18n.language)}
                target="_self"
                className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer"
              >
                 <img 
                   src="https://redeem-dz.com/wp-content/uploads/2026/03/xbox-pass-REDEEM-DZ-01.webp" 
                   alt="Hot Deal" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                 <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#107c10] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
                        <FontAwesomeIcon icon={faXbox} /> Xbox
                      </span>
                      <span className="bg-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm animate-pulse">
                        <FontAwesomeIcon icon={faFire} size="xs" /> Hot
                      </span>
                    </div>
                    <h3 className={`text-[12px] md:text-[13px] font-[600] leading-tight drop-shadow-md line-clamp-1 uppercase tracking-tight ${isRtl ? 'font-kufi' : 'font-sans'}`}>
                      Xbox Game Pass Ultimate
                    </h3>
                    <div className="mt-1.5 text-[10px] opacity-90 font-medium">
                       {isRtl ? 'أفضل عرض لهذا الأسبوع' : 'Best deal of the week'}
                    </div>
                 </div>
              </a>
            )}

            {/* Bottom Left: FAQ Card */}
            <div 
              onClick={() => setShowFAQ(true)}
              className="col-span-1 row-span-1 bg-white hover:bg-amber-50/60 rounded-xl p-4 flex flex-col justify-between border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer transition-colors group relative overflow-hidden"
            >
              <div className={`absolute ${isRtl ? '-left-2' : '-right-2'} -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                <FontAwesomeIcon icon={faQuestionCircle} size="3x" />
              </div>
              <FontAwesomeIcon icon={faQuestionCircle} className="text-[#ff9500] text-xl" />
              <span className={`text-[13px] font-[600] text-gray-800 ${isRtl ? 'font-kufi' : 'font-sans'}`}>
                {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
            </div>

            {/* Bottom Right: Support Tile */}
            <a 
              href="https://api.whatsapp.com/send/?phone=213562033668&text&type=phone_number&app_absent=0" 
              target="_blank" rel="noreferrer"
              className="col-span-1 row-span-1 bg-[#25D366]/5 hover:bg-[#25D366]/10 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all border border-[#25D366]/20 group"
            >
               <FontAwesomeIcon icon={faWhatsapp} className="text-[#25D366] text-xl group-hover:scale-110 transition-transform" />
               <div className="flex flex-col">
                  <span className={`text-[11px] font-[600] text-[#25D366] ${isRtl ? 'font-kufi' : 'font-sans'}`}>
                    {isRtl ? 'الدعم الفني' : 'Live Support'}
                  </span>
                   <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping"></span>
                    <span className="text-[9px] text-[#25D366]/80 font-bold uppercase tracking-wider">
                      {isRtl ? 'متصل الآن' : 'Online'}
                    </span>
                  </div>
               </div>
            </a>

          </div>

        </div>

        {/* Platform Ticker */}
        <PlatformTicker />

      </div>

      <FAQOverlay isOpen={showFAQ} onClose={() => setShowFAQ(false)} t={t} />
    </div>
  );
};

export default Hero;
