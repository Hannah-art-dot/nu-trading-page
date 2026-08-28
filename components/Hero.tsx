"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, PlayCircle } from "lucide-react"

export function Hero() {
  // Track scroll position for the scroll-reactive parallax fade effect
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 pb-20 dark:bg-slate-950 sm:pt-40 sm:pb-28">
      {/* Ambient background: grid + amber glow, dark mode only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px] dark:bg-amber-400/25"
      />

      {/* Scroll-reactive wrapper that shifts and fades on scroll */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400"
        >
          Technology &middot; Machinery &middot; Adaptation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
        >
          We absorb, integrate and use{" "}
          <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
            new technologies
          </span>{" "}
          in our society
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
        >
          NU is a technology company having a friendly and enthusiastic team of
          specialists in all areas of manufacturing, machinery, technology
          adaptation and so more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:shadow-amber-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="#services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/60 px-7 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur transition-all hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 sm:w-auto"
          >
            <PlayCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Explore what we do
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}