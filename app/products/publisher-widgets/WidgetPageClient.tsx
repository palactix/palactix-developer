"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Paintbrush,
  Zap,
  Lock,
  Smartphone,
  BarChart3,
  Wrench,
  RefreshCw,
  Clock,
  Globe,
  Dumbbell,
  BookOpen,
  Newspaper,
  LayoutGrid,
  Check,
  Copy,
  ArrowRight,
  Terminal,
  Package,
  MousePointerClick,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─────────────────────────────────────────
   Shared scroll-reveal hook
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* ─────────────────────────────────────────
   Code snippets
───────────────────────────────────────── */
const snippets: Record<string, string> = {
  React: `import Palactix from '@palactix/publisher-widget';

const widget = new Palactix({
  token: 'wgt_live_xxxxxxxxxxxx',
});

export function PublishButton() {
  return (
    <button
      onClick={() => widget.publish({ content: 'Hello World!' })}
      className="btn-primary"
    >
      Publish to Social
    </button>
  );
}`,
  HTML: `<!-- Drop the script tag anywhere -->
<script src="https://cdn.palactix.com/widget.js"></script>

<script>
  const widget = new Palactix({
    token: 'wgt_live_xxxxxxxxxxxx',
  });
</script>

<button onclick="widget.publish({ content: 'Hello!' })">
  Publish to Social
</button>`,
  Vue: `<script setup lang="ts">
import Palactix from '@palactix/publisher-widget';

const widget = new Palactix({
  token: 'wgt_live_xxxxxxxxxxxx',
});
</script>

<template>
  <button @click="widget.publish({ content: 'Hello!' })">
    Publish to Social
  </button>
</template>`,
};

/* ─────────────────────────────────────────
   Syntax highlight  (minimal token colouring)
───────────────────────────────────────── */
function Code({ code }: { code: string }) {
  return (
    <pre className="text-[13px] leading-6 font-mono overflow-x-auto p-6 text-[#e2e8f0]">
      {code.split("\n").map((line, i) => (
        <div key={i}>
          {line
            .split(/(\'[^\']*\'|"[^"]*"|`[^`]*`|\/\/.*|import|from|const|new|return|export|function|class|onclick|@click)/g)
            .map((part, j) => {
              if (/^(import|from|const|new|return|export|function|class)$/.test(part))
                return <span key={j} className="text-[#ff79c6]">{part}</span>;
              if (/^(\'|"|`)/.test(part))
                return <span key={j} className="text-[#f1fa8c]">{part}</span>;
              if (/^\/\//.test(part))
                return <span key={j} className="text-[#6272a4]">{part}</span>;
              if (/^(onclick|@click)$/.test(part))
                return <span key={j} className="text-[#50fa7b]">{part}</span>;
              return <span key={j}>{part}</span>;
            })}
        </div>
      ))}
    </pre>
  );
}

export default function WidgetPageClient() {
  const [tab, setTab] = useState("React");
  const [copied, setCopied] = useState(false);

  const [heroRef, heroVisible] = useInView(0.05);
  const [stepsRef, stepsVisible] = useInView(0.1);
  const [featRef, featVisible] = useInView(0.08);
  const [whoRef, whoVisible] = useInView(0.1);

  const copy = () => {
    navigator.clipboard.writeText(snippets[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        {/* Gradient orb */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full bg-primary/10 blur-[120px]" />

        <Container>
          <div
            ref={heroRef}
            className={`flex flex-col items-center text-center gap-8 transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
              <Package className="w-3.5 h-3.5" />
              npm install @palactix/publisher-widget
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.08]">
              Embed social publishing{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-primary">in 5 minutes</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                  <path d="M2 9C80 1 220 1 298 9" stroke="#2ea44f" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Drop a widget into your platform. Your branding, your OAuth, your domain.
              Let your users publish to Social — without ever leaving your app.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                size="lg"
                className="h-13 px-8 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/developer/signup">
                  Get API Key Free <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 rounded-full text-base"
              >
                View Demo
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-13 px-6 rounded-full text-base text-muted-foreground hover:text-foreground gap-2"
                asChild
              >
                <Link href="/docs/publisher-widget">
                  <BookOpen className="w-4 h-4" /> Read the docs
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Trusted by sports platforms, learning apps, SaaS tools &amp; media companies
            </p>

            {/* Hero widget mockup */}
            <div className="relative mt-8 w-full max-w-3xl">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-5 h-10 border-b border-border/60 bg-muted/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="mx-auto flex items-center gap-2 bg-background/50 border border-border/60 rounded-md px-3 py-1 text-xs text-muted-foreground w-64">
                    <Lock className="w-3 h-3" /> yourdomain.com/app
                  </div>
                </div>
                {/* Mock content */}
                <div className="relative flex items-center justify-center p-10 gap-10">
                  <div className="hidden md:flex flex-col gap-3 flex-1 opacity-30">
                    <div className="h-8 w-3/4 bg-muted rounded-lg" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-5/6 bg-muted rounded" />
                    <div className="h-32 w-full bg-muted rounded-lg mt-2" />
                  </div>
                  {/* Widget popup */}
                  <div className="w-72 shrink-0 rounded-xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-4 h-12 border-b border-border">
                      <span className="text-sm font-semibold">Publish to Social</span>
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">×</div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-20 bg-muted/50 rounded-lg border border-border/50 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Write your caption…</span>
                      </div>
                      <div className="flex gap-2">
                        {["IG", "X", "TK", "LI"].map(p => (
                          <div key={p} className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">{p}</div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <div className="w-full h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                        Publish Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════════ */}
      <section className="border-y border-border bg-muted/30 py-6">
        <Container>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              ["100", "free posts / month"],
              ["5 min", "to integrate"],
              ["6", "social platforms"],
              ["1", "npm install"],
            ].map(([num, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">{num}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          3. PROBLEM / SOLUTION
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Stop building what you shouldn&apos;t have to
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Social publishing infrastructure is a 6-month detour. We cut it to a day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-border shadow-sm">
            <div className="p-10 md:p-14 space-y-5">
              <p className="text-xs text-destructive font-semibold tracking-widest uppercase mb-8">The hard way</p>
              {[
                ["Integrate 6 different platform APIs", "Weeks per platform"],
                ["Build OAuth connection flows", "Complex, error-prone"],
                ["Design publishing UI from scratch", "Weeks of design + dev"],
                ["Handle rate limits and quotas", "Platform-specific nightmares"],
                ["Manage API failures and retries", "24/7 on-call"],
                ["6–12 months of development", "Before you ship one feature"],
              ].map(([item, sub], i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/70 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item}</p>
                    <p className="text-xs text-muted-foreground/60">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 md:p-14 bg-primary/5 border-t md:border-t-0 md:border-l border-border space-y-5">
              <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-8">With Palactix Widget</p>
              {[
                ["One npm install", "One command, all platforms"],
                ["We handle all OAuth", "Zero auth code to write"],
                ["Pre-built, branded UI", "Customise via config"],
                ["We manage rate limits", "Automatic throttling"],
                ["Built-in retry & failover", "We page you, not you us"],
                ["Ship in 1 day", "Seriously."],
              ].map(([item, sub], i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          4. HOW IT WORKS  (connected steps)
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">React, Vue, HTML, Angular — any stack, same 4 steps.</p>
          </div>

          <div ref={stepsRef} className="relative max-w-3xl mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-1/2 -translate-x-px top-8 bottom-8 w-px bg-border hidden md:block" />

            {[
              {
                icon: Package,
                step: "01",
                title: "Install the package",
                desc: "One command. Zero peer dependencies.",
                code: "npm install @palactix/publisher-widget",
              },
              {
                icon: Terminal,
                step: "02",
                title: "Initialise with your token",
                desc: "Grab your widget token from the dashboard.",
                code: "const widget = new Palactix({ token: [SESSION_TOKEN] });",
              },
              {
                icon: MousePointerClick,
                step: "03",
                title: "Add a button",
                desc: "Call publish() anywhere in your app.",
                code: "widget.publish({ content: 'Hello World!' });",
              },
              {
                icon: Send,
                step: "04",
                title: "Your users publish",
                desc: "Widget popup opens inside your app. OAuth included.",
                code: "// Instagram, X, TikTok, LinkedIn — done.",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`relative md:flex gap-12 mb-14 last:mb-0 transition-all duration-700 ${
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Step badge */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 z-10 w-11 h-11 rounded-full bg-background border-2 border-primary items-center justify-center text-xs font-black text-primary shadow-sm">
                  {s.step}
                </div>

                {/* Card */}
                <div className={`md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"}`}>
                  <div className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-base">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                    <div className="bg-[#0d1117] rounded-lg px-4 py-3">
                      <code className="text-xs text-[#7ee787] font-mono">{s.code}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          5. LIVE CODE EXAMPLE
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full">
                <Terminal className="w-3.5 h-3.5" /> Live Code
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Copy. Paste. Ship.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                No lengthy API docs. No OAuth walkthroughs. Just working code — pick your framework.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(snippets).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                      tab === t
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <ul className="space-y-3 pt-2">
                {[
                  "Works inside any component tree",
                  "Fully white-labelled — your brand only",
                  "OAuth handled by the widget itself",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code block */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-[#0d1117]">
              <div className="flex items-center justify-between px-5 h-12 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-white/30 font-mono">
                    {tab === "React" ? "MediaCard.tsx" : tab === "HTML" ? "index.html" : "App.vue"}
                  </span>
                </div>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" />Copy</>
                  )}
                </button>
              </div>
              <Code code={snippets[tab]} />
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          6. FEATURES  (bento grid)
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything included</h2>
            <p className="text-muted-foreground text-lg">No add-ons. No surprises.</p>
          </div>

          <div
            ref={featRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
              featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Large feature card */}
            <div className="lg:col-span-2 bg-background border border-border rounded-3xl p-8 group hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Paintbrush className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Fully white-label</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    OAuth consent screens, widget title, button labels — all show your company name. Your users never see &quot;Palactix&quot; anywhere. Configure logo, colors, and copy via a single config object.
                  </p>
                </div>
              </div>
            </div>

            {/* Small card */}
            <div className="bg-background border border-border rounded-3xl p-8 group hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">BYO OAuth</h3>
              <p className="text-sm text-muted-foreground">Your API keys. You own every token. We never touch your credentials.</p>
            </div>

            {(["Instant publishing", "All major platforms", "Retry & failover", "Scheduling built-in", "Analytics ready", "Multi-account support"] as const).map((title, i) => {
              const icons = [Zap, Smartphone, RefreshCw, Clock, BarChart3, Globe];
              const descs = [
                "No redirects. A popup keeps users inside your app the whole time.",
                "Instagram, X, TikTok, LinkedIn, Facebook, YouTube — out of the box.",
                "We catch failed posts and automatically retry with exponential back-off.",
                "Let users publish now or schedule posts for any future date and time.",
                "Track every published post and engagement signal via our REST API.",
                "Users can connect and switch between multiple social profiles with ease.",
              ];
              const Icon = icons[i];
              return (
                <div key={title} className="bg-background border border-border rounded-3xl p-7 group hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{descs[i]}</p>
                </div>
              );
            })}

            {/* 5-min setup wide card */}
            <div className="lg:col-span-2 bg-primary/5 border border-primary/20 rounded-3xl p-8 group hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Wrench className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">5-minute setup. Seriously.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    One npm install, one init call, one button. If it takes longer than 5 minutes, email us and we&apos;ll debug it live with you.
                  </p>
                  <Button
                    className="mt-5 bg-primary hover:bg-primary/90 text-white rounded-full"
                    size="sm"
                    asChild
                  >
                    <Link href="/developer/signup">Start building free <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          7. PRICING
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-3">Simple pricing</h2>
              <p className="text-muted-foreground">Start free. Pay only when your users publish at scale.</p>
            </div>

            <div className="relative rounded-3xl border border-primary/30 bg-background overflow-hidden shadow-xl shadow-primary/5">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent" />
              <div className="p-10 text-center">
                <p className="text-sm text-muted-foreground mb-2">Widget + API Access</p>
                <div className="flex items-end justify-center gap-1 my-5">
                  <span className="text-7xl font-black tracking-tight">$0.01</span>
                  <span className="text-xl text-muted-foreground mb-3">/post</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
                  <Check className="w-4 h-4" /> 100 posts/month completely free
                </div>
                <Button className="w-full h-13 rounded-2xl bg-primary hover:bg-primary/90 text-white text-base font-semibold" asChild>
                  <Link href="/developer/signup">Start Building — No Card Required</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">No monthly fees until you exceed 100 posts.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          8. WHO USES THIS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-3">Built for platforms that manage content</h2>
            <p className="text-muted-foreground text-lg">If your users create content, they should be able to publish it.</p>
          </div>

          <div
            ref={whoRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
              whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { icon: Dumbbell, title: "Sports platforms", desc: "Publish athlete highlights, match reports, and training content to social media directly." },
              { icon: BookOpen, title: "Learning platforms", desc: "Let students and instructors share course highlights and milestones to their networks." },
              { icon: Newspaper, title: "Media platforms", desc: "Push articles, videos, and breaking news to social channels without leaving your CMS." },
              { icon: LayoutGrid, title: "SaaS tools", desc: "Add social sharing as a native feature inside your existing product workflow." },
            ].map((u, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-2xl p-7 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <u.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-base mb-2">{u.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          9. FAQ
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container className="max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-3">Frequently asked questions</h2>
            <p className="text-muted-foreground">Everything you need before writing a single line of code.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "What is Palactix?",
                a: "Palactix is white-label social media infrastructure for developers — REST APIs and embeddable widgets. BYO OAuth means you keep every credential, token, and consent screen under your brand.",
              },
              {
                q: "What's the difference between the Widget and the Scheduler?",
                a: "Widget = npm package you embed in your existing product. Scheduler = a full white-label dashboard app (separate product, separate pricing).",
              },
              {
                q: "Does the widget show Palactix branding?",
                a: "Never. The widget is completely white-label. Configure your logo, name, and colors — your users only ever see your brand.",
              },
              {
                q: "Do I need to build OAuth connection flows?",
                a: "No. The widget handles the entire OAuth lifecycle. You provide your app credentials in the dashboard; we do the rest.",
              },
              {
                q: "Which platforms are currently supported?",
                a: "Instagram, Facebook, X (Twitter), TikTok, LinkedIn, and YouTube. More platforms are on the roadmap.",
              },
              {
                q: "Can I customise the widget's appearance?",
                a: "Yes — theme color, logo, button labels, and font are all configurable via the widget init options. No CSS overrides needed.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background border border-border rounded-2xl px-6 data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 data-[state=open]:text-primary">
                  <span className="font-semibold">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          10. FOOTER CTA
      ══════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-primary/5" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-primary/8 blur-[100px]" />
        <Container className="relative max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Ready to ship social publishing?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            No credit card. No OAuth headaches. Just working code for your users.
          </p>
          <Button
            size="lg"
            className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-xl shadow-primary/25"
            asChild
          >
            <Link href="/developer/signup">
              Get API Key — Free Trial <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              No credit card &bull; 100 posts/month Free &bull; 5-minute setup
            </p>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <Link
              href="/docs/publisher-widget"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" /> Read the docs
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
