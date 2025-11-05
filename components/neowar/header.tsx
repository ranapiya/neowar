"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ConnectButton from "../connectButton"

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-black/0 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 ">
        
       {/* Logo / Brand */}
<Link href="/" className="flex items-center space-x-3">
  <motion.div
    className="flex items-center space-x-3"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <Image
      src="/logo.png"
      alt="NeoWar Logo"
      width={48}
      height={48}
      className="rounded-sm"
      priority
    />
    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-widest">
      NeoWar
    </h1>
  </motion.div>
</Link>

       

        {/* Wallet Connect Button */}
        <div className="ml-auto flex items-center space-x-3">
         

          {/* Wallet Connect */}
          <div className="scale-95 hover:scale-100 transition-transform duration-300">
            <ConnectButton/>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
