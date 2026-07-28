import { useState } from "react";
import type { Teacher } from "@/lib/sherlocate-data";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const [videoOpen, setVideoOpen] = useState(false);

  const waHref = `https://wa.me/${teacher.whatsapp}?text=${encodeURIComponent(
    `مرحباً ${teacher.name}، وجدت ملفك على شيرلوكيشن وأود الاستفسار عن حصص ${teacher.subject}.`,
  )}`;

  const initials = teacher.name
    .replace(/^أ\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <>
      <article
        className="group relative flex flex-col rounded-3xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-1"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${teacher.avatarColor} text-xl font-extrabold text-white shadow-md`}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-lg font-bold text-foreground">
                {teacher.name}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                <StarIcon /> {teacher.rating.toFixed(1)}
                <span className="font-medium text-amber-600/80">
                  ({teacher.reviews})
                </span>
              </span>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-primary">
              {teacher.subject}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <PinIcon /> {teacher.governorate} — {teacher.district}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {teacher.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
            {teacher.stage}
          </span>
          {teacher.grades.map((g) => (
            <span
              key={g}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground"
            >
              {g}
            </span>
          ))}
        </div>



        <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3">
          <span className="text-xs font-semibold text-muted-foreground">
            سعر الحصة
          </span>
          <span className="text-lg font-extrabold text-primary">
            {teacher.price}{" "}
            <span className="text-xs font-semibold text-muted-foreground">
              ج.م
            </span>
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <PlayIcon />
            فيديو تعريفي
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
          >
            <WhatsappIcon />
            واتساب
          </a>
        </div>
      </article>

      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div>
                <div className="text-sm font-bold text-foreground">
                  {teacher.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  فيديو تعريفي — {teacher.subject}
                </div>
              </div>
              <button
                onClick={() => setVideoOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="إغلاق"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={teacher.videoUrl}
                title={`فيديو ${teacher.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 2 15 8.5l7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5l-5-5 7-1L12 2z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.87 11.87 0 0 0 5.73 1.46h.01c6.56 0 11.89-5.33 11.89-11.9a11.83 11.83 0 0 0-3.43-8.42ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.24-.38a9.9 9.9 0 1 1 18.35-5.25 9.9 9.9 0 0 1-9.95 9.9Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37s-1.05 1.02-1.05 2.48 1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
