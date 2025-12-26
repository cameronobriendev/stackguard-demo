'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/icons/Icon'

export default function AlertDetailModal({ isOpen, onClose, alert }) {
  if (!alert) return null

  const getTypeStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-sg-critical/10',
          border: 'border-sg-critical/30',
          icon: 'text-sg-critical',
          badge: 'bg-sg-critical'
        }
      case 'warning':
        return {
          bg: 'bg-sg-warning/10',
          border: 'border-sg-warning/30',
          icon: 'text-sg-warning',
          badge: 'bg-sg-warning'
        }
      default:
        return {
          bg: 'bg-sg-primary/10',
          border: 'border-sg-primary/30',
          icon: 'text-sg-primary',
          badge: 'bg-sg-primary'
        }
    }
  }

  const styles = getTypeStyles(alert.type)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className={`p-6 border-b border-sg-border ${styles.bg}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${styles.bg} border ${styles.border}`}>
                      <Icon
                        name={alert.type === 'critical' ? 'error' : 'warning'}
                        className={styles.icon}
                        size={24}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${styles.badge}`}>
                          {alert.tool}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${styles.bg} ${styles.icon} border ${styles.border}`}>
                          {alert.type === 'critical' ? 'Critical' : 'Warning'}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-sg-text">{alert.title}</h2>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-sg-muted hover:text-sg-text transition-colors p-1"
                  >
                    <Icon name="close" size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Current Issue */}
                <div>
                  <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-2">
                    Current Issue
                  </h3>
                  <p className="text-sg-text">{alert.message}</p>
                </div>

                {/* Risks */}
                {alert.risks && (
                  <div>
                    <h3 className="text-sm font-semibold text-sg-muted uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-2">
                        <Icon name="warning" className="text-sg-warning" size={16} />
                        Platform Risks
                      </span>
                    </h3>
                    <ul className="space-y-2">
                      {alert.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2 text-sg-text">
                          <Icon name="arrow_forward" className="text-sg-critical mt-1 flex-shrink-0" size={14} />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solution */}
                {alert.solution && (
                  <div className="bg-sg-primary/5 border border-sg-primary/20 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-sg-primary uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-2">
                        <Icon name="code" className="text-sg-primary" size={16} />
                        Custom Code Solution
                      </span>
                    </h3>
                    <p className="text-sg-text mb-3">{alert.solution.description}</p>
                    {alert.solution.benefits && (
                      <ul className="space-y-1">
                        {alert.solution.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-sg-muted">
                            <Icon name="check_circle" className="text-sg-healthy" size={14} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-sg-border flex items-center justify-between">
                <p className="text-xs text-sg-muted">
                  This is a demo with simulated data
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-sg-primary text-white rounded-lg hover:bg-sg-primary/90 transition-colors text-sm font-medium"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
