import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROMO_IMAGES = [
  "https://redeem-dz.com/wp-content/uploads/2026/04/NETFLIX-CC-1.webp",
  "https://redeem-dz.com/wp-content/uploads/2026/04/shahid-CC-1.webp",
  "https://redeem-dz.com/wp-content/uploads/2026/04/watchit-CC-1.webp",
  "https://redeem-dz.com/wp-content/uploads/2026/04/osn-CC-1.webp"
];

const PromoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timerId;
    const startTimer = () => {
      timerId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length);
      }, 4000); // Auto-advance every 4 seconds
    };

    if (!isHovered) {
      startTimer();
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isHovered]);

  const handleDragEnd = (e, { offset }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      // Swiped left, go next
      setCurrentIndex((prev) => (prev + 1) % PROMO_IMAGES.length);
    } else if (swipe > 50) {
      // Swiped right, go prev
      setCurrentIndex((prev) => (prev - 1 + PROMO_IMAGES.length) % PROMO_IMAGES.length);
    }
  };

  return (
    <div className="w-full my-8 md:my-12 px-2 sm:px-0">
      <div 
        className="relative overflow-hidden rounded-2xl md:rounded-[32px] glass-panel shadow-[0_8px_30px_rgb(0,0,0,0.06)] aspect-[21/9] md:aspect-[32/9] border border-white/20 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.img
            key={currentIndex}
            src={PROMO_IMAGES[currentIndex]}
            alt={`Promo Banner ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Navigation Indicators (Dots) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {PROMO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'bg-white w-6 h-2 shadow-md' 
                  : 'bg-white/50 w-2 h-2 hover:bg-white/80'
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
