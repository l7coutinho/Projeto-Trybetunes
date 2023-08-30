import { useState } from 'react';
import './index.css';

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
    <div className="container-music">
      <h3>{trackName}</h3>
      <div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          Seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>

        <label
          htmlFor={ `id-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          className="lbl-input"
        >
          <input
            type="checkbox"
            id={ `id-${trackId}` }
            onChange={ toggleFavorite }
            checked={ favorite }
            className="checkbox"
          />
          <img
            src={
                favorite ? '/src/images/checked_heart.png' : '/src/images/empty_heart.png'
              }
            alt="favorite"
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
