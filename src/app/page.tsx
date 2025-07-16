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

interface Subcategoria {
  id: string;
  nombre: string;
  categoria: number;
  created_at?: string;
}

interface Documento {
  id: string;
  nombre: string;
  url: string;
  subcategoria_id: string;
  created_at?: string;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<number, string>>({});
  
  // Handle subcategory selection
  const handleSubcategoryChange = (categoriaId: number, subcategoriaId: string) => {
    setSelectedSubcategories(prev => ({
      ...prev,
      [categoriaId]: subcategoriaId
    }));
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Fetch categories, subcategories, and documents
    async function fetchData() {
      try {
        const [{ data: categoriasData }, { data: subcategoriasData }, { data: docsData }] = await Promise.all([
          supabase.from('categorias').select('*').order('nombre'),
          supabase.from('subcategorias').select('*').order('nombre'),
          supabase.from('documentos').select('*')
        ]);
        
        setCategorias(categoriasData || []);
        setSubcategorias(subcategoriasData || []);
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
        <div className="mt-6 mb-12 relative">
          {/* Logo positioned on the left */}
          <div className="absolute left-[-120px] top-0 md:top-1/2 md:transform md:-translate-y-1/2 z-20">
            <img src="/logos/Escudo_de_Piedras_Negras.svg.png" alt="Logo Gobierno" className="h-32 md:h-52 max-w-full" />
          </div>
          
          {/* Centered content */}
          <div className={`p-8 bg-white border-b-2 border-gray-200 text-center relative transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="absolute left-0 bottom-0 w-full h-1 bg-[#712442]"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center">UNIDAD DE TRANSPARENCIA Y ACCESO A LA INFORMACION</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 mt-4">Acceso a información pública, recursos y servicios para la transparencia gubernamental.</p>
            
              <div className="max-w-2xl mx-auto">
                <SearchBox placeholder="Buscar en el portal de transparencia..." />
              </div>
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
        
        {/* Categorías con Subcategorías y Documentos */}
        {[...categorias].reverse().map((categoria, index) => {
          // Get subcategories for this category
          const categorySubcategories = subcategorias.filter(sub => sub.categoria === categoria.id);
          const selectedSubcategoryId = selectedSubcategories[categoria.id] || '';
          // Get documents for selected subcategory
          const selectedSubcategoryDocuments = selectedSubcategoryId ? 
            documentos.filter(doc => doc.subcategoria_id === selectedSubcategoryId) : [];
          
          return (
            <div key={categoria.id} className={`transition-all duration-300 delay-${500 + (index * 100)} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <DropdownMenu
                title={categoria.nombre}
                icon="📚"
                className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 border-l-4 border-l-[#712442] p-4 rounded-md"
              >
                <div className="space-y-6 px-2">
                  {categorySubcategories.length > 0 ? (
                    <>
                      {/* Subcategory dropdown selector */}
                      <div className="w-full max-w-md">
                        <label htmlFor={`subcategoria-${categoria.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Seleccionar subcategoría:
                        </label>
                        <select
                          id={`subcategoria-${categoria.id}`}
                          value={selectedSubcategoryId}
                          onChange={(e) => handleSubcategoryChange(categoria.id, e.target.value)}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">-- Seleccione una subcategoría --</option>
                          {categorySubcategories.map(subcategoria => (
                            <option key={subcategoria.id} value={subcategoria.id}>
                              {subcategoria.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Documents grid */}
                      {selectedSubcategoryId ? (
                        <div className="mt-4">
                          <h3 className="font-medium text-gray-800 mb-3">
                            Documentos disponibles:
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {selectedSubcategoryDocuments.length > 0 ? (
                              selectedSubcategoryDocuments.map(doc => (
                                <a 
                                  key={doc.id} 
                                  href={doc.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center gap-2"
                                >
                                  <span className="text-blue-600 text-sm">📄</span>
                                  <span className="text-gray-700 text-sm">{doc.nombre}</span>
                                </a>
                              ))
                            ) : (
                              <div className="text-gray-500 italic text-sm p-3 col-span-3">No hay documentos en esta subcategoría</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 italic text-sm p-3">Seleccione una subcategoría para ver los documentos</div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-500 italic text-sm p-3">No hay subcategorías disponibles</div>
                  )}
                </div>
              </DropdownMenu>
            </div>
          );
        })}
        </div>
        
        {/* Footer Section */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
          <div className="flex flex-col items-center">
            <p>© {new Date().getFullYear()} UNIDAD DE TRANSPARENCIA Y ACCESO A LA INFORMACION | Gobierno del Estado</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
