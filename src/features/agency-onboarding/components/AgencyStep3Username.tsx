"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, AtSign, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkUsernameAvailability } from "../agency-onboarding.api";

interface Props {
  onComplete: (username: string) => void;
  onBack: () => void;
}

type CheckStatus = "idle" | "checking" | "available" | "unavailable" | "invalid";

const USERNAME_REGEX = /^[a-z0-9-]+$/;

export const AgencyStep3Username = ({ onComplete, onBack }: Props) => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [message, setMessage] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkAvailability = useCallback(async (value: string) => {
    if (value.length < 3) {
      setStatus("idle");
      setMessage("");
      return;
    }
    if (!USERNAME_REGEX.test(value)) {
      setStatus("invalid");
      setMessage("Only lowercase letters, numbers and hyphens allowed.");
      return;
    }

    setStatus("checking");
    try {
      const result = await checkUsernameAvailability(value);
      if (result.available) {
        setStatus("available");
        setMessage(`${value}.palactix.com is available!`);
      } else {
        setStatus("unavailable");
        setMessage(`${value}.palactix.com is taken. Try a different one.`);
      }
    } catch {
      setStatus("idle");
      setMessage("Could not check availability. Please try again.");
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!username) return;

    debounceRef.current = setTimeout(() => {
      checkAvailability(username);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username, checkAvailability]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, "-");
    setUsername(value);
    setStatus("idle");
  };

  const borderClass =
    status === "available"
      ? "border-emerald-400 focus-visible:ring-emerald-400"
      : status === "unavailable" || status === "invalid"
        ? "border-red-400 focus-visible:ring-red-400"
        : "";

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <AtSign className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Step 3 of 4
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Choose your workspace URL
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          This is the unique address for your agency workspace. It cannot be changed after setup.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Workspace URL</Label>

          {/* Input with suffix */}
          <div className="flex items-center">
            <div className="relative flex-1">
              <Input
                id="username"
                value={username}
                onChange={handleChange}
                autoFocus
                placeholder="your-agency"
                maxLength={40}
                className={`h-11 rounded-r-none border-r-0 font-mono lowercase ${borderClass}`}
              />
            </div>
            <div className="h-11 px-3 flex items-center border border-l-0 border-zinc-300 dark:border-zinc-700 rounded-r-md bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 select-none whitespace-nowrap">
              .palactix.com
            </div>
          </div>

          {/* Status feedback */}
          <AnimatePresence mode="popLayout">
            {status !== "idle" && (
              <motion.div
                key={status}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5"
              >
                {status === "checking" && (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
                    <span className="text-xs text-zinc-500">Checking availability…</span>
                  </>
                )}
                {status === "available" && (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{message}</span>
                  </>
                )}
                {(status === "unavailable" || status === "invalid") && (
                  <>
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs text-red-500">{message}</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview card */}
        <AnimatePresence>
          {username.length >= 3 && status === "available" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60"
            >
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Your workspace
              </p>
              <p className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                https://<span className="text-blue-600 dark:text-blue-400">{username}</span>.palactix.com
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button type="button" variant="ghost" className="sm:w-auto gap-1" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          className="flex-1 h-11 gap-1"
          disabled={status !== "available"}
          onClick={() => onComplete(username)}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
