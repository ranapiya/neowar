"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const glitchVariants = {
    animate: {
      textShadow: [
        "0 0 10px rgba(200, 255, 240, 0.8), 0 0 20px rgba(100, 220, 255, 0.6)",
        "-2px 0 #ff00ff, 2px 0 #00ffff",
        "0 0 10px rgba(200, 255, 240, 0.8), 0 0 20px rgba(100, 220, 255, 0.6)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,220,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-magenta-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h1
            variants={glitchVariants}
            animate="animate"
            className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400"
          >
            Echo Heist
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-cyan-300 mb-2">
            Enter the Loop
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-16 max-w-2xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            The world&apos;s most secure locations. The greatest heists ever planned.
            <br />
            <span className="text-purple-300">You are the master thief.</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 text-xl font-bold text-background bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover-glow-cyan transition-all duration-300 border-2 border-cyan-400"
            >
              START MISSION
            </motion.button>
          </Link>
        </motion.div>

        {/* Glowing lines decoration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-6 z-10 text-xs text-gray-500">
        <p>Echo Heist v1.0</p>
        <p>Secure Mode: ACTIVE</p>
      </div>
    </div>
  )
}
