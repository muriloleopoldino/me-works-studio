import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Lead, isConfigured } from '@/lib/supabase';
import {
  LogOut,
  Users,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  MessageSquare,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  Target,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const statusConfig = {
  new: { label: 'Novo', icon: Sparkles, color: 'text-blue-400 bg-blue-400/10' },
  contacted: { label: 'Contatado', icon: Phone, color: 'text-yellow-400 bg-yellow-400/10' },
  qualified: { label: 'Qualificado', icon: Target, color: 'text-green-400 bg-green-400/10' },
  closed: { label: 'Fechado', icon: CheckCircle, color: 'text-gray-400 bg-gray-400/10' },
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    if (!isConfigured || !user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase SELECT Error:', error);
        throw error;
      }

      setLeads(data || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Erro ao carregar leads",
        description: error.message || "Erro desconhecido ao buscar leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId);

    if (error) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status atualizado!",
        description: "O status do lead foi atualizado com sucesso.",
      });
      fetchLeads();
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo.",
    });
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.project_type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <img src="/emt-logo.png" alt="EMT Tech" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">Painel Admin</h1>
                <p className="text-xs text-muted-foreground">EMT Tech</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {!isConfigured && (
          <div className="mb-8 p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-4">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-500 mb-1">Configuração Necessária</h3>
              <p className="text-muted-foreground mb-4">
                O sistema não conseguiu se conectar ao banco de dados. Isso geralmente acontece quando as credenciais do Supabase não foram configuradas.
              </p>
              <div className="p-4 rounded-lg bg-background/50 border border-border text-sm font-mono text-muted-foreground">
                VITE_SUPABASE_URL=sua_url_aqui<br />
                VITE_SUPABASE_ANON_KEY=sua_chave_aqui
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Leads</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Novos</p>
                <p className="text-3xl font-bold text-blue-400">{stats.new}</p>
              </div>
              <Sparkles className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contatados</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.contacted}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Qualificados</p>
                <p className="text-3xl font-bold text-green-400">{stats.qualified}</p>
              </div>
              <Target className="w-10 h-10 text-green-400" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground">Leads Recebidos</h2>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">Todos</option>
                <option value="new">Novos</option>
                <option value="contacted">Contatados</option>
                <option value="qualified">Qualificados</option>
                <option value="closed">Fechados</option>
              </select>

              <button
                onClick={fetchLeads}
                className="p-2 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => {
                const config = statusConfig[lead.status] || statusConfig['new'];
                const StatusIcon = config.icon;
                return (
                  <div
                    key={lead.id}
                    className="p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{lead.name}</h3>
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                            {lead.project_type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                  {selectedLead.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Recebido em {new Date(selectedLead.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Mail className="w-4 h-4" />
                  E-mail
                </div>
                <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline">
                  {selectedLead.email}
                </a>
              </div>

              {selectedLead.phone && (
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </div>
                  <a href={`tel:${selectedLead.phone}`} className="text-primary hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
              )}

              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Target className="w-4 h-4" />
                  Tipo de Projeto
                </div>
                <p className="text-foreground">{selectedLead.project_type}</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Mensagem
                </div>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Status do Lead
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const StatusIcon = config.icon;
                  return (
                    <button
                      key={status}
                      onClick={() => updateLeadStatus(selectedLead.id, status as Lead['status'])}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedLead.status === status
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-medium text-sm">{config.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
