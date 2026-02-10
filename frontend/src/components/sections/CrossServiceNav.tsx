import Link from 'next/link';

interface ServiceLink {
  name: string;
  slug: string;
}

interface CrossServiceNavProps {
  services: ServiceLink[];
  currentSlug: string;
}

export function CrossServiceNav({ services, currentSlug }: CrossServiceNavProps) {
  return (
    <nav aria-label="Other services" className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-mono text-[13px] text-[#64748B]">Also explore:</span>
      {services.map((service, index) => {
        const isCurrent = service.slug === currentSlug;
        return (
          <span key={service.slug} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-[#CBD5E1]">&middot;</span>
            )}
            {isCurrent ? (
              <span className="font-mono text-[13px] text-[#111827] font-medium">
                {service.name}
              </span>
            ) : (
              <Link
                href={`/services/${service.slug}`}
                className="font-mono text-[13px] text-[#64748B] transition-colors duration-150 hover:text-[#111827]"
              >
                {service.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
