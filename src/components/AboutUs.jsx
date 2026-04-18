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
        {/* Header Section - Expanded with Floating Icons */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full max-w-6xl mx-auto"
        >
          {/* Floating Decorative Icons (Left Side) */}
          <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-6">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="p-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-xl ml-6"
            >
              <Award className="w-5 h-5 text-purple-500" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="p-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <Zap className="w-5 h-5 text-yellow-500" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="p-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-xl ml-6"
            >
              <Gamepad2 className="w-5 h-5 text-blue-500" />
            </motion.div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/20">
            <img 
              src="https://redeem-dz.com/wp-content/uploads/2023/07/redeem_special-offerss.jpg" 
              alt="Redeem Store Support" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
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
