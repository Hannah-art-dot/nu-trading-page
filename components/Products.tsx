"use client"

import * as React from "react"
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
  {
    title: "Precision Molds",
    category: "Manufacturing Solutions",
    imageSrc: "/products/mold.png",
    description: "High-tolerance tooling and custom injection molds designed for precise production scaling.",
  },
]

export function Products() {
  // Duplicate array to create a seamless infinite horizontal loop
  const duplicatedProducts = [...PRODUCTS, ...PRODUCTS]

  return (
    <section id="products" className="relative overflow-hidden bg-white py-24 dark:bg-slate-950 sm:py-32 transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[100px] dark:bg-amber-500/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Our products & offerings
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Technology & Industrial Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Absorbing, integrating, and applying advanced manufacturing solutions across Africa.
          </p>
        </div>
      </div>

      {/* Horizontal Continuous Marquee Track */}
      <div className="relative mt-16 w-full overflow-hidden">
        {/* Left/Right Fade Gradients for smooth clipping matching section background */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-slate-950 dark:to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:to-transparent" />

        <motion.div
          className="flex gap-6 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25, // Adjust speed here (higher is slower)
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div key={`${product.title}-${index}`} className="w-[350px] shrink-0 sm:w-[380px]">
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

  // Spring physics for smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  // Map mouse position to rotation degrees
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
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xl backdrop-blur-xl transition-colors hover:border-amber-500/50 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-2xl"
    >
      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 3D Popping Image Container */}
      <div
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        className="relative mb-6 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800/50 dark:bg-slate-950/60"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="400px"
            className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* 3D Popping Text Content */}
      <div style={{ transform: "translateZ(30px)" }}>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-950 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {product.description}
        </p>
      </div>
    </motion.div>
  )
}