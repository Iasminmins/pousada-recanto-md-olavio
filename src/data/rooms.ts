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
    id: "chale-familia",
    name: "Chalé Cancún",
    description: "Chalé completo com 2 quartos, piscina privativa e churrasqueira.",
    fullDescription: [
      "O Recanto MD possui a opção de hospedagem. Temos como uma das opções o Chalé Cancún, essa acomodação possui 2 quartos e tem capacidade para até 8 adultos e 2 crianças.",
      "Entre os diferenciais da acomodação estão uma cozinha com fogão e geladeira, televisão de 43 polegadas, churrasqueira móvel e piscina privativa.",
      "Ambiente espaçoso e aconchegante, ideal para famílias numerosas ou grupos de amigos.",
      "Diárias variam de acordo com o número de pessoas."
    ],
    price: 1200,
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
    { "people": 3, "price": 2600 },
    { "people": 4, "price": 2600 },
    { "people": 5, "price": 3000 },
    { "people": 6, "price": 3400 },
    { "people": 7, "price": 3800 },
    { "people": 8, "price": 3800 }
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
    price: 450,
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
    amenities: ["Wi-Fi", "Ar-condicionado", "Frigobar"],
    featured: true,
    priceOptions: [
      { people: 1, price: 350 },
      { people: 2, price: 350 },
      { people: 4, price: 450 },
      { people: 5, price: 450 }
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
      "Ideal para casais que buscam uma experiência exclusiva e romântica."
    ],
    price: 650,
    capacity: {
      adults: 2,
      children: 0
    },
    size: 40,
    beds: "1 Cama King Size",
    image: "https://i.ibb.co/KprstXnx/Whats-App-Image-2025-09-22-at-14-02-56.jpg",
    galleryImages: [
        "https://i.ibb.co/1t2RnT9V/Whats-App-Image-2025-09-22-at-14-02-56-1.jpg",
        "https://i.ibb.co/9Hgyhkbd/Whats-App-Image-2025-09-22-at-14-02-56-2.jpg", 
        "https://i.ibb.co/cSdTZPvG/whats-App-Image-2025-09-22-at-14-02-57.jpg",
        "https://i.ibb.co/hFgMLTZs/Whats-App-Image-2025-09-22-at-14-02-57-1.jpg",
        "https://i.ibb.co/WNGKryKc/Whats-App-Image-2025-09-22-at-14-02-57-2.jpg",
        "https://i.ibb.co/RT2hLmm3/Whats-App-Image-2025-09-22-at-14-02-57-3.jpg"
    ],
    amenities: ["Wi-Fi", "TV 65\"", "Ar-condicionado", "Piscina Privativa de Vidro", "Frigobar", "Secador de cabelo"],
    featured: true,
    priceOptions: [
      { people: 1, price: 570 },
      { people: 2, price: 650 }
    ]
  },
  {
    id: "suite-bahamas",
    name: "Suíte Bahamas",
    description: "Suíte exclusiva com piscina privativa de vidro e TV de 55 polegadas.",
    fullDescription: [
      "Nossa Suíte Bahamas é perfeita para casais em busca de privacidade e conforto premium.",
      "Acomodação com cama king size, televisão de 55 polegadas e ar condicionado.",
      "Banheiro sofisticado, frigobar abastecido e piscina privativa de vidro para momentos únicos.",
      "Ideal para casais que buscam uma experiência exclusiva e romântica."
    ],
    price: 650,
    capacity: {
      adults: 2,
      children: 0
    },
    size: 40,
    beds: "1 Cama King Size",
    image: "https://i.ibb.co/LXXL8RZh/Whats-App-Image-2025-09-22-at-13-48-28.jpg",
    galleryImages: [
      "https://i.ibb.co/vxSW73jD/Whats-App-Image-2025-09-22-at-13-48-28-1.jpg",
      "https://i.ibb.co/yBVrvjPm/Whats-App-Image-2025-09-22-at-13-48-28-2.jpg",
      "https://i.ibb.co/20716P52/Whats-App-Image-2025-09-22-at-13-48-29.jpg",
      "https://i.ibb.co/0p5YP5MY/Whats-App-Image-2025-09-22-at-13-48-29-1.jpg",
      "https://i.ibb.co/MHy7PgM/Whats-App-Image-2025-09-22-at-13-48-29-2.jpg",
      "https://i.ibb.co/p6cZpyp7/Whats-App-Image-2025-09-22-at-13-48-30.jpg",
      "https://i.ibb.co/nqK5g5Bx/Whats-App-Image-2025-09-22-at-13-48-30-1.jpg"
    ],
    amenities: ["Wi-Fi", "TV 55\"", "Ar-condicionado", "Piscina Privativa de Vidro", "Frigobar", "Secador de cabelo"],
    featured: true,
    priceOptions: [
      { people: 1, price: 570 },
      { people: 2, price: 650 }
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