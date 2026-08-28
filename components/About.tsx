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
      className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 sm:py-32 transition-colors duration-300"
    >
      {/* Ambient background glows using brand amber */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
            Who We Are
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            About NU Trading
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            A technology and trading company committed to innovation, integrity,
            and impact building solutions that move Africa forward.
          </p>
        </motion.div>

        {/* Pillars bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
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
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10 dark:border-white/10 dark:bg-slate-900/50 ${pillar.border} ${pillar.glow}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-amber-400/30" />

                <div className="relative">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400/10 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-slate-950 ${pillar.iconColor}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Executive Manager quote card with clear visible video background */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-xl dark:border-white/10"
        >
          {/* Video Background Loop - highly visible */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-65 dark:opacity-85 transition-opacity duration-300"
            >
              <source src="/videos/about-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Softened gradients so the background video shines through clearly */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-slate-950/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 lg:px-24">
            <Quote className="h-12 w-12 text-amber-400" strokeWidth={1.5} />

            <blockquote className="mt-6 max-w-3xl text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              &ldquo;Over the past seven years, NU Trading has transformed every
              challenge into a stepping stone. We have grown from a bold idea into
              a globally competitive company and our journey is only
              beginning.&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-amber-400" />
              <div>
                <p className="text-lg font-semibold text-white">
                  Mr. Bereket
                </p>
                <p className="text-sm text-amber-400/90">
                  Executive Manager, NU Trading PLC
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}