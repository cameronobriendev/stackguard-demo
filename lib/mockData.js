// Tool configurations with realistic limits from research
export const tools = [
  {
    id: 'zapier',
    name: 'Zapier',
    icon: 'bolt',
    status: 'healthy',
    metric: { value: 12, label: 'Active Zaps' },
    usage: { current: 7320, limit: 10000, label: 'Tasks/mo' },
    cost: 412
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: 'table_view',
    status: 'warning',
    metric: { value: 42847, label: 'Records' },
    usage: { current: 42847, limit: 50000, label: 'Records' },
    cost: 240
  },
  {
    id: 'make',
    name: 'Make.com',
    icon: 'settings_suggest',
    status: 'healthy',
    metric: { value: 8, label: 'Scenarios' },
    usage: { current: 4200, limit: 10000, label: 'Ops/mo' },
    cost: 198
  },
  {
    id: 'bubble',
    name: 'Bubble',
    icon: 'bubble_chart',
    status: 'healthy',
    metric: { value: 2100, label: 'WU Used' },
    usage: { current: 2100, limit: 5000, label: 'Workload Units' },
    cost: 99
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'edit_note',
    status: 'healthy',
    metric: { value: 847, label: 'Pages' },
    usage: { current: 847, limit: 10000, label: 'Pages' },
    cost: 32
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    icon: 'table_chart',
    status: 'healthy',
    metric: { value: 24500, label: 'Rows' },
    usage: { current: 24500, limit: 100000, label: 'Rows' },
    cost: 0
  },
  {
    id: 'webflow',
    name: 'Webflow',
    icon: 'web',
    status: 'healthy',
    metric: { value: 1240, label: 'CMS Items' },
    usage: { current: 1240, limit: 10000, label: 'CMS Items' },
    cost: 42
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: 'article',
    status: 'healthy',
    metric: { value: 156, label: 'Posts' },
    usage: { current: 156, limit: 999999, label: 'Posts' },
    cost: 19
  }
]

// Alert pool - these cycle in and out
export const alertPool = [
  {
    id: 1,
    type: 'warning',
    icon: 'warning',
    title: 'Airtable "Customer CRM" approaching limit',
    message: 'At 42,847/50,000 records. At current growth rate, you\'ll hit the hard limit in 4.5 months.',
    action: 'View Details',
    tool: 'Airtable',
    risks: [
      'Hard 50,000 record limit forces expensive plan upgrade ($45/mo to $90/mo per seat)',
      'No warning before hitting limit - automations fail silently',
      'Data export required for migration is complex and lossy',
      'API rate limits (5 requests/second) cause sync delays at scale'
    ],
    solution: {
      description: 'A PostgreSQL database with a simple admin UI gives you unlimited records, full SQL power, and complete data ownership for a fraction of the cost.',
      benefits: [
        'Unlimited records (no artificial limits)',
        'Full SQL queries and joins',
        '$0-20/month for most use cases',
        'Your data, your servers, no vendor lock-in'
      ]
    }
  },
  {
    id: 2,
    type: 'critical',
    icon: 'error',
    title: 'Zapier "Order Processing" silent failure',
    message: 'Hasn\'t run in 72 hours. Previous average: 12 runs/day. Possible authentication issue.',
    action: 'View Details',
    tool: 'Zapier',
    risks: [
      'Silent failures mean lost orders, missed leads, and broken workflows',
      'No built-in alerting for failed automations on lower plans',
      'Task-based pricing adds up fast ($30-150/mo for moderate usage)',
      'OAuth token expiry causes random disconnections'
    ],
    solution: {
      description: 'Self-hosted n8n or custom Node.js scripts with proper error handling and alerting. Same automation power with complete control.',
      benefits: [
        'Built-in error notifications and retries',
        'No per-task pricing (unlimited executions)',
        'Full debugging and logging visibility',
        'Self-hosted for $5-10/mo or free locally'
      ]
    }
  },
  {
    id: 3,
    type: 'warning',
    icon: 'trending_up',
    title: 'Stack costs increased 23% this month',
    message: 'Total: $1,042 vs $847 last month. Largest increase: Zapier (+$156 from task overages).',
    action: 'View Details',
    tool: 'Costs',
    risks: [
      'No-code platforms have unpredictable usage-based pricing',
      'Costs scale with business growth (punished for success)',
      'Vendor price increases happen without warning',
      'Multiple subscriptions compound into significant monthly burn'
    ],
    solution: {
      description: 'Custom code solutions have fixed infrastructure costs. A single $20/mo server can replace $500+ in no-code subscriptions.',
      benefits: [
        'Predictable, fixed monthly costs',
        'Scales with business without cost increases',
        'One-time development, years of savings',
        'Full ownership and no subscription dependency'
      ]
    }
  },
  {
    id: 4,
    type: 'warning',
    icon: 'speed',
    title: 'Bubble page load time increased 340%',
    message: '"Dashboard" now loading in 4.2 seconds (was 1.2s). Users may be experiencing slowdowns.',
    action: 'View Details',
    tool: 'Bubble',
    risks: [
      'Shared infrastructure means performance varies with platform load',
      'No control over server location or CDN configuration',
      'Database queries are black-boxed and unoptimizable',
      'Mobile performance is notoriously poor on complex apps'
    ],
    solution: {
      description: 'A Next.js or React app deployed on Vercel loads in under 500ms globally. Full control over performance optimization.',
      benefits: [
        'Sub-second load times globally',
        'Edge deployment and CDN built-in',
        'Optimized database queries',
        'Progressive Web App capabilities'
      ]
    }
  },
  {
    id: 5,
    type: 'info',
    icon: 'check_circle',
    title: 'Make.com scenario optimization available',
    message: '"Lead Sync" could save 1,200 ops/month by combining 3 HTTP modules into 1 batch request.',
    action: 'View Details',
    tool: 'Make.com',
    risks: [
      'Operation-based pricing incentivizes inefficient workflows',
      'Complex scenarios become expensive and hard to maintain',
      'Visual editor hides performance implications',
      'Debugging multi-step scenarios is time-consuming'
    ],
    solution: {
      description: 'A simple Node.js script can batch process thousands of records in a single execution. Write once, run forever.',
      benefits: [
        'Process unlimited records per execution',
        'Full error handling and retry logic',
        'Version controlled and testable code',
        'Runs on schedule or real-time via webhooks'
      ]
    }
  }
]

// Activity templates for the live feed
export const activityTemplates = [
  { type: 'success', icon: 'check_circle', tool: 'Zapier', workflow: 'New Lead to CRM', action: 'completed successfully' },
  { type: 'success', icon: 'sync', tool: 'Airtable', workflow: 'Customer Sync', action: 'verified - 0 conflicts' },
  { type: 'warning', icon: 'schedule', tool: 'Make.com', workflow: 'Order Processing', action: 'took 4.2s (usually 1.2s)' },
  { type: 'success', icon: 'check_circle', tool: 'Bubble', workflow: 'App Health', action: 'responding normally (241ms)' },
  { type: 'success', icon: 'security', tool: 'All Tools', workflow: 'Health Check', action: 'passed - 8/8 connected' },
  { type: 'success', icon: 'check_circle', tool: 'Zapier', workflow: 'Invoice Generator', action: 'sent 3 invoices' },
  { type: 'success', icon: 'cloud_done', tool: 'Google Sheets', workflow: 'Data Backup', action: 'synced 847 rows' },
  { type: 'info', icon: 'update', tool: 'Webflow', workflow: 'CMS Publish', action: '12 items updated' },
  { type: 'success', icon: 'check_circle', tool: 'Notion', workflow: 'API Sync', action: 'database connected' },
  { type: 'warning', icon: 'warning', tool: 'WordPress', workflow: 'Plugin Check', action: '2 updates available' }
]

// Usage limits for the progress bars
export const usageLimits = [
  {
    id: 'zapier-tasks',
    tool: 'Zapier',
    metric: 'Monthly Tasks',
    current: 7320,
    limit: 10000,
    daysLeft: 11,
    prediction: 'On track to exceed by ~2,100 tasks'
  },
  {
    id: 'airtable-records',
    tool: 'Airtable',
    metric: 'Database Records',
    current: 42847,
    limit: 50000,
    daysLeft: null,
    prediction: 'Hard limit in 4.5 months at current growth'
  },
  {
    id: 'airtable-runs',
    tool: 'Airtable',
    metric: 'Automation Runs',
    current: 7200,
    limit: 25000,
    daysLeft: 11,
    prediction: null
  },
  {
    id: 'make-ops',
    tool: 'Make.com',
    metric: 'Operations',
    current: 4200,
    limit: 10000,
    daysLeft: 11,
    prediction: null
  },
  {
    id: 'bubble-wu',
    tool: 'Bubble',
    metric: 'Workload Units',
    current: 2100,
    limit: 5000,
    daysLeft: null,
    prediction: null
  }
]

// Cost breakdown
export const costBreakdown = {
  total: 1042,
  previousTotal: 847,
  change: 23,
  items: [
    { tool: 'Zapier', amount: 412, change: 156 },
    { tool: 'Airtable', amount: 240, change: 0 },
    { tool: 'Make.com', amount: 198, change: 29 },
    { tool: 'Bubble', amount: 99, change: 0 },
    { tool: 'Others', amount: 93, change: 10 }
  ]
}
