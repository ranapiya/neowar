"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GameBoard from "@/components/GameBoard"
import GameOver from "@/components/overlays/GameOver"
import SoundManager from "@/components/SoundManager"
import {
  generateMaze,
  movePlayer,
  updateZombiesFast,
  isPlayerCaught,
  getVisibleTiles,
  type GameState,
} from "@/lib/game-logic"
import WinScreen from "@/components/overlays/WinScreen"
import Header from "@/components/neowar/header"


export default function GamePage() {
  
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [gameStatus, setGameStatus] = useState<"playing" | "over" | "won">("playing")
  const [timeLeft, setTimeLeft] = useState(60)
  const soundManagerRef = useRef<InstanceType<typeof SoundManager> | null>(null)

  // --- Initialize game ---
  const initGame = useCallback(() => {
    const initialState = generateMaze(15, 15, 6) // 6 zombies
    setGameState(initialState)
    setGameStatus("playing")
    setTimeLeft(60)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  // --- Timer ---
  useEffect(() => {
    if (gameStatus !== "playing" || !gameState) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus("over")
          soundManagerRef.current?.playGameOver()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus, gameState])

  // --- Zombie movement (fast) ---
  useEffect(() => {
    if (gameStatus !== "playing" || !gameState) return

    const zombieInterval = setInterval(() => {
      setGameState((prev) => {
        if (!prev) return prev
        const updated = updateZombiesFast(prev) // fast movement
        if (isPlayerCaught(updated)) {
          setGameStatus("over")
          soundManagerRef.current?.playScream()
          return updated
        }
        return updated
      })
    }, 500) // move zombies every 0.5s

    return () => clearInterval(zombieInterval)
  }, [gameStatus, gameState])

  // --- Handle player movement ---
  const handleMove = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (!gameState || gameStatus !== "playing") return

      const newState = movePlayer(gameState, direction)
      if (newState === gameState) {
        soundManagerRef.current?.playWallHit()
        return
      }

      soundManagerRef.current?.playFootstep()
      setGameState(newState)

      // Win check
      if (
        newState.playerPos[0] === newState.exitPos[0] &&
        newState.playerPos[1] === newState.exitPos[1]
      ) {
        setGameStatus("won")
        soundManagerRef.current?.playWin()
      }

      // Player caught
      if (isPlayerCaught(newState)) {
        setGameStatus("over")
        soundManagerRef.current?.playScream()
      }
    },
    [gameState, gameStatus]
  )

  // --- Keyboard controls ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === "arrowup" || key === "w") handleMove("up")
      else if (key === "arrowdown" || key === "s") handleMove("down")
      else if (key === "arrowleft" || key === "a") handleMove("left")
      else if (key === "arrowright" || key === "d") handleMove("right")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleMove])

  if (!gameState)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 text-2xl animate-pulse">Loading graveyard...</div>
      </div>
    )

  const visibleTiles = getVisibleTiles(gameState)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden"
    style={{
    backgroundImage: "url('/mp3.png')", // ← replace with your image path
    
    
  }}>
    <Header/>
     
      <SoundManager ref={soundManagerRef} />

     {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[px]" />

      {/* --- Timer --- */}
      <motion.div
        className={`text-4xl font-bold mb-4 transition-colors ${
          timeLeft <= 10 ? "text-red-500" : "text-green-400"
        }`}
        animate={timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
        style={{
          textShadow: `0 0 20px ${
            timeLeft <= 10 ? "rgba(239, 68, 68, 0.8)" : "rgba(74, 222, 128, 0.8)"
          }`,
        }}
      >
        TIME: {timeLeft}s
      </motion.div>

      {/* --- Game Board --- */}
      <div className="relative z-10 mt-16">
        <GameBoard gameState={gameState} visibleTiles={visibleTiles} />
      </div>

      <p className="text-gray-500 text-sm mt-4">Use Arrow Keys or WASD to move</p>

      {/* --- Overlays --- */}
      <AnimatePresence>
        {gameStatus === "over" && (
          <GameOver
            onRestart={() => {
              const newState = generateMaze(15, 15)
              setGameState(newState)
              setGameStatus("playing")
              setTimeLeft(60)
            }}
          />
        )}
      </AnimatePresence>

      {/* Win overlay */}
      <AnimatePresence>
        {gameStatus === "won" && (
          <WinScreen
            onRestart={() => {
              const newState = generateMaze(15, 15)
              setGameState(newState)
              setGameStatus("playing")
              setTimeLeft(60)
            }}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
