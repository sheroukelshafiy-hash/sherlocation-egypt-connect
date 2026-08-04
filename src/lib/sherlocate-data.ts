import {
  GOVERNORATES_AR,
  EGYPT_GOVERNORATES,
  getDistricts,
} from "@/lib/egypt-locations";

/**
 * Location data lives in one structured source: src/lib/egypt-locations.ts
 * (governorate -> centers/districts, with Arabic + English names).
 */
export { EGYPT_GOVERNORATES, getDistricts };
export const GOVERNORATES: Record<string, string[]> = GOVERNORATES_AR;


export const SUBJECTS = [
  "الرياضيات",
  "العلوم",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "اللغة الفرنسية",
  "الدراسات الاجتماعية",
  "التاريخ",
  "الجغرافيا",
  "الفلسفة",
  "الحاسب الآلي",
];

// Academic stages and their grades (Egyptian system)
export const STAGES: Record<string, string[]> = {
  "المرحلة الابتدائية": [
    "الصف الأول الابتدائي",
    "الصف الثاني الابتدائي",
    "الصف الثالث الابتدائي",
    "الصف الرابع الابتدائي",
    "الصف الخامس الابتدائي",
    "الصف السادس الابتدائي",
  ],
  "المرحلة الإعدادية": [
    "الصف الأول الإعدادي",
    "الصف الثاني الإعدادي",
    "الصف الثالث الإعدادي",
  ],
  "المرحلة الثانوية": [
    "الصف الأول الثانوي",
    "الصف الثاني الثانوي",
    "الصف الثالث الثانوي",
  ],
};

export type Stage = keyof typeof STAGES;

/** English labels — Arabic strings stay the canonical stored values. */
const EN_LABELS: Record<string, string> = {
  // subjects
  الرياضيات: "Mathematics",
  العلوم: "Science",
  الفيزياء: "Physics",
  الكيمياء: "Chemistry",
  الأحياء: "Biology",
  "اللغة العربية": "Arabic",
  "اللغة الإنجليزية": "English",
  "اللغة الفرنسية": "French",
  "الدراسات الاجتماعية": "Social Studies",
  التاريخ: "History",
  الجغرافيا: "Geography",
  الفلسفة: "Philosophy",
  "الحاسب الآلي": "Computer Science",
  // stages
  "المرحلة الابتدائية": "Primary stage",
  "المرحلة الإعدادية": "Preparatory stage",
  "المرحلة الثانوية": "Secondary stage",
  // grades
  "الصف الأول الابتدائي": "Primary 1",
  "الصف الثاني الابتدائي": "Primary 2",
  "الصف الثالث الابتدائي": "Primary 3",
  "الصف الرابع الابتدائي": "Primary 4",
  "الصف الخامس الابتدائي": "Primary 5",
  "الصف السادس الابتدائي": "Primary 6",
  "الصف الأول الإعدادي": "Prep 1",
  "الصف الثاني الإعدادي": "Prep 2",
  "الصف الثالث الإعدادي": "Prep 3",
  "الصف الأول الثانوي": "Secondary 1",
  "الصف الثاني الثانوي": "Secondary 2",
  "الصف الثالث الثانوي": "Secondary 3",
};

/** Localize a subject / stage / grade value stored in Arabic. */
export function labelFor(value: string, lang: "ar" | "en"): string {
  if (lang === "ar") return value;
  return EN_LABELS[value] ?? value;
}


export type Teacher = {
  id: string;
  name: string;
  subject: string;
  stage: string;
  grades: string[];
  governorate: string;
  district: string;
  rating: number;
  reviews: number;
  price: number;
  experience: number;
  whatsapp: string;
  videoUrl: string;
  avatarColor: string;
  bio: string;
};

export const TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: "أ. محمد السيد",
    subject: "الرياضيات",
    stage: "المرحلة الثانوية",
    grades: ["الصف الثاني الثانوي", "الصف الثالث الثانوي"],
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
    stage: "المرحلة الإعدادية",
    grades: [
      "الصف الأول الإعدادي",
      "الصف الثاني الإعدادي",
      "الصف الثالث الإعدادي",
    ],
    governorate: "الجيزة",
    district: "المهندسين",
    rating: 4.8,
    reviews: 96,
    price: 200,
    experience: 8,
    whatsapp: "201007654321",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-amber-500 to-pink-500",
    bio: "مدرّسة إنجليزي بخبرة دولية، تركز على الجرامر والمحادثة لطلاب الإعدادي.",
  },
  {
    id: "t3",
    name: "أ. أحمد فتحي",
    subject: "الفيزياء",
    stage: "المرحلة الثانوية",
    grades: ["الصف الثالث الثانوي"],
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
    subject: "العلوم",
    stage: "المرحلة الابتدائية",
    grades: [
      "الصف الرابع الابتدائي",
      "الصف الخامس الابتدائي",
      "الصف السادس الابتدائي",
    ],
    governorate: "الدقهلية",
    district: "المنصورة",
    rating: 4.9,
    reviews: 152,
    price: 90,
    experience: 15,
    whatsapp: "201223334455",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-emerald-500 to-lime-500",
    bio: "علوم للمرحلة الابتدائية بأسلوب تفاعلي مع تجارب عملية بسيطة تناسب الأطفال.",
  },
  {
    id: "t5",
    name: "أ. خالد إبراهيم",
    subject: "اللغة العربية",
    stage: "المرحلة الابتدائية",
    grades: [
      "الصف الأول الابتدائي",
      "الصف الثاني الابتدائي",
      "الصف الثالث الابتدائي",
    ],
    governorate: "القاهرة",
    district: "المعادي",
    rating: 4.6,
    reviews: 63,
    price: 80,
    experience: 6,
    whatsapp: "201009998877",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-orange-500 to-red-500",
    bio: "تأسيس قراءة وكتابة لأطفال الابتدائي بطريقة ممتعة وممنهجة.",
  },
  {
    id: "t6",
    name: "أ. رانيا مصطفى",
    subject: "الأحياء",
    stage: "المرحلة الثانوية",
    grades: ["الصف الثاني الثانوي", "الصف الثالث الثانوي"],
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
  {
    id: "t7",
    name: "أ. هاني عبد الله",
    subject: "الرياضيات",
    stage: "المرحلة الإعدادية",
    grades: ["الصف الثاني الإعدادي", "الصف الثالث الإعدادي"],
    governorate: "الشرقية",
    district: "الزقازيق",
    rating: 4.7,
    reviews: 54,
    price: 110,
    experience: 7,
    whatsapp: "201118889900",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-fuchsia-500 to-rose-500",
    bio: "جبر وهندسة للإعدادية – حل مئات المسائل والتدرّج من السهل للصعب.",
  },
  {
    id: "t8",
    name: "أ. ياسمين علي",
    subject: "الدراسات الاجتماعية",
    stage: "المرحلة الابتدائية",
    grades: ["الصف الخامس الابتدائي", "الصف السادس الابتدائي"],
    governorate: "الغربية",
    district: "طنطا",
    rating: 4.5,
    reviews: 42,
    price: 70,
    experience: 5,
    whatsapp: "201004445566",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatarColor: "from-indigo-500 to-blue-500",
    bio: "دراسات اجتماعية للابتدائي بخرائط ملوّنة وقصص تاريخية قريبة من الأطفال.",
  },
];
