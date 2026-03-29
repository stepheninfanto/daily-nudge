import { Heart, Share2, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks';

export function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  const handleShare = async (quote) => {
    const shareText = `"${quote.text}"\n— ${quote.source}\n\nSent via Nudge 💭`;
    
    if (navigator.share && navigator.canShare({ title: 'Nudge', text: shareText })) {
      try {
        await navigator.share({ title: 'Nudge', text: shareText });
        return;
      } catch {
        // User cancelled or error
      }
    }
    
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // Clipboard API not available
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
        <Heart className="w-16 h-16 text-gray-300 dark:text-night-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs">
          Tap the heart icon on quotes you love to save them here for later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Favorites
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {favorites.length} quote{favorites.length !== 1 ? 's' : ''} saved
        </p>
      </header>

      <main className="flex-1 px-4 pb-8">
        <div className="space-y-4">
          {favorites.map((quote) => (
            <div 
              key={quote.id}
              className="p-5 bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700"
            >
              <blockquote className="font-serif text-lg text-gray-800 dark:text-gray-100 mb-3">
                "{quote.text}"
              </blockquote>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                — {quote.source}
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(quote)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                <button
                  onClick={() => removeFavorite(quote.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-red-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
