"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { loginRoute } from "@/features/auth/login";
import { Logo } from "@/shared/Logo";
import { ChevronDown, CalendarDays, Code2, Blocks, Menu, X, type LucideIcon } from "lucide-react";

/* ─────────────────────────────────────────
   Nav data — edit here to add/remove items
───────────────────────────────────────── */
type ProductItem = {
  icon: LucideIcon;
  href: string;
  label: string;
  desc: string;
};

type NavLink = {
  href: string;
  label: string;
};

const PRODUCTS: ProductItem[] = [
  {
    icon: CalendarDays,
    href: "/products/white-label-social-media-management",
    label: "White-label Scheduler",
    desc: "A complete social media management app ready for your brand.",
  },
  {
    icon: Code2,
    href: "/products/unified-social-apis",
    label: "Unified Social APIs",
    desc: "One API to publish, fetch, and analyze across all major social networks.",
  },
  {
    icon: Blocks,
    href: "/products/publisher-widgets",
    label: "Publisher Widgets",
    desc: "Drop-in scheduling components for your existing SaaS.",
  },
];

const NAV_LINKS: NavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: loginRoute, label: "Login" },
];

const CTA = { href: "/auth/signup", label: "Start 14-day Evaluation" };

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function ProductDropdownItem({
  item,
  onClick,
}: {
  item: ProductItem;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-primary/30`}
    >
      <div className="bg-primary/10 p-2.5 rounded-md mt-0.5 shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{item.label}</div>
        <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   Navbar
───────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Container className="py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold">Palactix</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Products dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Products{" "}
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background border border-border rounded-xl shadow-xl p-3 grid gap-2">
              {PRODUCTS.map((item) => (
                <ProductDropdownItem key={item.href} item={item} />
              ))}
            </div>
          </div>

          {/* Flat links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
            <Link href={CTA.href}>{CTA.label}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((o) => !o)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <Container className="py-4 flex flex-col gap-4">
            {/* Products accordion */}
            <button
              onClick={() => setIsMobileProductsOpen((o) => !o)}
              className="flex items-center justify-between text-base font-medium py-2"
            >
              Products{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMobileProductsOpen && (
              <div className="flex flex-col gap-3 pl-4 border-l border-border/50 py-2">
                {PRODUCTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3"
                    >
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Flat links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-base font-medium py-2"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA */}
            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
              <Link href={CTA.href} onClick={closeMobile}>
                {CTA.label}
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </nav>
  );
}

