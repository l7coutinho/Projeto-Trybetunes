import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from '../Loading';
import './index.css';

type AlbumInfoProps = {
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  musicTracks: any;
};

function Album() {
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumInfoProps>();

  useEffect(() => {
    getMusics(`${id}`)
      .then((response) => {
        const [albumData, ...musicTracks] = response;
        setAlbumInfo({
          artistName: albumData.artistName,
          collectionName: albumData.collectionName,
          artworkUrl100: albumData.artworkUrl100,
          musicTracks,
        });
      });
  }, [id]);

  if (!albumInfo) {
    return (<Loading />);
  }

  return (
    <div className="container-musics">
      <div>
        <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
        <img src={ albumInfo.artworkUrl100 } alt="Album" />
        <p data-testid="artist-name">{albumInfo.artistName}</p>
      </div>

      <div className="musics">
        {albumInfo.musicTracks.map((track: any) => (
          <MusicCard
            key={ track.trackId }
            trackId={ track.trackId }
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
