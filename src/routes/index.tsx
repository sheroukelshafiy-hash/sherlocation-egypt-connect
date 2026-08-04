import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HowItWorks } from "@/components/HowItWorks";
import { TeacherCard } from "@/components/TeacherCard";
import { usePreferences } from "@/lib/preferences";
import { STAGES, SUBJECTS, TEACHERS, labelFor } from "@/lib/sherlocate-data";
import {
  EGYPT_GOVERNORATES,
  getDistricts,
  governorateLabel,
  type LocalizedName,
} from "@/lib/egypt-locations";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "شيرلوكيشن | ابحث عن مدرسك المثالي في مصر" },
      {
        name: "description",
        content:
          "منصة شيرلوكيشن تربطك بأفضل المدرسين الخصوصيين في محافظتك حسب المادة والسعر المناسب.",
      },
      { property: "og:title", content: "شيرلوكيشن | ابحث عن مدرسك المثالي" },
      {
        property: "og:description",
        content: "ابحث عن مدرسين حسب المحافظة، المركز، المادة، والسعر.",
      },
    ],
  }),
});

const MAX_PRICE = 500;

function Index() {
  const [gov, setGov] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [price, setPrice] = useState<number>(MAX_PRICE);
  const [submitted, setSubmitted] = useState(false);

  const districts = useMemo(() => (gov ? getDistricts(gov) : []), [gov]);

  const results = useMemo(() => {
    return TEACHERS.filter((t) => {
      if (gov && t.governorate !== gov) return false;
      // exact center/district match — never fall back to the governorate
      if (district && t.district !== district) return false;
      if (subject && t.subject !== subject) return false;
      if (grade) {
        // grade value may be a stage name or a specific grade
        const isStage = grade in STAGES;
        if (isStage ? t.stage !== grade : !t.grades.includes(grade))
          return false;
      }
      if (t.price > price) return false;
      return true;
    });
  }, [gov, district, subject, grade, price]);

  const hasFilters =
    Boolean(gov || district || subject || grade) || price !== MAX_PRICE;

  const resetFilters = () => {
    setGov("");
    setDistrict("");
    setSubject("");
    setGrade("");
    setPrice(MAX_PRICE);
    setSubmitted(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    document
      .getElementById("results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero
        gov={gov}
        setGov={(g) => {
          setGov(g);
          // governorate changed -> the previously selected center is invalid
          setDistrict("");
        }}
        district={district}
        setDistrict={setDistrict}
        subject={subject}
        setSubject={setSubject}
        grade={grade}
        setGrade={setGrade}
        price={price}
        setPrice={setPrice}
        districts={districts}
        hasFilters={hasFilters}
        onReset={resetFilters}
        onSubmit={handleSearch}
      />
      <ResultsSection
        results={results}
        submitted={submitted}
        hasFilters={hasFilters}
        onReset={resetFilters}
      />
      <HowItWorks />
      <SiteFooter />
    </div>
  );
}


function ResultsSection({
  results,
  submitted,
  hasFilters,
  onReset,
}: {
  results: typeof TEACHERS;
  submitted: boolean;
  hasFilters: boolean;
  onReset: () => void;
}) {
  const { t } = usePreferences();
  return (
    <section id="results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {submitted ? t("resultsTitle") : t("featuredTitle")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} {t("resultsCount")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary"
            >
              {t("resetFilters")}
            </button>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            {t("allVerified")}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </div>
          <p className="font-bold text-foreground">{t("noResults")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("noResultsHint")}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="mt-5 rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md"
              style={{ background: "var(--gradient-hero)" }}
            >
              {t("resetFilters")}
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      )}
    </section>
  );
}

type HeroProps = {
  gov: string;
  setGov: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  subject: string;
  setSubject: (v: string) => void;
  grade: string;
  setGrade: (v: string) => void;
  price: number;
  setPrice: (v: number) => void;
  districts: LocalizedName[];
  hasFilters: boolean;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

function Hero(props: HeroProps) {
  const {
    gov,
    setGov,
    district,
    setDistrict,
    subject,
    setSubject,
    grade,
    setGrade,
    price,
    setPrice,
    districts,
    hasFilters,
    onReset,
    onSubmit,
  } = props;
  const { t, dir, lang } = usePreferences();




  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-95"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_60%,white_0,transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-slate-900/10 backdrop-blur dark:bg-slate-900/70 dark:text-slate-100 dark:ring-white/15">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            {t("heroBadge")}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {t("heroTitle1")}
            <br className="hidden sm:block" />
            {t("heroTitle2")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-700 dark:text-slate-200 sm:text-lg">
            {t("heroSubtitle")}
          </p>
        </div>


        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/40 bg-card/95 p-5 shadow-2xl backdrop-blur dark:border-white/10 sm:p-7"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField label={t("govLabel")} icon={<PinIcon />}>
              <select
                value={gov}
                onChange={(e) => setGov(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">{t("chooseGov")}</option>
                {EGYPT_GOVERNORATES.map((g) => (
                  <option key={g.ar} value={g.ar}>
                    {governorateLabel(g.ar, lang)}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label={t("districtLabel")} icon={<CompassIcon />}>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!gov}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
              >
                <option value="">
                  {gov ? t("chooseDistrict") : t("chooseGovFirst")}
                </option>
                {districts.map((d) => (
                  <option key={d.ar} value={d.ar}>
                    {lang === "en" ? d.en : d.ar}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label={t("stageLabel")} icon={<CapIcon />}>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">{t("allStages")}</option>
                {Object.entries(STAGES).map(([stage, grades]) => (
                  <optgroup key={stage} label={labelFor(stage, lang)}>
                    <option value={stage}>
                      {t("allGradesOf")} {labelFor(stage, lang)}
                    </option>
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {labelFor(g, lang)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </FilterField>

            <FilterField label={t("subjectLabel")} icon={<BookIcon />}>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">{t("chooseSubject")}</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {labelFor(s, lang)}
                  </option>
                ))}
              </select>
            </FilterField>

          </div>

          <div className="mt-5 rounded-2xl bg-secondary/60 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-secondary-foreground">
                <span className="shrink-0 text-primary">
                  <CoinIcon />
                </span>
                <span className="truncate">{t("sessionPrice")}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary">
                <span>{t("upTo")}</span>
                <span className="rounded-lg bg-primary px-3 py-1 text-primary-foreground tabular-nums">
                  {price} {t("egp")}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-background accent-[color:var(--primary)]"
              style={{
                background: `linear-gradient(to ${dir === "rtl" ? "left" : "right"}, var(--primary) 0%, var(--primary-glow) ${
                  ((price - 50) / 450) * 100
                }%, var(--muted) ${((price - 50) / 450) * 100}%, var(--muted) 100%)`,
              }}
              aria-label={t("sessionPrice")}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground tabular-nums">
              <span>50 {t("egp")}</span>
              <span>500 {t("egp")}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.01]"
            style={{ background: "var(--gradient-hero)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {t("searchBtn")}
          </button>
        </form>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-4 text-center">
          {[
            { n: "+5,000", l: t("statTeachers") },
            { n: "27", l: t("statGovs") },
            { n: "+40", l: t("statSubjects") },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/10 backdrop-blur dark:bg-white/10 dark:ring-white/20"
            >
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                {s.n}
              </div>
              <div className="mt-1 text-xs text-slate-700 dark:text-slate-200 sm:text-sm">
                {s.l}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function FilterField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}
function CoinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9.5c0-1 1-2 3-2s3 .8 3 2-1 1.7-3 2-3 1-3 2 1 2 3 2 3-1 3-2" />
    </svg>
  );
}
function CapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M22 10 12 4 2 10l10 6 10-6Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  );
}
