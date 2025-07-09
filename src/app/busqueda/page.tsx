"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Link from 'next/link';

// Mock data - in a real app, you would fetch this from your backend
const mockResults = [
  {
    id: 1,
    title: "Estructura Orgánica",
    url: "/ipo-leyes-transparencia/estructura-organica",
    category: "IPO de la Ley estatal de transparencia",
    description: "Información sobre la estructura orgánica completa del sujeto obligado."
  },
  {
    id: 2,
    title: "Marco Normativo",
    url: "/ipo-leyes-transparencia/marco-normativo",
    category: "IPO de la Ley estatal de transparencia",
    description: "Las normas básicas y las secundarias, así como las declaraciones de principios."
  },
  {
    id: 3,
    title: "Presupuesto Asignado",
    url: "/ipo-leyes-transparencia/presupuesto",
    category: "IPO de la Ley estatal de transparencia",
    description: "Información sobre el presupuesto asignado en lo general y por programas."
  },
  {
    id: 4,
    title: "Publicidad Oficial - Erogación de recursos",
    url: "/publicidad-oficial/erogacion-recursos",
    category: "Publicidad oficial",
    description: "Erogación de recursos por contratación de servicios de impresión, difusión y publicidad."
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate search functionality
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (query) {
        // Filter mock results based on search query
        const filteredResults = mockResults.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        <div className="mt-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Resultados de búsqueda</h1>
          <SearchBox placeholder="Buscar en Transparencia" className="mb-6" />
          
          {query && (
            <p className="text-gray-600 mb-4">
              {loading ? 'Buscando...' : 
                results.length === 0 ? 
                `No se encontraron resultados para "${query}"` : 
                `Se encontraron ${results.length} resultados para "${query}"`
              }
            </p>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(result => (
                <div key={result.id} className="bg-white border border-gray-200 rounded-md p-4 hover:border-gray-300">
                  <Link href={result.url} className="block">
                    <p className="text-sm text-blue-600 mb-1">{result.category}</p>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{result.title}</h2>
                    <p className="text-gray-600">{result.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
              <p className="text-gray-700 mb-2">No se encontraron resultados para tu búsqueda.</p>
              <p className="text-gray-600">Intenta con otros términos o navega por las categorías en la página principal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
