import {
  ShieldCheck,
  Cog,
  Trophy,
  MapPin,
  Zap,
  ShieldHalf,
  Crosshair,
  Calendar,
  Building2,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  gear: Cog,
  trophy: Trophy,
  "map-pin": MapPin,
  bolt: Zap,
  "shield-lightning": ShieldHalf,
  crosshair: Crosshair,
  calendar: Calendar,
  building: Building2,
  users: Users,
  "shield-check": ShieldCheck,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.14 4.98 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.96-1.37.24-.68.24-1.26.17-1.37-.07-.12-.27-.2-.56-.34z" />
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.3.17 11.83c0 2.08.55 4.1 1.6 5.89L0 24l6.44-1.68a11.9 11.9 0 0 0 5.62 1.43h.01c6.56 0 11.89-5.3 11.89-11.83 0-3.16-1.24-6.13-3.44-8.44zM12.07 21.6h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.66.96.98-3.55-.24-.37a9.77 9.77 0 0 1-1.5-5.22c0-5.42 4.44-9.83 9.9-9.83 2.64 0 5.13 1.03 6.99 2.9a9.7 9.7 0 0 1 2.9 6.92c0 5.42-4.44 9.78-9.97 9.78z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      <rect x={3} y={3} width={18} height={18} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.2} cy={6.8} r={1.1} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AppIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICON_MAP[name] ?? ShieldCheck;
  return <Cmp className={className} aria-hidden="true" />;
}
