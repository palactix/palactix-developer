"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { loginRoute } from "@/features/auth/login";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Container className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-lg font-semibold">Palactix</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
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
      </Container>
    </nav>
  );
}
