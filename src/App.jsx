import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Favorites } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
