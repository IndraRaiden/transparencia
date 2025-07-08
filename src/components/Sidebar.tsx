import React from "react";

interface MenuItem {
  label: string;
  href?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Calendario de Información Pública",
  },
  {
    label: "Información Pública de Oficio Art. 21 Ley Estatal",
  },
  {
    label: "Publicidad Oficial Artículo 22 Ley Estatal",
  },
  {
    label: "Obligaciones Específicas Municipios Artículo 28 Ley Estatal",
  },
  {
    label: "Buzón de Quejas",
  },
];

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 p-4 w-full sm:w-72 max-w-full min-h-screen overflow-y-auto">
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href || "#"}
            className="flex items-start gap-3 bg-[#c8102e] hover:bg-[#a60d26] text-white text-sm leading-snug px-4 py-3 rounded shadow transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mt-[2px] flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125V7.5M2.25 12.75h19.5m0 0V17.625c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 17.625V12.75m19.5 0L17.25 8.25m-10.5 0L2.25 12.75"
              />
            </svg>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
