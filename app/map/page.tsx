"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Crosshair, Home, User, MapPin } from "lucide-react"
import Header from "@/components/neowar/header"

const LOCATIONS = [
  {
    id: "neo-tokyo",
    name: "Neo-Tokyo",
    x: 45,
    y: 35,
    color: "from-cyan-500 to-blue-600",
    difficulty: "Expert",
    rewards: "50,000",
  },
  {
    id: "frostspire",
    name: "Frostspire",
    x: 75,
    y: 25,
    color: "from-blue-400 to-cyan-500",
    difficulty: "Hard",
    rewards: "40,000",
  },
  {
    id: "crimson-dunes",
    name: "Crimson Dunes",
    x: 30,
    y: 60,
    color: "from-orange-500 to-red-600",
    difficulty: "Medium",
    rewards: "30,000",
  },
  {
    id: "solace-bay",
    name: "Solace Bay",
    x: 60,
    y: 70,
    color: "from-purple-500 to-magenta-600",
    difficulty: "Hard",
    rewards: "45,000",
  },
]

export default function MapPage() {
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 })
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isMoving, setIsMoving] = useState(false)

  const handleLocationClick = (location: (typeof LOCATIONS)[0]) => {
    setIsMoving(true)
    setSelectedLocation(location.id)

    setTimeout(() => {
      setAvatarPos({ x: location.x, y: location.y })
      setIsMoving(false)
    }, 1500)
  }

  return (
   <div
  className="relative min-h-screen w-full overflow-hidden bg-background"
  style={{
    backgroundImage: "url('/mp1.png')", // ← replace with your image path
    
    
  }}
>
  <Header/>
  {/* Semi-transparent overlay for better contrast */}
  

      {/* HUD Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 border-b border-cyan-500/30 "
      >
        <div className="flex items-center justify-between px-6 py-4 mt-16">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">AGENT NAME</p>
              <p className="text-lg font-bold text-cyan-300">Echo</p>
            </div>
            <div className="h-8 w-px bg-cyan-500/30"></div>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">LEVEL</p>
                <p className="text-lg font-bold text-purple-300">42</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">CREDITS</p>
                <p className="text-lg font-bold text-orange-300">125,000</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-300">WORLD MAP</span>
          </div>
        </div>
      </motion.div>

      {/* World Map */}
      <div className="relative h-screen w-full pt-20 pb-20 flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-4xl h-96 bg-gradient-to-br from-slate-900/40 to-slate-800/40 border-2 border-cyan-500/50 rounded-lg p-8 bg-glow-cyan"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Map background pattern */}
          <div className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,rgba(100,220,255,0.05)_25%,transparent_25%,transparent_75%,rgba(100,220,255,0.05)_75%,rgba(100,220,255,0.05)),linear-gradient(45deg,rgba(100,220,255,0.05)_25%,transparent_25%,transparent_75%,rgba(100,220,255,0.05)_75%,rgba(100,220,255,0.05))] bg-[size:60px_60px] bg-[position:0_0,30px_30px]"></div>

          {/* Location points */}
          {LOCATIONS.map((location) => (
            <motion.button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="absolute group"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`relative w-16 h-16 bg-gradient-to-br ${location.color} rounded-full flex items-center justify-center cursor-pointer pulse-glow`}
                animate={{
                  boxShadow: [
                    `0 0 10px ${location.color.includes("cyan") ? "rgba(100,220,255,0.5)" : location.color.includes("purple") ? "rgba(180,100,255,0.5)" : location.color.includes("orange") ? "rgba(255,165,0,0.5)" : "rgba(100,150,255,0.5)"}`,
                    `0 0 30px ${location.color.includes("cyan") ? "rgba(100,220,255,0.8)" : location.color.includes("purple") ? "rgba(180,100,255,0.8)" : location.color.includes("orange") ? "rgba(255,165,0,0.8)" : "rgba(100,150,255,0.8)"}`,
                    `0 0 10px ${location.color.includes("cyan") ? "rgba(100,220,255,0.5)" : location.color.includes("purple") ? "rgba(180,100,255,0.5)" : location.color.includes("orange") ? "rgba(255,165,0,0.5)" : "rgba(100,150,255,0.5)"}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Crosshair className="w-6 h-6 text-white" />
              </motion.div>

              {/* Tooltip */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-slate-900/95 border border-cyan-500/50 rounded px-3 py-2 whitespace-nowrap text-center">
                  <p className="text-sm font-bold text-cyan-300">{location.name}</p>
                  <p className="text-xs text-gray-400">
                    {location.difficulty} • {location.rewards} cr.
                  </p>
                </div>
              </div>
            </motion.button>
          ))}

          {/* Player avatar */}
          <motion.div
            className="absolute w-10 h-10 bg-gradient-to-br from-magenta-400 to-pink-600 rounded-full flex items-center justify-center border-2 border-magenta-300 z-10"
            animate={{ x: avatarPos.x, y: avatarPos.y }}
            initial={{ x: avatarPos.x, y: avatarPos.y }}
            transition={{ duration: isMoving ? 1.5 : 0, type: "tween", ease: "easeInOut" }}
            style={{ transform: `translate(calc(-50% + ${avatarPos.x}% - 50%), calc(-50% + ${avatarPos.y}% - 50%))` }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Scanning lines */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY,}}
            style={{
              background:
                "linear-gradient(180deg, rgba(100,220,255,0.1) 0%, transparent 50%, rgba(100,220,255,0.1) 100%)",
              backgroundSize: "100% 200%",
            }}
          />
        </motion.div>
      </div>

      {/* HUD Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 z-20 "
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/50 rounded hover:bg-cyan-500/10 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">BACK TO BASE</span>
            </motion.button>
          </Link>

          {selectedLocation && (
            <Link href={`/heist/${selectedLocation}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <span className="text-sm">PLAN HEIST</span>
              </motion.button>
            </Link>
          )}

          <Link href="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 border border-purple-500/50 rounded hover:bg-purple-500/10 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">PROFILE</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
