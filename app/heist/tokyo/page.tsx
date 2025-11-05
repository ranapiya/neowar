"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { neoTokyoPuzzles } from "@/lib/geminiT"; // ✅ your puzzle file
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import Header from "@/components/neowar/header";

const TOTAL_TIME = 120; // seconds

export default function GameHeist() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "ai" | "system" | "user"; text: string; timestamp?: string }[]
  >([]);
  const [puzzles, setPuzzles] = useState(() =>
    shuffleArray(neoTokyoPuzzles).slice(0, 5)
  ); // random 5 each run

  const currentPuzzle = puzzles[currentStep];

  // Shuffle Helper
  function shuffleArray<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  // Mission Start / Restart
  function startMission() {
    setStarted(true);
    setFailed(false);
    setSuccess(false);
    setSelected(null);
    setTimeLeft(TOTAL_TIME);
    setMessages([]);
    setCurrentStep(0);
    setPuzzles(shuffleArray(neoTokyoPuzzles).slice(0, 5)); // 🔀 new random set
    pushAiMessage("...IGRIS SYSTEM BOOTING... Deploying SECTOR 1");
    setTimeout(() => {
      pushAiMessage(
        `// SECTOR 1 READY — ${currentPuzzle.difficulty} — Reward: ${currentPuzzle.reward}`
      );
    }, 600);
  }

  // Handle Answer
  function handleSelect(option: string) {
    if (!started || failed || success || selected) return;
    setSelected(option);
    pushUserMessage(`> SELECTED: ${option}`);

    if (option === currentPuzzle.answer) {
      // ✅ Correct — Move ahead
      pushAiMessage("ACCESS GRANTED — Proceeding to next SECTOR...");
      setTimeout(() => {
        if (currentStep + 1 >= puzzles.length) {
          setSuccess(true);
          pushAiMessage("✅ ALL SECTORS CLEARED — MISSION COMPLETE.");
        } else {
          const next = currentStep + 1;
          setCurrentStep(next);
          setSelected(null);
          pushAiMessage(
            `// SECTOR ${next + 1} READY — ${puzzles[next].difficulty} — Reward: ${puzzles[next].reward}`
          );
        }
      }, 900);
    } else {
      // ❌ Wrong — Fail mission, wait for user to restart manually
      pushAiMessage(
        "🚨 ALERT — IGRIS detected infiltration attempt. Alarms raised. Mission compromised."
      );
      setFailed(true);
    }
  }

  // Timer logic
  useEffect(() => {
    if (!started || success || failed) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFailed(true);
          pushSystemMessage("⛔ TIME EXPIRED — Mission Failed.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, success, failed]);

  // Message helpers
  function pushAiMessage(text: string) {
    const ts = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { sender: "ai", text, timestamp: ts }]);
  }
  function pushSystemMessage(text: string) {
    const ts = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { sender: "system", text, timestamp: ts }]);
  }
  function pushUserMessage(text: string) {
    const ts = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { sender: "user", text, timestamp: ts }]);
  }

  // Time format helper
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    
    <div className="min-h-screen w-full bg-black text-white font-sans"
    style={{
    backgroundImage: "url('/2.png')", // ← replace with your image path
    
    
  }}
>
  <Header/>
      {/* Grid background overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(60,13,99,0.2),_transparent_30%),linear-gradient(180deg,#000000,rgba(10,10,10,0.6))]" />
        <div
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px, 60px 60px",
          
          }}
          className="absolute inset-0 opacity-20"
        />
      </div>

      

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8 mt-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 ">
          <div>
            <h1 className="text-4xl font-extrabold">
              <span className="text-cyan-400">Neo-</span>
              <span className="text-cyan-700">Tokyo</span>{" "}
              <span className="text-cyan-400">Vault-Secure by </span>
              <span className="text-emerald-500">IGRIS-AI </span>
            </h1>
            <p className="text-sm text-gray-300">Yakuza International Bank</p>
          </div>

          {/* Top-right HUD */}
          <div className="flex items-center space-x-4">
            <div className="px-3 py-2 rounded-md bg-gradient-to-r from-cyan-700 to-purple-700 text-xs text-white shadow-lg">
              AGENT MODE
            </div>
            <div className="px-3 py-2 rounded-md border border-cyan-600 text-xs text-cyan-200">
              {started ? `TIME: ${formatTime(timeLeft)}` : "TIMER: --:--"}
            </div>
            <Link href="/map">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="p-2 border border-cyan-500/50 rounded hover:bg-cyan-500/10 transition-colors"
            >
              <X className="w-6 h-6 text-cyan-400" />
            </motion.button>
          </Link>
          </div>
        </header>

        {/* Main split layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Mission Briefing */}
          <section className="col-span-8 bg-[rgba(255,255,255,0.02)] border border-cyan-600/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400/90 shadow-[0_0_10px_rgba(60,230,255,0.12)]" />
                  <h3 className="text-lg font-semibold tracking-wide">MISSION BRIEFING</h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  Infiltrate the Neo-Tokyo Vault and extract encrypted assets. The
                  system is protected by sequential IGRIS AI sectors. Solve each sector's
                  puzzle to progress. Stealth is required — alarms cause immediate lockdown.
                </p>

                {/* Mission hero image */}
                <div className="rounded-lg overflow-hidden border border-cyan-800/40 shadow-[inset_0_0_40px_rgba(100,255,240,0.02)] mb-4">
                  <div className="relative w-full h-56">
                    <Image
                      src="/S1.png"
                      alt="Neo-Tokyo"
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  </div>
                </div>

                {/* Mission details */}
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div>
                    <span className="text-xs text-gray-400">Difficulty:</span>{" "}
                    <span className="inline-block px-2 py-1 rounded bg-red-700 text-xs font-semibold text-white ml-2">
                      Expert
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Rewards:</span>{" "}
                    <span className="text-yellow-300 font-semibold ml-2">50,000 cr.</span>
                  </div>
                </div>

                {/* Sector / Puzzle card */}
                {started && !failed && !success && (
                  <div className="mt-6 p-4 rounded-xl border border-purple-700/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),transparent)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-cyan-300">
                          {currentPuzzle.title} — {currentPuzzle.difficulty}
                        </h4>
                        <p className="text-sm text-gray-300">{currentPuzzle.question}</p>
                      </div>
                      <div className="text-right text-sm text-gray-300">
                        <div>Reward</div>
                        <div className="text-yellow-300 font-bold">{currentPuzzle.reward}</div>
                      </div>
                    </div>

                    {/* Options grid */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {currentPuzzle.options.map((opt) => {
                        const active = selected === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            className={`p-3 rounded-lg text-left transition transform  border ${
                              active
                                ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-black"
                                : "bg-[#071019] border-cyan-800/40 hover:scale-[1.02]"
                            }`}
                            aria-pressed={active}
                          >
                            <div className="text-sm font-semibold">{opt}</div>
                            <div className="text-xs text-gray-400 mt-1">Option</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Landing CTA when not started */}
                {!started && (
                  <div className="mt-6">
                    <div className="text-sm text-gray-400 mb-3">
                      Ready to Breach? Press <span className="font-mono px-1 bg-black/30 rounded">Enter</span> or click below.
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={startMission}
                        className="px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_8px_30px_rgba(124,58,237,0.15)]"
                      >
                         Breach IGRIS AI
                      </button>
                      <button
                        onClick={() => {
                          setMessages((prev) => [
                            ...prev,
                            {
                              sender: "system",
                              text: "REPORT: Plan preview opened.",
                              timestamp: new Date().toLocaleTimeString(),
                            },
                          ]);
                        }}
                        className="px-4 py-2 rounded-lg border border-cyan-700 text-cyan-200"
                      >
                        Mission Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* small right column inside left panel: progress + mini hud */}
              <aside className="w-60 ml-6">
                <div className="rounded-lg p-3 border border-cyan-800/20 bg-[#041018]/60 mb-4">
                  <div className="text-xs text-gray-400 mb-2">PROGRESS</div>
                  <div className="w-full h-3 bg-gray-800 rounded overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-red-500 to-cyan-400"
                      style={{ width: `${((currentStep + (started ? 0 : 0)) / puzzles.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-2">{currentStep} / {puzzles.length}</div>
                </div>

                <div className="rounded-lg p-3 border border-purple-700/20 bg-[#041018]/60">
                  <div className="text-xs text-gray-400 mb-2">CURRENT</div>
                  <div className="text-sm font-semibold text-cyan-300">{started ? currentPuzzle.title : "Idle"}</div>
                  <div className="text-xs text-gray-400 mt-2">{started ? currentPuzzle.difficulty : "Awaiting orders"}</div>
                </div>
              </aside>
            </div>
          </section>

          {/* Right: Command Center */}
          <aside className="col-span-4">
            <div className="rounded-xl p-5 h-full border border-purple-700/25 bg-gradient-to-br from-[#0b0b0b]/60 to-[#0b0210]/20 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">COMMAND CENTER</h3>
                <div className="text-xs text-gray-400">IGRIS_CONN • ONLINE</div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    // Execute Plan triggers momentary messages / start
                    if (!started) {
                      startMission();
                    } else {
                      pushSystemMessage("EXECUTE: Plan already in progress.");
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  ⚡BREACH IGRIS AI
                </button>

                <button
                  onClick={() => pushSystemMessage("DEPLOY DRONE: Systems offline (locked).")}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-cyan-800 text-cyan-200 disabled:opacity-50 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  🔒 DEPLOY DRONE
                </button>

                <button
                  onClick={() => pushSystemMessage("HACK SYSTEM: Access level insufficient (locked).")}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-cyan-800 text-cyan-200 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  🔒 HACK SYSTEM
                </button>

                <button
                  onClick={() => {
                    if (confirm("Abort mission? This will reset progress.")) window.location.reload();
                  }}
                  className="w-full px-4 py-3 rounded-lg  text-sm font-semibold border  border-red-600 text-red-400 bg-transparent cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-red-700 hover:text-black"
                >
                  ⛔ ABORT MISSION
                </button>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

              {/* Live Mission Log */}
              <div className="rounded-md p-3 bg-black/40 border border-cyan-900 overflow-auto" style={{ maxHeight: 320 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-cyan-300 font-semibold">MISSION LOG</div>
                  <div className="text-xs text-gray-400">{started ? `T-${formatTime(timeLeft)}` : "T- --:--"}</div>
                </div>

                <div className="space-y-2 text-[13px] text-gray-300">
                  {messages.length === 0 && (
                    <div className="text-gray-500 italic">IGRIS idle — awaiting command.</div>
                  )}
                  {messages.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`w-2 h-2 mt-1 rounded-full ${m.sender === "ai" ? "bg-cyan-400" : m.sender === "user" ? "bg-purple-400" : "bg-amber-400"}`} />
                      <div>
                        <div className="text-[13px] leading-tight">
                          <span className="font-mono text-[11px] text-gray-400 mr-2">[{m.timestamp?.slice(0, 5) ?? ""}]</span>
                          <span className={`${m.sender === "ai" ? "text-cyan-200" : m.sender === "user" ? "text-purple-200" : "text-amber-200"}`}>{m.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* bottom quick stats */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <div>SECTORS: {puzzles.length}</div>
                <div>AGENT: ECHO</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* End modals / overlays */}
      {/* Success / Failed full-screen messages */}
      {success && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="max-w-2xl mx-auto p-8 bg-[linear-gradient(135deg,rgba(0,0,0,0.6),rgba(10,4,22,0.85))] border border-cyan-500/20 rounded-xl text-center drop-shadow-2xl">
            <h2 className="text-5xl font-extrabold text-green-300 mb-3">MISSION SUCCESSFUL</h2>
            <p className="text-gray-300 mb-6">All sectors cleared — vault breached. IGRIS commends your precision.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  // stop confetti and restart
                  setSuccess(false);
                  startMission();
                }}
                className="px-5 py-2 rounded-lg bg-cyan-400 text-black font-semibold"
              >
                REPEAT HEIST
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 rounded-lg border border-cyan-700 text-cyan-200"
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      )}

      {failed && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="max-w-xl mx-auto p-8 bg-[linear-gradient(135deg,rgba(0,0,0,0.6),rgba(10,4,22,0.85))] border border-red-600/20 rounded-xl text-center">
            <h2 className="text-4xl font-extrabold text-red-500 mb-3">MISSION FAILED</h2>
            <p className="text-gray-300 mb-6">Time expired — the vault has been sealed. Retry the mission.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setFailed(false);
                  startMission();
                }}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold"
              >
                RETRY
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 rounded-lg border border-red-600 text-red-400"
              >
                EXIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// small helper to format timer where used inside JSX (function scope)
function formatTime(s: number) {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}
