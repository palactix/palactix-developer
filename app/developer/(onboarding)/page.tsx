import Link from 'next/link';
import { ShieldCheck, Briefcase, Network, ArrowRight, Check, X, Code, Copy } from 'lucide-react';
import { Bot, Zap, Building2 } from 'lucide-react';
import { PlatformsSection } from '@/components/home/PlatformsSection';
import { Logo } from '@/shared/Logo';

function PublishCurlExample() {
  //const [copied, setCopied] = useState(false)

  const codeString = `curl -X POST https://api.palactix.com/v1/post/publish \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_ids": [
      "019ce4b8-57d1-70a6-b0dd-79c6fb99d2d9",
      "019d29ae-a76b-73e5-9480-2831d0e871cb"
    ],
    "content": "Hello world from Palactix!"
  }'

// Publishes to 2 accounts with one API call`

  // const handleCopy = async () => {
  //   await navigator.clipboard.writeText(codeString)
  //   setCopied(true)

  //   setTimeout(() => {
  //     setCopied(false)
  //   }, 2000)
  // }

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">

        {/* Mac-style dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>

        {/* Endpoint Label */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Code size={14} />
          POST /v1/post/publish
        </div>

        {/* Copy Button */}
        {/* <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border bg-background hover:bg-muted transition"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button> */}

      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed">

        <pre className="whitespace-pre">
          <code>{codeString}</code>
        </pre>

      </div>

    </div>
  )
}


export default function DeveloperLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navigation / Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          {/* 2D Flat Graphic Logo */}
          {/* <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-xl">P</span>
          </div> */}
          <Logo />
          <span className="text-xl font-bold tracking-tight">Palactix</span>
        </div>
        <nav>
          <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6">
        {/* 1. Hero Section */}
        <section className="py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start gap-8">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Unified Social Media API. <br/>
              <span className="text-primary">Bring Your Own OAuth.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              One REST API to publish across Meta, LinkedIn, TikTok, X, and Youtube. You own the App IDs and the tokens.
            </p>
            
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/developer/signup" 
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-sm"
                >
                  Generate API Key
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/docs" 
                  className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-sm"
                >
                  Read Docs
                </Link>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-2">
                Built for agencies, automation platforms, and developer tools
              </span>
            </div>
          </div>

          {/* Code Window */}
         {/* Code Window - FIXED VERSION */}
         <PublishCurlExample />
          
        </section>

       
        <PlatformsSection />

        {/* 2. Architecture Section (Sovereign Infrastructure) */}
        {/* Architecture Section */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Built for Control & Portability
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              API-first architecture where you own the OAuth credentials and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-2xl hover:bg-accent/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct OAuth Ownership</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tokens belong to your OAuth apps, not ours. Clients authorize you directly. Full control over credentials.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-2xl hover:bg-accent/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">White-Label Authorization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clients see your app name on consent screens. Build your brand without third-party interference.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-2xl hover:bg-accent/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <Network size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Token Portability</h3>
              <p className="text-muted-foreground leading-relaxed">
                OAuth tokens are portable. Switch tools anytime without reconnecting accounts. Zero vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section - NEW */}
       <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Built For Modern Platforms
            </h2>
            <p className="text-muted-foreground text-lg">
              One API. Infinite use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Content Platforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Generate content with AI, publish directly to social platforms. No manual posting needed.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Marketing Automation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Add social publishing to your automation platform without building 6 separate integrations.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Agency Tools</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                White-label social scheduling for your clients. Your brand, your infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* 3. Comparison Table */}
        <section className="py-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Why Infrastructure Matters.</h2>
            <p className="text-muted-foreground text-lg">Compare how Palactix sets a new standard for integration.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-6 text-sm uppercase tracking-wider text-muted-foreground font-semibold w-1/3">Feature</th>
                  <th className="p-6 text-sm uppercase tracking-wider text-muted-foreground font-semibold w-1/3">Standard SaaS Tools</th>
                  <th className="p-6 text-sm uppercase tracking-wider text-primary font-bold w-1/3 text-lg">Palactix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-6 text-foreground font-medium">OAuth App Ownership</td>
                  <td className="p-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-500"/> Vendor&apos;s Apps
                    </div>
                  </td>
                  <td className="p-6 text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600"/> Your Apps
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td className="p-6 text-foreground font-medium">Token Portability</td>
                  <td className="p-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-500"/> Vendor Lock-in
                    </div>
                  </td>
                  <td className="p-6 text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600"/> Fully Portable
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td className="p-6 text-foreground font-medium">Consent Screen</td>
                  <td className="p-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-500"/> Shows Vendor Name
                    </div>
                  </td>
                  <td className="p-6 text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600"/> Shows Your Brand
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td className="p-6 text-foreground font-medium">API Access</td>
                  <td className="p-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-500"/> Add-on Feature
                    </div>
                  </td>
                  <td className="p-6 text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-600"/> Core Product
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


          {/* Quick Start Section - Replace Pricing */}
        <section className="py-24 ">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Four steps to your first published post
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="bg-card border border-border p-6 rounded-xl pt-8">
                  <h3 className="font-bold text-lg mb-3">Create Developer App</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up and create your first app. Get your API credentials instantly.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded mt-3 block">
                    app_abc123xyz
                  </code>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="bg-card border border-border p-6 rounded-xl pt-8">
                  <h3 className="font-bold text-lg mb-3">Add Platform Credentials</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your Meta, LinkedIn, TikTok OAuth apps in the dashboard.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      Meta
                    </div>
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      LI
                    </div>
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">
                      TT
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="bg-card border border-border p-6 rounded-xl pt-8">
                  <h3 className="font-bold text-lg mb-3">Connect Accounts</h3>
                  <p className="text-sm text-muted-foreground">
                    Authorize social accounts using your OAuth apps.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded mt-3 block">
                    POST /v1/accounts/connect
                  </code>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="bg-card border border-border p-6 rounded-xl pt-8">
                  <h3 className="font-bold text-lg mb-3">Publish Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Send your first publish request via the unified API.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded mt-3 block">
                    POST /v1/publish
                  </code>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/docs/getting-started/quick-start" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
              >
                View Complete Quickstart Guide
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Final CTA */}
        <section className="py-32 relative overflow-hidden rounded-3xl mb-24 border border-border bg-card shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-8">
              Start building on your <br className="hidden sm:block" /> own terms.
            </h2>
            <Link 
              href="/developer/signup" 
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-10 py-5 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Generate API Key
              <ArrowRight size={20} />
            </Link>

            <div className="text-sm text-muted-foreground mt-6">
            Pay-as-you-go pricing • No subscriptions • Free tier available
            <Link href="/docs/getting-started/pricing" className="text-primary hover:underline ml-2">
              View Pricing →
            </Link>
          </div>

          </div>
        </section>

        
      </main>
    </div>
  );
}
