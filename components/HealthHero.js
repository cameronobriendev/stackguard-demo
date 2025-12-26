'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/icons/Icon'

export default function HealthHero() {
  const [healthScore, setHealthScore] = useState(94)
  const [lastCheck, setLastCheck] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Health score fluctuates between 91-97
    const healthInterval = setInterval(() => {
      setHealthScore(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.max(91, Math.min(97, prev + delta))
      })
    }, 5000)

    // Last check counter increments every second
    const checkInterval = setInterval(() => {
      setLastCheck(prev => prev + 1)
    }, 1000)

    // Reset last check periodically (simulates actual checks)
    const resetInterval = setInterval(() => {
      setLastCheck(0)
    }, 30000)

    return () => {
      clearInterval(healthInterval)
      clearInterval(checkInterval)
      clearInterval(resetInterval)
    }
  }, [])

  const getHealthColor = (score) => {
    if (score >= 90) return 'sg-healthy'
    if (score >= 75) return 'sg-warning'
    return 'sg-critical'
  }

  const getGlowClass = (score) => {
    if (score >= 90) return 'health-glow'
    if (score >= 75) return 'health-glow-warning'
    return 'health-glow-critical'
  }

  const getStatusText = (score) => {
    if (score >= 90) return 'All Systems Healthy'
    if (score >= 75) return 'Attention Needed'
    return 'Critical Issues Detected'
  }

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-sg-border rounded w-64 mx-auto mb-8"></div>
          <div className="h-32 bg-sg-border rounded-full w-32 mx-auto mb-8"></div>
          <div className="h-4 bg-sg-border rounded w-48 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass-card rounded-2xl p-8 text-center ${getGlowClass(healthScore)}`}
    >
      <h2 className="text-lg font-medium text-sg-muted mb-6">
        Your Business Tech Health
      </h2>

      {/* Big health score */}
      <div className="relative inline-block mb-6">
        <motion.div
          key={healthScore}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`text-7xl font-bold text-${getHealthColor(healthScore)}`}
        >
          {healthScore}%
        </motion.div>

        {/* Progress ring (simplified as bar) */}
        <div className="w-48 h-2 bg-sg-border rounded-full mx-auto mt-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${healthScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full bg-${getHealthColor(healthScore)} rounded-full`}
          />
        </div>
      </div>

      {/* Status text */}
      <motion.p
        key={getStatusText(healthScore)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-xl font-medium text-${getHealthColor(healthScore)} mb-8`}
      >
        {getStatusText(healthScore)}
      </motion.p>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-6 text-sm text-sg-muted">
        <div className="flex items-center gap-2">
          <Icon name="link" className="text-sg-primary" size={20} />
          <span><strong className="text-sg-text">8</strong> Tools Connected</span>
        </div>
        <div className="w-px h-4 bg-sg-border"></div>
        <div className="flex items-center gap-2">
          <Icon name="automation" className="text-sg-primary" size={20} />
          <span><strong className="text-sg-text">47</strong> Automations</span>
        </div>
        <div className="w-px h-4 bg-sg-border"></div>
        <div className="flex items-center gap-2">
          <Icon name="radio_button_checked" className="text-sg-healthy live-pulse" size={20} />
          <span>Last check: <strong className="text-sg-text">{lastCheck}s</strong> ago</span>
        </div>
      </div>
    </motion.div>
  )
}
