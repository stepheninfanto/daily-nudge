import { Link, useLocation } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Nudge
      </h1>
      
      <nav className="flex items-center gap-2">
        <Link
          to="/"
          className={`p-2 rounded-full transition-colors ${
            isHome 
              ? 'bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark' 
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-night-700'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </Link>
        
        <Link
          to="/favorites"
          className={`p-2 rounded-full transition-colors ${
            location.pathname === '/favorites'
              ? 'bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark' 
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-night-700'
          }`}
          aria-label="Favorites"
        >
          <Heart className="w-5 h-5" />
        </Link>
      </nav>
    </header>
  );
}
