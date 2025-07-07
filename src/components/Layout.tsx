import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MapPin, Calendar, ChevronDown, Mail, Phone, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img 
                src="/lovable-uploads/d19527d9-ffd8-40c0-ba05-7aa09c52537c.png" 
                alt="Recanto MD Olavio Logo" 
                className="h-12 mr-3" 
              />
              <h1 className="text-2xl font-serif font-bold text-pousada-blue">Recanto MD Olavio</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-pousada-dark hover:text-pousada-blue transition-colors font-medium">
                Início
              </Link>
              <Link to="/acomodacoes" className="text-pousada-dark hover:text-pousada-blue transition-colors font-medium">
                Acomodações
              </Link>
              <Link to="/galeria" className="text-pousada-dark hover:text-pousada-blue transition-colors font-medium">
                Galeria
              </Link>
              <Link to="/contato" className="text-pousada-dark hover:text-pousada-blue transition-colors font-medium">
                Contato
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Desktop Reservar Button */}
              <div className="hidden md:block">
                <Link to="/reservas">
                  <Button variant="default" className="bg-pousada-blue hover:bg-pousada-dark text-white">
                    <Calendar className="mr-2 h-4 w-4" /> Reservar
                  </Button>
                </Link>
              </div>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pousada-blue transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-pousada-dark" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pousada-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}>
            <div className="py-4 border-t bg-white/95 backdrop-blur-sm">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="px-4 py-2 text-pousada-dark hover:text-pousada-blue hover:bg-gray-50 transition-colors font-medium rounded-md"
                  onClick={closeMenu}
                >
                  Início
                </Link>
                <Link
                  to="/acomodacoes"
                  className="px-4 py-2 text-pousada-dark hover:text-pousada-blue hover:bg-gray-50 transition-colors font-medium rounded-md"
                  onClick={closeMenu}
                >
                  Acomodações
                </Link>
                <Link
                  to="/galeria"
                  className="px-4 py-2 text-pousada-dark hover:text-pousada-blue hover:bg-gray-50 transition-colors font-medium rounded-md"
                  onClick={closeMenu}
                >
                  Galeria
                </Link>
                <Link
                  to="/contato"
                  className="px-4 py-2 text-pousada-dark hover:text-pousada-blue hover:bg-gray-50 transition-colors font-medium rounded-md"
                  onClick={closeMenu}
                >
                  Contato
                </Link>
                <div className="px-4 pt-2">
                  <Link to="/reservas" onClick={closeMenu}>
                    <Button variant="default" className="w-full bg-pousada-blue hover:bg-pousada-dark text-white">
                      <Calendar className="mr-2 h-4 w-4" /> Reservar
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay para fechar menu quando clicar fora */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-pousada-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/d19527d9-ffd8-40c0-ba05-7aa09c52537c.png" 
                  alt="Recanto MD Olavio Logo" 
                  className="h-12 mr-3 bg-white rounded-full p-1" 
                />
                <h3 className="text-xl font-serif">Recanto MD Olavio</h3>
              </div>
              <p className="mb-4 text-gray-300">Uma experiência única em meio à natureza, com o conforto que você merece.</p>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 text-pousada-lightblue" />
                <p className="text-gray-300">R. Trinta e Dois - Agro Brasil<br />Itaboraí - RJ<br />CEP 24842-590</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/acomodacoes" className="text-gray-300 hover:text-white transition-colors">Acomodações</Link></li>
                <li><Link to="/galeria" className="text-gray-300 hover:text-white transition-colors">Galeria</Link></li>
                <li><Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
                {/* Link para Admin */}
                <li><Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    <span>Administração</span>
                  </div>
                </Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4">Contato</h3>
              <div className="flex items-center mb-2 text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-pousada-lightblue" />
                <p>(21) 97186-4896</p>
              </div>
              <div className="flex items-center mb-4 text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-pousada-lightblue" />
                <a href="mailto:recantomdolavio@gmail.com" className="hover:underline">
                  recantomdolavio@gmail.com
                </a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Recanto MD Olavio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      {/* Botão flutuante de admin (opcional - pode remover se preferir apenas o link no footer) */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link 
          to="/admin" 
          className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md flex items-center justify-center transition-all"
          title="Área Administrativa"
        >
          <Settings className="h-6 w-6 text-pousada-blue" />
        </Link>
      </div>
    </div>
  );
};

export default Layout;