// src/components/ReservationForm.tsx - Apenas modificação da numeração

import { useState, useEffect } from "react";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useApiService } from "@/services/apiService";

const ReservationForm = () => {
  // Estados do formulário
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  
  // Estados para dados da API
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const apiService = useApiService();
  const { toast } = useToast();

  // Carregar quartos da SUA API
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const availableRooms = await apiService.getRooms();
        
        // Mapear para o formato esperado
        const mappedRooms = availableRooms.map(room => ({
          id: room.id,
          name: room.name,
          price: room.price
        }));
        
        setRooms(mappedRooms);
      } catch (error) {
        console.error('Erro ao carregar quartos:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os quartos disponíveis",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  // Recarregar quartos quando as datas mudarem
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const loadAvailableRooms = async () => {
        try {
          setLoading(true);
          const availableRooms = await apiService.getRooms(checkInDate, checkOutDate);
          
          const mappedRooms = availableRooms.map(room => ({
            id: room.id,
            name: room.name,
            price: room.price
          }));
          
          setRooms(mappedRooms);
        } catch (error) {
          console.error('Erro ao carregar quartos disponíveis:', error);
        } finally {
          setLoading(false);
        }
      };
      loadAvailableRooms();
    }
  }, [checkInDate, checkOutDate]);

  // Calcular o preço total da reserva
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !selectedRoomId) return 0;
    
    const room = rooms.find(r => r.id === selectedRoomId);
    if (!room) return 0;
    
    const nights = apiService.calculateNights(checkInDate, checkOutDate);
    return room.price * nights;
  };

  // Função para enviar reserva para SUA API
  const handleSubmitReservation = async () => {
    // Validação das datas
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha as datas de check-in e check-out",
        variant: "destructive"
      });
      return;
    }

    // Verifica se check-out é posterior ao check-in
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      toast({
        title: "Erro de validação",
        description: "A data de check-out deve ser posterior ao check-in",
        variant: "destructive"
      });
      return;
    }

    // Verifica se o email foi preenchido
    if (!email || !name) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha seu nome e email",
        variant: "destructive"
      });
      return;
    }

    // Verifica se um quarto foi selecionado
    if (!selectedRoomId) {
      toast({
        title: "Erro de validação",
        description: "Por favor, selecione uma acomodação",
        variant: "destructive"
      });
      return;
    }

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);
    if (!selectedRoom) return;

    try {
      setSubmitting(true);
      
      // Dados da reserva para SUA API
      const reservationData = {
        guestName: name,
        contactEmail: email,
        contactPhone: phone,
        roomId: selectedRoomId,
        roomName: selectedRoom.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: parseInt(adults),
        children: parseInt(children),
        totalPrice: calculateTotalPrice()
      };

      // Criar reserva via SUA API
      const response = await apiService.createReservation(reservationData);

      // Exibir toast de sucesso com nova numeração
      toast({
        title: "Reserva recebida!",
        description: `Sua reserva #${response.reservationId} foi enviada e está sendo processada.`,
        variant: "default"
      });

      // Criar mensagem para WhatsApp com nova numeração
      const message = `Olá, Recanto MD Olavio! Gostaria de verificar disponibilidade:
      
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Acomodação: ${selectedRoom.name}
Adultos: ${adults}
Crianças: ${children}
Contato: ${phone}
Email: ${email}
Reserva: #${response.reservationId}`;

      // Abrir WhatsApp
      const whatsappNumber = '5521971864896';
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
      
      // Limpar formulário
      resetForm();
      
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      toast({
        title: "Erro ao processar reserva",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCheckInDate("");
    setCheckOutDate("");
    setAdults("2");
    setChildren("0");
    setSelectedRoomId("");
  };

  // Função para lidar com interesse em pacotes
  const handlePackageInterest = async (packageName, packagePrice) => {
    try {
      // Criar mensagem de contato para interesse em pacote via SUA API
      await apiService.createContactMessage({
        sender: name || "Interessado em Pacote",
        email: email || "contato@exemplo.com",
        subject: `Interesse em ${packageName}`,
        content: `Cliente demonstrou interesse no ${packageName}. Valor: ${packagePrice}. Favor entrar em contato.`
      });
      
      toast({
        title: "Interesse registrado",
        description: "Sua mensagem foi enviada. Em breve entraremos em contato.",
        variant: "default"
      });
      
      // Enviar para WhatsApp
      const message = `Olá, gostaria de informações sobre o ${packageName} oferecido pela pousada.`;
      window.open(`https://wa.me/5521971864896?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      console.error('Erro ao registrar interesse:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar seu interesse. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Obter data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="relative -mt-20 z-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Tabs defaultValue="reserva" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="reserva" className="flex-1 font-medium">
                <Calendar className="mr-2 h-5 w-5" /> Reservar Estadia
              </TabsTrigger>
              <TabsTrigger value="pacotes" className="flex-1 font-medium">
                <Users className="mr-2 h-5 w-5" /> Pacotes Especiais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reserva">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Informações pessoais */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome Completo</label>
                    <Input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full"
                  />
                </div>
                
                {/* Datas */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Check-in</label>
                  <Input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={today}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Check-out</label>
                  <Input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || today}
                    className="w-full"
                    required
                  />
                </div>
                
                {/* Acomodação */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Acomodação</label>
                  <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Carregando..." : "Selecione uma acomodação"} />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - {apiService.formatCurrency(room.price)}/noite
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {checkInDate && checkOutDate && rooms.length === 0 && !loading && (
                    <p className="text-sm text-red-600 mt-1">
                      Nenhum quarto disponível para as datas selecionadas.
                    </p>
                  )}
                </div>
                
                {/* Hóspedes */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Adultos</label>
                  <Select value={adults} onValueChange={setAdults}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
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
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Crianças</label>
                  <Select value={children} onValueChange={setChildren}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
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
                
                {/* Resumo do preço */}
                {selectedRoomId && checkInDate && checkOutDate && new Date(checkOutDate) > new Date(checkInDate) && (
                  <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span>Preço por noite:</span>
                      <span className="font-semibold">
                        {apiService.formatCurrency(rooms.find(r => r.id === selectedRoomId)?.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Número de noites:</span>
                      <span>
                        {apiService.calculateNights(checkInDate, checkOutDate)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span>{apiService.formatCurrency(calculateTotalPrice())}</span>
                    </div>
                  </div>
                )}
                
                {/* Botão de reserva */}
                <div className="md:col-span-2">
                  <Button 
                    className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                    onClick={handleSubmitReservation}
                    disabled={submitting || loading}
                  >
                    {submitting ? "Processando..." : "Verificar Disponibilidade"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Ao verificar disponibilidade, você será redirecionado para o WhatsApp para finalizar sua reserva.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pacotes">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
                  <h4 className="font-serif text-lg font-medium mb-2">Pacote Romântico</h4>
                  <p className="text-sm mb-2">2 noites com café da manhã, jantar romântico e massagem para casal.</p>
                  <div className="text-pousada-brown font-semibold mb-2">R$ 1.200</div>
                  <Button 
                    className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                    onClick={() => handlePackageInterest("Pacote Romântico", "R$ 1.200")}
                  >
                    Reservar Pacote
                  </Button>
                </div>
                <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
                  <h4 className="font-serif text-lg font-medium mb-2">Pacote Família</h4>
                  <p className="text-sm mb-2">3 noites com café da manhã, passeio na fazenda e atividades para crianças.</p>
                  <div className="text-pousada-brown font-semibold mb-2">R$ 2.400</div>
                  <Button 
                    className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                    onClick={() => handlePackageInterest("Pacote Família", "R$ 2.400")}
                  >
                    Reservar Pacote
                  </Button>
                </div>
                <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
                  <h4 className="font-serif text-lg font-medium mb-2">Pacote Relax</h4>
                  <p className="text-sm mb-2">2 noites com café da manhã, acesso ao spa e tratamentos relaxantes.</p>
                  <div className="text-pousada-brown font-semibold mb-2">R$ 1.500</div>
                  <Button 
                    className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                    onClick={() => handlePackageInterest("Pacote Relax", "R$ 1.500")}
                  >
                    Reservar Pacote
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;