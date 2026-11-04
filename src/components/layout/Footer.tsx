import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-primary)]">SAMANVAYA 2027</h3>
            <p className="mt-2 text-sm text-slate-600">
              A student-run event management platform for college festivals and conferences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-[var(--color-primary)]">About</Link></li>
              <li><Link href="/agenda" className="hover:text-[var(--color-primary)]">Agenda</Link></li>
              <li><Link href="/register" className="hover:text-[var(--color-primary)]">Register</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-primary)]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:text-[var(--color-primary)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--color-primary)]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SAMANVAYA 2027. Built for students.
        </div>
      </div>
    </footer>
  );
}
