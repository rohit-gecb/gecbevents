import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterEventPage() {
  return (
    <main className="min-h-screen bg-[#fffef6] text-[#490306]">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6 py-14">
        <div className="w-full text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f1e1]">
            <CheckCircle2
              size={42}
              strokeWidth={1.8}
              className="text-[#490306]"
            />
          </div>

          <h1 className="mt-7 text-3xl font-semibold sm:text-4xl">
            Registration Portal Closed
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#490306]/65">
            Registration for Engineering Day 2026 has now been closed.
            Thank you for your interest and participation.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#490306] px-6 py-3 text-sm font-medium text-[#fffef6] transition-all hover:-translate-y-0.5 hover:bg-[#6b0910]"
          >
            <ArrowLeft size={16} />
            Back to Website
          </a>
        </div>
      </div>
    </main>
  );
}