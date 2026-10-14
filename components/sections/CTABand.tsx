import Link from 'next/link'
import Image from 'next/image'

export default function CTABand() {
  return (
    <section className="py-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <Link href="/book" className="block rounded-2xl overflow-hidden shadow-md hover:opacity-95 transition-opacity cursor-pointer">
          <Image
            src="/images/book-cta.png"
            alt="Book Your Dream Plot Today — Only ₹1,00,000. Call & WhatsApp: 8132953235."
            width={1400} height={500}
            className="w-full h-auto"
          />
        </Link>
      </div>
    </section>
  )
}
