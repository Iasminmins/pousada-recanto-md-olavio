import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, House, MapPin } from "lucide-react";
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
import Layout from "@/components/Layout";
import RoomCard from "@/components/RoomCard";
import { getFeaturedRooms } from "@/data/rooms";

const Index = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  
  const featuredRooms = getFeaturedRooms();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1750508961186-d2cbd3376fbb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">Recanto MD Olavio</h1>
              <p className="text-xl md:text-2xl text-white mb-6">
                Um refúgio encantador em meio à natureza, onde tranquilidade e conforto se encontram para proporcionar uma experiência inesquecível.
              </p>
              <Button size="lg" className="bg-pousada-brown hover:bg-pousada-dark text-white">
                Faça sua Reserva
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Widget */}
      <section className="relative -mt-20 z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <Tabs defaultValue="reserva" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="reserva" className="flex-1 font-medium">
                  <Calendar className="mr-2 h-5 w-5" /> Reservar Estadia
                </TabsTrigger>
                <TabsTrigger value="pacotes" className="flex-1 font-medium">
                  <House className="mr-2 h-5 w-5" /> Pacotes Especiais
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reserva">
                <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Check-in</label>
                    <Input 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">Check-out</label>
                    <Input 
                      type="date" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
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
                  
                  <Button 
                  className="w-full bg-pousada-brown hover:bg-pousada-dark text-white"
                  onClick={() => {
                    // Validação das datas
                    if (!checkInDate || !checkOutDate) {
                      alert('Por favor, preencha as datas de check-in e check-out');
                      return;
                    }

                    // Verifica se check-out é posterior ao check-in
                    if (new Date(checkOutDate) <= new Date(checkInDate)) {
                      alert('A data de check-out deve ser posterior ao check-in');
                      return;
                    }

                    // Cria a mensagem para o WhatsApp
                    const message = `Olá, Recanto MD Olavio! Gostaria de verificar disponibilidade:
                    
                    📅 Check-in: ${checkInDate}
                    📅 Check-out: ${checkOutDate}
                    👨‍👩‍👧‍👦 Adultos: ${adults}
                    👧 Crianças: ${children}`;

                    // Abre o WhatsApp
                    window.open(`https://wa.me/5521971864896?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  Verificar Disponibilidade
                </Button>
                </form>
              </TabsContent>
              <TabsContent value="pacotes">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded p-4 bg-gray-50">
                    <h4 className="font-serif text-lg font-medium mb-2">Pacote Romântico</h4>
                    <p className="text-sm mb-2">2 noites com café da manhã, jantar romântico e massagem para casal.</p>
                    <div className="text-pousada-brown font-semibold mb-2">R$ 1.200</div>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Reservar Pacote
                    </Button>
                  </div>
                  <div className="border rounded p-4 bg-gray-50">
                    <h4 className="font-serif text-lg font-medium mb-2">Pacote Família</h4>
                    <p className="text-sm mb-2">3 noites com café da manhã, passeio na fazenda e atividades para crianças.</p>
                    <div className="text-pousada-brown font-semibold mb-2">R$ 2.400</div>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Reservar Pacote
                    </Button>
                  </div>
                  <div className="border rounded p-4 bg-gray-50">
                    <h4 className="font-serif text-lg font-medium mb-2">Pacote Relax</h4>
                    <p className="text-sm mb-2">2 noites com café da manhã, acesso ao spa e tratamentos relaxantes.</p>
                    <div className="text-pousada-brown font-semibold mb-2">R$ 1.500</div>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Reservar Pacote
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* About Section - Fundo Branco */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
                Bem-vindo ao Recanto MD Olavio
              </h2>
              <p className="text-gray-700 mb-4">
                Localizado em meio às belas paisagens naturais, nosso refúgio combina o charme rústico com o conforto moderno. Cada detalhe foi cuidadosamente pensado para proporcionar uma experiência inesquecível aos nossos hóspedes.
              </p>
              <p className="text-gray-700 mb-4">
                Nossa pousada está situada em uma propriedade de 15 hectares, com trilhas naturais, riachos, hortas orgânicas e vistas deslumbrantes das montanhas. Um verdadeiro paraíso para quem busca tranquilidade e conexão com a natureza.
              </p>
              <p className="text-gray-700 mb-6">
                Oferecemos diversas experiências para nossos hóspedes, desde passeios guiados pela propriedade até workshops de gastronomia local com ingredientes da nossa horta.
              </p>
              <Link to="/sobre">
                {/*<Button variant="outline" className="border-pousada-brown text-pousada-brown hover:bg-pousada-cream">
                  Conheça Nossa História
                </Button>*/}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://i.postimg.cc/YpFVGQjW/Imagem-do-Whats-App-de-2025-06-21-s-09-54-52-1cc7e305.jpg" 
                    alt="Pousada Serena" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://i.postimg.cc/d336tbNg/Imagem-do-Whats-App-de-2025-06-21-s-09-54-54-d43df472.jpg" 
                    alt="Paisagem da pousada" 
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://i.postimg.cc/Bv5Mhc17/Imagem-do-Whats-App-de-2025-06-21-s-09-54-55-dcbf3ba8.jpg" 
                    alt="Detalhes da pousada" 
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://i.postimg.cc/0xNpQPzY/Imagem-do-Whats-App-de-2025-06-21-s-10-11-45-880692fb.jpg" 
                    alt="Café da manhã" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accommodations - Fundo Cinza Claro */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
              Nossas Acomodações em Destaque
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Oferecemos uma variedade de acomodações para atender às necessidades de todos os nossos hóspedes, 
              desde quartos confortáveis até chalés exclusivos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard 
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description}
                price={room.price}
                capacity={room.capacity}
                image={room.image}
                amenities={room.amenities}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/acomodacoes">
              <Button variant="outline" className="border-pousada-brown text-pousada-brown hover:bg-white">
                Ver Todas as Acomodações
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences Section - Fundo Branco */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
              Experiências Únicas
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Descubra experiências exclusivas que tornarão sua estadia inesquecível, desde atividades ao ar livre até momentos de puro relaxamento.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src="https://i.ibb.co/VpzZGnN0/Imagem-do-Whats-App-de-2025-07-06-s-23-28-48-94fa9714.jpg" 
                  alt="Trilha" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Trilha</h3>
              <p className="text-gray-700 mb-4">
                Explore nossa trilha ecológica em meio à natureza exuberante, descobrindo a fauna e flora local com vistas deslumbrantes da região e momentos únicos de conexão com o ambiente natural.
              </p>
              <Link to="/experiencias/trilha">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src="https://i.ibb.co/fgDkzrQ/Imagem-do-Whats-App-de-2025-07-06-s-23-28-48-efd89a3a.jpg" 
                  alt="Pesca Esportiva" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Pesca Esportiva</h3>
              <p className="text-gray-700 mb-4">
                Desfrute de momentos relaxantes no nosso lago para pesca esportiva, um ambiente tranquilo e bem estruturado, perfeito para pescadores iniciantes e experientes aproveitarem a natureza.
              </p>
              <Link to="/experiencias/pesca">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src="https://i.ibb.co/xKZx6Wwf/Imagem-do-Whats-App-de-2025-07-06-s-23-28-48-447218e4.jpg" 
                  alt="Área de Jogos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Área de Jogos</h3>
              <p className="text-gray-700 mb-4">
                Divirta-se em nossa área de jogos com mesa de sinuca, pebolim e outros entretenimentos. Um espaço perfeito para momentos de descontração em família ou com amigos.
              </p>
              <Link to="/experiencias/jogos">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Fundo Cinza Claro */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
              O que Dizem Nossos Hóspedes
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Descubra por que nossos hóspedes se apaixonam pelo Recanto MD Olavio e retornam ano após ano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Maria S." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Maria S.</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Momentos mágicos em um lugar especial. A atenção aos detalhes, o atendimento caloroso e as acomodações perfeitas fizeram nossa lua de mel inesquecível."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Carlos R." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Carlos R.</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"As crianças adoraram o contato com a natureza e os animais da fazenda. O chalé Cancún é espaçoso, confortável e perfeito para viagens em família. Voltaremos com certeza!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Ana P." 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Ana P.</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"O café da manhã é simplesmente extraordinário, com produtos frescos e caseiros. A cabana rústica nos proporcionou privacidade e um clima romântico perfeito."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location - Fundo Branco */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-4">
                Localização Privilegiada
              </h2>
              <p className="text-gray-700 mb-4">
                O Recanto MD Olavio está localizado em uma área de rara beleza natural, a apenas 15 minutos do centro da cidade e a 30 minutos das principais atrações da região.
              </p>
              <div className="flex items-start space-x-2 mb-4">
                <MapPin className="h-5 w-5 mt-0.5 text-pousada-brown" />
                <p className="text-gray-700">
                  R. Trinta e Dois - Agro Brasil<br />
                  Itaboraí - RJ<br />
                  CEP 24842-590
                </p>
              </div>
              <Button 
                className="bg-pousada-brown hover:bg-pousada-dark text-white"
                onClick={() => window.open(`https://wa.me/5521971864896?text=Olá,%20gostaria%20de%20saber%20como%20chegar%20na%20pousada`)}
              >
                Como Chegar
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7363.700543369056!2d-42.7856696418335!3d-22.65937048506527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99c59610e8df4b%3A0x58a808fa6922e546!2sRecanto%20MD!5e0!3m2!1spt-BR!2sbr!4v1747420868422!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Recanto MD"
            />
          </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Mantém cor original para destaque */}
      <section className="py-16 bg-pousada-brown">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Receba Nossas Novidades
            </h2>
            <p className="mb-6">
              Inscreva-se para receber ofertas exclusivas, dicas de viagem e novidades do Recanto MD Olavio.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-grow text-black"
              />
              <Button className="bg-white hover:bg-pousada-cream text-pousada-brown">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;