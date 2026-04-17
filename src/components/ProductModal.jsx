import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { wcApi } from '../utils/wcApi';

const RegionSelector = ({ attributes, selectedRegion, onSelect, i18n }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Example flags mapping
  const flags = {
    'usa': '🇺🇸',
    'united states': '🇺🇸',
    'europe': '🇪🇺',
    'eu': '🇪🇺',
    'global': '🌐',
    'saudi arabia': '🇸🇦',
    'uae': '🇦🇪',
    'egypt': '🇪🇬',
    'turkey': '🇹🇷',
    'kuwait': '🇰🇼',
    'qatar': '🇶🇦',
    'bahrain': '🇧🇭',
    'france': '🇫🇷',
    'germany': '🇩🇪',
    'united kingdom': '🇬🇧',
    'uk': '🇬🇧',
  };

  const getFlag = (name) => {
    const key = name.toLowerCase();
    return flags[key] || '🏳️';
  };

  if (!attributes || attributes.length === 0) return null;

  // Find the attribute related to region/country
  const regionAttr = attributes.find(a => 
    a.name.toLowerCase().includes('region') || 
    a.name.toLowerCase().includes('country') ||
    a.name.toLowerCase().includes('بلد') ||
    a.name.toLowerCase().includes('منطقة')
  );

  if (!regionAttr) return null;

  return (
    <div className="relative mb-6">
      <label className={`block text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-bold ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
        {i18n.language === 'ar' ? 'اختر المنطقة' : 'Select Region'}
      </label>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl flex items-center justify-between hover:bg-white/80 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{getFlag(selectedRegion || regionAttr.options[0])}</span>
          <span className={`text-sm font-medium text-gray-800 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
            {selectedRegion || regionAttr.options[0]}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-2xl overflow-hidden"
          >
            {regionAttr.options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 h-12 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getFlag(option)}</span>
                  <span className={`text-sm font-medium ${selectedRegion === option ? 'text-[#e11e3b]' : 'text-gray-700'}`}>
                    {option}
                  </span>
                </div>
                {selectedRegion === option && <Check size={16} className="text-[#e11e3b]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductModal = ({ product, onClose }) => {
  const { i18n } = useTranslation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [playerInput, setPlayerInput] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await wcApi.getProductDetails(product.id);
      setDetails(data);
      
      // Auto-select first region if available
      if (data?.attributes) {
        const regionAttr = data.attributes.find(a => 
            a.name.toLowerCase().includes('region') || 
            a.name.toLowerCase().includes('country')
        );
        if (regionAttr) setSelectedRegion(regionAttr.options[0]);
      }
      
      setLoading(false);
    };
    fetchDetails();
  }, [product.id]);

  // Filter variations based on selected region
  const filteredVariations = details?.variations_details?.filter(v => {
    if (!selectedRegion) return true;
    return v.attributes.some(attr => attr.option === selectedRegion);
  }) || [];

  // Update selected variation if region changes
  useEffect(() => {
    if (filteredVariations.length > 0) {
      setSelectedVariation(filteredVariations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [selectedRegion, details]);

  const handleBuy = () => {
    if (!selectedVariation && details?.type === 'variable') return;
    const id = selectedVariation ? selectedVariation.id : product.id;
    
    // We append the player input as billing_player_id assuming ThemeHigh plugin uses this name (can be changed).
    const extraParams = playerInput ? `&billing_player_id=${encodeURIComponent(playerInput)}&order_comments=${encodeURIComponent('Player ID/Details: ' + playerInput)}` : '';
    
    window.location.href = wcApi.getCheckoutUrl(id) + extraParams;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container */}
      <motion.div 
        layoutId={`product-${product.id}`}
        className="relative w-full max-w-4xl bg-[#f5f5f7] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X size={20} className="text-gray-800" />
        </button>

        {/* Left Side: Product Image */}
        <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto bg-gray-200 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Details & Options */}
        <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto no-scrollbar flex flex-col bg-white/40 backdrop-blur-xl">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-2 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
              {product.translations[i18n.language]?.name || product.name}
            </h2>
            <div 
              className={`text-gray-500 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}
              dangerouslySetInnerHTML={{ __html: product.description || product.translations[i18n.language]?.desc }}
            />
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-[#e11e3b] rounded-full animate-spin mb-4" />
              <p className="text-gray-400 text-sm">{i18n.language === 'ar' ? 'جاري تحميل الخيارات...' : 'Loading options...'}</p>
            </div>
          ) : (
            <div className="flex-1">
              {/* Region/Country Dropdown */}
              <RegionSelector 
                attributes={details?.attributes} 
                selectedRegion={selectedRegion}
                onSelect={setSelectedRegion}
                i18n={i18n}
              />

              {/* Variations Grid */}
              <div className="mb-8">
                <label className={`block text-[11px] uppercase tracking-wider text-gray-500 mb-4 font-bold ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                  {i18n.language === 'ar' ? 'اختر الفئة' : 'Select Denomination'}
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(filteredVariations.length > 0 ? filteredVariations : (details?.type === 'simple' ? [details] : [])).map((v) => {
                    const isSelected = selectedVariation?.id === v.id || (details?.type === 'simple');
                    
                    // Improved Label Logic: Extract the denomination
                    let label = v.attributes?.map(a => 
                        ['region', 'country', 'بلد', 'منطقة'].some(k => a.name.toLowerCase().includes(k)) ? '' : a.option
                    ).join(' ').trim();
                    
                    if (!label) {
                        label = `${v.price} ${details?.currency || (i18n.language === 'ar' ? 'دج' : 'DA')}`;
                    }
                    
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariation(v)}
                        className={`relative group h-20 px-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                          ${isSelected 
                            ? 'border-[#e11e3b] bg-[#e11e3b]/5 shadow-lg shadow-[#e11e3b]/10' 
                            : 'border-gray-100 bg-white hover:border-gray-300'}`}
                      >
                        {/* Hot Badge (Most Sold / Top 3) */}
                        {(v.total_sales > 10 || v.menu_order === 0) && (
                          <div className="absolute top-1 left-1 md:top-2 md:left-2">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Flame size={12} className="text-white fill-current" />
                            </motion.div>
                          </div>
                        )}
                        
                        <span className={`text-sm md:text-base font-bold tracking-tight ${isSelected ? 'text-[#e11e3b]' : 'text-gray-800'}`}>
                          {label}
                        </span>
                        
                        {/* Subtle Price if not already in label */}
                        {!label.includes(v.price) && (
                          <span className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-[#e11e3b]/70' : 'text-gray-400'}`}>
                            {v.price} {details?.currency || (i18n.language === 'ar' ? 'دج' : 'DA')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Player ID / Account Details Input */}
              <div className="mb-6">
                 <label className={`block text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-bold ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                    {i18n.language === 'ar' ? 'معرف اللاعب (ID) / تفاصيل الحساب' : 'Player ID / Account Details'}
                    <span className="text-gray-400 font-normal ml-1 mx-1 text-[10px]">({i18n.language === 'ar' ? 'إذا كان المنتج يتطلب ذلك' : 'If required'})</span>
                 </label>
                 <input 
                    type="text"
                    value={playerInput}
                    onChange={(e) => setPlayerInput(e.target.value)}
                    placeholder={i18n.language === 'ar' ? 'أدخل الـ ID هنا...' : 'Enter your ID here...'}
                    className={`w-full h-12 px-4 bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e11e3b]/50 focus:border-[#e11e3b] transition-all text-sm text-gray-800 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}
                 />
              </div>

              {/* Bottom Sticky Action Area */}
              <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase tracking-widest">{i18n.language === 'ar' ? 'السعر الإجمالي' : 'Total Price'}</span>
                  <span className="text-2xl md:text-3xl font-black text-gray-900">
                    {selectedVariation?.price || product.price || '---'} <span className="text-sm font-normal text-gray-400">{i18n.language === 'ar' ? 'دج' : 'DA'}</span>
                  </span>
                </div>
                
                <button 
                  onClick={handleBuy}
                  disabled={!selectedVariation && details?.type === 'variable'}
                  className="flex-1 max-w-[200px] h-14 bg-[#e11e3b] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#e11e3b]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <ShoppingCart size={20} />
                  <span className={i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}>
                    {i18n.language === 'ar' ? 'شراء الآن' : 'Buy Now'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
