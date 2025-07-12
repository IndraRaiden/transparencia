import { Suspense } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import SearchClient from './search-client';

function SearchLoading() {
  return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#712442]"></div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        <div className="mt-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Resultados de búsqueda</h1>
          <SearchBox placeholder="Buscar en Transparencia" className="mb-6" />
          
          <Suspense fallback={<SearchLoading />}>
            <SearchClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
