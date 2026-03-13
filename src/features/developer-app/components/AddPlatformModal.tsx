"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/shared/CopyButton";
import { usePlatforms } from "@/features/platform/platform.hooks";
import { usePlatformLogo } from "@/features/platform/usePlatformLogo";
import type { Platform } from "@/features/platform/platform.types";
import { useAddCredentials, useUpdateCredentials } from "../developer-app.hooks";
import type { AddCredentialsPayload, PlatformIntegration } from "../developer-app.types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appId: string;
  integratedPlatformIds: number[];
  editingIntegration?: PlatformIntegration | null;
};

type FormValues = {
  client_id: string;
  client_secret: string;
};

const PlatformOptionCard = ({
  platform,
  onSelect,
  disabled,
}: {
  platform: Platform;
  onSelect: (platform: Platform) => void;
  disabled?: boolean;
}) => {
  const logo = usePlatformLogo(platform);

  return (
    <button
      type="button"
      key={platform.id}
      onClick={() => onSelect(platform)}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-all border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
    >
      <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden text-xl font-bold text-zinc-400">
        {logo ? (
          <Image src={logo} alt={platform.name} className="h-8 w-8 object-contain" width={32} height={32} />
        ) : (
          platform.name[0]
        )}
      </div>
      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100 text-center">
        {platform.name}
      </span>
    </button>
  );
};

export const AddPlatformModal = ({ isOpen, onClose, appId, integratedPlatformIds, editingIntegration }: ModalProps) => {
  const { data: platforms, isLoading, isError } = usePlatforms();
  const { mutateAsync: addCredentials } = useAddCredentials();
  const { mutateAsync: updateCredentials } = useUpdateCredentials();

  const isEditMode = !!editingIntegration;

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      client_id: "",
      client_secret: "",
    },
  });

  const resetAndClose = () => {
    setSelectedPlatform(editingIntegration?.platform ?? null);
    reset();
    onClose();
  };

  const redirectUrl = selectedPlatform
    ? `${process.env.NEXT_PUBLIC_CORE_SYSTEM_URL}/oauth/${selectedPlatform.slug}/callback`
    : "";

  useEffect(() => {
    if (!isOpen) return;

    if (editingIntegration) {
      const existingClientId = editingIntegration.client_id ?? "";
      const existingClientSecret = editingIntegration.client_secret ?? "";

      setSelectedPlatform(editingIntegration.platform);
      reset({
        client_id: existingClientId,
        client_secret: existingClientSecret,
      });
      return;
    }

    setSelectedPlatform(null);
    reset({
      client_id: "",
      client_secret: "",
    });
  }, [editingIntegration, isOpen, reset]);

  const handleSave = async (values: FormValues) => {
    if (!selectedPlatform) return;

    setIsSubmitting(true);
    try {
      const payload: AddCredentialsPayload = {
        platform_id: String(selectedPlatform.id),
        client_id: values.client_id,
        client_secret: values.client_secret,
        client_meta: {
          redirect_url: redirectUrl,
        },
      };

      if (editingIntegration) {
        await updateCredentials({
          appId,
          integrationId: editingIntegration.id,
          payload,
        });
      } else {
        await addCredentials({ appId, payload });
      }

      resetAndClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-3">
                  {selectedPlatform && !isEditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlatform(null);
                        reset();
                      }}
                      className="p-1 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedPlatform
                      ? `${isEditMode ? "Edit Credentials for" : "Add Credentials for"} ${selectedPlatform.name}`
                      : "Add Platform"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  {!selectedPlatform ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 grid grid-cols-2 gap-4"
                    >
                      {isLoading && (
                        <div className="col-span-2 flex items-center justify-center py-12">
                          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                        </div>
                      )}

                      {isError && (
                        <div className="col-span-2 flex items-center justify-center px-8 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
                          Unable to load platforms right now. Please try again.
                        </div>
                      )}

                      {!isLoading && !isError && platforms?.map((platform) => (
                        <PlatformOptionCard
                          key={platform.id}
                          platform={platform}
                          onSelect={setSelectedPlatform}
                          disabled={integratedPlatformIds.includes(platform.id)}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit(handleSave)}
                      className="p-6 space-y-5"
                      autoComplete="new-password"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                            <Label htmlFor="redirect_url">Redirect URL</Label>
                            <p className="text-[11px] font-medium text-amber-700 dark:text-amber-300">
                              Paste this redirect URL to your platform app.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              id="redirect_url"
                              value={redirectUrl}
                              readOnly
                              className="h-11 font-mono text-xs"
                            />
                            <CopyButton
                              text={redirectUrl}
                              ariaLabel="Copy redirect URL"
                              successMessage="Redirect URL copied"
                              errorMessage="Unable to copy redirect URL"
                              variant="outline"
                              size="icon-lg"
                              className="h-11 w-11 shrink-0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client_id">Platform App ID</Label>
                          <Input
                            id="client_id"
                            autoComplete="new-password"
                            placeholder="E.g. 1234567890"
                            className="h-11"
                            {...register("client_id", { required: true })}
                          />
                          {errors.client_id && <p className="text-xs text-red-500">Platform App ID is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="client_secret">Platform Secret</Label>
                          <Input
                            id="client_secret"
                            placeholder="Enter the secret key"
                            className="h-11"
                            autoComplete="new-password"
                            {...register("client_secret", { required: true })}
                          />
                          {errors.client_secret && <p className="text-xs text-red-500">Platform Secret is required</p>}
                        </div>
                      </div>
                      <div className="border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
                        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            isEditMode ? "Update Credentials" : "Save Credentials"
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
