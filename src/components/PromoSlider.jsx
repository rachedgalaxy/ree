import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedLink } from '../utils/url';

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
  const handleLinkClick = (e, linkStr) => {
    if (isDragMoved) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div className="w-full my-8 md:my-12 px-2 sm:px-0">
      <div 
        className="relative overflow-hidden rounded-2xl md:rounded-[32px] glass-panel shadow-[0_8px_30px_rgb(0,0,0,0.06)] aspect-[21/10] md:aspect-[32/9] border border-white/20 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl p-3 md:p-6"
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef} 
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto no-scrollbar gap-3 md:gap-6 w-full h-full pb-2 ${isDragging ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
        >
          {PROMO_ITEMS.map((item) => (
             <a 
               key={item.id} 
               href={getLocalizedLink(item.link, i18n.language)} 
               target="_self"
               draggable="false"
               onClick={(e) => handleLinkClick(e)}
               className={`shrink-0 w-[calc(50%-6px)] md:w-[calc(25%-18px)] snap-start h-full relative rounded-[1rem] md:rounded-2xl overflow-hidden bg-transparent flex items-center justify-center shadow-sm select-none`}
             >
               <img 
                 src={item.img} 
                 alt={item.id} 
                 draggable="false"
                 className="w-full h-full object-cover rounded-[1rem] md:rounded-2xl pointer-events-none select-none" 
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
             </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;
