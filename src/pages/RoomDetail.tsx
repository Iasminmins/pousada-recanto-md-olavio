
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, User, Home } from "lucide-react";
import Layout from "@/components/Layout";
import { getRoomById, Room, rooms } from "@/data/rooms";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const foundRoom = getRoomById(id);
      if (foundRoom) {
        setRoom(foundRoom);
        setCurrentPrice(foundRoom.price);
        
        // Set default selected people to the base capacity
        if (foundRoom.capacity) {
          const defaultPeople = foundRoom.capacity.adults;
          setSelectedPeople(defaultPeople);
          
          // Find the matching price option
          if (foundRoom.priceOptions) {
            const priceOption = foundRoom.priceOptions.find(option => option.people === defaultPeople);
            if (priceOption) {
              setCurrentPrice(priceOption.price);
            }
          }
        }
      } else {
        setNotFound(true);
      }
    }
  }, [id]);

  const nextImage = () => {
    if (room) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.galleryImages.length);
    }
  };

  const prevImage = () => {
    if (room) {
      setCurrentImageIndex((prevIndex) => prevIndex === 0 ? room.galleryImages.length - 1 : prevIndex - 1);
    }
  };
  
  const handlePeopleChange = (people: number) => {
    setSelectedPeople(people);
    
    if (room?.priceOptions) {
      const priceOption = room.priceOptions.find(option => option.people === people);
      if (priceOption) {
        setCurrentPrice(priceOption.price);
      } else {
        setCurrentPrice(room.price);
      }
    }
  };

  const otherRooms = room ? rooms.filter(r => r.id !== room.id).slice(0, 3) : [];

  if (notFound) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold text-pousada-blue mb-4">
                Acomodação não encontrada
              </h1>
              <p className="text-gray-700 mb-8">
                A acomodação que você está procurando não está disponível.
              </p>
              <Link to="/acomodacoes">
                <Button className="bg-pousada-blue hover:bg-pousada-dark text-white">
                  Ver Todas as Acomodações
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold text-pousada-blue mb-4">
                Carregando...
              </h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-700 hover:text-pousada-blue">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link to="/acomodacoes" className="ml-1 text-gray-700 hover:text-pousada-blue md:ml-2">Acomodações</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-gray-500 md:ml-2">{room.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Room Title */}
          <h1 className="text-3xl font-serif font-bold text-pousada-blue mb-2">
            {room.name}
          </h1>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
              {/* Photo Gallery */}
              <div className="relative rounded-lg overflow-hidden mb-8">
                <div className="aspect-w-16 aspect-h-9 h-[500px]">
                  <img 
                    src={room.galleryImages[currentImageIndex]} 
                    alt={room.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-4">
                  <button 
                    onClick={prevImage}
                    className="bg-black bg-opacity-30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-50"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="bg-black bg-opacity-30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-50"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {room.galleryImages.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Room Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-pousada-blue mb-4">
                  Descrição
                </h2>
                {room.fullDescription.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-pousada-blue mb-4">
                  Comodidades
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-pousada-blue mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-serif font-semibold text-pousada-blue">
                    R$ {currentPrice}
                  </span>
                  <span className="text-gray-600">por noite</span>
                </div>
                
                {/* People Selection */}
                {room.priceOptions && room.priceOptions.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecione a quantidade de pessoas:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {room.priceOptions.map((option) => (
                        <button
                          key={option.people}
                          onClick={() => handlePeopleChange(option.people)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors
                            ${selectedPeople === option.people 
                              ? 'bg-pousada-blue text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {option.people} {option.people === 1 ? 'pessoa' : 'pessoas'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-pousada-blue mt-1" />
                    <div>
                      <p className="font-medium">Capacidade</p>
                      <p className="text-sm text-gray-600">
                        {room.capacity.adults} {room.capacity.adults > 1 ? 'adultos' : 'adulto'}
                        {room.capacity.children > 0 && `, ${room.capacity.children} ${room.capacity.children > 1 ? 'crianças' : 'criança'}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Home className="h-5 w-5 text-pousada-blue mt-1" />
                    <div>
                      <p className="font-medium">Tamanho</p>
                      <p className="text-sm text-gray-600">{room.size} m²</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-pousada-blue mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <p className="font-medium">Camas</p>
                      <p className="text-sm text-gray-600">{room.beds}</p>
                    </div>
                  </div>
                </div>
                
                <Link to={`/reservas?room=${room.id}&people=${selectedPeople}`}>
                  <Button className="w-full bg-pousada-blue hover:bg-pousada-dark text-white mb-4">
                    <Calendar className="mr-2 h-5 w-5" />
                    Reservar Agora
                  </Button>
                </Link>
                
                <div className="flex flex-col space-y-3 text-sm">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span>Café da manhã incluso</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span>Cancelamento gratuito até 7 dias antes</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span>Pagamento na chegada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Rooms */}
          {otherRooms.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-semibold text-pousada-blue mb-6">
                Outras Acomodações que Você Pode Gostar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherRooms.map((room) => (
                  <div key={room.id} className="border rounded-lg overflow-hidden shadow-md bg-white group">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-semibold text-pousada-blue mb-2">{room.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-pousada-blue">
                          <span className="text-lg font-semibold">R$ {room.price}</span>
                          <span className="text-xs text-gray-500"> /noite</span>
                        </div>
                        <Link to={`/acomodacoes/${room.id}`}>
                          <Button variant="outline" size="sm" className="border-pousada-blue text-pousada-blue hover:bg-accent">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetail;
