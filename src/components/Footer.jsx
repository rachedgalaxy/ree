import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="w-full bg-[#efefef]/80 backdrop-blur-xl border-t border-gray-200/50 py-6 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Social Icons (DOM Position 1 -> RTL: Right Side, LTR: Left Side) */}
        <div className="flex gap-2.5 md:gap-3 items-center">
          <a 
            href="https://www.facebook.com/redeem.dz" 
            target="_blank" 
            rel="noreferrer" 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            title="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-[12px] md:text-[14px]" />
          </a>
          <a 
            href="https://www.instagram.com/redeem.dz" 
            target="_blank" 
            rel="noreferrer" 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#E4405F] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            title="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-[12px] md:text-[14px]" />
          </a>
          <a 
            href="https://www.youtube.com/@redeem-dz" 
            target="_blank" 
            rel="noreferrer" 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-[#CD201F] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            title="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-[12px] md:text-[14px]" />
          </a>
          <a 
            href="https://www.tiktok.com/@redeem-dz" 
            target="_blank" 
            rel="noreferrer" 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-black hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            title="TikTok"
          >
            <FontAwesomeIcon icon={faTiktok} className="text-[11px] md:text-[13px]" />
          </a>
          <a 
            href="https://api.whatsapp.com/send/?phone=213562033668&text&type=phone_number&app_absent=0" 
            target="_blank" 
            rel="noreferrer" 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#25D366] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            title="WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-[12px] md:text-[14px]" />
          </a>
        </div>

        {/* Payment Graphics (DOM Position 2 -> RTL: Left Side, LTR: Right Side) */}
        <div className="flex flex-col items-center gap-1 opacity-80 transition-opacity hover:opacity-100 grayscale hover:grayscale-0 duration-500">
          <img 
            src="https://redeem-dz.com/wp-content/uploads/2025/09/payment.svg" 
            alt="Payment Methods" 
            className="w-full max-w-[240px] md:max-w-[280px] object-contain mix-blend-multiply drop-shadow-sm" 
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
