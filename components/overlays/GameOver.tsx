"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"

interface GameOverProps {
  onRestart: () => void
}

export default function GameOver({ onRestart }: GameOverProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-lg z-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Pulsing red danger layer */}
      <motion.div
        className="absolute inset-0 bg-red-700/30"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main container */}
      <motion.div
        className="relative text-center border border-cyan-500/40 rounded-2xl p-10 bg-black/70 shadow-[0_0_35px_rgba(0,255,255,0.2)] max-w-2xl mx-auto"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Headline */}
        <motion.h2
          className="text-6xl font-extrabold text-red-500 mb-3 tracking-wider"
          style={{ textShadow: "0 0 40px rgba(255,0,0,0.6)" }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          MISSION FAILED
        </motion.h2>

        {/* Subtext */}
        <p className="text-xl text-cyan-300 mb-2 tracking-widest">
          ALERT: <span className="text-red-400">TUSK AI Commando</span> has intercepted your signal.
        </p>
        <p className="text-lg text-gray-400 mb-10 italic">
          Neural trace confirmed. Extraction team deployed. You’ve been caught.
        </p>

        {/* Glitch animation overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [0, 2, -2, 0],
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-500/10 to-cyan-500/10 mix-blend-overlay" />
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center mt-6">
          {/* Retry */}
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-cyan-500/70 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300"
          >
            Retry Mission
          </motion.button>

          {/* Return to map */}
          <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-red-500/60 text-red-400 rounded-lg font-semibold hover:bg-red-600/10 transition-all duration-300 flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Abort Heist
            </motion.button>
          </Link>

          {/* Main menu */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-500/40 text-gray-300 rounded-lg font-semibold hover:bg-gray-700/30 transition-all duration-300"
            >
              Main Menu
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
