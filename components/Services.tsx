"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  Cpu,
  Settings2,
  Users,
  GraduationCap,
  ClipboardList,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"

interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

const SERVICES: Service[] = [
  {
    icon: Cpu,
    title: "Technology Adaptation",
    description:
      "Assessing, localizing, and integrating new technologies so they fit real manufacturing and business needs.",
    image: "/services/adaptation.png",
  },
  {
    icon: Settings2,
    title: "Installation",
    description:
      "Professional setup and commissioning of machinery and equipment, done right the first time.",
    image: "/services/installation.png",
  },
  {
    icon: Users,
    title: "Recruitment",
    description:
      "Connecting businesses with skilled specialists across manufacturing, machinery, and technical fields.",
    image: "/services/recruitment.png",
  },
  {
    icon: GraduationCap,
    title: "Training",
    description:
      "Hands-on training programs that build lasting technical capability within your team.",
    image: "/services/training.png",
  },
  {
    icon: ClipboardList,
    title: "Business Plan",
    description:
      "Practical, growth-focused business planning tailored to the local market and industry conditions.",
    image: "/services/business-plan.png",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Ongoing maintenance and spare part support to keep your machinery reliable and running.",
    image: "/services/maintenance.png",
  },
]

export function Services() {
  const duplicatedServices = [...SERVICES, ...SERVICES]
  
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Track section scroll progress for the scroll-down exit fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const servicesY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const servicesOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleScroll = () => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    const cards = container.querySelectorAll(".service-card")
    let closestIndex = 0
    let minDistance = Infinity

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const distance = Math.abs(containerCenter - cardCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = idx
      }
    })

    setActiveIndex(closestIndex)
  }

  // Mouse & Touch drag handlers for smooth manual left/right swiping
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
    if (sliderRef.current) {
      setStartX(pageX - sliderRef.current.offsetLeft)
      setScrollLeft(sliderRef.current.scrollLeft)
    }
  }

  const stopDrag = () => {
    setIsDragging(false)
  }

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
    const x = pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Scroll-speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
    handleScroll()
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-white py-20 dark:bg-slate-950 sm:py-32 overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-amber-500/5 blur-[100px] dark:bg-amber-500/10" />

      {/* Scroll-reactive wrapper */}
      <motion.div 
        style={{ y: servicesY, opacity: servicesOpacity }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mb-12 sm:mb-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400">
              What we do
            </span>
            
            <h2 className="mt-3 text-sm sm:text-xl font-normal tracking-tight text-slate-600 dark:text-slate-400 px-2">
              End-to-end support for your entire technology journey.
            </h2>
          </div>
        </div>

        {/* Manual Horizontal Scroll / Swipe Container */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950 dark:to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:to-transparent" />

          <div
            ref={sliderRef}
            onMouseDown={startDrag}
            onMouseLeave={stopDrag}
            onMouseUp={stopDrag}
            onMouseMove={onDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
            onTouchMove={onDrag}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 py-6 sm:py-8 px-6 sm:px-12 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedServices.map((service, index) => {
              const Icon = service.icon
              const isCenter = activeIndex === index

              return (
                <div
                  key={`${service.title}-${index}`}
                  className={`service-card group relative overflow-hidden rounded-2xl border p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between w-[280px] sm:w-[380px] h-[320px] sm:h-[340px] shrink-0 ${
                    isCenter
                      ? "scale-102 sm:scale-105 border-amber-400 bg-slate-900 shadow-2xl shadow-amber-400/20 z-10 ring-2 ring-amber-400/50 text-white"
                      : "border-slate-200/80 bg-white shadow-lg dark:border-white/15 dark:bg-slate-900/60 opacity-95 hover:opacity-100"
                  }`}
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isCenter ? "opacity-90" : "opacity-65 dark:opacity-40 group-hover:opacity-85"}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 280px, 380px"
                      className="object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isCenter ? "from-slate-950/70 via-slate-950/20 to-transparent" : "from-white/90 via-white/50 to-white/20 dark:from-slate-950/90 dark:via-slate-950/50 dark:to-transparent"}`} />
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isCenter 
                        ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/40" 
                        : "bg-amber-400/25 text-amber-700 group-hover:bg-amber-400 group-hover:text-slate-950 dark:bg-amber-400/10 dark:text-amber-400"
                    }`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                    </div>

                    <h3 className={`mt-4 sm:mt-5 text-base sm:text-lg font-bold transition-colors duration-300 ${isCenter ? "text-amber-300" : "text-slate-950 dark:text-white"}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 transition-colors duration-300 ${isCenter ? "text-slate-200" : "text-slate-800 dark:text-slate-300"}`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Ambient border glow when centered */}
                  <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-amber-400/10 to-transparent transition-opacity duration-500 ${isCenter ? "opacity-100" : "opacity-0"}`} />
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}