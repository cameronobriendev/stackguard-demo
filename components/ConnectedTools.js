'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { tools } from '@/lib/mockData'

export default function ConnectedTools() {
  const [toolData, setToolData] = useState(tools)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simulate small metric changes
    const interval = setInterval(() => {
      setToolData(prev => prev.map(tool => {
        // Only update certain tools randomly
        if (Math.random() > 0.7) {
          const change = Math.floor(Math.random() * 10) - 3
          return {
            ...tool,
            metric: {
              ...tool.metric,
              value: Math.max(0, tool.metric.value + change)
            }
          }
        }
        return tool
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-sg-healthy'
      case 'warning': return 'bg-sg-warning'
      case 'critical': return 'bg-sg-critical'
      default: return 'bg-sg-muted'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'check_circle'
      case 'warning': return 'warning'
      case 'critical': return 'error'
      default: return 'help'
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-40 mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-20 bg-slate-700 rounded-xl"></div>
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-sg-primary">hub</span>
          Connected Tools
        </h3>
        <span className="text-sm text-sg-muted">8 active</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {toolData.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sg-muted group-hover:text-white transition-colors">
                  {tool.icon}
                </span>
                <span className="font-medium text-sm">{tool.name}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(tool.status)}`}></div>
            </div>

            <div className="flex items-center gap-1 text-xs text-sg-muted">
              <motion.span
                key={tool.metric.value}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-white font-medium"
              >
                {formatNumber(tool.metric.value)}
              </motion.span>
              <span>{tool.metric.label}</span>
            </div>

            {/* Usage bar for tools with limits */}
            {tool.usage && tool.usage.limit < 999999 && (
              <div className="mt-2">
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      (tool.usage.current / tool.usage.limit) > 0.85 ? 'bg-sg-warning' : 'bg-sg-primary'
                    }`}
                    style={{ width: `${Math.min(100, (tool.usage.current / tool.usage.limit) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
