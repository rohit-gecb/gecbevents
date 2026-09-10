"use client";

import { useEffect, useRef, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Camera,
  GraduationCap,
  Trophy,
  Megaphone,
  Bell,
} from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

/* ------------------------------------------------------------------ */
/* Content — replace with real college data                           */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: { label: string; items: string[] }[] = [
  {
    label: "About",
    items: [
      "Our Legacy",
      "Vision & Mission",
      "Principal's Message",
      "Governing Body",
      "Accreditations",
      "Campus Infrastructure",
    ],
  },
  {
    label: "Academics",
    items: [
      "Departments",
      "Programs Offered",
      "Academic Calendar",
      "Examination Cell",
      "Result Portal",
      "Research & Publications",
    ],
  },
  {
    label: "Admissions",
    items: [
      "Admission Process",
      "Eligibility Criteria",
      "Fee Structure",
      "Scholarships",
      "Important Dates",
      "Apply Online",
    ],
  },
  {
    label: "Campus Life",
    items: [
      "Events & Fests",
      "Clubs & Societies",
      "Sports Complex",
      "Hostel Facilities",
      "Central Library",
      "Photo Gallery",
    ],
  },
  {
    label: "Placements",
    items: [
      "Placement Cell",
      "Our Recruiters",
      "Placement Statistics",
      "Internship Drive",
      "Alumni Network",
      "Success Stories",
    ],
  },
];

const HERO_IMAGES = [
  { src: "/college/Hero1.jpeg", big: true },
  { src: "/college/hero2.jpeg", big: false },
  { src: "/college/hero3.jpeg", big: false },
  { src: "/college/Hero4.jpeg", big: false },
  { src: "/college/hero5.jpeg", big: false },
];

const STATS = [
  { value: 2018, label: "Established", suffix: "" },
  { value: 500, label: "Students on campus", suffix: "+" },
  { value: 92, label: "Placement rate", suffix: "%" },
  { value: 40, label: "Recruiting companies", suffix: "+" },
];

const EVENTS = [
  {
    name: "Virat Bharat Sammelan",
    date: "3-Day Event",
    blurb:
      "A three-day gathering celebrating ideas, culture, innovation, and the spirit of a strong and progressive India.",
    image: "/college/event1.jpeg",
  },
  {
    name: "Student Orientation",
    date: "Student Orientation",
    blurb:
      "Welcoming new students and introducing them to campus life, academics, activities, and opportunities.",
    image: "/college/event2.jpeg",
  },
  {
    name: "Krishna Janmashtami",
    date: "Celebration",
    blurb:
      "A vibrant celebration of Krishna Janmashtami with students coming together in the spirit of joy and tradition.",
    image: "/college/event3.jpg",
  },
  {
    name: "Weapon Display",
    date: "Arrmy Day",
    blurb:
      "Celebrating engineering, innovation, creativity, and the achievements of our students.",
    image: "/college/event4.jpg",
  },
];

const TEAMS = [
  {
    name: "Tech Sabha ",
    head: "Rohit Suthar",
    blurb: "Managing the technical and digital initiatives of the college.",
    image: "/college/teams/rohit.png",
  },
  {
    name: "Harit Sabha",
    head: "Vinay yadav",
    blurb: "Promoting a greener and more sustainable college campus.",
    image: "/college/teams/vinay.jpeg",
  },
  {
    name: "Sports Affairs Sabha",
    head: "Vikash Gar",
    blurb: "Empowering students through sports and physical activities.",
    image: "/college/teams/vikash.jpeg",
  },
  {
    name: "Corporate Development & Placement Sabha",
    head: "Varsha",
    blurb: "Preparing students for internships, placements, and industry opportunities.",
    image: "/college/teams/varsa.jpeg",
  },
  {
    name: "Media & Communication Sabha",
    head: "Abhishek Meena",
    blurb: "Managing the college's media presence and communications.",
    image: "/college/teams/abhisek.jpeg",
  },
  {
    name: "Cultural Affairs Sabha",
    head: "Vansh Narwal",
    blurb: "Working towards important campus initiatives and student activities.",
    image: "/college/teams/vansh.jpeg",
  },
  {
    name: "Chhatra Kalyan Sabha",
    head: "Aryan Choudhary",
    blurb: "Contributing to the successful organization of college activities.",
    image: "/college/teams/aryan.jpeg",
  },
  {
    name: "Alumni Affairs & Institutional Relation Sabha",
    head: "NA",
    blurb: "Supporting campus initiatives through teamwork and active participation.",
    image: "/college/teams/team7.jpeg",
  },
  
  {
    name: "Alumni Affairs & Institutional Relation Sabha ",
    head: "NA",
    blurb: "Managing the technical and digital initiatives of the college.",
    image: "/college/teams/team8.png",
  },
];
const TOPPERS = [
  {
    rank: 1,
    name: "Riya Soni",
    branch: "Computer Science and AI & ML",
    score: "Highest CGPA",
    image: "/college/toppers/topper1.jpeg",
  },
  {
    rank: 2,
    name: "Yogender",
    branch: "Computer Science and AI & ML",
    score: "Highest CGPA",
    image: "/college/toppers/topper2.jpeg",
  },
  {
    rank: 3,
    name: "Shubham Ray",
    branch: "Computer Science and AI & ML",
    score: "Highest CGPA",
    image: "/college/toppers/topper3.jpeg",
  },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function CrestLogo() {
  return (
    <img
      src="/gecb.png"
      alt="Government Engineering College Barmer"
      className="h-10 w-10 object-contain"
    />
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="[font-family:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-[#490306]/65">{description}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                           */
/* ------------------------------------------------------------------ */

function Marquee() {
  const notices = [
  { icon: GraduationCap, text: "Admissions open for 2026–27 batch" },
  { icon: Trophy, text: "Utkarsh registrations close March 10" },
  { icon: Megaphone, text: "Campus placement drive — TCS & Infosys, next week" },
  { icon: Bell, text: "Mid-semester results declared" },
];
  const track = [...notices, ...notices];
  return (
    <div className="overflow-hidden bg-[#490306] py-2 text-[#fffef6]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs font-medium">
        {track.map((notice, i) => {
  const Icon = notice.icon;

  return (
    <span key={i} className="inline-flex items-center gap-2">
      <Icon size={14} strokeWidth={2} />
      {notice.text}
    </span>
  );
})}
      </div>
    </div>
  );
}

function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<number | null>(null);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#490306]/10 bg-[#fffef6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3 -ml-4">
          <CrestLogo />

          <span className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap [font-family:var(--font-display)] text-[14px] font-semibold tracking-tight sm:text-lg">
              Government Engineering College Barmer
            </span>

            <span className="block whitespace-nowrap text-[9px] text-[#490306]/60 sm:text-[11px]">
              (A Constituent College of MBM University, Jodhpur)
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <button
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#490306]/[0.06]"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {item.label}
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-0 top-full w-64 origin-top rounded-2xl border border-[#490306]/10 bg-[#fffef6] p-2 shadow-[0_16px_40px_-12px_rgba(73,3,6,0.25)] transition-all duration-200 ${
                  openIndex === i
                    ? "translate-y-1 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {item.items.map((sub) => (
                  <a
                    key={sub}
                    href="#"
                    className="block rounded-xl px-3 py-2 text-sm text-[#490306]/80 transition-colors hover:bg-[#490306]/[0.06] hover:text-[#490306]"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a href="#" className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#490306]/[0.06]">
            Log in
          </a>
          <a
            href="#"
            className="rounded-full bg-[#490306] px-5 py-2 text-sm font-medium text-[#fffef6] transition-colors hover:bg-[#6b0910]"
          >
            Sign up
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${
          mobileOpen ? "max-h-[36rem] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="space-y-1 border-t border-[#490306]/10 px-6 py-4">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.label}>
              <button
                className="flex w-full items-center justify-between py-2 text-left text-sm font-medium"
                onClick={() => setMobileSub(mobileSub === i ? null : i)}
              >
                {item.label}
                <ChevronDown size={16} className={`transition-transform ${mobileSub === i ? "rotate-180" : ""}`} />
              </button>
              {mobileSub === i && (
                <div className="ml-3 space-y-1 border-l border-[#490306]/10 pb-2 pl-3">
                  {item.items.map((sub) => (
                    <a key={sub} href="#" className="block py-1.5 text-sm text-[#490306]/70">
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-3">
            <a href="#" className="flex-1 rounded-full border border-[#490306]/20 py-2 text-center text-sm font-medium">
              Log in
            </a>
            <a href="#" className="flex-1 rounded-full bg-[#490306] py-2 text-center text-sm font-medium text-[#fffef6]">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <style>{`
        @keyframes hero-gallery {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-hero-gallery {
          animation: hero-gallery 24s linear infinite;
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-10 lg:py-20">

        {/* Hero Content */}
        <div className="animate-fade-up text-center lg:text-left">
          <h1 className="[font-family:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Engineering Ideas. Inspiring Innovation. Building the Future.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#490306]/70 lg:mx-0">
            Celebrating the spirit of engineering, innovation, and student excellence at GEC Barmer.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="/register-event"
              className="group inline-flex items-center gap-2 rounded-full bg-[#490306] px-6 py-3 text-sm font-medium text-[#fffef6] transition-transform hover:-translate-y-0.5 hover:bg-[#6b0910]"
            >
              Register for Event
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="project-register"
              className="inline-flex items-center gap-2 rounded-full border border-[#490306]/25 px-6 py-3 text-sm font-medium transition-colors hover:bg-[#490306]/[0.06]"
            >
              Register for Project Competition
            </a>
          </div>
        </div>

        {/* Desktop Mosaic */}
        <div className="hidden gap-3 sm:grid sm:h-[460px] sm:grid-cols-4 sm:grid-rows-2">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`animate-fade-up overflow-hidden rounded-[20px] ${
                img.big ? "col-span-2 row-span-2" : ""
              }`}
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              <img
                src={img.src}
                alt="Government Engineering College Barmer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Mobile Automatic Gallery */}
        <div className="overflow-hidden sm:hidden">
          <div className="flex w-max gap-3 animate-hero-gallery">
            {[...HERO_IMAGES, ...HERO_IMAGES].map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="h-36 w-36 shrink-0 overflow-hidden rounded-[20px]"
              >
                <img
                  src={img.src}
                  alt="Government Engineering College Barmer"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
function StatItem({ stat, active }: { stat: (typeof STATS)[number]; active: boolean }) {
  const value = useCountUp(stat.value, active);
  return (
    <div>
      <p className="[font-family:var(--font-display)] text-3xl font-semibold sm:text-4xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-[#490306]/65">{stat.label}</p>
    </div>
  );
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-[#490306]/10 bg-[#f7f1e1]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 lg:px-10">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}

function PastEvents() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        title="Life on campus, one event at a time"
        description="A glimpse of the events and celebrations that bring the GEC Barmer campus to life."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((ev) => (
          <article
            key={ev.name}
            className="group overflow-hidden rounded-[20px] border border-[#490306]/10 transition-shadow hover:shadow-[0_20px_45px_-20px_rgba(73,3,6,0.35)]"
          >
            <div className="overflow-hidden">
              <img
                src={ev.image}
                alt={ev.name}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <p className="text-xs font-medium text-[#a6763a]">
                {ev.date}
              </p>

              <h3 className="mt-2 font-semibold leading-snug">
                {ev.name}
              </h3>

              <p className="mt-2 text-sm text-[#490306]/65">
                {ev.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OurTeams() {
  const [teamPage, setTeamPage] = useState(0);

  const desktopTeams = [
    TEAMS.slice(0, 4),
    TEAMS.slice(4, 8),
  ];

  return (
    <section className="bg-[#f7f1e1] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <SectionHeading
          title="Teams Driving Campus Excellence"
          description="Dedicated teams working together to make every campus initiative successful."
        />

        {/* Desktop Carousel */}
        <div className="relative mt-10 hidden lg:block">

          <div className="grid grid-cols-4 gap-6">
            {desktopTeams[teamPage].map((team) => (
              <div
                key={team.name}
                className="rounded-[20px] bg-[#fffef6] p-6 transition-transform hover:-translate-y-1"
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="h-20 w-20 rounded-full object-cover"
                />

                <h3 className="mt-4 font-semibold">
                  {team.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#a6763a]">
                  {team.head}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#490306]/65">
                  {team.blurb}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={() => setTeamPage(0)}
            disabled={teamPage === 0}
            className="absolute -left-20 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#490306]/15 bg-[#fffef6] text-[#490306] shadow-sm transition hover:bg-[#490306] hover:text-[#fffef6] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous teams"
          >
            <ArrowRight className="rotate-180" size={18} />
          </button>

          <button
            onClick={() => setTeamPage(1)}
            disabled={teamPage === 1}
            className="absolute -right-20 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#490306]/15 bg-[#fffef6] text-[#490306] shadow-sm transition hover:bg-[#490306] hover:text-[#fffef6] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next teams"
          >
            <ArrowRight size={18} />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setTeamPage(index)}
                className={`h-2.5 rounded-full transition-all ${
                  teamPage === index
                    ? "w-8 bg-[#490306]"
                    : "w-2.5 bg-[#490306]/20"
                }`}
                aria-label={`Show team page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile - All 7 Teams */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
          {TEAMS.map((team) => (
            <div
              key={team.name}
              className="rounded-[20px] bg-[#fffef6] p-6 transition-transform hover:-translate-y-1"
            >
              <img
                src={team.image}
                alt={team.name}
                className="h-20 w-20 rounded-full object-cover"
              />

              <h3 className="mt-4 font-semibold">
                {team.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-[#a6763a]">
                {team.head}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#490306]/65">
                {team.blurb}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Toppers() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        title="Our Academic Achievers"
        description="Recognising the outstanding students who have demonstrated excellence in academics."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TOPPERS.map((t) => (
          <div
            key={t.rank}
            className="flex items-center gap-4 rounded-[20px] border border-[#490306]/10 p-5 transition-transform hover:-translate-y-1 hover:shadow-[0_15px_35px_-20px_rgba(73,3,6,0.35)]"
          >
            <img
              src={t.image}
              alt={t.name}
              className="h-16 w-16 rounded-[20px] object-cover"
            />

            <div>
              <p className="text-xs font-medium text-[#a6763a]">
                Rank {t.rank}
              </p>

              <h3 className="font-semibold">
                {t.name}
              </h3>

              <p className="text-sm text-[#490306]/65">
                {t.branch}
              </p>

              <p className="text-sm font-medium">
                {t.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrincipalMessage() {
  return (
    <section className="bg-[#f7f1e1] py-20 text-[#490306]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">

        {/* Principal Message */}
        <div>
          <p className="text-sm font-medium text-[#e8c894]">
            From the Principal&apos;s Desk
          </p>

          <p className="mt-5 max-w-2xl [font-family:var(--font-display)] text-lg font-medium leading-relaxed sm:text-xl">
            &ldquo;At Government Engineering College Barmer, we believe that
            education is not only about gaining knowledge, but also about
            developing the skills, values, and confidence needed to contribute
            meaningfully to society. Our aim is to provide every student with
            an environment that encourages learning, innovation, discipline,
            and excellence. I wish all our students success in their academic
            journey and a bright future ahead.&rdquo;
          </p>
        </div>

        {/* Principal Photo + Name */}
        <div className="flex flex-col items-center justify-self-center lg:justify-self-end">
          <img
            src="/college/sir.jpeg"
            alt="Dr. Sandeep Rankawat, Principal"
            className="h-80 w-64 rounded-[20px] object-cover shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] sm:h-96 sm:w-72"
          />

          <div className="mt-5 text-center">
            <p className="text-lg font-semibold">
              Dr. Sandeep Rankawat
            </p>

            <p className="mt-1 text-sm text-[#490306]/70">
              Principal, Government Engineering College Barmer
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
<footer className="rounded-t-[20px] bg-[#3a0205] text-[#fffef6]">      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        {/* Top Footer */}
        <div className="grid gap-10 border-b border-[#fffef6]/10 pb-12 lg:grid-cols-[1.2fr_2fr_1.1fr]">

          {/* College Info */}
          <div>
            <div className="flex items-center gap-2">
              <CrestLogo />
              <p className="[font-family:var(--font-display)] font-semibold">
                Government Engineering College Barmer
              </p>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#fffef6]/60">
              A constituent college of MBM University, Jodhpur, dedicated to
              engineering education, innovation, and student excellence.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-[#fffef6]/10 p-2 transition hover:bg-[#fffef6]/20"
              >
                <Camera size={16} />
              </a>
            </div>
          </div>

          {/* At a Glance */}
          <div>
            <p className="text-sm font-semibold">At a Glance</p>

            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              <p className="text-sm text-[#fffef6]/70">
                Engineering Education
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Innovation & Technology
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Student Excellence
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Campus Activities
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Training & Placements
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Student Teams
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Academic Development
              </p>

              <p className="text-sm text-[#fffef6]/70">
                Community Engagement
              </p>
            </div>
          </div>

          {/* Reach Us */}
          <div>
            <p className="text-sm font-semibold">Reach Us</p>

            <ul className="mt-4 space-y-3 text-sm text-[#fffef6]/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                Barmer, Rajasthan, India
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />
                +91 XXXXX XXXXX
              </li>

              <li className="flex items-center gap-2">
                <Mail size={16} />
                info@gecbarmer.ac.in
              </li>
            </ul>
          </div>

        </div>

        {/* Six Footer Sections */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3 xl:grid-cols-6">

          {/* College */}
          <div>
            <p className="text-sm font-semibold">College</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Home</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">About College</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Principal&apos;s Desk</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Departments</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Faculty</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Campus</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Facilities</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Contact Us</a></li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <p className="text-sm font-semibold">Admissions</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Admission Process</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Eligibility</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Courses</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Fee Structure</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Admission Notice</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Important Dates</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Documents Required</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Admission Help</a></li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <p className="text-sm font-semibold">Academics</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Academic Programs</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Departments</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Examination</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Results</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Syllabus</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Time Table</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Academic Notices</a></li>
            </ul>
          </div>

          {/* Student Life */}
          <div>
            <p className="text-sm font-semibold">Student Life</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Student Teams</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Events</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Clubs & Activities</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Student Support</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Scholarships</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Hostel</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Gallery</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Student Corner</a></li>
            </ul>
          </div>

          {/* Career */}
          <div>
            <p className="text-sm font-semibold">Career</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Training & Placement</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Placement Cell</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Internships</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Recruiters</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Placement Statistics</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Career Guidance</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Industry Connect</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Placement Notices</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-sm font-semibold">Resources</p>
            <ul className="mt-4 space-y-2 text-sm text-[#fffef6]/70">
              <li><a href="#" className="hover:text-[#fffef6]">Notices</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Downloads</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Forms</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">News & Updates</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Important Links</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Student Portal</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Feedback</a></li>
              <li><a href="#" className="hover:text-[#fffef6]">Help & Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#fffef6]/10 pt-6 text-xs text-[#fffef6]/50 sm:flex-row">
          <p>
            © This website is managed & maintained by Rohit Suthar ( Tech Team GECB ) | All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-[#fffef6]/80">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#fffef6]/80">
              Terms of Use
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} min-h-screen bg-[#fffef6] text-[#490306] [font-family:var(--font-body)] antialiased`}
    >
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-fade-up { animation: none !important; }
        }
      `}</style>

      <Marquee />
      <Navbar />
      <Hero />
      <StatsBar />
      <PastEvents />
      <OurTeams />
      <Toppers />
      <PrincipalMessage />
      <Footer />
    </div>
  );
}