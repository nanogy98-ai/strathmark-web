import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-500 mb-8">
      <Link href="/" className="hover:text-gold transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={10} className="mx-2 text-slate-700" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

