"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownMenuProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, icon = "📄", children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative mb-1" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className={`w-full ${className || "bg-white p-4 rounded shadow-md hover:bg-gray-50"} transition-all duration-200 text-left`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-3 text-lg">{icon}</span>
            <span className="font-medium">{title}</span>
          </div>
          <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-blue-600`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </button>
      
      <div 
        className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="border border-t-0 border-gray-200 bg-white">
          <div className="py-2 px-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
