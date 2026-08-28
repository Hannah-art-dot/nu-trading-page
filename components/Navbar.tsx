"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "motion/react"
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Complex ScrollCraft Logo scaling logic
  const entranceScale = useMotionValue(2.6) 
  const hoverScale = useMotionValue(1)

  const { scrollY } = useScroll()
  const scrollScale = useTransform(scrollY, [0, 100], [1, 0.85])

  const logoScale = useTransform(
    [entranceScale, scrollScale, hoverScale],
    ([entrance, scroll, hover]: number[]) => entrance * scroll * hover
  )

  React.useEffect(() => {
    const controls = animate(entranceScale, 1, {
      type: "spring",
      stiffness: 120,
      damping: 7,
      mass: 1.5,
      delay: 1.2, 
    })
    return () => controls.stop()
  }, [entranceScale])

  const popHover = () =>
    animate(hoverScale, 1.08, { type: "spring", stiffness: 400, damping: 12 })
  const popTapDown = () =>
    animate(hoverScale, 0.92, { type: "spring", stiffness: 500, damping: 15 })
  const resetPop = () =>
    animate(hoverScale, 1, { type: "spring", stiffness: 400, damping: 14 })

  // Avoid theme-toggle hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Add shadow/opacity once the page has been scrolled
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/70"
          : "border-b border-transparent bg-white/0 dark:bg-slate-950/0"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Animated logo */}
        <Link
          href="/"
          className="relative flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
          aria-label="NU Trading PLC home"
        >
          <motion.div
            initial={{ y: -520, opacity: 0, rotate: -1080 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              y: { type: "spring", stiffness: 100, damping: 10, mass: 2.5, delay: 0.15 },
              rotate: { type: "tween", ease: "circOut", duration: 2.5, delay: 0.15 },
              opacity: { duration: 0.8, delay: 0.15 },
            }}
            style={{ scale: logoScale }}
            onHoverStart={popHover}
            onHoverEnd={resetPop}
            onTapStart={popTapDown}
            onTap={resetPop}
            className="relative flex origin-center items-center group"
          >
            {/* Ambient amber glow behind logo on hover */}
            <div className="absolute -inset-2 z-0 rounded-full bg-amber-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <Image
              src="/logo.png"
              alt="NU Trading PLC"
              width={200}
              height={60}
              priority
              className="relative z-10 h-12 w-auto object-contain drop-shadow-lg lg:h-16"
            />
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle mounted={mounted} resolvedTheme={resolvedTheme} onToggle={toggleTheme} />

            <Link
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle mounted={mounted} resolvedTheme={resolvedTheme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pb-6 pt-2 sm:px-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
                >
                  Get in touch
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ThemeToggle({
  mounted,
  resolvedTheme,
  onToggle,
}: {
  mounted: boolean
  resolvedTheme: string | undefined
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition-colors hover:border-amber-500/50 hover:text-amber-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      {!mounted ? (
        <span className="h-5 w-5" />
      ) : resolvedTheme === "light" ? (
        <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  )
}