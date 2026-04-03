import { Heart, Share2, RefreshCw } from "lucide-react";

export function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  onNewQuote,
  onShare,
  onStartReflection,
}) {
  const handleShare = async () => {
    const shareData = {
      title: "Nudge",
      text: `"${quote.text}"\n— ${quote.source}`,
    };

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          onShare(quote);
        }
      }
    } else {
      onShare(quote);
    }
  };

  return (
    <div
      className="
      flex flex-col flex-1
      px-6 py-8
      animate-fade-in
      items-center justify-center
    "
    >
      <div
        className="
          max-w-lg w-full
          space-y-6
          text-center
        "
      >
        <blockquote
          className="
            font-serif text-2xl leading-relaxed
            md:text-3xl
            lg:text-4xl
          "
        >
          "{quote.text}"
        </blockquote>

        <cite
          className="
            block

            not-italic dark:text-amber-300
          "
        >
          — {quote.source}
        </cite>

        <div
          className="
            flex
            pt-4
            items-center justify-center gap-3
          "
        >
          <button
            onClick={() => onToggleFavorite(quote)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`
              p-3
              rounded-full
              transition-all
              active:scale-90
              ${
                isFavorite
                  ? "text-red-500 bg-red-50 dark:bg-red-500/10"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              }
            `}
          >
            <Heart
              className={`
                w-6 h-6
                ${isFavorite ? "fill-current" : ""}
              `}
            />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share quote"
            className="
              p-3
              text-gray-400
              rounded-full
              transition-all
              hover:text-accent-light dark:hover:text-accent-dark
              hover:bg-gray-50 dark:hover:bg-night-700 active:scale-90
            "
          >
            <Share2
              className="
                w-6 h-6
              "
            />
          </button>

          <button
            onClick={onNewQuote}
            aria-label="Get new quote"
            className="
              p-3
              text-gray-400
              rounded-full
              transition-all
              hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-50 dark:hover:bg-night-700 active:scale-90
            "
          >
            <RefreshCw
              className="
                w-6 h-6
              "
            />
          </button>
        </div>

        <button
          onClick={onStartReflection}
          className="
            mt-4 px-6 py-3
            text-white font-medium
            bg-accent-light
            rounded-full
            transition-opacity
            hover:opacity-90 active:scale-95
            "
        >
          Start Reflection
        </button>
      </div>
    </div>
  );
}
