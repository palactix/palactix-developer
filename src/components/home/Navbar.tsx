"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { loginRoute } from "@/features/auth/login";
import { Logo } from "@/shared/Logo";
import { ChevronDown, CalendarDays, Code2, Blocks, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Container className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">Palactix</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Products <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background border border-border rounded-xl shadow-xl p-3 grid gap-2">
              <Link href="/product/white-label-scheduler" className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="bg-primary/10 p-2.5 rounded-md mt-0.5">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">White-label Scheduler</div>
                  <div className="text-xs text-muted-foreground mt-1">A complete social media management app ready for your brand.</div>
                </div>
              </Link>
              <Link href="/product/unified-social-apis" className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="bg-primary/10 p-2.5 rounded-md mt-0.5">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Unified Social APIs</div>
                  <div className="text-xs text-muted-foreground mt-1">One API to publish, fetch, and analyze across all major social networks.</div>
                </div>
              </Link>
              <Link href="/product/publisher-widgets" className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="bg-primary/10 p-2.5 rounded-md mt-0.5">
                  <Blocks className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Publisher Widgets</div>
                  <div className="text-xs text-muted-foreground mt-1">Drop-in scheduling components for your existing SaaS.</div>
                </div>
              </Link>
            </div>
          </div>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href={loginRoute}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            asChild
          >
            <Link href="/auth/signup">Start 14-day Evaluation</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <Container className="py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="flex items-center justify-between text-base font-medium py-2"
              >
                Products <ChevronDown className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileProductsOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l border-border/50 py-2">
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/product/white-label-scheduler" className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">White-label Scheduler</span>
                  </Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/product/unified-social-apis" className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Unified Social APIs</span>
                  </Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/product/publisher-widgets" className="flex items-center gap-3">
                    <Blocks className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Publisher Widgets</span>
                  </Link>
                </div>
              )}
              
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/pricing" className="text-base font-medium py-2">
                Pricing
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/docs" className="text-base font-medium py-2">
                Docs
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href={loginRoute} className="text-base font-medium py-2">
                Login
              </Link>
              <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/signup">Start 14-day Evaluation</Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
