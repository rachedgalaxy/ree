import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, Database, Eye, Share2, Cookie, Lock, UserCheck, RefreshCw, MessageCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const sections = [
  {
    id: 'collect',
    icon: <Database className="w-5 h-5 text-blue-500" />,
    color: 'blue',
    ar: { title: 'البيانات التي نجمعها', body: 'قد نقوم بجمع ومعالجة البيانات الشخصية التالية:\n• الاسم وعنوان البريد الإلكتروني عند إنشاء حساب أو تسجيل الدخول عبر Google OAuth.\n• تفاصيل الطلبات، بما في ذلك المنتجات المشتراة وسجل المعاملات.\n• عنوان الـ IP، نوع المتصفح، ومعلومات الجهاز لأغراض الأمان والتحليلات.' },
    en: { title: 'Data We Collect', body: 'We may collect and process the following personal data:\n• Name and email address when you create an account or log in via Google OAuth.\n• Order details, including purchases and transaction history.\n• IP address, browser type, and device information for security and analytics.' }
  },
  {
    id: 'use',
    icon: <Eye className="w-5 h-5 text-purple-500" />,
    color: 'purple',
    ar: { title: 'كيف نستخدم بياناتك', body: 'نستخدم بياناتك فقط للأغراض التالية:\n• تمكين عملية تسجيل دخول آمنة والوصول إلى لوحة التحكم الخاصة بك.\n• معالجة الطلبات وتسليم المنتجات الرقمية.\n• إرسال تأكيدات الطلبات والإشعارات والدعم الفني.\n• تحليل أداء الموقع وتحسين تجربة المستخدم.' },
    en: { title: 'How We Use Your Data', body: 'Your data is used strictly for:\n• Enabling secure login and access to your account dashboard.\n• Processing orders and delivering digital products.\n• Sending order confirmations, updates, and support.\n• Analyzing performance and improving user experience.' }
  },
  {
    id: 'share',
    icon: <Share2 className="w-5 h-5 text-orange-500" />,
    color: 'orange',
    ar: { title: 'مشاركة البيانات مع الأطراف الثالثة', body: 'نحن لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث. يتم مشاركة معلوماتك فقط في الحالات التالية:\n• مع بوابات الدفع الموثوقة لإتمام المعاملات.\n• مع الجهات القانونية المختصة إذا طُلب منا ذلك بموجب القانون.' },
    en: { title: 'Sharing with Third Parties', body: 'We do not sell or rent your personal data. Your information may be shared only with:\n• Trusted payment processors to facilitate transactions.\n• Legal authorities when required by applicable laws or regulations.' }
  },
  {
    id: 'cookies',
    icon: <Cookie className="w-5 h-5 text-yellow-500" />,
    color: 'yellow',
    ar: { title: 'ملفات تعريف الارتباط (Cookies)', body: 'يستخدم موقعنا ملفات تعريف الارتباط من أجل:\n• تحسين تجربة التصفح.\n• تذكر جلسة تسجيل الدخول الخاصة بك.\n• جمع بيانات تحليلية مجهولة لتحسين الموقع والخدمات.\nيمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.' },
    en: { title: 'Cookies', body: 'Our website uses cookies to:\n• Enhance navigation and user experience.\n• Maintain active login sessions.\n• Collect anonymized analytics data for service improvement.\nYou can manage your cookie preferences through your browser settings.' }
  },
  {
    id: 'security',
    icon: <Lock className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    ar: { title: 'أمان البيانات', body: 'نطبق أفضل الممارسات والمعايير الأمنية لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الحذف، بما في ذلك استخدام التشفير وضوابط الوصول.' },
    en: { title: 'Data Security', body: 'We apply industry-standard security practices, including encryption and access controls, to protect your personal data from unauthorized access, alteration, or deletion.' }
  },
  {
    id: 'rights',
    icon: <UserCheck className="w-5 h-5 text-pink-500" />,
    color: 'pink',
    ar: { title: 'حقوقك', body: 'لديك الحق في:\n• الوصول إلى معلوماتك الشخصية وتحديثها.\n• طلب حذف حسابك وجميع بياناتك المرتبطة.\n• إلغاء الاشتراك في الرسائل التسويقية في أي وقت.\nلممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر contact@redeem-dz.com' },
    en: { title: 'Your Rights', body: 'You have the right to:\n• Access and update your personal information.\n• Request deletion of your account and associated data.\n• Opt out of marketing communications at any time.\nContact us at contact@redeem-dz.com to exercise these rights.' }
  },
  {
    id: 'updates',
    icon: <RefreshCw className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    ar: { title: 'تحديثات السياسة', body: 'قد نقوم بتحديث هذه السياسة من وقت لآخر بما يتماشى مع التغييرات القانونية أو التشغيلية. سيتم نشر أي تحديثات على هذه الصفحة مع ذكر تاريخ آخر تعديل.\nآخر تحديث: 25 ماي 2025' },
    en: { title: 'Policy Updates', body: 'This Privacy Policy may be updated periodically to reflect changes in our practices or legal obligations. Updates will be posted on this page with the effective date.\nLast updated: May 25, 2025' }
  }
];

const colorMap = {
  blue: 'bg-blue-50 border-blue-200/60',
  purple: 'bg-purple-50 border-purple-200/60',
  orange: 'bg-orange-50 border-orange-200/60',
  yellow: 'bg-yellow-50 border-yellow-200/60',
  emerald: 'bg-emerald-50 border-emerald-200/60',
  pink: 'bg-pink-50 border-pink-200/60',
  indigo: 'bg-indigo-50 border-indigo-200/60',
};

const AccordionItem = ({ section, isOpen, onToggle, lang }) => {
  const data = lang === 'ar' ? section.ar : section.en;
  return (
    <motion.div
      layout
      className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${colorMap[section.color]} shadow-sm`}
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-start"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/70 shadow-sm">{section.icon}</div>
          <span className="text-sm font-bold text-gray-800">{data.title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 pt-0">
              <div className="h-px bg-gray-200/60 mb-3" />
              {data.body.split('\n').map((line, i) => (
                <p key={i} className={`text-xs text-gray-600 leading-relaxed ${line.startsWith('•') ? 'ms-2 mt-1' : 'mt-1'}`}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isRtl = lang === 'ar';
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 mt-[72px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 mb-3 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold text-purple-700">
            {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </span>
        </div>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          {isRtl
            ? 'في ريديم، نولي خصوصيتك أهمية قصوى ونلتزم بحماية معلوماتك الشخصية.'
            : 'At Redeem, we are committed to protecting your privacy and personal information.'}
        </p>
      </motion.div>

      {/* Accordion */}
      <motion.div
        className="flex flex-col gap-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {sections.map((sec) => (
          <motion.div
            key={sec.id}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            <AccordionItem
              section={sec}
              isOpen={openId === sec.id}
              onToggle={() => toggle(sec.id)}
              lang={lang}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-2xl bg-gray-900 p-5 flex items-center justify-between gap-4 shadow-xl"
      >
        <div>
          <p className="text-white font-bold text-sm">{isRtl ? 'هل تحتاج مساعدة؟' : 'Still need help?'}</p>
          <p className="text-gray-400 text-xs mt-0.5">{isRtl ? 'فريق الدعم متاح 24/7' : 'Our support team is here 24/7.'}</p>
        </div>
        <a
          href="https://api.whatsapp.com/send/?phone=213562033668&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1dbf59] text-white text-xs font-bold shadow-lg transition-all shrink-0"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
          {isRtl ? 'تواصل معنا' : 'Chat with us'}
        </a>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
