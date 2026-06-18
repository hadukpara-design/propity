import Link from 'next/link'

export default function CTABand() {
  return (
    <section className="py-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <Link href="/book" className="block rounded-2xl overflow-hidden shadow-md hover:opacity-95 transition-opacity cursor-pointer">
          <img
            src="/images/book-cta.png"
            alt="Book Your Dream Plot Today — Only ₹1,00,000. Call & WhatsApp: 8132953235. Secure Your Plot Today. Build Your Dream Home Tomorrow. 100% Land Ownership. High Future Appreciation Potential. Limited Inventory. Invest in Land. Build Your Future. Create Generational Wealth."
            className="w-full"
          />
        </Link>
      </div>
    </section>
  )
}
