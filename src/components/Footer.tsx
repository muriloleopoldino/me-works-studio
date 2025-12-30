import { Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
              <img
                src="/emt-logo.png"
                alt="Logo EMT Tech"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              EMT <span className="text-primary">Tech</span>
=======
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">M</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              ME <span className="text-primary">Works</span>
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
<<<<<<< HEAD
              href="mailto:contato@emttech.com.br"
=======
              href="mailto:contato@meworks.com.br"
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="E-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
<<<<<<< HEAD
            © {currentYear} EMT Tech. Todos os direitos reservados.
=======
            © {currentYear} ME Works. Todos os direitos reservados.
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </p>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60">
<<<<<<< HEAD
            EMT Tech - Tecnologia, Marketing e Vendas
=======
            Desenvolvido com dedicação por Murilo & Eduardo
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </p>
        </div>
      </div>
    </footer>
  );
};
