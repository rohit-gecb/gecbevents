"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { ArrowLeft, CheckCircle2, RotateCcw, Upload, X } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

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

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

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

type Role = "student" | "guest";

interface StudentForm {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  year: string;
  branch: string;
}

interface GuestForm {
  firstName: string;
  lastName: string;
  position: string;
  company: string;
}

const emptyStudent: StudentForm = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  year: YEARS[0],
  branch: BRANCHES[0],
};

const emptyGuest: GuestForm = {
  firstName: "",
  lastName: "",
  position: "",
  company: "",
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

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#490306]/80">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function RegisterEventPage() {
  const [role, setRole] = useState<Role>("student");
  const [student, setStudent] = useState<StudentForm>(emptyStudent);
  const [guest, setGuest] = useState<GuestForm>(emptyGuest);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Photo size must be less than 5 MB.");
      return;
    }

    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!photoFile) {
      setError("Please upload your photo before submitting.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const timestamp = Date.now();
      const safeName = photoFile.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const photoPath = `${role}/${timestamp}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(photoPath, photoFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Photo upload failed: ${uploadError.message}`);
      }

      const insertData =
        role === "student"
          ? {
              first_name: student.firstName,
              last_name: student.lastName,
              mobile: student.mobile,
              email: student.email,
              year: student.year,
              branch: student.branch,
              photo_path: photoPath,
            }
          : {
              first_name: guest.firstName,
              last_name: guest.lastName,
              position: guest.position,
              company: guest.company,
              photo_path: photoPath,
            };

      const targetTable =
        role === "student" ? "student_registrations" : "guest_registrations";

      const { error: insertError } = await supabase
        .from(targetTable)
        .insert(insertData);

      if (insertError) {
        await supabase.storage.from("event-photos").remove([photoPath]);
        throw new Error(`Registration failed: ${insertError.message}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Registration submission failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setPhoto(null);
    setPhotoFile(null);
    setError("");
    setStudent(emptyStudent);
    setGuest(emptyGuest);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <div
      className={`${fraunces.variable} ${inter.variable} min-h-screen bg-[#fffef6] text-[#490306] [font-family:var(--font-body)] antialiased`}
    >
      <style>{`
        @keyframes popup-in {
          0% {
            opacity: 0;
            transform: scale(0.88) translateY(18px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes check-draw {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-12deg);
          }
          70% {
            transform: scale(1.08) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-popup-in {
          animation: popup-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-check-draw {
          animation: check-draw 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards;
          opacity: 0;
        }

        .animate-backdrop-in {
          animation: backdrop-in 0.2s ease-out forwards;
        }
      `}</style>

      <header className="border-b border-[#490306]/10 px-4 py-4">
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

      <main className="mx-auto max-w-3xl px-6 py-14">
        <div className="text-center">
          <h1 className="[font-family:var(--font-display)] text-3xl font-semibold sm:text-4xl">
            Register for the event
          </h1>
          <p className="mt-3 text-[#490306]/65">
            Fill in your details to complete your event registration.
          </p>
        </div>

        <div className="relative mx-auto mt-8 grid w-64 grid-cols-2 rounded-full bg-[#f7f1e1] p-1">
          <span
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#490306] transition-transform duration-300 ease-out"
            style={{
              transform:
                role === "guest" ? "translateX(100%)" : "translateX(0%)",
            }}
          />

          <button
            type="button"
            onClick={() => {
              setRole("student");
              setError("");
            }}
            className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "student"
                ? "text-[#fffef6]"
                : "text-[#490306]/70"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("guest");
              setError("");
            }}
            className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "guest"
                ? "text-[#fffef6]"
                : "text-[#490306]/70"
            }`}
          >
            Guest
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-[20px] border border-[#490306]/10 p-6 sm:p-8"
        >
          {role === "student" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    required
                    value={student.firstName}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        firstName: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Last name">
                  <input
                    required
                    value={student.lastName}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        lastName: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Mobile number">
                  <input
                    required
                    type="tel"
                    value={student.mobile}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        mobile: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={student.email}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        email: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Year">
                  <select
                    value={student.year}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        year: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {YEARS.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Branch">
                  <select
                    value={student.branch}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        branch: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {BRANCHES.map((branch) => (
                      <option key={branch}>{branch}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    required
                    value={guest.firstName}
                    onChange={(e) =>
                      setGuest({
                        ...guest,
                        firstName: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Last name">
                  <input
                    required
                    value={guest.lastName}
                    onChange={(e) =>
                      setGuest({
                        ...guest,
                        lastName: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Position">
                  <input
                    required
                    value={guest.position}
                    onChange={(e) =>
                      setGuest({
                        ...guest,
                        position: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Company name">
                  <input
                    required
                    value={guest.company}
                    onChange={(e) =>
                      setGuest({
                        ...guest,
                        company: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>
            </>
          )}

          <Field label="Upload your photo">
            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-[#490306]/30 p-4 transition-colors hover:bg-[#490306]/[0.03]">
              {photo ? (
                <img
                  src={photo}
                  alt="Preview"
                  className="h-16 w-16 rounded-xl object-cover"
                />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f7f1e1]">
                  <Upload size={20} className="text-[#490306]/50" />
                </span>
              )}

              <span className="text-sm text-[#490306]/65">
                {photo
                  ? "Photo selected — click to change"
                  : "Click to upload a passport-size photo"}
              </span>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
              />
            </label>
          </Field>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#490306] py-3 text-sm font-medium text-[#fffef6] transition-all hover:bg-[#6b0910] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </main>

      {submitted && (
        <div
          className="animate-backdrop-in fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="animate-popup-in relative w-full max-w-md rounded-[28px] bg-[#fffef6] p-8 text-center shadow-2xl sm:p-10">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#490306]/50 transition-colors hover:bg-[#490306]/[0.06] hover:text-[#490306]"
            >
              <X size={18} />
            </button>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={52}
                strokeWidth={2}
                className="animate-check-draw text-green-600"
              />
            </div>

            <h2
              id="success-title"
              className="mt-6 [font-family:var(--font-display)] text-3xl font-semibold"
            >
              Form Submitted!
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#490306]/65">
              Your registration has been submitted successfully. Thank you
              for registering for the event.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#490306] px-6 py-3 text-sm font-medium text-[#fffef6] transition-colors hover:bg-[#6b0910]"
            >
              <RotateCcw size={16} />
              Register another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
