"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { GameState } from "@/lib/game-logic"
import Header from "./neowar/header"

interface GameBoardProps {
  gameState: GameState
  visibleTiles: Set<string>
}

export default function GameBoard({ gameState, visibleTiles }: GameBoardProps) {
  const TILE_SIZE = 90
  const GRID_SIZE = gameState.maze.length

  const getTileContent = (row: number, col: number) => {
    if (gameState.playerPos[0] === row && gameState.playerPos[1] === col)
      return { type: "player", src: "/th.jpg" } // thief
    if (gameState.exitPos[0] === row && gameState.exitPos[1] === col)
      return { type: "exit", src: "/diamond.jpg" } // heist target
    if (gameState.zombies.some((z) => z[0] === row && z[1] === col))
      return { type: "enemy", src: "/com.jpg" } // commandos
    if (gameState.maze[row][col] === 1)
      return { type: "wall", src: "/alarm.jpg" } // security walls
    return null
  }

  const isVisible = (row: number, col: number) => visibleTiles.has(`${row},${col}`)

  return (
    <div
      className="relative font-sans border border-cyan-400/30 rounded-xl overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,rgba(0,0,0,0.9)_100%)] backdrop-blur-md"
      style={{
        width: GRID_SIZE * TILE_SIZE,
        height: GRID_SIZE * TILE_SIZE,
        boxShadow: "0 0 30px rgba(0,255,255,0.2), inset 0 0 20px rgba(255,0,255,0.1)",
      }}
    >
      <Header/>
      {/* Maze Background Grid */}
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => (
          <motion.div
            key={`cell-${row}-${col}`}
            className="absolute border border-cyan-500/10 rounded"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              left: col * TILE_SIZE,
              top: row * TILE_SIZE,
              backgroundColor: "rgba(0,10,20,0.4)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible(row, col) ? 1 : 0.1 }}
            transition={{ duration: 0.3 }}
          />
        ))
      )}

      {/* Game Entities */}
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => {
          const content = getTileContent(row, col)
          if (!content) return null

          const baseStyle = {
            width: TILE_SIZE * 0.75,
            height: TILE_SIZE * 0.75,
            left: col * TILE_SIZE + TILE_SIZE * 0.125,
            top: row * TILE_SIZE + TILE_SIZE * 0.125,
          }

          return (
            <motion.div
              key={`entity-${row}-${col}`}
              className="absolute flex items-center justify-center"
              style={{
                ...baseStyle,
                opacity: isVisible(row, col) ? 1 : 0.25,
                filter:
                  content.type === "enemy"
                    ? "drop-shadow(0 0 10px rgba(255,50,50,0.8))"
                    : content.type === "player"
                    ? "drop-shadow(0 0 12px rgba(0,255,255,0.8))"
                    : content.type === "exit"
                    ? "drop-shadow(0 0 12px rgba(255,255,0,0.8))"
                    : "drop-shadow(0 0 5px rgba(255,0,255,0.3))",
              }}
              animate={
                content.type === "enemy"
                  ? { y: [0, 3, -3, 0] }
                  : content.type === "player"
                  ? { scale: [1, 1.1, 1] }
                  : content.type === "exit"
                  ? { opacity: [0.8, 1, 0.8] }
                  : {}
              }
              transition={{
                duration:
                  content.type === "enemy"
                    ? 0.8
                    : content.type === "player"
                    ? 1
                    : 1.2,
                repeat: Infinity,
              }}
            >
              <Image
                src={content.src}
                alt={content.type}
                width={TILE_SIZE * 0.7}
                height={TILE_SIZE * 0.7}
                className="object-contain rounded-md"
              />
            </motion.div>
          )
        })
      )}

      {/* Glow overlay for cinematic look */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-transparent pointer-events-none" />
    </div>
  )
}
