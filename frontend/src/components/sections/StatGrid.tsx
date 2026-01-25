import { Container } from '@/components/ui/Container';

interface Stat {
  value: string;
  label: string;
}

interface StatGridProps {
  stats: Stat[];
  title?: string;
  background?: 'white' | 'gray' | 'dark';
}

export function StatGrid({
  stats,
  title,
  background = 'gray',
}: StatGridProps) {
  const isDark = background === 'dark';

  return (
    <section
      className={`py-16 lg:py-20 ${
        background === 'dark'
          ? 'bg-navy-800 dark-bg'
          : background === 'gray'
          ? 'bg-gray-50'
          : 'bg-white'
      }`}
    >
      <Container>
        {title && (
          <h2
            className={`text-h2 text-center mb-12 ${
              isDark ? 'text-white' : 'text-navy-800'
            }`}
          >
            {title}
          </h2>
        )}

        <div
          className={`
            grid gap-8
            ${stats.length === 3 ? 'grid-cols-1 md:grid-cols-3' : ''}
            ${stats.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : ''}
            ${stats.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' : ''}
            ${stats.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : ''}
          `}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-stat mb-2 ${
                  isDark ? 'text-teal-400' : 'text-navy-800'
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-caption uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default StatGrid;
