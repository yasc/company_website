import Link from 'next/link';

interface TopicTagsProps {
  topics: { name: string; slug: string }[];
}

export function TopicTags({ topics }: TopicTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {topics.map((topic, index) => (
        <span key={topic.slug} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-[#CBD5E1]">&middot;</span>
          )}
          <Link
            href={`/insights?topic=${topic.slug}`}
            className="font-mono text-[14px] font-medium uppercase tracking-[0.08em] text-[#006D77] transition-colors duration-150 hover:text-[#005A63]"
          >
            {topic.name}
          </Link>
        </span>
      ))}
    </div>
  );
}
