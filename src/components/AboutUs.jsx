import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, ShieldCheck, Award } from 'lucide-react';

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
        {/* Header Section - Expanded with 8 Shining Glass Icons */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl"
        >
          {/* Decorative Pattern Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* 8 Floating Icon Circles on the left */}
            {[
              { size: 'w-14 h-14', pos: 'left-[4%] top-[15%]', icon: <ShieldCheck className="w-5 h-5 text-emerald-500/60" />, delay: 0 },
              { size: 'w-16 h-16', pos: 'left-[14%] top-[45%]', icon: <Award className="w-6 h-6 text-purple-500/60" />, delay: 0.5 },
              { size: 'w-12 h-12', pos: 'left-[6%] top-[75%]', icon: <Zap className="w-4 h-4 text-yellow-500/60" />, delay: 1 },
              { size: 'w-15 h-15', pos: 'left-[22%] top-[30%]', icon: <Gamepad2 className="w-5 h-5 text-blue-500/60" />, delay: 1.5 },
              // Duplicate set with different positions
              { size: 'w-11 h-11', pos: 'left-[10%] top-[30%]', icon: <ShieldCheck className="w-4 h-4 text-emerald-500/50" />, delay: 2 },
              { size: 'w-13 h-13', pos: 'left-[20%] top-[65%]', icon: <Award className="w-5 h-5 text-purple-500/50" />, delay: 2.5 },
              { size: 'w-10 h-10', pos: 'left-[30%] top-[45%]', icon: <Zap className="w-3 h-3 text-yellow-500/50" />, delay: 0.8 },
              { size: 'w-12 h-12', pos: 'left-[35%] top-[15%]', icon: <Gamepad2 className="w-4 h-4 text-blue-500/50" />, delay: 1.2 },
            ].map((dot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                  y: [0, i % 2 === 0 ? -20 : 20, 0],
                  x: [0, i % 3 === 0 ? 15 : -15, 0],
                }}
                transition={{ 
                  duration: 5 + (i % 4), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: dot.delay 
                }}
                className={`absolute ${dot.pos} ${dot.size} rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group overflow-hidden`}
              >
                {/* Shining Reflective Effect */}
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full skew-x-12"
                />
                <div className="relative z-10">{dot.icon}</div>
              </motion.div>
            ))}
          </div>

          <div className="shadow-2xl border border-white/20">
            <img 
              src="https://redeem-dz.com/wp-content/uploads/2023/07/redeem_special-offerss.jpg" 
              alt="Redeem Store Support" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
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
              className={`relative overflow-hidden rounded-2xl bg-white/60 dark:bg-[#1a1c23]/60 backdrop-blur-xl border ${feature.border} shadow-lg shadow-black/5 dark:shadow-black/20 p-6 flex flex-col items-center text-center group`}
            >
              {/* Background gradient shine */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed line-clamp-2">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AboutUs;
