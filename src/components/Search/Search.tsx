import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading';
import './Search.css';

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
    <form onSubmit={ preventForm } className="container">
      <div>
        <div className="form-container pd-top">
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do artista"
            value={ name }
            className="input"
            onChange={ (element) => setName(element.target.value) }
          />
          <button
            data-testid="search-artist-button"
            disabled={ name.length <= 1 || loading }
            onClick={ handleSearch }
            className="button"
          >
            Procurar
          </button>
        </div>

        {loading && <Loading />}

        {searchAlbums.length > 0 && (
          <div>
            <h2 className="title">{`Resultado de álbuns de: ${backup}`}</h2>
            <ul className="container-card">
              {searchAlbums.map((album: any) => (
                <li
                  key={ album.collectionId }
                  className="card"
                >
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="card-img"
                  >
                    <img src={ album.artworkUrl100 } alt="" />
                    <h3 className="card-title">{ album.collectionName }</h3>
                    <p className="card-p">{ album.artistName }</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && (<h2 className="title pd-top">Nenhum álbum foi encontrado</h2>)}
    </form>
  );
}

export default Search;
