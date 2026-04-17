'use client'

import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Share2, Image as ImageIcon, Play } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Solar Panels', href: '/products?q=solar' },
    { label: 'Battery Systems', href: '/products?q=battery' },
    { label: 'Smart Devices', href: '/products?q=smart' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Installation Guide', href: '/faq' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'About Us', href: '/about' },
  ]

  if (policies?.privacy_policy) {
    companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  }
  if (policies?.terms_of_service) {
    companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  }
  if (policies?.refund_policy) {
    companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  }
  if (policies?.cookie_policy) {
    companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })
  }

  return (
    <footer className="bg-[hsl(215_40%_10%)] text-white">
      {/* Top CTA band */}
      <div className="border-b border-white/10 bg-[hsl(215_40%_12%)]">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[hsl(38_95%_52%)] text-sm font-semibold uppercase tracking-widest mb-1">Never lose power again</p>
              <h3 className="text-xl font-bold text-white">Ready to go solar? Our team is here to help.</h3>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[hsl(38_95%_52%)] text-[hsl(215_40%_10%)] font-bold px-6 py-3 text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-[hsl(38_95%_52%)]">
                <Zap className="h-5 w-5 text-[hsl(215_40%_10%)] fill-current" />
              </div>
              <span className="font-heading text-xl font-bold text-white">SolarVolt</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              South Africa&apos;s trusted solar and backup power specialists. Engineered for load shedding. Built to last.
            </p>
            <div className="space-y-2">
              <a href="tel:+27800123456" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-[hsl(38_95%_52%)]" />
                0800 123 456
              </a>
              <a href="mailto:hello@solarvolt.co.za" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-[hsl(38_95%_52%)]" />
                hello@solarvolt.co.za
              </a>
              <p className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-[hsl(38_95%_52%)] flex-shrink-0" />
                Nationwide delivery across South Africa
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" aria-label="Facebook" className="p-2 text-white/40 hover:text-[hsl(38_95%_52%)] transition-colors">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 text-white/40 hover:text-[hsl(38_95%_52%)] transition-colors">
                <ImageIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 text-white/40 hover:text-[hsl(38_95%_52%)] transition-colors">
                <Play className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} SolarVolt. All rights reserved. Registered in South Africa.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-xs text-white/30">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
