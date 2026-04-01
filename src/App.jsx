import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Favorites, ReflectionHistory } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reflections" element={<ReflectionHistory />} />
      </Routes>
    </>
  );
}

export default App;
