import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { GOVERNORATES, SUBJECTS } from "@/lib/sherlocate-data";

export const Route = createFileRoute("/teach")({
  component: TeachPage,
  head: () => ({
    meta: [
      { title: "أضف حصصك | شيرلوكيت للمدرسين" },
      {
        name: "description",
        content:
          "أنشئ ملفك كمدرس على شيرلوكيت وأضف حصصك: المادة، الموقع، السعر، والفيديو التعريفي.",
      },
      { property: "og:title", content: "أضف حصصك على شيرلوكيت" },
      {
        property: "og:description",
        content:
          "منصة سهلة للمدرسين المصريين لإدارة حصصهم والوصول لطلاب جدد في محافظتهم.",
      },
    ],
  }),
});

type ClassItem = {
  id: string;
  subject: string;
  governorate: string;
  district: string;
  price: number;
  duration: number;
  level: string;
  notes: string;
};

const LEVELS = [
  "ابتدائي",
  "إعدادي",
  "ثانوي (أول)",
  "ثانوي (ثاني)",
  "ثانوية عامة",
  "جامعي",
];

function TeachPage() {
  const [classes, setClasses] = useState<ClassItem[]>([
    {
      id: "c1",
      subject: "الرياضيات",
      governorate: "القاهرة",
      district: "مدينة نصر",
      price: 180,
      duration: 90,
      level: "ثانوية عامة",
      notes: "شرح كامل مع حل بوكليت الوزارة.",
    },
  ]);

  const [subject, setSubject] = useState("");
  const [gov, setGov] = useState("");
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">(60);
  const [level, setLevel] = useState("");
  const [notes, setNotes] = useState("");

  const districts = gov ? GOVERNORATES[gov] ?? [] : [];

  const addClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !gov || !district || !price || !level) return;
    setClasses((prev) => [
      {
        id: crypto.randomUUID(),
        subject,
        governorate: gov,
        district,
        price: Number(price),
        duration: Number(duration || 60),
        level,
        notes: notes.trim(),
      },
      ...prev,
    ]);
    setSubject("");
    setDistrict("");
    setPrice("");
    setLevel("");
    setNotes("");
  };

  const removeClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              للمدرسين
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              أضف حصصك واصل لطلاب أكثر
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              أنشئ ملف حصصك بسهولة. حدد المادة، الموقع، المستوى، والسعر —
              وسيتمكن الطلاب في محافظتك من إيجادك على شيرلوكيت.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Form */}
        <form
          onSubmit={addClass}
          className="rounded-3xl border border-border bg-card p-6 lg:col-span-2"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-lg font-extrabold">إضافة حصة جديدة</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            كل الحقول المميزة بـ * مطلوبة
          </p>

          <div className="mt-5 space-y-4">
            <Field label="المادة *">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className={inputCls}
              >
                <option value="">اختر المادة</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="المستوى الدراسي *">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
                className={inputCls}
              >
                <option value="">اختر المستوى</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="المحافظة *">
                <select
                  value={gov}
                  onChange={(e) => {
                    setGov(e.target.value);
                    setDistrict("");
                  }}
                  required
                  className={inputCls}
                >
                  <option value="">اختر</option>
                  {Object.keys(GOVERNORATES).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="المركز *">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!gov}
                  required
                  className={inputCls}
                >
                  <option value="">{gov ? "اختر" : "اختر المحافظة"}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="السعر / حصة (ج.م) *">
                <input
                  type="number"
                  min={20}
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value ? Number(e.target.value) : "")
                  }
                  required
                  placeholder="150"
                  className={inputCls}
                />
              </Field>
              <Field label="المدة (دقيقة)">
                <input
                  type="number"
                  min={30}
                  step={15}
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value ? Number(e.target.value) : "")
                  }
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="ملاحظات مختصرة">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="مثال: مذكرة مجانية + حل نماذج امتحانات"
                className={`${inputCls} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.01]"
              style={{ background: "var(--gradient-hero)" }}
            >
              + أضف الحصة
            </button>
          </div>
        </form>

        {/* List */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-extrabold">حصصي ({classes.length})</h2>
            <span className="text-xs text-muted-foreground">
              تظهر للطلاب فور الحفظ
            </span>
          </div>

          {classes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-10 text-center">
              <p className="font-bold">لا توجد حصص بعد</p>
              <p className="mt-1 text-sm text-muted-foreground">
                ابدأ بإضافة حصتك الأولى من النموذج المجاور.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {classes.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-foreground">
                        {c.subject}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                        {c.level}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.governorate} — {c.district} · {c.duration} دقيقة
                    </p>
                    {c.notes && (
                      <p className="mt-2 text-sm text-foreground/80">{c.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="text-lg font-extrabold text-primary">
                      {c.price}{" "}
                      <span className="text-xs font-semibold text-muted-foreground">
                        ج.م
                      </span>
                    </div>
                    <button
                      onClick={() => removeClass(c.id)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-60";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
