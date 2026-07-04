import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Image src="/images/logo-bolt.png" alt="" width={36} height={44} className="h-9 w-auto shrink-0" priority />
      </span>
      <span className="font-heading text-lg font-extrabold tracking-wide text-white whitespace-nowrap">
        RAKURS <span className="text-brand">TRADE</span>
      </span>
    </Link>
  );
}
