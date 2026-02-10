interface Capability {
  title: string;
  description: string;
  deliverables: string;
}

interface CapabilityGridProps {
  capabilities: Capability[];
}

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {capabilities.map((capability, index) => (
        <div
          key={index}
          className="enterprise-card flex flex-col min-h-[280px]"
        >
          {/* Status dot */}
          <div className="flex justify-end mb-3">
            <span className="status-dot" aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="text-h3 mb-3">{capability.title}</h3>

          {/* Description */}
          <p className="text-body-lg flex-grow">{capability.description}</p>

          {/* Deliverables */}
          <div className="border-t border-[#CBD5E1] pt-4 mt-6">
            <span className="text-mono">
              {capability.deliverables}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
