import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedLink } from '../utils/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';

const PROMO_ITEMS = [
  { id: 'netflix', img: "https://redeem-dz.com/wp-content/uploads/2026/04/NETFLIX-CC-1.webp", link: "https://redeem-dz.com/product/netflix/" },
  { id: 'shahid', img: "https://redeem-dz.com/wp-content/uploads/2026/04/shahid-CC-1.webp", link: "https://redeem-dz.com/product/shahid/" },
  { id: 'osn',    img: "https://redeem-dz.com/wp-content/uploads/2026/04/osn-CC-1.webp",    link: "https://redeem-dz.com/product/osn/" },
  { id: 'watchit',img: "https://redeem-dz.com/wp-content/uploads/2026/04/watchit-CC-1.webp",link: "https://redeem-dz.com/product/watch-it/" }
];

const PromoSlider = () => {
  const { i18n } = useTranslation();
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = i18n.language === 'ar';

  // Drag State Management for native feel
  const [isDragging, setIsDragging] = useState(false);
  const [isDragMoved, setIsDragMoved] = useState(false);
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
    setIsHovered(false);
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
    // Increased scroll multiplier significantly to make dragging on desktop/large screens feel much lighter and faster
    const walk = (x - startX.current) * 2.5; 
    if (Math.abs(walk) > 10) setIsDragMoved(true); 
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  // Continuous Auto-Scroll Effect
  useEffect(() => {
    let timerId;
    if (!isHovered && !isDragging && scrollRef.current) {
      timerId = setInterval(() => {
        if (!scrollRef.current) return;
        const { clientWidth, scrollLeft, scrollWidth } = scrollRef.current;
        const scrollAmount = clientWidth / 2; // Move by roughly one card
        
        let newScrollLeft = Math.abs(scrollLeft) + scrollAmount;
        
        // Loop back smoothly if reached the end
        if (newScrollLeft >= scrollWidth - clientWidth) {
           scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
           return;
        }

        const multiplier = isRtl ? -1 : 1;
        scrollRef.current.scrollBy({ left: scrollAmount * multiplier, behavior: 'smooth' });
      }, 3500); 
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isHovered, isDragging, isRtl]);

  // Prevent link click when user is dragging instead of intentionally clicking
  const handleLinkClick = (e) => {
    if (isDragMoved) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div 
      className="w-full mb-5 md:mb-7 px-2 sm:px-0 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 mb-2 md:mb-3 border-b border-gray-100 pb-2">
        <FontAwesomeIcon icon={faTv} className="text-[#e11e3b] text-sm md:text-base opacity-90" />
        <h2 className={`text-sm md:text-base font-[600] text-gray-800 tracking-tight uppercase ${isRtl ? 'font-kufi' : 'font-sans'}`}>
          {isRtl ? 'اشتراكات الترفيه' : 'Entertainment & TV'}
        </h2>
      </div>

      <style>{`
        .promo-scroll::-webkit-scrollbar { display: none; }
        .promo-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div 
        ref={scrollRef} 
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`promo-scroll flex overflow-x-auto gap-4 md:gap-5 lg:gap-6 w-full pb-6 pt-2 px-1 ${isDragging ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
      >
          {PROMO_ITEMS.map((item) => (
             <a 
               key={item.id} 
               href={getLocalizedLink(item.link, i18n.language)} 
               target="_self"
               draggable="false"
               onClick={(e) => handleLinkClick(e)}
               className={`shrink-0 w-[calc(50%-6px)] md:w-[calc(25%-18px)] snap-start relative rounded-2xl p-2 md:p-3 transition-all duration-300 bg-transparent flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-white/40 select-none overflow-hidden isolate transform translate-z-0 transition-all duration-500`}
             >
               {/* TV Icon Badge (Like Flame Badge) */}
               <div className="absolute top-3 left-3 z-30 pointer-events-none">
                 <div className="flex items-center justify-center bg-gradient-to-br from-[#e11e3b] to-red-700 text-white p-1.5 rounded-full shadow-lg">
                   <FontAwesomeIcon icon={faTv} style={{ fontSize: '12px' }} />
                 </div>
               </div>

               {/* Premium Dynamic Blurred Background (Like ProductCard) */}
               <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                 <img
                   src={item.img}
                   alt=""
                   loading="lazy"
                   className="w-full h-full object-cover blur-xl scale-125 opacity-25"
                 />
                 <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
               </div>

               {/* The Image Container */}
               <div className="w-full relative z-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm isolate">
                 <img 
                   src={item.img} 
                   alt={item.id} 
                   draggable="false"
                   className="w-full h-auto rounded-xl pointer-events-none select-none transition-transform duration-700" 
                   loading="lazy"
                 />
               </div>
               
               {/* Overlay glow */}
               <div className="absolute inset-0 z-20 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
             </a>
          ))}
        </div>
    </div>
  );
};

export default PromoSlider;
