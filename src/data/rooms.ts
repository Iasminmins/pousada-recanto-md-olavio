
export interface Room {
  id: string;
  name: string;
  description: string;
  fullDescription: string[];
  price: number;
  capacity: number;
  size: number;
  beds: string;
  image: string;
  galleryImages: string[];
  amenities: string[];
  featured: boolean;
}

export const rooms: Room[] = [
  {
    id: "suite-luxo",
    name: "Suíte Luxo",
    description: "Uma suíte espaçosa com varanda privativa e vista para as montanhas.",
    fullDescription: [
      "Nossa Suíte Luxo oferece uma experiência premium com decoração sofisticada em estilo rústico e elegante.",
      "Desfrute de uma varanda privativa com vista panorâmica para as montanhas, perfeita para relaxar ao entardecer.",
      "O espaço amplo inclui uma área de estar confortável e uma cama king-size com lençóis de alta qualidade para garantir noites de sono perfeitas.",
      "O banheiro luxuoso possui banheira de hidromassagem e amenidades premium para complementar sua estadia."
    ],
    price: 650,
    capacity: 2,
    size: 45,
    beds: "1 Cama King",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Wi-Fi", "TV 4K", "Ar-condicionado", "Banheira", "Varanda", "Café da manhã", "Frigobar", "Secador de cabelo"],
    featured: true
  },
  {
    id: "chalé-familia",
    name: "Chalé Família",
    description: "Espaçoso chalé ideal para famílias, com dois quartos e área de estar.",
    fullDescription: [
      "Nosso Chalé Família é a acomodação perfeita para quem viaja com crianças ou em grupos pequenos.",
      "Com dois quartos confortáveis, o chalé oferece privacidade e conforto para todos os hóspedes.",
      "A área de estar comum é aconchegante e ideal para momentos de convivência, com lareira para os dias mais frios.",
      "A pequena cozinha equipada permite preparar refeições leves, tornando a estadia ainda mais prática para famílias."
    ],
    price: 850,
    capacity: 4,
    size: 75,
    beds: "1 Cama Queen e 2 Camas de Solteiro",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1501685532562-aa6846b353e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Lareira", "Mini Cozinha", "Café da manhã", "Varanda", "Secador de cabelo"],
    featured: true
  },
  {
    id: "cabana-rustica",
    name: "Cabana Rústica",
    description: "Cabana aconchegante em meio à natureza, perfeita para um refúgio romântico.",
    fullDescription: [
      "Nossa Cabana Rústica é um refúgio perfeito para casais em busca de privacidade e romantismo.",
      "Construída com madeira de lei e decorada com elementos artesanais locais, a cabana oferece uma experiência autêntica.",
      "A localização isolada, cercada por vegetação nativa, proporciona tranquilidade e contato com a natureza.",
      "O deck externo privativo é perfeito para observar o céu estrelado ou tomar um café da manhã ao ar livre."
    ],
    price: 550,
    capacity: 2,
    size: 35,
    beds: "1 Cama Queen",
    image: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
      "https://images.unsplash.com/photo-1533154983518-ecd9a8f80583?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      "https://images.unsplash.com/photo-1617974649697-75762ed6489a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Lareira", "Deck Privativo", "Café da manhã", "Frigobar", "Chuveiro Externo", "Rede"],
    featured: false
  },
  {
    id: "quarto-standard",
    name: "Quarto Standard",
    description: "Quarto confortável com todas as comodidades essenciais para uma estadia agradável.",
    fullDescription: [
      "Nosso Quarto Standard oferece todo o conforto necessário para uma estadia agradável na fazenda.",
      "Decorado com simplicidade e elegância, o quarto possui uma cama confortável e um pequeno espaço de trabalho.",
      "A janela ampla permite boa iluminação natural e vista para os jardins da propriedade.",
      "Perfeito para viajantes que buscam praticidade sem abrir mão do conforto característico da nossa pousada."
    ],
    price: 380,
    capacity: 2,
    size: 28,
    beds: "1 Cama Queen ou 2 Camas de Solteiro",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Café da manhã", "Secador de cabelo"],
    featured: false
  }
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find(room => room.id === id);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter(room => room.featured);
}
