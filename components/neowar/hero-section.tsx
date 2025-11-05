"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const battlegrounds = [
  { name: "NEO CITY", image: "url(/cyber-city-neon-tokyo-skyline.jpg)" },
  { name: "DUNE BASE", image: "url(/desert-sand-dunes-red-sunset.jpg)" },
  { name: "QUANTUM CORE", image: "url(/futuristic-ocean-platform-floating-city.jpg)" },
]

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % battlegrounds.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Dynamic cycling backgrounds */}
        {battlegrounds.map((bg, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: bg.image,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentBg === idx ? 0.3 : 0,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

        {/* Animated grid effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
        {/* Location indicator */}
        <div className="mb-8 text-center animate-slide-in-up">
          <p className="text-cyan-400 text-sm font-mono tracking-widest">[{battlegrounds[currentBg].name}]</p>
        </div>

        {/* Main title with parallax */}
        <div
          className="text-center mb-6 animate-slide-in-up"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          <h1 className="text-6xl md:text-8xl font-black leading-tight text-balance">
            <span className="glow-text">NEOWAR:</span>
            <br />
            <span className="glow-text-strong">THE AI UPRISING</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-gray-300 text-base md:text-xl mb-12 max-w-2xl text-center text-balance animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
        Humanity final stand against sentient AI. Every choice, every line of code — written on the blockchain of war.
        </p>

        {/* CTA Button with glow effect */}
        <div >
         <Link href="/map" passHref>
        <Button
          className="
                     transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] cursor-pointer
                     hover:scale-105"
        >
          <span className="relative z-10">ENTER THE WARZONE</span>
          {/* Subtle animated glow overlay */}
         
        </Button>
      </Link>
        </div>

       
      </div>
    </section>
  )
}
