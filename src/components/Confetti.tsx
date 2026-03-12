import { useMemo } from 'react';

type ConfettiProps = {
  enabled: boolean;
};

const CONFETTI_COUNT = 18;

export const Confetti = ({ enabled }: ConfettiProps) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 5.2) % 88)}%`,
        delay: `${(index % 6) * 0.12}s`,
        duration: `${2.8 + (index % 5) * 0.22}s`,
        rotation: `${(index * 37) % 360}deg`
      })),
    []
  );

  if (!enabled) {
    return null;
  }

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            transform: `rotate(${piece.rotation})`
          }}
        />
      ))}
    </div>
  );
};
