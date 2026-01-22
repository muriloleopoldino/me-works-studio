import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, MessageCircle, Zap, Shield, Clock, Target, TrendingUp } from "lucide-react";

const teamMembers = [
  {
    name: "Eduardo",
    role: "Comercial & Atendimento",
    description: "Cuida das vendas, atendimento ao cliente e estratégia. Comunicação clara e foco total no seu sucesso.",
    icon: MessageCircle,
  },
  {
    name: "Murilo",
    role: "Desenvolvedor",
    description: "Responsável por toda a parte técnica e criação dos sites. Código limpo, performance otimizada e design impecável.",
    icon: Code2,
  },
  {
    name: "Telles",
    role: "Marketing e Vendas",
    description: "Estratégia de crescimento, aquisição de clientes e posicionamento da agência.",
    icon: TrendingUp,
  },
];

const highlights = [
  { icon: Zap, label: "Sites rápidos e responsivos" },
  { icon: Shield, label: "Processo transparente" },
  { icon: Clock, label: "Atendimento ágil" },
  { icon: Target, label: "Foco em resultados" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Quem Somos
          </span>
          <h2 className="section-title">
            Um <span className="text-gradient">time completo</span> para seu projeto
          </h2>
          <p className="section-subtitle">
            Combinamos desenvolvimento técnico de alta qualidade com estratégias de marketing e vendas para impulsionar seu negócio.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 group"
            >
              <div className="flex flex-col gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <member.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <span className="text-primary text-sm font-medium block mb-3">{member.role}</span>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
            >
              <item.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm text-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
