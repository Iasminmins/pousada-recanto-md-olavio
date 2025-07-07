import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Correto para React Router

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar a autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Provedor de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate em vez de router

  // Verificar se o usuário está logado ao iniciar
  useEffect(() => {
    // Verificar se existe um token no localStorage
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      // Simulação - substitua por uma verificação real de token com sua API
      const mockUser: User = {
        id: 'user-001',
        name: 'Administrador',
        email: 'admin@pousada.com',
        role: 'admin'
      };
      
      setUser(mockUser);
    }
    
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulação - substitua por autenticação real com sua API
      if (email === 'admin@pousada.com' && password === 'admin123') {
        const mockUser: User = {
          id: 'user-001',
          name: 'Administrador',
          email,
          role: 'admin'
        };
        
        // Salvar token no localStorage
        localStorage.setItem('auth_token', 'mock_jwt_token');
        
        setUser(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Falha ao fazer login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout - MODIFICADA PARA REDIRECIONAR PARA HOME
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    navigate('/'); // Modificado para navegar para a página principal em vez de /login
  };

  // Verificar se o usuário é admin
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para proteger rotas de administrador
export function useAdminProtection() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate(); // Use navigate em vez de router
  const location = useLocation();

  useEffect(() => {
    // Se não estiver carregando e o usuário não for admin, redirecionar
    if (!loading && !isAdmin) {
      // Armazena a página atual como redirecionamento após login
      navigate(`/login?redirect=${location.pathname}`);
    }
  }, [loading, isAdmin, navigate, location]);

  return { loading, isAdmin };
}