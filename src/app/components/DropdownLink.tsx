import Link from "next/link";

interface DropdownLinkProps {
  href: string;
  text: string;
  icon?: string;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ href, text, icon }) => {
  return (
    <div className="mb-1 last:mb-0">
      <Link 
        href={href} 
        className="flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 text-sm transition-colors"
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{text}</span>
        <span className="ml-auto text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default DropdownLink;
