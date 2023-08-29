import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (userName: string) => {
    setLoading(true);
    createUser({ name: `${userName}` })
      .then(() => {
        setLoading(false);
        navigate('/search');
      })
      .catch(() => {
        setLoading(false);
        console.error('Erro ao criar usuário');
      });
  };

  function preventForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={ preventForm } className="pd-top">
      <div className="container">
        <input
          type="text"
          data-testid="login-name-input"
          className="input"
          placeholder="Insira seu nome"
          onChange={ (element) => setName(element.target.value) }
        />

        <button
          data-testid="login-submit-button"
          disabled={ name.length < 3 }
          className="button"
          onClick={ () => handleSubmit(name) }
        >
          Entrar
        </button>

        { loading && <Loading /> }
      </div>
    </form>
  );
}

export default Login;
