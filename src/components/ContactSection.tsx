import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase, isConfigured } from "@/lib/supabase";


export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isConfigured) {
      toast({
        title: "Sistema em Manutenção",
        description: "O formulário não pôde ser enviado pois o sistema não está conectado ao banco de dados. Por favor, entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting lead:", formData);
      const { data, error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        message: formData.message,
        status: 'new',
      }).select();

      if (error) {
        console.error('Supabase INSERT Error:', error);
        throw error;
      }

      console.log("Lead submitted successfully:", data);

      toast({
        title: "Mensagem enviada!",
        description: "Nossa equipe entrará em contato em breve. Obrigado pelo interesse!",
      });

      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    } catch (error: any) {
      console.error('CRITICAL: Error submitting form:', error);

      // Determine if it's a network error or API error
      let errorMessage = "Erro desconhecido";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error_description) {
        errorMessage = error.error_description;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      // Translate common Supabase errors
      if (errorMessage.includes("row-level security")) {
        errorMessage = "Erro de permissão (RLS). Contate o administrador.";
      } else if (errorMessage.includes("violates not-null constraint")) {
        errorMessage = "Campos obrigatórios faltando.";
      }

      toast({
        title: "Erro ao enviar mensagem",
        description: `Não foi possível salvar seu contato. Detalhes: ${errorMessage}. Por favor, nos chame no WhatsApp.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contato" className="py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
            Contato
          </span>
          <h2 className="section-title mb-4 text-3xl lg:text-4xl">
            Vamos criar seu <span className="text-gradient">projeto</span>?
          </h2>
          <p className="section-subtitle mx-auto text-base max-w-xl">
            Preencha o formulário e nossa equipe entrará em contato rapidamente.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="mb-2">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Fale com a EMT.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atendimento pessoal e ágil para orientar seu projeto.
              </p>
            </div>

            <div className="grid gap-3">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-card/40 border border-border/40 hover:bg-card/60 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium leading-none mb-1.5">E-mail</span>
                  <a className="text-[15px] font-medium text-foreground leading-none hover:text-primary transition-colors">
                    agenciaemt@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone 1 Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-card/40 border border-border/40 hover:bg-card/60 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium leading-none mb-1.5">Telefone</span>
                  <a href="tel:+5519989172489" className="text-[14px] font-medium text-foreground leading-none hover:text-primary transition-colors mb-1">
                    (19) 98917-2489
                  </a>

                  <span className="text-[12px] text-muted-foreground/80 leading-none">
                    Eduardo Bengochea
                  </span>
                </div>
              </div>

              {/* Phone 2 Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-card/40 border border-border/40 hover:bg-card/60 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium leading-none mb-1.5">Telefone</span>
                  <a href="tel:+556281444285" className="text-[14px] font-medium text-foreground leading-none hover:text-primary transition-colors mb-1">
                    (62) 8144-4285
                  </a>
                  <span className="text-[12px] text-muted-foreground/80 leading-none">
                    Gabriel Teles
                  </span>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-card/40 border border-border/40 hover:bg-card/60 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium leading-none mb-1.5">WhatsApp</span>
        
                  <span className="text-[14px] text-muted-foreground/80 leading-none">
                    Resposta em até 2h
                  </span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {["Orçamento gratuito", "Sem compromisso", "Resposta rápida"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  {badge}
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/5519989172489"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary flex items-center justify-center mt-4 text-center py-2.5 rounded-lg font-medium text-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
            >
              Entre em contato pelo nosso WhatsApp!
              <MessageCircle className="ml-2 w-4 h-4" />
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-5 sm:p-6 lg:p-7 h-full flex flex-col justify-center">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1.5 ml-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5 ml-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-1.5 ml-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-xs font-medium text-foreground mb-1.5 ml-1">
                    Tipo de Projeto *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-md bg-zinc-950/50 border border-zinc-800/50 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all [&>option]:bg-zinc-950 [&>option]:text-zinc-100"
                  >
                    <option value="">Selecione...</option>
                    <option value="site-institucional">Site Institucional</option>
                    <option value="landing-page">Landing Page</option>
                    <option value="portfolio">Portfólio</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1.5 ml-1">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-md bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  placeholder="Conte um pouco sobre seu projeto..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 text-sm font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Solicitar Orçamento
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
