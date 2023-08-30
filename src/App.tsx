import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Layout from './components/Layout/Layout';
import Album from './components/Albums/Album';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>

      <Route index element={ <Login /> } />
    </Routes>
  );
}

export default App;
