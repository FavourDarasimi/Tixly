import Link from "next/link";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-white">
              Tixly
            </Link>

            <p className="mt-4 max-w-sm text-slate-400 leading-relaxed">
              Discover events, buy tickets instantly, and manage events
              effortlessly — all in one powerful platform.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/events" className="hover:text-white transition">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events/trending"
                  className="hover:text-white transition"
                >
                  Trending Events
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition">
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Organizers
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/create-event"
                  className="hover:text-white transition"
                >
                  Create an Event
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/scan" className="hover:text-white transition">
                  Ticket Scanner
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Tixly. All rights reserved.</p>

          <p>Secure payments · QR code check-ins · Built for scale</p>
        </div>
      </div>
    </footer>
  );
}
