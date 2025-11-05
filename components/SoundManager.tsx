"use client"

import { forwardRef, useImperativeHandle } from "react"

export interface SoundManagerHandle {
  playFootstep: () => void
  playWallHit: () => void
  playZombieGrowl: () => void
  playScream: () => void
  playGameOver: () => void
  playWin: () => void
}

const SoundManager = forwardRef<SoundManagerHandle>((_, ref) => {
  useImperativeHandle(ref, () => ({
    playFootstep: () => playSound("footstep"),
    playWallHit: () => playSound("wallhit"),
    playZombieGrowl: () => playSound("growl"),
    playScream: () => playSound("scream"),
    playGameOver: () => playSound("gameover"),
    playWin: () => playSound("win"),
  }))

  const playSound = (type: string) => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    switch (type) {
      case "footstep":
        playTone(audioContext, 200, 0.1)
        break
      case "wallhit":
        playTone(audioContext, 100, 0.15)
        break
      case "growl":
        playTone(audioContext, 80, 0.2)
        break
      case "scream":
        playScream(audioContext)
        break
      case "gameover":
        playGameOverSound(audioContext)
        break
      case "win":
        playWinSound(audioContext)
        break
    }
  }

  const playTone = (ctx: AudioContext, frequency: number, duration: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  }

  const playScream = (ctx: AudioContext) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3)

    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  }

  const playGameOverSound = (ctx: AudioContext) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5)

    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.5)
  }

  const playWinSound = (ctx: AudioContext) => {
    const notes = [523, 659, 784] // C, E, G
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2)

      osc.start(ctx.currentTime + i * 0.1)
      osc.stop(ctx.currentTime + i * 0.1 + 0.2)
    })
  }

  return null
})

SoundManager.displayName = "SoundManager"

export default SoundManager
