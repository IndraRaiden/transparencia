"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = "Buscar información...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="text-gray-400" 
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md bg-white focus:outline-none focus:ring-1 focus:ring-[#712442] focus:border-[#712442] text-sm"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-[#712442] hover:bg-[#5e1d36] text-white font-medium rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#712442]"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
