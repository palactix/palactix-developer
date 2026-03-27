"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, UploadCloud, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateApp } from "@/features/developer-app/developer-app.hooks";
import { notify } from "@/shared/notifications/notifier";

const schema = z.object({
  name: z.string().min(3, "App name must be at least 3 characters").max(50, "App name must be at most 50 characters"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  appId: string;
  initialName?: string;
  onComplete: () => void;
}

export const AgencyStep1CreateApp = ({ appId, initialName, onComplete }: Props) => {
  const { mutateAsync: updateAppMutation, isPending } = useUpdateApp();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: initialName ?? "" },
  });

  // Prefill once the parent passes the initial name
  useEffect(() => {
    if (initialName) {
      reset({ name: initialName });
    }
  }, [initialName, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateAppMutation({ id: appId, payload: { name: data.name, logo: logoFile ?? undefined } });
      onComplete();
    } catch {
      notify.error("Failed to save workspace details. Please try again.");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      notify.error("Image must be under 5MB");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Building2 className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Step 1 of 4
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Confirm your workspace details
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Your workspace was created during sign-up. Update the name or logo if needed before continuing.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* App Name */}
        <div className="space-y-2">
          <Label htmlFor="agency-name">Workspace Name</Label>
          <Input
            id="agency-name"
            placeholder="E.g. Acme Media Agency"
            autoFocus
            className={`h-11 ${errors.name ? "border-red-500 focus-visible:ring-red-400" : ""}`}
            {...register("name")}
          />
          <AnimatePresence mode="popLayout">
            {errors.name && (
              <motion.p
                key="name-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <div className="space-y-2">
          <Label>Workspace Logo <span className="text-zinc-400">(optional)</span></Label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden shrink-0">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <UploadCloud className="h-6 w-6 text-zinc-400" />
              )}
            </div>
            <div className="flex-1">
              <input
                id="agency-logo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("agency-logo")?.click()}
              >
                Upload Image
              </Button>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full h-11 gap-1" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};


