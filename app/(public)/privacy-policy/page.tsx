import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Propity Realty',
  description: 'Privacy Policy for Propity Realty — 17 Kani Residential Township, Agartala, Tripura.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase mb-2">Legal</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1A1A2E] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#5C5C72] text-sm">Last updated: April 2025</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-8 text-[#5C5C72] text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">1. Introduction</h2>
            <p>
              Welcome to Propity Realty ("we", "our", or "us"). We operate the website propity.in ("the Site"),
              which provides information about our 17 Kani Residential Township project in Laxmilunga, Agartala, Tripura.
            </p>
            <p className="mt-3">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website or contact us. Please read this policy carefully. By using our Site, you agree to the
              collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">2. Information We Collect</h2>
            <p className="font-semibold text-[#1A1A2E] mb-2">Information You Provide Directly</p>
            <p>When you fill out our booking form or enquiry form, we collect:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Your full name</li>
              <li>Phone number</li>
              <li>Email address (if provided)</li>
              <li>City of residence</li>
              <li>Plot preference and any message you send</li>
            </ul>

            <p className="font-semibold text-[#1A1A2E] mb-2 mt-4">Information Collected Automatically</p>
            <p>When you visit our Site, we may automatically collect:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Browser type and version</li>
              <li>Pages you visit and time spent</li>
              <li>Referring URL (the page that sent you to us)</li>
              <li>Device type and operating system</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Respond to your booking requests and enquiries</li>
              <li>Contact you about your plot interest via phone or WhatsApp</li>
              <li>Send you updates about the 17 Kani Township project</li>
              <li>Improve our website based on how visitors use it</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience.
              Cookies are small data files placed on your device.
            </p>
            <p className="mt-3 font-semibold text-[#1A1A2E]">Types of cookies we use:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong>Essential cookies</strong>: Required for the website to function properly</li>
              <li><strong>Analytics cookies</strong>: Help us understand how visitors use our site (via Google Analytics)</li>
              <li><strong>Advertising cookies</strong>: Used by Google AdSense and Facebook Pixel to show relevant ads</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">5. Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve
              ads based on your prior visits to our site and other sites on the Internet.
            </p>
            <p className="mt-3">
              Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our
              site. You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                className="text-[#1B4332] underline">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">6. Facebook Pixel</h2>
            <p>
              We use Facebook Pixel to measure the effectiveness of our advertising and to understand website
              visitor actions. Facebook Pixel collects data that helps us show relevant ads to people on Facebook
              and Instagram.
            </p>
            <p className="mt-3">
              You can learn more about Facebook's data practices and opt out at{' '}
              <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer"
                className="text-[#1B4332] underline">Facebook Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">7. Data Storage and Security</h2>
            <p>
              Your personal data (booking and enquiry information) is stored securely in our Supabase database
              hosted on servers in South Asia (Mumbai). We implement appropriate technical and organizational
              measures to protect your data against unauthorized access, alteration, or disclosure.
            </p>
            <p className="mt-3">
              We retain your personal data only as long as necessary to fulfill the purposes described in this
              policy or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (such as Google Maps, WhatsApp). We are not
              responsible for the privacy practices of these external sites. We encourage you to review the
              privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the details below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">10. Children's Privacy</h2>
            <p>
              Our website is not directed to children under 13. We do not knowingly collect personal information
              from children. If you believe we have inadvertently collected information from a child, please
              contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new policy on this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-3">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong className="text-[#1A1A2E]">Propity Realty</strong></p>
              <p>17 Kani Residential Township, Laxmilunga</p>
              <p>Agartala, Tripura — 799101</p>
              <p>Phone: <a href="tel:8132953235" className="text-[#1B4332] font-semibold">+91 81329 53235</a></p>
              <p>Email: <a href="mailto:hadukpara@gmail.com" className="text-[#1B4332] font-semibold">hadukpara@gmail.com</a></p>
            </div>
          </section>

        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-[#1B4332] font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
