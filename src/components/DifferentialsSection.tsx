import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Zap, Eye, BarChart3, HeartHandshake, CheckCircle2 } from "lucide-react";

const differentials = [
  {
    icon: Users,
    title: "Time Completo",
    description: "Técnico, Marketing e Vendas trabalhando juntos para o melhor resultado.",
  },
  {
    icon: Zap,
    title: "Processo Rápido",
    description: "Sem burocracia. Comunicação direta e entrega eficiente.",
  },
  {
    icon: Eye,
    title: "Visual Moderno",
    description: "Design focado na identidade do seu negócio e tendências atuais.",
  },
  {
    icon: BarChart3,
    title: "Otimizado para Conversão",
    description: "Cada elemento pensado para gerar resultados reais.",
  },
  {
    icon: HeartHandshake,
    title: "Suporte Humanizado",
    description: "Atendimento pessoal e acompanhamento durante todo o projeto.",
  },
  {
    icon: CheckCircle2,
    title: "Qualidade Garantida",
    description: "Código limpo, performance otimizada e melhores práticas.",
  },
];

export const DifferentialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Por que nos escolher
          </span>
          <h2 className="section-title mb-6">
            Nossos <span className="text-gradient">diferenciais</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Descubra por que clientes confiam na EMT Tech para
            transformar suas ideias em sites profissionais.
          </p>
        </motion.div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
