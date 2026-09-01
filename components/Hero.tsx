"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { ArrowRight, PlayCircle } from "lucide-react"

const TEXT = "Technology · Machinery · Adaptation"
const CHARS = TEXT.split("")

export function Hero() {
  const [displayedCount, setDisplayedCount] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Track scroll position for the scroll-reactive parallax fade effect
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (displayedCount < CHARS.length) {
        timeout = setTimeout(() => {
          setDisplayedCount((prev) => prev + 1)
        }, 80)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 4000)
      }
    } else {
      if (displayedCount > 0) {
        timeout = setTimeout(() => {
          setDisplayedCount((prev) => prev - 1)
        }, 60)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false)
        }, 1200)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedCount, isDeleting])

  return (
    <section className="relative isolate overflow-hidden bg-white pt-20 pb-12 dark:bg-slate-950 sm:pt-36 sm:pb-32 transition-colors duration-300">
      {/* High-contrast background grid + amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_50%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-6rem] sm:top-[-8rem] -z-10 h-[20rem] w-[20rem] sm:h-[32rem] sm:w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[80px] sm:blur-[100px] dark:bg-amber-400/25"
      />

      {/* Scroll-reactive wrapper applying the parallax shift and opacity fade */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
      >
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400"
        >
          NU Trading PLC
        </motion.div>

        {/* Headline with mobile spacing and slow heartbeat pulse */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: [1, 1.015, 1, 1.015, 1] 
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.1 },
            y: { duration: 0.6, delay: 0.1 },
            scale: { 
              duration: 4.0, 
              repeat: Infinity, 
              repeatDelay: 1.0,
              ease: "easeInOut" 
            }
          }}
         className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.2] px-1"
        >
           Advanced machinery solutions
        </motion.h1>

        {/* Dynamic Typing Subheadline with High-Contrast Light/Dark Gradients */}
        <div className="mt-3 sm:mt-6 min-h-[3.2rem] sm:min-h-[5rem] flex items-center justify-center">
          <div className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tight flex flex-wrap justify-center overflow-hidden py-1 px-1">
            <AnimatePresence mode="popLayout">
              {CHARS.slice(0, displayedCount).map((char, i) => {
                const isDivider = char === "·"
                return (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{ duration: 0.4 }}
                    className={
                      isDivider
                        ? "text-amber-600 dark:text-amber-500 inline-block opacity-75 mx-1 sm:mx-2"
                        : "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-500 dark:via-amber-400 dark:to-yellow-300 bg-clip-text text-transparent inline-block font-black"
                    }
                    style={{ whiteSpace: "pre" }}
                  >
                    {char}
                  </motion.span>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons - Optimized for smartphone thumb taps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="#contact"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-400/20 transition-all hover:bg-amber-300 hover:scale-[1.02]"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#services"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 sm:px-8 sm:py-4 text-sm font-semibold text-slate-900 backdrop-blur transition-all hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
          >
            <PlayCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Explore what we do
          </Link>
        </motion.div>

      </motion.div>
    </section>
  )
}