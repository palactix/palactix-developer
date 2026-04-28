"use client";

import { motion } from "motion/react";
import { Key, Zap, LayoutDashboard, Unlink, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

const benefitIconMap = {
  key: Key,
  zap: Zap,
  dashboard: LayoutDashboard,
  unlink: Unlink,
} as const;

type BenefitIconName = keyof typeof benefitIconMap;

export function AgencyExampleCard({
  title,
  subtitle,
  traditionalCost,
  palactixCost,
  annualSavings,
  quote,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  traditionalCost: string;
  palactixCost: string;
  annualSavings: string;
  quote: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-3 mb-6 flex-1">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Traditional tools</span>
          <span className="font-semibold text-destructive">{traditionalCost}/mo</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Palactix</span>
          <span className="font-semibold text-primary">{palactixCost}/mo</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-semibold">Annual savings</span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">{annualSavings}</span>
        </div>
      </div>

      <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </motion.div>
  );
}

export function BenefitGridItem({
  iconName,
  headline,
  body,
  delay = 0,
}: {
  iconName: BenefitIconName;
  headline: string;
  body: string;
  delay?: number;
}) {
  const Icon = benefitIconMap[iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline";
}) {
  const cls =
    variant === "default"
      ? "inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-[1.02]"
      : "inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]";

  return (
    <a href={href} className={cls}>
      {children}
      {variant === "default" && <ArrowRight className="ml-2 w-4 h-4" />}
    </a>
  );
}
