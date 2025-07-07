// src/services/dataService.ts

// Este serviço vai facilitar o compartilhamento de dados entre a página principal e o painel administrativo
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Reutilizando o tipo Reservation do seu hook useAdmin
export interface Reservation {
  id: string;
  guestName: string;
  roomId: string;
  roomName?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  totalPrice: number;
  specialRequests?: string; // Campo opcional para solicitações especiais
}

// Tipos adicionais para mensagens e newsletter
export interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  unread: boolean;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  date: string;
}

interface DataState {
  // Dados da página principal que vão para o admin
  mainPageReservations: Reservation[];
  contactMessages: Message[];
  newsletterSubscriptions: NewsletterSubscription[];
  
  // Ações para a página principal
  addReservationFromMainPage: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => string;
  addContactMessage: (message: Omit<Message, 'id' | 'date' | 'unread'>) => number;
  addNewsletterSubscription: (email: string) => number;
  
  // Ação para atualizar status de reserva
  updateReservationStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  
  // Nova ação para excluir reserva
  deleteReservation: (id: string) => boolean;
  
  // Contadores para notificações
  getUnreadMessagesCount: () => number;
  markMessageAsRead: (id: number) => void;
  
  // Nova ação para forçar atualização do estado (para debugging)
  refreshState: () => void;
}

// Dados mockados para ter exemplos no painel
const mockReservations: Reservation[] = [
  {
    id: 'rsv-001',
    guestName: 'João Silva',
    roomId: 'suite-premium',
    roomName: 'Suíte Premium',
    checkIn: '2025-05-19',
    checkOut: '2025-05-24',
    guests: 2,
    status: 'confirmed',
    contactEmail: 'joao@example.com',
    contactPhone: '(11) 99999-8888',
    createdAt: '2025-05-01T10:30:00Z',
    totalPrice: 1250
  },
  {
    id: 'rsv-002',
    guestName: 'Maria Oliveira',
    roomId: 'chale-cancun',
    roomName: 'Chalé Cancún',
    checkIn: '2025-05-21',
    checkOut: '2025-05-25',
    guests: 4,
    status: 'pending',
    contactEmail: 'maria@example.com',
    contactPhone: '(11) 98888-7777',
    createdAt: '2025-05-02T14:45:00Z',
    totalPrice: 1800
  },
  {
    id: 'rsv-003',
    guestName: 'Carlos Mendes',
    roomId: 'suite-standard',
    roomName: 'Suíte Standard',
    checkIn: '2025-05-17',
    checkOut: '2025-05-20',
    guests: 2,
    status: 'cancelled',
    contactEmail: 'carlos@example.com',
    contactPhone: '(11) 97777-6666',
    createdAt: '2025-04-28T09:15:00Z',
    totalPrice: 750
  }
];

// Dados mockados para mensagens
const mockMessages: Message[] = [
  { 
    id: 1, 
    sender: "João Silva", 
    email: "joao@example.com", 
    subject: "Dúvida sobre reserva", 
    content: "Olá, gostaria de saber se posso levar meu cachorro para a pousada. Ele é pequeno e bem comportado.", 
    date: "2025-05-15", 
    unread: true 
  },
  { 
    id: 2, 
    sender: "Maria Oliveira", 
    email: "maria@example.com", 
    subject: "Alteração de data", 
    content: "Preciso alterar minha reserva para o próximo final de semana. É possível?", 
    date: "2025-05-14", 
    unread: true 
  },
  { 
    id: 3, 
    sender: "Carlos Mendes", 
    email: "carlos@example.com", 
    subject: "Agradecimento", 
    content: "Obrigado pela excelente estadia no último final de semana. Vocês são incríveis!", 
    date: "2025-05-13", 
    unread: true 
  }
];

// Helper para debug do localStorage
const logLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    console.log(`[DEBUG] LocalStorage ${key}:`, value ? JSON.parse(value) : null);
  } catch (error) {
    console.error(`[DEBUG] Erro ao ler localStorage ${key}:`, error);
  }
};

// Criação do store com persistência
export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      // Estado inicial - pode usar dados mockados para ter exemplos
      mainPageReservations: mockReservations,
      contactMessages: mockMessages,
      newsletterSubscriptions: [],
      
      // Adicionar reserva da página principal
      addReservationFromMainPage: (reservation) => {
        console.log('[DEBUG] Adicionando reserva:', reservation);
        
        // Obter o último ID para incrementar
        const currentReservations = get().mainPageReservations;
        let lastNum = 0;
        
        if (currentReservations.length > 0) {
          // Extrair o número do último ID (formato rsv-001)
          const lastId = currentReservations[currentReservations.length - 1].id;
          const match = lastId.match(/rsv-(\d+)/);
          if (match && match[1]) {
            lastNum = parseInt(match[1], 10);
          }
        }
        
        // Criar novo ID
        const newId = `rsv-${String(lastNum + 1).padStart(3, '0')}`;
        console.log('[DEBUG] Novo ID de reserva:', newId);
        
        // Criar objeto de reserva completo
        const newReservation: Reservation = {
          ...reservation,
          id: newId,
          createdAt: new Date().toISOString(),
          status: 'pending',
          guests: reservation.guests || 2
        };
        console.log('[DEBUG] Nova reserva completa:', newReservation);
        
        // Atualizar o estado
        set(state => {
          const updatedReservations = [...state.mainPageReservations, newReservation];
          console.log('[DEBUG] Reservas atualizadas:', updatedReservations);
          return {
            mainPageReservations: updatedReservations
          };
        });
        
        // Verificar se a atualização foi bem-sucedida
        setTimeout(() => {
          logLocalStorage('pousada-main-to-admin');
          console.log('[DEBUG] Reservas após adicionar:', get().mainPageReservations);
        }, 100);
        
        return newId;
      },
      
      // Atualizar status de reserva
      updateReservationStatus: (id, status) => {
        console.log('[DEBUG] Atualizando status da reserva:', id, status);
        
        set(state => {
          const updatedReservations = state.mainPageReservations.map(reservation => 
            reservation.id === id 
              ? { ...reservation, status } 
              : reservation
          );
          
          console.log('[DEBUG] Reservas após atualização de status:', updatedReservations);
          return {
            mainPageReservations: updatedReservations
          };
        });
        
        // Verificar se a atualização foi bem-sucedida
        setTimeout(() => {
          logLocalStorage('pousada-main-to-admin');
          console.log('[DEBUG] Reservas após atualizar status:', get().mainPageReservations);
        }, 100);
      },
      
      // Nova função para excluir reserva
      deleteReservation: (id) => {
        console.log('[DEBUG] Excluindo reserva:', id);
        
        // Verificar se a reserva existe
        const reservation = get().mainPageReservations.find(r => r.id === id);
        if (!reservation) {
          console.error('[DEBUG] Reserva não encontrada:', id);
          return false;
        }
        
        set(state => {
          const updatedReservations = state.mainPageReservations.filter(
            reservation => reservation.id !== id
          );
          
          console.log('[DEBUG] Reservas após exclusão:', updatedReservations);
          return {
            mainPageReservations: updatedReservations
          };
        });
        
        // Verificar se a exclusão foi bem-sucedida
        setTimeout(() => {
          logLocalStorage('pousada-main-to-admin');
          console.log('[DEBUG] Reservas após excluir:', get().mainPageReservations);
        }, 100);
        
        return true;
      },
      
      // Adicionar mensagem de contato
      addContactMessage: (message) => {
        const newId = get().contactMessages.length > 0 
          ? Math.max(...get().contactMessages.map(m => m.id)) + 1 
          : 1;
          
        const newMessage: Message = {
          ...message,
          id: newId,
          date: new Date().toISOString().split('T')[0],
          unread: true
        };
        
        set(state => ({
          contactMessages: [...state.contactMessages, newMessage]
        }));
        
        return newId;
      },
      
      // Marcar mensagem como lida
      markMessageAsRead: (id) => {
        set(state => ({
          contactMessages: state.contactMessages.map(m => 
            m.id === id ? { ...m, unread: false } : m
          )
        }));
      },
      
      // Obter contagem de mensagens não lidas
      getUnreadMessagesCount: () => {
        return get().contactMessages.filter(m => m.unread).length;
      },
      
      // Adicionar inscrição na newsletter
      addNewsletterSubscription: (email) => {
        // Verificar se o email já está cadastrado
        if (get().newsletterSubscriptions.some(s => s.email === email)) {
          return -1; // Retorna -1 se já existir
        }
        
        const newId = get().newsletterSubscriptions.length > 0 
          ? Math.max(...get().newsletterSubscriptions.map(s => s.id)) + 1 
          : 1;
          
        const newSubscription: NewsletterSubscription = {
          id: newId,
          email,
          date: new Date().toISOString().split('T')[0]
        };
        
        set(state => ({
          newsletterSubscriptions: [...state.newsletterSubscriptions, newSubscription]
        }));
        
        return newId;
      },
      
      // Forçar atualização do estado (útil para debugging)
      refreshState: () => {
        console.log('[DEBUG] Forçando atualização do estado');
        set(state => ({ ...state }));
      }
    }),
    {
      name: 'pousada-main-to-admin', // Nome para o localStorage
      partialize: (state) => ({
        mainPageReservations: state.mainPageReservations,
        contactMessages: state.contactMessages,
        newsletterSubscriptions: state.newsletterSubscriptions
      }),
      // Configuração melhorada de storage para debugging
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('[DEBUG] Lendo do localStorage:', name);
          try {
            return str ? JSON.parse(str) : null;
          } catch (error) {
            console.error('[DEBUG] Erro ao ler do localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          console.log('[DEBUG] Salvando no localStorage:', name);
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('[DEBUG] Erro ao salvar no localStorage:', error);
          }
        },
        removeItem: (name) => {
          console.log('[DEBUG] Removendo do localStorage:', name);
          localStorage.removeItem(name);
        }
      }
    }
  )
);

// Inicializar o localStorage se necessário (para debugging)
setTimeout(() => {
  logLocalStorage('pousada-main-to-admin');
}, 500);

// Funções auxiliares para exportação
export const getMainPageReservations = () => {
  const reservations = useDataStore.getState().mainPageReservations;
  console.log('[DEBUG] Obtendo reservas:', reservations);
  return reservations;
};

export const getContactMessages = () => useDataStore.getState().contactMessages;
export const getNewsletterSubscriptions = () => useDataStore.getState().newsletterSubscriptions;
export const getUnreadMessagesCount = () => useDataStore.getState().getUnreadMessagesCount();
export const updateReservationStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
  console.log('[DEBUG] Chamando updateReservationStatus:', id, status);
  useDataStore.getState().updateReservationStatus(id, status);
};

// Nova função auxiliar para exclusão de reservas
export const deleteReservation = (id: string) => {
  console.log('[DEBUG] Chamando deleteReservation:', id);
  return useDataStore.getState().deleteReservation(id);
};

// Função para formatar moeda brasileira
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Função para formatar data brasileira
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

// Função para limpar o localStorage (para testes)
export const clearDataStore = () => {
  localStorage.removeItem('pousada-main-to-admin');
  console.log('[DEBUG] LocalStorage limpo');
};