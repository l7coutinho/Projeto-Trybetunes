import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
      </Route>
    </Routes>
  );
}

export default App;
