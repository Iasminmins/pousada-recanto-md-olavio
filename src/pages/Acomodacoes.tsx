
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
                  <li className="flex justify-between"><span>Check-in:</span> <span className="font-medium">14:00 - 22:00</span></li>
                  <li className="flex justify-between"><span>Check-out:</span> <span className="font-medium">até 12:00</span></li>
                  <li className="flex justify-between"><span>Café da manhã:</span> <span className="font-medium">07:00 - 10:00</span></li>
                </ul>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mt-6 mb-3">Política de Cancelamento</h3>
                <p className="text-gray-700 mb-2">Cancelamentos gratuitos até 7 dias antes da data de check-in.</p>
                <p className="text-gray-700">Cancelamentos com menos de 7 dias de antecedência estão sujeitos a cobrança de uma diária.</p>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-3">Serviços Inclusos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-pousada-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Café da manhã completo
                  </li>
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
                  <li>Massagens e tratamentos de spa</li>
                  <li>Passeios personalizados</li>
                  <li>Jantares especiais</li>
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
