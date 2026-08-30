"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

interface Product {
  title: string
  category: string
  imageSrc: string
  description: string
}

const PRODUCTS: Product[] = [
  {
    title: "Industrial Electronics",
    category: "Technology & Automation",
    imageSrc: "/products/electronics.png",
    description: "Advanced controllers and integrated circuitry built for heavy industrial environments.",
  },
  {
    title: "Precision Molds",
    category: "Manufacturing Solutions",
    imageSrc: "/products/mold.png",
    description: "High-tolerance tooling and custom injection molds designed for precise production scaling.",
  },
  {
    title: "Heavy Machinery",
    category: "Industrial Equipment",
    imageSrc: "/products/machine.png",
    description: "Robust, high-efficiency mechanical systems engineered for long-term operational uptime.",
  },
  {
    title: "Spare Parts & Components",
    category: "Maintenance & Support",
    imageSrc: "/products/spare-part.png",
    description: "Original-grade replacement parts and precision-machined gears for seamless upkeep.",
  },
]

export function ProductGrid() {
  const [isPaused, setIsPaused] = useState(false)
  const duplicatedProducts = [...PRODUCTS, ...PRODUCTS]

  return (
    <section id="products" className="relative overflow-hidden bg-slate-950 py-20 sm:py-32 transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[350px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-500">
            Our products & offerings
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-white px-2">
            Technology & Industrial Solutions
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-400 px-2">
            Absorbing, integrating, and applying advanced manufacturing solutions across Africa.
          </p>
        </div>
      </div>

      {/* Horizontal Continuous Marquee Track with Touch/Hover Pause */}
      <div 
        className="relative mt-12 sm:mt-16 w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent" />

        <motion.div
          className="flex gap-4 sm:gap-6 px-4 whitespace-nowrap items-center"
          style={{ width: "max-content" }}
          animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
          transition={
            isPaused
              ? { duration: 0 }
              : {
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25,
                }
          }
        >
          {duplicatedProducts.map((product, index) => (
            <div key={`${product.title}-${index}`} className="w-[300px] shrink-0 sm:w-[380px] whitespace-normal">
              <TiltCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TiltCard({ product }: { product: Product }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-colors hover:border-amber-500/50"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        className="relative mb-5 sm:mb-6 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800/50 bg-slate-950/60 p-4"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative h-24 sm:h-28 w-full"
        >
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 250px, 300px"
            className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-500">
          {product.category}
        </span>
        <h3 className="mt-1 text-base sm:text-lg font-bold text-white transition-colors group-hover:text-amber-400">
          {product.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
          {product.description}
        </p>
      </div>
    </motion.div>
  )
}