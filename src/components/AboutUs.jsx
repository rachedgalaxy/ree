import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, ShieldCheck, Award, Star, Quote } from 'lucide-react';
import reviewsData from '../data/reviewsData.json';

const AboutUs = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const features = [
    {
      id: 1,
      title: t('about.t1'),
      desc: t('about.d1'),
      icon: <Gamepad2 className="w-8 h-8 text-blue-500" />,
      gradient: "from-blue-500/10 to-blue-600/5",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      title: t('about.t2'),
      desc: t('about.d2'),
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      gradient: "from-yellow-500/10 to-orange-500/5",
      border: "border-yellow-500/20"
    },
    {
      id: 3,
      title: t('about.t3'),
      desc: t('about.d3'),
      icon: <Award className="w-8 h-8 text-purple-500" />,
      gradient: "from-purple-500/10 to-pink-500/5",
      border: "border-purple-500/20"
    },
    {
      id: 4,
      title: t('about.t4'),
      desc: t('about.d4'),
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      gradient: "from-emerald-500/10 to-teal-500/5",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 mt-[80px]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center space-y-12"
      >
        {/* Header Section - Matrix Code Rain Effect */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl group"
        >
          {/* Matrix Effect Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none flex" dir="ltr">
            {/* Concentration of "digital rain" on the left */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="relative flex-none"
                style={{ 
                  width: `${Math.random() * 20 + 10}px`,
                  opacity: Math.max(0.1, (15 - i) / 15 * 0.8), // Fades out as we go right
                  marginLeft: i === 0 ? '20px' : '4px'
                }}
              >
                <div className="absolute top-0 left-0 w-full flex flex-col items-center">
                  <motion.div
                    initial={{ y: -500 }}
                    animate={{ y: 500 }}
                    transition={{ 
                      duration: 8 + Math.random() * 10, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: Math.random() * 10 
                    }}
                    className="flex flex-col gap-1"
                  >
                    {[...Array(20)].map((_, j) => {
                      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                      const randomChar = chars[Math.floor(Math.random() * chars.length)];
                      return (
                        <span 
                          key={j} 
                          className="text-[14px] md:text-[16px] font-mono font-bold text-red-600"
                          style={{ opacity: (20 - j) / 20 }}
                        >
                          {randomChar}
                        </span>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="shadow-2xl border border-white/20">
            <img 
              src="https://redeem-dz.com/wp-content/uploads/2023/07/redeem_special-offerss.jpg" 
              alt="Redeem Store Support" 
              className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl shadow-black/5 p-8 flex flex-col items-center text-center group min-h-[220px]"
            >
              {/* Large Cropped Background Icon */}
              <div className="absolute -bottom-8 -left-8 opacity-[0.06] text-black group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
                {React.cloneElement(feature.icon, { className: "w-40 h-40" })}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-5 w-full">
                <div className="p-4 rounded-2xl bg-gray-50 shadow-sm border border-gray-100 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-[10.5px] md:text-[11.5px] text-gray-600 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Section */}
        {reviewsData.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            {/* Section Header */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                {i18n.language === 'ar' ? 'آراء عملائنا' : 'Customer Reviews'}
              </div>
              <h2 className={`text-2xl md:text-3xl font-black text-gray-900 text-center ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                {i18n.language === 'ar' ? 'ماذا يقول عملاؤنا؟' : 'What our customers say?'}
              </h2>
            </div>

            {/* Draggable Slider */}
            <ReviewsSlider reviews={reviewsData} isRtl={i18n.language === 'ar'} />
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

/* ─── Draggable Reviews Slider ─────────────────────────── */
const ReviewsSlider = ({ reviews, isRtl }) => {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const onMouseDown = (e) => {
    isDown.current = true;
    setIsDragging(true);
    setHasMoved(false);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollStart.current = sliderRef.current.scrollLeft;
  };

  const onMouseLeave = () => { isDown.current = false; setIsDragging(false); setTimeout(() => setHasMoved(false), 100); };
  const onMouseUp = () => { isDown.current = false; setIsDragging(false); setTimeout(() => setHasMoved(false), 100); };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
    sliderRef.current.scrollLeft = scrollStart.current - walk;
  };

  // Touch support
  const onTouchStart = (e) => {
    startX.current = e.touches[0].pageX;
    scrollStart.current = sliderRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    const walk = (e.touches[0].pageX - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollStart.current - walk;
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      className={`flex gap-4 overflow-x-auto pb-4 pt-2 px-1 select-none
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        scroll-smooth snap-x snap-mandatory`}
    >
      {reviews.map((review, idx) => (
        <ReviewCard key={review.id} review={review} idx={idx} hasMoved={hasMoved} isRtl={isRtl} />
      ))}
    </div>
  );
};

/* ─── Single Review Card ─────────────────────────────────── */
const ReviewCard = ({ review, idx, hasMoved, isRtl }) => {
  const gradients = [
    'from-indigo-50 to-blue-50 border-indigo-100',
    'from-rose-50 to-pink-50 border-rose-100',
    'from-amber-50 to-yellow-50 border-amber-100',
    'from-emerald-50 to-teal-50 border-emerald-100',
    'from-purple-50 to-violet-50 border-purple-100',
    'from-sky-50 to-cyan-50 border-sky-100',
  ];
  const accentColors = ['text-indigo-500','text-rose-500','text-amber-500','text-emerald-500','text-purple-500','text-sky-500'];
  const gradient = gradients[idx % gradients.length];
  const accent = accentColors[idx % accentColors.length];

  const initials = review.reviewer.slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
      className={`snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[360px]
        bg-gradient-to-br ${gradient}
        rounded-3xl border p-6 flex flex-col gap-4
        shadow-sm hover:shadow-xl transition-shadow duration-500 group`}
    >
      {/* Quote icon */}
      <Quote size={28} className={`${accent} opacity-30 rotate-180 -mb-2`} />

      {/* Review text */}
      <p className={`text-gray-700 text-sm leading-relaxed font-medium flex-1 line-clamp-4 ${isRtl ? 'text-right font-kufi' : 'text-left'}`}>
        {review.review}
      </p>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-2 border-t border-black/5">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-sm
          bg-gradient-to-br ${idx % 2 === 0 ? 'from-gray-700 to-gray-900' : 'from-red-500 to-red-700'}`}>
          {initials}
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold text-gray-900 tracking-wide ${isRtl ? 'font-kufi' : ''}`}>
            {review.reviewer}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
        </div>
        {/* Verified badge */}
        <div className="mr-auto ml-auto flex-1 flex justify-end">
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <ShieldCheck size={10} />
            {isRtl ? 'موثّق' : 'Verified'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
