import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GivebutterButton from "@/components/GivebutterButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Is the current page the homepage where the hero is blue?
  const isHome = location === "/";
  const headerBgClass = isScrolled || !isHome ? "bg-white shadow-sm" : "bg-transparent";
  const textColorClass = isScrolled || !isHome ? "text-foreground" : "text-white";
  const logoInvert = isScrolled || !isHome ? false : true;

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", headerBgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/logo.png"
              alt="Go Ukraina"
              className={cn("h-10 w-auto transition-all duration-300", logoInvert && "brightness-0 invert")}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              About
            </Link>
            
            <div className="relative group">
              <button className={cn("flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
                Our Work <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full -left-4 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-xl border border-border p-2 flex flex-col gap-1">
                  <Link href="/initiatives/reh2o" className="px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors font-medium">ReH2O Clean Water</Link>
                  <Link href="/initiatives/power-generators" className="px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors font-medium">Power Generators</Link>
                  <Link href="/initiatives/advocacy" className="px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors font-medium">Advocacy</Link>
                  <Link href="/initiatives/ukraine-dreamzzz" className="px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors font-medium">Ukraine Dreamzzz</Link>
                </div>
              </div>
            </div>

            <a href="https://ursummit.com" target="_blank" rel="noopener noreferrer" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Summit
            </a>
            <Link href="/impact" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Impact
            </Link>
            <Link href="/blog" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Blog
            </Link>
            <Link href="/events" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Events
            </Link>
            <Link href="/donate" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Donate
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className={cn("text-sm font-semibold hover:opacity-80 transition-opacity", textColorClass)}>
              Contact
            </Link>
            <GivebutterButton />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn("md:hidden p-2 -mr-2", textColorClass)}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-border shadow-xl px-4 py-6 flex flex-col gap-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          <Link href="/about" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">About</Link>
          <div className="py-2 border-b border-border/50">
            <span className="text-lg font-semibold text-foreground mb-2 block">Our Work</span>
            <div className="flex flex-col pl-4 gap-3 border-l-2 border-primary/20 ml-2 mt-2">
              <Link href="/initiatives/reh2o" className="text-base text-muted-foreground font-medium">ReH2O Clean Water</Link>
              <Link href="/initiatives/power-generators" className="text-base text-muted-foreground font-medium">Power Generators</Link>
              <Link href="/initiatives/advocacy" className="text-base text-muted-foreground font-medium">Advocacy</Link>
              <Link href="/initiatives/ukraine-dreamzzz" className="text-base text-muted-foreground font-medium">Ukraine Dreamzzz</Link>
            </div>
          </div>
          <a href="https://ursummit.com" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">Summit</a>
          <Link href="/impact" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">Impact</Link>
          <Link href="/blog" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">Blog</Link>
          <Link href="/events" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">Events</Link>
          <Link href="/donate" className="text-lg font-semibold text-foreground py-2 border-b border-border/50">Donate</Link>
          <Link href="/contact" className="text-lg font-semibold text-foreground py-2">Contact</Link>
          <div className="pt-4 flex justify-center">
            <GivebutterButton />
          </div>
        </div>
      )}
    </header>
  );
}
