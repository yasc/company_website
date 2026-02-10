interface Challenge {
  title: string;
  description: string;
}

interface NumberedChallengesProps {
  challenges: Challenge[];
}

export function NumberedChallenges({ challenges }: NumberedChallengesProps) {
  return (
    <div className="space-y-12">
      {challenges.map((challenge, index) => (
        <div key={index} className="relative pl-20 md:pl-24">
          {/* Decorative number */}
          <span
            className="absolute left-0 top-0 font-display text-[32px] md:text-[52px] font-semibold text-[#CBD5E1] leading-none select-none"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Content */}
          <div>
            <h3 className="text-h3">{challenge.title}</h3>
            <p className="text-body-lg mt-2 max-w-[640px]">{challenge.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
