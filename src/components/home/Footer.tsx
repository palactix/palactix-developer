"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Twitter, Github, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Logo } from "@/shared/Logo";

const footerLinks = {
  products: [
    { href: "/product/white-label-scheduler", label: "White-label Scheduler" },
    { href: "/product/unified-social-apis", label: "Unified Social APIs" },
    { href: "/product/publisher-widgets", label: "Publisher Widgets" },
    { href: "/pricing", label: "Pricing" },
  ],
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/developer", label: "API Reference" },
    { href: "/blog", label: "Blog" },
    { href: "/tools/savings-calculator", label: "Savings Calculator" },
    
  ],
  company: [
    { href: "/why-palactix-exists", label: "Why Palactix" },
    { href: "/contact-us", label: "Contact Us" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
};

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="pt-20 border-t border-border bg-background relative overflow-hidden">
      <Container className="relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-16">
        <div className="sm:col-span-2 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
            <Logo />
            <span className="text-xl font-semibold">Palactix</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">
            Agency-grade social media management infrastructure. Bring your own keys, build custom experiences, or use our white-label SaaS directly.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-foreground transition-colors"><Github className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Products</h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.products.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.resources.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Company & Legal</h3>
          <ul className="flex flex-col gap-3">
            {footerLinks.company.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <div className="h-2" />
            {footerLinks.legal.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border mt-16 mb-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Palactix Inc. All rights reserved.
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-accent/50 hover:bg-accent transition-colors"
              aria-label="Select theme"
            >
              {theme === "dark" ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="text-xs font-medium">Dark</span>
                </>
              ) : theme === "system" ? (
                <>
                  <Monitor className="w-4 h-4" />
                  <span className="text-xs font-medium">System</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-medium">Light</span>
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="w-4 h-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </Container>
      <div className="w-full flex justify-center pointer-events-none select-none mt-8">
        <span
          aria-hidden="true"
          className="text-[clamp(120px,16vw,200px)] leading-none font-black tracking-widest text-primary/20 pointer-events-none select-none"
        >
          PALACTIX
        </span>
      </div>
    </footer>
  );
}
