# StackGuard Demo

A demo dashboard for business owners to monitor their no-code tech stack health at a glance.

**Live Demo:** [dash.clientflow.dev](https://dash.clientflow.dev)

## What It Does

StackGuard gives business owners a single view of their entire no-code stack (Zapier, Airtable, Make.com, Bubble, etc.) instead of checking 10 different platforms every morning.

Wondering if custom code might be right for you? [Book a call with Cameron](https://cal.cameronobrien.dev)

## Features

- **Health Score** - Overall tech stack health percentage with live updates
- **Active Alerts** - Proactive warnings about usage limits, sync delays, cost increases
- **Connected Tools** - Status grid showing 8 common no-code tools
- **Usage & Limits** - Progress bars for quotas with predictions
- **Cost Tracker** - Monthly spend breakdown with trend indicators
- **Activity Feed** - Real-time log of automation events
- **Toast Notifications** - Rotating alerts that appear 8 seconds after page load
- **Light/Dark Theme** - Toggle in header, defaults to light mode

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- Framer Motion
- Material Symbols (inline SVGs)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deployed on Vercel at `dash.clientflow.dev`

```bash
vercel --prod
```

## Author

Built by [Cameron O'Brien](https://cameronobrien.dev)
