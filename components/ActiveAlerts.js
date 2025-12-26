'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/icons/Icon'
import { alertPool } from '@/lib/mockData'

export default function ActiveAlerts({ onAlertClick }) {
  const [activeAlerts, setActiveAlerts] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Start with all alerts - user dismisses them manually
    setActiveAlerts([...alertPool])
  }, [])

  const dismissAlert = (alertId) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== alertId))
  }

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
        <h3 className="text-lg font-semibold text-sg-text flex items-center gap-2">
          <Icon name="notifications_active" className="text-sg-warning" size={24} />
          Active Alerts
        </h3>
        <span className="text-sm text-sg-muted">{activeAlerts.length} active</span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
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
                  <Icon name={alert.icon} className={`${styles.icon} mt-0.5`} size={20} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-sg-text">{alert.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${styles.badge}`}>
                          {alert.tool}
                        </span>
                      </div>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-sg-muted hover:text-sg-text transition-colors p-1 -m-1"
                        aria-label="Dismiss alert"
                      >
                        <Icon name="close" size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-sg-muted mb-2">{alert.message}</p>
                    <button
                      onClick={() => onAlertClick && onAlertClick(alert)}
                      className="text-xs text-sg-primary hover:underline flex items-center gap-1"
                    >
                      {alert.action}
                      <Icon name="arrow_forward" size={12} />
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
            <Icon name="check_circle" className="text-sg-healthy mb-2" size={40} />
            <p className="text-sm">All clear! No active alerts.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
