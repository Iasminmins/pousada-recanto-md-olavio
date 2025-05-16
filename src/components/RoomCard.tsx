
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: {
    adults: number;
    children: number;
  };
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
        <h3 className="text-xl font-serif font-semibold text-pousada-blue mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 flex items-center">
            <Users size={16} className="mr-1" />
            <span>
              {capacity.adults} {capacity.adults > 1 ? 'adultos' : 'adulto'}
              {capacity.children > 0 && `, ${capacity.children} ${capacity.children > 1 ? 'crianças' : 'criança'}`}
            </span>
          </div>
          <div className="flex space-x-1">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-pousada-blue">
            <span className="text-xl font-semibold">R$ {price}</span>
            <span className="text-sm text-gray-500"> /noite</span>
          </div>
          <div className="flex space-x-2">
            <Link to={`/acomodacoes/${id}`}>
              <Button variant="outline" className="border-pousada-blue text-pousada-blue hover:bg-accent">
                Detalhes
              </Button>
            </Link>
            <Link to={`/reservas?room=${id}`}>
              <Button className="bg-pousada-blue hover:bg-pousada-dark text-white">
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
