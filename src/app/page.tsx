"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import LinkCard from "./components/LinkCard";
import DropdownMenu from "./components/DropdownMenu";
import IPOTransparenciaLinks from "./components/IPOTransparenciaLinks";
import PublicidadOficialLinks from "./components/PublicidadOficialLinks";
import ObligacionesMunicipiosLinks from "./components/ObligacionesMunicipiosLinks";
import InformacionComplementariaLinks from "./components/InformacionComplementariaLinks";
import SearchBox from "./components/SearchBox";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        {/* Hero Section */}
        <div className={`mt-6 mb-12 p-8 bg-white border-b-2 border-gray-200 text-center relative transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="absolute left-0 bottom-0 w-full h-1 bg-[#712442]"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Portal de Transparencia</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">Acceso a información pública, recursos y servicios para la transparencia gubernamental.</p>
            
            <div className="max-w-2xl mx-auto">
              <SearchBox placeholder="Buscar en el portal de transparencia..." />
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col gap-6 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* Buzón de Quejas */}
        <div className={`transition-all duration-300 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <LinkCard 
            href="/buzon-quejas" 
            text="Buzón de quejas" 
            icon="⚠️"
            className="hover:bg-gray-50 transition-all bg-white border border-gray-200 hover:border-gray-300 border-l-4 border-l-yellow-500 p-4 rounded-md"
          />
        </div>

        {/* IPO de la Ley estatal de transparencia y ley general de transparencia */}
        <div className={`transition-all duration-300 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <DropdownMenu 
            title="IPO de la Ley estatal de transparencia y ley general de transparencia"
            icon="📄"
            className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 border-l-4 border-l-[#712442] p-4 rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-h-full overflow-y-auto">
              <IPOTransparenciaLinks />
            </div>
          </DropdownMenu>
        </div>

        {/* Publicidad Oficial */}
        <div className={`transition-all duration-300 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <DropdownMenu 
            title="Publicidad oficial"
            icon="📊"
            className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 border-l-4 border-l-[#712442] p-4 rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-full overflow-y-auto">
              <PublicidadOficialLinks />
            </div>
          </DropdownMenu>
        </div>

        {/* Obligaciones Específicas de los Municipios */}
        <div className={`transition-all duration-300 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <DropdownMenu 
            title="Obligaciones específicas de los municipios"
            icon="🏛️"
            className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 border-l-4 border-l-[#712442] p-4 rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-h-full overflow-y-auto">
              <ObligacionesMunicipiosLinks />
            </div>
          </DropdownMenu>
        </div>

        {/* Información complementaria del artículo 70 Ley general de transparencia */}
        <div className={`transition-all duration-300 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <LinkCard 
            href="/informacion-complementaria-art70" 
            text="Información complementaria del artículo 70 Ley general de transparencia"
            icon="📋"
            className="hover:bg-gray-50 transition-all bg-white border border-gray-200 hover:border-gray-300 border-l-4 border-l-[#712442] p-4 rounded-md"
          />
        </div>
        </div>
        
        {/* Footer Section */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
          <div className="flex flex-col items-center">
            <img src="/government-logo.png" alt="Logo Gobierno" className="h-10 mb-2" />
            <p>© {new Date().getFullYear()} Portal de Transparencia | Gobierno del Estado</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
