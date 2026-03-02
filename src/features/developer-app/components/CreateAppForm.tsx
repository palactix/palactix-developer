"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateApp } from "../developer-app.hooks";

const schema = z.object({
  name: z.string().min(3, "App name must be at least 3 characters").max(50),
});

type FormValues = z.infer<typeof schema>;

export const CreateAppForm = () => {
  const router = useRouter();
  const { mutateAsync: createApp, isPending } = useCreateApp();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createApp({ name: data.name, logo: logoFile || undefined });
      toast.success("App created successfully!");
      if (response?.data?.id) {
         router.push(`/developer/apps/${response.data.id}`);
      } else {
         router.push(`/developer/apps`);
      }
    } catch {
      toast.error("Failed to create app");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 max-w-xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Create Developer App</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Set up a new app to access our API and Webhooks.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="logo">App Logo (Optional)</Label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden shrink-0">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <UploadCloud className="h-6 w-6 text-zinc-400" />
              )}
            </div>
            <div className="flex-1 text-sm">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                  Upload Image
                </Button>
                <p className="text-xs text-zinc-500 mt-2">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">App Name</Label>
          <Input 
            id="name" 
            placeholder="E.g. Palactix Publisher" 
            {...register("name")} 
            className={`h-11 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`} 
          />
          <AnimatePresence mode="popLayout">
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full h-11" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create App"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};