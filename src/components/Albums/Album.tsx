import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from '../Loading';

type AlbumInfoProps = {
  artistName: string;
  collectionName: string;
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
          musicTracks,
        });
      });
  }, [id]);

  if (!albumInfo) {
    return (<Loading />);
  }

  return (
    <div>
      <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
      <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
      <div>
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
