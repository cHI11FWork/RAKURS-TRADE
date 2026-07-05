import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center group ${className ?? ""}`}>
      <Image
        src="/images/logo-full-white.png"
        alt="RAKURS TRADE"
        width={1274}
        height={355}
        className="h-8 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
        priority
        unoptimized
      />
    </Link>
  );
}
