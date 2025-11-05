"use client"

import { Facebook, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-background/50 backdrop-blur-sm py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-black text-lg mb-2 glow-text">NEOWAR</h3>
            <p className="text-gray-400 text-sm">Built by Agents. Fought by Humans.</p>
          </div>

          {/* Links */}
          {[
            { title: "GAME", links: ["Play", "Community", "Roadmap"] },
            { title: "ABOUT", links: ["Team", "Blog", "Press"] },
            { title: "LEGAL", links: ["Terms", "Privacy", "Cookies"] },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-sm mb-4 text-cyan-400">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyan-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-mono">© 2087 NEOWAR — Powered by AI & Web3</p>

          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { icon: Twitter, label: "X" },
              { icon: Facebook, label: "Discord" },
              { icon: Github, label: "GitHub" },
            ].map((social, idx) => {
              const Icon = social.icon
              return (
                <a
                  key={idx}
                  href="#"
                  className="p-2 text-gray-400 hover:text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/60 rounded transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
