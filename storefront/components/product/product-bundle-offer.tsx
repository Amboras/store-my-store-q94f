'use client'

import { useState } from 'react'
import { Package, Zap, CheckCircle2 } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleVariant {
  id: string
  title: string
  bundleLabel: string
  bundleDescription: string
  originalPrice: number
  bundlePrice: number
  savings: number
  currency: string
}

interface ProductBundleOfferProps {
  mainVariantId: string
  mainVariantTitle: string
  mainPrice: number
  currency: string
  productTitle: string
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export default function ProductBundleOffer({
  mainVariantId,
  mainVariantTitle,
  mainPrice,
  currency,
  productTitle,
}: ProductBundleOfferProps) {
  const [selectedOption, setSelectedOption] = useState<'single' | 'bundle2' | 'bundle3'>('single')
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const bundleOptions = [
    {
      key: 'single' as const,
      label: '1 Unit',
      tag: null,
      qty: 1,
      pricePerUnit: mainPrice,
      totalPrice: mainPrice,
      savings: 0,
      variantId: mainVariantId,
    },
    {
      key: 'bundle2' as const,
      label: '2 Units',
      tag: 'Save 10%',
      qty: 2,
      pricePerUnit: Math.round(mainPrice * 0.9),
      totalPrice: Math.round(mainPrice * 2 * 0.9),
      savings: Math.round(mainPrice * 2 * 0.1),
      variantId: mainVariantId,
    },
    {
      key: 'bundle3' as const,
      label: '3 Units — Best Value',
      tag: 'Save 15% + Free Delivery',
      qty: 3,
      pricePerUnit: Math.round(mainPrice * 0.85),
      totalPrice: Math.round(mainPrice * 3 * 0.85),
      savings: Math.round(mainPrice * 3 * 0.15),
      variantId: mainVariantId,
    },
  ]

  const selected = bundleOptions.find((o) => o.key === selectedOption) || bundleOptions[0]

  const handleAddBundle = async () => {
    if (!selected.variantId) return
    setIsAdding(true)
    addItem(
      { variantId: selected.variantId, quantity: selected.qty },
      {
        onSuccess: () => {
          toast.success(
            selected.qty === 1
              ? `${productTitle} added to cart`
              : `${selected.qty}x ${productTitle} added to cart`
          )
          setIsAdding(false)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add to cart')
          setIsAdding(false)
        },
      }
    )
  }

  return (
    <div className="border border-[hsl(210_15%_86%)] rounded-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[hsl(215_40%_12%)] px-5 py-3 flex items-center gap-2">
        <Package className="h-4 w-4 text-[hsl(38_95%_52%)]" />
        <span className="text-sm font-bold text-white uppercase tracking-wide">
          Choose Your Quantity
        </span>
      </div>

      {/* Options */}
      <div className="divide-y divide-[hsl(210_15%_90%)]">
        {bundleOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setSelectedOption(option.key)}
            className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
              selectedOption === option.key
                ? 'bg-[hsl(38_95%_52%/0.08)] border-l-2 border-l-[hsl(38_95%_52%)]'
                : 'bg-white hover:bg-[hsl(210_20%_98%)] border-l-2 border-l-transparent'
            }`}
          >
            {/* Radio */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedOption === option.key
                  ? 'border-[hsl(38_95%_52%)]'
                  : 'border-[hsl(210_15%_75%)]'
              }`}
            >
              {selectedOption === option.key && (
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(38_95%_52%)]" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[hsl(215_40%_12%)]">{option.label}</span>
                {option.tag && (
                  <span className="text-xs font-bold text-[hsl(215_40%_10%)] bg-[hsl(38_95%_52%)] px-2 py-0.5 rounded-sm">
                    {option.tag}
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-[hsl(215_15%_48%)]">
                {formatPrice(option.pricePerUnit, currency)} per unit
                {option.savings > 0 && (
                  <span className="ml-2 text-green-600 font-semibold">
                    — you save {formatPrice(option.savings, currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-[hsl(215_40%_12%)]">
                {formatPrice(option.totalPrice, currency)}
              </div>
              {option.qty > 1 && (
                <div className="text-xs text-[hsl(215_15%_48%)] line-through">
                  {formatPrice(mainPrice * option.qty, currency)}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Add to cart */}
      <div className="p-4 bg-[hsl(210_20%_98%)] border-t border-[hsl(210_15%_88%)]">
        {selected.savings > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <p className="text-xs text-green-700 font-semibold">
              You&apos;re saving {formatPrice(selected.savings, currency)} with this bundle
            </p>
          </div>
        )}
        <button
          onClick={handleAddBundle}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 bg-[hsl(215_40%_12%)] text-white py-3.5 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding...
            </span>
          ) : (
            <>
              <Zap className="h-4 w-4 fill-current text-[hsl(38_95%_52%)]" />
              Add {selected.qty > 1 ? `${selected.qty}x` : ''} to Cart — {formatPrice(selected.totalPrice, currency)}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
