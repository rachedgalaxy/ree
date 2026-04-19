import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Flame, Star } from 'lucide-react';
import { getLocalizedLink } from '../utils/url';

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  const tProduct = product.translations?.[i18n.language] || product.translations?.['en'] || { name: product.name };
  // Removed dynamic accent color extraction due to CORS restrictions on original image server
  const accentColor = 'rgba(225, 30, 59, 0.4)'; 

  const baseWooUrl = product.woocommerceUrl || '#';
  const urlWithLang = i18n.language === 'en' && baseWooUrl !== '#' 
    ? getLocalizedLink(baseWooUrl, i18n.language)
    : baseWooUrl;


  const isOutOfStock = product.in_stock === false; // Explicit check, assume true if undefined

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": tProduct.name,
    "image": product.image,
    "description": `شراء ${tProduct.name} في الجزائر بأفضل الأسعار عبر بريدي موب و OCPay`,
    "offers": {
      "@type": "Offer",
      "url": `https://redeem.dz/#/product/${product.id}`,
      "priceCurrency": "DZD",
      "price": product.price || "0",
      "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "متجر ريديم Redeem DZ"
      }
    }
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    <a
      href={`#/product/${product.id}`}
      onClick={(e) => {
          if (isOutOfStock) e.preventDefault();
      }}
      target="_self"
      draggable="false"
      style={{
        transform: "translateZ(0)",
        borderColor: isOutOfStock ? 'rgba(0,0,0,0.1)' : accentColor,
      }}
      className={`group relative flex flex-col rounded-2xl p-2 md:p-3 transition-all duration-500 transform focus:outline-none select-none overflow-hidden isolate border border-white/40
        ${isOutOfStock 
            ? 'opacity-60 cursor-not-allowed grayscale-[0.8] hover:grayscale-[0.8]' 
            : 'hover:-translate-y-1 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:ring-1'}
      `}
    >
      {/* Target Audience: Out of Stock overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white text-[11px] md:text-[13px] font-bold px-3 py-1.5 rounded-full shadow-xl tracking-wider">
             {i18n.language === 'ar' ? 'نفدت الكمية' : 'Out of Stock'}
          </div>
        </div>
      )}

      {/* Flame Badge (Only on Best Sellers in stock) */}
      {product.is_hot && !isOutOfStock && (
        <div className="absolute top-3 left-3 z-30 pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white p-1.5 rounded-full shadow-lg"
          >
            <Flame size={14} className="fill-current" />
          </motion.div>
        </div>
      )}

      {/* Premium Dynamic Blurred Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-xl scale-125 opacity-25"
        />
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
            referrerPolicy="no-referrer"
            src={product.image}
            alt={tProduct.name}
            className={`w-full h-full object-cover transition-transform duration-700 pointer-events-none ${!isOutOfStock && 'group-hover:scale-110'}`}
          />
        </div>

        {/* Title & Price */}
        <div className="mt-2 px-1.5 pb-1 flex-1 flex flex-col justify-center pointer-events-none">
          <h3 className={`text-[12px] md:text-[14px] font-[600] text-gray-900 text-start line-clamp-1 leading-tight tracking-tight drop-shadow-sm ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
            {tProduct.name}
          </h3>
          {product.price && !isOutOfStock && (
            <div className="flex items-center justify-between mt-1 w-full gap-1">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider whitespace-nowrap">
                  {i18n.language === 'ar' ? 'تبدأ من' : 'From'}
                </span>
                <span className="text-[11px] md:text-[12.5px] font-bold text-[#e11e3b] whitespace-nowrap">
                  {product.price} {i18n.language === 'ar' ? 'دج' : 'DA'}
                </span>
              </div>
              
              {/* Product Rating Stars */}
              {(product.average_rating > 0) && (
                <div 
                  className="flex items-center gap-0.5" 
                  aria-label={i18n.language === 'ar' ? `تقييم: ${product.average_rating} من 5` : `Rating: ${product.average_rating} out of 5`}
                  title={`${product.average_rating} rating`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      className={`${i < Math.floor(product.average_rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors duration-300`} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {isOutOfStock && (
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[12px] md:text-[13px] font-bold text-gray-500">
                {i18n.language === 'ar' ? 'غير متوفر حالياً' : 'Unavailable'}
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
    </>
  );
};

export default ProductCard;
