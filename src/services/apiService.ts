// src/services/apiService.ts - Conectado com SUA API - VERSÃO CORRIGIDA

// CORREÇÃO: Usar import.meta.env para Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     process.env.REACT_APP_API_URL || 
                     'http://localhost:3001/api';

console.log('[ApiService] Using API URL:', API_BASE_URL);

// Interfaces baseadas na sua API
export interface Reservation {
  id: string;
  guest_name: string;
  contact_email: string;
  contact_phone?: string;
  room_id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests?: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status?: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  max_guests: number;
  amenities: string[];
  images: string[];
  active: boolean;
}

export interface ContactMessage {
  id: number;
  sender: string;
  email: string;
  subject: string;
  content: string;
  is_read: boolean;
  reply_sent: boolean;
  created_at: string;
}

export interface ReservationStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  total_revenue: number;
}

export interface CreateReservationData {
  guestName: string;
  contactEmail: string;
  contactPhone?: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  specialRequests?: string;
  totalPrice: number;
}

// Classe para gerenciar autenticação
class AuthManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'auth_user';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getUser(): any | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Classe principal do serviço de API
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('[ApiService] Initialized with:', this.baseURL);
  }

  // Método auxiliar para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log(`[ApiService] ${options.method || 'GET'} ${url}`);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...AuthManager.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Se não autorizado, limpar token e redirecionar
      if (response.status === 401) {
        AuthManager.removeToken();
        window.location.href = '/admin/login';
        throw new Error('Não autorizado');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      // Se resposta vazia (como DELETE), retornar objeto vazio
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      console.log(`[ApiService] Response:`, data);
      return data;
    } catch (error) {
      console.error(`[ApiService] Erro na requisição ${endpoint}:`, error);
      throw error;
    }
  }

  // MÉTODOS DE AUTENTICAÇÃO
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    AuthManager.setToken(response.token);
    AuthManager.setUser(response.user);
    
    return response;
  }

  logout(): void {
    AuthManager.removeToken();
  }

  // MÉTODOS DE RESERVAS
  async createReservation(data: CreateReservationData): Promise<{ message: string; reservationId: string }> {
    const guests = data.adults + (data.children || 0);
    
    console.log('[ApiService] Creating reservation with data:', data);
    
    // Mapear para o formato que SUA API espera
    const apiData = {
      guestName: data.guestName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      roomId: data.roomId,
      roomName: data.roomName,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adults: data.adults,
      children: data.children || 0,
      specialRequests: data.specialRequests,
      totalPrice: data.totalPrice
    };
    
    return this.request<{ message: string; reservationId: string }>('/reservations', {
      method: 'POST',
      body: JSON.stringify(apiData),
    });
  }

  async getReservations(params: {
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ reservations: Reservation[]; stats: ReservationStats }> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/reservations${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ reservations: Reservation[]; stats: ReservationStats }>(endpoint);
  }

  async updateReservationStatus(id: string, status: string): Promise<{ message: string }> {
    console.log(`[ApiService] Updating reservation ${id} status to:`, status);
    return this.request<{ message: string }>(`/reservations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteReservation(id: string): Promise<{ message: string }> {
    console.log(`[ApiService] Deleting reservation:`, id);
    return this.request<{ message: string }>(`/reservations/${id}`, {
      method: 'DELETE',
    });
  }

  // MÉTODOS DE QUARTOS
  async getRooms(checkIn?: string, checkOut?: string): Promise<Room[]> {
    const params = new URLSearchParams();
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    
    const queryString = params.toString();
    const endpoint = `/rooms${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Room[]>(endpoint);
  }

  // MÉTODOS DE MENSAGENS
  async createContactMessage(data: {
    sender: string;
    email: string;
    subject: string;
    content: string;
  }): Promise<{ message: string }> {
    return this.request<{ message: string }>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.request<ContactMessage[]>('/messages');
  }

  async markMessageAsRead(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/messages/${id}/read`, {
      method: 'PATCH',
    });
  }

  // MÉTODOS UTILITÁRIOS
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  // Método para verificar se a API está online
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/test');
  }

  // MÉTODO PARA DEBUG - Testar conexão
  async testConnection() {
    console.log('[ApiService] Testing connection...');
    try {
      const rooms = await this.getRooms();
      const reservations = await this.getReservations();
      
      console.log('[ApiService] Connection test results:', {
        roomsCount: rooms?.length || 0,
        reservationsCount: reservations?.reservations?.length || 0,
        apiUrl: this.baseURL
      });
      
      return {
        success: true,
        rooms: rooms,
        reservations: reservations.reservations
      };
    } catch (error) {
      console.error('[ApiService] Connection test failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  }
}

// Hook personalizado para usar o serviço
export const useApiService = () => {
  return new ApiService();
};

// Instância singleton para uso direto
export const apiService = new ApiService();

// Exportar o AuthManager para uso em componentes
export { AuthManager };

// Hook personalizado para autenticação
export const useAuth = () => {
  const isAuthenticated = AuthManager.isAuthenticated();
  const user = AuthManager.getUser();
  
  const login = async (email: string, password: string) => {
    return await apiService.login(email, password);
  };

  const logout = () => {
    apiService.logout();
    window.location.href = '/';
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};

export default apiService;