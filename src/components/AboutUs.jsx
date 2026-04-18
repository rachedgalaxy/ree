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
                  <p className="text-[11px] md:text-[12px] text-gray-600 font-medium leading-relaxed line-clamp-2 px-2">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AboutUs;
