"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  BookOpen,
  Zap,
  Lock,
  Calendar,
  MessageSquare,
  RefreshCw,
  Gauge,
  BarChart3,
  Cpu,
  ServerCrash,
  ShieldCheck,
  Activity,
  Webhook,
  Package,
  Globe,
  Layers,
  Megaphone,
  Tv2,
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
   Code snippets
───────────────────────────────────────── */
const snippets: Record<string, string> = {
  curl: `curl -X POST https://api.palactix.com/v1/posts/publish \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_ids": ["acct_123"],
    "content": "Hello from API!",
    "media": [
      {
        "url": "https://cdn.example.com/image.jpg",
        "type": "image"
      }
    ]
  }'`,
  "Node.js": `import axios from 'axios';

const response = await axios.post(
  'https://api.palactix.com/v1/posts/publish',
  {
    account_ids: ['acct_123'],
    content: 'Hello from API!',
    media: [{ url: 'https://cdn.example.com/image.jpg', type: 'image' }],
  },
  {
    headers: {
      Authorization: \`Bearer \${process.env.PALACTIX_API_KEY}\`,
      'Content-Type': 'application/json',
    },
  }
);

console.log(response.data); // { status: 'queued', post_id: 'pst_...' }`,
  PHP: `<?php

$response = Http::withToken(env('PALACTIX_API_KEY'))
    ->post('https://api.palactix.com/v1/posts/publish', [
        'account_ids' => ['acct_123'],
        'content'     => 'Hello from API!',
        'media'       => [
            ['url' => 'https://cdn.example.com/image.jpg', 'type' => 'image'],
        ],
    ]);

$data = $response->json();
// ['status' => 'queued', 'post_id' => 'pst_...']`,
  Python: `import requests, os

response = requests.post(
    "https://api.palactix.com/v1/posts/publish",
    headers={
        "Authorization": f"Bearer {os.environ['PALACTIX_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "account_ids": ["acct_123"],
        "content": "Hello from API!",
        "media": [{"url": "https://cdn.example.com/image.jpg", "type": "image"}],
    },
)

print(response.json())  # {"status": "queued", "post_id": "pst_..."}`,
  Laravel: `use Illuminate\\Support\\Facades\\Http;

$response = Http::palactix()
    ->post('/v1/posts/publish', [
        'account_ids' => ['acct_123'],
        'content'     => 'Hello from API!',
        'media'       => [
            ['url' => 'https://cdn.example.com/image.jpg', 'type' => 'image'],
        ],
    ]);

// Response: ['status' => 'queued', 'post_id' => 'pst_...']`,
};

/* ─────────────────────────────────────────
   Minimal syntax highlighter
───────────────────────────────────────── */
function Code({ code }: { code: string }) {
  return (
    <pre className="text-[12.5px] leading-6 font-mono overflow-x-auto p-6 text-[#e2e8f0]">
      {code.split("\n").map((line, i) => (
        <div key={i}>
          {line
            .split(/(\'[^\']*\'|"[^"]*"|`[^`]*`|\/\/.*|#.*|\$\{[^}]*\}|import|from|const|let|await|return|export|function|class|use|echo|print|env|Bearer)/g)
            .map((part, j) => {
              if (/^(import|from|const|let|await|return|export|function|class|use|echo|print)$/.test(part))
                return <span key={j} className="text-[#ff79c6]">{part}</span>;
              if (/^(\'|"|`)/.test(part) || /^\$\{/.test(part))
                return <span key={j} className="text-[#f1fa8c]">{part}</span>;
              if (/^(\/\/|#)/.test(part))
                return <span key={j} className="text-[#6272a4]">{part}</span>;
              if (part === "Bearer" || part === "env")
                return <span key={j} className="text-[#50fa7b]">{part}</span>;
              return <span key={j}>{part}</span>;
            })}
        </div>
      ))}
    </pre>
  );
}

/* ─────────────────────────────────────────
   Platform badge
───────────────────────────────────────── */
function PlatformBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
      style={{ borderColor: color + "40", backgroundColor: color + "10", color }}
    >
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────
   Page component
───────────────────────────────────────── */
export default function UnifiedSocialApisClient() {
  const [tab, setTab] = useState("curl");
  const [copied, setCopied] = useState(false);

  const [heroRef, heroVisible] = useInView(0.05);
  const [stepsRef, stepsVisible] = useInView(0.08);
  const [featRef, featVisible] = useInView(0.08);
  const [caseRef, caseVisible] = useInView(0.08);
  const [infraRef, infraVisible] = useInView(0.08);

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
              <Zap className="w-3.5 h-3.5" />
              POST /v1/posts/publish
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.07]">
              One API.{" "}
              <span className="text-primary">Publish Everywhere.</span>
              <br />
              <span className="text-3xl md:text-4xl font-semibold text-muted-foreground mt-3 block">
                Using Your Own OAuth Apps.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Send one request. Publish to Instagram, X, LinkedIn, TikTok, Facebook.
              No platform-specific integrations. No vendor lock-in.{" "}
              <span className="text-foreground font-medium">Your credentials. Your branding.</span>
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
                asChild
              >
                <Link href="/docs">View API Docs</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-13 px-6 rounded-full text-base text-muted-foreground hover:text-foreground gap-2"
                asChild
              >
                <Link href="/docs">
                  <BookOpen className="w-4 h-4" /> Read the docs
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              100 posts/month free &bull; then $0.01 per post
            </p>

            {/* Hero API flow animation */}
            <div className="relative mt-6 w-full max-w-3xl">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-border/60 bg-[#0d1117] shadow-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-5 h-10 border-b border-white/10 bg-black/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-xs text-white/30 font-mono">api.palactix.com</span>
                </div>
                <div className="p-8 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                  {/* Request */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-[10px] text-white/30 font-mono mb-3 uppercase tracking-widest">Your request</p>
                    <p className="text-[#7ee787] font-mono text-xs mb-1">POST /v1/posts/publish</p>
                    <div className="mt-3 space-y-1.5 font-mono text-[11px] text-white/50">
                      <p><span className="text-[#f1fa8c]">&quot;account_ids&quot;</span>: [&quot;acct_123&quot;]</p>
                      <p><span className="text-[#f1fa8c]">&quot;content&quot;</span>: &quot;Hello!&quot;</p>
                      <p><span className="text-[#f1fa8c]">&quot;media&quot;</span>: [...]</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1 text-white/20">
                    <div className="w-px h-8 bg-white/10 hidden md:block" />
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="w-px h-8 bg-white/10 hidden md:block" />
                  </div>

                  {/* Platforms — with BYO emphasis */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mb-3">Your OAuth apps</p>
                    {[
                      { label: "Instagram", color: "#e1306c" },
                      { label: "LinkedIn",  color: "#0a66c2" },
                      { label: "X (Twitter)", color: "#ffffff" },
                      { label: "TikTok",    color: "#69c9d0" },
                    ].map(({ label, color }) => (
                      <div key={label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-xs text-white/70 font-medium">{label}</span>
                        </div>
                        <span className="text-[10px] text-primary/70 font-mono">Your App ✓</span>
                      </div>
                    ))}
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
              ["1", "API endpoint"],
              ["6+", "social platforms"],
              ["$0.01", "per post after free tier"],
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
              Keep ownership. Lose the complexity.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Most API products hold your OAuth tokens and your users&apos; connections hostage.
              Palactix doesn&apos;t. BYO OAuth — <span className="text-foreground font-medium">Bring Your Own Keys</span> — means
              you own every token, every credential, every consent screen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-border shadow-sm">
            <div className="p-10 md:p-14 space-y-5">
              <p className="text-xs text-destructive font-semibold tracking-widest uppercase mb-8">Without Unified API</p>
              {[
                ["Build 6 separate integrations", "Weeks per platform, minimum"],
                ["Manage 6 OAuth developer apps",  "Different portals, different secrets"],
                ["Platform branding controls you",  "Users see their brand, not yours"],
                ["Vendor lock-in risk",             "Migration = rewriting everything"],
                ["Maintain rate limit logic",       "Per-platform, constantly changing"],
                ["6–12 months engineering",         "Before you ship one feature"],
              ].map(([item, sub], i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-destructive/30 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item}</p>
                    <p className="text-xs text-muted-foreground/60">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 md:p-14 bg-primary/5 border-t md:border-t-0 md:border-l border-border space-y-5">
              <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-8">With Palactix API</p>
              {[
                ["One API endpoint",            "POST /v1/posts/publish — done"],
                ["One unified OAuth flow",      "We wire your apps in, you keep them"],
                ["Your branding everywhere",    "OAuth screen shows your company name"],
                ["Your OAuth ownership",        "You can leave any time — zero migration"],
                ["We handle rate limits",       "Automatic throttling, platform-aware"],
                ["Production in days",          "Seriously."],
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
          4. HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">Four steps from zero to publishing across all platforms.</p>
          </div>

          <div ref={stepsRef} className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-8 bottom-8 w-px bg-border hidden md:block" />

            {[
              {
                step: "01",
                icon: Lock,
                title: "Create Your OAuth Apps",
                desc: "Register developer apps on Instagram, LinkedIn, X, TikTok using your own accounts.",
                code: "// Your credentials. Your brand. Always.",
              },
              {
                step: "02",
                icon: Globe,
                title: "Connect Accounts",
                desc: "Users authenticate once via your OAuth apps. Their tokens are stored securely.",
                code: "GET /v1/auth/connect?platform=instagram",
              },
              {
                step: "03",
                icon: Zap,
                title: "Send a Publish Request",
                desc: "One API call, one payload. We route it to every connected platform.",
                code: "POST /v1/posts/publish",
              },
              {
                step: "04",
                icon: BarChart3,
                title: "We Deliver Everywhere",
                desc: "Posts are queued, formatted per-platform, and published with automatic retry.",
                code: '{ "status": "queued", "post_id": "pst_…" }',
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`relative md:flex gap-12 mb-14 last:mb-0 transition-all duration-700 ${
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 z-10 w-11 h-11 rounded-full bg-background border-2 border-primary items-center justify-center text-xs font-black text-primary shadow-sm">
                  {s.step}
                </div>
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
          5. LIVE CODE EXAMPLES
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5" /> Live Code
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Copy. Paste. Ship.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Pick your language. The endpoint is always the same.
              </p>

              <div className="inline-flex items-center gap-2 bg-muted/60 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                Full examples &amp; payload reference in{" "}
                <Link href="/docs" className="text-primary underline underline-offset-2 font-medium ml-1">
                  documentation →
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
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
                  "Single endpoint — POST /v1/posts/publish",
                  "Platform routing handled server-side",
                  "Media, scheduling, threading all in one payload",
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
                    {tab === "curl" ? "terminal" : tab === "Node.js" ? "publish.ts" : tab === "PHP" ? "PublishController.php" : tab === "Python" ? "publish.py" : "PublishAction.php"}
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
          6. FEATURES GRID (BENTO)
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Core features</h2>
            <p className="text-muted-foreground text-lg">Everything you need. Nothing you don&apos;t.</p>
          </div>

          <div
            ref={featRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
              featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* BYO OAuth — flagship, extra wide */}
            <div className="lg:col-span-2 bg-background border border-primary/20 rounded-3xl p-8 group hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">BYO OAuth</h3>
                    <span className="text-[10px] font-black tracking-widest uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">Core differentiator</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">Bring Your Own Keys</span> — use your own OAuth developer apps for every platform.
                    Your users see <em>your company name</em> on every consent screen. You own every token.
                    You can leave any time with zero migration cost.
                  </p>
                </div>
              </div>
            </div>

            {/* One endpoint */}
            <div className="bg-background border border-border rounded-3xl p-8 group hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-1">One API, Many Platforms</h3>
              <p className="text-sm text-muted-foreground">Publish everywhere with one request. No platform SDK juggling.</p>
            </div>

            {(["Built-in Scheduling", "Comment & Thread Support", "Retry & Failover", "Rate Limit Handling", "Unified Status Tracking", "Platform-Aware Routing"] as const).map((title, i) => {
              const icons = [Calendar, MessageSquare, RefreshCw, Gauge, BarChart3, Cpu];
              const descs = [
                "Publish now or schedule posts for any future date and time.",
                "Comment threading natively supported across platforms.",
                "Failed posts auto-retry with exponential back-off.",
                "Per-platform limits handled internally. Zero babysitting.",
                "Track status and per-platform result in one response.",
                "Payload auto-formatted for each platform's requirements.",
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
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          7. SUPPORTED PLATFORMS
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Supported platforms</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Supports platform-specific capabilities using a unified payload format.
              No bespoke handling. One integration surfaces all features.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Instagram",  color: "#e1306c" },
              { label: "Facebook",   color: "#1877f2" },
              { label: "X (Twitter)", color: "#9ca3af" },
              { label: "LinkedIn",   color: "#0a66c2" },
              { label: "TikTok",     color: "#69c9d0" },
              { label: "YouTube",    color: "#ff0000" },
              { label: "Reddit",     color: "#ff4500" },
              { label: "More soon",  color: "#6b7280" },
            ].map((p) => <PlatformBadge key={p.label} {...p} />)}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          8. PRICING
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-3">Simple pricing</h2>
              <p className="text-muted-foreground">Unlimited platforms. Unlimited users. No vendor lock-in.</p>
            </div>

            <div className="relative rounded-3xl border border-primary/30 bg-background overflow-hidden shadow-xl shadow-primary/5">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent" />
              <div className="p-10">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-5 rounded-2xl border border-border bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Free Tier</p>
                    <p className="text-4xl font-black">100</p>
                    <p className="text-sm text-muted-foreground">posts/month</p>
                    <p className="text-xs text-muted-foreground mt-2">No credit card required</p>
                  </div>
                  <div className="text-center p-5 rounded-2xl border border-primary/20 bg-primary/5">
                    <p className="text-xs text-primary uppercase tracking-widest mb-2">Pay-as-you-go</p>
                    <p className="text-4xl font-black">$0.01</p>
                    <p className="text-sm text-muted-foreground">per post</p>
                    <p className="text-xs text-muted-foreground mt-2">After 100 free</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-8">
                  {["Unlimited platforms", "Unlimited users", "No lock-in — your OAuth, your data"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold" asChild>
                  <Link href="/developer/signup">Start Free — No Card Required</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          9. USE CASES
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-3">Built for teams that need publishing infrastructure</h2>
            <p className="text-muted-foreground text-lg">
              If your product creates content, it should be able to distribute it.
            </p>
          </div>

          <div
            ref={caseRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
              caseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { icon: Package,   title: "SaaS Platforms",              desc: "Add social publishing as a native product feature without building the infrastructure." },
              { icon: Layers,    title: "Workflow Automation Tools",   desc: "Trigger publishing as part of automated workflows — no manual intervention required." },
              { icon: Megaphone, title: "Marketing Platforms",         desc: "Manage multiple client accounts and campaigns from a single unified API." },
              { icon: Tv2,       title: "Media Platforms",             desc: "Publish content to all channels instantly as soon as it goes live in your system." },
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
          10. RELIABILITY / INFRASTRUCTURE
      ══════════════════════════════════════ */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Built for production workloads
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Distributed job processing, automatic retries, and platform-aware rate limiting
                mean your publishing pipeline keeps moving — even when individual platforms don&apos;t.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="/docs">View Technical Docs <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>

            <div
              ref={infraRef}
              className={`grid grid-cols-1 gap-3 transition-all duration-700 ${
                infraVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { icon: Layers,       label: "Queue-based publishing",           desc: "Every post enters a durable job queue before dispatch." },
                { icon: RefreshCw,    label: "Automatic retry system",           desc: "Exponential back-off on network errors and platform timeouts." },
                { icon: Gauge,        label: "Platform-aware rate limiting",     desc: "Per-platform limits tracked and respected automatically." },
                { icon: ServerCrash,  label: "Failure tracking per platform",   desc: "Each platform result logged individually — partial success handled." },
                { icon: Webhook,      label: "Webhook-ready architecture",       desc: "Subscribe to post status events in real time." },
                { icon: ShieldCheck,  label: "Credential isolation",             desc: "Your OAuth tokens isolated per workspace — never shared." },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="flex items-start gap-4 bg-background border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
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
          11. FAQ
      ══════════════════════════════════════ */}
      <section className="py-28">
        <Container className="max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight mb-3">Frequently asked questions</h2>
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <Link href="/docs" className="text-primary underline underline-offset-2">
                Full docs →
              </Link>
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "What does BYO OAuth mean?",
                a: "BYO OAuth stands for Bring Your Own Keys. You register your own developer apps on Instagram, LinkedIn, X, TikTok, and other platforms. Your users see your company name on every OAuth consent screen — not ours. You retain full control of credentials and tokens. If you ever leave Palactix, you take everything with you.",
              },
              {
                q: "Can I switch platforms later?",
                a: "Yes. Platforms can be added or removed without any code changes on your end. The API contract stays the same — we add platform support on the backend.",
              },
              {
                q: "Is this production-ready?",
                a: "Yes. The publishing pipeline is designed around distributed job processing, automatic retry logic, and platform-aware rate limiting. It handles the kind of failure modes that come up in real production traffic.",
              },
              {
                q: "What is the correct publish endpoint?",
                a: "POST /v1/posts/publish — with account_ids, content, and an optional media array. Full payload reference is in the API documentation.",
              },
              {
                q: "What if a platform reject my post?",
                a: "Each platform result is tracked individually. If one platform fails, others aren't blocked. The response includes per-platform status and error codes so you can surface them accurately in your UI.",
              },
              {
                q: "Where can I see full API documentation?",
                a: "All endpoints, payload schemas, error codes, and integration guides are in the documentation.",
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
                  {i === 5 && (
                    <Button size="sm" variant="outline" className="mt-4 rounded-full" asChild>
                      <Link href="/docs">View API Docs <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* ══════════════════════════════════════
          12. FOOTER CTA
      ══════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-primary/5" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-primary/8 blur-[100px]" />
        <Container className="relative max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Start publishing across platforms today
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            100 posts/month free. Then $0.01 per post.
            <br />
            Your OAuth. Your branding. No lock-in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-semibold shadow-xl shadow-primary/25"
              asChild
            >
              <Link href="/developer/signup">
                Get API Key — Free Trial <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 rounded-full text-base"
              asChild
            >
              <Link href="/docs">
                <Activity className="w-4 h-4 mr-2" /> View API Docs
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              No credit card &bull; 100 posts/month free &bull; 5-minute setup
            </p>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" /> API Documentation
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
