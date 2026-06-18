import type { Metadata } from 'next'
import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Propity Realty | 17 Kani Residential Plots in Laxmilunga, Agartala',
  description:
    '63 residential plots for sale in Laxmilunga, Agartala, Tripura. 12 min from city, near Taj Vivanta & Upcoming IPL Stadium. Book with ₹1 Lakh token amount.',
  keywords: ['plots for sale Agartala', 'residential land Tripura', 'Laxmilunga plots', '17 Kani township', 'TUDA approved plots'],
  openGraph: {
    title: 'Propity Realty | 17 Kani Residential Township',
    description: '63 residential plots in Laxmilunga, Agartala. Book with ₹1 Lakh.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Meta Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '472352642851960');
          fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=472352642851960&ev=PageView&noscript=1"/>` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateListing',
              name: '17 Kani Residential Township',
              description: '63 residential plots in Laxmilunga Special Planning Area, Agartala',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Laxmilunga Special Planning Area',
                addressLocality: 'Agartala',
                addressRegion: 'Tripura',
                postalCode: '799101',
                addressCountry: 'IN',
              },
              price: '3000000',
              priceCurrency: 'INR',
              telephone: '+918132953235',
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
