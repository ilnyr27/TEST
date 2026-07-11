import Image from "next/image";

export function AppLogo({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Познай себя"
      width={size}
      height={size}
      className={`rounded-lg ${className}`}
      priority
    />
  );
}
