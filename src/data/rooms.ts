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
    image: "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80"
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
    name: "Chalé Cancún",
    description: "Chalé completo com 2 quartos, piscina privativa e churrasqueira.",
    fullDescription: [
      "O Recanto MD possui a opção de hospedagem. Temos como uma das opções o Chalé Cancún, essa acomodação possui 2 quartos e tem capacidade para até 8 adultos e 2 crianças.",
      "Entre os diferenciais da acomodação estão uma cozinha com fogão e geladeira, televisão de 43 polegadas, churrasqueira móvel e piscina privativa.",
      "Ambiente espaçoso e aconchegante, ideal para famílias numerosas ou grupos de amigos.",
      "Diárias variam de acordo com o número de pessoas."
    ],
    price: 120,
    capacity: {
      adults: 8,
      children: 2
    },
    size: 120,
    beds: "2 Quartos com múltiplas camas",
    image: "https://i.ibb.co/LzFQc9y5/IMG-20250615-WA0020.jpg",
    galleryImages: [
      "https://i.ibb.co/LzFQc9y5/IMG-20250615-WA0020.jpg",
      "https://i.ibb.co/MkMbfmzT/IMG-20250615-WA0021.jpg",
      "https://i.ibb.co/1J96tJx8/IMG-20250615-WA0022.jpg",
      "https://i.ibb.co/B2Sh9NV2/IMG-20250615-WA0023.jpg",
      "https://i.ibb.co/sdXfy9SW/IMG-20250615-WA0024.jpg",
      "https://i.ibb.co/twzdPbNg/IMG-20250615-WA0025.jpg",
      "https://i.ibb.co/C3VbC92f/IMG-20250615-WA0026.jpg",
      "https://i.ibb.co/QvW3CzLX/IMG-20250615-WA0027.jpg",
      "https://i.ibb.co/gMs7W0D2/IMG-20250615-WA0028.jpg",
      "https://i.ibb.co/d4m0sjf0/IMG-20250615-WA0029.jpg",
      "https://i.ibb.co/4ZBR5RzD/IMG-20250615-WA0030.jpg",
      "https://i.ibb.co/q39fJYRZ/IMG-20250615-WA0031.jpg"
    ],
    amenities: ["Wi-Fi", "TV 43\"", "Ar-condicionado", "Piscina Privativa", "Churrasqueira", "Cozinha Equipada", "Frigobar"],
    featured: true,
    priceOptions: [
      { people: 3, price: 260 },
      { people: 4, price: 200 },
      { people: 5, price: 200 },
      { people: 6, price: 200 },
      { people: 7, price: 180 },
      { people: 8, price: 120 }
    ]
  },
  {
    id: "suite-simples",
    name: "Suíte Simples",
    description: "O Recanto MD possui a opção de hospedagem Suíte Simples, ela comporta até 4 adultos e 1 criança.",
    fullDescription: [
      "O Recanto MD possui a opção de hospedagem Suíte Simples, ela comporta até 4 adultos e 1 criança.",
      "A suíte possui 1 cama de casal, 1 cama de solteiro, um sofá cama, um frigobar e um banheiro.",
      "Decoração simples e aconchegante, perfeita para uma estadia confortável na nossa pousada.",
      "Horário de check-in a partir das 10:30 e check-out até as 9:00."
    ],
    price: 350,
    capacity: {
      adults: 4,
      children: 1
    },
    size: 30,
    beds: "1 Cama de Casal, 1 Cama de Solteiro, 1 Sofá Cama",
    image: "https://i.ibb.co/XxQtcGWg/IMG-20250615-WA0013.jpg",
    galleryImages: [
      "https://i.ibb.co/W4RmpLvK/IMG-20250615-WA0010.jpg",
      "https://i.ibb.co/ZRt5FxK4/IMG-20250615-WA0011.jpg",
      "https://i.ibb.co/XxQtcGWg/IMG-20250615-WA0013.jpg",
      "https://i.ibb.co/r2NttsCc/IMG-20250615-WA0014.jpg",
      "https://i.ibb.co/yTXf0v8/IMG-20250615-WA0016.jpg",
      "https://i.ibb.co/PZLVZNqk/IMG-20250615-WA0017.jpg",
      "https://i.ibb.co/y10mpV5/IMG-20250615-WA0018.jpg",
      "https://i.ibb.co/pBxMMsmv/IMG-20250615-WA0019.jpg"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar"],
    featured: true,
    priceOptions: [
      { people: 1, price: 350 },
      { people: 2, price: 350 },
      { people: 4, price: 450 },
      { people: 5, price: 450 }
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
    image: "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
    ],
    amenities: ["Wi-Fi", "TV", "Ar-condicionado", "Frigobar", "Secador de cabelo"],
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
    image: "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
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
    image: "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581618047805-566c1709ba1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
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
    id: "day-use",
    name: "Day Use",
    description: "Curta um dia no Recanto MD! Você terá acesso às áreas comuns do sítio entre 9:00 e 17:00.",
    fullDescription: [
      "Curta um dia no Recanto MD! Você terá acesso às áreas comuns do sítio entre 9:00 e 17:00, com exceção das acomodações, academia, sauna e hidromassagem.",
      "Entrada somente com reserva antecipada. Envie uma mensagem e confira as regras.",
      "Aproveite nossa piscina, áreas de lazer, estacionamento e toda a estrutura de lazer do sítio.",
      "Ideal para quem quer relaxar e aproveitar um dia diferente em contato com a natureza."
    ],
    price: 35,
    capacity: {
      adults: 10,
      children: 5
    },
    size: 0,
    beds: "Sem acomodação",
    image: "https://i.ibb.co/zT4mQb1w/IMG-20250706-WA0023.jpg",
    galleryImages: [
      "https://i.ibb.co/zT4mQb1w/IMG-20250706-WA0023.jpg",
      "https://i.ibb.co/6cQRgDC1/IMG-20250706-WA0024.jpg",
      "https://i.ibb.co/B5r1LxHb/IMG-20250706-WA0025.jpg",
      "https://i.ibb.co/NgRKvKG8/IMG-20250706-WA0026.jpg"
    ],
    amenities: ["Piscina", "Áreas de Lazer", "Estacionamento", "Áreas Comuns", "Wi-Fi"],
    featured: true,
    priceOptions: [
      { people: 1, price: 35 }
    ]
  }
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find(room => room.id === id);
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter(room => room.featured);
}