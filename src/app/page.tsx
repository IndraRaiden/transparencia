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
import { supabase } from "./supabaseClient";

interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface Documento {
  id: string;
  nombre: string;
  url: string;
  categoria_id: number;
  created_at?: string;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    
    // Fetch categories and documents
    async function fetchData() {
      try {
        const [{ data: categoriasData }, { data: docsData }] = await Promise.all([
          supabase.from('categorias').select('*').order('nombre'),
          supabase.from('documentos').select('*')
        ]);
        
        setCategorias(categoriasData || []);
        setDocumentos(docsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
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
        
        {/* Documentos por Categoría - displayed in reverse order */}
        {[...categorias].reverse().map((categoria, index) => (
          <div key={categoria.id} className={`transition-all duration-300 delay-${500 + (index * 100)} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <DropdownMenu
              title={categoria.nombre}
              icon="📁"
              className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 border-l-4 border-l-[#712442] p-4 rounded-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-full overflow-y-auto">
                {documentos
                  .filter(doc => doc.categoria_id === categoria.id)
                  .map(doc => (
                    <a 
                      key={doc.id} 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center gap-2"
                    >
                      <span className="text-blue-600 text-sm">📄</span>
                      <span className="text-gray-700">{doc.nombre}</span>
                    </a>
                  ))
                }
                {documentos.filter(doc => doc.categoria_id === categoria.id).length === 0 && (
                  <div className="text-gray-500 italic text-sm p-3">No hay documentos en esta categoría</div>
                )}
              </div>
            </DropdownMenu>
          </div>
        ))}
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
