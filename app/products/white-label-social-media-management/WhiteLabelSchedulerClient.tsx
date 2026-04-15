"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Calendar,
  Users,
  Globe,
  Lock,
  Paintbrush,
  Zap,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  Layers,
  Tag,
  Eye,
  Sparkles,
  Palette,
  HardDrive,
  Gauge,
  CheckCircle2,
  Megaphone,
  LineChart,
  Building2,
  Crosshair,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────── */
function useInView(threshold = 0.1) {
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
   Domain mockup pill
───────────────────────────────────────── */
function DomainBar({ domain, highlight = false }: { domain: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-semibold transition-all ${
      highlight
        ? "bg-primary/10 border-primary/40 text-primary"
        : "bg-muted/40 border-border text-muted-foreground"
    }`}>
      <div className={`w-1.5 h-1.5 rounded-full ${highlight ? "bg-primary" : "bg-muted-foreground/40"}`} />
      {domain}
    </div>
  );
}

export default function WhiteLabelSchedulerClient() {
  const [heroRef, heroVisible] = useInView(0.05);
  const [workflowRef, workflowVisible] = useInView(0.08);
  const [featRef, featVisible] = useInView(0.08);
  const [wlRef, wlVisible] = useInView(0.1);
  const [caseRef, caseVisible] = useInView(0.1);
  const [infraRef, infraVisible] = useInView(0.08);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setActiveStep((s) => (s + 1) % 5), 4000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        {/* Gradient orb */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full bg-primary/8 blur-[130px]" />

        <Container>
          <div
            ref={heroRef}
            className={`flex flex-col items-center text-center gap-8 transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
              <Paintbrush className="w-3.5 h-3.5" />
              White-Label Social Scheduler
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.06]">
              Run Your Own{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-primary">White-Label</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 320 12" fill="none" aria-hidden="true">
                  <path d="M2 9C90 1 230 1 318 9" stroke="#2ea44f" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>{" "}
              Social Scheduler Platform
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Your branding. Your domain. Your OAuth apps.{" "}
              <span className="text-foreground font-semibold">No vendor lock-in. No per-seat pricing. Unlimited scaling.</span>
            </p>

            {/* Domain visual */}
            <div className="flex flex-col sm:flex-row items-center gap-3 py-1">
              <DomainBar domain="app.youragency.com" highlight />
              <span className="text-xs text-muted-foreground/50 hidden sm:block">not</span>
              <DomainBar domain="palactix.com" />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                size="lg"
                className="h-13 px-8 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/agency/signup">
                  Start your 14-day Evaluation <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-13 px-8 rounded-full text-base">
                View Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Evaluation starts after your first client is connected. No credit card required.{" "}
              <Link href="/pricing" className="text-primary font-medium hover:underline">View pricing →</Link>
            </p>

            {/* Hero dashboard mockup */}
            <div className="relative mt-6 w-full max-w-4xl">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-5 h-10 border-b border-border/60 bg-muted/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="mx-auto flex items-center gap-2 bg-background/50 border border-border/60 rounded-md px-3 py-1 text-xs text-muted-foreground w-72 font-mono">
                    <Lock className="w-3 h-3 text-primary" />
                    <span className="text-primary font-semibold">app</span>.youragency.com
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="grid grid-cols-[200px_1fr] divide-x divide-border/60 min-h-80">
                  {/* Sidebar */}
                  <div className="p-4 space-y-1 bg-muted/10">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                      <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white text-[10px] font-black">A</div>
                      <span className="text-xs font-bold">Your Agency</span>
                    </div>
                    {["Dashboard", "Calendar", "Clients", "Campaigns", "Approvals", "Settings"].map((item, i) => (
                      <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${i === 1 ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted/40"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Calendar area */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold">April 2026</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">+ New Post</div>
                      </div>
                    </div>
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {["S","M","T","W","T","F","S"].map((d, i) => (
                        <div key={i} className="text-[10px] text-muted-foreground font-semibold py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 1;
                        const hasPost = [3, 7, 9, 14, 16, 21, 24, 27].includes(day);
                        const isToday = day === 13;
                        return (
                          <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[11px] relative ${
                            isToday ? "bg-primary text-white font-bold" :
                            day > 0 && day <= 30 ? "hover:bg-muted/60 cursor-pointer" : "opacity-0"
                          }`}>
                            {day > 0 && day <= 30 && day}
                            {hasPost && !isToday && (
                              <div className="absolute bottom-1 flex gap-0.5">
                                <div className="w-1 h-1 rounded-full bg-primary/60" />
                                {day % 5 === 0 && <div className="w-1 h-1 rounded-full bg-blue-400/60" />}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Approval toast overlay */}
                <div className="absolute bottom-5 right-5 w-60 bg-background border border-border rounded-xl p-3 shadow-lg text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">Post Approved</p>
                  </div>
                  <p className="text-muted-foreground leading-snug">Client approved 3 posts for scheduling this week.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          2. AGENCY PAIN / COMPARISON
      ══════════════════════════════════════ */}
      <section className="py-28 border-y border-border bg-muted/20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Stop renting tools.{" "}
              <span className="text-primary">Start owning infrastructure.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every tool you rent owns a piece of your agency. Palactix puts you back in control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-border shadow-sm">
            <div className="p-10 md:p-14 space-y-5">
              <p className="text-xs text-destructive font-semibold tracking-widest uppercase mb-8">Without white label</p>
              {[
                ["Clients see another brand on every screen",   "Destroys your credibility"],
                ["Pay per seat as team grows",                   "Expensive at scale"],
                ["Pay per client added",                         "Growth is penalised"],
                ["Limited approval workflows",                   "Chaos between teams"],
                ["Vendor owns your OAuth tokens",                "You can never leave cleanly"],
                ["Monthly chaos, no structure",                  "No real workflow control"],
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
              <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-8">With Palactix</p>
              {[
                ["Your brand everywhere",               "Logo, domain, OAuth — all yours"],
                ["Unlimited team members",              "One flat fee, no seat tax"],
                ["Unlimited clients",                   "Scale without penalty"],
                ["Full approval control",               "Rule-based, client-first workflows"],
                ["Your OAuth apps, your tokens",        "You own every connection"],
                ["Structured workflow",                 "Campaigns, approvals, calendar"],
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
          3. CORE WORKFLOW
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How the workflow runs</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Not just a calendar. A structured, team-first publishing pipeline.
            </p>
          </div>

          <div ref={workflowRef} className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Step list */}
            <div className="space-y-3">
              {[
                {
                  step: "01",
                  icon: Tag,
                  title: "Create Campaign",
                  desc: "Organise posts by client, campaign, or content type. Full visibility across all accounts.",
                },
                {
                  step: "02",
                  icon: Users,
                  title: "Assign Your Team",
                  desc: "Owners, admins, and editors collaborate. Role-based access — each person sees exactly what they need.",
                },
                {
                  step: "03",
                  icon: CheckCircle2,
                  title: "Client Approval",
                  desc: "Clients review posts before anything goes live. Rule-based approval — set it once, it runs automatically.",
                },
                {
                  step: "04",
                  icon: Calendar,
                  title: "Schedule & Publish",
                  desc: "Queue-based publishing across all connected platforms. Visual calendar, one click.",
                },
                {
                  step: "05",
                  icon: BarChart3,
                  title: "Track Results",
                  desc: "Full visibility across all clients. See what's live, what's scheduled, what's pending approval.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{ transitionDelay: workflowVisible ? `${i * 100}ms` : "0ms" }}
                  className={`flex items-start gap-5 p-5 rounded-2xl cursor-pointer border transition-all duration-500 ${
                    workflowVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  } ${
                    activeStep === i
                      ? "bg-primary/5 border-primary/30 shadow-sm"
                      : "border-border hover:border-primary/20 hover:bg-muted/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    activeStep === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-muted-foreground/50 tracking-widest">{s.step}</span>
                      <h3 className={`font-semibold text-sm ${activeStep === i ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated preview panel */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-background shadow-xl overflow-hidden h-full flex flex-col">
                {/* Panel header */}
                <div className="flex items-center gap-2 px-5 h-10 border-b border-border bg-muted/30 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">app.youragency.com</span>
                </div>

                {/* Step panels */}
                <div className="p-6 flex-1 flex items-center">
                  {activeStep === 0 && (
                    <div className="w-full space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Campaigns</p>
                      {["Q2 Social Push — Nike", "Brand Awareness — Adidas", "Product Launch — Puma"].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${["bg-primary", "bg-blue-400", "bg-purple-400"][i]}`} />
                            <span className="text-sm font-medium">{c}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{[12, 8, 4][i]} posts</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="w-full space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Team</p>
                      {[
                        { name: "Sarah K.", role: "Editor", color: "bg-blue-400" },
                        { name: "Marcus L.", role: "Editor", color: "bg-purple-400" },
                        { name: "Priya N.", role: "Admin", color: "bg-primary" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                              {m.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{m.name}</p>
                              <p className="text-xs text-muted-foreground">{m.role}</p>
                            </div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                      ))}
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="w-full space-y-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pending Client Approval</p>
                      <div className="rounded-xl border border-border bg-muted/10 p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Instagram · April 16</p>
                            <p className="text-sm font-medium">Big news dropping this Thursday 🚀 Stay tuned...</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <div className="flex-1 h-9 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-semibold">Approve</div>
                          <div className="flex-1 h-9 rounded-lg border border-border flex items-center justify-center text-xs font-semibold text-muted-foreground">Request Edit</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="w-full space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Scheduled This Week</p>
                      {[
                        { platform: "Instagram", client: "Nike", time: "Mon 9:00 AM", color: "bg-pink-400/70" },
                        { platform: "LinkedIn",  client: "Adidas", time: "Tue 11:00 AM", color: "bg-blue-500/70" },
                        { platform: "X",         client: "Puma",  time: "Wed 12:00 PM", color: "bg-zinc-400/70" },
                      ].map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/10">
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                            <div>
                              <p className="text-sm font-medium">{p.platform} · {p.client}</p>
                              <p className="text-xs text-muted-foreground">{p.time}</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Scheduled</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="w-full space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">All Clients Overview</p>
                      {[
                        { client: "Nike",   posts: 24, pending: 3 },
                        { client: "Adidas", posts: 18, pending: 1 },
                        { client: "Puma",   posts: 11, pending: 0 },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-foreground">{c.client[0]}</div>
                            <div>
                              <p className="text-sm font-medium">{c.client}</p>
                              <p className="text-xs text-muted-foreground">{c.posts} posts this month</p>
                            </div>
                          </div>
                          {c.pending > 0 && (
                            <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold">{c.pending} pending</span>
                          )}
                          {c.pending === 0 && (
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">All good</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          4. FEATURE POWER GRID
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything an agency needs
            </h2>
            <p className="text-muted-foreground text-lg">Built for multi-client teams. Not solo creators.</p>
          </div>

          <div
            ref={featRef}
            className={`transition-all duration-700 ${
              featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-3xl border border-border overflow-hidden">
              {[
                {
                  group: "Core Operations",
                  badge: "foundation",
                  primary: false,
                  items: [
                    { icon: Calendar,     title: "Visual Calendar",           desc: "Plan and schedule posts across all clients in a clean drag-drop calendar view." },
                    { icon: Zap,          title: "Advanced Scheduler",        desc: "Multi-platform publishing with queue management and timezone support." },
                    { icon: CheckCircle2, title: "Approval Workflow",         desc: "Rule-based client approvals — runs automatically without manual chasing." },
                    { icon: Tag,          title: "Tags & Campaigns",          desc: "Organise posts by client, campaign, or content type with full visibility." },
                    { icon: Users,        title: "Unlimited Team Members",    desc: "Owners, admins, editors, members — no seat pricing, ever." },
                    { icon: Building2,    title: "Unlimited Clients",         desc: "Add as many client workspaces as your agency needs. No per-client fees." },
                    { icon: Layers,       title: "Unlimited Social Accounts", desc: "Connect every platform for every client. No account cap." },
                  ],
                },
                {
                  group: "Productivity",
                  badge: "power tools",
                  primary: false,
                  items: [
                    { icon: Sparkles,  title: "AI Caption Generator", desc: "Generate social captions instantly. Edit or publish with one click." },
                    { icon: Palette,   title: "Canva Integration",    desc: "Design posts without leaving the dashboard. Direct Canva import." },
                    { icon: HardDrive, title: "Google Drive Support", desc: "Pull approved assets from Drive directly into the post composer." },
                    { icon: Eye,       title: "Live Post Preview",    desc: "See exactly how each post appears on every platform before going live." },
                  ],
                },
                {
                  group: "Infrastructure — Your Differentiators",
                  badge: "own your stack",
                  primary: true,
                  items: [
                    { icon: Lock,       title: "BYO OAuth Apps",        desc: "Your own platform developer apps. Your company name on every consent screen." },
                    { icon: Globe,      title: "Custom Domain Support",  desc: "Run the full scheduler on your own domain. Supported on all plans." },
                    { icon: Paintbrush, title: "Full White Label",       desc: "Logo, colors, domain — everything shows your brand. Zero Palactix visibility." },
                    { icon: Gauge,      title: "Built for Scale",        desc: "Enterprise-grade architecture handles growing teams and large client loads." },
                  ],
                },
              ].map((group, gi) => (
                <div
                  key={gi}
                  className={`p-8 md:p-10 ${gi > 0 ? "border-t border-border" : ""} ${group.primary ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{group.group}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${group.primary ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {group.badge}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-7">
                    {group.items.map(({ icon: Icon, title, desc }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${group.primary ? "bg-primary/15" : "bg-primary/10"}`}>
                          <Icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-snug">{title}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          5. WHITE LABEL DEEP DIVE
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div
            ref={wlRef}
            className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
              wlVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full">
                <Paintbrush className="w-3.5 h-3.5" /> White Label
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Your clients see you.{" "}
                <span className="text-primary">Not us.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every screen your client sees — login page, dashboard, approval flow, mobile view —
                carries your name, your logo, your domain.
                We&rsquo;re invisible. That&rsquo;s the point.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Globe,     text: "Your custom domain", sub: "dashboard.youragency.com" },
                  { icon: Paintbrush, text: "Your branding",     sub: "Logo, colors, name — all configurable" },
                  { icon: Lock,      text: "Your OAuth apps",    sub: "Consent screens show your company name" },
                  { icon: ShieldCheck, text: "Your infrastructure", sub: "You own every token, every connection" },
                ].map(({ icon: Icon, text, sub }, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/10 hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                    <Check className="w-4 h-4 text-primary ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Domain comparison visual */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">What your clients actually see</p>

              {/* Good — their domain */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 overflow-hidden shadow-lg">
                <div className="flex items-center gap-2 px-4 h-9 border-b border-primary/20 bg-primary/8">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <div className="flex items-center gap-1.5 ml-2 bg-white/10 border border-white/10 px-3 py-0.5 rounded text-xs font-mono text-primary/80">
                    <Lock className="w-2.5 h-2.5" /> dashboard.youragency.com
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-primary uppercase tracking-widest">✓ Yours</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-white text-[11px] font-black">A</div>
                      <span className="font-bold text-sm">Your Agency</span>
                    </div>
                    <div className="w-16 h-5 rounded-full bg-primary/20" />
                  </div>
                  <div className="h-5 w-3/4 bg-foreground/8 rounded" />
                  <div className="h-3 w-full bg-foreground/5 rounded" />
                  <div className="h-3 w-5/6 bg-foreground/5 rounded" />
                  <div className="h-3 w-4/6 bg-foreground/5 rounded" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {["Clients", "Posts", "Pending"].map((label, i) => (
                      <div key={i} className="rounded-lg bg-primary/10 p-2 text-center">
                        <div className="h-3 w-6 bg-primary/30 rounded mx-auto mb-1" />
                        <p className="text-[10px] text-primary/70 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-3 w-full bg-foreground/5 rounded" />
                  <div className="h-3 w-3/4 bg-foreground/5 rounded" />
                </div>
              </div>

              {/* Bad — vendor branding */}
              <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden opacity-50">
                <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-red-400/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                  <div className="w-2 h-2 rounded-full bg-green-400/40" />
                  <div className="flex items-center gap-1.5 ml-2 bg-muted border border-border px-3 py-0.5 rounded text-xs font-mono text-muted-foreground">
                    <Lock className="w-2.5 h-2.5" /> app.someothertool.com
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">✗ Not yours</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-muted-foreground/20 flex items-center justify-center text-muted-foreground text-[11px] font-black">V</div>
                      <span className="font-bold text-sm text-muted-foreground">VendorTool</span>
                    </div>
                    <div className="w-16 h-5 rounded-full bg-muted" />
                  </div>
                  <div className="h-5 w-3/4 bg-foreground/5 rounded" />
                  <div className="h-3 w-full bg-foreground/5 rounded" />
                  <div className="h-3 w-5/6 bg-foreground/5 rounded" />
                  <div className="h-3 w-4/6 bg-foreground/5 rounded" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {["Clients", "Posts", "Queue"].map((label, i) => (
                      <div key={i} className="rounded-lg bg-muted p-2 text-center">
                        <div className="h-3 w-6 bg-muted-foreground/20 rounded mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-3 w-full bg-foreground/5 rounded" />
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground italic">
                Every time a client logs in, they see your brand. Not ours.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          7. USE CASES
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-3">
              Built for agencies managing multiple clients
            </h2>
            <p className="text-muted-foreground text-lg">
              If you recognise yourself here, Palactix was built for you.
            </p>
          </div>

          <div
            ref={caseRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
              caseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                icon: Megaphone,
                title: "Social Media Agencies",
                desc: "Manage hundreds of client accounts from a single white-label dashboard under your brand.",
              },
              {
                icon: LineChart,
                title: "Marketing Agencies",
                desc: "Run multi-channel campaigns at scale with proper approval flows and content tracking.",
              },
              {
                icon: Crosshair,
                title: "Performance Agencies",
                desc: "Structure content workflows so nothing goes live without the right eyes on it first.",
              },
              {
                icon: Building2,
                title: "Enterprise Teams",
                desc: "Manage internal brands, sub-teams, and external clients from one organised platform.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-2xl p-7 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-base mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          8. RELIABILITY / TRUST
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> Built for Real Agency Workflows
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Enterprise-grade infrastructure.<br />
                <span className="text-primary">Agency-ready pricing.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                The publishing pipeline is engineered for real production loads — not prototypes.
                Queue-based delivery, automatic recovery, and per-client isolation keep everything running.
              </p>
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" asChild>
                <Link href="/agency/signup">Start your 14-day Evaluation <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>

            <div
              ref={infraRef}
              className={`grid grid-cols-1 gap-3 transition-all duration-700 ${
                infraVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { icon: Layers,      label: "Queue-based publishing",      desc: "Every post enters a durable job queue before dispatch." },
                { icon: RefreshCw,   label: "Failure recovery system",     desc: "Automatic retry with exponential back-off on failed posts." },
                { icon: Calendar,    label: "Platform-aware scheduling",   desc: "Platform-specific publishing constraints handled automatically." },
                { icon: ShieldCheck, label: "Secure OAuth handling",       desc: "Credentials isolated per workspace. We never share tokens." },
                { icon: Building2,   label: "Multi-client isolation",      desc: "Each client's data and publishing queue is fully isolated." },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: infraVisible ? `${i * 80}ms` : "0ms" }}
                  className="flex items-start gap-4 bg-background border border-border rounded-2xl p-5 hover:border-primary/30 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <p className="text-muted-foreground">Real questions from agencies evaluating Palactix.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "Do my clients see Palactix branding anywhere?",
                a: "No. Nothing. The entire platform — login page, dashboard, approval screens, emails — runs under your brand and your domain. Palactix is completely invisible to your clients.",
              },
              {
                q: "Can I use my own domain?",
                a: "Yes. Custom domain support is fully included. You run the scheduler on your own subdomain (e.g. dashboard.youragency.com) with standard DNS configuration. This is supported on all plans.",
              },
              {
                q: "Do I need to use your OAuth apps?",
                a: "No. You register your own developer apps on Instagram, LinkedIn, X, TikTok, and other platforms. Your users grant access through your OAuth apps — your company name appears on every consent screen. You own every token.",
              },
              {
                q: "How many clients and team members can I add?",
                a: "Unlimited. There is no per-seat or per-client pricing. You pay the plan flat rate and add as many clients and team members as your agency needs.",
              },
              {
                q: "How does the trial work?",
                a: "The 14-day evaluation period starts after you connect your first client account — not when you sign up. This gives you time to set up your workspace, configure branding, and invite your team before the clock starts.",
              },
              {
                q: "How does the approval workflow work?",
                a: "Approval rules are set at the workspace level and evaluated automatically at publish or schedule time. Rules can be based on role, specific user, or specific client. You can also set bypass rules for trusted members. Once configured, approvals run without manual intervention.",
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
            Start running your own scheduler today.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Your brand. Your domain. Your OAuth.
            <br />
            Own the infrastructure your agency runs on.
          </p>
          <Button
            size="lg"
            className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-xl shadow-primary/25"
            asChild
          >
            <Link href="/agency/signup">
              Start your 14-day Evaluation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <div className="mt-6">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              No credit card &bull; 14-day evaluation &bull; Unlimited clients
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
