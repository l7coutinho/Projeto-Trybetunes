import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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

  return (
    <div>
      <input
        type="text"
        data-testid="login-name-input"
        onChange={ (element) => setName(element.target.value) }
      />

      <button
        data-testid="login-submit-button"
        disabled={ name.length < 3 }
        onClick={ () => handleSubmit(name) }
      >
        Entrar
      </button>

      { loading && <Loading /> }
    </div>
  );
}

export default Login;
