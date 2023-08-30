import { useState } from 'react';

type MusicCardProps = {
  trackName: string;
  previewUrl: string;
  trackId: number;
};

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((favoriteElement) => !favoriteElement);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        Seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>

      <label htmlFor={ `id-${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          id={ `id-${trackId}` }
          onChange={ toggleFavorite }
          checked={ favorite }
        />
        <img
          src={
            favorite ? '/src/images/checked_heart.png' : '/src/images/empty_heart.png'
          }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
