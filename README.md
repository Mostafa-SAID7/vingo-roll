# 🪟 Vingo Roll Studio

Premium made-to-measure curtains & window treatments platform built with React 19 & TanStack.

> **Frontend-only demo** • Mock data • No backend required

---

## ✨ Features

- 🛍️ **Shop** - Browse by category, room, or style
- 🎨 **Style Finder** - Interactive style quiz
- 📏 **Measuring Guide** - DIY measurement tools
- 🎁 **Swatch Builder** - Request material samples
- 💰 **Quote Builder** - Instant pricing
- 📸 **Inspiration Gallery** - Design ideas
- 🌙 **Dark Mode** - Full theme support
- ♿ **Accessible** - WCAG AA compliant
- 📱 **Responsive** - Mobile-optimized

---

## 🚀 Quick Start

**Requirements:** Node.js 20+

```bash
git clone https://github.com/Mostafa-SAID7/vingo-roll-studio.git
cd vingo-roll-studio
npm install && npm run dev
# → http://localhost:5173
```

---

## 🛠️ Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Check code quality
npm run format    # Auto-format code
```

---

## 📦 Tech Stack

```
React 19           Frontend framework
TanStack Start     Fullstack framework
TanStack Router    Advanced routing
Tailwind CSS       Utility-first styling
Radix UI           Accessible components
Zustand            State management
TypeScript         Type safety
Vite               Fast bundling
```

---

## 🐳 Docker Deployment

### Pull & Run

```bash
# From Docker Hub
docker pull mohammedhossam/vingo-roll-studio:v1.9.4
docker run -p 3000:3000 mohammedhossam/vingo-roll-studio:v1.9.4

# From GHCR
docker pull ghcr.io/Mostafa-SAID7/vingo-roll-studio:v1.9.4
docker run -p 3000:3000 ghcr.io/Mostafa-SAID7/vingo-roll-studio:v1.9.4
```

### Docker Compose

```yaml
version: '3.8'
services:
  vingo-app:
    image: mohammedhossam/vingo-roll-studio:v1.9.4
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## 📚 Tech Stack Details

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 |
| **Framework** | TanStack Start |
| **Routing** | TanStack Router |
| **Styling** | Tailwind CSS v4 |
| **UI** | Radix UI Components |
| **Forms** | React Hook Form + Zod |
| **State** | Zustand + TanStack Query |
| **Build** | Vite |
| **Language** | TypeScript |
| **Linting** | ESLint |
| **Formatting** | Prettier |

---

## 📂 Project Structure

```
src/
├── components/       React components
├── routes/          Page routes & layouts
├── store/           Zustand state management
├── lib/             Utilities & helpers
└── styles.css       Global theme
```

---

## 🎨 Design System

Modern, premium aesthetic:
- Rounded corners (6-24px) for contemporary look
- Glassmorphism with semi-transparent surfaces
- Smooth animations (60fps GPU accelerated)
- Custom themed scrollbars
- Rich shadows for visual hierarchy

See [docs/STYLING_CHANGES.md](./docs/STYLING_CHANGES.md)

---

## 🎯 Core Routes

```
/                          Homepage
/shop                      Product catalog
/product/[id]              Product details
/style-finder              Interactive quiz
/inspiration               Design gallery
/swatches                  Request samples
/guides/measuring          Measurement help
/cart                      Shopping cart
```

---

## ♿ Accessibility & Performance

- ✅ WCAG AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Respects reduced motion
- ⚡ ~60fps animations
- 📦 Code splitting by route
- 🎯 Tree-shaking enabled

---

## 🔄 State Management

- **Zustand** - Lightweight global state
- **TanStack Query** - Data fetching patterns
- **localStorage** - Client-side persistence
- **No backend** - All data is mock

---

## 📖 Docs

- [Contributing](./CONTRIBUTING.md)
- [Styling System](./docs/STYLING_CHANGES.md)
- [Component Guide](./docs/IMPLEMENTATION_GUIDE.md)
- [Favicon Design](./docs/FAVICON_GUIDE.md)

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
