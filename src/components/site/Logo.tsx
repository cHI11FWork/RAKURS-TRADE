import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center ${className ?? ""}`}>
      <span className="relative inline-flex">
        <Image
          src="/images/logo-full-white.png"
          alt="RAKURS TRADE"
          width={1274}
          height={355}
          className="logo-mark-img h-8 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
          priority
          unoptimized
        />
        <span className="logo-mark-shine pointer-events-none absolute inset-0" aria-hidden="true" />
      </span>
    </Link>
  );
}
