"use client"

import { Brain, Zap, Coins, Cpu, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Agents that Learn",
    description: "Smart enemies adapt and evolve every battle, providing unprecedented challenge.",
  },
  {
    icon: Zap,
    title: "Dynamic Realms",
    description: "Switch between Dune wastelands, Cyber City skylines, and Quantum vault missions.",
  },
  {
    icon: Coins,
    title: "Web3 Integrated",
    description: "Wallet-based progression, NFT rewards, and AI contract events.",
  },
  {
    icon: Cpu,
    title: "On-Chain Intelligence",
    description: "Real AI-driven decisions influencing the story on the blockchain.",
  },
  {
    icon: Users,
    title: "Team Operations",
    description: "Form squads with real players or AI commanders to dominate the battlefield.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-balance mb-4">
            <span className="glow-text">STRATEGIC</span> WARFARE FEATURES
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto" />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group relative p-6 bg-card/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:to-pink-500/10 rounded-lg transition-colors duration-300" />

                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-cyan-500/10 group-hover:bg-cyan-500/20 w-fit rounded-lg transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
