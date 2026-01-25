import { Container } from '@/components/ui/Container';

interface ProcessStep {
  stepTitle: string;
  stepDescription?: string;
  order?: number;
}

interface ProcessTimelineProps {
  title?: string;
  steps: ProcessStep[];
  background?: 'white' | 'gray';
}

export function ProcessTimeline({
  title = 'How we work',
  steps,
  background = 'gray',
}: ProcessTimelineProps) {
  // Sort by order if provided
  const sortedSteps = [...steps].sort((a, b) => (a.order || 0) - (b.order || 0));

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

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gray-300" />

          <div className="space-y-8">
            {sortedSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Step number circle */}
                <div className="flex-shrink-0 w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                  {index + 1}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-3">
                  <h3 className="text-h3 text-navy-800 mb-2">
                    {step.stepTitle}
                  </h3>
                  {step.stepDescription && (
                    <p className="text-body text-gray-500">
                      {step.stepDescription}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProcessTimeline;
