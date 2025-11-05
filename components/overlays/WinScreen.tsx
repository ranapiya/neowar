"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface WinScreenProps {
  onRestart: () => void
}

export default function WinScreen({ onRestart }: WinScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-lg z-50 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Glowing green AI pulse */}
      <motion.div
        className="absolute inset-0 bg-green-500/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Container */}
      <motion.div
        className="relative text-center border border-cyan-500/40 rounded-2xl p-10 bg-black/70 shadow-[0_0_40px_rgba(0,255,255,0.2)] max-w-2xl mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        {/* Headline */}
        <motion.h2
          className="text-6xl font-extrabold text-green-400 mb-3 tracking-wider"
          style={{ textShadow: "0 0 40px rgba(34,197,94,0.8)" }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          MISSION COMPLETE
        </motion.h2>

        {/* Subtext */}
        <p className="text-xl text-cyan-300 mb-2 tracking-widest">
          <span className="text-green-400">TUSK AI System</span> neutralized successfully.
        </p>
        <p className="text-lg text-gray-400 mb-10 italic">
          Data vault breached. Secure extraction completed. Outstanding work, operative.
        </p>

        {/* Spark particles (victory effect) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            initial={{
              x: Math.random() * 500 - 250,
              y: 0,
              opacity: 1,
            }}
            animate={{
              y: 400,
              opacity: 0,
              scale: [1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 1,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Buttons */}
        <div className="flex gap-6 justify-center mt-6">
          {/* Replay */}
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-green-500/70 text-green-400 rounded-lg font-semibold hover:bg-green-500/10 transition-all duration-300"
          >
            Replay Mission
          </motion.button>

          {/* Back to map */}
          <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-cyan-500/60 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              Return to Map
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
