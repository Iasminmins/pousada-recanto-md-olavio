// src/components/ContactForm.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useDataStore } from "@/services/dataService";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { addContactMessage } = useDataStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!name || !email || !message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    // Simular envio
    setLoading(true);
    
    setTimeout(() => {
      try {
        // Adicionar mensagem ao sistema
        addContactMessage({
          sender: name,
          email,
          subject: subject || "Contato pelo site",
          content: message
        });
        
        // Notificar usuário
        toast({
          title: "Mensagem enviada",
          description: "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
          variant: "default"
        });
        
        // Limpar formulário
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (error) {
        toast({
          title: "Erro ao enviar",
          description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome completo <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Assunto
        </label>
        <Input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Assunto da mensagem"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sua mensagem aqui..."
          rows={5}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
      </p>
    </form>
  );
};

export default ContactForm;