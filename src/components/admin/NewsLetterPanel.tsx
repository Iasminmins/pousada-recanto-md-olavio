// src/components/admin/NewsletterPanel.tsx

import { useState } from 'react';
import { Mail, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdmin } from '@/hooks/useAdmin';

const NewsletterPanel = () => {
  const { newsletterSubscriptions, formatDate } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar inscrições com base no termo de busca
  const filteredSubscriptions = newsletterSubscriptions.filter(subscription => {
    const term = searchTerm.toLowerCase();
    return subscription.email.toLowerCase().includes(term);
  });
  
  // Ordenar inscrições por data (mais recentes primeiro)
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Exportar inscrições para CSV
  const handleExportCSV = () => {
    // Criar cabeçalho
    const headers = ['ID', 'Email', 'Data de Inscrição'];
    
    // Criar linhas
    const rows = sortedSubscriptions.map(subscription => [
      subscription.id,
      subscription.email,
      subscription.date
    ]);
    
    // Combinar cabeçalho e linhas
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Criar blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Criar URL para download
    const url = URL.createObjectURL(blob);
    
    // Criar elemento de link para download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `newsletter_subscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
    
    // Adicionar link ao documento
    document.body.appendChild(link);
    
    // Clicar no link para iniciar download
    link.click();
    
    // Remover link
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-pousada-brown">
          Inscrições na Newsletter
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar por email..."
              className="pl-10 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-pousada-brown hover:bg-pousada-dark text-white"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Estatísticas de inscrições */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Inscrições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsletterSubscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inscrições Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {newsletterSubscriptions.filter(s => {
                const today = new Date().toISOString().split('T')[0];
                return s.date === today;
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Últimos 30 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {newsletterSubscriptions.filter(s => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return new Date(s.date) >= thirtyDaysAgo;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de inscrições */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between p-4 border-b">
          <h3 className="font-medium">Todos os Inscritos</h3>
          <div className="text-sm text-gray-500">
            Mostrando {sortedSubscriptions.length} de {newsletterSubscriptions.length} inscrições
          </div>
        </div>
        
        {sortedSubscriptions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhuma inscrição encontrada
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Inscrição
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedSubscriptions.map(subscription => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {subscription.id}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{subscription.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(subscription.date)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Enviar email para este inscrito
                          window.open(`mailto:${subscription.email}`, '_blank');
                        }}
                      >
                        Enviar Email
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPanel;