import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
<<<<<<< HEAD

      {/* Grid Pattern */}
      <div
=======
      
      {/* Grid Pattern */}
      <div 
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-primary rounded-full animate-float" />
      <div className="absolute top-1/3 right-[20%] w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 bg-primary/80 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
<<<<<<< HEAD
            <span className="text-sm text-muted-foreground">Tecnologia, Marketing e Vendas</span>
=======
            <span className="text-sm text-muted-foreground">Sites profissionais e modernos</span>
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
<<<<<<< HEAD
            <span className="text-foreground">EMT</span>{" "}
            <span className="text-gradient">Tech</span>
=======
            <span className="text-foreground">ME</span>{" "}
            <span className="text-gradient">Works</span>
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto"
          >
<<<<<<< HEAD
            Impulsione seu negócio com Tecnologia e Estratégia
=======
            Criamos Sites Profissionais e Modernos
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
          >
<<<<<<< HEAD
            Desenvolvimento, Marketing e Vendas integrados para escalar sua empresa.
=======
            Desenvolvimento impecável por <span className="text-primary font-medium">Murilo</span> + 
            Atendimento e estratégia comercial por <span className="text-primary font-medium">Eduardo</span>
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contato" className="btn-primary group">
              Solicitar Orçamento
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#portfolio" className="btn-secondary">
              Ver Portfólio
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
<<<<<<< HEAD
              { number: "+50", label: "Projetos Entregues" },
              { number: "100%", label: "Clientes Satisfeitos" },
              { number: "1 ano", label: "de Experiência" },
=======
              { number: "50+", label: "Projetos Entregues" },
              { number: "100%", label: "Clientes Satisfeitos" },
              { number: "3 anos", label: "de Experiência" },
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
              { number: "24h", label: "Resposta Rápida" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};
