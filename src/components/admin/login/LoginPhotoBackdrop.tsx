import Image from "next/image";

export function LoginPhotoBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <Image
        src="/images/hero-industrial-night.jpg"
        alt=""
        fill
        priority
        className="hero-photo object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
    </div>
  );
}
