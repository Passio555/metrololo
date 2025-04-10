
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Star, Pizza, PartyPopper, BowlingBall, Gamepad2, Sparkles } from "lucide-react";

function Button({ children, onClick, className = "", variant = "default" }) {
  const base = variant === "default" ? "bg-black text-white" : "border border-black text-black";
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl transition-transform hover:scale-105 ${base} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow-lg ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export default function App() {
  const [section, setSection] = useState("accueil");
  const [score, setScore] = useState(0);
  const [showStrike, setShowStrike] = useState(false);
  const [showPins, setShowPins] = useState(false);
  const strikeSoundRef = useRef(null);

  const sections = [
    { key: "accueil", label: "Accueil" },
    { key: "tarifs", label: "Tarifs" },
    { key: "restauration", label: "Restauration" },
    { key: "evenements", label: "Événements" },
    { key: "contact", label: "Contact" },
    { key: "jeu", label: "Mini-Jeu" },
  ];

  const launchBall = () => {
    const points = Math.floor(Math.random() * 11);
    setScore(score + points);
    if (points === 10) {
      setShowStrike(true);
      setShowPins(true);
      if (strikeSoundRef.current) strikeSoundRef.current.play();
      setTimeout(() => setShowStrike(false), 1500);
      setTimeout(() => setShowPins(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-900 font-sans overflow-hidden">
      <audio ref={strikeSoundRef} src="/strike-sound.mp3" preload="auto" />
      <header className="bg-black text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide animate-bounce">🎳 Metro Bowling Lille</h1>
          <nav className="flex gap-2">
            {sections.map((s) => (
              <Button
                key={s.key}
                variant={section === s.key ? "default" : "outline"}
                onClick={() => setSection(s.key)}
              >
                {s.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto relative">
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {section === "jeu" && (
            <Card className="border-l-8 border-purple-400 relative overflow-hidden">
              <CardContent className="text-center space-y-4">
                <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">🎮 Mini-Jeu Bowling <Gamepad2 className="w-5 h-5" /></h2>
                <p className="text-lg">Clique sur la boule pour faire tomber des quilles !</p>
                <Button onClick={launchBall} className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-6 py-3 rounded-full">🎳 Lancer la boule</Button>
                <p className="text-xl font-bold">Score : {score} points</p>
                <AnimatePresence>
                  {showStrike && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-yellow-300/90 z-20"
                    >
                      <div className="text-6xl font-extrabold text-red-600 animate-pulse flex items-center gap-3">
                        STRIKE! <Sparkles className="w-10 h-10 text-red-700" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showPins && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-1"
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-12 bg-white rounded-full border border-gray-400 shadow-md"
                          animate={{ rotate: [0, -20 + Math.random() * 40, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>

      <footer className="bg-black text-white text-center p-4 text-sm mt-10">
        🎳 © {new Date().getFullYear()} Metro Bowling Lille — Let's Roll!
      </footer>
    </div>
  );
}
