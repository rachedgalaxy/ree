import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      "Welcome to Redeem": "مرحبًا بك في ريديم",
      "digital marketplace": "متجرك الرقمي الأول للمنتجات والألعاب",
      "Explore Products": "استكشف المنتجات",
      "Language": "English",
      "Loading": "جاري التحميل...",
      "All Rights Reserved": "جميع الحقوق محفوظة لصالح متجر ريديم",
      "faq": {
        "title": "الأسئلة الشائعة",
        "subtitle": "نحن في redeem-dz.com نحرص على تقديم تجربة شراء سهلة وآمنة لجميع عملائنا. هنا تجد إجابات لأكثر الأسئلة شيوعاً.",
        "q1": "ما هي طرق الدفع المتاحة؟",
        "a1": "بالدينار الجزائري (DZD): يمكنك الدفع بسهولة باستخدام البطاقة الذهبية أو بطاقة CIB عبر منصة OCPay. بالدولار الأمريكي (USD): يمكنك الدفع عبر PayPal.",
        "q2": "ما هي مدة تسليم الطلب؟",
        "a2": "يتم إرسال تفاصيل بعض المنتجات تلقائيًا على الفور، بينما يتم إرسال البعض الآخر يدويًا خلال وقت قصير. سنرسل لك بريدًا إلكترونيًا فور معالجة طلبك.",
        "q3": "هل يمكنني استرجاع المبلغ بعد الشراء؟",
        "a3": "للأسف، لا يمكن استرجاع الأموال على المنتجات الرقمية مثل الأكواد بعد تسليمها. تأكد من قراءة وصف المنتج جيدًا قبل الشراء.",
        "q4": "هل الأكواد والمنتجات أصلية؟",
        "a4": "نعم، جميع الأكواد التي نبيعها أصلية ومرخصة، ويتم اختبارها قبل الإرسال.",
        "q5": "هل أحصل على فاتورة بعد الشراء؟",
        "a5": "نعم، يتم إرسال فاتورة تلقائيًا إلى بريدك الإلكتروني بعد إتمام الشراء.",
        "q6": "أين أجد الكود بعد إتمام عملية الدفع؟",
        "a6": "ستجد رابط التحميل أو الكود في صفحة 'حسابي' > منتجات رقمية، أو في علبة الوارد ببريدك الإلكتروني المسجل."
      }
    }
  },
  en: {
    translation: {
      "Welcome to Redeem": "Welcome to Redeem",
      "digital marketplace": "Your premier digital marketplace for games and software",
      "Explore Products": "Explore Products",
      "Language": "العربية",
      "Loading": "Loading...",
      "All Rights Reserved": "All Rights Reserved for Redeem Store",
      "faq": {
        "title": "Frequently Asked Questions",
        "subtitle": "At redeem-dz.com, we strive to provide a smooth and secure shopping experience. Here are answers to our most common questions.",
        "q1": "What are the available payment methods?",
        "a1": "In Algerian Dinar (DZD): You can pay using Edahabia or CIB card via OCPay. In US Dollar (USD): You can pay via PayPal.",
        "q2": "How long does delivery take?",
        "a2": "Some products are delivered automatically, while others are processed manually within a short time. You will receive an email as soon as your order is ready.",
        "q3": "Can I get a refund after purchase?",
        "a3": "Unfortunately, refunds are not possible for digital products like codes once they have been delivered. Please read the product description carefully.",
        "q4": "Are the codes and products genuine?",
        "a4": "Yes, all codes we sell are original, licensed, and tested before delivery.",
        "q5": "Do I receive an invoice after purchase?",
        "a5": "Yes, an invoice is automatically sent to your email after completing the purchase.",
        "q6": "Where do I find my code after payment?",
        "a6": "You will find the code or download link in your 'My Account' page under Digital Products, or in your registered email inbox."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
