"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Phone, Mail, MapPin } from "lucide-react"

const SISTER_COMPANIES = [
  { name: "Sister Company One", src: "/logos/company-1.png" },
  { name: "Sister Company Two", src: "/logos/company-2.png" },
  { name: "Sister Company Three", src: "/logos/company-3.png" },
  { name: "Sister Company Four", src: "/logos/company-4.png" },
  { name: "Sister Company Five", src: "/logos/company-5.png" },
]

const CONTACT = {
  phone: "+251 911 XXXXXX",
  phoneHref: "tel:+251911XXXXXX",
  email: "info@nutradingplc.com",
  emailHref: "mailto:info@nutradingplc.com",
  location: "Addis Ababa, Ethiopia",
}

export function Footer() {
  const duplicatedCompanies = [...SISTER_COMPANIES, ...SISTER_COMPANIES]

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Sister companies animated marquee */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Part of our group & partner network
          </p>

          <div className="relative mt-8 w-full overflow-hidden">
            {/* Fade gradients on the edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

            <motion.div
              className="flex items-center gap-16 py-6"
              animate={{ x: ["-50%", "0%"] }} // Left to right movement direction
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="relative h-28 w-60 shrink-0 transition-transform duration-300 hover:scale-110" // Larger logo sizing
                >
                  <Image
  src={company.src}
  alt={company.name}
  fill
  sizes="240px"
  loading="lazy" // <--- Add this line
  className="object-contain filter dark:brightness-125 transition-all duration-300"
/>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Contact info + Copyright */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-slate-200 pt-10 dark:border-white/10 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.emailHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
            >
              <Mail className="h-4 w-4 text-amber-500" />
              {CONTACT.email}
            </a>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4 text-amber-500" />
              {CONTACT.location}
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 dark:text-slate-500 sm:text-right">
            Copyright &copy; {new Date().getFullYear()} NU Trading PLC. All rights reserved. | Powered by We Tech ICT Solution
          </p>
        </div>
      </div>
    </footer>
  )
}