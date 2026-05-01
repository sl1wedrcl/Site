import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import TerminalWindow from '../components/TerminalWindow';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

const features = [
  {
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Optimized Runtime',
    desc: 'Lightweight, fast, and tuned for competitive frame consistency.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Continuously Tested',
    desc: 'Every release is validated before delivery to active users.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Precision Logic',
    desc: 'Mathematically tuned CFGs and advanced LUA decision trees.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar active="home" />

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="flex-1">
              {/* Status pill */}
              <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 border border-red-500/20 bg-red-500/5 rounded-full px-4 py-1.5 mb-10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
                <span className="text-xs tracking-[0.25em] text-red-400/80 font-mono">SYSTEM ONLINE · V2.6</span>
              </motion.div>

              <motion.h1 {...fadeUp(0.2)} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-2">
                LUAS AND CFGS
              </motion.h1>
              <motion.h1 {...fadeUp(0.3)} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8">
                BY{' '}
                <span className="text-red-500 relative">
                  SL1WED
                  <motion.span
                    className="absolute -inset-1 bg-red-500/10 rounded blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              <motion.p {...fadeUp(0.4)} className="text-zinc-300 font-semibold text-lg mb-3">
                Premium Configurations & LUA Scripts for Competitive Gameplay.
              </motion.p>
              <motion.p {...fadeUp(0.45)} className="text-zinc-600 text-sm leading-relaxed max-w-md mb-12">
                Experience next-level performance with optimized CFGs and advanced LUA scripts. Designed for smooth gameplay, precision, and maximum efficiency. All products are tested, refined, and continuously improved.
              </motion.p>

              <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-4">
                <a
                  href="https://discord.gg/4NsxzQPvA"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black px-7 py-3.5 rounded-lg transition-all duration-300 overflow-hidden shadow-lg shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  {/* Official Discord logo mark */}
                  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="white">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span className="tracking-widest text-sm">JOIN DISCORD</span>
                </a>
                <Link
                  to="/store"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white font-bold tracking-[0.15em] text-sm transition-all duration-300"
                >
                  BROWSE STORE
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >→</motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Right — Terminal */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <TerminalWindow />
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mt-24 mb-16"
          />

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/20 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center mb-5 group-hover:border-red-500/40 group-hover:bg-red-500/15 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/10">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2 tracking-wide">{f.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
