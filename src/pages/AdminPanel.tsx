import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  FolderKanban,
  User,
  ArrowLeft,
  Inbox
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, FormSubmission } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      console.error('Erro ao buscar envios:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os envios do formulário.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getProjectTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'site-institucional': 'Site Institucional',
      'landing-page': 'Landing Page',
      'portfolio': 'Portfólio',
      'ecommerce': 'E-commerce',
      'outro': 'Outro'
    };
    return labels[type] || type;
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao site
              </a>
              <div className="h-6 w-px bg-border/50" />
              <h1 className="font-display text-xl font-bold text-foreground">
                Painel Administrativo
              </h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Envios</p>
                <p className="text-2xl font-bold text-foreground">{submissions.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-bold text-foreground">
                  {submissions.filter(s => {
                    const today = new Date().toDateString();
                    const subDate = new Date(s.created_at).toDateString();
                    return today === subDate;
                  }).length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Administrador</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h2 className="font-display text-xl font-bold text-foreground">
              Envios do Formulário
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Todas as solicitações de orçamento recebidas
            </p>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando envios...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center">
              <Inbox className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum envio ainda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tipo de Projeto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {submissions.map((submission, index) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{submission.name}</p>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {submission.phone ? (
                            <>
                              <Phone className="w-4 h-4" />
                              {submission.phone}
                            </>
                          ) : (
                            <span className="text-muted-foreground/50">Não informado</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          <FolderKanban className="w-3 h-3" />
                          {getProjectTypeLabel(submission.project_type)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(submission.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Ver Mensagem
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>

      {/* Modal de Detalhes */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedSubmission(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  Detalhes do Envio
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedSubmission.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Nome do Cliente
                </label>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                  <User className="w-5 h-5 text-primary" />
                  <p className="text-foreground">{selectedSubmission.name}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    E-mail
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                    <Mail className="w-5 h-5 text-primary" />
                    <p className="text-foreground break-all">{selectedSubmission.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Telefone
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                    <Phone className="w-5 h-5 text-primary" />
                    <p className="text-foreground">
                      {selectedSubmission.phone || 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Tipo de Projeto
                </label>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                  <FolderKanban className="w-5 h-5 text-primary" />
                  <p className="text-foreground">
                    {getProjectTypeLabel(selectedSubmission.project_type)}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Mensagem
                </label>
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex gap-3">
                    <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="flex-1 btn-primary text-center"
                >
                  <Mail className="w-4 h-4 mr-2 inline" />
                  Responder por E-mail
                </a>
                {selectedSubmission.phone && (
                  <a
                    href={`https://wa.me/${selectedSubmission.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary text-center"
                  >
                    <Phone className="w-4 h-4 mr-2 inline" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
