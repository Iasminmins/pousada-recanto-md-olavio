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
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")' }}>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">Recanto MD Olavio</h1>
              <p className="text-xl md:text-2xl text-white mb-6">
                Um refúgio encantador em meio à natureza, onde tranquilidade e conforto se encontram para proporcionar uma experiência inesquecível.
              </p>
              <Button size="lg" className="bg-pousada-brown hover:bg-pousada-dark text-white">
                Conheça Nossa História
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
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1">&nbsp;</label>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Verificar Disponibilidade
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="pacotes">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
                    <h4 className="font-serif text-lg font-medium mb-2">Pacote Romântico</h4>
                    <p className="text-sm mb-2">2 noites com café da manhã, jantar romântico e massagem para casal.</p>
                    <div className="text-pousada-brown font-semibold mb-2">R$ 1.200</div>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Reservar Pacote
                    </Button>
                  </div>
                  <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
                    <h4 className="font-serif text-lg font-medium mb-2">Pacote Família</h4>
                    <p className="text-sm mb-2">3 noites com café da manhã, passeio na fazenda e atividades para crianças.</p>
                    <div className="text-pousada-brown font-semibold mb-2">R$ 2.400</div>
                    <Button className="w-full bg-pousada-brown hover:bg-pousada-dark text-white">
                      Reservar Pacote
                    </Button>
                  </div>
                  <div className="border rounded p-4 bg-pousada-cream bg-opacity-30">
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

      {/* About Section */}
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
                <Button variant="outline" className="border-pousada-brown text-pousada-brown hover:bg-pousada-cream">
                  Conheça Nossa História
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Pousada Serena" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Paisagem da pousada" 
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1527142879-95b61a0916cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Detalhes da pousada" 
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1542352567-59ac92615aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Café da manhã" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accommodations */}
      <section className="py-16 bg-pousada-cream bg-opacity-30">
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

      {/* Experiences Section */}
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
                  src="https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Gastronomia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Gastronomia</h3>
              <p className="text-gray-700 mb-4">
                Nossa cozinha utiliza ingredientes frescos da horta orgânica da propriedade para criar pratos deliciosos que revelam os sabores autênticos da região.
              </p>
              <Link to="/experiencias/gastronomia">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1464518329099-e147d52dfdca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Passeios" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Passeios</h3>
              <p className="text-gray-700 mb-4">
                Explore trilhas exclusivas, cachoeiras secretas e paisagens deslumbrantes com nossos guias experientes que conhecem cada canto da região.
              </p>
              <Link to="/experiencias/passeios">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Bem-estar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">Bem-estar</h3>
              <p className="text-gray-700 mb-4">
                Renove suas energias com massagens relaxantes, banhos de ofurô ao ar livre e sessões de yoga em meio à natureza exuberante.
              </p>
              <Link to="/experiencias/bem-estar">
                <Button variant="link" className="p-0 text-pousada-brown hover:text-pousada-dark">
                  Saiba mais →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-pousada-green bg-opacity-10">
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
              <p className="text-gray-700 italic">"As crianças adoraram o contato com a natureza e os animais da fazenda. O chalé família é espaçoso, confortável e perfeito para viagens em família. Voltaremos com certeza!"</p>
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

      {/* Location */}
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
                  Estrada das Flores, Km 5<br />
                  Campos do Jordão, SP<br />
                  CEP 12345-678
                </p>
              </div>
              <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                Como Chegar
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1505974212839-c0fea86d42ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Localização da pousada" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
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
