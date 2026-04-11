'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ChevronRight, AlertCircle } from 'lucide-react'

export default function PasscodeGuard({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const CORRECT_PASSCODE = '2026'

  useEffect(() => {
    const saved = localStorage.getItem('profile_authorized_2026')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        const now = Date.now()
        if (data.authorized && (now - data.timestamp) < 60 * 60 * 1000) { // 1 hour
          setIsAuthorized(true)
        } else {
          localStorage.removeItem('profile_authorized_2026')
        }
      } catch {
        localStorage.removeItem('profile_authorized_2026')
      }
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthorized(true)
      localStorage.setItem('profile_authorized_2026', JSON.stringify({
        authorized: true,
        timestamp: Date.now()
      }))
      setError(false)
    } else {
      setError(true)
      setPasscode('')
      // Shake animation trigger
      setTimeout(() => setError(false), 500)
    }
  }

  if (isLoading) return null

  return (
    <>
      <AnimatePresence>
        {!isAuthorized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#F6F3EF]"
          >
            {/* Minimalist Background Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#AE2070 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                x: error ? [-10, 10, -10, 10, 0] : 0
              }}
              transition={{
                scale: { type: 'spring', damping: 25, stiffness: 300 },
                x: { duration: 0.4 }
              }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)] border border-[#E4DDD6]"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-[#AE2070]/20"
                  style={{ background: 'linear-gradient(135deg, #AE2070 0%, #8A1A59 100%)' }}
                >
                  <Lock size={32} color="white" strokeWidth={2.5} />
                </div>

                <h2 className="text-2xl font-black text-[#18120E] tracking-tight mb-3">
                  SEO/GEO Growth Strategy
                </h2>
                <p className="text-[13px] text-[#8C7D74] font-medium leading-relaxed mb-10 px-2">
                  Vui lòng liên hệ <span className="text-[#AE2070] font-bold">Hien.ho</span> để nhận <span className="text-[#18120E] font-bold underline underline-offset-4 decoration-[#AE2070]/30">Passcode</span> để truy cập nội dung này.
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={passcode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        setPasscode(val)
                        if (error) setError(false)
                      }}
                      placeholder="••••"
                      className={`
                        w-full h-16 bg-[#F6F3EF] border-2 rounded-2xl px-6 text-center text-3xl font-black tracking-widest transition-all outline-none
                        ${error ? 'border-red-500 text-red-500' : 'border-transparent focus:border-[#AE2070]/30 focus:bg-white text-[#18120E]'}
                      `}
                      autoFocus
                    />
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-0 right-0 flex items-center justify-center gap-1.5 text-red-500 text-[10px] font-bold"
                      >
                        <AlertCircle size={12} />
                        Passcode không chính xác
                      </motion.div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={passcode.length !== 4}
                    className={`
                      w-full h-16 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all
                      ${passcode.length === 4
                        ? 'bg-[#18120E] text-white shadow-2xl shadow-black/20 hover:-translate-y-1 active:scale-95'
                        : 'bg-[#F6F3EF] text-[#8C7D74] cursor-not-allowed'}
                    `}
                  >
                    ACCESS PROFILE
                    <ChevronRight size={18} />
                  </button>
                </form>

                <div className="mt-12 pt-8 border-t border-[#F6F3EF] w-full">
                  <p className="text-[9px] font-black tracking-[0.3em] text-[#8C7D74]/40 uppercase">Growth Traffic Portfolio 2026</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={!isAuthorized ? 'fixed inset-0 overflow-hidden pointer-events-none' : ''}>
        {children}
      </div>
    </>
  )
}
