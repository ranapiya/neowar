"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { crimsionai, crimsionai as puzzles } from "@/lib/geminiC";
import Header from "@/components/neowar/header";

const TOTAL_TIME = 90; // seconds


export default function CrimsonHeist() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0); // 0..4
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [puzzlesList, setPuzzles] = useState(crimsionai);
  const currentPuzzle = puzzlesList[step];

  const [messages, setMessages] = useState<
    { sender: "ai" | "system" | "user"; text: string; timestamp?: string }[]
  >([]);
  const confettiRef = useRef<HTMLCanvasElement | null>(null);

  

  // Enter starts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !started && !failed && !success) startMission();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, failed, success]);

  // Timer
  useEffect(() => {
    if (!started || failed || success) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setFailed(true);
          pushAiMessage("⛔ CRIMSON AI — ALERT: MISSION TIME EXPIRED. Extraction denied.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, failed, success]);

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

  function startMission() {
  const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
  setStarted(true);
  setStep(0);
  setSelected(null);
  setTimeLeft(TOTAL_TIME);
  setFailed(false);
  setSuccess(false);
  setMessages([]);
  pushAiMessage("... CRIMSON AI — BOOT SEQUENCE INITIATED. Desert Encryption Core online.");
  setTimeout(() => {
    pushAiMessage(`// SECTOR 1 DEPLOYED — ${shuffled[0].difficulty} — Reward: ${shuffled[0].reward}`);
  }, 700);
  setPuzzles(shuffled); // you’ll need a state for puzzles
}


  // ONE WRONG = FAIL
  function handleSelect(option: string) {
    if (!started || selected || failed || success) return;
    setSelected(option);
    pushUserMessage(`> SELECTED: ${option}`);

    // immediate check
    if (option === currentPuzzle.answer) {
      pushAiMessage("ACCESS VERIFIED — Proceeding to next sector...");
      setTimeout(() => {
        if (step + 1 >= puzzles.length) {
          setSuccess(true);
          pushAiMessage("🎉 CRIMSON AI — All sectors neutralized. Extraction greenlit.");
        } else {
          const next = step + 1;
          setStep(next);
          setSelected(null);
          pushAiMessage(`Initializing SECTOR ${next + 1}...`);
          setTimeout(() => {
            pushAiMessage(`// SECTOR ${next + 1} DEPLOYED — ${puzzles[next].difficulty} — Reward: ${puzzles[next].reward}`);
          }, 400);
        }
      }, 900);
    } else {
      // WRONG — immediate failure
      pushAiMessage("⚠️ CRIMSON AI — INTRUSION DETECTED. Countermeasures activated.");
      setFailed(true);
      // optional forensic message
      setTimeout(() => {
        pushAiMessage("Tactical units deployed. Mission terminated.");
      }, 400);
    }
  }

  // format
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-sans text-white"
      style={{
        backgroundImage: "url('/desert-sand-dunes-red-sunset.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header/>
      {/* dark + sand blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/20 to-black/80 pointer-events-none" />

      {/* canvas for sand particles on success */}
      <canvas ref={confettiRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8 mt-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold">
              <span className="text-white">Crimson</span>
              <span className="text-white"> Desert</span>{" "}
              <span className="text-white">Vault</span>
                <span className="text-amber-500">-CRIMSION AI </span>
            </h1>
            <p className="text-sm text-amber-200/80">Crimson Desert Encryption Core</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="px-3 py-2 rounded-md bg-gradient-to-r from-amber-600 to-rose-500 text-xs text-black shadow-md">
              AGENT MODE
            </div>
            <div className="px-3 py-2 rounded-md border border-amber-500 text-xs text-amber-200">
              {started ? `TIME: ${formatTime(timeLeft)}` : "TIMER: --:--"}
            </div>
            <Link href="/map">
              <motion.button whileHover={{ scale: 1.05 }} className="p-2 border border-amber-400/40 rounded hover:bg-amber-400/10">
                <X className="w-6 h-6 text-amber-300" />
              </motion.button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Briefing */}
          <section className="col-span-8 bg-[rgba(0,0,0,0.35)] border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400/90 shadow-[0_0_10px_rgba(255,180,80,0.12)]" />
                  <h3 className="text-lg font-semibold tracking-wide">MISSION BRIEFING</h3>
                </div>

                <p className="text-amber-200/90 mb-4 leading-relaxed">
                  Infiltrate the desert fortress, bypass the CRIMSON AI encryption nodes, and extract the gem vault. One misstep triggers the desert sentinels — mission fails instantly.
                </p>

                {/* fortress map */}
                <div className="rounded-lg overflow-hidden border border-amber-700/20 shadow-[inset_0_0_30px_rgba(255,140,60,0.03)] mb-4">
                  <div className="relative w-full h-56">
                    <Image
                      src="/mp2.png"
                      alt="Crimson Fortress Map"
                      fill
                      className="object-cover opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/60" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-amber-200/80">
                  <div>
                    <span className="text-xs text-amber-200/60">Difficulty:</span>{" "}
                    <span className="inline-block px-2 py-1 rounded bg-rose-700 text-xs font-semibold text-white ml-2">
                      Dangerous
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/60">Rewards:</span>{" "}
                    <span className="text-amber-300 font-semibold ml-2">50,000 cr.</span>
                  </div>
                </div>

                {/* Puzzle card */}
                {started && !failed && !success && (
                  <div className="mt-6 p-4 rounded-xl border border-rose-600/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),transparent)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-amber-300">
                          {currentPuzzle.title} — {currentPuzzle.difficulty}
                        </h4>
                        <p className="text-sm text-amber-100 mt-1">{currentPuzzle.question}</p>
                      </div>
                      <div className="text-right text-sm text-amber-200">
                        <div>Reward</div>
                        <div className="text-amber-300 font-bold">{currentPuzzle.reward}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {currentPuzzle.options.map((opt) => {
                        const active = selected === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            className={`p-3 rounded-lg text-left transition transform border ${
                              active
                                ? "bg-gradient-to-r from-rose-500 to-amber-300 border-transparent text-black"
                                : "bg-[#1b0e06] border-amber-800/30 hover:scale-[1.02]"
                            }`}
                            aria-pressed={active}
                            disabled={!!selected || failed || success}
                          >
                            <div className="text-sm font-semibold">{opt}</div>
                            <div className="text-xs text-amber-200/70 mt-1">Option</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Start CTA */}
                {!started && (
                  <div className="mt-6">
                    <div className="text-sm text-amber-200/70 mb-3">
                      Ready to risk the sands? Press <span className="font-mono px-1 bg-black/30 rounded">Enter</span> or click below.
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={startMission}
                        className="px-6 py-2 rounded-lg text-black font-semibold bg-gradient-to-r from-amber-400 to-rose-500 shadow-[0_8px_30px_rgba(255,140,60,0.12)]"
                      >
                        INITIATE CRIMSON BREACH
                      </button>
                      <button
                        onClick={() => pushSystemMessage("REPORT: Previewing mission plan.")}
                        className="px-4 py-2 rounded-lg border border-amber-700 text-amber-200"
                      >
                        Preview Plan
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* mini HUD */}
              <aside className="w-60 ml-6">
                <div className="rounded-lg p-3 border border-amber-800/20 bg-[#1a0f06]/60 mb-4">
                  <div className="text-xs text-amber-200 mb-2">PROGRESS</div>
                  <div className="w-full h-3 bg-[#0e0a05] rounded overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-rose-500 to-amber-300"
                      style={{ width: `${((step + (started ? 0 : 0)) / puzzles.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-amber-200 mt-2">{step} / {puzzles.length}</div>
                </div>

                <div className="rounded-lg p-3 border border-rose-700/20 bg-[#120b05]/60">
                  <div className="text-xs text-amber-200 mb-2">CURRENT</div>
                  <div className="text-sm font-semibold text-amber-300">{started ? currentPuzzle.title : "Idle"}</div>
                  <div className="text-xs text-amber-200 mt-2">{started ? currentPuzzle.difficulty : "Awaiting orders"}</div>
                </div>
              </aside>
            </div>
          </section>

          {/* Right: Command Center */}
          <aside className="col-span-4">
            <div className="rounded-xl p-5 h-full border border-rose-700/25 bg-gradient-to-br from-[#0b0300]/60 to-[#240b03]/20 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-200">COMMAND CENTER</h3>
                <div className="text-xs text-amber-200">CRIMSON_AI • ONLINE</div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (!started) startMission();
                    else pushSystemMessage("EXECUTE: Mission already in progress.");
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-400 to-rose-500 text-black shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  ⚡ INITIATE BREACH
                </button>

                <button
                  onClick={() => pushSystemMessage("DEPLOY DRONE: Systems offline (locked).")}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-amber-700 text-amber-200 disabled:opacity-50"
                >
                  🔒 DEPLOY DRONE
                </button>

                <button
                  onClick={() => pushSystemMessage("HACK SYSTEM: Limited remote access (locked).")}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-amber-700 text-amber-200"
                >
                  🔒 HACK CORE
                </button>

                <button
                  onClick={() => {
                    if (confirm("Abort mission? This will reset progress.")) window.location.reload();
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm font-semibold border border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  ⛔ ABORT MISSION
                </button>
              </div>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />

              {/* Mission log */}
              <div className="rounded-md p-3 bg-black/30 border border-amber-900 overflow-auto" style={{ maxHeight: 320 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-amber-300 font-semibold">MISSION LOG</div>
                  <div className="text-xs text-amber-200">{started ? `T-${formatTime(timeLeft)}` : "T- --:--"}</div>
                </div>

                <div className="space-y-2 text-[13px] text-amber-100">
                  {messages.length === 0 && <div className="text-amber-200/60 italic">CRIMSON AI idle — awaiting command.</div>}
                  {messages.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`w-2 h-2 mt-1 rounded-full ${m.sender === "ai" ? "bg-amber-300" : m.sender === "user" ? "bg-rose-300" : "bg-yellow-300"}`} />
                      <div>
                        <div className="text-[13px] leading-tight">
                          <span className="font-mono text-[11px] text-amber-200 mr-2">[{m.timestamp?.slice(0,5) ?? ""}]</span>
                          <span className={`${m.sender === "ai" ? "text-amber-100" : m.sender === "user" ? "text-rose-100" : "text-yellow-100"}`}>{m.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-amber-200">
                <div>SECTORS: {puzzles.length}</div>
                <div>AGENT: NOMAD</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Success overlay */}
      {success && (
        <motion.div className="fixed inset-0 z-40 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="max-w-2xl mx-auto p-8 bg-[linear-gradient(135deg,rgba(0,0,0,0.6),rgba(20,6,6,0.85))] border border-amber-400/20 rounded-xl text-center drop-shadow-2xl">
            <h2 className="text-5xl font-extrabold text-amber-300 mb-3">EXTRACTION SUCCESSFUL</h2>
            <p className="text-amber-100 mb-6">CRIMSON AI neutralized — the vault is open. Extraction complete.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  startMission();
                }}
                className="px-5 py-2 rounded-lg bg-amber-300 text-black font-semibold"
              >
                REPEAT HEIST
              </button>
              <button onClick={() => window.location.reload()} className="px-5 py-2 rounded-lg border border-amber-400 text-amber-200">EXIT</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Failed overlay */}
      {failed && (
        <motion.div className="fixed inset-0 z-40 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="max-w-xl mx-auto p-8 bg-[linear-gradient(135deg,rgba(0,0,0,0.6),rgba(40,6,6,0.9))] border border-red-600/30 rounded-xl text-center">
            <h2 className="text-4xl font-extrabold text-red-400 mb-3">MISSION FAILED</h2>
            <p className="text-amber-100 mb-4">CRIMSON AI detected an intrusion — desert sentinels engaged.</p>
            <p className="text-amber-200 italic mb-6">“CRIMSON AI — ENCRYPTION CORE: Intruder neutralized.”</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => { setFailed(false); startMission(); }} className="px-5 py-2 rounded-lg bg-red-600 text-white">RETRY</button>
              <button onClick={() => window.location.reload()} className="px-5 py-2 rounded-lg border border-red-600 text-red-300">EXIT</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// helper
function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}
