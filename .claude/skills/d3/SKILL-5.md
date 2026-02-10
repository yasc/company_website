---
name: d3
description: Create data visualizations using D3.js. Use this skill when building charts, graphs, maps, or any data-driven SVG/Canvas visualization. Covers D3 selections, scales, axes, layouts, transitions, responsive patterns, and integration with React/Next.js. Applicable for both standalone D3 and hybrid D3+React approaches.
---

# D3.js Data Visualization

This skill covers D3.js v7+ for building production-grade, interactive data visualizations. Emphasis on the hybrid D3+React pattern (D3 for math, React for DOM) which is the recommended approach in modern web applications.

## Architecture Decision: D3 in React

There are two approaches to using D3 in React applications:

### Approach 1: D3 for Math, React for DOM (Preferred)

Use D3 only for scales, layouts, shapes, and calculations. Let React handle rendering.

```tsx
import * as d3 from 'd3';

function BarChart({ data, width, height }: Props) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // D3 for scales (math)
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, innerWidth])
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)!])
    .range([innerHeight, 0])
    .nice();

  // React for rendering (DOM)
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d) => (
          <rect
            key={d.label}
            x={xScale(d.label)}
            y={yScale(d.value)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(d.value)}
            fill="var(--color-brand-500)"
            rx={2}
          />
        ))}
        <AxisBottom scale={xScale} transform={`translate(0,${innerHeight})`} />
        <AxisLeft scale={yScale} />
      </g>
    </svg>
  );
}
```

### Approach 2: D3 Owns the DOM (Escape Hatch)

Use D3's full API via `useRef` + `useEffect`. Only when you need D3 behaviors that can't be expressed in React (e.g., complex transitions, brushing, zooming).

```tsx
function ForceGraph({ nodes, links }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear previous render

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // D3 owns this DOM subtree
    const link = svg.selectAll('line').data(links).join('line')
      .attr('stroke', '#94a3b8').attr('stroke-width', 1);

    const node = svg.selectAll('circle').data(nodes).join('circle')
      .attr('r', 6).attr('fill', '#0c8ee6');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('cx', d => d.x).attr('cy', d => d.y);
    });

    return () => { simulation.stop(); };
  }, [nodes, links]);

  return <svg ref={svgRef} width={width} height={height} />;
}
```

## Core Concepts

### Scales

Scales map data values to visual values (pixels, colors, etc.):

```tsx
// Linear (continuous → continuous)
const y = d3.scaleLinear()
  .domain([0, maxValue])   // data space
  .range([height, 0])      // pixel space (inverted for SVG y-axis)
  .nice();                  // round domain to nice values

// Band (categorical → continuous)
const x = d3.scaleBand()
  .domain(categories)
  .range([0, width])
  .padding(0.2);

// Time (Date → continuous)
const timeScale = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, width]);

// Color (continuous → color)
const colorScale = d3.scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateBlues);

// Color (categorical → color)
const categoryColor = d3.scaleOrdinal()
  .domain(['A', 'B', 'C'])
  .range(['#0c8ee6', '#e64c0c', '#0ce67e']);

// Logarithmic (for skewed distributions)
const logScale = d3.scaleLog()
  .domain([1, 1000000])
  .range([0, width]);
```

### Axes (React approach)

```tsx
function AxisBottom({ scale, transform }: {
  scale: d3.ScaleBand<string>;
  transform: string;
}) {
  const ticks = scale.domain();
  return (
    <g transform={transform}>
      <line x1={0} x2={scale.range()[1]} stroke="currentColor" />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(${scale(tick)! + scale.bandwidth() / 2},0)`}>
          <line y2={6} stroke="currentColor" />
          <text
            y={20}
            textAnchor="middle"
            fill="currentColor"
            fontSize={12}
            className="font-body"
          >
            {tick}
          </text>
        </g>
      ))}
    </g>
  );
}

function AxisLeft({ scale, width }: {
  scale: d3.ScaleLinear<number, number>;
  width?: number;
}) {
  const ticks = scale.ticks(5);
  return (
    <g>
      {ticks.map(tick => (
        <g key={tick} transform={`translate(0,${scale(tick)})`}>
          {/* Optional grid line */}
          {width && (
            <line x2={width} stroke="currentColor" opacity={0.1} />
          )}
          <line x2={-6} stroke="currentColor" />
          <text
            x={-10}
            dy="0.32em"
            textAnchor="end"
            fill="currentColor"
            fontSize={12}
          >
            {d3.format(',')(tick)}
          </text>
        </g>
      ))}
    </g>
  );
}
```

### Shape Generators

```tsx
// Line
const lineGenerator = d3.line<DataPoint>()
  .x(d => xScale(d.date))
  .y(d => yScale(d.value))
  .curve(d3.curveMonotoneX); // smooth interpolation

<path d={lineGenerator(data)!} fill="none" stroke="#0c8ee6" strokeWidth={2} />

// Area
const areaGenerator = d3.area<DataPoint>()
  .x(d => xScale(d.date))
  .y0(innerHeight)
  .y1(d => yScale(d.value))
  .curve(d3.curveMonotoneX);

<path d={areaGenerator(data)!} fill="url(#gradient)" opacity={0.3} />

// Arc (for pie/donut charts)
const arcGenerator = d3.arc<d3.PieArcDatum<DataPoint>>()
  .innerRadius(60)   // 0 for pie, >0 for donut
  .outerRadius(120)
  .padAngle(0.02)
  .cornerRadius(4);

const pie = d3.pie<DataPoint>()
  .value(d => d.value)
  .sort(null);

{pie(data).map((d, i) => (
  <path key={i} d={arcGenerator(d)!} fill={colorScale(d.data.label)} />
))}
```

## Responsive Visualizations

### ResizeObserver Pattern

```tsx
function useContainerDimensions(ref: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
}

function ResponsiveChart({ data }: { data: DataPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(containerRef);

  return (
    <div ref={containerRef} className="h-[400px] w-full">
      {width > 0 && (
        <BarChart data={data} width={width} height={height} />
      )}
    </div>
  );
}
```

### viewBox for Scalable SVGs

```tsx
<svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
  {/* Content scales automatically */}
</svg>
```

## Interactions

### Tooltips (React-managed)

```tsx
function ChartWithTooltip({ data }: Props) {
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; data: DataPoint;
  } | null>(null);

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {data.map(d => (
          <rect
            key={d.label}
            x={xScale(d.label)}
            y={yScale(d.value)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(d.value)}
            fill="#0c8ee6"
            className="cursor-pointer transition-opacity hover:opacity-80"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltip({ x: rect.x + rect.width / 2, y: rect.y, data: d });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </svg>
      {tooltip && (
        <div
          className="pointer-events-none absolute rounded-md bg-gray-900 px-3 py-2
            text-sm text-white shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <strong>{tooltip.data.label}</strong>: {tooltip.data.value}
        </div>
      )}
    </div>
  );
}
```

### Zoom & Pan (D3-managed)

```tsx
useEffect(() => {
  const svg = d3.select(svgRef.current);
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5])
    .on('zoom', (event) => {
      svg.select('.chart-content')
        .attr('transform', event.transform.toString());
    });

  svg.call(zoom);
  return () => { svg.on('.zoom', null); };
}, []);
```

## Data Utilities

```tsx
// Statistical helpers
d3.min(data, d => d.value);
d3.max(data, d => d.value);
d3.extent(data, d => d.value);  // [min, max]
d3.mean(data, d => d.value);
d3.median(data, d => d.value);
d3.sum(data, d => d.value);

// Grouping
const grouped = d3.group(data, d => d.category);
const rolledUp = d3.rollup(data, v => d3.sum(v, d => d.value), d => d.category);

// Binning (histograms)
const bins = d3.bin()
  .domain(xScale.domain() as [number, number])
  .thresholds(20)(data.map(d => d.value));

// Number formatting
d3.format(',')(1234567);       // "1,234,567"
d3.format('$.2f')(1234.5);     // "$1,234.50"
d3.format('.1%')(0.1234);      // "12.3%"
d3.format('.2s')(1234567);     // "1.2M"

// Date formatting
d3.timeFormat('%B %d, %Y')(date);  // "January 15, 2026"
d3.timeFormat('%b %Y')(date);      // "Jan 2026"
```

## Color Palettes for Professional Visualizations

```tsx
// Sequential (low to high)
d3.interpolateBlues    // single-hue blue
d3.interpolateYlGnBu  // yellow → green → blue

// Diverging (negative ↔ positive)
d3.interpolateRdBu    // red ↔ blue
d3.interpolatePRGn    // purple ↔ green

// Categorical
d3.schemeTableau10     // 10 distinct colors (best default)
d3.schemeSet2          // 8 pastel colors
```

## Common Pitfalls

1. **Don't let D3 and React fight over the DOM** — pick one owner per subtree
2. **Don't forget to invert the y-axis** — SVG y=0 is top, data y=0 is bottom
3. **Don't hardcode dimensions** — always use responsive patterns
4. **Don't skip `.nice()`** — axes look amateur without rounded domains
5. **Don't use pixel values for stroke-width in viewBox SVGs** — use relative units
6. **Don't forget `key` props** when rendering D3-computed data in React `.map()`
7. **Don't create scales inside render** without `useMemo` — they're computed on every render

## When to Ask for More Docs

Request additional documentation for:
- Geographic projections and map visualizations (d3-geo)
- Force-directed graph layouts at scale
- Hierarchical visualizations (treemaps, sunbursts, dendrograms)
- Brush and linked views
- Canvas rendering for 10k+ data points
- D3 transitions (when using D3-owns-DOM approach)
- Server-side rendering of D3 visualizations
