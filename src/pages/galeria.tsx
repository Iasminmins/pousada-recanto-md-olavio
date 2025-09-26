import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Array de imagens da galeria
  const galleryImages = [
    "https://i.postimg.cc/YpFVGQjW/Imagem-do-Whats-App-de-2025-06-21-s-09-54-52-1cc7e305.jpg",
    "https://i.postimg.cc/d336tbNg/Imagem-do-Whats-App-de-2025-06-21-s-09-54-54-d43df472.jpg",
    "https://i.postimg.cc/Bv5Mhc17/Imagem-do-Whats-App-de-2025-06-21-s-09-54-55-dcbf3ba8.jpg",
    "https://i.postimg.cc/0xNpQPzY/Imagem-do-Whats-App-de-2025-06-21-s-10-11-45-880692fb.jpg",
    "https://i.ibb.co/xKZx6Wwf/Imagem-do-Whats-App-de-2025-07-06-s-23-28-48-447218e4.jpg",
    "https://i.ibb.co/VpzZGnN0/Imagem-do-Whats-App-de-2025-07-06-s-23-28-48-94fa9714.jpg",
    
  ];

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://i.postimg.cc/YpFVGQjW/Imagem-do-Whats-App-de-2025-06-21-s-09-54-52-1cc7e305.jpg")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                Galeria de Fotos
              </h1>
              <p className="text-xl md:text-2xl text-white">
                Descubra a beleza do Recanto MD Olavio através de nossas imagens
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((imageUrl, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openModal(imageUrl)}
              >
                <img 
                  src={imageUrl} 
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Galeria"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-pousada-brown">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Venha Viver Essas Experiências
            </h2>
            <p className="text-xl mb-6">
              Reserve agora e crie suas próprias memórias no Recanto MD Olavio
            </p>
            <Button 
              size="lg" 
              className="bg-white hover:bg-pousada-cream text-pousada-brown"
              onClick={() => window.open(`https://wa.me/5521971864896?text=Olá,%20gostaria%20de%20fazer%20uma%20reserva%20no%20Recanto%20MD%20Olavio`)}
            >
              Faça sua Reserva
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Galeria;