"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, Zap, Clock, Target, Home } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("stats")

  const stats = [
    { label: "Total Heists", value: "127", icon: Target },
    { label: "Success Rate", value: "94%", icon: Trophy },
    { label: "Total Credits", value: "487,500", icon: Zap },
    { label: "Time Played", value: "156h", icon: Clock },
  ]

  const achievements = [
    { name: "First Strike", desc: "Complete your first heist", unlocked: true },
    { name: "Master Thief", desc: "Complete 50 heists", unlocked: true },
    { name: "Ghost Protocol", desc: "Never trigger an alarm", unlocked: true },
    { name: "Legendary", desc: "Reach Level 100", unlocked: false },
  ]

  const equipment = [
    { name: "Neural Jammer", desc: "Disables alarms temporarily", level: "Advanced" },
    { name: "Stealth Suit", desc: "Enhanced invisibility tech", level: "Expert" },
    { name: "Hacking Device", desc: "Bypass security systems", level: "Advanced" },
    { name: "Drone Unit", desc: "Aerial reconnaissance tool", level: "Basic" },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,220,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,220,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-radial-gradient opacity-20"></div>
      </div>

      <motion.div
        className="relative z-10 min-h-screen flex flex-col p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-magenta-500"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
          >
            AGENT PROFILE
          </motion.h1>
          <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/50 rounded hover:bg-cyan-500/10 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">BACK TO MAP</span>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Profile panel */}
          <motion.div
            className="col-span-2 border-2 border-cyan-500/50 rounded-lg p-8 bg-slate-900/40 bg-glow-cyan"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Agent hologram */}
            <div className="flex items-start gap-8 mb-8">
              <motion.div
                className="w-32 h-40 bg-gradient-to-br from-purple-500/30 to-magenta-600/30 rounded-lg border-2 border-magenta-500/50 flex items-center justify-center flex-shrink-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  boxShadow: [
                    "0 0 20px rgba(255, 0, 255, 0.3)",
                    "0 0 40px rgba(255, 0, 255, 0.6)",
                    "0 0 20px rgba(255, 0, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="text-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-5xl mb-2">🎭</div>
                  <p className="text-xs text-magenta-300">HOLOGRAM</p>
                </motion.div>
              </motion.div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-cyan-300 mb-2">Echo</h2>
                <p className="text-gray-400 mb-4">Master Infiltrator | Tier: Legendary</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={i}
                        className="bg-slate-800/50 border border-cyan-500/30 rounded p-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs text-gray-500">{stat.label}</span>
                        </div>
                        <p className="text-lg font-bold text-cyan-300">{stat.value}</p>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Level progression */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Level 42</span>
                    <span className="text-sm text-gray-400">Level 43</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded border border-cyan-500/50 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-cyan-500/20">
              {["stats", "achievements", "equipment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-bold transition-colors capitalize ${
                    activeTab === tab ? "text-cyan-300 border-b-2 border-cyan-400" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {activeTab === "stats" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded p-4 border border-purple-500/30">
                      <p className="text-xs text-gray-500 mb-2">Avg. Completion Time</p>
                      <p className="text-2xl font-bold text-purple-300">12m 34s</p>
                    </div>
                    <div className="bg-slate-800/30 rounded p-4 border border-purple-500/30">
                      <p className="text-xs text-gray-500 mb-2">Fastest Heist</p>
                      <p className="text-2xl font-bold text-purple-300">3m 12s</p>
                    </div>
                    <div className="bg-slate-800/30 rounded p-4 border border-purple-500/30">
                      <p className="text-xs text-gray-500 mb-2">Stealth Ratio</p>
                      <p className="text-2xl font-bold text-purple-300">87%</p>
                    </div>
                    <div className="bg-slate-800/30 rounded p-4 border border-purple-500/30">
                      <p className="text-xs text-gray-500 mb-2">Total Alarms</p>
                      <p className="text-2xl font-bold text-purple-300">18</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded border ${
                        achievement.unlocked
                          ? "bg-cyan-500/10 border-cyan-500/50"
                          : "bg-slate-800/30 border-slate-600/50 opacity-50"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-lg ${
                            achievement.unlocked ? "bg-cyan-500/30" : "bg-slate-700/30"
                          }`}
                        >
                          {achievement.unlocked ? "⭐" : "🔒"}
                        </div>
                        <div>
                          <p className={`font-bold ${achievement.unlocked ? "text-cyan-300" : "text-gray-400"}`}>
                            {achievement.name}
                          </p>
                          <p className="text-xs text-gray-500">{achievement.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "equipment" && (
                <div className="space-y-4">
                  {equipment.map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-slate-800/30 border border-magenta-500/30 rounded p-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-magenta-300">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            item.level === "Expert"
                              ? "bg-red-500/30 text-red-300"
                              : item.level === "Advanced"
                                ? "bg-orange-500/30 text-orange-300"
                                : "bg-yellow-500/30 text-yellow-300"
                          }`}
                        >
                          {item.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            className="border-2 border-magenta-500/50 rounded-lg p-6 bg-slate-900/40 bg-glow-magenta h-fit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-magenta-300 mb-4">RECENT ACTIVITY</h3>
            <div className="space-y-3">
              {[
                { time: "2m ago", action: "Completed Neo-Tokyo Vault" },
                { time: "15m ago", action: "Earned 50,000 credits" },
                { time: "1h ago", action: "Unlocked Master Thief", highlight: true },
                { time: "3h ago", action: "Reached Level 42" },
                { time: "5h ago", action: "Completed Solace Bay" },
              ].map((activity, i) => (
                <motion.div
                  key={i}
                  className={`text-sm py-2 border-l-2 pl-3 ${
                    activity.highlight ? "border-cyan-400 text-cyan-300" : "border-gray-600 text-gray-400"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <p>{activity.action}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
