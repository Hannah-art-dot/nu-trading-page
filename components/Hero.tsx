"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, PlayCircle } from "lucide-react"

const PHRASES = [
  "Integrating modern technology",
  "Advanced machinery solutions",
  "Empowering industrial growth"
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Track scroll position for the scroll-reactive parallax fade effect
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  // Smooth continuous rotation through phrases with zero empty gap time
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHRASES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentPhrase = PHRASES[currentIndex]

  return (
    <section className="relative isolate overflow-hidden bg-white pt-32 pb-20 dark:bg-slate-950 sm:pt-45 sm:pb-32">
      {/* Ambient background: grid + amber glow */}
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
        
        {/* Upper Pill Badge with Technology · Machinery · Adaptation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 shadow-sm shadow-amber-400/10">
            Technology &middot; Machinery &middot; Adaptation
          </span>
        </motion.div>

        {/* Smooth Continuous Phrase Carousel Heading */}
        <div className="mt-2 min-h-[4.5rem] sm:min-h-[6rem] flex items-center justify-center">
          <div className="text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl flex items-center justify-center overflow-hidden py-2 px-4">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentPhrase}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-slate-900 dark:text-white inline-block text-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_6px_16px_rgba(255,255,255,0.06)]"
              >
                {currentPhrase}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-400/25 transition-all hover:bg-amber-300 hover:shadow-amber-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="#services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-8 py-4 text-sm font-semibold text-slate-900 backdrop-blur transition-all hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 sm:w-auto"
          >
            <PlayCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Explore what we do
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}