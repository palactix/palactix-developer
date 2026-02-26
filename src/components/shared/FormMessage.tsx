import { ReactNode } from "react";

export function FormMessage({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p role="alert" className="text-xs text-destructive">{children}</p>;
}
