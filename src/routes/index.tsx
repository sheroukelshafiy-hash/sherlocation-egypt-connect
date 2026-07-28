import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { TeacherCard } from "@/components/TeacherCard";
import { GOVERNORATES, STAGES, SUBJECTS, TEACHERS } from "@/lib/sherlocate-data";

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

function Index() {
  const [gov, setGov] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [price, setPrice] = useState<number>(250);
  const [submitted, setSubmitted] = useState(false);

  const districts = useMemo(
    () => (gov ? GOVERNORATES[gov] ?? [] : []),
    [gov],
  );

  const results = useMemo(() => {
    return TEACHERS.filter((t) => {
      if (gov && t.governorate !== gov) return false;
      if (district && t.district !== district) return false;
      if (subject && t.subject !== subject) return false;
      if (t.price > price) return false;
      return true;
    });
  }, [gov, district, subject, price]);

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
          setDistrict("");
        }}
        district={district}
        setDistrict={setDistrict}
        subject={subject}
        setSubject={setSubject}
        price={price}
        setPrice={setPrice}
        districts={districts}
        onSubmit={handleSearch}
      />
      <ResultsSection results={results} submitted={submitted} />
    </div>
  );
}

function ResultsSection({
  results,
  submitted,
}: {
  results: typeof TEACHERS;
  submitted: boolean;
}) {
  return (
    <section id="results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {submitted ? "نتائج البحث" : "مدرسون مميّزون"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} مدرس متاح الآن حسب معاييرك
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          جميع المدرسين موثّقون
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </div>
          <p className="font-bold text-foreground">لا يوجد نتائج مطابقة</p>
          <p className="mt-1 text-sm text-muted-foreground">
            جرّب توسيع نطاق السعر أو تغيير المركز.
          </p>
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
  price: number;
  setPrice: (v: number) => void;
  districts: string[];
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
    price,
    setPrice,
    districts,
    onSubmit,
  } = props;

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-95"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_60%,white_0,transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/30 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            أكثر من 5,000 مدرس في جميع محافظات مصر
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            المدرس المناسب،
            <br className="hidden sm:block" />
            في مكانك وبسعرك.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/90 sm:text-lg">
            شيرلوكيشن منصة تعليمية تربط الطلاب المصريين بأفضل المدرسين الخصوصيين
            في المنطقة حسب المحافظة، المركز، المادة، والسعر.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-5xl rounded-3xl border border-white/40 bg-card/95 p-5 shadow-2xl backdrop-blur sm:p-7"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterField label="المحافظة" icon={<PinIcon />}>
              <select
                value={gov}
                onChange={(e) => setGov(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">اختر المحافظة</option>
                {Object.keys(GOVERNORATES).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label="المركز / الحي" icon={<CompassIcon />}>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!gov}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
              >
                <option value="">
                  {gov ? "اختر المركز" : "اختر المحافظة أولاً"}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label="المادة" icon={<BookIcon />}>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">اختر المادة</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>

          <div className="mt-5 rounded-2xl bg-secondary/60 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary-foreground">
                <CoinIcon />
                سعر الحصة
              </div>
              <div className="text-sm font-bold text-primary">
                حتى{" "}
                <span className="rounded-lg bg-primary px-3 py-1 text-primary-foreground">
                  {price} ج.م
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
                background: `linear-gradient(to left, var(--primary) 0%, var(--primary-glow) ${
                  ((price - 50) / 450) * 100
                }%, var(--muted) ${((price - 50) / 450) * 100}%, var(--muted) 100%)`,
              }}
              aria-label="سعر الحصة"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>50 ج.م</span>
              <span>500 ج.م</span>
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
            ابحث عن المدرس المناسب
          </button>
        </form>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-4 text-center text-primary-foreground">
          {[
            { n: "+5,000", l: "مدرس معتمد" },
            { n: "27", l: "محافظة" },
            { n: "+40", l: "مادة دراسية" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
              <div className="text-2xl font-extrabold sm:text-3xl">{s.n}</div>
              <div className="mt-1 text-xs text-primary-foreground/85 sm:text-sm">
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
