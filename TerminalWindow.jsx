import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: '$ ./inject --config rage', color: 'text-red-400', delay: 0 },
  { text: '> loading kernel...', color: 'text-zinc-500', suffix: ' OK', suffixColor: 'text-green-400', delay: 600 },
  { text: '> Patching memory...', color: 'text-zinc-500', suffix: ' OK', suffixColor: 'text-green-400', delay: 1200 },
  { text: '> Engine sync...', color: 'text-zinc-500', suffix: ' 100%', suffixColor: 'text-green-400', delay: 1900 },
  { text: '$ ready_', color: 'text-green-400', cursor: true, delay: 2600 },
];

export default function TerminalWindow() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => setVisible(v => [...v, i]), line.delay);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      className="w-full lg:w-[420px] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-red-500/10"
      style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)' }}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-zinc-600 text-xs font-mono tracking-wider">~/sl1wed</span>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm space-y-2 min-h-[160px]">
        <AnimatePresence>
          {LINES.map((line, i) =>
            visible.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={line.color}
              >
                {line.text}
                {line.suffix && <span className={line.suffixColor}>{line.suffix}</span>}
                {line.cursor && <span className="animate-pulse text-green-400">█</span>}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Bottom glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </motion.div>
  );
