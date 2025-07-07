// src/pages/Reservas.tsx - Apenas modificação da numeração

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Layout from "@/components/Layout";
import { getRoomById, rooms } from "@/data/rooms";
import { toast } from "sonner";
import { apiService } from "@/services/apiService";

const formSchema = z.object({
  firstName: z.string().min(2, "Nome muito curto").max(50),
  lastName: z.string().min(2, "Sobrenome muito curto").max(50),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").max(15),
  roomId: z.string().min(1, "Selecione um quarto"),
  checkIn: z.string().min(1, "Data de check-in obrigatória"),
  checkOut: z.string().min(1, "Data de check-out obrigatória"),
  adults: z.string().min(1, "Selecione o número de adultos"),
  children: z.string(),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Reservas = () => {
  const [searchParams] = useSearchParams();
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const roomParam = searchParams.get("room");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      roomId: roomParam || "",
      checkIn: "",
      checkOut: "",
      adults: "2",
      children: "0",
      specialRequests: "",
    },
  });
  
  const selectedRoomId = form.watch("roomId");
  const selectedRoom = selectedRoomId ? getRoomById(selectedRoomId) : null;

  useEffect(() => {
    if (roomParam) {
      form.setValue("roomId", roomParam);
    }
  }, [roomParam, form]);

  // Função atualizada para usar SUA API com nova numeração
  async function onSubmit(data: FormValues) {
    console.log('[DEBUG] Dados do formulário:', data);
    
    // Validações adicionais
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    
    if (checkOutDate <= checkInDate) {
      toast("Erro na reserva", {
        description: "A data de check-out deve ser posterior à data de check-in.",
      });
      return;
    }
    
    // Calcular o número de noites
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calcular o preço total
    const pricePerNight = selectedRoom ? selectedRoom.price : 0;
    const totalPrice = pricePerNight * nights;
    
    if (totalPrice <= 0) {
      toast("Erro na reserva", {
        description: "Não foi possível calcular o preço. Por favor, tente novamente.",
      });
      return;
    }
    
    // Criar o objeto de reserva para SUA API
    const reservation = {
      guestName: `${data.firstName} ${data.lastName}`.trim(),
      contactEmail: data.email,
      contactPhone: data.phone,
      roomId: data.roomId,
      roomName: selectedRoom?.name || "",
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adults: parseInt(data.adults),
      children: parseInt(data.children),
      specialRequests: data.specialRequests,
      totalPrice
    };
    
    console.log('[DEBUG] Objeto de reserva:', reservation);
    
    try {
      // Usar SUA API em vez do dataService local
      const response = await apiService.createReservation(reservation);
      console.log('[DEBUG] Reserva criada via API:', response);
      
      setReservationId(response.reservationId);
      
      // Mostrar mensagem de sucesso com nova numeração
      toast("Reserva realizada com sucesso!", {
        description: `Sua reserva #${response.reservationId} foi registrada. Em breve entraremos em contato para confirmação.`,
      });
      
      // Atualizar o estado para mostrar a página de sucesso
      setReservationSuccess(true);
    } catch (error) {
      console.error('[DEBUG] Erro ao criar reserva via API:', error);
      
      toast("Erro ao processar reserva", {
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar sua reserva. Por favor, tente novamente.",
      });
    }
  }

  const today = new Date().toISOString().split('T')[0];
  
  const calculateTotalPrice = () => {
    if (selectedRoom && form.watch('checkIn') && form.watch('checkOut')) {
      try {
        const checkInDate = new Date(form.watch('checkIn'));
        const checkOutDate = new Date(form.watch('checkOut'));
        const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        if (days > 0) {
          return `R$ ${selectedRoom.price * days}`;
        }
      } catch (error) {
        console.error("[DEBUG] Erro ao calcular preço:", error);
      }
    }
    return "Selecione as datas";
  };
  
  return (
    <Layout>
      {!reservationSuccess ? (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-serif font-bold text-pousada-brown mb-6 text-center">
                Reserve sua Estadia
              </h1>
              <p className="text-center text-gray-700 mb-8">
                Complete o formulário abaixo para reservar sua acomodação na Pousada Recanto MD Olavio.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl font-serif text-pousada-brown">
                        Informações da Reserva
                      </CardTitle>
                      <CardDescription>
                        Preencha todos os campos para completar sua reserva
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Seu nome" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sobrenome</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Seu sobrenome" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-mail</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telefone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="roomId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Acomodação</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione sua acomodação" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {rooms.map((room) => (
                                      <SelectItem key={room.id} value={room.id}>
                                        {room.name} (R$ {room.price}/noite)
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="checkIn"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Data de Check-in</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center">
                                      <CalendarIcon className="mr-2 h-4 w-4 text-pousada-brown" />
                                      <Input 
                                        type="date" 
                                        min={today}
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="checkOut"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Data de Check-out</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center">
                                      <CalendarIcon className="mr-2 h-4 w-4 text-pousada-brown" />
                                      <Input 
                                        type="date" 
                                        min={form.watch('checkIn') || today}
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="adults"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Adultos</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                      <SelectItem value="5">5+</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="children"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Crianças</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="0">0</SelectItem>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4+</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="specialRequests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Solicitações Especiais</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Informe-nos sobre quaisquer necessidades ou pedidos especiais..."
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                            >
                              Finalizar Reserva
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-pousada-brown">
                        Resumo da Reserva
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedRoom ? (
                        <div>
                          <div className="aspect-video overflow-hidden rounded-md mb-4">
                            <img 
                              src={selectedRoom.image} 
                              alt={selectedRoom.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-serif font-semibold text-pousada-brown">{selectedRoom.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{selectedRoom.description}</p>
                          
                          <div className="border-t border-b py-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Acomodação:</span>
                              <span className="font-medium">R$ {selectedRoom.price} / noite</span>
                            </div>
                            
                            {form.watch('checkIn') && form.watch('checkOut') && (
                              <div className="flex justify-between">
                                <span>Total (estimado):</span>
                                <span className="font-semibold text-pousada-brown">
                                  {calculateTotalPrice()}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-600">
                            <p>Inclui café da manhã e taxas</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>Selecione uma acomodação para ver os detalhes da reserva.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Cancelamento flexível</h4>
                              <p className="text-sm text-gray-600">Cancelamentos gratuitos até 7 dias antes do check-in.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Pagamento seguro</h4>
                              <p className="text-sm text-gray-600">Suas informações de pagamento estão protegidas.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Suporte 24/7</h4>
                              <p className="text-sm text-gray-600">Nossa equipe está disponível para ajudá-lo a qualquer momento.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
                Reserva realizada com sucesso!
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Agradecemos por escolher o Recanto MD Olavio. Enviamos um e-mail de confirmação para você com todos os detalhes da sua reserva.
              </p>
              <div className="bg-pousada-cream bg-opacity-30 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-4">
                  Próximos Passos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Verifique seu e-mail para a confirmação da reserva</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Guarde o número de confirmação <strong>#{reservationId}</strong> para referência futura</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Prepare-se para uma estadia incrível no Recanto MD Olavio</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={() => setReservationSuccess(false)} 
                  variant="outline" 
                  className="border-pousada-brown text-pousada-brown hover:bg-pousada-cream"
                >
                  Fazer Nova Reserva
                </Button>
                <Button 
                  onClick={() => window.location.href = "/"} 
                  className="bg-pousada-brown hover:bg-pousada-dark text-white"
                >
                  Voltar à Página Inicial
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Reservas;