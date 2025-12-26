'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/icons/Icon'

export default function Toast({ show, onDismiss, alert, onActionClick }) {
  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          border: 'border-sg-critical/50',
          icon: 'text-sg-critical',
          iconBg: 'bg-sg-critical/20'
        }
      case 'warning':
        return {
          border: 'border-sg-warning/50',
          icon: 'text-sg-warning',
          iconBg: 'bg-sg-warning/20'
        }
      default:
        return {
          border: 'border-sg-primary/50',
          icon: 'text-sg-primary',
          iconBg: 'bg-sg-primary/20'
        }
    }
  }

  if (!alert) return null

  const styles = getAlertStyles(alert.type)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-20 right-6 z-50 max-w-sm glass-card rounded-xl p-4 border-l-4 ${styles.border} shadow-2xl`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`p-2 rounded-lg ${styles.iconBg}`}>
              <Icon
                name={alert.type === 'critical' ? 'error' : alert.type === 'warning' ? 'warning' : 'notifications'}
                className={styles.icon}
                size={24}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-sm text-sg-text">
                  {alert.type === 'critical' ? 'Alert Detected' : 'New Warning'}
                </span>
                <button
                  onClick={onDismiss}
                  className="text-sg-muted hover:text-sg-text transition-colors p-1 -m-1"
                  aria-label="Dismiss"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <p className="text-sm font-medium text-sg-text mb-1">{alert.title}</p>
              <p className="text-xs text-sg-muted mb-3">{alert.message}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onActionClick && onActionClick(alert)}
                  className="text-xs font-medium text-sg-primary hover:underline"
                >
                  {alert.action}
                </button>
                <span className="text-sg-muted">|</span>
                <button
                  onClick={onDismiss}
                  className="text-xs text-sg-muted hover:text-sg-text transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
