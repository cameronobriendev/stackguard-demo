'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/icons/Icon'
import HealthHero from '@/components/HealthHero'
import ActiveAlerts from '@/components/ActiveAlerts'
import ConnectedTools from '@/components/ConnectedTools'
import UsageLimits from '@/components/UsageLimits'
import CostTracker from '@/components/CostTracker'
import ActivityFeed from '@/components/ActivityFeed'
import ThemeToggle from '@/components/ThemeToggle'
import Toast from '@/components/Toast'
import AlertDetailModal from '@/components/AlertDetailModal'
import { CheckCycleProvider } from '@/lib/useCheckCycle'

// Toast alerts pool - rotates on each visit
const toastAlerts = [
  {
    type: 'warning',
    title: 'Zapier task usage at 78%',
    message: 'Approaching monthly limit. At current rate, you\'ll exceed by ~2,100 tasks.',
    action: 'View Details',
    tool: 'Zapier',
    risks: [
      'Overage charges of $0.01-0.05 per extra task add up fast',
      'Task-based pricing punishes business growth',
      'No warning before hitting limits on basic plans',
      'Upgrade to next tier often 2-3x the price'
    ],
    solution: {
      description: 'Self-hosted n8n gives you unlimited workflow executions for a flat $5-10/mo server cost.',
      benefits: [
        'Unlimited executions (no task limits)',
        'Same visual workflow builder',
        'Full error handling and logging',
        'One-time setup, forever savings'
      ]
    }
  },
  {
    type: 'critical',
    title: 'Airtable sync delayed 4 minutes',
    message: 'Customer CRM sync is running slower than usual. May indicate API rate limiting.',
    action: 'View Details',
    tool: 'Airtable',
    risks: [
      'API rate limits (5 req/sec) cause cascading delays',
      'No visibility into what\'s causing the slowdown',
      'Sync failures can cause data inconsistencies',
      'Premium API access requires Enterprise plan'
    ],
    solution: {
      description: 'A PostgreSQL database with real-time sync has no rate limits and sub-second response times.',
      benefits: [
        'No API rate limits',
        'Real-time data access',
        'Full query optimization control',
        'Direct database connections'
      ]
    }
  },
  {
    type: 'warning',
    title: 'Make.com scenario took 6.2s',
    message: '"Order Processing" scenario execution time increased 300% from baseline.',
    action: 'View Details',
    tool: 'Make.com',
    risks: [
      'Slow scenarios consume more operations (costs more)',
      'Timeouts can cause partial data processing',
      'No visibility into which module is slow',
      'Debugging requires manual step-by-step testing'
    ],
    solution: {
      description: 'A Node.js script processes the same data in milliseconds with full performance profiling.',
      benefits: [
        'Sub-second processing times',
        'Built-in performance profiling',
        'Parallel processing support',
        'Full debugging and logging'
      ]
    }
  },
  {
    type: 'warning',
    title: 'Stack costs trending up',
    message: 'This month is 18% higher than last month with 11 days remaining.',
    action: 'View Details',
    tool: 'Costs',
    risks: [
      'Usage-based pricing makes costs unpredictable',
      'Success = higher bills (growth is punished)',
      'No spending alerts until you check manually',
      'Vendor price increases happen without warning'
    ],
    solution: {
      description: 'Custom solutions have fixed costs. A $20/mo server replaces $500+ in subscriptions.',
      benefits: [
        'Fixed, predictable monthly costs',
        'No usage-based surprises',
        'Costs don\'t scale with growth',
        'Full cost transparency'
      ]
    }
  },
  {
    type: 'critical',
    title: 'Bubble app response time spiked',
    message: 'App responding in 2.4s vs normal 340ms. Users may experience slowdowns.',
    action: 'View Details',
    tool: 'Bubble',
    risks: [
      'Shared infrastructure means unpredictable performance',
      'No control over server resources or scaling',
      'Database queries are unoptimizable black boxes',
      '2+ second loads cause 50%+ user abandonment'
    ],
    solution: {
      description: 'A Next.js app on Vercel delivers sub-500ms loads globally with edge deployment.',
      benefits: [
        'Sub-500ms global load times',
        'Automatic edge caching',
        'Full performance control',
        'Scales automatically under load'
      ]
    }
  },
  {
    type: 'warning',
    title: 'Notion API rate limit warning',
    message: 'Hit 80% of hourly request limit. Sync frequency may need adjustment.',
    action: 'View Details',
    tool: 'Notion',
    risks: [
      '3 requests/second limit causes sync bottlenecks',
      'Rate limit errors require manual retry logic',
      'No real-time sync capability',
      'Bulk operations require pagination and waiting'
    ],
    solution: {
      description: 'A direct database connection has no rate limits and supports real-time subscriptions.',
      benefits: [
        'No rate limits whatsoever',
        'Real-time data subscriptions',
        'Bulk operations in milliseconds',
        'Full query flexibility'
      ]
    }
  },
  {
    type: 'warning',
    title: 'Google Sheets quota at 67%',
    message: 'Read operations trending high. May hit daily limit by 4pm.',
    action: 'View Details',
    tool: 'Google Sheets',
    risks: [
      '300 requests/minute per project limit',
      'Quota resets are unpredictable',
      'Cell limits (10M) cap data storage',
      'Performance degrades severely past 50k rows'
    ],
    solution: {
      description: 'A proper database handles millions of rows with consistent sub-second query times.',
      benefits: [
        'Millions of rows, no slowdown',
        'No daily quota limits',
        'Proper indexing and optimization',
        'Concurrent access without conflicts'
      ]
    }
  },
  {
    type: 'critical',
    title: 'Webflow form not submitting',
    message: 'Contact form webhook failed 3 times in the last hour. Leads may be lost.',
    action: 'View Details',
    tool: 'Webflow',
    risks: [
      'Webhook failures happen silently (leads lost)',
      'No retry mechanism for failed submissions',
      'Form spam requires expensive add-ons',
      'Limited form field types and validation'
    ],
    solution: {
      description: 'A custom form endpoint with proper error handling, retries, and spam protection.',
      benefits: [
        'Automatic retry on failures',
        'Built-in spam protection',
        'Full validation control',
        'Never lose a lead'
      ]
    }
  }
]

export default function StackGuardDemo() {
  const [showToast, setShowToast] = useState(false)
  const [toastAlert, setToastAlert] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  const openAlertModal = (alert) => {
    setSelectedAlert(alert)
    setIsModalOpen(true)
  }

  const closeAlertModal = () => {
    setIsModalOpen(false)
    setSelectedAlert(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // Get next toast index from localStorage, rotate through all 8
      let nextIndex = 0
      if (typeof window !== 'undefined') {
        const lastIndex = parseInt(localStorage.getItem('stackguard-toast-index') || '-1', 10)
        nextIndex = (lastIndex + 1) % toastAlerts.length
        localStorage.setItem('stackguard-toast-index', nextIndex.toString())
      }

      setToastAlert(toastAlerts[nextIndex])
      setShowToast(true)
    }, 8000) // 8 seconds after page load

    return () => clearTimeout(timer)
  }, [])

  const dismissToast = () => setShowToast(false)

  return (
    <CheckCycleProvider>
    <div className="min-h-screen bg-sg-bg transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-sg-border sticky top-0 bg-sg-bg/80 backdrop-blur-xl z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sg-primary to-purple-500 flex items-center justify-center">
                <Icon name="shield" className="text-white" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-sg-text">StackGuard</span>
                  <span className="text-xs px-2 py-0.5 bg-sg-primary/20 text-sg-primary rounded-full font-medium">
                    DEMO
                  </span>
                </div>
                <span className="text-xs text-sg-muted">Business Tech Health Monitor</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="https://cameronobrien.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sg-muted hover:text-sg-text transition-colors flex items-center gap-1 px-3 py-2"
              >
                <Icon name="arrow_back" className="text-sm" size={16} />
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero: Health Score */}
        <HealthHero />

        {/* Row 2: Alerts + Connected Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveAlerts onAlertClick={openAlertModal} />
          <ConnectedTools />
        </div>

        {/* Row 3: Usage + Costs + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UsageLimits />
          <CostTracker />
          <ActivityFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sg-border mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-sg-muted">
                Wondering if custom code might be right for you?{' '}
                <a
                  href="https://cal.cameronobrien.dev"
                  className="text-sg-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a call with Cameron
                </a>
              </p>
              <p className="text-sm text-sg-muted mt-1">
                Built by{' '}
                <a
                  href="https://cameronobrien.dev"
                  className="text-sg-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cameron O'Brien
                </a>
                {' '}- Available for freelance projects.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/cameronobriendev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sg-muted hover:text-sg-text transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/cameronobriendev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sg-muted hover:text-sg-text transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast notification */}
      <Toast show={showToast} onDismiss={dismissToast} alert={toastAlert} onActionClick={openAlertModal} />

      {/* Alert detail modal */}
      <AlertDetailModal isOpen={isModalOpen} onClose={closeAlertModal} alert={selectedAlert} />
    </div>
    </CheckCycleProvider>
  )
}
