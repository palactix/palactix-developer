"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Check, Copy, ArrowRight, X as XIcon,
  Home, Building2, Dumbbell, ShoppingBag,
  Key, CalendarDays, Zap, AlertTriangle, Minus,
} from "lucide-react";
import { FAQs } from "@/components/shared/FAQs";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="text-[13px] leading-[1.75] font-mono overflow-x-auto p-6">
      {code.split("\n").map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-7 shrink-0 text-right mr-5 text-white/20 text-[11px] leading-[2.1]">
            {i + 1}
          </span>
          <span>
            {line
              .split(/(\'[^\']*\'|"[^"]*"|`[^`]*`|\/\/[^\n]*|import|from|const|new|return|export|function|class)/g)
              .map((part, j) => {
                if (/^(import|from|const|new|return|export|function|class)$/.test(part))
                  return <span key={j} className="text-[#c792ea]">{part}</span>;
                if (/^(['"`])/.test(part))
                  return <span key={j} className="text-[#c3e88d]">{part}</span>;
                if (/^\/\//.test(part))
                  return <span key={j} className="text-[#546e7a]">{part}</span>;
                return <span key={j} className="text-[#cdd3de]">{part}</span>;
              })}
          </span>
        </div>
      ))}
    </pre>
  );
}

const PLATFORMS = [
  { name: "Instagram", abbr: "IG", color: "#E1306C", types: "Posts · Stories · Reels" },
  { name: "TikTok",    abbr: "TK", color: "#010101", types: "Videos" },
  { name: "LinkedIn",  abbr: "LI", color: "#0A66C2", types: "Posts · Articles" },
  { name: "X / Twitter", abbr: "X", color: "#555",  types: "Posts · Threads" },
  { name: "Facebook",  abbr: "FB", color: "#1877F2", types: "Posts · Pages" },
  { name: "YouTube",   abbr: "YT", color: "#FF0000", types: "Shorts · Videos" },
];

const STEPS = [
  {
    n: "01",
    title: "Install the package",
    desc: "One command. Zero peer dependencies.",
    file: "terminal",
    code: `$ npm install @palactix/publisher-widget\n\n+ @palactix/publisher-widget@0.1.2\n✓ Installed in 2.3s\n✓ TypeScript definitions included`,
  },
  {
    n: "02",
    title: "Initialize once on page load",
    desc: "Call init() once — pre-loads the iframe in the background.",
    file: "app.ts",
    code: `import { init } from '@palactix/publisher-widget';\n\n// Call once on page load — pre-loads the iframe in the background\nconst widget = init({ token: '<YOUR_INIT_TOKEN>' });`,
  },
  {
    n: "03",
    title: "Trigger publish on any button click",
    desc: "Call widget.publish() from anywhere in your app.",
    file: "publish-button.ts",
    code: `document.getElementById('publish-btn').addEventListener('click', () => {\n  widget.publish();\n});`,
  },
];

const PAINss = [
  { label: "OAuth for 6+ platforms",   badge: "3–4 months" },
  { label: "Meta App Review",           badge: "2–3 weeks" },
  { label: "TikTok API audit",          badge: "7–14 days" },
  { label: "X API pricing spike",       badge: "$200 → $5k" },
  { label: "Instagram token expiry",    badge: "Every 60 days" },
  { label: "Platform deprecations",     badge: "Every 90 days" },
  { label: "Rate limit management",     badge: "Ongoing" },
  { label: "50+ error code handlers",   badge: "Weeks" },
];


const PAIN_WITHOUT = [
  { label: "OAuth implementation for 6 platforms", badge: "3–4 months" },
  { label: "Token refresh automation", badge: "Weeks" },
  { label: "Composer UI with previews", badge: "2–3 months" },
  { label: "Rate limit tracking & retry", badge: "Ongoing" },
  { label: "Platform deprecation monitoring", badge: "Every 90 days" },
  { label: "Error handling (50+ codes)", badge: "Weeks" },
  { label: "Media format conversion", badge: "Per platform" },
  { label: "Post scheduling & queuing", badge: "2–4 weeks" },
];

const PAIN_WITH = [
  { label: "OAuth implementation for 6 platforms", status: "✓ Built-in" },
  { label: "Token refresh automation", status: "✓ Automatic" },
  { label: "Composer UI with previews", status: "✓ Ready" },
  { label: "Rate limit tracking & retry", status: "✓ Handled" },
  { label: "Platform deprecation monitoring", status: "✓ We track" },
  { label: "Error handling (50+ codes)", status: "✓ Covered" },
  { label: "Media format conversion", status: "✓ Done" },
  { label: "Post scheduling & queuing", status: "✓ Included" },
];

const USE_CASES = [
  { icon: Home,        title: "Real Estate CRMs",     desc: "Auto-post new listings to Instagram, Facebook, and LinkedIn the moment they're added to your system." },
  { icon: Building2,   title: "Franchise Management",  desc: "Let each location post under the brand account with localized content and approval workflows." },
  { icon: Dumbbell,    title: "Sports & Wellness",     desc: "Enable clubs and trainers to share updates, events, and achievements across every platform." },
  { icon: ShoppingBag, title: "E-commerce Platforms", desc: "Let merchants share new products to their social accounts directly from your dashboard." },
];

const FAQS = [
  { question: "What platforms do you support?",               answer: "Instagram, TikTok, LinkedIn, X/Twitter, Facebook, YouTube. More coming based on customer requests." },
  { question: "Do I need to create OAuth apps per platform?", answer: "Yes for BYOK (your brand on auth screens). We provide step-by-step guides — about 20 minutes per platform." },
  { question: "Can I use your OAuth apps instead?",           answer: "Not currently. BYOK is our differentiator — your users stay connected to YOUR brand, not ours." },
  { question: "What happens if a post fails?",                answer: "We retry automatically and fire a webhook. Users can re-publish from your app with one click." },
  { question: "Do you store my users' content?",              answer: "Only temporarily for scheduling. Published posts are removed from our systems within 30 days." },
  { question: "Can I customize the widget appearance?",       answer: "Yes — pass theme colors via props. Full customization is covered in our documentation." },
  { question: "What if I exceed 100 posts early?",            answer: "$0.01 per post after that, billed at month end. No surprises." },
  { question: "Is there a free trial?",                       answer: "Yes — 14 days, no credit card required, all features enabled." },
  { question: "What if I need custom features?",              answer: "Reach out via the contact page. For larger customers, we build custom features." },
];

export default function WidgetPageClient() {
  const [demoOpen, setDemoOpen]   = useState(false);
  const [copied, setCopied]       = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [problemRef,   problemVisible]   = useInView(0.08);
  const [featuresRef,  featuresVisible]  = useInView(0.05);
  const [useCasesRef,  useCasesVisible]  = useInView(0.08);

  const copy = () => {
    navigator.clipboard.writeText("npm install @palactix/publisher-widget");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-x-hidden">

      {/* ────────────────────────────────────────
          DEMO POPUP
      ──────────────────────────────────────── */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setDemoOpen(false)}
            >
              <XIcon className="w-5 h-5" />
            </button>
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-2">Live Demo</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">See the widget in action</h2>
            <p className="text-sm text-gray-500 mb-8">
              Interactive demo coming soon. Reach out for a live walkthrough.
            </p>
            <div className="flex items-center justify-center h-44 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 mb-6">
              <p className="text-sm text-gray-400">[ Demo Placeholder ]</p>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-11"
                asChild
              >
                <Link href="/contact-us">Talk to founder</Link>
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-11 border-gray-200"
                onClick={() => setDemoOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────
          1 · HERO  (dark, full-bleed)
      ──────────────────────────────────────── */}
      <section className="relative bg-gray-950 pt-36 pb-24 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Gradient orbs */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,#2ea44f,transparent 65%)" }}
        />
        <div
          className="absolute top-24 right-0 w-72 h-72 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,#6366f1,transparent 65%)" }}
        />

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Clickable npm install badge */}
            <button
              onClick={copy}
              className="group inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-full px-5 py-2 mb-10 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <code className="text-sm font-mono text-white/50 group-hover:text-white/70 transition-colors">
                npm install @palactix/publisher-widget
              </code>
              {copied
                ? <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                : <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-white/50 shrink-0 transition-colors" />
              }
            </button>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold tracking-[-0.04em] leading-[0.92] text-white max-w-4xl mb-7">
              Add social publishing
              <br />
              to your SaaS{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
                in one afternoon
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
              Drop-in React widget for Instagram, TikTok, LinkedIn, X, Facebook, and YouTube.
              Your brand. Your OAuth apps. Zero Palactix branding.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <Link
                href="https://www.npmjs.com/package/@palactix/publisher-widget"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-7 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base shadow-lg shadow-green-500/25 transition-all duration-200"
              >
                Install npm package <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/publish-widget-demo"
                className="inline-flex items-center gap-2 h-12 px-7 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-base border border-white/20 transition-all duration-200"
              >
                See live demo
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-base font-medium transition-colors duration-200"
              >
                Talk to founder <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Platform pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
              {PLATFORMS.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5"
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-sm text-gray-300">{p.name}</span>
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-600 tracking-widest uppercase">
              Live in production · Sports &amp; wellness · Real estate · Franchise management
            </p>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          2 · METRICS BAR  (dark)
      ──────────────────────────────────────── */}
      <section className="bg-gray-900 border-y border-gray-800">
        <Container>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-5 py-8">
            {[
              { value: "6",     label: "Social platforms" },
              { value: "1 hr",  label: "Avg. setup time" },
              { value: "$99",   label: "Per month flat" },
              { value: "0",     label: "Palactix branding" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black text-white tracking-tight">{value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          3 · PROBLEM  (light, pain grid)
      ──────────────────────────────────────── */}
      <section className="bg-white py-32">
        <Container>
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">
              The reality
            </p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.05]">
              We handle the engineering.<br />
              You handle app approvals.
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Here's exactly what you're signing up for with each approach.
            </p>
          </div>

          {/* Two-column comparison */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* LEFT: Building from scratch */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XIcon className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Building from scratch</h3>
                  <p className="text-sm text-gray-500">6–12 months + ongoing maintenance</p>
                </div>
              </div>

              <div className="space-y-2">
                {PAIN_WITHOUT.map(({ label, badge }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-3 p-4 bg-red-50 border border-red-100 rounded-xl"
                  >
                    <span className="text-sm font-medium text-gray-800 leading-snug">
                      {label}
                    </span>
                    <span className="text-[11px] font-semibold text-red-600 bg-red-100 rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Plus BYOK requirements */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Plus platform approvals:</p>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Minus className="w-3 h-3 text-red-400 shrink-0" />
                    <span>Meta App Review (~2 weeks)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Minus className="w-3 h-3 text-red-400 shrink-0" />
                    <span>TikTok API audit (~1 week)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Minus className="w-3 h-3 text-red-400 shrink-0" />
                    <span>X API account ($200–5k/mo)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: With Palactix */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">With Palactix Widget</h3>
                  <p className="text-sm text-green-600 font-semibold">2 hours + 2–4 weeks approval</p>
                </div>
              </div>

              <div className="space-y-2">
                {PAIN_WITH.map(({ label, status }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-3 p-4 bg-primary/5 border border-green-100 rounded-xl"
                  >
                    <span className="text-sm font-medium text-gray-800 leading-snug">
                      {label}
                    </span>
                    <span className="text-[11px] font-semibold text-green-700 bg-primary/10 rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap">
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Your BYOK requirements */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">You handle (one-time):</p>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Meta App Review (~2 weeks, <a href="#" className="text-primary hover:underline">we guide</a>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>TikTok API audit (~1 week, <a href="#" className="text-primary hover:underline">we guide</a>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>X API account (15 min, from $200/mo)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  <strong>Why BYOK?</strong> Your users see YOUR brand on OAuth screens, not ours. You own the connections.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom CTA bar */}
          <div className="bg-gray-950 text-white rounded-2xl px-8 py-7 text-center">
            <p className="text-2xl font-black text-green-400 mb-2">
              Your engineering time: 2 hours vs 6 months
            </p>
            <p className="text-gray-400 text-sm">
              Platform approvals are the same either way. But the engineering work? We've got it.
            </p>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          4 · CODE SHOWCASE  (dark, interactive)
      ──────────────────────────────────────── */}
      <section className="relative bg-gray-950 py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <Container className="relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-green-400 tracking-widest uppercase mb-4">Integration</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
              Three steps. One afternoon.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              From npm install to your users publishing live.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {/* Step selector */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-1.5">
              {STEPS.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 ${
                    activeStep === i
                      ? "bg-white/8 border border-white/15"
                      : "border border-transparent hover:bg-white/4"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-black mt-0.5 shrink-0 transition-colors tabular-nums ${
                        activeStep === i ? "text-green-400" : "text-gray-600"
                      }`}
                    >
                      {step.n}
                    </span>
                    <div>
                      <p className={`font-semibold text-sm transition-colors ${activeStep === i ? "text-white" : "text-gray-500"}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                </button>
              ))}

              <div className="px-5 pt-4">
                <Link
                  href="/docs/publisher-widget"
                  className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                >
                  Read full documentation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Code panel */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-gray-800 bg-[#0d1117]">
              <div className="flex items-center justify-between px-5 h-11 border-b border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">
                    {STEPS[activeStep].file}
                  </span>
                </div>
                <span className="text-xs text-gray-700 font-mono">
                  {activeStep + 1} / {STEPS.length}
                </span>
              </div>
              <CodeBlock code={STEPS[activeStep].code} />
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          5 · FEATURES BENTO  (light)
      ──────────────────────────────────────── */}
      <section className="bg-[#fafafa] py-32">
        <Container>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">What&apos;s included</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.05]">
              Everything included
            </h2>
            <p className="text-xl text-gray-500">No add-ons. No surprises.</p>
          </div>

          <div
            ref={featuresRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${
              featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Platform coverage — wide card */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-xl text-gray-900 mb-1">6 platforms, one widget</h3>
              <p className="text-gray-500 text-sm mb-6">Every major social platform, covered out of the box.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PLATFORMS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: p.color }}
                    >
                      {p.abbr}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{p.types}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* White-label — narrow, with mock auth screen */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8">
              <h3 className="font-bold text-xl text-gray-900 mb-1">Zero Palactix branding</h3>
              <p className="text-gray-500 text-sm mb-5">Your users only ever see your company name.</p>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center">
                    <span className="text-[8px] font-black text-green-700">YA</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">YourApp</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  <strong className="text-gray-800">YourApp</strong> is requesting access to your Instagram account.
                </p>
                <div className="space-y-1.5 mb-4">
                  {["Read your profile", "Post content", "Manage media"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-primary text-white text-xs font-bold text-center py-2 rounded-lg">
                  Authorize YourApp
                </div>
              </div>
            </div>

            {/* BYOK */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Bring Your Own Keys</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                You create the OAuth apps. Your users authorize through your brand. You own every token and connection — forever.
              </p>
            </div>

            {/* Scheduling */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Scheduling built-in</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Publish now or schedule for any future date. Queue management, auto-retry, and webhook notifications included.
              </p>
            </div>

            {/* Dev experience */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Built for developers</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                React, Vue, vanilla JS. Full TypeScript definitions. Webhook events. Works inside any component tree with zero friction.
              </p>
            </div>

            {/* Full-width CTA card */}
            <div className="md:col-span-3 bg-gray-950 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xl font-bold text-white mb-1">One afternoon. Full social publishing.</p>
                <p className="text-gray-400 text-sm">
                  If it takes longer, email us. We&apos;ll pair with you live.
                </p>
              </div>
              <Link
                href="/developer/signup"
                className="inline-flex items-center gap-2 h-11 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shrink-0 shadow-lg shadow-green-500/25 transition-all duration-200"
              >
                Start 14-day trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          6 · USE CASES  (white)
      ──────────────────────────────────────── */}
      <section className="bg-white py-32 border-t border-gray-100">
        <Container>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">Use cases</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.05]">
              Built for vertical SaaS
            </h2>
            <p className="text-xl text-gray-500">
              If your users create content, they should be able to publish it.
            </p>
          </div>

          <div
            ref={useCasesRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
              useCasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {USE_CASES.map((u, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="p-7 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <u.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{u.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          7 · PRICING  (off-white)
      ──────────────────────────────────────── */}
      <section className="bg-[#fafafa] py-32 border-t border-gray-100">
        <Container>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">Pricing</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.05]">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-500">
              One plan. Everything included. No per-user or per-platform fees.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-green-300 shadow-lg overflow-hidden">
              {/* Top: price left, features right */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {/* Left: price + trial badge */}
                <div className="p-10">
                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-6xl font-black text-gray-900 tracking-tight">$99</span>
                    <span className="text-xl text-gray-400 mb-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    + <strong className="text-gray-800">$0.01 per post</strong> after 100 posts
                  </p>
                  <span className="inline-flex items-center gap-2 bg-primary/5 border border-green-200 text-green-700 text-sm font-semibold rounded-full px-4 py-2">
                    14-day free trial — no credit card
                  </span>
                </div>

                {/* Right: feature list */}
                <div className="p-10">
                  <ul className="space-y-3">
                    {[
                      "Unlimited end users",
                      "100 posts/month included",
                      "All 6 platforms enabled",
                      "Full white-label (BYOK)",
                      "React, Vue, vanilla JS support",
                      "Webhook notifications",
                      "Priority email support",
                      "No setup fees",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom: fine print + CTAs */}
              <div className="border-t border-gray-100 bg-gray-50/60 px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                  100 posts = 100 publish actions. One post to 5 platforms = 5 posts.
                  No per-user fees. No per-platform fees. Cancel anytime.
                </p>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/developer/signup"
                    className="inline-flex items-center h-11 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm shadow-md shadow-green-500/20 transition-all duration-200"
                  >
                    Start 14-day trial
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center h-11 px-6 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 transition-all duration-200"
                  >
                    Talk to founder
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          8 · BYOK  (white, comparison table)
      ──────────────────────────────────────── */}
      <section className="bg-white py-32 border-t border-gray-100">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: text */}
            <div>
              <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">
                White-label infrastructure
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.05]">
                Your OAuth apps.<br />Your brand.<br />Your control.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Most social tools connect your users through <em>their</em> platform apps — users see
                {" "}<em>&ldquo;Buffer is requesting access.&rdquo;</em> With Palactix, they see{" "}
                <strong className="text-gray-800">your company name</strong>. You create the OAuth apps.
                We handle the infrastructure. You own the relationship.
              </p>
              <Link
                href="/docs/getting-started/configure-platform-credentials"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-semibold transition-colors"
              >
                How to set up BYOK <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: comparison table */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="px-5 py-4 text-sm font-semibold text-gray-400" />
                <div className="px-5 py-4 text-sm font-semibold text-gray-500 text-center border-l border-gray-200">
                  Other tools
                </div>
                <div className="px-5 py-4 text-sm font-semibold text-green-600 text-center border-l border-gray-200">
                  Palactix Widget
                </div>
              </div>
              {[
                ["OAuth screens",    "Their brand",       "Your brand"],
                ["API credentials",  "Their apps",        "Your apps"],
                ["When you leave",   "Re-auth all users", "Keep all connections"],
                ["Rate limits",      "Shared pool",       "Your own limits"],
                ["Platform bans",    "Everyone affected", "Only you affected"],
                ["White-label cost", "$500–1,000/mo",     "Included at $99/mo"],
              ].map(([label, other, ours], i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 border-b border-gray-100 last:border-b-0 ${
                    i % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                  }`}
                >
                  <div className="px-5 py-4 text-sm font-medium text-gray-700">{label}</div>
                  <div className="px-5 py-4 text-sm text-center text-gray-400 border-l border-gray-100">{other}</div>
                  <div className="px-5 py-4 text-sm text-center font-semibold text-green-600 border-l border-gray-100">{ours}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          9 · DO / DON'T  (off-white)
      ──────────────────────────────────────── */}
      <section className="bg-[#fafafa] py-32 border-t border-gray-100">
        <Container>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">Scope</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.05]">
              What we do &amp; don&apos;t do
            </h2>
            <p className="text-xl text-gray-500 max-w-xl mx-auto">
              We do ONE thing well: embed social publishing. No feature bloat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-6">We do</p>
              <ul className="space-y-3">
                {[
                  "Embeddable publishing UI",
                  "OAuth flows for all platforms",
                  "Automatic token refresh",
                  "Queue & retry failed posts",
                  "BYOK (your OAuth apps)",
                  "White-label everything",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-primary/5 border border-green-200 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">We don&apos;t</p>
              <ul className="space-y-3">
                {[
                  ["AI content generation",    "bring your own"],
                  ["Social listening",         ""],
                  ["Influencer discovery",     ""],
                  ["Engagement analytics",     "coming Q3 2026"],
                  ["Comment management",       "coming Q4 2026"],
                ].map(([item, note]) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="w-5 h-5 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center shrink-0">
                      <XIcon className="w-3 h-3 text-gray-300" />
                    </span>
                    <span>
                      {item}
                      {note && <span className="text-xs text-gray-300 ml-1.5">({note})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────
          10 · FAQ  (white)
      ──────────────────────────────────────── */}
      <FAQs faqs={FAQS} />
      {/* <section className="bg-white py-32 border-t border-gray-100">
        <Container className="max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-4">FAQ</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.05]">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-500">
              Everything you need before writing a single line of code.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-gray-100 rounded-2xl px-6 shadow-sm data-[state=open]:border-green-200 transition-colors bg-white"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 data-[state=open]:text-green-700 text-gray-900 font-semibold text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed pb-5 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-semibold transition-colors"
            >
              More questions? Talk to the founder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section> */}

      {/* ────────────────────────────────────────
          11 · FINAL CTA  (dark, gradient)
      ──────────────────────────────────────── */}
      <section className="relative bg-gray-950 py-36 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,#2ea44f,transparent 65%)" }}
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.92]">
              Ready to ship<br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
                social publishing?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Install the widget this afternoon. Your users posting by tomorrow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link
                href="/developer/signup"
                className="inline-flex items-center gap-2 h-14 px-10 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-base shadow-xl shadow-green-500/20 transition-all duration-200"
              >
                Start 14-day free trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 h-14 px-8 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-base border border-white/20 transition-all duration-200"
              >
                Talk to founder
              </Link>
            </div>
            <p className="text-xs text-gray-600 tracking-widest uppercase">
              No credit card required · Cancel anytime · Full white-label · BYOK included
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
