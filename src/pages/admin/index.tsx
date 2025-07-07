// AdminPage.tsx - Versão Completa com Detalhes de Mensagem

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Home, 
  BarChart2, 
  Bell, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  MessageSquare,
  LogOut,
  RefreshCw,
  Trash2,
  Info
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useAdminProtection } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { loading: authLoading, isAdmin } = useAdminProtection();
  const { 
    reservations, 
    loading, 
    error, 
    updateReservationStatus,
    updateReservation,
    getReservationStats,
    contactMessages,
    unreadMessagesCount,
    markMessageAsRead,
    upcomingArrivals: fetchedUpcomingArrivals,
    formatCurrency,
    formatDate,
    fetchReservations,
    deleteReservation,
  } = useAdmin();
  
  const [selectedTab, setSelectedTab] = useState<'reservas' | 'estatisticas' | 'mensagens' | 'configuracoes'>('reservas');
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredReservations, setFilteredReservations] = useState(reservations);
  const [showNewReservationDialog, setShowNewReservationDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Estados para o modal de detalhes da reserva
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  
  // Estados para o diálogo de confirmação de exclusão
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);

  // Estados para edição de reserva
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    guestName: '',
    contactEmail: '',
    contactPhone: '',
    roomName: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    specialRequests: '',
    totalPrice: 0
  });

  // Estados para modal de detalhes da mensagem
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyForm, setReplyForm] = useState({
    subject: '',
    message: ''
  });
  
  const stats = getReservationStats();
  const { toast } = useToast();

  // Função de debug para verificar dados
  const debugReservationData = () => {
    console.log('🔍 DEBUG - Dados da reserva selecionada:', editingReservation);
    console.log('🔍 DEBUG - Dados do formulário:', editForm);
    console.log('🔍 DEBUG - API URL:', import.meta.env.VITE_API_URL || 'http://localhost:3001/api');
  };

  // Função para atualizar manualmente os dados
  const handleRefresh = async () => {
    console.log('[DEBUG] Atualizando manualmente os dados...');
    setIsRefreshing(true);
    
    try {
      if (typeof fetchReservations === 'function') {
        await fetchReservations();
        toast({
          title: "Dados atualizados",
          description: "As informações foram atualizadas com sucesso",
          variant: "default"
        });
      } else {
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar os dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Aplicar filtros nas reservas
  useEffect(() => {
    let filtered = [...reservations];
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(res => res.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(res => 
        res.guestName.toLowerCase().includes(term) || 
        res.id.toLowerCase().includes(term) ||
        res.roomName?.toLowerCase().includes(term)
      );
    }
    
    setFilteredReservations(filtered);
  }, [reservations, searchTerm, statusFilter]);

  // Simular criação de nova reserva
  const handleCreateReservation = () => {
    toast({
      title: "Reserva criada",
      description: "Nova reserva criada com sucesso",
      variant: "default"
    });
    setShowNewReservationDialog(false);
  };

  // Função para marcar mensagem como lida
  const handleMarkAsRead = async (id: number) => {
    try {
      await markMessageAsRead(id);
      toast({
        title: "Mensagem marcada como lida",
        description: "A mensagem foi atualizada com sucesso.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível marcar a mensagem como lida.",
        variant: "destructive"
      });
    }
  };

  // Função para abrir o diálogo de detalhes
  const handleViewDetails = (reservation: any) => {
    setSelectedReservation(reservation);
    setShowDetailsDialog(true);
  };

  // Função para confirmar exclusão de reserva
  const handleDeleteClick = (id: string) => {
    console.log(`Iniciando exclusão da reserva: ${id}`);
    setReservationToDelete(id);
    setShowDeleteDialog(true);
  };

  // Função confirmDelete para usar API
  const confirmDelete = async () => {
    if (!reservationToDelete) {
      console.log("Nenhuma reserva selecionada para exclusão");
      return;
    }
    
    console.log(`Confirmando exclusão da reserva: ${reservationToDelete}`);
    
    try {
      if (typeof deleteReservation === 'function') {
        const success = await deleteReservation(reservationToDelete);
        if (success) {
          setTimeout(() => {
            if (typeof fetchReservations === 'function') {
              fetchReservations();
            }
          }, 500);
        }
      } else {
        // Fallback: remover localmente
        setFilteredReservations(prev => 
          prev.filter(res => res.id !== reservationToDelete)
        );
        
        toast({
          title: "Reserva excluída",
          description: `A reserva #${reservationToDelete} foi excluída com sucesso.`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Erro na exclusão:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a reserva. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setShowDeleteDialog(false);
      setReservationToDelete(null);
    }
  };

  // Função para abrir o diálogo de edição
  const handleEditReservation = (reservation: any) => {
    console.log('🔧 Abrindo edição para reserva:', reservation);
    setEditingReservation(reservation);
    setEditForm({
      guestName: reservation.guestName || '',
      contactEmail: reservation.contactEmail || '',
      contactPhone: reservation.contactPhone || '',
      roomName: reservation.roomName || '',
      checkIn: reservation.checkIn || '',
      checkOut: reservation.checkOut || '',
      adults: reservation.adults || 2,
      children: reservation.children || 0,
      specialRequests: reservation.specialRequests || '',
      totalPrice: reservation.totalPrice || 0
    });
    setShowDetailsDialog(false);
    setShowEditDialog(true);
  };

  // FUNÇÃO CORRIGIDA: Salvar as alterações usando a nova API
  const handleSaveEdit = async () => {
    debugReservationData();
    
    if (!editingReservation) {
      console.log('❌ Nenhuma reserva selecionada para edição');
      return;
    }
    
    try {
      console.log('📝 Salvando edição da reserva:', editingReservation.id);
      console.log('📊 Dados do formulário:', editForm);

      // Validações básicas
      if (!editForm.guestName.trim()) {
        toast({
          title: "Erro de validação",
          description: "Nome do hóspede é obrigatório.",
          variant: "destructive"
        });
        return;
      }

      if (!editForm.contactEmail.trim()) {
        toast({
          title: "Erro de validação", 
          description: "Email de contato é obrigatório.",
          variant: "destructive"
        });
        return;
      }

      // Usar a função updateReservation do hook useAdmin
      await updateReservation(editingReservation.id, {
        guest_name: editForm.guestName.trim(),
        contact_email: editForm.contactEmail.trim(),
        contact_phone: editForm.contactPhone.trim(),
        room_name: editForm.roomName.trim(),
        check_in: editForm.checkIn,
        check_out: editForm.checkOut,
        adults: parseInt(editForm.adults.toString()) || 2,
        children: parseInt(editForm.children.toString()) || 0,
        special_requests: editForm.specialRequests.trim(),
        total_price: parseFloat(editForm.totalPrice.toString()) || 0
      });

      console.log('✅ Reserva atualizada com sucesso via hook');

      // Fechar modal e limpar estados
      setShowEditDialog(false);
      setEditingReservation(null);
      
      // Atualizar a lista de reservas
      if (typeof fetchReservations === 'function') {
        setTimeout(() => {
          fetchReservations();
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Erro ao salvar edição:', error);
      // O toast de erro já é mostrado pela função updateReservation
    }
  };

  // Função para abrir detalhes da mensagem
  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
    
    // Marcar como lida automaticamente quando abrir
    if (!message.is_read) {
      handleMarkAsRead(message.id);
    }
  };

  // Função para abrir modal de resposta
  const handleReplyMessage = (message: any) => {
    setSelectedMessage(message);
    setReplyForm({
      subject: `Re: ${message.subject || 'Sem assunto'}`,
      message: ''
    });
    setShowMessageDialog(false);
    setShowReplyDialog(true);
  };

  // Função para enviar resposta por email
  const handleSendReply = () => {
    if (!selectedMessage || !replyForm.message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma mensagem antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    // Criar link mailto com os dados
    const emailSubject = encodeURIComponent(replyForm.subject);
    const emailBody = encodeURIComponent(replyForm.message);
    const recipientEmail = selectedMessage.email;
    
    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
    
    // Abrir cliente de email
    window.open(mailtoLink);
    
    // Fechar modal e limpar form
    setShowReplyDialog(false);
    setReplyForm({ subject: '', message: '' });
    
    toast({
      title: "Email aberto",
      description: "O cliente de email foi aberto para enviar a resposta.",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {authLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pousada-brown"></div>
        </div>
      ) : !isAdmin ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center py-8">Você será redirecionado para o login...</p>
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex w-64 flex-col bg-pousada-brown text-white">
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-xl font-bold">Recanto MD Olavio</h1>
            </div>
            <div className="flex flex-col flex-grow p-4">
              <button 
                className={`flex items-center py-3 px-4 rounded-lg mb-2 ${selectedTab === 'reservas' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => setSelectedTab('reservas')}
              >
                <Calendar className="mr-3 h-5 w-5" />
                <span>Reservas</span>
              </button>
              <button 
                className={`flex items-center py-3 px-4 rounded-lg mb-2 ${selectedTab === 'estatisticas' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => setSelectedTab('estatisticas')}
              >
                <BarChart2 className="mr-3 h-5 w-5" />
                <span>Estatísticas</span>
              </button>
              <button 
                className={`flex items-center py-3 px-4 rounded-lg mb-2 ${selectedTab === 'mensagens' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => setSelectedTab('mensagens')}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                <span>Mensagens</span>
                {unreadMessagesCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
              <button 
                className={`flex items-center py-3 px-4 rounded-lg mb-2 ${selectedTab === 'configuracoes' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => setSelectedTab('configuracoes')}
              >
                <Home className="mr-3 h-5 w-5" />
                <span>Configurações</span>
              </button>
              <div className="mt-auto">
                <div className="flex items-center p-4">
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Administrador</p>
                    <p className="text-sm opacity-70">admin@pousada.com</p>
                  </div>
                </div>
                {/* Botão de logout na sidebar */}
                <button 
                  className="flex items-center w-full py-3 px-4 text-white hover:bg-white/10 rounded-lg"
                  onClick={logout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top navigation */}
            <header className="bg-white shadow-sm h-16 flex items-center px-6">
              <div className="md:hidden mr-4">
                <button className="text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <h1 className="text-2xl font-serif font-bold text-pousada-brown md:hidden">
                Painel Admin
              </h1>
              <div className="flex-1 flex justify-end items-center space-x-4">
                <div className="relative">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Bell className="h-6 w-6" />
                    {unreadMessagesCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadMessagesCount}
                      </span>
                    )}
                  </button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={logout}
                    >
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {/* Tabs Content */}
              <Tabs defaultValue="reservas" value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
                <TabsList className="mb-6 hidden">
                  <TabsTrigger value="reservas">Reservas</TabsTrigger>
                  <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                  <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
                  <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                </TabsList>

                {/* Reservas Tab */}
                <TabsContent value="reservas" className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-serif font-bold text-pousada-brown">
                      Gerenciar Reservas
                    </h2>
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          placeholder="Buscar reservas..."
                          className="pl-10 w-full md:w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="confirmed">Confirmados</SelectItem>
                          <SelectItem value="pending">Pendentes</SelectItem>
                          <SelectItem value="cancelled">Cancelados</SelectItem>
                        </SelectContent>
                      </Select>

                      <Dialog open={showNewReservationDialog} onOpenChange={setShowNewReservationDialog}>
                        <DialogTrigger asChild>
                          <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Reserva
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Nova Reserva</DialogTitle>
                            <DialogDescription>
                              Preencha os dados para criar uma nova reserva
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Nome</label>
                              <Input className="col-span-3" placeholder="Nome do hóspede" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Email</label>
                              <Input className="col-span-3" placeholder="Email do hóspede" type="email" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Acomodação</label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Selecione o quarto" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="suite-premium">Suíte Premium</SelectItem>
                                  <SelectItem value="chale-familia">Chalé Cancún</SelectItem>
                                  <SelectItem value="suite-standard">Suíte Standard</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Check-in</label>
                              <Input className="col-span-3" type="date" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right">Check-out</label>
                              <Input className="col-span-3" type="date" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowNewReservationDialog(false)}>Cancelar</Button>
                            <Button className="bg-pousada-brown hover:bg-pousada-dark text-white" onClick={handleCreateReservation}>Salvar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Dashboard cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total de Reservas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Confirmadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-pousada-brown">{formatCurrency(stats.totalRevenue)}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Próximas Chegadas */}
                  {fetchedUpcomingArrivals && fetchedUpcomingArrivals.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                      <h3 className="text-lg font-semibold mb-3">Próximas Chegadas</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hóspede</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodação</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Noites</th>
                              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {fetchedUpcomingArrivals.map((arrival) => (
                              <tr key={arrival.id} className="hover:bg-gray-50">
                                <td className="py-3 px-3 text-sm">{arrival.id}</td>
                                <td className="py-3 px-3 text-sm font-medium">{arrival.guestName}</td>
                                <td className="py-3 px-3 text-sm">{arrival.roomName}</td>
                                <td className="py-3 px-3 text-sm">{formatDate(arrival.checkIn)}</td>
                                <td className="py-3 px-3 text-sm">{arrival.nights}</td>
                                <td className="py-3 px-3 text-sm">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewDetails(arrival)}
                                  >
                                    Ver detalhes
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Reservas table */}
                  {loading && (
                    <div className="flex justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pousada-brown"></div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  {!loading && filteredReservations.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <p className="text-lg text-gray-500">Nenhuma reserva encontrada.</p>
                      <p className="text-gray-400">Tente ajustar seus filtros ou adicione uma nova reserva.</p>
                    </div>
                  )}
                  
                  {filteredReservations.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="flex justify-between p-4 border-b">
                        <h3 className="font-medium">Todas as Reservas</h3>
                        <div className="flex items-center space-x-2">
                          {/* Botão de Atualização */}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleRefresh}
                            title="Atualizar reservas"
                            disabled={isRefreshing}
                          >
                            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Atualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-1" />
                            Filtros
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Exportar
                          </Button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hóspede</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodação</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                              <tr key={reservation.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm">{reservation.id}</td>
                                <td className="py-3 px-4 text-sm font-medium">{reservation.guestName}</td>
                                <td className="py-3 px-4 text-sm">{reservation.roomName}</td>
                                <td className="py-3 px-4 text-sm">{formatDate(reservation.checkIn)}</td>
                                <td className="py-3 px-4 text-sm">{formatDate(reservation.checkOut)}</td>
                                <td className="py-3 px-4 text-sm">
                                  <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                                      reservation.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : reservation.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {reservation.status === 'confirmed'
                                      ? 'Confirmada'
                                      : reservation.status === 'pending'
                                      ? 'Pendente'
                                      : 'Cancelada'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{formatCurrency(reservation.totalPrice)}</td>
                                <td className="py-3 px-4 text-sm">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-green-500 hover:bg-green-600 text-white"
                                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                      disabled={reservation.status === 'confirmed'}
                                    >
                                      Confirmar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-red-500 hover:bg-red-600 text-white"
                                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                      disabled={reservation.status === 'cancelled'}
                                    >
                                      Cancelar
                                    </Button>
                                    {/* Botão de Detalhes */}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewDetails(reservation)}
                                    >
                                      <Info className="h-4 w-4 mr-1" />
                                      Detalhes
                                    </Button>
                                    {/* Botão de Excluir */}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                                      onClick={() => handleDeleteClick(reservation.id)}
                                      title="Excluir reserva"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Estatísticas Tab */}
                <TabsContent value="estatisticas" className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-pousada-brown mb-6">
                    Estatísticas e Relatórios
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total de Reservas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total acumulado</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Ocupação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total ? Math.round((stats.confirmed / stats.total) * 100) : 0}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Baseado em reservas confirmadas</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-pousada-brown">{formatCurrency(stats.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Reservas confirmadas</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Diária Média</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {stats.confirmed ? formatCurrency(stats.totalRevenue / stats.confirmed) : 'R$ 0,00'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Por reserva confirmada</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição de Reservas por Status</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="h-80 flex items-center justify-center">
                          <div className="space-y-4 w-full max-w-xs">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Confirmadas</span>
                                <span className="text-sm font-medium">{stats.confirmed}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: stats.total ? `${stats.confirmed / stats.total * 100}%` : '0%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Pendentes</span>
                                <span className="text-sm font-medium">{stats.pending}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: stats.total ? `${stats.pending / stats.total * 100}%` : '0%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Canceladas</span>
                                <span className="text-sm font-medium">{stats.cancelled}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: stats.total ? `${stats.cancelled / stats.total * 100}%` : '0%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Acomodações Mais Reservadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80 flex items-center justify-center">
                          <div className="space-y-4 w-full max-w-xs">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Suíte Premium</span>
                                <span className="text-sm font-medium">
                                  {reservations.filter(r => r.roomName?.includes('Premium')).length}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-pousada-brown h-2.5 rounded-full" 
                                  style={{ 
                                    width: stats.total ? 
                                      `${reservations.filter(r => r.roomName?.includes('Premium')).length / stats.total * 100}%` : 
                                      '0%' 
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Chalé Cancún</span>
                                <span className="text-sm font-medium">
                                  {reservations.filter(r => r.roomName?.includes('Família')).length}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-pousada-brown h-2.5 rounded-full" 
                                  style={{ 
                                    width: stats.total ? 
                                      `${reservations.filter(r => r.roomName?.includes('Família')).length / stats.total * 100}%` : 
                                      '0%' 
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Suíte Standard</span>
                                <span className="text-sm font-medium">
                                  {reservations.filter(r => r.roomName?.includes('Standard')).length}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-pousada-brown h-2.5 rounded-full" 
                                  style={{ 
                                    width: stats.total ? 
                                      `${reservations.filter(r => r.roomName?.includes('Standard')).length / stats.total * 100}%` : 
                                      '0%' 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">Relatórios Disponíveis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="flex items-center justify-center" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Relatório de Ocupação
                      </Button>
                      <Button className="flex items-center justify-center" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Relatório Financeiro
                      </Button>
                      <Button className="flex items-center justify-center" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Reservas por Período
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Mensagens Tab - NOVA VERSÃO COM DETALHES */}
                <TabsContent value="mensagens" className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-pousada-brown mb-6">
                    Central de Mensagens
                  </h2>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b p-4 flex justify-between items-center">
                      <h3 className="font-medium">Mensagens Recentes</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Mensagem
                      </Button>
                    </div>
                    <div className="divide-y">
                      {contactMessages && Array.isArray(contactMessages) && contactMessages.length > 0 ? (
                        contactMessages
                          .filter(message => message && typeof message === 'object')
                          .map(message => (
                            <div 
                              key={message.id || Math.random()} 
                              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                !message.is_read ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => handleViewMessage(message)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className={`font-medium ${!message.is_read ? 'font-bold' : ''}`}>
                                    {message.subject || 'Sem assunto'}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    De: {message.sender || message.email || 'Remetente desconhecido'}
                                    {message.phone && ` | Tel: ${message.phone}`}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-500">
                                    {message.created_at ? formatDate(message.created_at) : 'Data não disponível'}
                                  </span>
                                  {!message.is_read && (
                                    <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                {message.content || 'Conteúdo não disponível'}
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium">Nenhuma mensagem encontrada</p>
                          <p className="text-sm">
                            {loading ? 'Carregando mensagens...' : 'Não há mensagens disponíveis no momento.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Configurações Tab */}
                <TabsContent value="configuracoes" className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-pousada-brown mb-6">
                    Configurações
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informações da Pousada</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Pousada</label>
                            <Input defaultValue="Recanto MD Olavio" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contato</label>
                            <Input defaultValue="recantomdolavio@gmail.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <Input defaultValue="(21) 971864896" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                            <Input defaultValue="R. Trinta e Dois - Agro Brasil" />
                          </div>
                          <div className="flex justify-end">
                            <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                              Salvar Alterações
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Configurações de Reserva</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Check-in</label>
                            <Input defaultValue="14:00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Check-out</label>
                            <Input defaultValue="12:00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cancelamento Gratuito (dias)</label>
                            <Input type="number" defaultValue="7" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Cancelamento</label>
                            <Input defaultValue="1 diária" />
                          </div>
                          <div className="flex justify-end">
                            <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                              Salvar Alterações
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Usuários do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium">Administrador</td>
                              <td className="py-3 px-4 text-sm">admin@pousada.com</td>
                              <td className="py-3 px-4 text-sm">Admin</td>
                              <td className="py-3 px-4 text-sm">
                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Ativo
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <Button variant="outline" size="sm">Editar</Button>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium">Recepcionista</td>
                              <td className="py-3 px-4 text-sm">recepcao@pousada.com</td>
                              <td className="py-3 px-4 text-sm">Recepção</td>
                              <td className="py-3 px-4 text-sm">
                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Ativo
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <Button variant="outline" size="sm">Editar</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Usuário
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Reserva */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-pousada-brown">
              Detalhes da Reserva #{selectedReservation?.id}
            </DialogTitle>
            <DialogDescription>
              Informações completas da reserva
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações do Hóspede */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-pousada-brown">Informações do Hóspede</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="font-medium">{selectedReservation.guestName}</p>
                    </div>
                    
                    {selectedReservation.contactEmail && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedReservation.contactEmail}</p>
                      </div>
                    )}
                    
                    {selectedReservation.contactPhone && (
                      <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="font-medium">{selectedReservation.contactPhone}</p>
                      </div>
                    )}
                    
                    {selectedReservation.guests && (
                      <div>
                        <p className="text-sm text-gray-500">Número de Hóspedes</p>
                        <p className="font-medium">{selectedReservation.guests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Detalhes da Reserva */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-pousada-brown">Detalhes da Estadia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Acomodação</p>
                      <p className="font-medium">{selectedReservation.roomName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{formatDate(selectedReservation.checkIn)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{formatDate(selectedReservation.checkOut)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          selectedReservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : selectedReservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedReservation.status === 'confirmed'
                          ? 'Confirmada'
                          : selectedReservation.status === 'pending'
                          ? 'Pendente'
                          : 'Cancelada'}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Valor Total</p>
                      <p className="font-medium text-pousada-brown">{formatCurrency(selectedReservation.totalPrice)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Solicitações Especiais */}
              {selectedReservation.specialRequests && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-pousada-brown">Solicitações Especiais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedReservation.specialRequests}</p>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Fechar
                </Button>
                <Button 
                  className="bg-pousada-brown hover:bg-pousada-dark text-white"
                  onClick={() => handleEditReservation(selectedReservation)}
                >
                  Editar Reserva
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição da Reserva */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-pousada-brown">
              Editar Reserva #{editingReservation?.id}
            </DialogTitle>
            <DialogDescription>
              Modifique os dados da reserva conforme necessário
            </DialogDescription>
          </DialogHeader>
          
          {editingReservation && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações do Hóspede */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-pousada-brown">Informações do Hóspede</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nome</label>
                      <Input
                        value={editForm.guestName}
                        onChange={(e) => setEditForm({...editForm, guestName: e.target.value})}
                        placeholder="Nome do hóspede"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input
                        value={editForm.contactEmail}
                        onChange={(e) => setEditForm({...editForm, contactEmail: e.target.value})}
                        placeholder="Email do hóspede"
                        type="email"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Telefone</label>
                      <Input
                        value={editForm.contactPhone}
                        onChange={(e) => setEditForm({...editForm, contactPhone: e.target.value})}
                        placeholder="Telefone do hóspede"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Adultos</label>
                        <Select 
                          value={editForm.adults.toString()} 
                          onValueChange={(value) => setEditForm({...editForm, adults: parseInt(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Crianças</label>
                        <Select 
                          value={editForm.children.toString()} 
                          onValueChange={(value) => setEditForm({...editForm, children: parseInt(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Detalhes da Reserva */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-pousada-brown">Detalhes da Estadia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Acomodação</label>
                      <Input
                        value={editForm.roomName}
                        onChange={(e) => setEditForm({...editForm, roomName: e.target.value})}
                        placeholder="Nome da acomodação"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Check-in</label>
                        <Input
                          type="date"
                          value={editForm.checkIn}
                          onChange={(e) => setEditForm({...editForm, checkIn: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Check-out</label>
                        <Input
                          type="date"
                          value={editForm.checkOut}
                          onChange={(e) => setEditForm({...editForm, checkOut: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Valor Total (R$)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editForm.totalPrice}
                        onChange={(e) => setEditForm({...editForm, totalPrice: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Solicitações Especiais */}
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-pousada-brown">Solicitações Especiais</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editForm.specialRequests}
                    onChange={(e) => setEditForm({...editForm, specialRequests: e.target.value})}
                    placeholder="Solicitações especiais do hóspede..."
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="bg-pousada-brown hover:bg-pousada-dark text-white"
                  onClick={handleSaveEdit}
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes da Mensagem */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-pousada-brown">
              {selectedMessage?.subject || 'Sem assunto'}
            </DialogTitle>
            <DialogDescription>
              Mensagem recebida em {selectedMessage?.created_at ? formatDate(selectedMessage.created_at) : 'Data não disponível'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Remetente:</p>
                      <p className="text-sm">{selectedMessage.sender || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email:</p>
                      <p className="text-sm">{selectedMessage.email}</p>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Telefone:</p>
                        <p className="text-sm">{selectedMessage.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">Data:</p>
                      <p className="text-sm">{formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Mensagem:</p>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.content}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMessageDialog(false)}
                >
                  Fechar
                </Button>
                <Button 
                  className="bg-pousada-brown hover:bg-pousada-dark text-white"
                  onClick={() => handleReplyMessage(selectedMessage)}
                >
                  Responder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Resposta */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-pousada-brown">
              Responder Mensagem
            </DialogTitle>
            <DialogDescription>
              Enviando resposta para: {selectedMessage?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Assunto:</label>
                <Input
                  value={replyForm.subject}
                  onChange={(e) => setReplyForm({...replyForm, subject: e.target.value})}
                  placeholder="Assunto da resposta"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Mensagem:</label>
                <Textarea
                  value={replyForm.message}
                  onChange={(e) => setReplyForm({...replyForm, message: e.target.value})}
                  placeholder="Digite sua resposta aqui..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowReplyDialog(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-pousada-brown hover:bg-pousada-dark text-white"
                onClick={handleSendReply}
              >
                Enviar Resposta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação para exclusão */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir permanentemente a reserva #{reservationToDelete}?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}