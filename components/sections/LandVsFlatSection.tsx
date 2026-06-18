import Image from 'next/image'

export default function LandVsFlatSection() {
  return (
    <section className="py-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/land-vs-flat.png"
            alt="Buying a Flat VS Buying Land — 100% Land Ownership, Rental Income, Future Appreciation 3X-4X"
            width={1400} height={900}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
