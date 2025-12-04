import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">M</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              ME <span className="text-primary">Works</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <a
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-secondary text-foreground border border-border hover:border-primary/50 transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </a>
            )}
            <a
              href="#contato"
              className="inline-flex btn-primary text-sm px-6 py-3"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {user && (
                <a
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-secondary text-foreground border border-border hover:border-primary/50 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Painel Admin
                </a>
              )}
              <a
                href="#contato"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Solicitar Orçamento
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
