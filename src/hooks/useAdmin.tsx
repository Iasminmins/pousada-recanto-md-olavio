// src/hooks/useAdmin.tsx - Versão com Auto-refresh de Mensagens

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Importar o apiService
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Função para fazer requisições à API
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Tentar pegar token do localStorage (se existe sistema de login)
  const token = localStorage.getItem('adminToken') || localStorage.getItem('authToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  // Adicionar Authorization header se token existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  console.log(`[API] ${options.method || 'GET'} ${url}`, { headers });
  
  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Log detalhado do erro
    console.error(`[API] Erro ${response.status}:`, {
      url,
      status: response.status,
      statusText: response.statusText,
      errorData
    });
    
    // Se erro 401, pode ser problema de autenticação
    if (response.status === 401) {
      console.error('[API] Erro 401: Token inválido ou endpoint protegido');
    }
    
    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// Tipos
interface Reservation {
  id: string;
  guestName: string;
  contactEmail: string;
  contactPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactMessage {
  id: number;
  sender: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface ReservationStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
}

export const useAdmin = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const { toast } = useToast();

  // Função para mapear dados da API para o formato do frontend
  const mapReservationFromAPI = (apiReservation: any): Reservation => {
    return {
      id: apiReservation.id,
      guestName: apiReservation.guest_name,
      contactEmail: apiReservation.contact_email,
      contactPhone: apiReservation.contact_phone,
      roomId: apiReservation.room_id,
      roomName: apiReservation.room_name,
      checkIn: apiReservation.check_in,
      checkOut: apiReservation.check_out,
      adults: apiReservation.adults || 2,
      children: apiReservation.children || 0,
      totalPrice: parseFloat(apiReservation.total_price),
      status: apiReservation.status,
      specialRequests: apiReservation.special_requests,
      createdAt: apiReservation.created_at,
      updatedAt: apiReservation.updated_at,
    };
  };

  // Buscar reservas da API
  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('[DEBUG] Buscando reservas da API...');
      const response = await apiRequest('/reservations');
      console.log('[DEBUG] Resposta completa da API:', response);
      
      // Verificar se a resposta tem o formato correto
      let reservationsData = [];
      if (response && Array.isArray(response.reservations)) {
        reservationsData = response.reservations;
      } else if (response && Array.isArray(response)) {
        reservationsData = response;
      } else {
        console.warn('[DEBUG] Formato de resposta inesperado:', response);
        reservationsData = [];
      }
      
      console.log('[DEBUG] Dados das reservas:', reservationsData);
      
      const mappedReservations = reservationsData.map(mapReservationFromAPI);
      console.log('[DEBUG] Reservas mapeadas:', mappedReservations);
      
      setReservations(mappedReservations);
    } catch (err) {
      console.error('[DEBUG] Erro ao buscar reservas:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar reservas');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar mensagens de contato
  const fetchContactMessages = async () => {
    try {
      console.log('[DEBUG] Buscando mensagens de contato...');
      const response = await apiRequest('/messages');
      console.log('[DEBUG] Mensagens da API:', response);
      
      // Verificar se a resposta tem o formato correto
      let messagesData = [];
      if (response && Array.isArray(response.messages)) {
        messagesData = response.messages;
      } else if (response && Array.isArray(response)) {
        messagesData = response;
      } else {
        console.warn('[DEBUG] Formato de mensagens inesperado:', response);
        messagesData = [];
      }
      
      // Verificar se há novas mensagens
      const unreadMessages = messagesData.filter(msg => !msg.is_read);
      
      // Se há mais mensagens não lidas que antes, mostrar notificação
      if (unreadMessages.length > lastMessageCount && lastMessageCount > 0) {
        const newMessagesCount = unreadMessages.length - lastMessageCount;
        toast({
          title: "Nova mensagem recebida!",
          description: `Você tem ${newMessagesCount} nova${newMessagesCount > 1 ? 's' : ''} mensagem${newMessagesCount > 1 ? 'ns' : ''} não lida${newMessagesCount > 1 ? 's' : ''}.`,
          variant: "default"
        });
      }
      
      setLastMessageCount(unreadMessages.length);
      setContactMessages(messagesData);
    } catch (err) {
      console.error('[DEBUG] Erro ao buscar mensagens:', err);
      setContactMessages([]);
    }
  };

  // Atualizar status da reserva
  const updateReservationStatus = async (reservationId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      console.log(`[DEBUG] Atualizando status da reserva ${reservationId} para ${newStatus}`);
      
      await apiRequest(`/reservations/${reservationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      // Atualizar a reserva localmente
      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === reservationId 
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );

      toast({
        title: "Status atualizado",
        description: `Reserva #${reservationId} foi ${newStatus === 'confirmed' ? 'confirmada' : newStatus === 'cancelled' ? 'cancelada' : 'marcada como pendente'}`,
        variant: "default"
      });

    } catch (err) {
      console.error('[DEBUG] Erro ao atualizar status:', err);
      toast({
        title: "Erro ao atualizar status",
        description: err instanceof Error ? err.message : "Erro desconhecido",
        variant: "destructive"
      });
    }
  };

  // NOVA FUNÇÃO: Atualizar reserva completa
  const updateReservation = async (reservationId: string, updatedData: any) => {
    try {
      console.log(`[DEBUG] Atualizando reserva completa ${reservationId}`, updatedData);
      
      const response = await apiRequest(`/reservations/${reservationId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });

      console.log('[DEBUG] Reserva atualizada:', response);

      // Atualizar a reserva localmente
      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === reservationId 
            ? { ...reservation, ...mapReservationFromAPI(response.reservation) }
            : reservation
        )
      );

      toast({
        title: "Reserva atualizada",
        description: `Reserva #${reservationId} foi atualizada com sucesso`,
        variant: "default"
      });

      return response;

    } catch (err) {
      console.error('[DEBUG] Erro ao atualizar reserva:', err);
      toast({
        title: "Erro ao atualizar reserva",
        description: err instanceof Error ? err.message : "Erro desconhecido",
        variant: "destructive"
      });
      throw err;
    }
  };

  // Excluir reserva
  const deleteReservation = async (reservationId: string): Promise<boolean> => {
    try {
      console.log(`[DEBUG] Excluindo reserva ${reservationId}`);
      
      await apiRequest(`/reservations/${reservationId}`, {
        method: 'DELETE',
      });

      // Remover da lista local
      setReservations(prev => prev.filter(reservation => reservation.id !== reservationId));

      toast({
        title: "Reserva excluída",
        description: `A reserva #${reservationId} foi excluída com sucesso`,
        variant: "default"
      });

      return true;
    } catch (err) {
      console.error('[DEBUG] Erro ao excluir reserva:', err);
      toast({
        title: "Erro ao excluir reserva",
        description: err instanceof Error ? err.message : "Erro desconhecido",
        variant: "destructive"
      });
      return false;
    }
  };

  // Marcar mensagem como lida
  const markMessageAsRead = async (messageId: number) => {
    try {
      await apiRequest(`/messages/${messageId}/read`, {
        method: 'PATCH',
      });

      // Atualizar localmente
      setContactMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (err) {
      console.error('[DEBUG] Erro ao marcar mensagem como lida:', err);
      throw err;
    }
  };

  // Calcular estatísticas
  const getReservationStats = (): ReservationStats => {
    const total = reservations.length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const cancelled = reservations.filter(r => r.status === 'cancelled').length;
    const totalRevenue = reservations
      .filter(r => r.status === 'confirmed')
      .reduce((sum, r) => sum + r.totalPrice, 0);

    return {
      total,
      confirmed,
      pending,
      cancelled,
      totalRevenue
    };
  };

  // Calcular próximas chegadas
  const upcomingArrivals = reservations
    .filter(r => {
      const checkInDate = new Date(r.checkIn);
      const today = new Date();
      const diffDays = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7 && r.status === 'confirmed'; // Próximos 7 dias
    })
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .map(r => ({
      ...r,
      nights: Math.ceil((new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    }));

  // Funções de formatação
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Contar mensagens não lidas
  const unreadMessagesCount = contactMessages.filter(msg => !msg.is_read).length;

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      console.log('[DEBUG] Carregando dados iniciais...');
      await Promise.all([
        fetchReservations(),
        fetchContactMessages()
      ]);
    };

    loadInitialData();
  }, []);

  // Auto-refresh para reservas (60s)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('[DEBUG] Auto-refresh das reservas...');
      fetchReservations();
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  // Auto-refresh para mensagens (30s - mais frequente)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('[DEBUG] Auto-refresh das mensagens...');
      fetchContactMessages();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [lastMessageCount]);

  return {
    reservations,
    contactMessages,
    loading,
    error,
    fetchReservations,
    fetchContactMessages, // Adicionado para refresh manual
    updateReservationStatus,
    updateReservation,
    deleteReservation,
    markMessageAsRead,
    getReservationStats,
    upcomingArrivals,
    unreadMessagesCount,
    formatCurrency,
    formatDate,
  };
};