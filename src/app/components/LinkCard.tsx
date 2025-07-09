import Link from "next/link";

interface LinkCardProps {
  href: string;
  icon?: string;
  text: string;
  bgColor?: string;
  hoverColor?: string;
  className?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ 
  href, 
  icon = "📄", 
  text, 
  bgColor = "bg-red-600", 
  hoverColor = "bg-red-700",
  className = ""
}) => {
  return (
    <Link href={href} className="block">
      <div className={`${className || `${bgColor} text-white p-4 rounded shadow-md hover:${hoverColor}`} transition-colors`}>
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <span>{text}</span>
        </div>
      </div>
    </Link>
  );
};

export default LinkCard;
