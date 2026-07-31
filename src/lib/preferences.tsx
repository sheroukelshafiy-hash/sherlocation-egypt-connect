import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type Lang = "ar" | "en";

type Prefs = {
  theme: Theme;
  lang: Lang;
  dir: "rtl" | "ltr";
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setEmailNotifications: (v: boolean) => void;
  setWhatsappNotifications: (v: boolean) => void;
  t: (key: keyof typeof DICT.ar) => string;
};

export const DICT = {
  ar: {
    brandTagline: "Find Your Ideal Teacher",
    navHome: "الرئيسية",
    navTeachers: "المدرسون",
    navBecomeTeacher: "كن مدرساً",
    navHowItWorks: "كيف يعمل",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    joinTeacher: "انضم كمدرس",
    settings: "الإعدادات",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",
    language: "اللغة",
    arabic: "العربية",
    english: "English",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    heroBadge: "أكثر من 5,000 مدرس في جميع محافظات مصر",
    heroTitle1: "المدرس المناسب،",
    heroTitle2: "في مكانك وبسعرك.",
    heroSubtitle:
      "شيرلوكيشن منصة تعليمية تربط الطلاب المصريين بأفضل المدرسين الخصوصيين في المنطقة حسب المحافظة، المركز، المادة، والسعر.",
    searchBtn: "ابحث عن المدرس المناسب",
    howItWorksTitle: "كيف يعمل شيرلوكيشن؟",
    howItWorksSubtitle: "ثلاث خطوات بسيطة تفصلك عن مدرسك المثالي.",
    step1Title: "حدّد مكانك ومادتك",
    step1Desc: "اختر المحافظة والمركز والمرحلة الدراسية والمادة والسعر المناسب.",
    step2Title: "قارن بين المدرسين",
    step2Desc: "شاهد التقييمات، أسعار الحصص، وفيديو تعريفي لكل مدرس.",
    step3Title: "تواصل واحجز",
    step3Desc: "راسل المدرس مباشرة عبر واتساب واتفق على أول حصة.",
    accountPrefs: "الحساب والإشعارات",
    emailNotif: "إشعارات البريد الإلكتروني",
    emailNotifDesc: "استقبل تحديثات الحجوزات والعروض على بريدك.",
    waNotif: "إشعارات واتساب",
    waNotifDesc: "تنبيهات فورية عند رد المدرس عليك.",
    settingsTitle: "الإعدادات",
    settingsSubtitle: "تحكّم في المظهر واللغة وتفضيلات الحساب.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم بالكامل",
    haveAccount: "لديك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    close: "إغلاق",
    demoNote: "هذا نموذج تجريبي — لم يتم تفعيل الحسابات بعد.",
    backHome: "العودة للرئيسية",
    govLabel: "المحافظة",
    districtLabel: "المركز / الحي",
    stageLabel: "المرحلة الدراسية",
    subjectLabel: "المادة",
    chooseGov: "اختر المحافظة",
    chooseDistrict: "اختر المركز",
    chooseGovFirst: "اختر المحافظة أولاً",
    allStages: "كل المراحل",
    allGradesOf: "كل صفوف",
    chooseSubject: "اختر المادة",
    sessionPrice: "سعر الحصة",
    upTo: "حتى",
    egp: "ج.م",
    statTeachers: "مدرس معتمد",
    statGovs: "محافظة",
    statSubjects: "مادة دراسية",
    resultsTitle: "نتائج البحث",
    featuredTitle: "مدرسون مميّزون",
    resultsCount: "مدرس متاح الآن حسب معاييرك",
    allVerified: "جميع المدرسين موثّقون",
    noResults: "لا يوجد نتائج مطابقة",
    noResultsHint: "جرّب توسيع نطاق السعر أو تغيير المركز.",
    introVideo: "فيديو تعريفي",
    whatsapp: "واتساب",
    waMessage: "مرحباً، وجدت ملفك على شيرلوكيشن وأود الاستفسار عن حصص",
  },

  en: {
    brandTagline: "Find Your Ideal Teacher",
    navHome: "Home",
    navTeachers: "Teachers",
    navBecomeTeacher: "Become a Teacher",
    navHowItWorks: "How it Works",
    login: "Log In",
    signup: "Sign Up",
    joinTeacher: "Join as Teacher",
    settings: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    arabic: "العربية",
    english: "English",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    heroBadge: "Over 5,000 teachers across all Egyptian governorates",
    heroTitle1: "The right teacher,",
    heroTitle2: "in your area, at your price.",
    heroSubtitle:
      "SherLocation connects Egyptian students with the best local private teachers by governorate, district, subject and price.",
    searchBtn: "Find the right teacher",
    howItWorksTitle: "How does SherLocation work?",
    howItWorksSubtitle: "Three simple steps to your ideal teacher.",
    step1Title: "Set your area & subject",
    step1Desc: "Pick governorate, district, academic stage, subject and price.",
    step2Title: "Compare teachers",
    step2Desc: "See ratings, session prices and an intro video for each teacher.",
    step3Title: "Contact & book",
    step3Desc: "Message the teacher on WhatsApp and book your first session.",
    accountPrefs: "Account & notifications",
    emailNotif: "Email notifications",
    emailNotifDesc: "Get booking updates and offers by email.",
    waNotif: "WhatsApp notifications",
    waNotifDesc: "Instant alerts when a teacher replies.",
    settingsTitle: "Settings",
    settingsSubtitle: "Control appearance, language and account preferences.",
    email: "Email",
    password: "Password",
    fullName: "Full name",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    close: "Close",
    demoNote: "This is a demo form — accounts are not enabled yet.",
    backHome: "Back to home",
  },
} as const;

const PrefsContext = createContext<Prefs | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("ar");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);

  useEffect(() => {
    try {
      const t = localStorage.getItem("sl-theme") as Theme | null;
      const l = localStorage.getItem("sl-lang") as Lang | null;
      if (t === "dark" || t === "light") setThemeState(t);
      if (l === "ar" || l === "en") setLangState(l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("sl-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    try {
      localStorage.setItem("sl-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key: keyof typeof DICT.ar) => DICT[lang][key] ?? DICT.ar[key],
    [lang],
  );

  const value = useMemo<Prefs>(
    () => ({
      theme,
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      emailNotifications,
      whatsappNotifications,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((v) => (v === "dark" ? "light" : "dark")),
      setLang: setLangState,
      toggleLang: () => setLangState((v) => (v === "ar" ? "en" : "ar")),
      setEmailNotifications,
      setWhatsappNotifications,
      t,
    }),
    [theme, lang, emailNotifications, whatsappNotifications, t],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
