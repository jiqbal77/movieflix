import { memo } from 'react';
import Button from '@App/components/ui/Button';
import HeartIcon from '@App/components/ui/HeartIcon';

interface FavoriteButtonProps {
  isFavorite: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

const FavoriteButton = memo(function FavoriteButton({
  isFavorite,
  isLoading,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant={isFavorite ? 'danger' : 'primary'}
      isLoading={isLoading}
      icon={<HeartIcon filled={isFavorite} />}
      fullWidth
    >
      {isFavorite ? 'Remove' : 'Add to Favorites'}
    </Button>
  );
});

export default FavoriteButton;
