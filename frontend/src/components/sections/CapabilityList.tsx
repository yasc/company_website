import { Container } from '@/components/ui/Container';

interface Capability {
  title: string;
  description?: string;
}

interface CapabilityListProps {
  title?: string;
  capabilities: Capability[];
  background?: 'white' | 'gray';
}

export function CapabilityList({
  title = 'What we do',
  capabilities,
  background = 'white',
}: CapabilityListProps) {
  return (
    <section
      className={`py-16 lg:py-24 ${
        background === 'gray' ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <Container>
        {title && (
          <h2 className="text-h2 text-navy-800 mb-12">{title}</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="flex gap-4"
            >
              {/* Check icon */}
              <div className="flex-shrink-0 w-6 h-6 mt-1">
                <svg
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-h4 text-navy-800 mb-2">
                  {capability.title}
                </h3>
                {capability.description && (
                  <p className="text-body text-gray-500">
                    {capability.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CapabilityList;
