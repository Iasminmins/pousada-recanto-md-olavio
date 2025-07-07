# Pousada Recanto MD Olavio

**Website institucional desenvolvido em React + TypeScript para estabelecimento hoteleiro localizado em Itaboraí, RJ.**

**Status:** Production Ready  
**React:** 18.2.0  
**TypeScript:** 4.9.5  
**Tailwind CSS:** 3.3.0

---

## Overview

Sistema web responsivo para apresentação de acomodações, serviços e sistema de reservas via integração WhatsApp. Desenvolvido com arquitetura de componentes reutilizáveis e design system consistente.

**Demo:** [https://pousada-recanto-md-olavio.vercel.app](https://pousada-recanto-md-olavio.vercel.app)

---

## Stack Tecnológico

### Core
- **React** 18.2.0 - Biblioteca JavaScript para interfaces
- **TypeScript** 4.9.5 - Tipagem estática
- **React Router DOM** 6.x - Roteamento client-side
- **Vite** - Build tool e dev server

### Styling
- **Tailwind CSS** 3.3.0 - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **CSS Modules** - Escopo local de estilos

### Development
- **ESLint** - Linting e code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript Compiler** - Type checking

---

## Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Button, Input, etc.)
│   ├── Layout.tsx       # Layout principal
│   └── RoomCard.tsx     # Card de acomodação
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Homepage
│   ├── Acomodacoes.tsx  # Listagem de quartos
│   ├── RoomDetail.tsx   # Detalhes do quarto
│   └── Contato.tsx      # Página de contato
├── data/                # Dados estáticos tipados
│   └── rooms.ts         # Database de acomodações
├── services/            # Serviços e APIs
├── hooks/               # Custom hooks
├── types/               # Definições de tipos TypeScript
└── utils/               # Funções utilitárias
```

---

## Features

### Core Features
- **Sistema de Reservas**: Integração WhatsApp com payload estruturado
- **Galeria de Acomodações**: Grid responsivo com detalhamento
- **Formulário de Contato**: Validação client-side e envio via WhatsApp
- **Geolocalização**: Integração Google Maps embedded
- **Design Responsivo**: Mobile-first approach

### Technical Features
- **SSG (Static Site Generation)**: Performance otimizada
- **Type Safety**: 100% TypeScript coverage
- **Code Splitting**: Lazy loading de rotas
- **SEO Optimized**: Meta tags e estrutura semântica
- **PWA Ready**: Service Worker e manifest
- **Error Boundaries**: Tratamento de erros React

---

## Getting Started

### Pré-requisitos
```bash
Node.js >= 16.0.0
npm >= 8.0.0
Git
```

### Instalação
```bash
# Clone do repositório
git clone https://github.com/Iasminmins/pousada-recanto-md-olavio.git

# Navegação para diretório
cd pousada-recanto-md-olavio

# Instalação de dependências
npm install

# Configuração de ambiente (opcional)
cp .env.example .env.local
```

### Development
```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

### Scripts Disponíveis
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext ts,tsx",
  "lint:fix": "eslint src --ext ts,tsx --fix",
  "type-check": "tsc --noEmit"
}
```

---

## Configuration

### Environment Variables
```bash
# .env.local
VITE_WHATSAPP_NUMBER=5521971864896
VITE_API_URL=https://api.example.com
VITE_GOOGLE_MAPS_KEY=your_maps_api_key
```

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true
  }
})
```

---

## Deploy

### Vercel (Recomendado)
```bash
# Instalação da CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Manual
```bash
npm run build
# Output: dist/
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## Architecture

### Component Pattern
```typescript
// Interface padrão para componentes
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Hook personalizado exemplo
const useReservation = () => {
  const [data, setData] = useState<ReservationData>();
  // lógica do hook
  return { data, setData };
};
```

### Data Layer
```typescript
// types/room.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: {
    adults: number;
    children: number;
  };
  amenities: string[];
  images: string[];
}
```

### State Management
- **React State**: Estados locais de componentes
- **Context API**: Estados globais (ex: tema, usuário)
- **URL State**: Filtros e navegação
- **Local Storage**: Preferências do usuário

---

## API Integration

### WhatsApp Integration
```typescript
const sendWhatsAppMessage = (data: ReservationData) => {
  const message = formatReservationMessage(data);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

### External Services
- **Google Maps API**: Geolocalização
- **Image CDN**: Otimização de imagens
- **Analytics**: Tracking de conversões

---

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Test Structure
```
tests/
├── components/          # Testes de componentes
├── pages/              # Testes de páginas
├── utils/              # Testes de funções utilitárias
└── e2e/                # Testes end-to-end
```

---

## Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações
- Code splitting por rota
- Lazy loading de imagens
- Compressão de assets
- CDN para recursos estáticos
- Service Worker para cache

---

## Browser Support

**Suporte mínimo:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Contributing

### Workflow
1. Fork do repositório
2. Criação de branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das alterações (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abertura de Pull Request

### Convenções
- **Commits**: Conventional Commits
- **Branches**: feature/, bugfix/, hotfix/
- **Code Style**: Prettier + ESLint
- **TypeScript**: Strict mode enabled

---

## License

MIT License. Consulte [LICENSE](./LICENSE) para detalhes.

---

## Maintainers

- **Developer**: [@Iasminmins](https://github.com/Iasminmins)

**Contact**: [Issues](https://github.com/Iasminmins/pousada-recanto-md-olavio/issues) | [Discussions](https://github.com/Iasminmins/pousada-recanto-md-olavio/discussions)
