interface Spec {
  label: string;
  value: string;
}

interface KeySpecsStripProps {
  specs: Spec[];
}

export function KeySpecsStrip({ specs }: KeySpecsStripProps) {
  return (
    <dl className="flex flex-wrap">
      {specs.map((spec, index) => (
        <div
          key={index}
          className={`px-6 first:pl-0 last:pr-0 ${
            index < specs.length - 1 ? 'border-r border-[#CBD5E1]' : ''
          }`}
        >
          <dt className="text-metadata">{spec.label}</dt>
          <dd className="text-h3 mt-1">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
