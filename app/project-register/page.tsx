"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { ArrowLeft, RotateCcw } from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const BRANCHES = [
  "Computer Science (AI & ML)",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Petroleum Engineering",
  "Chemical Engineering",
  "Electronics & Communication",
];

interface ProjectForm {
  firstName: string;
  lastName: string;
  year: string;
  branch: string;
  description: string;
}

const emptyForm: ProjectForm = {
  firstName: "",
  lastName: "",
  year: YEARS[0],
  branch: BRANCHES[0],
  description: "",
};

const inputClass =
  "w-full rounded-xl border border-[#490306]/20 bg-[#fffef6] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#490306]/50";

function CrestLogo() {
  return (
    <img
      src="/gecb.png"
      alt="Government Engineering College Barmer"
      className="h-10 w-10 object-contain"
    />
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#490306]/80">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-[#490306]/55">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function randomId() {
  return `GECB-PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function RegisterProjectPage() {
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [entry, setEntry] = useState<{ id: string; data: ProjectForm } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEntry({ id: randomId(), data: form });
  }

  function reset() {
    setEntry(null);
    setForm(emptyForm);
  }

  return (
    <div
      className={`${fraunces.variable} ${inter.variable} min-h-screen bg-[#fffef6] text-[#490306] [font-family:var(--font-body)] antialiased`}
    >
      <header className="border-b border-[#490306]/10 px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center gap-1">
            <a
      href="/"
      aria-label="Back to main website"
      className="flex h-8 w-8 shrink-0 items-center justify-center text-[#490306] transition-transform hover:-translate-x-0.5"
    >
      <ArrowLeft size={18} strokeWidth={2} />
    </a>
          <CrestLogo />
          <div className="min-w-0">
      <p className="whitespace-nowrap [font-family:var(--font-display)] text-[14px] font-semibold leading-tight sm:text-lg">
        Government Engineering College Barmer
      </p>

      <p className="whitespace-nowrap text-[9px] leading-tight text-[#490306]/60 sm:text-[11px]">
        ( A Constituent College of MBM University, Jodhpur )
      </p>
    </div>

        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-14">
        {!entry ? (
          <>
            <div className="text-center">
              <h1 className="[font-family:var(--font-display)] text-3xl font-semibold sm:text-4xl">
                Register your project
              </h1>
              <p className="mt-3 text-[#490306]/65">Tell us about your team and what you&apos;ve built.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-[20px] border border-[#490306]/10 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Year">
                  <select
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className={inputClass}
                  >
                    {YEARS.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Branch">
                  <select
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className={inputClass}
                  >
                    {BRANCHES.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Describe your project">
                <textarea
                  required
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What problem does it solve, what did you build, and what makes it stand out?"
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="w-full rounded-full bg-[#490306] py-3 text-sm font-medium text-[#fffef6] transition-colors hover:bg-[#6b0910]"
              >
                Submit Entry
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full bg-[#a6763a]/15 px-4 py-1 text-xs font-medium text-[#a6763a]">
              Entry received
            </span>
            <h1 className="mt-4 [font-family:var(--font-display)] text-2xl font-semibold sm:text-3xl">
              {entry.data.firstName} {entry.data.lastName}, you&apos;re in!
            </h1>
            <p className="mt-2 text-sm text-[#490306]/60">Entry ID: {entry.id}</p>

            <div className="mt-8 w-full max-w-md rounded-[20px] border border-[#490306]/10 p-6 text-left">
              <Row label="Year" value={entry.data.year} />
              <Row label="Branch" value={entry.data.branch} />
              <div className="mt-4 border-t border-[#490306]/10 pt-4">
                <p className="text-sm font-medium text-[#490306]/70">Project description</p>
                <p className="mt-2 text-sm leading-relaxed text-[#490306]/70">{entry.data.description}</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#490306]/25 px-6 py-3 text-sm font-medium transition-colors hover:bg-[#490306]/[0.06]"
            >
              <RotateCcw size={16} /> Submit another entry
            </button>
          </div>
        )}
      </main>
    </div>
  );
}