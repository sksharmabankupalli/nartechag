import { useEffect, useRef, useState, type SVGProps } from "react";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Single source of truth for all social/contact links.               */
/* Change a URL here and it updates everywhere on the site.           */
/* ------------------------------------------------------------------ */

export type SocialKey = "instagram" | "telegram" | "mail";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  external: boolean;
  subtext?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "instagram",
    label: "Follow us on Instagram",
    href: "https://www.instagram.com/nartechag.app?srtk=dHh3bm14aXF6Z3Uy",
    external: true,
  },
  {
    key: "telegram",
    label: "Join our Telegram",
    href: "https://t.me/+Y2Y_BXW3oPdiY2Fl",
    external: true,
  },
  {
    key: "mail",
    label: "Contact us by Email",
    href: "mailto:Contact.Nartechag@gmail.com?subject=Contact%20NarTechAg",
    external: false,
    subtext: "Contact.Nartechag@gmail.com",
  },
];

/* ------------------------- Inline SVG logos ----------------------- */

function InstagramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.35" stopColor="#fa7e1e" />
          <stop offset="0.65" stopColor="#d62976" />
          <stop offset="0.85" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <rect x="6" y="6" width="12" height="12" rx="3.5" stroke="#fff" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="2.6" stroke="#fff" strokeWidth="1.8" fill="none" />
      <circle cx="16.4" cy="7.6" r="1.2" fill="#fff" />
    </svg>
  );
}

function TelegramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="#229ED9" />
      <path
        d="M17.6 7.1 15.9 16.4c-.13.58-.47.72-.95.45l-2.63-1.94-1.27 1.22c-.14.14-.26.26-.53.26l.19-2.68 4.88-4.41c.21-.19-.05-.29-.33-.1l-6.03 3.8-2.6-.81c-.56-.18-.57-.56.12-.83l10.16-3.92c.47-.17.88.11.66.07Z"
        fill="#fff"
      />
    </svg>
  );
}

function MailLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="3" fill="#fff" stroke="#EA4335" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function SocialLogo({ social, className }: { social: SocialKey; className?: string }) {
  if (social === "instagram") return <InstagramLogo className={className} />;
  if (social === "telegram") return <TelegramLogo className={className} />;
  return <MailLogo className={className} />;
}

/* --------------------------- Social card -------------------------- */

export function SocialCard({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={link.label}
      className={`social-card social-card-${link.key} group flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center`}
    >
      <span className="social-logo flex h-16 w-16 items-center justify-center rounded-full bg-card/80 shadow-soft">
        <SocialLogo social={link.key} className="h-10 w-10" />
      </span>
      <span className="font-display text-base font-semibold text-foreground">{link.label}</span>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Click here
        <ArrowRight className="social-arrow h-4 w-4" aria-hidden="true" />
      </span>
      {link.subtext && <span className="text-xs text-muted-foreground">{link.subtext}</span>}
    </a>
  );
}

/* --------------------- Connect With Us section -------------------- */

export function ConnectWithUs() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Connect with us"
      className={`connect-section border-t border-border ${visible ? "connect-visible" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="connect-reveal text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Stay Connected, Get Updates &amp; Contact Us
          </h2>
          <p className="mt-3 text-muted-foreground">
            Follow NarTechAg for new resources, PYQs and academic updates.
          </p>
        </div>
        <div className="connect-reveal mt-10 grid gap-5 sm:grid-cols-3">
          {SOCIAL_LINKS.map((link) => (
            <SocialCard key={link.key} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- Small icon links (footer) -------------------- */

export function SocialIconLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.key}
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={link.label}
          title={link.label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-footer-foreground/10 transition-colors hover:bg-footer-foreground/20"
        >
          <SocialLogo social={link.key} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
