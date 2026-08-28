import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { About } from "@/components/About"
import { Products } from "@/components/Products"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Hero />
      <Services />
      <About />
      <Products />
      <Footer />
    </div>
  )
}