// src/components/admin/MessagePanel.tsx - Componente específico para a Central de Mensagens
import { useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Interface para as mensagens
interface Message {
  id: number;
  subject: string;
  sender: string;
  content: string;
  date: string;
  unread: boolean;
}

interface MessagePanelProps {
  messages: Message[];
  onMarkAsRead: (id: number) => Promise<void>;
  formatDate: (date: string) => string;
}

export function MessagePanel({ messages, onMarkAsRead, formatDate }: MessagePanelProps) {
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const { toast } = useToast();

  // Função para enviar nova mensagem
  const handleSendMessage = () => {
    // Validações básicas
    if (!recipient || !subject || !messageContent) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você implementaria a lógica para enviar a mensagem
    // Por enquanto vamos simular sucesso
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso.",
      variant: "default"
    });

    // Limpar o formulário e fechar o diálogo
    setRecipient('');
    setSubject('');
    setMessageContent('');
    setShowComposeDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-pousada-brown">
          Central de Mensagens
        </h2>
        
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogTrigger asChild>
            <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Mensagem</DialogTitle>
              <DialogDescription>
                Envie uma mensagem para um contato ou hóspede.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Para
                </label>
                <Input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Assunto
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Assunto da mensagem"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mensagem
                </label>
                <Textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                  rows={6}
                  className="resize-none"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowComposeDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-pousada-brown hover:bg-pousada-dark text-white"
                onClick={handleSendMessage}
              >
                Enviar Mensagem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="font-medium">Mensagens Recentes</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComposeDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Mensagem
          </Button>
        </div>
        
        <div className="divide-y">
          {messages && messages.length > 0 ? (
            messages.map(message => (
              <div 
                key={message.id} 
                className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-medium ${message.unread ? 'font-bold' : ''}`}>
                      {message.subject}
                    </h4>
                    <p className="text-sm text-gray-600">De: {message.sender}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{formatDate(message.date)}</span>
                    {message.unread && (
                      <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{message.content}</p>
                
                <div className="mt-2 flex space-x-2">
                  <Button variant="outline" size="sm">Responder</Button>
                  {message.unread && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onMarkAsRead(message.id)}
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium">Sem mensagens</p>
              <p className="mt-1">Não há mensagens na sua caixa de entrada.</p>
              <Button 
                className="mt-4 bg-pousada-brown hover:bg-pousada-dark text-white"
                onClick={() => setShowComposeDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Mensagem
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Lista de contatos recentes (opcional) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Contatos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'João Silva', email: 'joao.silva@exemplo.com' },
              { name: 'Maria Oliveira', email: 'maria.oliveira@exemplo.com' },
              { name: 'Carlos Mendes', email: 'carlos.mendes@exemplo.com' },
            ].map((contact, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="flex justify-start items-center space-x-2"
                onClick={() => {
                  setRecipient(contact.email);
                  setShowComposeDialog(true);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-pousada-brown/20 flex items-center justify-center">
                  <span className="text-pousada-brown font-medium">{contact.name.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.email}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}