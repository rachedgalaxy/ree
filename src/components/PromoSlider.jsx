import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROMO_ITEMS = [
  { id: 'netflix', img: "https://redeem-dz.com/wp-content/uploads/2026/04/NETFLIX-CC-1.webp", link: "https://redeem-dz.com/en/product/netflix/" },
  { id: 'shahid', img: "https://redeem-dz.com/wp-content/uploads/2026/04/shahid-CC-1.webp", link: "https://redeem-dz.com/en/product/shahid/" },
  { id: 'osn',    img: "https://redeem-dz.com/wp-content/uploads/2026/04/osn-CC-1.webp",    link: "https://redeem-dz.com/en/product/osn/" },
  { id: 'watchit',img: "https://redeem-dz.com/wp-content/uploads/2026/04/watchit-CC-1.webp",link: "https://redeem-dz.com/en/product/watch-it/" }
];

const PromoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Group items into pairs of two
  const pairedItems = [];
  for (let i = 0; i < PROMO_ITEMS.length; i += 2) {
    pairedItems.push([PROMO_ITEMS[i], PROMO_ITEMS[i + 1]]);
  }

  useEffect(() => {
    let timerId;
    if (!isHovered) {
      timerId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % pairedItems.length);
      }, 5000); // 5 seconds duration for smooth reading
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isHovered, pairedItems.length]);

  return (
    <div className="w-full my-8 md:my-12 px-2 sm:px-0">
      <div 
        className="relative overflow-hidden rounded-2xl md:rounded-[32px] glass-panel shadow-[0_8px_30px_rgb(0,0,0,0.06)] aspect-[21/10] md:aspect-[32/9] border border-white/20 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl p-3 md:p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <AnimatePresence mode="default" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30, position: 'absolute' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex gap-3 md:gap-6 w-full h-full"
          >
            {pairedItems[currentIndex].map((item, idx) => (
              item && (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target="_self"
                  className="flex-1 relative rounded-[1rem] md:rounded-2xl overflow-hidden group bg-transparent flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Subtle background glow for the image */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* The Image */}
                  <img 
                    src={item.img} 
                    alt={item.id} 
                    className="w-full h-full object-cover rounded-[1rem] md:rounded-2xl" 
                    loading="lazy"
                  />
                  
                  {/* Premium overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              )
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Indicators (Dots) */}
        <div className="absolute bottom-2 md:bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {pairedItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                 index === currentIndex 
                  ? 'bg-red-500 w-6 h-1.5 shadow-md' 
                  : 'bg-black/20 dark:bg-white/20 w-1.5 h-1.5 hover:bg-red-500/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;
