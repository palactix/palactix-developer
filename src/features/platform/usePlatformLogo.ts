import { Platform } from "./platform.types";
import { useTheme } from "next-themes";

export const usePlatformLogo = (
  platform: Platform | undefined | null
) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  if (!platform || !platform.icon) {
    return null;
  }

  const { icon } = platform;

  if (theme === "dark") {
    if (icon["logo-white-svg"]) return icon["logo-white-svg"];
    if (icon["logo-white-png"]) return icon["logo-white-png"];
    if (icon["logo-svg"]) return icon["logo-svg"];
    if (icon["logo-png"]) return icon["logo-png"];
  } else {
    if (icon["logo-black-svg"]) return icon["logo-black-svg"];
    if (icon["logo-black-png"]) return icon["logo-black-png"];
    if (icon["logo-svg"]) return icon["logo-svg"];
    if (icon["logo-png"]) return icon["logo-png"];
  }

  // Fallback to the first available string value in the object
  const values = Object.values(icon).filter(v => typeof v === "string" && v.length > 0);
  if (values.length > 0) {
    return values[0];
  }

  return null;
};