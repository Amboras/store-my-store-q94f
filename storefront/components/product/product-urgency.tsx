'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

interface ProductUrgencyProps {
  stockQty?: number
  showCountdown?: boolean
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function ProductUrgency({ stockQty, showCountdown = true }: ProductUrgencyProps) {
  // Countdown to midnight — sale ends today
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(23, 59, 59, 999)
      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ hours, minutes, seconds })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const isLowStock = stockQty !== undefined && stockQty > 0 && stockQty <= 8

  return (
    <div className="space-y-2">
      {/* Countdown */}
      {showCountdown && (
        <div className="flex items-center gap-3 bg-[hsl(215_40%_12%)] text-white px-4 py-3 rounded-sm">
          <Clock className="h-4 w-4 text-[hsl(38_95%_52%)] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">
              Sale price ends in
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-lg font-bold tabular-nums text-[hsl(38_95%_52%)]">
                {pad(timeLeft.hours)}
              </span>
              <span className="text-white/40 font-bold">:</span>
              <span className="text-lg font-bold tabular-nums text-[hsl(38_95%_52%)]">
                {pad(timeLeft.minutes)}
              </span>
              <span className="text-white/40 font-bold">:</span>
              <span className="text-lg font-bold tabular-nums text-[hsl(38_95%_52%)]">
                {pad(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Low stock */}
      {isLowStock && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm animate-pulse-glow">
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-xs font-bold text-red-700">
            Only {stockQty} units left in stock — high demand due to load shedding
          </p>
        </div>
      )}

      {/* Social proof pulse */}
      <div className="flex items-center gap-2 px-1">
        <div className="flex -space-x-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-[hsl(215_40%_20%)] border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
            >
              {['K', 'T', 'N'][i - 1]}
            </div>
          ))}
        </div>
        <p className="text-xs text-[hsl(215_15%_48%)]">
          <span className="font-semibold text-[hsl(215_40%_12%)]">14 people</span> are viewing this right now
        </p>
      </div>
    </div>
  )
}
