
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
}

const RoomCard = ({ id, name, description, price, capacity, image, amenities }: RoomCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white group">
      <div className="relative overflow-hidden h-60">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold text-pousada-brown mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            <span>Capacidade: {capacity} pessoas</span>
          </div>
          <div className="flex space-x-1">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="bg-pousada-cream text-pousada-dark text-xs px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-pousada-brown">
            <span className="text-xl font-semibold">R$ {price}</span>
            <span className="text-sm text-gray-500"> /noite</span>
          </div>
          <div className="flex space-x-2">
            <Link to={`/acomodacoes/${id}`}>
              <Button variant="outline" className="border-pousada-brown text-pousada-brown hover:bg-pousada-cream">
                Detalhes
              </Button>
            </Link>
            <Link to={`/reservas?room=${id}`}>
              <Button className="bg-pousada-brown hover:bg-pousada-dark text-white">
                <Calendar className="mr-2 h-4 w-4" /> Reservar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
