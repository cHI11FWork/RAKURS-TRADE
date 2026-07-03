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
