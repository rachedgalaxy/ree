import React, { useRef, useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useSpring, useTransform, useInView } from 'framer-motion';
import { 
  Lightbulb, 
  Rocket, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  CheckCircle2, 
  Target, 
  Star,
  Quote,
  Users,
  ShoppingBag,
  Gamepad2,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import reviewsData from '../data/reviewsData.json';
import statsData from '../data/statsData.json';

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
        className="flex flex-col items-center justify-center space-y-5 md:space-y-8"
      >
        {/* Header Section - Matrix Code Rain Effect */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full overflow-hidden rounded-3xl group shadow-2xl"
        >
          {/* Elegant Ambient Overlay instead of Matrix for Performance */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/10 mix-blend-overlay"></div>

          {/* Image — taller on mobile with object-cover to avoid distortion */}
          <div className="w-full">
            <img 
              src="https://redeem-dz.com/wp-content/uploads/2023/07/redeem_special-offerss.jpg" 
              alt="Redeem Store Support" 
              className="w-full h-[150px] sm:h-[180px] md:h-auto object-cover object-[60%_center] transform transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* About Us Interactive Paragraphs */}
        <motion.div 
          variants={itemVariants} 
          className="w-full flex flex-col gap-4 md:gap-8 mb-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
            {/* Box 1: Story */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 backdrop-blur-xl border border-red-500/15 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(225,30,59,0.06)] relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="p-2.5 md:p-3 bg-red-50 text-red-600 rounded-xl md:rounded-2xl border border-red-100 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className={`text-lg md:text-2xl font-black text-gray-900 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans tracking-tight'}`}>
                  {i18n.language === 'ar' ? 'من نحن؟' : 'Who We Are'}
                </h3>
              </div>
              <p className={`text-[12px] md:text-[15px] font-medium leading-relaxed md:leading-loose text-gray-600 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
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
              className="bg-white/80 backdrop-blur-xl border border-red-500/15 rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgb(225,30,59,0.06)] relative overflow-hidden group cursor-default flex flex-col justify-center"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -ml-10 -mb-10 transition-transform duration-700 group-hover:scale-150"></div>
              <p className={`text-[12px] md:text-base font-bold text-gray-900 mb-4 md:mb-6 ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                {i18n.language === 'ar' ? 'نحن لا نبيع فقط منتجات، بل نوفر تجربة كاملة:' : 'We don\'t just sell products; we provide a complete experience:'}
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  { icon: <Rocket className="w-[14px] h-[14px] md:w-5 md:h-5"/>, ar: 'سرعة في تنفيذ الطلب', en: 'Fast order execution' },
                  { icon: <ShieldCheck className="w-[14px] h-[14px] md:w-5 md:h-5"/>, ar: 'نظام آمن وموثوق يحمي بيانات المستخدمين', en: 'Secure system protecting user data' },
                  { icon: <CreditCard className="w-[14px] h-[14px] md:w-5 md:h-5"/>, ar: 'طرق دفع مرنة تناسب المستخدم الجزائري', en: 'Flexible payments for Algerian users' },
                  { icon: <Headphones className="w-[14px] h-[14px] md:w-5 md:h-5"/>, ar: 'دعم فني مستمر لضمان أفضل تجربة', en: 'Continuous tech support for best experience' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 md:gap-4 group/item">
                    <div className="text-red-600 p-1.5 md:p-2 bg-red-50 rounded-lg md:rounded-xl group-hover/item:bg-red-600 group-hover/item:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className={`text-[10px] md:text-[14px] whitespace-nowrap leading-tight font-bold md:font-semibold text-gray-700 group-hover/item:text-gray-900 transition-colors ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
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
               {/* Elegant Inner Shadow / Ambient Glow */}
               <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-emerald-500/5 to-red-500/5 opacity-50 transition-opacity duration-700 group-hover:opacity-100"></div>

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
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl text-white shadow-inner border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className={`text-lg md:text-2xl font-black text-white ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                      {i18n.language === 'ar' ? 'مشروع مبتكر' : 'Innovative Project'}
                    </h4>
                  </div>
                  <p className={`text-[11px] md:text-[14px] font-medium leading-relaxed opacity-100 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                    {i18n.language === 'ar' ? (
                      <>مشروع Redeem (redeem.dz) حاصل على علامة "<span className="group/tt2 relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">مشروع مبتكر<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11.5px] font-sans font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt2:opacity-100 z-50 text-center text-nowrap">Label Projet Innovant</span></span>" من <span className="group/tt relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">الوزارة<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[220px] md:w-max md:max-w-xs px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11px] font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt:opacity-100 z-50 text-center leading-relaxed">وزارة اقتصاد المعرفة والمؤسسات الناشئة والمؤسسات المصغرة</span></span>، وهو ما يعكس جودة الفكرة، وأصالتها، والجهود المبذولة في تطوير منصة حديثة تلبي احتياجات السوق الرقمي في الجزائر.</>
                    ) : (
                      <>The Redeem project (redeem.dz) has been awarded the "<span className="group/tt2 relative inline-block border-b border-white/50 border-dotted pb-0.5 cursor-help">Innovative Project<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 border border-gray-700 shadow-xl text-white text-[11.5px] font-sans font-bold rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover/tt2:opacity-100 z-50 text-center text-nowrap">Label Projet Innovant</span></span>" label, reflecting the quality and authenticity of the idea, as well as the efforts made in developing a modern platform that meets the needs of the Algerian digital market.</>
                    )}
                  </p>

                  {/* Real-time Stats Counter Bar */}
                  <div className="grid grid-cols-2 gap-4 mt-2 md:mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-white/70">
                        <Users size={14} className="md:w-4 md:h-4" />
                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-none">
                          {i18n.language === 'ar' ? 'عميل يثقون بنا' : 'Total Customers'}
                        </span>
                      </div>
                      <div className="text-xl md:text-3xl font-black text-white flex items-center gap-1">
                        <span className="text-red-400">+</span>
                        <AnimatedCounter value={statsData.totalCustomers} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border-s border-white/10 ps-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <ShoppingBag size={14} className="md:w-4 md:h-4" />
                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest leading-none">
                          {i18n.language === 'ar' ? 'طلب تم تنفيذه' : 'Orders Executed'}
                        </span>
                      </div>
                      <div className="text-xl md:text-3xl font-black text-white flex items-center gap-1">
                        <span className="text-green-400">+</span>
                        <AnimatedCounter value={statsData.totalOrders} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-white/20 rounded-full my-1"></div>

                {/* Bottom Half: Mission */}
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl text-white shadow-inner border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className={`text-lg md:text-2xl font-black text-white ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                      {i18n.language === 'ar' ? 'مهمتنا' : 'Our Mission'}
                    </h4>
                  </div>
                  <p className={`text-[11px] md:text-[14px] font-medium leading-relaxed opacity-90 text-justify ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
                    {i18n.language === 'ar'
                      ? 'توفير منتجات رقمية أصلية بسرعة وكفاءة، مع تجربة استخدام بسيطة وآمنة تناسب الجميع. نؤمن أن الثقة تُبنى بالفعل، لذلك نركز على تقديم خدمة مستقرة وشفافة.'
                      : 'To provide authentic digital products swiftly and efficiently, with a simple and secure user experience that suits everyone. We believe that trust is built through actions.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section: Grid on Desktop, Slider on Mobile */}
        <div className="w-full">
          {/* Desktop Grid (Visible only on md screens and up) */}
          <motion.div 
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            variants={containerVariants}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} itemVariants={itemVariants} isRtl={i18n.language === 'ar'} />
            ))}
          </motion.div>

          {/* Mobile Slider (Visible only on small screens) */}
          <div className="md:hidden w-full relative">
             <FeaturesSlider features={features} isRtl={i18n.language === 'ar'} itemVariants={itemVariants} />
          </div>
        </div>

        {/* Reviews Section */}
        {reviewsData.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            {/* Section Header */}
            <div className="flex flex-col items-center gap-2 mb-6 md:mb-8">
              <div className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                {i18n.language === 'ar' ? 'آراء عملائنا' : 'Customer Reviews'}
              </div>
              <h2 className={`text-xl md:text-3xl font-black text-gray-900 text-center ${i18n.language === 'ar' ? 'font-kufi' : 'font-sans'}`}>
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

/* ─── Animated Counter Component ─────────────────────── */
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
  const display = useTransform(spring, (current) => {
    return Math.round(current).toLocaleString();
  });
  
  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
    </span>
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


/* ─── Mobile Features Slider ───────────────────────────── */
const FeaturesSlider = ({ features, isRtl, itemVariants }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple items for infinite feel
  const displayFeatures = useMemo(() => [...features, ...features, ...features], [features]);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    
    const center = container.scrollLeft + container.clientWidth / 2;
    const scrollMax = container.scrollWidth;
    const sliceWidth = scrollMax / 3;

    // Smooth infinite resetting
    if (container.scrollLeft < sliceWidth - container.clientWidth) {
        container.scrollLeft += sliceWidth;
    } else if (container.scrollLeft > sliceWidth * 2) {
        container.scrollLeft -= sliceWidth;
    }

    // Determine active index
    let closestIdx = 0;
    let minDistance = Infinity;
    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }
    });

    if (closestIdx !== activeIndex) setActiveIndex(closestIdx);
  }, [activeIndex]);

  // Initial center position with perfect offset calculation
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const middleItem = container.children[features.length];
        if (middleItem) {
          const offset = middleItem.offsetLeft - (container.clientWidth / 2) + (middleItem.clientWidth / 2);
          container.scrollTo({ left: offset, behavior: 'instant' });
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [features.length]);

  const move = (direction) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cardWidth = container.children[0].clientWidth + 16;
    container.scrollBy({ 
      left: direction === 'next' ? (isRtl ? -cardWidth : cardWidth) : (isRtl ? cardWidth : -cardWidth), 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative w-full py-2">
      {/* Navigation Arrows - Red, Small, No Blur */}
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); move('prev'); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-[150] p-1.5 rounded-full bg-red-600 text-white shadow-lg active:scale-75 transition-all pointer-events-auto mt-1"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); move('next'); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-[150] p-1.5 rounded-full bg-red-600 text-white shadow-lg active:scale-75 transition-all pointer-events-auto mt-1"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-10 snap-x snap-mandatory cursor-default overscroll-x-contain"
      >
        {displayFeatures.map((feature, idx) => (
          <FeatureCard 
            key={`${feature.id}-${idx}`} 
            feature={feature} 
            itemVariants={itemVariants} 
            isRtl={isRtl} 
            isMobile 
            isActive={activeIndex === idx} 
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Single Feature Card ────────────────────────────────── */
const FeatureCard = ({ feature, itemVariants, isRtl, isMobile = false, isActive = false }) => {
  return (
    <motion.div
      variants={!isMobile ? itemVariants : undefined}
      whileHover={!isMobile ? { y: -5, scale: 1.02 } : undefined}
      animate={isMobile ? {
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.6,
        filter: isActive ? 'blur(0px)' : 'blur(1px)'
      } : {}}
      className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl shadow-black/5 p-8 flex flex-col items-center text-center group min-h-[220px] transition-all duration-500
        ${isMobile ? 'snap-center shrink-0 w-[80vw]' : 'w-full'}
      `}
    >
      {/* Large Cropped Background Icon */}
      <div className="absolute -bottom-8 -left-8 opacity-[0.06] text-black group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
        {React.cloneElement(feature.icon, { className: "w-40 h-40" })}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-5 w-full">
        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 shadow-sm border border-gray-100 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {React.cloneElement(feature.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <h3 className={`text-base md:text-xl font-bold text-gray-900 ${isRtl ? 'font-kufi' : ''}`}>
            {feature.title}
          </h3>
          <p className={`text-[11px] md:text-[11.5px] text-gray-600 font-medium leading-relaxed ${isRtl ? 'font-kufi' : ''}`}>
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
