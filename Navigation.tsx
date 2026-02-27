import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "首页", href: "/" },
  { label: "防诈提醒", href: "/fraud-alert" },
  { label: "骗局百科", href: "/scam-encyclopedia" },
  { label: "街头骗局", href: "/street-scams" },
  { label: "电信诈骗", href: "/telecom-fraud" },
  { label: "模拟骗局复盘", href: "/scam-replay" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/40 transition-all duration-300">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-lg font-bold text-gradient-gold hidden sm:inline">
                杜精骗到
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="text-foreground/80 hover:text-accent transition-colors duration-300 cursor-pointer text-sm font-medium relative group">
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/fraud-alert">
              <Button className="btn-gold hidden sm:inline-flex text-sm">
                开始咨询
              </Button>
            </Link>
            <Button variant="outline" className="btn-gold-outline hidden sm:inline-flex text-sm">
              登录
            </Button>
            <Button className="btn-gold text-sm">
              注册
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-border pt-4 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
