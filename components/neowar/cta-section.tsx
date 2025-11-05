"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url(/placeholder.svg?height=600&width=1200&query=circuit pattern)",
            backgroundSize: "400px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-balance">READY FOR BATTLE?</h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-balance">
          Join thousands of warriors in the ultimate AI-human conflict. Claim your NFT commander, earn rewards on-chain,
          and become a legend.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-8 py-3 text-lg font-bold bg-cyan-500 text-black hover:bg-cyan-400 neon-border rounded-none group">
            LAUNCH GAME
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="px-8 py-3 text-lg font-bold border-pink-500/50 text-white hover:bg-pink-500/10 neon-border-pink rounded-none bg-transparent"
          >
            WATCH TRAILER
          </Button>
        </div>

        {/* Stats showcase */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {[
            { label: "ACTIVE WARRIORS", value: "50K+" },
            { label: "BATTLES WON", value: "2.3M" },
            { label: "NFT REWARDS", value: "$15M" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-2xl md:text-4xl font-black text-cyan-400 mb-2">{stat.value}</p>
              <p className="text-gray-400 text-xs md:text-sm font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
