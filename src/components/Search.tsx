import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

function Search() {
  const [name, setName] = useState('');
  const [backup, setBackup] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchAlbums, setSearchAlbums] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    searchAlbumsAPI(name)
      .then((response: any) => {
        if (response.length === 0) {
          setError(true);
          setLoading(false);
          setSearchAlbums([]);
        } else {
          setLoading(false);
          setError(false);
          setBackup(name);
          setSearchAlbums(response);
          setName('');
        }
      });
  };

  function preventForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={ preventForm }>
      <div>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do artista"
          value={ name }
          onChange={ (element) => setName(element.target.value) }
        />
        <button
          data-testid="search-artist-button"
          disabled={ name.length <= 1 || loading }
          onClick={ handleSearch }
        >
          Procurar
        </button>

        {loading && <Loading />}

        {searchAlbums.length > 0 && (
          <div>
            <p>{`Resultado de álbuns de: ${backup}`}</p>
            <ul>
              {searchAlbums.map((album: any) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    { album.collectionName }
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && (<p>Nenhum álbum foi encontrado</p>)}
    </form>
  );
}

export default Search;
