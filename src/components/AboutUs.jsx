import React, { useRef, useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, ShieldCheck, Award, Star, Quote, Lightbulb, Rocket, CreditCard, Headphones, CheckCircle2, Target } from 'lucide-react';

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import reviewsData from '../data/reviewsData.json';

const AboutUs = () => {
  const { t, i18n } = useTranslation();

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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-8 md:pb-16 mt-[70px]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center space-y-8"
      >
        {/* Header Section - Matrix Code Rain Effect */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full overflow-hidden rounded-3xl group shadow-2xl"
        >
          {/* Matrix Effect Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none flex" dir="ltr">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="relative flex-none"
                style={{ 
                  width: `${Math.random() * 20 + 10}px`,
                  opacity: Math.max(0.1, (15 - i) / 15 * 0.8),
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

          {/* Image — natural aspect ratio, fills full width */}
          <div className="w-full">
            <img 
              src="https://redeem-dz.com/wp-content/uploads/2023/07/redeem_special-offerss.jpg" 
              alt="Redeem Store Support" 
              className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* About Us Interactive Paragraphs */}
        <motion.div 
          variants={itemVariants} 
          className="w-full flex flex-col gap-6 md:gap-8 mb-4 border-t border-gray-100 pt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
            {/* Box 1: Story */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 backdrop-blur-xl border border-red-500/15 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(225,30,59,0.06)] relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                  <Lightbulb size={24} />
                </div>
                <h3 className={`text-xl md:text-2xl font-black text-gray-900 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans tracking-tight'}`}>
                  {i18n.language === 'ar' ? 'من نحن؟' : 'Who We Are'}
                </h3>
              </div>
              <p className={`text-sm md:text-[15px] font-medium leading-loose text-gray-600 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                {i18n.language === 'ar' ? (
                  <>نحن في <strong className="text-gray-900">Redeem</strong> مشروع رقمي جزائري طموح هدفه تبسيط عالم المنتجات الرقمية وجعلها في متناول الجميع بطريقة سريعة، آمنة، وموثوقة.<br/><br/>
                  بدأت الفكرة من حاجة حقيقية في السوق: صعوبة الحصول على خدمات رقمية أصلية بأسعار مناسبة وبدون تعقيدات. من هنا، تم بناء Redeem ليكون منصة متكاملة توفر حلول ذكية لشراء وشحن مختلف الخدمات الرقمية بكل سهولة.</>
                ) : (
                  <>At <strong className="text-gray-900">Redeem</strong>, we are an ambitious Algerian digital initiative aimed at simplifying the world of digital products, making them accessible to everyone in a fast, secure, and reliable way.<br/><br/>
                  The idea stemmed from a real market need: the difficulty of obtaining authentic digital services at affordable prices without complications. Hence, Redeem was built to be an integrated platform providing smart solutions to purchase and top-up various digital services with ease.</>
                )}
              </p>
            </motion.div>

            {/* Box 2: Features */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 backdrop-blur-xl border border-red-500/15 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(225,30,59,0.06)] relative overflow-hidden group cursor-default flex flex-col justify-center"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -ml-10 -mb-10 transition-transform duration-700 group-hover:scale-150"></div>
              <p className={`text-[15px] md:text-base font-bold text-gray-900 mb-6 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                {i18n.language === 'ar' ? 'نحن لا نبيع فقط منتجات، بل نوفر تجربة كاملة:' : 'We don\'t just sell products; we provide a complete experience:'}
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Rocket size={20}/>, ar: 'سرعة في التنفيذ (غالبًا خلال دقائق إلى ساعات)', en: 'Execution speed (often within minutes to hours)' },
                  { icon: <ShieldCheck size={20}/>, ar: 'نظام آمن يحمي بيانات المستخدمين', en: 'A secure system that protects user data' },
                  { icon: <CreditCard size={20}/>, ar: 'طرق دفع متعددة تناسب المستخدم الجزائري', en: 'Multiple payment methods tailored for Algerian users' },
                  { icon: <Headphones size={20}/>, ar: 'دعم مستمر لضمان أفضل تجربة ممكنة', en: 'Continuous support to ensure the best possible experience' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="text-red-600 p-2 bg-red-50 rounded-xl group-hover/item:bg-red-600 group-hover/item:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className={`text-sm md:text-[15px] font-semibold text-gray-700 group-hover/item:text-gray-900 transition-colors ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                      {i18n.language === 'ar' ? item.ar : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full mt-6 md:mt-8">
            {/* Box 3: Startup Logo Huge Separated */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 backdrop-blur-2xl border border-red-500/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(225,30,59,0.08)] relative overflow-hidden group flex items-center justify-center h-full min-h-[250px] cursor-default"
            >
               {/* Decorational blur inside */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-1000 group-hover:scale-150 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl -ml-10 -mb-10 transition-transform duration-1000 group-hover:scale-150 pointer-events-none"></div>
               
               {/* Matrix Effect Background for Startup */}
               <div className="absolute inset-0 z-0 pointer-events-none flex justify-evenly overflow-hidden opacity-50 transition-opacity duration-700 group-hover:opacity-100" dir="ltr">
                 {[...Array(15)].map((_, i) => (
                   <div 
                     key={i} 
                     className="relative flex-none"
                     style={{ 
                       width: '15px',
                       marginTop: `${Math.random() * -50}px`
                     }}
                   >
                     <div className="absolute top-0 left-0 w-full flex flex-col items-center">
                       <motion.div
                         initial={{ y: -300 }}
                         animate={{ y: 500 }}
                         transition={{ 
                           duration: 12 + Math.random() * 15, 
                           repeat: Infinity, 
                           ease: "linear",
                           delay: Math.random() * 8 
                         }}
                         className="flex flex-col gap-1"
                       >
                         {("NATIONAL STARTUP COMMITTEE").split('').map((char, j) => {
                           const isRed = Math.random() > 0.8; 
                           return (
                             <span 
                               key={j} 
                               className={`text-[10px] md:text-[12px] font-mono font-bold ${isRed ? 'text-red-400/60' : 'text-emerald-500/50'}`}
                               style={{ opacity: (26 - j) / 26 }}
                             >
                               {char === ' ' ? '\u00A0' : char}
                             </span>
                           );
                         })}
                       </motion.div>
                     </div>
                   </div>
                 ))}
               </div>

               <img 
                 src="https://redeem-dz.com/wp-content/uploads/2026/04/national-startup-committee.svg" 
                 alt="National Startup Committee" 
                 className="w-full max-w-[260px] md:max-w-[320px] drop-shadow-sm object-contain transform group-hover:scale-105 transition-transform duration-700 relative z-10" 
               />
            </motion.div>

            {/* Box 4: Innovative Project & Mission Texts */}
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 md:p-10 shadow-2xl relative group text-white flex flex-col gap-6 justify-center h-full cursor-default"
            >
              {/* Soft decorative background effects (isolated overflow layer) */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 mix-blend-overlay rounded-full blur-3xl -mr-20 -mt-20"></div>
              </div>
              
              <div className="relative z-10 flex flex-col gap-6 w-full h-full justify-between">
                
                {/* Top Half: Innovative Project */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                    <h4 className={`text-xl md:text-2xl font-black text-white ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                      {i18n.language === 'ar' ? 'مشروع مبتكر' : 'Innovative Project'}
                    </h4>
                  </div>
                  <p className={`text-[13px] md:text-[14px] font-medium leading-relaxed opacity-100 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                    {i18n.language === 'ar' ? (
                      <>مشروع Redeem (redeem.dz) حاصل على علامة "<span className="group/tt2 relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">مشروع مبتكر<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11.5px] font-sans font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt2:opacity-100 z-50 text-center text-nowrap">Label Projet Innovant</span></span>" من <span className="group/tt relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">الوزارة<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] md:w-max md:max-w-xs px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11px] font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt:opacity-100 z-50 text-center leading-relaxed">وزارة اقتصاد المعرفة والمؤسسات الناشئة والمؤسسات المصغرة</span></span>، وهو ما يعكس جودة الفكرة، وأصالتها، والجهود المبذولة في تطوير منصة حديثة تلبي احتياجات السوق الرقمي في الجزائر.</>
                    ) : (
                      <>The Redeem project (redeem.dz) has been awarded the "<span className="group/tt2 relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">Innovative Project<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11.5px] font-sans font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt2:opacity-100 z-50 text-center text-nowrap">Label Projet Innovant</span></span>" label, reflecting the quality and authenticity of the idea, as well as the efforts made in developing a modern platform that meets the needs of the Algerian digital market.</>
                    )}
                  </p>
                </div>

                <div className="w-full h-px bg-white/20 rounded-full my-1"></div>

                {/* Bottom Half: Mission */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <Target size={24} className="text-white" />
                    </div>
                    <h4 className={`text-xl md:text-2xl font-black text-white ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                      {i18n.language === 'ar' ? 'مهمتنا' : 'Our Mission'}
                    </h4>
                  </div>
                  <p className={`text-[13px] md:text-[14px] font-medium leading-relaxed opacity-90 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                    {i18n.language === 'ar'
                      ? 'توفير منتجات رقمية أصلية بسرعة وكفاءة، مع تجربة استخدام بسيطة وآمنة تناسب الجميع. نؤمن أن الثقة تُبنى بالفعل، لذلك نركز على تقديم خدمة مستقرة وشفافة.'
                      : 'To provide authentic digital products swiftly and efficiently, with a simple and secure user experience that suits everyone. We believe that trust is built through actions.'}
                  </p>
                </div>
              </div>
            </motion.div>
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
  const isHovered = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter by current language and randomize order
  const currentLang = isRtl ? 'ar' : 'en';
  const displayReviews = useMemo(() => {
    const sorted = [...reviews]
      .filter(r => r.lang === currentLang)
      .sort(() => Math.random() - 0.5);
    return [...sorted, ...sorted, ...sorted, ...sorted];
  }, [reviews, currentLang]);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    
    // We want the element whose center is closest to the container's center
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIdx = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  }, [activeIndex]);

  // Jump to middle on mount so we can drag both left and right immediately
  useLayoutEffect(() => {
    if (sliderRef.current && displayReviews.length > 0) {
      const container = sliderRef.current;
      // Go to middle of the cloned array
      const targetIndex = Math.floor(displayReviews.length / 2);
      const child = container.children[targetIndex];
      
      if (child) {
        // Calculate raw position for instant snap jump without animation
        const centerPos = child.offsetLeft - (container.clientWidth / 2) + (child.clientWidth / 2);
        container.scrollTo({ left: centerPos, behavior: 'instant' });
      }
    }
  }, [displayReviews]);

  useEffect(() => {
    const timer = setTimeout(handleScroll, 100);
    window.addEventListener('resize', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleScroll);
    }
  }, [handleScroll]);

  // Auto-play functionality
  useEffect(() => {
    let autoplayTimer;
    
    const autoScroll = () => {
      if (!isDown.current && !isHovered.current && sliderRef.current && !isDragging) {
        const container = sliderRef.current;
        const firstChild = container.children[0];
        if (firstChild) {
          const cardWidth = firstChild.clientWidth + 16; // width + gap
          container.scrollBy({ left: isRtl ? -cardWidth : cardWidth, behavior: 'smooth' });
        }
      }
      autoplayTimer = setTimeout(autoScroll, 4000);
    };

    autoplayTimer = setTimeout(autoScroll, 4000);
    return () => clearTimeout(autoplayTimer);
  }, [isRtl, isDragging]);

  const onMouseDown = (e) => {
    isDown.current = true;
    setIsDragging(true);
    setHasMoved(false);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollStart.current = sliderRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown.current = false;
    isHovered.current = false;
    setIsDragging(false);
    setTimeout(() => setHasMoved(false), 50);
  };

  const onMouseLeave = stopDrag;
  const onMouseUp = stopDrag;

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
    sliderRef.current.scrollLeft = scrollStart.current - walk;
  };

  const onTouchStart = (e) => {
    isHovered.current = true;
    setIsDragging(true);
    startX.current = e.touches[0].pageX;
    scrollStart.current = sliderRef.current.scrollLeft;
  };
  
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const walk = (e.touches[0].pageX - startX.current) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
  };

  return (
    <div
      ref={sliderRef}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={stopDrag}
      onTouchMove={onTouchMove}
      onScroll={handleScroll}
      style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      className={`flex gap-4 overflow-x-auto py-8 select-none
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        px-4 md:px-8
        ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}
      `}
    >
      {displayReviews.map((review, idx) => (
        <ReviewCard key={`${review.id}-${idx}`} review={review} idx={idx} hasMoved={hasMoved} isRtl={isRtl} isActive={activeIndex === idx} />
      ))}
    </div>
  );
};

/* ─── Single Review Card ─────────────────────────────────── */
const ReviewCard = ({ review, idx, hasMoved, isRtl, isActive }) => {
  const isTrustpilot = review.source === 'trustpilot';
  const isFacebook = review.source === 'facebook';

  const gradients = [
    'from-indigo-50 to-blue-50 border-indigo-100',
    'from-rose-50 to-pink-50 border-rose-100',
    'from-amber-50 to-yellow-50 border-amber-100',
    'from-emerald-50 to-teal-50 border-emerald-100',
    'from-purple-50 to-violet-50 border-purple-100',
    'from-sky-50 to-cyan-50 border-sky-100',
  ];
  const accentColors = ['text-indigo-500','text-rose-500','text-amber-500','text-emerald-500','text-purple-500','text-sky-500'];
  
  // Custom styling
  const gradient = isTrustpilot ? 'from-[#f5faf7] to-[#eaf5f0] border-[#00b67a]/30' :
                   isFacebook ? 'from-[#f0f2f5] to-[#e7f3ff] border-[#0866ff]/30' :
                   gradients[idx % gradients.length];
  const accent = isTrustpilot ? 'text-[#00b67a]' : 
                 isFacebook ? 'text-[#0866ff]' :
                 accentColors[idx % accentColors.length];

  const initials = review.reviewer.slice(0, 2).toUpperCase();
  const displayName = review.reviewer.length > 2 ? review.reviewer.slice(0, 2) + '***' : review.reviewer.slice(0, 1) + '***';

  return (
    <motion.div
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        scale: isActive ? 1 : 0.85,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`snap-center shrink-0 w-[65vw] sm:w-[50vw] md:w-[340px] lg:w-[380px]
        bg-gradient-to-br ${gradient}
        rounded-3xl border p-5 md:p-6 flex flex-col gap-3 md:gap-4
        shadow-sm hover:shadow-xl transition-shadow duration-500 group relative z-${isActive ? '10' : '0'}`}
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
          <div 
            key={i} 
            className={`flex items-center justify-center w-[18px] h-[18px] ${
              isTrustpilot && i < review.rating ? 'bg-[#00b67a]' : 
              !isTrustpilot && i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'
            }`}
          >
            <Star
              size={isTrustpilot ? 10 : 14}
              className={isTrustpilot && i < review.rating ? 'text-white fill-white' : ''}
            />
          </div>
        ))}
      </div>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-2 border-t border-black/5">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-sm
          bg-gradient-to-br ${isTrustpilot ? 'from-[#00b67a] to-[#009462]' : isFacebook ? 'from-[#0866ff] to-[#0051d6]' : idx % 2 === 0 ? 'from-gray-700 to-gray-900' : 'from-red-500 to-red-700'}`}>
          {initials}
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-bold text-gray-900 tracking-wide ${isRtl ? 'font-kufi' : ''}`}>
            {displayName}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
        </div>
        
        {/* Verified / Trustpilot / Facebook badge */}
        <div className="mr-auto ml-auto flex-1 flex justify-end">
          {isTrustpilot ? (
             <span className="flex items-center gap-1 text-[10px] font-bold text-[#00b67a] bg-[#00b67a]/10 px-2 py-0.5 rounded-full border border-[#00b67a]/20">
               <span className="bg-[#00b67a] rounded-sm p-0.5"><Star size={8} className="fill-white text-white"/></span>
               Trustpilot
             </span>
          ) : isFacebook ? (
             <span className="flex items-center gap-1 text-[10px] font-bold text-[#0866ff] bg-[#0866ff]/10 px-2 py-0.5 rounded-full border border-[#0866ff]/20">
               <FacebookIcon size={12} className="text-[#0866ff]" />
               Facebook
             </span>
          ) : (
             <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
               <ShieldCheck size={10} />
               {isRtl ? 'موثّق' : 'Verified'}
             </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};


export default AboutUs;
