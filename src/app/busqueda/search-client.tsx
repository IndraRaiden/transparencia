"use client";

import dynamic from 'next/dynamic';

// Use dynamic import for client component
const SearchResults = dynamic(() => import('./search-results'), { ssr: false });

export default function SearchClient() {
  return <SearchResults />;
}
