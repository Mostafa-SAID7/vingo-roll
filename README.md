# Vingo Roll Studio

Premium made-to-measure curtains, blinds, shades & window treatments ecommerce platform built with modern web technologies.

> **Note:** This is a frontend-only demo with mock data. No backend, database, or real API integration.

---

## ✨ Features

- 🛍️ **Shop** - Browse collections by category, room, or style
- 🎨 **Style Finder** - AI-style quiz to discover perfect treatments
- 📏 **Measuring Guide** - Comprehensive measurement instructions & tools
- 🎁 **Swatch Builder** - Request free material samples
- 💬 **Consultation** - Schedule design consultations (frontend flow)
- 📊 **Quote Builder** - Get instant quote estimates
- 🎨 **Inspiration Gallery** - Room-based design inspiration
- 🌙 **Dark Mode** - Full light/dark theme support
- ♿ **Accessible** - WCAG AA compliant components
- 📱 **Responsive** - Mobile-first design

---

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ & npm

```bash
# Clone & setup
git clone https://github.com/Mostafa-SAID7/vingo-roll-studio.git
cd vingo-roll-studio
npm install

# Start development
npm run dev

# Visit http://localhost:5173
```

---

## 📚 Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| **Framework**  | React 19 + TanStack Start    |
| **Routing**    | TanStack Router              |
| **Styling**    | Tailwind CSS v4              |
| **Components** | Radix UI                     |
| **Forms**      | React Hook Form + Zod        |
| **State**      | Zustand + TanStack Query     |
| **Build**      | Vite                         |
| **Dev**        | TypeScript, ESLint, Prettier |

---

## 📂 Project Structure

```
vingo-roll-studio/
├── .github/              # GitHub Actions & configs
├── docs/                 # Detailed documentation
├── public/               # Static assets & favicon
├── src/
│   ├── components/       # React components
│   ├── routes/           # Page routes
│   ├── styles.css        # Global theme & animations
│   ├── store/            # Zustand state
│   └── lib/              # Utilities & helpers
├── package.json
├── vite.config.ts        # Vite configuration
└── README.md
```

---

## 🛠️ Available Commands

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Build for production
npm run build:dev    # Build with dev settings
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 📖 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines
- **[docs/](./docs)** - Detailed guides & documentation
- **[docs/STYLING_CHANGES.md](./docs/STYLING_CHANGES.md)** - Modern styling system
- **[docs/IMPLEMENTATION_GUIDE.md](./docs/IMPLEMENTATION_GUIDE.md)** - Component usage
- **[docs/FAVICON_GUIDE.md](./docs/FAVICON_GUIDE.md)** - Favicon design

---

## 🎨 Design System

Modern, premium aesthetic featuring:

- **Rounded corners** (6px - 24px) for contemporary look
- **Glassmorphism** with semi-transparent surfaces & backdrop blur
- **Smooth animations** (8 keyframe animations available)
- **Custom scrollbars** themed for light/dark modes
- **Rich shadows & depth** for visual hierarchy
- **Micro-interactions** on all interactive elements

See [docs/STYLING_CHANGES.md](./docs/STYLING_CHANGES.md) for full details.

---

## 🎯 Core Routes

### Customer Experience

- `/` - Homepage
- `/shop` - Product catalog
- `/shop/[category]` - Category view
- `/product/[id]` - Product detail
- `/style-finder` - Interactive style quiz
- `/inspiration` - Design inspiration gallery

### Services

- `/swatches` - Swatch request tool
- `/guides/measuring` - Measurement guide
- `/services/design-consultation` - Book consultation
- `/quote` - Get quote estimate

### Account

- `/wishlist` - Saved items
- `/cart` - Shopping cart
- `/account` - User account (mock)

---

## 🔄 Data & State

**Frontend Only:**

- All data is mock/static
- localStorage for client-side state (cart, wishlist, preferences)
- Zustand for global state management
- TanStack Query for data fetching patterns

**No Backend:**

- No database
- No real API
- No user authentication
- No payment processing

---

## 🎨 Customization

### Theme Colors

Edit variables in `src/styles.css`:

```css
:root {
  --primary: oklch(0.345 0.04 48); /* Warm brown */
  --accent: oklch(0.585 0.068 62); /* Bronze/gold */
  --background: oklch(0.977 0.008 85); /* Ivory */
  --card: oklch(0.962 0.011 82); /* Off-white */
}
```

### Brand Favicon

Custom SVG favicon in `public/favicon.svg`. Edit directly or replace with your design.

### Component Styling

All components use utility-first Tailwind + custom modifiers. See [STYLING_CHANGES.md](./docs/STYLING_CHANGES.md).

---

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation throughout
- Screen reader support
- High contrast focus states
- Respects `prefers-reduced-motion`
- Semantic HTML structure

---

## 📱 Browser Support

| Browser         | Support |
| --------------- | ------- |
| Chrome 90+      | ✅ Full |
| Firefox 87+     | ✅ Full |
| Safari 14+      | ✅ Full |
| Edge 90+        | ✅ Full |
| Mobile browsers | ✅ Full |

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
# Output: dist/
```

### Deploy Options

- **Vercel** - Zero config deployment
- **Netlify** - Drop-in deploy
- **GitHub Pages** - Static hosting
- **Docker** - Container deployment
- **Any static host** - Just serve `dist/`

### Environment Setup

No environment variables needed for demo. For production:

```bash
# .env.local (example)
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-id
```

---

## 📊 Performance

- ⚡ **Vite** - Instant HMR and fast builds
- 📦 **Tree shaking** - Only ship used code
- 🎯 **Code splitting** - Route-based chunking
- 🖼️ **Image optimization** - Lazy loading ready
- 🚀 **GPU accelerated** - Smooth 60fps animations

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
# 1. Fork the repository
# 2. Create feature branch (git checkout -b feature/amazing-feature)
# 3. Commit changes (git commit -m 'Add amazing feature')
# 4. Push branch (git push origin feature/amazing-feature)
# 5. Open Pull Request
```

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Mostafa SAID** - [GitHub](https://github.com/Mostafa-SAID7)

---

## 🙏 Acknowledgments

- [React](https://react.dev)
- [TanStack](https://tanstack.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Vite](https://vitejs.dev)

---

## 📞 Support

- 📖 [Documentation](./docs)
- 🐛 [Report Bug](https://github.com/Mostafa-SAID7/vingo-roll-studio/issues)
- 💡 [Request Feature](https://github.com/Mostafa-SAID7/vingo-roll-studio/discussions)

---

**Built with ❤️ for premium window treatments**
