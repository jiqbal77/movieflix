import { memo, useState } from 'react';

interface MoviePosterProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const MoviePoster = memo(function MoviePoster({
  src,
  alt,
  fallbackSrc = '/placeholder-poster.svg',
}: MoviePosterProps) {
  const [imgSrc, setImgSrc] = useState(src !== 'N/A' ? src : fallbackSrc);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
});

export default MoviePoster;
