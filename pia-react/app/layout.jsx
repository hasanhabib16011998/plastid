import './globals.css'
import '../src/assets/css/style.css'
import '../src/assets/css/responsive.css'

export const metadata = {
  title: 'Plastid Interior & Architecture',
  description: 'Premier full-service interior design and architectural execution firm based in Dhaka, Bangladesh.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
