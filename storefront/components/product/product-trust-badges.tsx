import { Shield, Truck, RefreshCw, Award, Phone, BadgeCheck } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: '25-Year Warranty',
    desc: 'Panel output guaranteed for 25 years',
  },
  {
    icon: Truck,
    title: 'Free Nationwide Delivery',
    desc: 'On all orders over R5,000',
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    desc: 'CPA-compliant, no-hassle returns',
  },
  {
    icon: Award,
    title: 'SABS Certified',
    desc: 'All products South African approved',
  },
  {
    icon: Phone,
    title: 'SA-Based Support',
    desc: 'Mon–Sat, 8am–6pm SAST',
  },
  {
    icon: BadgeCheck,
    title: 'Secure Checkout',
    desc: '256-bit SSL — 100% safe',
  },
]

export default function ProductTrustBadges() {
  return (
    <div className="border border-[hsl(210_15%_86%)] rounded-sm overflow-hidden">
      <div className="bg-[hsl(210_20%_97%)] px-5 py-3 border-b border-[hsl(210_15%_88%)]">
        <p className="text-xs font-bold text-[hsl(215_40%_12%)] uppercase tracking-widest">
          Your purchase is protected
        </p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-[hsl(210_15%_90%)]">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <div key={badge.title} className="flex items-start gap-3 p-4 bg-white">
              <Icon className="h-4 w-4 text-[hsl(38_95%_52%)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold text-[hsl(215_40%_12%)]">{badge.title}</p>
                <p className="text-xs text-[hsl(215_15%_55%)] leading-snug mt-0.5">{badge.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
