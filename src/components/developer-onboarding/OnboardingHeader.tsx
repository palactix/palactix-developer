"use client";

import { motion } from "framer-motion";
import { Key, Globe, Layout, CheckCircle2 } from "lucide-react";
import { usePlatforms } from "@/features/platform/platform.hooks";
import Image from "next/image";
import { Platform } from "@/features/platform/platform.types";

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  // Simple helper to get the best logo for display
  const logo = platform.icon["logo-svg"] || platform.icon["logo-png"] || Object.values(platform.icon)[0];
  
  return (
    <div className="h-6 w-6 relative group/icon" title={platform.name}>
      <Image
        src={logo as string} 
        width={50}
        height={50}
        alt={platform.name} 
        className="h-full w-full object-contain filter grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-200" 
      />
    </div>
  );
};

export const OnboardingHeader = () => {
  const { data: platforms } = usePlatforms();
  const targetSlugs = ["instagram", "x", "linkedin", "youtube", "tiktok"];
  
  const featuredPlatforms = platforms
    ?.filter(p => targetSlugs.includes(p.slug.toLowerCase()))
    .sort((a, b) => targetSlugs.indexOf(a.slug.toLowerCase()) - targetSlugs.indexOf(b.slug.toLowerCase()));

  const features = [
    {
      title: "Generate Client ID and Secret",
      description: "Securely authenticate your requests with standard OAuth2 credentials.",
      icon: Key,
    },
    {
      title: "Connect social platforms",
      description: "One integration to reach them all: LinkedIn, X, Facebook, and more.",
      icon: Globe,
    },
    {
      title: "Start publishing through the Unified API",
      description: "Unified endpoints for content posting, and analytics.",
      icon: Layout,
    },
  ];

  return (
    <div className="flex flex-col text-left max-w-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex mb-8"
      >
        <div className="h-10 w-10 bg-zinc-950 dark:bg-white rounded-lg shadow-md flex items-center justify-center p-2">
           <div className="h-full w-full border-2 border-white dark:border-zinc-950 rounded-sm" />
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6 leading-[1.1]"
      >
        Start building with the Palactix API
      </motion.h1>

      <motion.p 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed"
      >
        Before you can publish content through the Palactix Unified API, you need to create your first Developer App. 
        Your Developer App generates the credentials required to authenticate API requests and connect social platforms.
      </motion.p>

      <div className="space-y-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
              <feature.icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-base leading-tight">
                {feature.title}
              </p>
              <p className="text-zinc-500 text-sm mt-1">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {featuredPlatforms && featuredPlatforms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-4">
            Works with
          </p>
          <div className="flex items-center gap-6">
            {featuredPlatforms.map((platform) => (
              <PlatformIcon key={platform.id} platform={platform} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
