import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const PRODUCTS = {
  cfg: { name: 'CFG PACK', price: '$5', rbx: '1950 RBX', label: 'CFG PACK' },
  lua: { name: 'SL1WED.LUA', price: '$10', rbx: '3500 RBX', label: 'SL1WED.LUA' },
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomSegment(len) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
}

export default function CheckoutModal({ product, onClose }) {
  const [step, setStep] = useState('form');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [email, setEmail] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const prod = PRODUCTS[product];
  const isRobux = paymentMethod === 'robux';

  async function generateUniqueCode() {
    let attempts = 0;
    while (attempts < 20) {
      const candidate = `SL1-${randomSegment(8)}`;
      const existing = await base44.entities.Order.filter({ order_code: candidate });
      if (!existing || existing.length === 0) return candidate;
      attempts++;
    }
    return `SL1-${randomSegment(6)}${Date.now().toString(36).toUpperCase().slice(-2)}`;
  }

  async function handleGenerate() {
    if (!email || !email.includes('@')) return;
    setLoading(true);
    const code = await generateUniqueCode();
    await base44.entities.Order.create({
      order_code: code,
      product: product === 'cfg' ? 'cfg_pack' : 'lua',
      email,
      payment_method: paymentMethod,
      status: 'pending',
    });
    setOrderCode(code);
    setStep('code');
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,5,5,0.98) 0%, rgba(10,0,0,0.99) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 60px rgba(200,0,0,0.12), 0 25px 60px rgba(0,0,0,0.8)',
          }}
        >
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm"
          >
            ✕
          </button>

          <div className="p-8">
            <p className="text-zinc-600 text-[10px] font-mono tracking-[0.3em] mb-2">CHECKOUT / MANUAL</p>
            <h2 className="text-3xl font-black mb-1 tracking-tight">
              {prod.label}{' '}
              <span className="text-red-500">
                {isRobux ? prod.rbx : prod.price}
              </span>
            </h2>
            <p className="text-zinc-600 text-sm mb-7 leading-relaxed">
              All purchases are processed manually. Generate your unique order code below, then complete payment.
            </p>

            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Payment toggle */}
                  <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-xl mb-6">
                    {['paypal', 'robux'].map(m => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`flex-1 py-2.5 rounded-lg font-black text-xs tracking-[0.2em] transition-all duration-300 ${
                          paymentMethod === m
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Payment info box */}
                  <AnimatePresence mode="wait">
                    {!isRobux ? (
                      <motion.div
                        key="paypal-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-white/8 rounded-xl mb-4 px-5 py-3.5 flex items-center justify-between bg-white/[0.02]"
                      >
                        <span className="text-zinc-600 text-[10px] font-mono tracking-[0.25em]">SEND PAYMENT TO</span>
                        <span className="text-zinc-200 text-sm font-mono">btwdodson@gmail.com</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="robux-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-red-500/20 rounded-xl mb-4 px-5 py-4 bg-red-500/5"
                      >
                        <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-600 mb-2">ROBUX PAYMENT</p>
                        <p className="text-zinc-300 text-sm font-bold">Send <span className="text-red-400">{prod.rbx}</span> via Roblox</p>
                        <p className="text-zinc-600 text-xs mt-1.5 leading-relaxed">
                          After sending, include your order code in the Roblox transfer description or send verification below.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email input */}
                  <div className="mb-2">
                    <label className="text-zinc-600 text-[10px] font-mono tracking-[0.25em] block mb-2">
                      {isRobux ? 'SEND VERIFICATION OF PAYMENT HERE' : 'YOUR EMAIL'}
                    </label>
                    <div className="border border-white/8 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white/[0.02] focus-within:border-red-500/30 focus-within:bg-red-500/[0.03] transition-all duration-300">
                      <svg className="w-4 h-4 text-zinc-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-transparent text-white text-sm outline-none w-full placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={handleGenerate}
                    disabled={loading || !email.includes('@')}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-5 relative overflow-hidden bg-red-500 hover:bg-red-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black tracking-[0.2em] py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        GENERATING...
                      </span>
                    ) : 'GENERATE ORDER CODE'}
                  </motion.button>
                </motion.div>
              )}

              {step === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Warning */}
                  <div className="border-l-4 border-red-500 bg-red-500/8 rounded-r-xl px-4 py-4 mb-5">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-red-400 text-[10px] font-mono tracking-wider font-bold leading-relaxed">
                          YOU MUST INCLUDE THIS ORDER CODE IN THE PAYMENT NOTE.
                        </p>
                        <p className="text-zinc-600 text-xs mt-1 font-mono">Without it, your order cannot be matched.</p>
                      </div>
                    </div>
                  </div>

                  {/* Code box */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="border border-white/8 rounded-xl p-5 mb-5 bg-white/[0.02]"
                    style={{ boxShadow: '0 0 20px rgba(200,0,0,0.05) inset' }}
                  >
                    <p className="text-zinc-600 text-[10px] font-mono tracking-[0.25em] mb-3">YOUR UNIQUE ORDER CODE</p>
                    <div className="flex items-center justify-between gap-4">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-red-500 font-black text-2xl font-mono tracking-wider"
                      >
                        {orderCode}
                      </motion.span>
                      <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 border p-2.5 rounded-lg transition-all duration-200 ${
                          copied
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-white/10 hover:border-white/20 bg-white/[0.03]'
                        }`}
                      >
                        {copied ? (
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Steps */}
                  <ol className="space-y-3 mb-6">
                    {[
                      isRobux
                        ? `Send ${prod.rbx} via Roblox`
                        : `Send ${prod.price} to btwdodson@gmail.com via PayPal`,
                      'Paste the order code in the PAYMENT NOTE field',
                      'Wait for delivery via Discord DM',
                    ].map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="flex items-center gap-3 text-sm text-zinc-400"
                      >
                        <span className="w-5 h-5 rounded-full border border-red-500/50 text-red-500 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </motion.li>
                    ))}
                  </ol>

                  <button
                    onClick={onClose}
                    className="w-full border border-white/8 hover:border-white/15 text-zinc-400 hover:text-white font-bold tracking-[0.2em] py-3.5 rounded-xl transition-all duration-300 text-sm"
                  >
                    CLOSE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
