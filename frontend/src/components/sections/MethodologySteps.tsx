interface Step {
  title: string;
  description: string;
  isCore?: boolean;
}

interface MethodologyStepsProps {
  steps: Step[];
}

export function MethodologySteps({ steps }: MethodologyStepsProps) {
  return (
    <>
      {/* Desktop: horizontal 4-column layout */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-0">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`px-8 first:pl-0 last:pr-0 ${
              index < steps.length - 1 ? 'border-r border-[#CBD5E1]' : ''
            }`}
          >
            {/* Step number with accent underline */}
            <div className="mb-4">
              <span className="text-label">{String(index + 1).padStart(2, '0')}</span>
              <div
                className={`mt-2 w-8 h-[3px] ${
                  step.isCore ? 'bg-[#006D77]' : 'bg-[#CBD5E1]'
                }`}
              />
            </div>

            <h3 className="text-h3 mb-2">{step.title}</h3>
            <p className="text-body-lg">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden space-y-8">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-label">{String(index + 1).padStart(2, '0')}</span>
              <div
                className={`w-8 h-[3px] ${
                  step.isCore ? 'bg-[#006D77]' : 'bg-[#CBD5E1]'
                }`}
              />
            </div>
            <h3 className="text-h3 mb-2">{step.title}</h3>
            <p className="text-body-lg">{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
