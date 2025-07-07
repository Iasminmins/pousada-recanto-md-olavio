import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Mensagem)');
      return;
    }

    try {
      // Enviar mensagem para a API
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          subject: formData.assunto || 'Contato via site',
          content: formData.mensagem,
          is_read: false
        }),
      });

      if (response.ok) {
        // Limpar formulário
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          assunto: "",
          mensagem: ""
        });
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.');
    }

    // Criar mensagem para WhatsApp (como backup)
    const whatsappMessage = `Olá, Recanto MD Olavio!

*Nome:* ${formData.nome}
*E-mail:* ${formData.email}
*Telefone:* ${formData.telefone || 'Não informado'}
*Assunto:* ${formData.assunto || 'Contato geral'}

*Mensagem:*
${formData.mensagem}`;

    // Abrir WhatsApp
    window.open(`https://wa.me/5521971864896?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://i.postimg.cc/Hnvb6H13/Imagem-do-Whats-App-de-2025-06-21-s-12-50-48-3b89e2ca.jpg")' }}>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Entre em Contato</h1>
            <p className="text-xl md:text-2xl">Estamos aqui para tornar sua estadia inesquecível</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-serif font-bold text-pousada-brown mb-6">
                Envie sua Mensagem
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome *</label>
                    <Input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <Input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="(21) 99999-9999"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assunto</label>
                    <Input
                      type="text"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleInputChange}
                      placeholder="Assunto da mensagem"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem *</label>
                  <Textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos como podemos ajudá-lo..."
                    className="w-full h-32 resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-pousada-brown mb-6">
                  Informações de Contato
                </h2>
                <div className="space-y-6">
                  
                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-pousada-brown bg-opacity-10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-pousada-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-700">(21) 97186-4896</p>
                      <p className="text-sm text-gray-600">Disponível 24h para reservas</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-pousada-brown bg-opacity-10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-pousada-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                      <p className="text-gray-700">contato@recantomdolavio.com.br</p>
                      <p className="text-sm text-gray-600">Respondemos em até 24h</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-pousada-brown bg-opacity-10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-pousada-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                      <p className="text-gray-700">
                        R. Trinta e Dois - Agro Brasil<br />
                        Itaboraí - RJ<br />
                        CEP 24842-590
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-pousada-brown bg-opacity-10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-pousada-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
                      <p className="text-gray-700">
                        Check-in: 14h às 22h<br />
                        Check-out: 08h às 12h<br />
                        Recepção: 08h às 22h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-pousada-cream bg-opacity-30 p-6 rounded-lg">
                <h3 className="font-serif text-lg font-semibold text-pousada-brown mb-4">
                  Contato Rápido
                </h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open('https://wa.me/5521971864896?text=Olá, gostaria de fazer uma reserva!', '_blank')}
                  >
                    WhatsApp - Reservas
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-pousada-brown text-pousada-brown hover:bg-pousada-cream"
                    onClick={() => window.open('https://wa.me/5521971864896?text=Olá, preciso de informações sobre a pousada.', '_blank')}
                  >
                    WhatsApp - Informações
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
              Como Chegar
            </h2>
            <p className="text-gray-700">
              Estamos localizados em uma área privilegiada de Itaboraí, RJ
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7363.700543369056!2d-42.7856696418335!3d-22.65937048506527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99c59610e8df4b%3A0x58a808fa6922e546!2sRecanto%20MD!5e0!3m2!1spt-BR!2sbr!4v1747420868422!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Recanto MD Olavio"
              />
            </div>
            <div className="mt-6 text-center">
              <Button 
                className="bg-pousada-brown hover:bg-pousada-dark text-white"
                onClick={() => window.open('https://wa.me/5521971864896?text=Olá, gostaria de saber como chegar na pousada', '_blank')}
              >
                Solicitar Instruções de Como Chegar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;