import { useState } from "react";
import Layout from "@/components/Layout";
import RoomCard from "@/components/RoomCard";
import { rooms } from "@/data/rooms";

const Acomodacoes = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [capacity, setCapacity] = useState("all");

const handleFilter = (capacity: string) => {
    setCapacity(capacity);
    
  if (capacity === "all") {
    setFilteredRooms(rooms);
  } else {
    const capacityNum = parseInt(capacity);
      setFilteredRooms(rooms.filter(room => room.capacity >= capacityNum));
  }
};

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80")' }}>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Nossas Acomodações</h1>
              <p className="text-xl text-white mb-6">
                Descubra o refúgio perfeito para sua estadia. Cada quarto e chalé foi cuidadosamente projetado para oferecer conforto e tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-pousada-cream bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-2xl font-serif text-pousada-brown mb-4 md:mb-0">
              Encontre a acomodação ideal
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">Filtrar por capacidade:</div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleFilter("all")}
                  className={`px-4 py-2 rounded ${capacity === "all" ? "bg-pousada-brown text-white" : "bg-white text-pousada-dark border"}`}
                >
                  Todas
                </button>
                <button 
                  onClick={() => handleFilter("2")}
                  className={`px-4 py-2 rounded ${capacity === "2" ? "bg-pousada-brown text-white" : "bg-white text-pousada-dark border"}`}
                >
                  2+ pessoas
                </button>
                <button 
                  onClick={() => handleFilter("4")}
                  className={`px-4 py-2 rounded ${capacity === "4" ? "bg-pousada-brown text-white" : "bg-white text-pousada-dark border"}`}
                >
                  4+ pessoas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
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
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-serif text-pousada-brown mb-2">
                Nenhuma acomodação encontrada
              </h3>
              <p className="text-gray-700">
                Tente ajustar seus filtros ou entre em contato conosco para opções personalizadas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Chalé Cancún Section */}
      <section className="py-16 bg-pousada-cream bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-8 text-center">
              Chalé Cancún - Hospedagem Especial
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-4">Sobre o Chalé Cancún</h3>
                <p className="text-gray-700 mb-4">
                  O Recanto MD possui a opção de hospedagem. Temos como uma das opções o Chalé Cancún, essa acomodação 
                  possui 2 quartos e tem capacidade para até 8 adultos e 2 crianças. Entre os diferenciais da acomodação 
                  estão uma cozinha com fogão e geladeira, televisão de 43 polegadas, churrasqueira móvel e piscina privativa.
                </p>
                <p className="text-gray-700 mb-4">
                  Diárias variam de acordo com o número de pessoas, sendo:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-4">Diárias por Número de Pessoas</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">8 adultos:</span>
                      <span className="font-semibold text-pousada-brown">R$120 por pessoa/diária</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">7 adultos:</span>
                      <span className="font-semibold text-pousada-brown">R$180 por pessoa/diária</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">De 4 a 6 adultos:</span>
                      <span className="font-semibold text-pousada-brown">R$200 por pessoa/diária</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">3 adultos:</span>
                      <span className="font-semibold text-pousada-brown">R$260 por pessoa/diária</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-pousada-cream bg-opacity-50 rounded border-2 border-pousada-brown">
                      <span className="text-gray-700">Casal + 2 crianças:</span>
                      <span className="font-semibold text-pousada-brown">R$550 com café da manhã flutuante</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-4">Informações Adicionais</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-pousada-brown mb-2">Crianças</h4>
                      <p className="text-gray-700">Cada criança de 3 a 11 anos: R$70 por diária</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-pousada-brown mb-2">Diferenciais do Chalé</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Cozinha com fogão e geladeira</li>
                        <li>• TV de 43 polegadas</li>
                        <li>• Churrasqueira móvel</li>
                        <li>• Piscina privativa</li>
                        <li>• Capacidade: até 8 adultos + 2 crianças</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suíte Simples Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-8 text-center">
              Suíte Simples - Valores de Hospedagem
            </h2>
            <div className="bg-pousada-cream bg-opacity-20 rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-4">Sobre a Suíte Simples</h3>
                <p className="text-gray-700 mb-4">
                  O Recanto MD possui a opção de hospedagem Suíte Simples, ela comporta até 4 adultos e 1 criança. 
                  A suíte possui 1 cama de casal, 1 cama de solteiro, um sofá cama, um frigobar e um banheiro.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
                <div className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-serif font-semibold text-pousada-brown mb-3">1 Adulto</h3>
                  <p className="text-2xl font-bold text-pousada-brown">R$350,00</p>
                  <p className="text-gray-600">por diária</p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-serif font-semibold text-pousada-brown mb-3">1 Casal ou Casal com Criança até 11 anos</h3>
                  <p className="text-2xl font-bold text-pousada-brown">R$350,00</p>
                  <p className="text-gray-600">por diária</p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-serif font-semibold text-pousada-brown mb-3">3 ou 4 Adultos + 1 Criança até 11 anos</h3>
                  <p className="text-2xl font-bold text-pousada-brown">R$450,00</p>
                  <p className="text-gray-600">por diária</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-pousada-green bg-opacity-10 rounded-lg">
                <h4 className="font-semibold text-pousada-brown mb-2">Valor promocional para casal:</h4>
                <p className="text-lg font-semibold text-pousada-green">R$350,00 por diária</p>
              </div>
              
              <div className="text-center p-4 bg-pousada-brown bg-opacity-10 rounded-lg">
                <p className="text-pousada-brown font-semibold">
                  Horário de check-in a partir das 10:30 e check-out até as 9:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Use Section */}
      <section className="py-16 bg-pousada-cream bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-8 text-center">
              Day Use - Aproveite o Dia no Recanto MD
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Piscina do Recanto MD" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-semibold text-pousada-brown mb-4">Day Use</h3>
                    <div className="text-3xl font-bold text-pousada-brown mb-4">R$ 35,00</div>
                    <p className="text-gray-700 mb-4">
                      Curta um dia no Recanto MD! Você terá acesso às áreas comuns do sítio entre 9:00 e 17:00, com 
                      exceção das acomodações, academia, sauna e hidromassagem.
                    </p>
                    <p className="text-gray-600 text-sm mb-6">
                      Entrada somente com reserva antecipada. Envie uma mensagem e confira as regras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-pousada-cream bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-pousada-brown mb-6 text-center">
              Informações Importantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-3">Horários</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Check-in:</span> <span className="font-medium">10:00</span></li>
                  <li className="flex justify-between"><span>Check-out:</span> <span className="font-medium">até 12:00</span></li>
                  {/* <li className="flex justify-between"><span>Café da manhã:</span> <span className="font-medium">07:00 - 10:00</span></li> */}
                </ul>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mt-6 mb-3">Política de Cancelamento</h3>
                <p className="text-gray-700 mb-2">Cancelamentos gratuitos até 7 dias antes da data de check-in.</p>
                <p className="text-gray-700">Cancelamentos com menos de 7 dias de antecedência estão sujeitos a cobrança de uma diária.</p>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-3">Serviços Inclusos</h3>
                <ul className="space-y-2 text-gray-700">
                  {/*<li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg> */}
                    {/*Café da manhã completo */}
                  {/*</li>*/}
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Wi-Fi gratuito
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Estacionamento
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Acesso à piscina e áreas comuns
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Passeio guiado pela propriedade
                  </li>
                </ul>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mt-6 mb-3">Serviços Opcionais</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Espaço do vinho</li>
                  <li>Passeios personalizados</li>
                  <li>Mini fazendinha</li>
                  <li>Quadras Esportivas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Acomodacoes;