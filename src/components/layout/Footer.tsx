import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  eventName?: string;
  tagline?: string | null;
  organizerEmail?: string | null;
  organizerPhone?: string | null;
  venueName?: string | null;
}

export function Footer({
  eventName = "SAMANVAYA 2027",
  tagline = "United for Health. Together for a Sustainable Future.",
  organizerEmail = "samanvaya2027@gmail.com",
  organizerPhone = "9482169629",
  venueName = "Moorsavir Math College Ground, Hubballi",
}: FooterProps) {
  return (
    <footer className="bg-[#0D3B0D] text-white">
      <div className="container-wide section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">{eventName}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{tagline}</p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/agenda" className="hover:text-white transition">Agenda</Link></li>
              <li><Link href="/sponsors" className="hover:text-white transition">Partners</Link></li>
              <li><Link href="/register" className="hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {organizerEmail && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0" />
                  <a href={`mailto:${organizerEmail}`} className="hover:text-white transition">
                    {organizerEmail}
                  </a>
                </li>
              )}
              {organizerPhone && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0" />
                  <a href={`tel:${organizerPhone}`} className="hover:text-white transition">
                    {organizerPhone}
                  </a>
                </li>
              )}
              {venueName && (
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{venueName}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          © {new Date().getFullYear()} {eventName} Organising Committee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
