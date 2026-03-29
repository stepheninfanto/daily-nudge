import { Heart, Share2, RefreshCw } from 'lucide-react';

export function QuoteCard({ quote, isFavorite, onToggleFavorite, onNewQuote, onShare, onStartReflection }) {
  const handleShare = async () => {
    const shareData = {
      title: 'Nudge',
      text: `"${quote.text}"\n— ${quote.source}`,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          onShare(quote);
        }
      }
    } else {
      onShare(quote);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 animate-fade-in">
      <div className="max-w-lg w-full text-center space-y-6">
        <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800 dark:text-gray-100">
          "{quote.text}"
        </blockquote>
        
        <cite className="not-italic text-base text-gray-500 dark:text-gray-400 block">
          — {quote.source}
        </cite>
        
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => onToggleFavorite(quote)}
            className={`p-3 rounded-full transition-all active:scale-90 ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-500/10' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-3 rounded-full text-gray-400 hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-50 dark:hover:bg-night-700 transition-all active:scale-90"
            aria-label="Share quote"
          >
            <Share2 className="w-6 h-6" />
          </button>
          
          <button
            onClick={onNewQuote}
            className="p-3 rounded-full text-gray-400 hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-50 dark:hover:bg-night-700 transition-all active:scale-90"
            aria-label="Get new quote"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
        
        <button
          onClick={onStartReflection}
          className="mt-4 px-6 py-3 bg-accent-light dark:bg-accent-dark text-white rounded-full font-medium hover:opacity-90 transition-opacity active:scale-95"
        >
          Start Reflection
        </button>
      </div>
    </div>
  );
}
