export const GOVERNORATES: Record<string, string[]> = {
  القاهرة: ["مدينة نصر", "المعادي", "مصر الجديدة", "حلوان", "شبرا"],
  الجيزة: ["الدقي", "المهندسين", "فيصل", "الهرم", "6 أكتوبر"],
  الإسكندرية: ["سموحة", "سيدي جابر", "العجمي", "المنتزه", "محرم بك"],
  الدقهلية: ["المنصورة", "ميت غمر", "طلخا", "دكرنس"],
  الشرقية: ["الزقازيق", "بلبيس", "العاشر من رمضان", "منيا القمح"],
  المنوفية: ["شبين الكوم", "منوف", "قويسنا", "بركة السبع"],
  الغربية: ["طنطا", "المحلة الكبرى", "كفر الزيات", "زفتى"],
  أسيوط: ["أسيوط", "ديروط", "أبنوب", "منفلوط"],
};

export const SUBJECTS = [
  "الرياضيات",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "اللغة الفرنسية",
  "التاريخ",
  "الجغرافيا",
  "الفلسفة",
  "الحاسب الآلي",
];

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  governorate: string;
  district: string;
  rating: number;
  reviews: number;
  price: number;
  experience: number;
  whatsapp: string; // international format without +
  videoUrl: string;
  avatarColor: string; // gradient stops
  bio: string;
};

export const TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: "أ. محمد السيد",
    subject: "الرياضيات",
    governorate: "القاهرة",
    district: "مدينة نصر",
    rating: 4.9,
    reviews: 128,
    price: 180,
    experience: 12,
    whatsapp: "201001234567",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-sky-500 to-teal-500",
    bio: "خبرة 12 عاماً في تدريس الرياضيات للثانوية العامة، أسلوب مبسط وحل مسائل متنوع.",
  },
  {
    id: "t2",
    name: "أ. سارة عبد الرحمن",
    subject: "اللغة الإنجليزية",
    governorate: "الجيزة",
    district: "المهندسين",
    rating: 4.8,
    reviews: 96,
    price: 200,
    experience: 8,
    whatsapp: "201007654321",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-amber-500 to-pink-500",
    bio: "مدرّسة إنجليزي بخبرة دولية، تركز على الجرامر والمحادثة لطلاب الإعدادي والثانوي.",
  },
  {
    id: "t3",
    name: "أ. أحمد فتحي",
    subject: "الفيزياء",
    governorate: "الإسكندرية",
    district: "سموحة",
    rating: 4.7,
    reviews: 74,
    price: 150,
    experience: 10,
    whatsapp: "201112223344",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-violet-500 to-indigo-500",
    bio: "فيزياء ثانوية عامة – شرح المفاهيم بأسلوب عملي مع تدريبات على البوكليت.",
  },
  {
    id: "t4",
    name: "أ. منى حسن",
    subject: "الكيمياء",
    governorate: "الدقهلية",
    district: "المنصورة",
    rating: 4.9,
    reviews: 152,
    price: 120,
    experience: 15,
    whatsapp: "201223334455",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-emerald-500 to-lime-500",
    bio: "مذكرات ملخّصة وطريقة تحفيظ سهلة للمعادلات الكيميائية للثانوية العامة.",
  },
  {
    id: "t5",
    name: "أ. خالد إبراهيم",
    subject: "اللغة العربية",
    governorate: "القاهرة",
    district: "المعادي",
    rating: 4.6,
    reviews: 63,
    price: 100,
    experience: 6,
    whatsapp: "201009998877",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-orange-500 to-red-500",
    bio: "نحو وبلاغة وأدب – تبسيط القاعدة مع تدريبات على أسئلة الامتحانات السابقة.",
  },
  {
    id: "t6",
    name: "أ. رانيا مصطفى",
    subject: "الأحياء",
    governorate: "الجيزة",
    district: "الدقي",
    rating: 4.8,
    reviews: 88,
    price: 170,
    experience: 9,
    whatsapp: "201555667788",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-teal-500 to-cyan-500",
    bio: "أحياء ثانوية عامة – رسوم توضيحية وتلخيص للفصول بأسلوب ممتع.",
  },
];
