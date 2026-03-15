import Image, { ImageProps } from "next/image";

export type LogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  width?: number;
  height?: number;
};

export function Logo({ width = 32, height = 32, ...props }: LogoProps) {
  
  return (
    // <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
    //   <span className="text-white font-bold text-lg">P</span>
    // </div>
    <Image  width={width} height={height} {...props} src="/logo.svg" alt="Palactix Logo" />
  );
}