import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Layers } from "lucide-react";

const projects = [
  {
    title: "Tech Startup Landing",
    category: "Landing Page",
    description: "Landing page moderna para startup de tecnologia com foco em conversão e captação de leads.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["React", "Animações", "Responsivo"],
  },
  {
    title: "E-commerce Premium",
    category: "Loja Virtual",
    description: "Plataforma completa de e-commerce com design elegante e experiência de compra otimizada.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    tags: ["E-commerce", "Pagamentos", "Dashboard"],
  },
  {
    title: "Portfólio Criativo",
    category: "Site Institucional",
    description: "Site portfólio para agência criativa com animações impactantes e navegação fluida.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    tags: ["Portfolio", "Motion", "Minimalista"],
  },
  {
    title: "Dashboard SaaS",
    category: "Aplicação Web",
    description: "Painel administrativo completo com gráficos, relatórios e gestão de dados em tempo real.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["SaaS", "Analytics", "Dark Mode"],
  },
  {
    title: "Imobiliária Digital",
    category: "Site Institucional",
    description: "Site completo para imobiliária com catálogo de imóveis, filtros avançados e formulários.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    tags: ["Imobiliária", "Filtros", "Responsivo"],
  },
  {
    title: "Blog Corporativo",
    category: "Blog & Conteúdo",
    description: "Plataforma de conteúdo com CMS integrado, SEO otimizado e design editorial moderno.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    tags: ["Blog", "SEO", "CMS"],
  },
];

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-32 relative" ref={ref}>
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
            Portfólio
          </span>
          <h2 className="section-title mb-6">
            Projetos que <span className="text-gradient">entregamos</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Cada projeto é único e desenvolvido com atenção aos detalhes, 
            performance e foco na conversão de resultados.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  
                  {/* Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                      <Layers className="w-3 h-3 text-primary" />
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
