import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "fluid"
  className?: string
}

export function Container({
  children,
  size = "lg",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        {
          "max-w-screen-sm": size === "sm",
          "`max-w-4xl": size === "md",
          "max-w-6xl": size === "lg",
          "max-w-8xl": size === "xl",
          "max-w-none": size === "fluid",
        },
        className
      )}
    >
      {children}
    </div>
  )
}