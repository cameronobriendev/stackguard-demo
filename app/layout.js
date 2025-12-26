import './globals.css'

export const metadata = {
  title: 'StackGuard - Business Tech Health Dashboard',
  description: 'See your entire no-code stack health at a glance. Stop checking 10 platforms before your morning coffee.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
