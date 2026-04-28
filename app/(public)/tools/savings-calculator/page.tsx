import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { FAQs } from "@/components/shared/FAQs";
import {
  AgencyExampleCard,
  BenefitGridItem,
  AnimatedSection,
  CTAButton,
} from "@/components/tools/SavingsCalculatorClientSections";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Media Savings Calculator for Agencies | Palactix",
  description:
    "Calculate how much your agency can save by switching from per-seat social media tools to flat infrastructure pricing. Compare monthly and annual costs instantly.",
  alternates: {
    canonical: "https://palactix.com/tools/savings-calculator",
  },
  openGraph: {
    title: "Social Media Savings Calculator for Agencies | Palactix",
    description:
      "Estimate your agency's monthly and yearly savings when switching from per-seat pricing to flat infrastructure tools.",
    url: "https://palactix.com/tools/savings-calculator",
    siteName: "Palactix",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Social Media Savings Calculator for Agencies | Palactix",
    description:
      "Compare per-seat vs flat pricing and calculate how much your agency can save each month and year.",
  },
};

const faqs = [
  {
    question: "Are these pricing numbers accurate?",
    answer:
      "Yes. We use publicly available pricing from Hootsuite, Buffer, Sprout Social, and other major tools. Pricing is current as of 2026. For the most accurate comparison, we recommend checking your actual invoice and comparing against your calculated results.",
  },
  {
    question: "Why do some tools cost more than the calculator shows?",
    answer:
      "The calculator uses standard per-seat pricing. Some tools have platform-specific add-ons (X/Twitter publishing fees), higher tiers for analytics or reporting, and enterprise features with custom pricing. If your actual bill is higher than shown, the savings may be even larger.",
  },
  {
    question: "Does Palactix pricing really stay flat as I grow?",
    answer:
      "Yes. Starter ($199/mo): 5 team seats, unlimited clients. Pro ($799/mo): unlimited team seats, unlimited clients. Add 10 new clients — your bill stays the same. Add 5 new team members on the Pro plan — your bill stays the same. Growth increases profit, not software costs.",
  },
  {
    question: "What's not included in Palactix pricing?",
    answer:
      "Platform API fees. Most social platforms (Instagram, Facebook, LinkedIn, TikTok, YouTube) provide API access at no cost. X/Twitter requires a developer subscription (~$200/month paid directly to X). We never mark up platform fees — you pay platforms directly.",
  },
  {
    question: "Can I see a detailed breakdown of my costs?",
    answer:
      "Yes. During your 14-day trial, we'll provide a line-by-line cost comparison, your actual current tool invoice analysis, projected 12-month savings, and ROI calculation. Start your trial to get a personalized breakdown.",
  },
  {
    question: "What if my team is smaller than 5 people?",
    answer:
      "Palactix Starter includes 5 seats. If you're a solo freelancer or 2–3 person team, you might find per-seat tools cheaper initially. The calculator helps you see the crossover point where flat pricing becomes more economical.",
  },
  {
    question: "How does this compare to free plans?",
    answer:
      "Free plans typically limit the number of social accounts (usually 3–5), scheduled posts, team members (1 user), and platform support. If you manage multiple clients or need team collaboration, free plans aren't viable at scale. The calculator compares paid plans used by professional agencies.",
  },
  {
    question: "Can I share this calculator with clients?",
    answer:
      "Yes. The calculator page is public. Many agencies use it to show clients the infrastructure cost overhead they're covering. Some agencies include calculator results in proposals to justify pricing increases.",
  },
];

const agencyExamples = [
  {
    title: "5-Person Agency",
    subtitle: "Managing 15 client brands",
    traditionalCost: "$995",
    palactixCost: "$199",
    annualSavings: "$9,552/year",
    quote:
      "The calculator showed us we were paying $800/month more than we needed to.",
  },
  {
    title: "10-Person Agency",
    subtitle: "Managing 30 client brands",
    traditionalCost: "$1,990",
    palactixCost: "$799",
    annualSavings: "$14,292/year",
    quote:
      "Flat pricing meant we could hire 2 more team members without increasing software costs.",
  },
  {
    title: "20-Person Agency",
    subtitle: "Managing 50+ client brands",
    traditionalCost: "$3,980",
    palactixCost: "$799",
    annualSavings: "$38,172/year",
    quote:
      "The savings paid for an entire junior account manager's salary.",
  },
];

const benefitItems = [
  {
    iconName: "key" as const,
    headline: "Infrastructure Ownership",
    body: "You own the OAuth apps. Your clients authorize your brand, not a vendor's. If you switch tools, connections stay yours.",
  },
  {
    iconName: "zap" as const,
    headline: "Isolated Rate Limits",
    body: "Your API quotas are yours. Platform rate limits affecting other customers don't cascade to you.",
  },
  {
    iconName: "dashboard" as const,
    headline: "Client Portal Access",
    body: "Clients log in and see their own content. No more screenshot emails or reporting overhead.",
  },
  {
    iconName: "unlink" as const,
    headline: "No Vendor Lock-In",
    body: "Your OAuth tokens belong to you. Switching infrastructure providers never requires client reconnections.",
  },
];

const relatedResources = [
  {
    title: "Why Per-Seat Pricing Fails Agencies",
    description:
      "How traditional pricing models create a success tax on agency growth.",
    cta: "Read Article",
    href: "/blog/the-success-tax-why-per-seat-saas-penalizes-agency-growth",
  },
  {
    title: "The Real Cost of Vendor Lock-In",
    description: "What agencies lose beyond monthly subscription fees.",
    cta: "Read Article",
    href: "/blog/data-sovereignty-why-agencies-lose-control",
  },
  {
    title: "Migration Checklist",
    description: "How to switch tools without disrupting client publishing.",
    cta: "View Checklist",
    href: "/blog/10-minute-migration-moving-clients-without-reconnect-chaos",
  },
];

export default function SavingsCalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* ── Section 1: Hero ── */}
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-[100px] rounded-full opacity-40" />
        </div>
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">
                Free Calculator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Social Media Agency Savings Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              See how much per-seat pricing is costing your agency.
              <br className="hidden md:block" />
              Compare your current tool vs flat infrastructure in real-time.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Used by 1,000+ social media accounts &bull; Zero platform bans since launch
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Section 2: Calculator ── */}
      <section className="py-4 px-6">
        <ComparisonTable />
      </section>

      {/* ── Section 3: How to Use ── */}
      <section className="py-20 px-6 bg-muted/40">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Instructions */}
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">How to Use This Calculator</h2>
              <ol className="space-y-6">
                {[
                  {
                    n: 1,
                    title: "Set your team size",
                    body: "Use the +/– controls to show how many employees manage content for your agency.",
                  },
                  {
                    n: 2,
                    title: "Set your client count",
                    body: "Enter how many brands or client accounts you currently manage.",
                  },
                  {
                    n: 3,
                    title: "Select platforms",
                    body: 'Toggle "Publishing to X?" if you publish to X/Twitter — it requires a separate developer subscription.',
                  },
                  {
                    n: 4,
                    title: "See your savings",
                    body: "The calculator shows your current cost vs Palactix, plus your monthly and annual savings.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {step.n}
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            {/* Right: What we compare */}
            <AnimatedSection delay={0.1}>
              <h3 className="text-2xl font-bold mb-6">What This Calculator Shows</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Per-seat pricing from traditional tools (Hootsuite, Buffer, Sprout Social)",
                  "Palactix flat infrastructure pricing",
                  "Monthly cost comparison",
                  "Annual savings estimate",
                  "Cost per client (hidden overhead)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs italic text-muted-foreground">
                Pricing data based on publicly available rates from major social media tools as of 2026.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Section 4: Why This Matters ── */}
      <section className="py-20 px-6">
        <Container>
          <AnimatedSection className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Agencies Are Switching to Flat Pricing
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Traditional social media tools charge per seat.</p>
              <p>That means:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">→</span>
                  Add 5 team members &rarr; pay $500+ more per month
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">→</span>
                  Grow from 10 to 20 clients &rarr; move to a higher tier
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">→</span>
                  Success increases your software bill faster than revenue
                </li>
              </ul>
              <p className="text-xl font-bold pt-2">
                The problem isn&rsquo;t the tool. It&rsquo;s the pricing model.
              </p>
              <p>Palactix uses flat infrastructure pricing:</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground mb-1">Starter</p>
                  <p className="text-2xl font-bold mb-1">$199<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-sm">5 seats, unlimited clients</p>
                </div>
                <div className="bg-primary/5 border border-primary/30 rounded-xl p-5">
                  <p className="text-sm text-muted-foreground mb-1">Pro</p>
                  <p className="text-2xl font-bold mb-1 text-primary">$799<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-sm">Unlimited seats, unlimited clients</p>
                </div>
              </div>
              <p>
                Your bill stays the same as you grow.
                <br />
                Every new client increases profit. Not overhead.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Section 5: Real Agency Examples ── */}
      <section className="py-20 px-6 bg-muted/40">
        <Container>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Real-World Savings Examples</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {agencyExamples.map((example, i) => (
              <AgencyExampleCard key={example.title} {...example} delay={i * 0.1} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section 6: What calculator doesn't show ── */}
      <section className="py-20 px-6">
        <Container>
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What the Calculator Doesn&rsquo;t Show
            </h2>
            <p className="text-lg text-muted-foreground">
              The cost savings are just the beginning. Here&rsquo;s what you gain beyond the numbers.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {benefitItems.map((item, i) => (
              <BenefitGridItem key={item.headline} {...item} delay={i * 0.1} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section 7: FAQ ── */}
      <FAQs faqs={faqs} />

      {/* ── Section 8: Final CTA ── */}
      <section className="py-28 px-6">
        <div className="absolute left-0 right-0 h-full -z-10 pointer-events-none overflow-hidden" aria-hidden="true" />
        <Container>
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Stop Paying the Success Tax?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              See your actual savings during a 14-day trial. Full features, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <CTAButton href="/auth/signup">Start 14-Day Trial</CTAButton>
              <CTAButton href="/contact-us" variant="outline">Talk to Our Team</CTAButton>
            </div>
            <ul className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
              {[
                "No credit card required",
                "Guided OAuth setup included",
                "Cancel anytime",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Section 9: Related Resources ── */}
      <section className="py-16 px-6 bg-muted/40 border-t border-border">
        <Container>
          <AnimatedSection className="mb-10">
            <h3 className="text-2xl font-bold">Learn More About Infrastructure Pricing</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((resource, i) => (
              <AnimatedSection key={resource.title} delay={i * 0.08}>
                <Link
                  href={resource.href}
                  className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    {resource.cta} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
