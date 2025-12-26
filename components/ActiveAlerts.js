'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { alertPool } from '@/lib/mockData'

export default function ActiveAlerts() {
  const [activeAlerts, setActiveAlerts] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Start with 2 alerts
    setActiveAlerts(alertPool.slice(0, 2))

    // Cycle alerts - remove one and add another periodically
    const interval = setInterval(() => {
      setActiveAlerts(prev => {
        // 30% chance to remove an alert (resolve it)
        if (prev.length > 1 && Math.random() < 0.3) {
          return prev.slice(1)
        }

        // 40% chance to add a new alert if under 3
        if (prev.length < 3 && Math.random() < 0.4) {
          const available = alertPool.filter(a => !prev.find(p => p.id === a.id))
          if (available.length > 0) {
            const newAlert = available[Math.floor(Math.random() * available.length)]
            return [...prev, newAlert]
          }
        }

        return prev
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-500/10 border-red-500/30',
          icon: 'text-sg-critical',
          badge: 'bg-sg-critical'
        }
      case 'warning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30',
          icon: 'text-sg-warning',
          badge: 'bg-sg-warning'
        }
      case 'info':
        return {
          bg: 'bg-blue-500/10 border-blue-500/30',
          icon: 'text-sg-primary',
          badge: 'bg-sg-primary'
        }
      default:
        return {
          bg: 'bg-slate-500/10 border-slate-500/30',
          icon: 'text-sg-muted',
          badge: 'bg-sg-muted'
        }
    }
  }

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-sg-border rounded w-32 mb-4"></div>
          <div className="space-y-3">
            <div className="h-24 bg-sg-border rounded-xl"></div>
            <div className="h-24 bg-sg-border rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-sg-warning">notifications_active</span>
          Active Alerts
        </h3>
        <span className="text-sm text-sg-muted">{activeAlerts.length} active</span>
      </div>

      <div className="space-y-3 min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {activeAlerts.map((alert) => {
            const styles = getAlertStyles(alert.type)

            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl p-4 border ${styles.bg}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined ${styles.icon} mt-0.5`}>
                    {alert.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{alert.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full text-white ${styles.badge}`}>
                        {alert.tool}
                      </span>
                    </div>
                    <p className="text-sm text-sg-muted mb-2">{alert.message}</p>
                    <button className="text-xs text-sg-primary hover:underline flex items-center gap-1">
                      {alert.action}
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {activeAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-sg-muted"
          >
            <span className="material-symbols-outlined text-4xl text-sg-healthy mb-2">check_circle</span>
            <p className="text-sm">All clear! No active alerts.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
