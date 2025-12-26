'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/icons/Icon'
import { usageLimits } from '@/lib/mockData'
import { useCheckCycle } from '@/lib/useCheckCycle'

export default function UsageLimits() {
  const [limits, setLimits] = useState(usageLimits)
  const [mounted, setMounted] = useState(false)
  const { checkCount } = useCheckCycle()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update usage values when a check happens
  useEffect(() => {
    if (checkCount === 0) return // Skip initial
    setLimits(prev => prev.map(limit => {
      if (Math.random() > 0.6) {
        const increment = Math.floor(Math.random() * 20) + 1
        return {
          ...limit,
          current: Math.min(limit.limit, limit.current + increment)
        }
      }
      return limit
    }))
  }, [checkCount])

  const getBarColor = (current, limit) => {
    const percent = (current / limit) * 100
    if (percent >= 90) return 'bg-sg-critical'
    if (percent >= 75) return 'bg-sg-warning'
    return 'bg-sg-primary'
  }

  const getTextColor = (current, limit) => {
    const percent = (current / limit) * 100
    if (percent >= 90) return 'text-sg-critical'
    if (percent >= 75) return 'text-sg-warning'
    return 'text-sg-muted'
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toLocaleString()
  }

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-sg-border rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-12 bg-sg-border rounded"></div>
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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Icon name="data_usage" className="text-sg-primary" size={24} />
          Usage & Limits
        </h3>
      </div>

      <div className="space-y-4">
        {limits.map((limit, index) => {
          const percent = Math.round((limit.current / limit.limit) * 100)

          return (
            <motion.div
              key={limit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{limit.tool}</span>
                  <span className="text-xs text-sg-muted">{limit.metric}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getTextColor(limit.current, limit.limit)}`}>
                    {percent}%
                  </span>
                  {limit.daysLeft && (
                    <span className="text-xs text-sg-muted">
                      ({limit.daysLeft}d left)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-sg-border rounded-full overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                  className={`h-full rounded-full ${getBarColor(limit.current, limit.limit)}`}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-sg-muted">
                <span>{formatNumber(limit.current)} / {formatNumber(limit.limit)}</span>
                {limit.prediction && (
                  <span className={`flex items-center gap-1 ${percent >= 75 ? 'text-sg-warning' : ''}`}>
                    <Icon name="warning" size={12} />
                    {limit.prediction}
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
