import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center text-xs font-semibold uppercase tracking-[0.13em] text-slate-400 md:text-sm">
      <Link href="/" className="transition-colors hover:text-gold">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight aria-hidden="true" size={13} className="mx-2 text-slate-600" />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-gold">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="max-w-[18rem] truncate text-slate-200 md:max-w-md">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
