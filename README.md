# Nudge - Daily Inspiration PWA

**A gentle nudge to help you focus on what matters.**

Nudge is a minimal, calming Progressive Web App that delivers relatable inspirational quotes from anime, web series, and movies. It includes a daily reflection feature to help you stay grounded and focused.

![Nudge App](https://via.placeholder.com/800x400?text=Nudge+App)

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Quote Display** | Large, readable inspirational quotes displayed beautifully |
| **50+ Curated Quotes** | Handpicked quotes from popular anime, web series, and movies |
| **Daily Reflection** | 4-step evening prompt: Accomplishments, Gratitude, Wasted Focus, Improvement |
| **Streak Tracking** | Track your daily consistency with fire badge counter |
| **Favorites** | Save quotes you love with one tap |
| **Share** | Share quotes via native share or clipboard |
| **Dark Mode** | Auto-detects system preference with manual toggle |
| **PWA** | Install on mobile - works 100% offline |
| **Mobile-First** | Optimized for touch devices |

### Quote Sources

#### Anime (40+ quotes)
| Series | Notable Characters |
|--------|-------------------|
| One Piece | Luffy, Silvers Rayleigh, Fuji |
| My Hero Academia | Deku, Sir Nighteye |
| Attack on Titan | Eren Yeager, Reiner Braun |
| Fullmetal Alchemist | Edward Elric, Roy Mustang, Lan Fan |
| Demon Slayer | Tanjiro Kamado, Obanai Iguro |
| Gurren Lagann | Kamina |
| Naruto | Naruto Uzumaki, Rock Lee, Natsu Dragneel |
| Dragon Ball Z | Yamoshi |
| Sword Art Online | Yuuki Konno |
| Gintama | Gintoki Sakata |
| JoJo's Bizarre Adventure | Jotaro Kujo |
| Slam Dunk | Anzai Mitsuyoshi |
| Kino's Journey | Kino |
| Death Note | Ryuk |
| Hunter x Hunter | Gon Freecss |

#### Web Series / TV Shows (10+ quotes)
| Series | Notable Characters |
|--------|-------------------|
| Breaking Bad | Walter White |
| Brooklyn Nine-Nine | Captain Holt, Jake Peralta |
| How I Met Your Mother | Barney Stinson |
| Community | Abed Nadir |

#### Movies (10+ quotes)
| Movie | Source |
|-------|--------|
| Hamilton | Lin-Manuel Miranda |
| The Shawshank Redemption | Andy Dufresne |
| Home Alone | Kevin's Mom |
| Steve Jobs | Steve Jobs |
| Into the Wild | Christopher McCandless |
| The Secret Garden | Novel |
| Abraham Lincoln | Historical |

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PWA**: vite-plugin-pwa
- **Icons**: Lucide React
- **State**: React Hooks + localStorage
- **Routing**: React Router DOM

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
cd nudge

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

---

## Install as App

### On Mobile (Chrome/Safari)

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (three dots) in the top right
3. Select "Add to Home Screen" or "Install app"

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button at the bottom
3. Scroll down and tap "Add to Home Screen"

### On Desktop (Chrome/Edge)

1. Open the app in Chrome
2. Look for the install icon in the address bar (right side)
3. Click it to install the app

> **Note**: The install icon appears after meeting Chrome's PWA criteria. If it doesn't appear, try using `npm run preview` for the production build.

### Access on Mobile via Local Network

If running the dev server on desktop, you can access it from your mobile device:

```bash
# Find your local IP address
# macOS: ifconfig | grep "inet "
# Windows: ipconfig

# Then open http://<your-ip>:5173 on mobile
```

---

## Project Structure

```
nudge/
├── public/
│   ├── favicon.svg           # App icon
│   ├── pwa-192x192.png       # PWA icon (192px)
│   └── pwa-512x512.png       # PWA icon (512px)
├── src/
│   ├── components/
│   │   ├── DailyReflection.jsx    # 4-step reflection modal
│   │   ├── Header.jsx            # Navigation header
│   │   ├── QuoteCard.jsx         # Quote display card
│   │   ├── StreakBadge.jsx       # Fire streak counter
│   │   ├── ThemeToggle.jsx       # Dark/light mode toggle
│   │   └── index.js
│   ├── hooks/
│   │   ├── useFavorites.js       # Manage favorite quotes
│   │   ├── useReflection.js      # Handle daily reflection
│   │   ├── useStreak.js          # Track streak data
│   │   ├── useTheme.js           # Manage dark/light mode
│   │   └── index.js
│   ├── pages/
│   │   ├── Home.jsx              # Main quote page
│   │   ├── Favorites.jsx         # Saved quotes page
│   │   └── index.js
│   ├── data/
│   │   └── quotes.js             # Curated quotes collection
│   ├── App.jsx                   # Root component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + custom styles
├── index.html
├── vite.config.js               # Vite + PWA configuration
├── tailwind.config.js           # Tailwind customization
└── package.json
```

---

## Future Improvements (V2)

| Feature | Description | Status |
|---------|-------------|--------|
| **Push Notifications** | 6 AM daily quote reminder via Web Push API | Planned |
| **Custom Notification Time** | Allow users to set their preferred notification time | Planned |
| **Quote Categories** | Filter quotes by Anime, Web Series, Movies | Planned |
| **Reflection History** | View and browse past reflections | Planned |
| **Export Data** | Download favorites and reflections as JSON | Planned |

---

## Product Roadmap

### V1 (Current) - Core MVP ✓

- [x] Quote generator with curated collection
- [x] Daily reflection with 4 prompts
- [x] Streak tracking (increments on daily open)
- [x] Dark mode with system preference detection
- [x] PWA support with offline functionality
- [x] Favorites system with localStorage
- [x] Share functionality

### V2 - Engagement

- [ ] Push notifications (6 AM daily reminder)
- [ ] Customizable notification time
- [ ] Quote category filters
- [ ] Reflection history view
- [ ] Better onboarding flow

### V3 - Polish & Growth

- [ ] Community quotes (user submissions)
- [ ] Quote of the day widget
- [ ] iOS/Android home screen widgets
- [ ] Apple Watch complications
- [ ] Analytics integration
- [ ] Multiple theme options

---

## Data Storage

All data is stored locally in your browser using `localStorage`:

| Key | Data |
|-----|------|
| `nudge-favorites` | Array of saved favorite quotes |
| `nudge-streak` | Streak count, last completion date, total completions |
| `nudge-reflection` | Today's reflection answers |
| `nudge-theme` | User's theme preference (optional) |

> **Privacy**: Your data never leaves your device. Everything is stored locally.

---

## Contributing

We welcome contributions! Here's how you can help:

### Contributing Quotes

Everyone loves a good quote! Help us grow our collection.

#### Rules for Quotes

1. Quote must be from anime, web series, or movies
2. Must be motivational or inspirational
3. Include character/source name
4. Keep it appropriate (no profanity)
5. Add relevant tags for categorization

#### Format

```javascript
{
  id: XX,  // Use the next available ID
  text: "Your quote here",
  source: "Series Name - Character Name",
  category: "anime",  // "anime", "web series", or "movie"
  tags: ["motivation", "perseverance"]  // 2-4 relevant tags
}
```

#### How to Submit

1. Fork the repository
2. Add your quote to `src/data/quotes.js`
3. Follow the existing format and ordering
4. Submit a pull request with "Quote: [Series Name]" in the title
5. Wait for review and merge!

### Contributing Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Reporting Issues

Found a bug or have a feature request? Open an issue!

---

## GitHub Topics

`pwa` `react` `quotes` `productivity` `daily-reflection` `anime` `motivation`

---

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

## Disclaimer

All quotes featured in this app are the intellectual property of their respective creators and original works. The quotes are included for **inspirational and personal use only**. This app does not claim ownership of any quotes and they are used in the spirit of fair use for motivational purposes.

If you are a rights holder and believe your quote has been used inappropriately, please contact us and we will address it promptly.

---

## Acknowledgments

Quotes are sourced from popular anime, web series, and movies that inspire and motivate. All quotes belong to their respective creators and are used for inspirational purposes.
