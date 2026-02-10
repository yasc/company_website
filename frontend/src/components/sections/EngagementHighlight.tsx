interface Metric {
  value: string;
  label: string;
}

interface EngagementHighlightProps {
  label?: string;
  title: string;
  description: string;
  metrics: Metric[];
}

export function EngagementHighlight({
  label = 'ENGAGEMENT HIGHLIGHT',
  title,
  description,
  metrics,
}: EngagementHighlightProps) {
  return (
    <div className="enterprise-card p-12 md:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: narrative */}
        <div className="lg:col-span-5">
          <span className="text-label">{label}</span>
          <h3 className="text-h2 mt-4">{title}</h3>
          <p className="text-body-lg mt-4">{description}</p>
        </div>

        {/* Right: metrics */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index}>
                <dd className="font-mono text-[40px] font-semibold tracking-tight text-[#111827] leading-none">
                  {metric.value}
                </dd>
                <dt className="text-metadata mt-1">{metric.label}</dt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
