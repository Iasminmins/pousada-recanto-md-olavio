// src/services/messageService.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface para as mensagens
interface Message {
  id: number;
  subject: string;
  sender: string;
  content: string;
  date: string;
  unread: boolean;
}

// Interface para o estado do serviço de mensagens
interface MessageState {
  messages: Message[];
  unreadCount: number;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'unread'>) => void;
  markAsRead: (id: number) => boolean;
  deleteMessage: (id: number) => boolean;
  getMessages: () => Message[];
}

// Dados mockados de mensagens
const mockMessages: Message[] = [
  {
    id: 1,
    subject: 'Dúvida sobre check-in antecipado',
    sender: 'Roberto Almeida <roberto@email.com>',
    content: 'Olá, gostaria de saber se é possível fazer o check-in mais cedo, por volta das 10h? Chegaremos na cidade pela manhã e gostaríamos de deixar nossas malas.',
    date: '2025-05-15',
    unread: true
  },
  {
    id: 2,
    subject: 'Solicitação de transfer',
    sender: 'Ana Pereira <ana.pereira@email.com>',
    content: 'Bom dia, gostaria de saber se vocês oferecem serviço de transfer do aeroporto até a pousada? Chegaremos dia 22/05 às 14h.',
    date: '2025-05-14',
    unread: true
  },
  {
    id: 3,
    subject: 'Agradecimento',
    sender: 'Marcelo Santos <marcelo@email.com>',
    content: 'Obrigado pela ótima estadia! Foi tudo perfeito e certamente voltaremos em breve.',
    date: '2025-05-10',
    unread: false
  }
];

// Criação do store com Zustand
export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      messages: mockMessages,
      unreadCount: mockMessages.filter(msg => msg.unread).length,
      
      // Adicionar nova mensagem
      addMessage: (message) => {
        const id = get().messages.length > 0 
          ? Math.max(...get().messages.map(m => m.id)) + 1 
          : 1;
          
        const newMessage: Message = {
          ...message,
          id,
          date: new Date().toISOString().split('T')[0],
          unread: true
        };
        
        set(state => ({
          messages: [newMessage, ...state.messages],
          unreadCount: state.unreadCount + 1
        }));
      },
      
      // Marcar mensagem como lida
      markAsRead: (id) => {
        let success = false;
        
        set(state => {
          const updatedMessages = state.messages.map(message => {
            if (message.id === id && message.unread) {
              success = true;
              return { ...message, unread: false };
            }
            return message;
          });
          
          return { 
            messages: updatedMessages,
            unreadCount: success ? state.unreadCount - 1 : state.unreadCount
          };
        });
        
        return success;
      },
      
      // Excluir mensagem
      deleteMessage: (id) => {
        let wasUnread = false;
        let success = false;
        
        set(state => {
          const messageToDelete = state.messages.find(m => m.id === id);
          
          if (messageToDelete) {
            wasUnread = messageToDelete.unread;
            success = true;
            
            return {
              messages: state.messages.filter(m => m.id !== id),
              unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount
            };
          }
          
          return state;
        });
        
        return success;
      },
      
      // Obter todas as mensagens
      getMessages: () => {
        return get().messages;
      }
    }),
    {
      name: 'pousada-messages-storage'
    }
  )
);