import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getLocalizedLink } from '../utils/url';

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  const tProduct = product.translations[i18n.language] || product.translations['en'];
  const [accentColor, setAccentColor] = useState('rgba(225, 30, 59, 0.4)'); // Default to brand red

  useEffect(() => {
    if (!product.image) return;
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = product.image;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        // Brighten/Adjust color if too dark? No, keep it pure
        setAccentColor(`rgba(${r}, ${g}, ${b}, 0.6)`);
      } catch {
        // Fallback already set
      }
    };
  }, [product.image]);

  return (
    <a 
      href={getLocalizedLink(product.woocommerceUrl, i18n.language)} 
      target="_self"
      draggable="false"
      style={{ 
        transform: "translateZ(0)",
        borderColor: accentColor,
        boxShadow: "0 0 0 0 transparent"
      }}
      className="group relative flex flex-col rounded-2xl p-2 md:p-3 transition-all duration-500 transform hover:-translate-y-1 focus:outline-none select-none overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:ring-1 border border-white/40 isolate"
    >
      {/* Premium Dynamic Blurred Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={product.image} 
          alt="" 
          className="w-full h-full object-cover blur-xl scale-125 opacity-25 group-hover:opacity-35 transition-opacity duration-500"
        />
        {/* Frosted White Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image Container */}
        <div className="w-full aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm isolate">
          <motion.img 
            style={{ transform: "translateZ(0)" }}
            initial={false}
            loading="lazy"
            draggable="false"
            src={product.image} 
            alt={tProduct.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          />
        </div>
        
        {/* Title Container */}
        <div className="mt-2 px-1.5 pb-1 flex-1 flex flex-col justify-center pointer-events-none">
          <h3 className={`text-[12px] md:text-[14px] font-[600] text-gray-900 text-start line-clamp-1 leading-tight tracking-tight drop-shadow-sm ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
            {tProduct.name}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
