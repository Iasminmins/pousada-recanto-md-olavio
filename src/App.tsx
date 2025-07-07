import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Acomodacoes from "./pages/Acomodacoes";
import RoomDetail from "./pages/RoomDetail";
import Reservas from "./pages/Reservas";
import Contato from "./pages/Contato"; // Importação da página de contato
import Galeria from "./pages/galeria"; // Importação da página de galeria
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/admin"; // Importação do componente Admin
import LoginPage from "./pages/admin/login"; // Importação do componente Login
import { AuthProvider } from "./hooks/useAuth"; // Importação do AuthProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/acomodacoes" element={<Acomodacoes />} />
            <Route path="/acomodacoes/:id" element={<RoomDetail />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/contato" element={<Contato />} /> {/* Nova rota para a página de contato */}
            <Route path="/galeria" element={<Galeria />} /> {/* Nova rota para a página de galeria */}
            
            {/* Rotas adicionadas para admin e login */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;