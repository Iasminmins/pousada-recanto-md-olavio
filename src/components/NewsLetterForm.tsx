// src/components/NewsletterForm.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useDataStore } from "@/services/dataService";

const NewsletterForm = ({ variant = "default" }: { variant?: "default" | "footer" }) => {
  const [email, setEmail] = useState("");
  const { addNewsletterSubscription } = useDataStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido",
        variant: "destructive"
      });
      return;
    }
    
    // Adicionar inscrição
    const result = addNewsletterSubscription(email);
    
    if (result === -1) {
      toast({
        title: "Email já cadastrado",
        description: "Este email já está inscrito em nossa newsletter",
        variant: "default"
      });
    } else {
      toast({
        title: "Inscrição realizada",
        description: "Obrigado por se inscrever em nossa newsletter!",
        variant: "default"
      });
      setEmail("");
    }
  };

  // Estilos diferentes para uso no footer ou em outras partes do site
  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <Input 
          type="email" 
          placeholder="Seu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none w-full"
        />
        <Button 
          type="submit" 
          className="bg-pousada-brown hover:bg-pousada-dark text-white px-4 py-2 rounded-r"
        >
          →
        </Button>
      </form>
    );
  }

  // Versão padrão para uso no corpo da página
  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <Input 
        type="email" 
        placeholder="Seu e-mail" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow"
      />
      <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
        Inscrever-se
      </Button>
    </form>
  );
};

export default NewsletterForm;