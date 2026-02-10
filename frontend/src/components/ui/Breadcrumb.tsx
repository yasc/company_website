import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-metadata">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-[#CBD5E1]">/</span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-[#111827]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="transition-colors duration-150 hover:text-[#111827]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
