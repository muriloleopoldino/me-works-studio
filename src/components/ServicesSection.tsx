import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Palette,
  Smartphone,
  Users,
  Rocket,
  ArrowUpRight,
  BarChart,
  Bot
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Desenvolvimento Web & Tech",
    description: "Sites institucionais, plataformas e sistemas sob medida com tecnologia de ponta.",
  },
  {
    icon: BarChart,
    title: "Marketing Digital",
    description: "Estratégias de tráfego, SEO e posicionamento para atrair o público certo.",
  },
  {
    icon: Users,
    title: "Consultoria de Vendas",
    description: "Otimização de processos comerciais, CRM e treinamento para fechar mais negócios.",
  },
  {
    icon: Palette,
    title: "Design & Branding",
    description: "Identidade visual marcante e interfaces intuitivas que transmitem profissionalismo.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "Páginas de alta conversão focadas em transformar visitantes em clientes.",
  },
  {
    icon: Bot,
    title: "Automação & Growth",
    description: "Ferramentas e automações para escalar sua operação de forma eficiente.",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Accents */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="section-title">
            O que a EMT Tech <span className="text-gradient">oferece</span>
          </h2>
          <p className="section-subtitle">
            Soluções completas integrando Tecnologia, Marketing e Vendas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {service.description}
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
