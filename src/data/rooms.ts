
export interface Room {
  id: string;
  name: string;
  description: string;
  fullDescription: string[];
  price: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: number;
  beds: string;
  image: string;
  galleryImages: string[];
  amenities: string[];
  featured: boolean;
  priceOptions?: {
    people: number;
    price: number;
  }[];
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
    capacity: {
      adults: 2,
      children: 0
    },
    size: 45,
    beds: "1 Cama King",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Wi-Fi", "TV 4K", "Ar-condicionado", "Banheira", "Varanda", "Café da manhã", "Frigobar", "Secador de cabelo"],
    featured: true,
    priceOptions: [
      { people: 1, price: 550 },
      { people: 2, price: 650 }
    ]
  },
  {
    id: "chale-familia",
    name: "Chalé Família",
    description: "Chalé completo com 2 quartos, piscina privativa e churrasqueira.",
    fullDescription: [
      "Nosso Chalé Família é a acomodação perfeita para quem viaja com família ou grupos de amigos.",
      "Contém 2 quartos completos com cama de casal, 2 beliches, 1 cama de solteiro, 1 cama auxiliar de solteiro e 1 sofá cama de casal.",
      "Possui banheiro completo, cozinha equipada, churrasqueira privativa e piscina exclusiva para seu aproveitamento total.",
      "Ambiente espaçoso e aconchegante, ideal para famílias numerosas ou grupos de amigos com capacidade para 8 adultos e 2 crianças."
    ],
    price: 1200,
    capacity: {
      adults: 8,
      children: 2
    },
    size: 120,
    beds: "1 Cama de Casal, 2 Beliches, 1 Cama de Solteiro, 1 Cama Auxiliar, 1 Sofá Cama Casal",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1501685532562-aa6846b353e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Piscina Privativa", "Churrasqueira", "Cozinha Equipada", "Café da manhã", "Estacionamento"],
    featured: true,
    priceOptions: [
      { people: 4, price: 800 },
      { people: 6, price: 1000 },
      { people: 8, price: 1200 },
      { people: 10, price: 1400 }
    ]
  },
  {
    id: "suite-standard",
    name: "Suíte Standard",
    description: "Quarto amplo com frigobar e capacidade para toda a família.",
    fullDescription: [
      "Nossa Suíte Standard oferece um quarto amplo e confortável para sua estadia.",
      "Acomodação com 1 cama de casal, 1 cama de solteiro e 1 sofá cama casal, ideal para famílias.",
      "Possui frigobar e banheiro privativo, além de todo o conforto para até 5 pessoas.",
      "Decoração simples e aconchegante, perfeita para uma estadia confortável na nossa pousada."
    ],
    price: 550,
    capacity: {
      adults: 4,
      children: 1
    },
    size: 35,
    beds: "1 Cama de Casal, 1 Cama de Solteiro, 1 Sofá Cama Casal",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Café da manhã", "Frigobar", "Secador de cabelo"],
    featured: false,
    priceOptions: [
      { people: 2, price: 450 },
      { people: 3, price: 500 },
      { people: 4, price: 550 },
      { people: 5, price: 600 }
    ]
  },
  {
    id: "suite-caribe",
    name: "Suíte Caribe",
    description: "Suíte exclusiva com piscina privativa de vidro e TV de 65 polegadas.",
    fullDescription: [
      "Nossa Suíte Caribe é perfeita para casais em busca de privacidade e conforto premium.",
      "Acomodação com cama king size, televisão de 65 polegadas e ar condicionado.",
      "Banheiro sofisticado, frigobar abastecido e piscina privativa de vidro para momentos únicos.",
      "Ideal para casais, com a possibilidade de acomodar uma criança menor de 3 anos."
    ],
    price: 850,
    capacity: {
      adults: 2,
      children: 1
    },
    size: 40,
    beds: "1 Cama King Size",
    image: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
      "https://images.unsplash.com/photo-1533154983518-ecd9a8f80583?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    ],
    amenities: ["Wi-Fi", "TV 65\"", "Ar-condicionado", "Piscina Privativa de Vidro", "Frigobar", "Secador de cabelo"],
    featured: true,
    priceOptions: [
      { people: 1, price: 750 },
      { people: 2, price: 850 },
      { people: 3, price: 900 }
    ]
  },
  {
    id: "suite-bahamas",
    name: "Suíte Bahamas",
    description: "Suíte exclusiva com piscina privativa de vidro e TV de 65 polegadas.",
    fullDescription: [
      "Nossa Suíte Bahamas é perfeita para casais em busca de privacidade e conforto premium.",
      "Acomodação com cama king size, televisão de 65 polegadas e ar condicionado.",
      "Banheiro sofisticado, frigobar abastecido e piscina privativa de vidro para momentos únicos.",
      "Ideal para casais, com a possibilidade de acomodar uma criança menor de 3 anos."
    ],
    price: 850,
    capacity: {
      adults: 2,
      children: 1
    },
    size: 40,
    beds: "1 Cama King Size",
    image: "https://images.unsplash.com/photo-1617974649697-75762ed6489a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1617974649697-75762ed6489a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1533154983518-ecd9a8f80583?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    ],
    amenities: ["Wi-Fi", "TV 65\"", "Ar-condicionado", "Piscina Privativa de Vidro", "Frigobar", "Secador de cabelo"],
    featured: true,
    priceOptions: [
      { people: 1, price: 750 },
      { people: 2, price: 850 },
      { people: 3, price: 900 }
    ]
  }
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find(room => room.id === id);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter(room => room.featured);
}
