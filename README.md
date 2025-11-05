# NeoWar - THE AI UPRISING

**NeoWar** is a futuristic, immersive heist game set in a cyberpunk Neo Tokyo world. Players must solve puzzles, decrypt codes, and complete missions under time pressure. Integrated with AI-driven mission logs (IGRIS) and interactive UI, NeoWar combines Web2 and Web3 elements for a modern gaming experience.

---

## 🕹️ Features

* **Mission-Based Gameplay**

  * Solve puzzles across multiple levels (MCQ and logic-based).
  * Each wrong answer triggers mission failure; players must manually restart.
  * Time-limited missions with a global countdown.

* **Dynamic Puzzle System**

  * Randomized puzzles on each mission start.
  * 20+ levels of increasing difficulty.
  * NeoTokyo-themed logic, coding, and math puzzles.

* **IGRIS AI System**

  * Fake AI assistant providing immersive mission logs.
  * Alerts on mission success, failure, and critical events.

* **Visual & UX**

  * Neon gradients, cyberpunk theme, and futuristic UI.
  * Confetti on mission success.
  * Responsive and immersive layouts.

* **Web3 Integration**

  * Optional on-chain leaderboard (planned or implemented via Wagmi + AppKit).

* **Timer & Alerts**

  * Real-time countdown for missions.
  * Alerts for mission failure, time expiry, or incorrect answers.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 13, React 18, TypeScript, TailwindCSS
* **UI/UX & Animations:** Framer Motion, Lucide Icons, Next/Image
* **Web3:** Wagmi, Reown AppKit (Wallet integration)
* **Blockchain (optional):** Solidity + Foundry (for on-chain leaderboards)
* **State & Context:** React Context API
* **Deployment & Analytics:** Vercel + Vercel Analytics

---

## 📂 Project Structure

```
app/
 ├─ game-heist/             # Game pages
 ├─ layout.tsx              # Main layout with header
 ├─ globals.css             # Global styles
components/
 ├─ Header.tsx              # Fixed header component
lib/
 ├─ geminiT.ts              # NeoTokyo puzzles
context/
 ├─ index.tsx               # ContextProvider for global state
```

---

## ⚡ Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/neowar.git
cd neowar
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn
```

3. **Run development server**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---

## 🎮 Usage

* Click **START MISSION** to begin the game.
* Select the correct answers for each puzzle.
* Wrong answers or time expiry triggers mission failure.
* Click **RESTART MISSION** to try again with new randomized puzzles.
* Follow the IGRIS AI log for hints, status, and alerts.

---

## 📝 Notes

* Puzzles are randomized on each manual restart to ensure unique gameplay.
* Header is fixed; content is padded to avoid overlap.
* Logo is configurable via `metadata` and shows in browser tab and social previews.

---

## 📈 Future Improvements

* Integrate **on-chain leaderboard** with Solidity + Wagmi.
* Add more puzzles and levels with increasing difficulty.
* Add **sound effects** and **alarm animations** for failed missions.
* Optimize mobile experience with responsive header and menu.

---

## 🌐 Links

* **Demo:** [Live Preview URL]
* **Repository:** [GitHub Repo URL]
* **Logo / Metadata:** `https://your-logo-url.com/logo.png`


---

## 📄 License

This project is licensed under the MIT License.
