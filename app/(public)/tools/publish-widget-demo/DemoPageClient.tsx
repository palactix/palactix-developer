'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import {
  Copy, Check, ArrowRight, Play, Info, AlertTriangle,
  UserPlus, KeyRound, Rocket, Code2, Zap,
  FileText, MonitorPlay, ImageIcon,
} from 'lucide-react';

type DemoType = 'basic' | 'caption' | 'media';
type Framework = 'vanilla' | 'react' | 'vue' | 'node' | 'php' | 'python';

// ── Syntax highlighter ────────────────────────────────────────────────────────

type Token = { type: string; value: string };

function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = [];
  let s = code;
  const patterns: [string, RegExp][] = [
    ['comment',    /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/],
    ['string',     /^(`[\s\S]*?`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/],
    ['keyword',    /^\b(import|export|from|const|let|var|function|async|await|return|if|else|new|this|typeof|class|extends|default|def|for|in|with|try|except|require|use|echo|endif|foreach|endforeach)\b/],
    ['builtin',    /^\b(fetch|console|document|window|Promise|JSON|Buffer|process|Object|Array|Math|base64_encode|json_encode|json_decode|file_get_contents|stream_context_create|requests)\b/],
    ['number',     /^\d+(?:\.\d+)?/],
    ['operator',   /^[{}()[\];:,.=+\-*/<>!&|?@$^~\\]/],
    ['whitespace', /^[ \t\r\n]+/],
    ['word',       /^[a-zA-Z_][a-zA-Z0-9_]*/],
    ['other',      /^./],
  ];
  while (s.length > 0) {
    let matched = false;
    for (const [type, pat] of patterns) {
      const m = s.match(pat);
      if (m) { tokens.push({ type, value: m[0] }); s = s.slice(m[0].length); matched = true; break; }
    }
    if (!matched) { tokens.push({ type: 'other', value: s[0] }); s = s.slice(1); }
  }
  return tokens;
}

const TOKEN_COLORS: Record<string, string> = {
  comment:    '#8b949e',
  string:     '#a5d6ff',
  keyword:    '#ff7b72',
  builtin:    '#ffa657',
  number:     '#79c0ff',
  operator:   '#c9d1d9',
  whitespace: 'inherit',
  word:       '#e6edf3',
  other:      '#c9d1d9',
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenizeCode(code);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      <pre className="bg-[#0d1117] border border-gray-800 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed font-mono">
        <code>
          {tokens.map((t, i) => (
            <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>{t.value}</span>
          ))}
        </code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DemoPageClient() {
  const [activeSection, setActiveSection] = useState<DemoType>('basic');
  const [activeFramework, setActiveFramework] = useState<Framework>('vanilla');
  const [caption, setCaption] = useState('Check out our latest update!');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1557821552-17105176677c?w=800');
  const widgetRef = useRef<any>(null);

  const basicRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<DemoType, React.RefObject<HTMLDivElement | null>> = {
    basic: basicRef,
    caption: captionRef,
    media: mediaRef,
  };

  const scrollToDemo = (type: DemoType) => {
    const el = sectionRefs[type].current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const demos = {
    basic: {
      title: 'Basic Demo',
      description: 'Open the widget with no pre-fill. User starts from scratch.',
      preFill: null,
    },
    caption: {
      title: 'Pre-filled Caption',
      description: 'Widget opens with caption already filled in. User can edit or publish as-is.',
      preFill: { caption },
    },
    media: {
      title: 'Caption + Media',
      description: 'Widget opens with caption and image pre-loaded. Perfect for "Share this" buttons.',
      preFill: {
        caption,
        media: [{ url: mediaUrl, type: 'image', alt_text: 'Demo image' }],
      },
    },
  };

  const codeExamples: Record<Framework, { label: string; code: string }> = {
    vanilla: { label: 'Plain JS',        code: getVanillaCode(activeSection, demos[activeSection].preFill) },
    react:   { label: 'React',           code: getReactCode(activeSection, demos[activeSection].preFill) },
    vue:     { label: 'Vue',             code: getVueCode(activeSection, demos[activeSection].preFill) },
    node:    { label: 'Node.js Backend', code: getNodeBackendCode() },
    php:     { label: 'PHP Backend',     code: getPHPBackendCode() },
    python:  { label: 'Python Backend',  code: getPythonBackendCode() },
  };

  // Load widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@palactix/publisher-widget@latest/dist/iife/loader.min.js';
    script.async = true;
    script.onload = () => {
      fetchDemoToken().then((demoToken) => {
        // @ts-ignore
        widgetRef.current = window.PalactixWidget.init({
          token: demoToken,
          mode: 'modal',
          primary: '#10b981',
          onPublished: (post: any) => {
            console.log('Published:', post);
            alert('Post published successfully! Check console for details.');
          },
          onClose: () => { console.log('Widget closed'); },
        });
      });
    };
    document.body.appendChild(script);
    return () => { if (widgetRef.current) { widgetRef.current.destroy(); } };
  }, []);

  // IntersectionObserver — update active nav pill as sections scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-demo') as DemoType;
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    [basicRef, captionRef, mediaRef].forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, []);

  const handleLaunchWidget = (type: DemoType) => {
    if (!widgetRef.current) {
      alert('Widget not initialized yet. Please wait a moment and try again.');
      return;
    }
    widgetRef.current.publish(demos[type].preFill);
  };

  const NAV_ITEMS: { type: DemoType; label: string; icon: React.ElementType }[] = [
    { type: 'basic',   label: 'Basic Demo',        icon: Play },
    { type: 'caption', label: 'Pre-filled Caption', icon: FileText },
    { type: 'media',   label: 'Caption + Media',   icon: ImageIcon },
  ];

  const STEPS = [
    { icon: UserPlus, n: '01', title: 'Create developer account',  desc: 'Sign up for free. No credit card required.',                    cta: 'Sign up',    href: '/developer/signup' },
    { icon: KeyRound, n: '02', title: 'Get your credentials',      desc: 'Generate WIDGET_ID and WIDGET_SECRET from your dashboard.',     cta: 'Create app', href: '/developer/apps' },
    { icon: Rocket,   n: '03', title: 'Integrate and launch',      desc: 'Follow the step-by-step guide. Ship in under 2 hours.',          cta: 'Read docs',  href: '/docs/publisher-widget' },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white pt-28 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
        />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <MonitorPlay className="w-4 h-4" />
              Interactive Demo
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-6 leading-[1.05]">
              <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                Try the widget.{' '}
              </span>
              <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                Live.
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
              See exactly how the Palactix Publisher Widget behaves inside your app.
              No signup required — click any demo and the real widget opens.
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-700 text-gray-400 text-sm px-4 py-2.5 rounded-lg">
              <Info className="w-4 h-4 text-primary shrink-0" />
              This is a live demo. Changes won&apos;t actually post to social media.
            </div>
          </div>
        </Container>
      </section>

      {/* ── Sticky demo nav ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <Container>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1 overflow-x-auto">
              {NAV_ITEMS.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => scrollToDemo(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    activeSection === type
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
            <Link
              href="/developer/signup"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              Get API access <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Demo 01 — Basic ──────────────────────────────────────────────── */}
      <section ref={basicRef} data-demo="basic" className="py-20 bg-gray-950 text-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase block mb-4">Demo 01</span>
              <h2 className="text-4xl font-black mb-3">Basic Demo</h2>
              <p className="text-gray-400 text-lg mb-8">
                Open the widget with no pre-fill. The user starts from scratch — they pick platforms, write their caption, and upload media themselves.
              </p>
              <button
                onClick={() => handleLaunchWidget('basic')}
                className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 mb-8"
              >
                <Play className="w-5 h-5" />
                Launch Basic Widget
              </button>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  What happens when you click
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {[
                    'Widget modal opens — white-label, your branding',
                    'User selects platforms (Instagram, TikTok, LinkedIn…)',
                    'User writes caption and uploads media',
                    'User schedules or publishes immediately',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 font-medium">Basic — no pre-fill</span>
              </div>
              <CodeBlock code={getNpmSnippet(null)} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Demo 02 — Pre-filled Caption ─────────────────────────────────── */}
      <section ref={captionRef} data-demo="caption" className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase block mb-4">Demo 02</span>
              <h2 className="text-4xl font-black text-gray-900 mb-3">Pre-filled Caption</h2>
              <p className="text-gray-500 text-lg mb-8">
                Widget opens with your caption already loaded. Perfect for &ldquo;Share this article&rdquo; flows where you control the copy — the user just picks platforms and publishes.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Caption text</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-gray-900 text-sm resize-none transition-all"
                  rows={3}
                  placeholder="Enter caption text..."
                />
                <p className="text-xs text-gray-400 mt-1.5">Edit the caption above — the code preview on the right updates live.</p>
              </div>
              <button
                onClick={() => handleLaunchWidget('caption')}
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg mb-8"
              >
                <Play className="w-5 h-5" />
                Launch with Caption
              </button>
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  Use case: content marketing
                </h4>
                <p className="text-sm text-gray-600">
                  Pass your article headline and URL as the caption. Your users open the widget pre-filled — one click to share across all their social accounts.
                </p>
              </div>
            </div>
            <div className="sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">With pre-filled caption</span>
              </div>
              <CodeBlock code={getNpmSnippet({ caption })} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Demo 03 — Caption + Media ─────────────────────────────────────── */}
      <section ref={mediaRef} data-demo="media" className="py-20 bg-[#fafafa]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase block mb-4">Demo 03</span>
              <h2 className="text-4xl font-black text-gray-900 mb-3">Caption + Media</h2>
              <p className="text-gray-500 text-lg mb-8">
                Widget opens with both caption and image pre-loaded. The ultimate &ldquo;Share this product&rdquo; experience — zero friction for your users.
              </p>
              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-gray-900 text-sm resize-none transition-all"
                    rows={2}
                    placeholder="Enter caption text..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (must be publicly accessible)</label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-gray-900 text-sm transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  {mediaUrl && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={mediaUrl}
                        alt="Preview"
                        className="w-full h-44 object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'; }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleLaunchWidget('media')}
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
              >
                <Play className="w-5 h-5" />
                Launch with Media
              </button>
            </div>
            <div className="sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">With caption + media</span>
              </div>
              <CodeBlock code={getNpmSnippet({ caption, media: [{ url: mediaUrl, type: 'image', alt_text: 'Demo image' }] })} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Integration code ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-950 text-white">
        <Container>
          <div className="mb-10">
            <p className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-3">Full Integration</p>
            <h2 className="text-4xl font-black mb-4">Copy the code for your stack</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Frontend snippets show the live widget call. Backend examples show how to generate tokens securely — never expose your secret on the client.
            </p>
          </div>

          {/* Framework tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
            {(Object.keys(codeExamples) as Framework[]).map((fw) => {
              const isBackend = ['node', 'php', 'python'].includes(fw);
              return (
                <button
                  key={fw}
                  onClick={() => setActiveFramework(fw)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    activeFramework === fw
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {codeExamples[fw].label}
                  {isBackend && (
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${activeFramework === fw ? 'bg-white/20' : 'bg-gray-700 text-gray-500'}`}>
                      BE
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <CodeBlock code={codeExamples[activeFramework].code} />

          {/* Backend security note */}
          {['node', 'php', 'python'].includes(activeFramework) && (
            <div className="mt-4 flex items-start gap-3 bg-amber-950/40 border border-amber-700/40 rounded-xl p-4">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200">
                <strong className="text-amber-300">Backend only:</strong> Token generation must happen on your server.
                Never expose{' '}
                <code className="bg-amber-900/40 px-1.5 py-0.5 rounded text-amber-200 text-xs font-mono">WIDGET_SECRET</code>{' '}
                in frontend code.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ── Setup steps ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-3">Get started</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Ready to ship this in production?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Three steps. Your widget is live in under two hours.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map(({ icon: Icon, n, title, desc, cta, href }) => (
              <div key={n} className="bg-[#fafafa] rounded-2xl border border-gray-100 p-8 group hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-black text-gray-100 group-hover:text-primary/20 transition-colors select-none">{n}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-5">{desc}</p>
                <Link href={href} className="text-sm font-semibold text-primary hover:text-primary/70 transition-colors flex items-center gap-1">
                  {cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, var(--primary) 0%, transparent 70%)' }}
        />
        <Container className="relative z-10 text-center">
          <h2 className="text-5xl font-black mb-5">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Add social publishing<br />to your app today.
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
            100 posts free. $0.01/post after that. Your branding, your domain, your OAuth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/developer/signup"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-primary/25"
            >
              Start free trial
            </Link>
            <Link
              href="/products/publisher-widgets"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              View product page
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ── Code generation helpers ───────────────────────────────────────────────────

function getNpmSnippet(preFill: any) {
  const publishCall = preFill
    ? `widget.publish(${JSON.stringify(preFill, null, 2)});`
    : `widget.publish();`;
  return `import { init } from '@palactix/publisher-widget';

// Call once on page load — pre-loads the iframe in the background
const widget = init({ token });

// Trigger from any button click
${publishCall}`;
}

function getVanillaCode(_demoType: DemoType, preFill: any) {
  const publishCall = preFill
    ? `widget.publish(${JSON.stringify(preFill, null, 2)});`
    : `widget.publish();`;

  return `<button id="publish-btn">Publish Post</button>

<script src="https://cdn.jsdelivr.net/npm/@palactix/publisher-widget@latest/dist/iife/loader.min.js"></script>
<script>
  fetch('/api/publisher-token')
    .then(r => r.json())
    .then(({ token }) => {
      const widget = PalactixWidget.init({ token });
      document.getElementById('publish-btn')
        .addEventListener('click', () => { ${publishCall} });
    });
</script>`;
}

function getReactCode(_demoType: DemoType, preFill: any) {
  const publishCall = preFill
    ? `widget.current?.publish(${JSON.stringify(preFill, null, 2)})`
    : `widget.current?.publish()`;

  return `import { useEffect, useRef } from 'react';
import { init } from '@palactix/publisher-widget';

export function PublishButton() {
  const widget = useRef(null);

  useEffect(() => {
    fetch('/api/publisher-token')
      .then(r => r.json())
      .then(({ token }) => { widget.current = init({ token }); });
    return () => widget.current?.destroy();
  }, []);

  return (
    <button onClick={() => ${publishCall}}>
      Publish Post
    </button>
  );
}`;
}

function getVueCode(_demoType: DemoType, preFill: any) {
  const publishCall = preFill
    ? `widget.value?.publish(${JSON.stringify(preFill, null, 2)})`
    : `widget.value?.publish()`;

  return `<template>
  <button @click="${publishCall}">Publish Post</button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { init } from '@palactix/publisher-widget';

const widget = ref(null);

onMounted(async () => {
  const { token } = await fetch('/api/publisher-token').then(r => r.json());
  widget.value = init({ token });
});

onUnmounted(() => widget.value?.destroy());
</script>`;
}

function getNodeBackendCode() {
  return `// Node.js / Express backend
app.get('/api/publisher-token', async (req, res) => {
  const basic = Buffer.from(
    \`\${process.env.WIDGET_ID}:\${process.env.WIDGET_SECRET}\`
  ).toString('base64');

  const response = await fetch('https://api.palactix.com/widget/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Basic \${basic}\`,
    },
    body: JSON.stringify({
      external_user_id: req.user.id, // Your user's ID
      ttl: 300, // Token valid for 5 minutes
    }),
  });

  const { init_token } = await response.json();
  res.json({ token: init_token });
});`;
}

function getPHPBackendCode() {
  return `<?php
// PHP backend
$basic = base64_encode(getenv('WIDGET_ID') . ':' . getenv('WIDGET_SECRET'));

$ctx = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => implode("\\r\\n", [
            'Content-Type: application/json',
            'Authorization: Basic ' . $basic,
        ]),
        'content' => json_encode([
            'external_user_id' => $userId,
            'ttl' => 300,
        ]),
        'ignore_errors' => true,
    ],
]);

$data = json_decode(
    file_get_contents('https://api.palactix.com/widget/tokens', false, $ctx),
    true
);

$initToken = $data['init_token'];
echo json_encode(['token' => $initToken]);`;
}

function getPythonBackendCode() {
  return `# Python backend (Flask/Django)
import os, base64, requests

credentials = base64.b64encode(
    f"{os.environ['WIDGET_ID']}:{os.environ['WIDGET_SECRET']}".encode()
).decode()

response = requests.post(
    'https://api.palactix.com/widget/tokens',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Basic {credentials}',
    },
    json={
        'external_user_id': user_id,
        'ttl': 300,
    },
)

init_token = response.json()['init_token']
return {'token': init_token}`;
}

async function fetchDemoToken(): Promise<string> {
  return 'DEMO_TOKEN_' + Math.random().toString(36).substring(7);
}
