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
    action: 'View Migration Options',
    tool: 'Airtable'
  },
  {
    id: 2,
    type: 'critical',
    icon: 'error',
    title: 'Zapier "Order Processing" silent failure',
    message: 'Hasn\'t run in 72 hours. Previous average: 12 runs/day. Possible authentication issue.',
    action: 'Check Connection',
    tool: 'Zapier'
  },
  {
    id: 3,
    type: 'warning',
    icon: 'trending_up',
    title: 'Stack costs increased 23% this month',
    message: 'Total: $1,042 vs $847 last month. Largest increase: Zapier (+$156 from task overages).',
    action: 'View Breakdown',
    tool: 'Costs'
  },
  {
    id: 4,
    type: 'warning',
    icon: 'speed',
    title: 'Bubble page load time increased 340%',
    message: '"Dashboard" now loading in 4.2 seconds (was 1.2s). Users may be experiencing slowdowns.',
    action: 'Investigate',
    tool: 'Bubble'
  },
  {
    id: 5,
    type: 'info',
    icon: 'check_circle',
    title: 'Make.com scenario optimization available',
    message: '"Lead Sync" could save 1,200 ops/month by combining 3 HTTP modules into 1 batch request.',
    action: 'View Suggestion',
    tool: 'Make.com'
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
