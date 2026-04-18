import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, CreditCard, Package, RotateCcw, ShieldCheck, Lock, AlertTriangle, RefreshCw, MessageCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const sections = [
  {
    id: 'intro',
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    color: 'blue',
    ar: { title: 'نبذة عن المتجر', body: 'متجر ريديم للخدمات الرقمية متخصص في بيع الأكواد الرقمية، وشحن الألعاب، وتوفير اشتراكات منصات الترفيه والألعاب مثل Steam، Xbox، وPlayStation، بالإضافة إلى تقديم حلول دفع إلكتروني موثوقة وسريعة.' },
    en: { title: 'About us', body: 'Redeem Digital Services Store is a specialized shop for selling digital codes, game top-ups, and providing subscriptions for entertainment and gaming platforms such as Steam, Xbox, and PlayStation. We also offer reliable and fast electronic payment solutions.' }
  },
  {
    id: 'payment',
    icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    ar: { title: 'طرق الدفع', body: 'نقدم لك خيارات دفع مرنة وآمنة:\n• بالدينار الجزائري (DZD): باستخدام البطاقة الذهبية أو بطاقة CIB عبر منصة OCPay.\n• بالدولار الأمريكي (USD): عبر PayPal.\nيتم إصدار فاتورة رسمية لكل عملية شراء. تأكد من صحة تفاصيل الدفع قبل إتمام الطلب.' },
    en: { title: 'Payment Methods', body: 'We offer flexible and secure payment options:\n• In Algerian Dinar (DZD): Pay using Edahabia card or CIB card through OCPay.\n• In US Dollars (USD): Payments via PayPal.\nAn official invoice is issued for every purchase. Please double-check your payment details before completing your order.' }
  },
  {
    id: 'delivery',
    icon: <Package className="w-5 h-5 text-purple-500" />,
    color: 'purple',
    ar: { title: 'التسليم', body: 'أغلب منتجاتنا رقمية ويتم تسليمها إلكترونيًا بشكل تلقائي بعد تأكيد الدفع، عبر رسالة إلى بريدك الإلكتروني المسجل، وأيضًا داخل حسابك الشخصي في الموقع من خلال صفحة "الطلبات".\nيرجى ملاحظة أن تسليم المنتجات الرقمية عادة يكون فورياً أو خلال ساعات قليلة.' },
    en: { title: 'Delivery', body: 'Most of our products are digital and are delivered automatically after payment confirmation, via an email sent to your registered address, and available in your account under the "Orders" page.\nDigital products are usually delivered instantly or within a few hours.' }
  },
  {
    id: 'refund',
    icon: <RotateCcw className="w-5 h-5 text-red-500" />,
    color: 'red',
    ar: { title: 'سياسة الإرجاع', body: 'جميع المنتجات الرقمية التي نقوم ببيعها غير قابلة للإرجاع أو الاستبدال، وذلك نظرًا لطبيعتها الرقمية حيث يتم تسليمها مباشرة بعد تأكيد الدفع. بمجرد استلامك للمنتج، لا يمكن استرداد المبالغ المدفوعة أو إلغاء العملية.' },
    en: { title: 'Refund Policy', body: 'All digital products sold by us are non-returnable and non-refundable due to their digital nature, as they are delivered immediately after payment confirmation. Once you receive the product, no refunds or cancellations are possible.' }
  },
  {
    id: 'authenticity',
    icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    ar: { title: 'أصالة المنتجات', body: 'نحن نضمن لك أن جميع الأكواد الرقمية التي تم شراؤها من متاجرها الرسمية هي أكواد أصلية 100% وغير مستعملة. يتم الحصول عليها مباشرة من المواقع الرسمية للمنصات المعنية.\nأما بالنسبة للحسابات الرقمية، فقد تم إنشاؤها من قبل فريقنا المختص وتتم متابعتها بشكل دوري لضمان جودتها وسلامتها.' },
    en: { title: 'Product Authenticity', body: 'We guarantee that all digital codes are 100% original and unused, sourced directly from official platforms.\nDigital accounts are created by our specialized team and regularly monitored to ensure quality and safety.' }
  },
  {
    id: 'privacy',
    icon: <Lock className="w-5 h-5 text-pink-500" />,
    color: 'pink',
    ar: { title: 'الخصوصية وحماية البيانات', body: 'نحن نحترم خصوصيتك ونتأكد من حماية معلوماتك الشخصية. تُستخدم بيانات الدفع والمعلومات الشخصية فقط لمعالجة طلبك ولا يتم مشاركتها مع أطراف ثالثة.' },
    en: { title: 'Privacy & Data Protection', body: 'We respect your privacy and ensure that your personal information is protected. Payment details and personal data are used solely for processing your order and are not shared with third parties.' }
  },
  {
    id: 'liability',
    icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    color: 'orange',
    ar: { title: 'حدود المسؤولية', body: 'لا نتحمل المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية ناجمة عن استخدام منتجاتنا أو خدماتنا. في حالة النزاعات، تقتصر مسؤوليتنا على قيمة المنتج المُشترى.' },
    en: { title: 'Limitation of Liability', body: 'We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. In case of disputes, our liability is limited to the value of the purchased item.' }
  },
  {
    id: 'updates',
    icon: <RefreshCw className="w-5 h-5 text-teal-500" />,
    color: 'teal',
    ar: { title: 'تحديثات الشروط', body: 'نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت. سيتم إعلامك بالتغييرات على موقعنا الإلكتروني أو عبر البريد الإلكتروني.' },
    en: { title: 'Terms Updates', body: 'We reserve the right to update these terms and conditions at any time. Changes will be communicated on our website or via email notifications.' }
  }
];

const colorMap = {
  blue: 'bg-blue-50 border-blue-200/60',
  emerald: 'bg-emerald-50 border-emerald-200/60',
  purple: 'bg-purple-50 border-purple-200/60',
  red: 'bg-red-50 border-red-200/60',
  indigo: 'bg-indigo-50 border-indigo-200/60',
  pink: 'bg-pink-50 border-pink-200/60',
  orange: 'bg-orange-50 border-orange-200/60',
  teal: 'bg-teal-50 border-teal-200/60',
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

const TermsOfService = () => {
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 mb-3 shadow-sm">
          <FileText className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-700">
            {isRtl ? 'الشروط والأحكام' : 'Terms of Service'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mx-auto md:whitespace-nowrap">
          {isRtl
            ? 'باستخدام متجر ريديم، فإنك توافق على الشروط والأحكام التالية. يُرجى قراءتها بعناية.'
            : 'By using Redeem Store, you agree to the following terms and conditions. Please read them carefully.'}
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

export default TermsOfService;
