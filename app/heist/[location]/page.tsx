"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, AlertCircle, Zap, Lock, X } from "lucide-react"
import { useParams } from "next/navigation"

const HEIST_DATA: Record<string, any> = {
  "neo-tokyo": {
    name: "Neo-Tokyo Vault",
    target: "Yakuza International Bank",
    difficulty: "Expert",
    rewards: "50,000",
    image: "/cyber-city-neon-tokyo-skyline.jpg",
    briefing:
      "Infiltrate the most advanced security system in the Pacific. The vault contains encrypted data worth a fortune. Be stealthy—alarms mean instant lockdown.",
  },
  frostspire: {
    name: "Frostspire Expedition",
    target: "Arctic Research Vault",
    difficulty: "Hard",
    rewards: "40,000",
    image: "/arctic-ice-palace-frozen-vault.jpg",
    briefing:
      "The research facility lies in the harshest climate on Earth. Extreme temperatures and automated defenses protect priceless artifacts.",
  },
  "crimson-dunes": {
    name: "Crimson Dunes Raid",
    target: "Desert Outpost",
    difficulty: "Medium",
    rewards: "30,000",
    image: "/desert-sand-dunes-red-sunset.jpg",
    briefing:
      "A remote outpost in the Sahara holds rare gems. Limited guards and predictable patrol patterns make this an ideal entry point.",
  },
  "solace-bay": {
    name: "Solace Bay Infiltration",
    target: "Floating Ocean Platform",
    difficulty: "Hard",
    rewards: "45,000",
    image: "/futuristic-ocean-platform-floating-city.jpg",
    briefing:
      "A high-tech floating facility over international waters. Neutralize security and extract the target before naval reinforcements arrive.",
  },
}

export default function HeistPage() {
  const params = useParams()
  const location = params?.location as string
  const heistInfo = HEIST_DATA[location] || HEIST_DATA["neo-tokyo"]

  const [missionStatus, setMissionStatus] = useState("briefing") // briefing, active, success, failed
  const [progress, setProgress] = useState(0)
  const [credits, setCredits] = useState(0)
  const [showBriefing, setShowBriefing] = useState(true)

  useEffect(() => {
    if (missionStatus === "active") {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setMissionStatus("success")
            return 100
          }
          return p + Math.random() * 15 + 5
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [missionStatus])

  const handleExecutePlan = () => {
    setShowBriefing(false)
    setMissionStatus("active")
  }

  const handleSuccess = () => {
    setCredits(Number.parseInt(heistInfo.rewards))
    setMissionStatus("success")
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,220,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,220,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {heistInfo.name}
            </h1>
            <p className="text-gray-400 mt-2">{heistInfo.target}</p>
          </motion.div>
          <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 border border-cyan-500/50 rounded hover:bg-cyan-500/10 transition-colors"
            >
              <X className="w-6 h-6 text-cyan-400" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Mission briefing */}
          <motion.div
            className="col-span-2 border-2 border-cyan-500/50 rounded-lg p-6 bg-slate-900/40 bg-glow-cyan"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-cyan-300">MISSION BRIEFING</h2>
            </div>

            {showBriefing && (
              <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.p
                  className="text-gray-300 leading-relaxed text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {heistInfo.briefing}
                </motion.p>
              </motion.div>
            )}

            {/* Environment image */}
            <motion.div
              className="relative w-full h-48 bg-slate-800 rounded border border-purple-500/30 overflow-hidden mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={heistInfo.image || "/placeholder.svg"}
                alt={heistInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </motion.div>

            {/* Difficulty badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">Difficulty:</span>
                <span
                  className={`px-3 py-1 rounded font-bold text-sm ${
                    heistInfo.difficulty === "Expert"
                      ? "bg-red-600/30 text-red-300"
                      : heistInfo.difficulty === "Hard"
                        ? "bg-orange-600/30 text-orange-300"
                        : "bg-yellow-600/30 text-yellow-300"
                  }`}
                >
                  {heistInfo.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">Rewards:</span>
                <span className="text-lg font-bold text-orange-300">{heistInfo.rewards} cr.</span>
              </div>
            </div>
          </motion.div>

          {/* Dashboard */}
          <motion.div
            className="border-2 border-magenta-500/50 rounded-lg p-6 bg-slate-900/40 bg-glow-magenta flex flex-col gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-bold text-magenta-300 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              COMMAND CENTER
            </h2>

            <div className="flex-1 flex flex-col gap-3">
              <button
                onClick={handleExecutePlan}
                disabled={missionStatus !== "briefing"}
                className={`w-full py-3 rounded font-bold flex items-center justify-center gap-2 transition-all ${
                  missionStatus === "briefing"
                    ? "bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
                    : "bg-slate-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Zap className="w-4 h-4" />
                EXECUTE PLAN
              </button>

              <button
                disabled
                className="w-full py-2 rounded text-sm border border-purple-500/50 text-gray-400 hover:bg-purple-500/10 transition-colors disabled:opacity-50"
              >
                <Lock className="w-4 h-4 inline mr-2" />
                DEPLOY DRONE
              </button>

              <button
                disabled
                className="w-full py-2 rounded text-sm border border-purple-500/50 text-gray-400 hover:bg-purple-500/10 transition-colors disabled:opacity-50"
              >
                <Lock className="w-4 h-4 inline mr-2" />
                HACK SYSTEM
              </button>

              <button
                onClick={() => setMissionStatus("failed")}
                disabled={missionStatus === "briefing"}
                className={`w-full py-2 rounded text-sm border border-red-500/50 transition-colors ${
                  missionStatus !== "briefing"
                    ? "text-red-300 hover:bg-red-500/10 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                ABORT MISSION
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mission log */}
        <motion.div
          className="border-2 border-cyan-500/50 rounded-lg p-6 bg-slate-900/40"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-cyan-300 mb-4">MISSION LOG</h2>
          <div className="space-y-2">
            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              &gt; Agent Echo connected to mission control
            </motion.p>
            {missionStatus !== "briefing" && (
              <>
                <motion.p
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  &gt; Security systems: SCANNING...
                </motion.p>
                <motion.p
                  className="text-sm text-cyan-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  &gt; Infiltration Progress: {Math.floor(progress)}%
                </motion.p>
              </>
            )}
          </div>

          {/* Progress bar */}
          {missionStatus === "active" && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Mission Progress</span>
                <span className="text-sm font-bold text-cyan-300">{Math.floor(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded border border-cyan-500/50 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Success state */}
        {missionStatus === "success" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="border-2 border-cyan-400/80 rounded-lg p-12 bg-slate-900/95 text-center max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
            >
              <motion.h2
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                INFILTRATION PLAN SUCCESS
              </motion.h2>
              <p className="text-gray-300 mb-6">Target acquired. Extraction complete.</p>
              <div className="bg-slate-800/50 rounded p-4 mb-6 border border-green-500/30">
                <p className="text-sm text-gray-400">Credits Agent will  Earned</p>
                <p className="text-3xl font-bold text-green-400">1 million.</p>
              </div>
              <Link href="/heist/tokyo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  START MISSION
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Failed state */}
        {missionStatus === "failed" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="border-2 border-red-400/80 rounded-lg p-12 bg-slate-900/95 text-center max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
            >
              <h2 className="text-4xl font-bold text-red-400 mb-4">MISSION FAILED</h2>
              <p className="text-gray-300 mb-6">Security systems detected. Abort engaged.</p>
              <Link href="/map">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                >
                  RETURN TO BASE
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
