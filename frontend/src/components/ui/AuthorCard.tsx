import Link from 'next/link';

interface AuthorCardProps {
  name: string;
  title: string;
  bio: string;
  slug: string;
  photoUrl?: string;
}

export function AuthorCard({ name, title, bio, slug, photoUrl }: AuthorCardProps) {
  const firstName = name.split(' ')[0];

  return (
    <div className="flex gap-6 items-start">
      {/* Photo */}
      <div
        className="w-16 h-16 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] flex-shrink-0 overflow-hidden"
        aria-hidden={!photoUrl}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${name}, ${title} at Applied Economics`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[14px] text-[#64748B]">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="text-h3">{name}</h3>
        <p className="font-mono text-[14px] text-[#64748B] mt-1">{title}</p>
        <p className="text-body mt-3 max-w-[560px]">{bio}</p>
        <Link
          href={`/team/${slug}`}
          className="link-explore mt-4 inline-flex"
        >
          View all articles by {firstName}
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
