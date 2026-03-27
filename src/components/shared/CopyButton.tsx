"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  ariaLabel: string;
  label?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  iconClassName?: string;
  copiedIconClassName?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
  resetDelayMs?: number;
};

export function CopyButton({
  text,
  ariaLabel,
  label,
  successMessage = "Copied to clipboard",
  errorMessage = "Unable to copy to clipboard",
  className,
  iconClassName,
  copiedIconClassName,
  variant = "ghost",
  size = "icon-sm",
  disabled,
  resetDelayMs = 1800,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!text || disabled || typeof navigator === "undefined" || !navigator.clipboard) {
      toast.error(errorMessage);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, resetDelayMs);
    } catch {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleCopy}
      disabled={disabled || !text}
      aria-label={ariaLabel}
    >
      {copied ? (
        <Check className={cn("h-4 w-4 text-green-500", copiedIconClassName)} />
      ) : (
        <Copy className={cn("h-4 w-4", iconClassName)} />
      )}
      {label ? <span>{label}</span> : null}
    </Button>
  );
}