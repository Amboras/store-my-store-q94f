'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  Zap,
  BatteryCharging,
  SunMedium,
  Wifi,
  CheckCircle2,
  Star,
  PhoneCall,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90&fit=crop'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=90&fit=crop'

const stats = [
  { value: '12,000+', label: 'Homes Powered' },
  { value: '98.4%', label: 'Satisfaction Rate' },
  { value: '25yr', label: 'Panel Warranty' },
  { value: 'R2.4bn', label: 'Energy Bills Saved' },
]

const features = [
  {
    icon: SunMedium,
    title: 'Premium Solar Panels',
    description: 'Monocrystalline PERC panels with 21%+ efficiency and 25-year warranties. Built for SA conditions.',
    href: '/products?q=solar',
  },
  {
    icon: BatteryCharging,
    title: 'LiFePO4 Battery Backup',
    description: 'Safest lithium chemistry available. 6,000+ cycles. Powers your home through any stage of load shedding.',
    href: '/products?q=battery',
  },
  {
    icon: Wifi,
    title: 'Smart Energy Devices',
    description: 'Real-time monitoring, smart plugs, and automation tools to slash your Eskom bill by up to 30%.',
    href: '/products?q=smart',
  },
]

const trustItems = [
  'SANS 10142 Certified Products',
  'CPA-compliant returns policy',
  'Nationwide delivery via Courier Guy',
  'Dedicated SA support team',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubmitted(true)
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[hsl(215_40%_10%)] overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Solar panels on rooftop"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215_40%_10%)] via-[hsl(215_40%_10%/0.85)] to-transparent" />
        </div>

        <div className="relative container-custom grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-32">
          <div className="space-y-7 animate-fade-in-up">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-[hsl(38_95%_52%/0.15)] border border-[hsl(38_95%_52%/0.4)] rounded-full px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-[hsl(38_95%_52%)] fill-current" />
              <span className="text-[hsl(38_95%_52%)] text-xs font-semibold uppercase tracking-widest">
                Built for Load Shedding
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-white text-balance leading-[1.08]">
              Power That&apos;s <span className="text-[hsl(38_95%_52%)]">Always On</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Solar panels, battery backup systems, and smart energy devices — engineered for South Africa&apos;s energy reality. Stop paying Eskom. Start owning your power.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[hsl(38_95%_52%)] text-[hsl(215_40%_10%)] px-8 py-4 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:border-white/70 transition-colors"
                prefetch={true}
              >
                <PhoneCall className="h-4 w-4" />
                Free Consultation
              </Link>
            </div>

            {/* Trust ticks */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(38_95%_52%)] flex-shrink-0" />
                  <span className="text-xs text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — stat cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 text-center"
              >
                <div className="text-3xl font-bold text-[hsl(38_95%_52%)] font-heading mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[hsl(38_95%_52%)] font-semibold mb-3">
              Complete Energy Solutions
            </p>
            <h2 className="text-4xl font-heading font-bold text-[hsl(215_40%_12%)]">
              Everything You Need to Go Off-Grid
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group bg-[hsl(210_20%_98%)] border border-[hsl(210_15%_88%)] p-8 hover:border-[hsl(38_95%_52%)] hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[hsl(215_40%_12%)] rounded-sm mb-5 group-hover:bg-[hsl(38_95%_52%)] transition-colors">
                    <Icon className="h-6 w-6 text-[hsl(38_95%_52%)] group-hover:text-[hsl(215_40%_10%)] transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[hsl(215_40%_12%)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[hsl(215_15%_48%)] leading-relaxed mb-4">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(38_95%_52%)] uppercase tracking-wide">
                    Shop Range <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ──────────────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-20 bg-[hsl(210_20%_98%)]">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 0}
            />
          ))}
        </>
      ) : null}

      {/* ─── LIFESTYLE / BRAND STORY ──────────────────────────────────── */}
      <section className="py-20 bg-[hsl(215_40%_10%)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Solar installation on South African home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Stat overlay */}
              <div className="absolute bottom-4 left-4 bg-[hsl(215_40%_10%/0.9)] backdrop-blur-sm border border-white/10 px-5 py-4 rounded-sm">
                <div className="text-2xl font-bold text-[hsl(38_95%_52%)]">R2,400+</div>
                <div className="text-xs text-white/60 mt-0.5">Average monthly saving per household</div>
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(38_95%_52%)] font-semibold">Why SolarVolt</p>
              <h2 className="text-4xl font-heading font-bold text-white">
                South African Energy Experts, Not Just Resellers
              </h2>
              <p className="text-white/60 leading-relaxed">
                Every product in our range is tested in SA conditions — Highveld lightning, Cape Town gale winds, and Limpopo heat. We source only from manufacturers with local type approval and SABS certification.
              </p>
              <ul className="space-y-3">
                {[
                  'Pre-sales consultation to design the right system',
                  'Installation partner network in all 9 provinces',
                  'Post-installation monitoring and support',
                  'Finance options available from R299/month',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(38_95%_52%)] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[hsl(38_95%_52%)] hover:opacity-80 transition-opacity"
                prefetch={true}
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-[hsl(210_15%_88%)] bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center">
              <Truck className="h-6 w-6 text-[hsl(38_95%_52%)] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-sm font-bold text-[hsl(215_40%_12%)]">Free Delivery</p>
                <p className="text-xs text-[hsl(215_15%_48%)]">Orders over R5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <Shield className="h-6 w-6 text-[hsl(38_95%_52%)] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-sm font-bold text-[hsl(215_40%_12%)]">Secure Checkout</p>
                <p className="text-xs text-[hsl(215_15%_48%)]">256-bit encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <Star className="h-6 w-6 text-[hsl(38_95%_52%)] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-sm font-bold text-[hsl(215_40%_12%)]">SABS Certified</p>
                <p className="text-xs text-[hsl(215_15%_48%)]">SA approved products</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <BatteryCharging className="h-6 w-6 text-[hsl(38_95%_52%)] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-sm font-bold text-[hsl(215_40%_12%)]">25-Year Warranty</p>
                <p className="text-xs text-[hsl(215_15%_48%)]">On panel output</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────── */}
      <section className="py-20 bg-[hsl(210_20%_98%)]">
        <div className="container-custom max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[hsl(215_40%_12%)] rounded-sm mb-6">
            <Zap className="h-6 w-6 text-[hsl(38_95%_52%)] fill-current" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-[hsl(215_40%_12%)]">
            Load Shedding Updates &amp; Energy Tips
          </h2>
          <p className="mt-3 text-[hsl(215_15%_48%)]">
            Get Eskom schedule alerts, solar tips, and exclusive deals — delivered to your inbox.
          </p>
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-[hsl(38_95%_52%)] font-semibold">
              <CheckCircle2 className="h-5 w-5" />
              You&apos;re subscribed — we&apos;ll keep you powered with the latest news.
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.co.za"
                className="flex-1 border border-[hsl(210_15%_86%)] bg-white px-4 py-3 text-sm placeholder:text-[hsl(215_15%_60%)] focus:border-[hsl(38_95%_52%)] focus:outline-none transition-colors rounded-sm"
              />
              <button
                type="submit"
                className="bg-[hsl(215_40%_12%)] text-white px-6 py-3 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap rounded-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
