import Image from "next/image";
import { Platform } from "./platform.types";
import { usePlatformLogo } from "./usePlatformLogo";
import { cn, getInitials } from "@/lib/utils";

export type PlatformLogoProps = {
  platform: Platform;
  width?: number;
  height?: number;
  className?: string;
};


export function PlatformLogo({ platform, width = 48, height = 48, className }: PlatformLogoProps) {
  const logo = usePlatformLogo(platform);

  if(!logo) {
    return (
      <span className="text-xs font-semibold uppercase text-zinc-500">{getInitials(platform.name)}</span>
    )
  }

  return (
     <Image
        width={width}
        height={height}
        src={logo || "/placeholder-logo.png"}
        alt={platform.name}
        className={ cn("w-10 h-10 object-contain", className) }
        unoptimized
      />
  )
}