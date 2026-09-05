"use client"

import Image from "next/image"
import { motion, type Variants } from "motion/react"
import { Target, Eye, Flag, Quote, type LucideIcon } from "lucide-react"

interface Pillar {
  icon: LucideIcon
  title: string
  description: string
  accent: string
  glow: string
  iconColor: string
  border: string
}

const pillars: Pillar[] = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To exceed expectations by delivering cutting-edge technology, advanced machinery, and reliable maintenance services that empower businesses to thrive.",
    accent: "from-amber-400/20 to-amber-600/20",
    glow: "group-hover:shadow-amber-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
    border: "group-hover:border-amber-400/40",
  },
  {
    icon: Eye,
    title: "Vision 2035",
    description:
      "To be the leading technological company in Africa, driving innovation and setting the benchmark for excellence across the continent.",
    accent: "from-amber-400/20 to-amber-600/20",
    glow: "group-hover:shadow-amber-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
    border: "group-hover:border-amber-400/40",
  },
  {
    icon: Flag,
    title: "Our Goal",
    description:
      "To provide fast, reliable, and cost-effective ethical services tailored to the local market, building trust through every engagement.",
    accent: "from-amber-400/20 to-amber-600/20",
    glow: "group-hover:shadow-amber-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
    border: "group-hover:border-amber-400/40",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

const viewportConfig = { once: true, margin: "-80px" }

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-32 transition-colors duration-300"
    >
      {/* Ambient background glows using brand amber */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
            Who We Are
          </span>
          <h2 className="mt-3 text-sm sm:text-xl font-normal tracking-tight text-slate-600 dark:text-slate-400 px-2">
            Nu is a technology and trading company
          </h2>
        </motion.div>

        {/* Pillars bento grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                transition={{
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: index * 0.12,
                }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10 dark:border-white/10 dark:bg-slate-900/50 ${pillar.border} ${pillar.glow}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-amber-400/30" />

                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-amber-400/10 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-slate-950 ${pillar.iconColor}`}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-slate-950 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Executive Manager quote card with background video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
          className="relative mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-xl dark:border-white/10"
        >
          {/* Video Background Loop with Enhanced Quality Settings */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-85 dark:opacity-95 transform-gpu transition-opacity duration-300"
            >
              <source src="/videos/about-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Lighter overlays to keep video crisp and clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20" />
          </div>

          <div className="relative z-10 px-6 py-12 sm:px-16 sm:py-20 lg:px-24 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400" strokeWidth={1.5} />

              <blockquote className="mt-5 sm:mt-6 max-w-3xl text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-white">
                &ldquo;Over the past seven years, NU Trading has transformed every
                challenge into a stepping stone. We have grown from a bold idea into
                a globally competitive company and our journey is only
                beginning.&rdquo;
              </blockquote>

              <div className="mt-6 sm:mt-8 flex items-center gap-4">
                <div className="h-px w-10 sm:w-12 bg-amber-400" />
                <div>
                  <p className="text-base sm:text-lg font-semibold text-white">
                    Mr. Bereket
                  </p>
                  <p className="text-xs sm:text-sm text-amber-400/90">
                    Executive Manager, NU Trading PLC
                  </p>
                </div>
              </div>
            </div>

            {/* YouTube Channel Link Button with Inline SVG */}
            <div className="shrink-0">
              <a
                href="https://www.youtube.com/@NuTradingPLC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-red-600/25"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Visit Our YouTube Channel</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}