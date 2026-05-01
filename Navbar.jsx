import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar({ active }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center group-hover:border-red-500/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="font-black text-white text-sm tracking-[0.2em]">SL1WED</div>
            <div className="text-red-500/50 text-[10px] tracking-[0.3em] font-mono">LUAS & CFGS</div>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {[
            { label: 'HOME', to: '/', key: 'home' },
            { label: 'STORE', to: '/store', key: 'store' },
          ].map(({ label, to, key }) => (
            <Link
              key={key}
              to={to}
              className={`relative px-4 py-2 text-xs font-bold tracking-[0.2em] transition-all duration-300 ${
                active === key ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {label}
              {active === key && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
