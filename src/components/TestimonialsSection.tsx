import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Silva",
    role: "CEO, TechStart",
<<<<<<< HEAD
    content: "A EMT Tech superou todas as expectativas. O site ficou incrível e o atendimento do Eduardo foi impecável do início ao fim.",
=======
    content: "A ME Works superou todas as expectativas. O site ficou incrível e o atendimento do Eduardo foi impecável do início ao fim.",
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Carla Mendes",
    role: "Fundadora, Studio CM",
    content: "Profissionalismo de alto nível. O Murilo entregou exatamente o que eu precisava e o processo foi muito tranquilo.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Felipe Santos",
    role: "Diretor, Imobiliária FS",
<<<<<<< HEAD
    content: "Nosso novo site aumentou significativamente os contatos qualificados. O time da EMT Tech realmente entende de conversão.",
=======
    content: "Nosso novo site aumentou significativamente os contatos qualificados. A dupla ME Works realmente entende de conversão.",
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Ana Paula Costa",
    role: "Proprietária, Boutique AC",
<<<<<<< HEAD
    content: "Design moderno, entrega rápida e suporte excelente. Recomendo a EMT Tech para qualquer negócio que precisa de presença online.",
=======
    content: "Design moderno, entrega rápida e suporte excelente. Recomendo a ME Works para qualquer negócio que precisa de presença online.",
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="section-title mb-6">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="section-subtitle mx-auto">
<<<<<<< HEAD
            Feedback real de quem já trabalhou conosco e
=======
            Feedback real de quem já trabalhou conosco e 
>>>>>>> 883d48aac344b485276d4d873be5e60db936ddf8
            transformou sua presença digital.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="h-full glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 relative">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/90 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-display font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
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
