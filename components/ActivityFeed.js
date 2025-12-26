'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { activityTemplates } from '@/lib/mockData'

export default function ActivityFeed() {
  const [activities, setActivities] = useState([])
  const [mounted, setMounted] = useState(false)
  const activityIdRef = useRef(0)

  useEffect(() => {
    setMounted(true)

    // Generate initial activities
    const initialActivities = activityTemplates.slice(0, 5).map((template, index) => ({
      ...template,
      id: activityIdRef.current++,
      timestamp: Date.now() - (index * 15000) // Stagger timestamps
    }))
    setActivities(initialActivities)

    // Add new activities periodically
    const interval = setInterval(() => {
      const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)]
      const newActivity = {
        ...template,
        id: activityIdRef.current++,
        timestamp: Date.now()
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 9)])
    }, 8000 + Math.random() * 4000)

    return () => clearInterval(interval)
  }, [])

  // Update timestamps every second
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (timestamp) => {
    const seconds = Math.floor((now - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return 'text-sg-healthy'
      case 'warning':
        return 'text-sg-warning'
      case 'error':
        return 'text-sg-critical'
      default:
        return 'text-sg-primary'
    }
  }

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-8 bg-slate-700 rounded"></div>
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
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-sg-primary">history</span>
          Activity Feed
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-sg-healthy live-pulse"></span>
          <span className="text-sg-muted">Live</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[280px] overflow-hidden">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 py-2 border-b border-sg-border/30 last:border-0"
            >
              <span className="text-xs text-sg-muted w-12 shrink-0 pt-0.5">
                {formatTimestamp(activity.timestamp)}
              </span>
              <span className={`material-symbols-outlined text-sm ${getTypeStyles(activity.type)}`}>
                {activity.icon}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm">
                  <span className="font-medium">{activity.tool}</span>
                  {' '}
                  <span className="text-sg-muted">"{activity.workflow}"</span>
                  {' '}
                  <span className="text-sg-muted">{activity.action}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
