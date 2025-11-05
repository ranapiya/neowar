import HeroSection from "@/components/neowar/hero-section"
import FeaturesSection from "@/components/neowar/features-section"
import CtaSection from "@/components/neowar/cta-section"
import Footer from "@/components/neowar/footer"
import Header from "@/components/neowar/header"

export default function Page() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      <Header/>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
