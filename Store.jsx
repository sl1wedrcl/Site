import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import CheckoutModal from '../components/CheckoutModal';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

const luaFeatures = ['Advanced Logic Engine', 'Undetected Runtime', 'Optimized Performance', 'Continuous Updates'];
const cfgFeatures = ['Rage n Legit CFG', 'FFA CFG', 'Pro-tuned Settings', 'Easy Install'];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function Store() {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar active="store" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
          {/* Header */}
          <div className="mb-16">
            <motion.p {...fadeUp(0.05)} className="text-red-500 text-xs tracking-[0.3em] font-mono mb-4">
              AVAILABLE ASSETS
            </motion.p>
            <motion.h1 {...fadeUp(0.1)} className="text-6xl lg:text-7xl font-black leading-tight">
              THE <span className="text-red-500">ARMORY</span>
            </motion.h1>
            <div className="flex items-start justify-between mt-5">
              <motion.p {...fadeUp(0.2)} className="text-zinc-500 text-sm max-w-md leading-relaxed">
                Hand-tuned LUA logic and pro-grade configurations. Manual delivery ensures every order is verified by SL1WED personally.
              </motion.p>
              <motion.div {...fadeUp(0.25)} className="hidden md:flex items-center gap-3 text-zinc-700 text-xs font-mono tracking-widest mt-1">
                <span className="w-16 h-px bg-zinc-700" />
                2 ITEMS LIVE
              </motion.div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lua */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative border border-white/5 rounded-2xl p-8 bg-white/[0.02] hover:border-red-500/20 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-transparent group-hover:from-red-500/5 transition-all duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-13 h-13 w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center group-hover:border-red-500/40 group-hover:shadow-lg group-hover:shadow-red-500/10 transition-all duration-300">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-zinc-600 text-[10px] font-mono tracking-[0.25em] mb-1">LUA / SCRIPT</div>
                  <div className="text-red-500 text-4xl font-black leading-none">$10</div>
                </div>
              </div>

              <h2 className="text-2xl font-black mb-3 tracking-tight">Sl1wed.Lua</h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-7">
                Advanced LUA script designed for smooth performance and optimized gameplay control. Built for competitive users who demand maximum efficiency.
              </p>

              <ul className="space-y-2.5 mb-8">
                {luaFeatures.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-400">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setModal('lua')}
                className="w-full relative overflow-hidden border border-red-600/60 text-red-400 font-black tracking-[0.2em] py-3.5 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 text-sm group/btn"
              >
                <span className="relative z-10">PURCHASE NOW →</span>
                <div className="absolute inset-0 bg-red-600 translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* CFG Pack */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative border border-white/5 rounded-2xl p-8 bg-white/[0.02] hover:border-red-500/20 transition-all duration-300 overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-transparent group-hover:from-red-500/5 transition-all duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center group-hover:border-red-500/40 group-hover:shadow-lg group-hover:shadow-red-500/10 transition-all duration-300">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-zinc-600 text-[10px] font-mono tracking-[0.25em] mb-1">CFG / PACK</div>
                  <div className="text-red-500 text-4xl font-black leading-none">$5</div>
                </div>
              </div>

              <h2 className="text-2xl font-black mb-3 tracking-tight">CFG PACK</h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-7">
                Complete configuration pack including Rage and Legit setups plus FFA-tuned configs. Tested and refined for maximum precision.
              </p>

              <ul className="space-y-2.5 mb-8">
                {cfgFeatures.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-400">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setModal('cfg')}
                className="w-full relative overflow-hidden border border-red-600/60 text-red-400 font-black tracking-[0.2em] py-3.5 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 text-sm group/btn"
              >
                <span className="relative z-10">PURCHASE NOW →</span>
                <div className="absolute inset-0 bg-red-600 translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {modal && <CheckoutModal product={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
