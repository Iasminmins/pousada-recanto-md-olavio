// src/pages/admin/MessagePage.tsx
// Implementação da página de mensagens separada do AdminPage

import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Home, 
  BarChart2, 
  Bell, 
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminProtection } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Importar o componente MessagePanel
import { MessagePanel } from '@/components/admin/MessagesPanel';

// Importar o serviço de mensagens
import { useMessageStore } from '@/services/messageService';

export default function MessagePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { loading: authLoading, isAdmin } = useAdminProtection();
  
  // Obter dados do MessageStore
  const messages = useMessageStore(state => state.messages);
  const unreadCount = useMessageStore(state => state.unreadCount);
  const markAsRead = useMessageStore(state => state.markAsRead);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Função para marcar mensagem como lida
  const handleMarkAsRead = async (id: number) => {
    const success = markAsRead(id);
    return Promise.resolve();
  };

  // Função para navegar entre páginas
  const navigateTo = (path: string) => {
    navigate(path);
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
                className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-white/10"
                onClick={() => navigateTo('/admin')}
              >
                <Calendar className="mr-3 h-5 w-5" />
                <span>Reservas</span>
              </button>
              <button 
                className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-white/10"
                onClick={() => navigateTo('/admin/estatisticas')}
              >
                <BarChart2 className="mr-3 h-5 w-5" />
                <span>Estatísticas</span>
              </button>
              <button 
                className="flex items-center py-3 px-4 rounded-lg mb-2 bg-white/20"
                onClick={() => navigateTo('/admin/mensagens')}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                <span>Mensagens</span>
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button 
                className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-white/10"
                onClick={() => navigateTo('/admin/configuracoes')}
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
                Mensagens
              </h1>
              <div className="flex-1 flex justify-end items-center space-x-4">
                <div className="relative">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
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
              <MessagePanel 
                messages={messages}
                onMarkAsRead={handleMarkAsRead}
                formatDate={formatDate}
              />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}