'use client'

import { useState } from 'react'
import { X, Zap } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[hsl(38_95%_52%)] text-[hsl(215_40%_10%)]">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-sm font-semibold tracking-wide">
        <Zap className="h-3.5 w-3.5 fill-current flex-shrink-0" />
        <p>Free nationwide delivery on orders over R5,000 — Beat load shedding today</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
