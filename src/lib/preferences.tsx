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
  bookingNotifications: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setEmailNotifications: (v: boolean) => void;
  setWhatsappNotifications: (v: boolean) => void;
  setBookingNotifications: (v: boolean) => void;
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
    demoNote: "هذا نموذج تجريبي — الحسابات تعمل محلياً على جهازك للتجربة.",
    invalidEmail: "من فضلك أدخل بريداً إلكترونياً صحيحاً.",
    invalidName: "من فضلك أدخل اسمك.",
    invalidPassword: "كلمة المرور يجب ألا تقل عن 6 أحرف.",
    logout: "تسجيل الخروج",
    welcomeBack: "أهلاً",
    account: "حسابي",
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
    noResults: "لا يوجد مدرسون مطابقون لهذه الاختيارات حاليًا",
    noResultsHint: "جرّب توسيع نطاق السعر أو تغيير المركز.",
    resetFilters: "إعادة ضبط الفلاتر",

    introVideo: "فيديو تعريفي",
    whatsapp: "واتساب",
    waMessage: "مرحباً، وجدت ملفك على شيرلوكيشن وأود الاستفسار عن حصص",
    roleStudent: "طالب / ولي أمر",
    roleTeacher: "مدرس",
    chooseRoleHint: "حدد نوع الحساب ثم أدخل البيانات بدقة",
    badCredentials: "البريد الإلكتروني أو كلمة السر غير صحيحة، أو نوع الحساب غير مطابق.",
    accountCreated: "تم إنشاء حسابك بنجاح، أهلاً",
    demoCredsTitle: "بيانات تجريبية للاختبار:",
    loggedOut: "تم تسجيل الخروج",
    bookLesson: "حجز درس",
    confirmBookingTitle: "تأكيد حجز الدرس",
    confirmBookingQ: "هل ترغب في تأكيد حجز الدرس مع",
    confirm: "تأكيد الحجز",
    cancel: "إلغاء",
    bookingSent: "تم إرسال طلب حجز الدرس بنجاح مع",
    loginToBook: "برجاء تسجيل الدخول أولاً لتتمكن من حجز الدرس",
    navAbout: "عن النظام",
    aboutTitle: "بنية نظام شيرلوكيشن",
    aboutVersion: "الإصدار v4.0.2 (إنتاج مستقر)",
    aboutIntro:
      "منظومة تقنية متكاملة تربط الطلاب بالمدرسين عبر محرك بحث جغرافي يعتمد على التقسيم الإداري لمحافظات ومراكز مصر.",
    aboutStack: "المكدس البرمجي",
    aboutFrontend: "واجهة المستخدم",
    aboutFrontendDesc:
      "React 19 وTypeScript وTailwind CSS لواجهة سريعة ومتجاوبة بالكامل مع دعم RTL.",
    aboutData: "البيانات والربط",
    aboutDataDesc:
      "خرائط بيانات هرمية تربط المحافظات بالمراكز والمراحل التعليمية بالصفوف الدراسية.",
    aboutSecurity: "الأمان والجودة",
    aboutSecurityDesc:
      "تحقق صارم من المدخلات، فصل أدوار الطالب والمدرس، وحالة جلسة محفوظة محلياً للتجربة.",
    aboutChangelog: "سجل التحديثات",

    authLoginTitle: "تسجيل الدخول",
    authLoginSubtitle: "أهلاً بعودتك إلى شيرلوكيشن. سجّل دخولك لمتابعة رحلتك التعليمية.",
    authSignupTitle: "إنشاء حساب",
    authSignupSubtitle: "أنشئ حسابك في دقيقة وابدأ في البحث عن مدرسك المثالي.",
    confirmPassword: "تأكيد كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    accountType: "نوع الحساب",
    roleGuardian: "ولي أمر",
    roleStudentOnly: "طالب",
    signingIn: "جاري تسجيل الدخول...",
    creatingAccount: "جاري إنشاء الحساب...",
    sending: "جاري الإرسال...",
    saving: "جاري الحفظ...",
    forgotTitle: "استعادة كلمة المرور",
    forgotSubtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
    sendResetLink: "إرسال رابط الاستعادة",
    backToLogin: "العودة لتسجيل الدخول",
    resetSentTitle: "تحقق من بريدك الإلكتروني",
    resetSentDesc: "إذا كان هذا البريد مسجلاً لدينا فستصلك رسالة بها رابط إعادة تعيين كلمة المرور.",
    resetTitle: "تعيين كلمة مرور جديدة",
    resetSubtitle: "اختر كلمة مرور قوية جديدة لحسابك.",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
    updatePassword: "تحديث كلمة المرور",
    passwordUpdated: "تم تحديث كلمة المرور بنجاح.",
    resetLinkInvalid: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية. اطلب رابطاً جديداً.",
    checkEmailTitle: "فعّل حسابك",
    checkEmailDesc: "أرسلنا رسالة تفعيل إلى بريدك الإلكتروني. افتح الرابط لتأكيد حسابك ثم سجّل الدخول.",
    errRequired: "هذا الحقل مطلوب.",
    errEmail: "من فضلك أدخل بريداً إلكترونياً صحيحاً.",
    errPasswordShort: "كلمة المرور يجب ألا تقل عن 8 أحرف وتحتوي على حرف ورقم.",
    errPasswordMatch: "كلمتا المرور غير متطابقتين.",
    errInvalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    errEmailTaken: "هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول.",
    errNetwork: "تعذّر الاتصال بالخادم. تحقق من الإنترنت وحاول مجدداً.",
    errEmailNotConfirmed: "لم يتم تفعيل بريدك الإلكتروني بعد. افتح رابط التفعيل في بريدك.",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    dashboard: "لوحة التحكم",
    studentDashboard: "لوحة الطالب",
    teacherDashboard: "لوحة المدرس",
    dashboardStudentDesc: "تابع بحثك عن المدرسين وحجوزاتك من مكان واحد.",
    dashboardTeacherDesc: "أدر حصصك وملفك التعليمي وتابع طلبات الطلاب.",
    myClasses: "حصصي",
    browseTeachers: "تصفّح المدرسين",
    accountInfo: "بيانات الحساب",
    roleLabel: "الدور",
    loadingText: "جاري التحميل...",
    notAuthorizedTitle: "غير مصرح بالدخول",
    notAuthorizedDesc: "هذه الصفحة متاحة لنوع حساب آخر.",
    goToMyDashboard: "الذهاب إلى لوحتي",
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
    demoNote: "Demo mode — accounts are stored locally on your device for testing.",
    invalidEmail: "Please enter a valid email address.",
    invalidName: "Please enter your name.",
    invalidPassword: "Password must be at least 6 characters.",
    logout: "Log out",
    welcomeBack: "Hi",
    account: "My account",
    backHome: "Back to home",
    govLabel: "Governorate",
    districtLabel: "District / Area",
    stageLabel: "Academic stage",
    subjectLabel: "Subject",
    chooseGov: "Select governorate",
    chooseDistrict: "Select district",
    chooseGovFirst: "Select a governorate first",
    allStages: "All stages",
    allGradesOf: "All grades of",
    chooseSubject: "Select subject",
    sessionPrice: "Session price",
    upTo: "Up to",
    egp: "EGP",
    statTeachers: "verified teachers",
    statGovs: "governorates",
    statSubjects: "subjects",
    resultsTitle: "Search results",
    featuredTitle: "Featured teachers",
    resultsCount: "teachers available matching your criteria",
    allVerified: "All teachers are verified",
    noResults: "No teachers match these filters right now",
    noResultsHint: "Try widening the price range or changing the district.",
    resetFilters: "Reset filters",

    introVideo: "Intro video",
    whatsapp: "WhatsApp",
    waMessage:
      "Hello, I found your profile on SherLocation and would like to ask about your classes in",
    roleStudent: "Student / Parent",
    roleTeacher: "Teacher",
    chooseRoleHint: "Pick your account type, then enter your details.",
    badCredentials: "Wrong email or password, or the account type doesn't match.",
    accountCreated: "Account created successfully, welcome",
    demoCredsTitle: "Demo credentials for testing:",
    loggedOut: "Signed out",
    bookLesson: "Book a lesson",
    confirmBookingTitle: "Confirm lesson booking",
    confirmBookingQ: "Do you want to confirm a lesson with",
    confirm: "Confirm booking",
    cancel: "Cancel",
    bookingSent: "Booking request sent successfully to",
    loginToBook: "Please log in first to book a lesson",
    navAbout: "About",
    aboutTitle: "SherLocation system architecture",
    aboutVersion: "Version v4.0.2 (production stable)",
    aboutIntro:
      "An integrated platform connecting students with teachers through a geographic search engine built on Egypt's governorate and district structure.",
    aboutStack: "Technology stack",
    aboutFrontend: "Frontend tier",
    aboutFrontendDesc:
      "React 19, TypeScript and Tailwind CSS for a fast, fully responsive UI with RTL support.",
    aboutData: "Data & mapping",
    aboutDataDesc:
      "Hierarchical data maps binding governorates to districts and stages to school grades.",
    aboutSecurity: "Security & quality",
    aboutSecurityDesc:
      "Strict input validation, student/teacher role separation, and a locally stored demo session.",
    aboutChangelog: "Release changelog",

    authLoginTitle: "Log in",
    authLoginSubtitle: "Welcome back to SherLocation. Sign in to continue your learning journey.",
    authSignupTitle: "Create account",
    authSignupSubtitle: "Create your account in a minute and start finding your ideal teacher.",
    confirmPassword: "Confirm password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot your password?",
    accountType: "Account type",
    roleGuardian: "Guardian",
    roleStudentOnly: "Student",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    sending: "Sending...",
    saving: "Saving...",
    forgotTitle: "Reset your password",
    forgotSubtitle: "Enter your email and we'll send you a link to reset your password.",
    sendResetLink: "Send reset link",
    backToLogin: "Back to log in",
    resetSentTitle: "Check your email",
    resetSentDesc: "If that email is registered, you'll receive a password reset link shortly.",
    resetTitle: "Set a new password",
    resetSubtitle: "Choose a strong new password for your account.",
    newPassword: "New password",
    confirmNewPassword: "Confirm new password",
    updatePassword: "Update password",
    passwordUpdated: "Your password has been updated.",
    resetLinkInvalid: "This reset link is invalid or has expired. Request a new one.",
    checkEmailTitle: "Confirm your account",
    checkEmailDesc: "We sent a confirmation link to your email. Open it to activate your account, then log in.",
    errRequired: "This field is required.",
    errEmail: "Please enter a valid email address.",
    errPasswordShort: "Password must be at least 8 characters and include a letter and a number.",
    errPasswordMatch: "Passwords do not match.",
    errInvalidCredentials: "Incorrect email or password.",
    errEmailTaken: "This email is already registered. Try logging in instead.",
    errNetwork: "Could not reach the server. Check your connection and try again.",
    errEmailNotConfirmed: "Your email isn't confirmed yet. Open the confirmation link we sent you.",
    loginSuccess: "Signed in successfully",
    dashboard: "Dashboard",
    studentDashboard: "Student dashboard",
    teacherDashboard: "Teacher dashboard",
    dashboardStudentDesc: "Track your teacher search and bookings in one place.",
    dashboardTeacherDesc: "Manage your classes, profile and incoming student requests.",
    myClasses: "My classes",
    browseTeachers: "Browse teachers",
    accountInfo: "Account details",
    roleLabel: "Role",
    loadingText: "Loading...",
    notAuthorizedTitle: "Access not allowed",
    notAuthorizedDesc: "This page is available to a different account type.",
    goToMyDashboard: "Go to my dashboard",
  },

} as const;

const PrefsContext = createContext<Prefs | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("ar");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem("sl-theme") as Theme | null;
      const l = localStorage.getItem("sl-lang") as Lang | null;
      if (t === "dark" || t === "light") setThemeState(t);
      if (l === "ar" || l === "en") setLangState(l);
      const readBool = (k: string) => localStorage.getItem(k);
      const e = readBool("sl-notif-email");
      const w = readBool("sl-notif-wa");
      const b = readBool("sl-notif-booking");
      if (e !== null) setEmailNotifications(e === "1");
      if (w !== null) setWhatsappNotifications(w === "1");
      if (b !== null) setBookingNotifications(b === "1");
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("sl-notif-email", emailNotifications ? "1" : "0");
      localStorage.setItem("sl-notif-wa", whatsappNotifications ? "1" : "0");
      localStorage.setItem("sl-notif-booking", bookingNotifications ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [hydrated, emailNotifications, whatsappNotifications, bookingNotifications]);

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
      bookingNotifications,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((v) => (v === "dark" ? "light" : "dark")),
      setLang: setLangState,
      toggleLang: () => setLangState((v) => (v === "ar" ? "en" : "ar")),
      setEmailNotifications,
      setWhatsappNotifications,
      setBookingNotifications,
      t,
    }),
    [theme, lang, emailNotifications, whatsappNotifications, bookingNotifications, t],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
