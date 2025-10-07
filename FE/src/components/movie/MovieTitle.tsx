import { memo } from 'react';

interface MovieTitleProps {
  title: string;
  year: string;
}

const MovieTitle = memo(function MovieTitle({ title, year }: MovieTitleProps) {
  return (
    <>
      <h3 className="font-bold text-lg mb-1 line-clamp-2 text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mb-3 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
        </svg>
        {year}
      </p>
    </>
  );
});

export default MovieTitle;
