'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/icons/Icon'
import { costBreakdown } from '@/lib/mockData'

export default function CostTracker() {
  const [costs, setCosts] = useState(costBreakdown)
  const [mounted, setMounted] = useState(false)
  const [displayTotal, setDisplayTotal] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Animate count up on mount
    const duration = 1500
    const steps = 30
    const increment = costs.total / steps
    let current = 0

    const countUp = setInterval(() => {
      current += increment
      if (current >= costs.total) {
        setDisplayTotal(costs.total)
        clearInterval(countUp)
      } else {
        setDisplayTotal(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(countUp)
  }, [costs.total])

  const maxAmount = Math.max(...costs.items.map(i => i.amount))

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-sg-border rounded w-32 mb-4"></div>
          <div className="h-12 bg-sg-border rounded mb-4"></div>
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-6 bg-sg-border rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sg-text flex items-center gap-2">
          <Icon name="payments" className="text-sg-primary" size={24} />
          Monthly Costs
        </h3>
      </div>

      {/* Total cost */}
      <div className="mb-6">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-3xl font-bold text-sg-text">${displayTotal.toLocaleString()}</span>
          <span className="text-sg-muted mb-1">/ month</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${costs.change > 0 ? 'text-sg-warning' : 'text-sg-healthy'}`}>
          <Icon name={costs.change > 0 ? 'trending_up' : 'trending_down'} size={18} />
          <span>{costs.change > 0 ? '+' : ''}{costs.change}% from last month</span>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="space-y-3">
        {costs.items.map((item, index) => (
          <motion.div
            key={item.tool}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-sg-text w-20 shrink-0">{item.tool}</span>
            <div className="flex-1 h-2 bg-sg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.amount / maxAmount) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 + index * 0.1 }}
                className="h-full bg-sg-primary rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-sg-text w-14 text-right">${item.amount}</span>
            {item.change > 0 && (
              <span className="text-xs text-sg-warning">+${item.change}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
