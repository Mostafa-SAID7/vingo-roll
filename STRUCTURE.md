# Project Structure Guide

## Root Level Files (Keep Here)

### Essential Build Files
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler config
- `eslint.config.js` - ESLint rules

### Project Documentation  
- `README.md` - Main project guide
- `LICENSE` - MIT License
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community guidelines

### DotFiles (Keep at Root for Tools)
- `.gitignore` - Git ignore patterns
- `.npmrc` - NPM configuration
- `.nvmrc` - Node version
- `.prettierrc` - Prettier config
- `.prettierignore` - Files to skip
- `.lintstagedrc.json` - Pre-commit linting
- `.dockerignore` - Docker exclusions

### Development
- `index.html` - HTML entry point
- `eslint.config.js` - ESLint rules

---

## Organized Folders

### `/docker` - Docker & Deployment
Contains containerization files:
- `Dockerfile` - Production build
- `Dockerfile.dev` - Development build
- `docker-compose.yml` - Production compose
- `docker-compose.dev.yml` - Development compose
- `nginx.conf` - Web server config
- `README.md` - Docker guide

**Note:** Still in root for build tools - consider symlinking if needed

### `/config` - Tool Configuration
Contains config files:
- `.prettierrc` - Prettier settings
- `. lintstagedrc.json` - Lint on commit
- `.rabbit-code-review.yml` - Code review
- `bunfig.toml` - Bun config
- `components.json` - Components registry
- `README.md` - Config guide

**Note:** Referenced from root dotfiles

### `/src` - Source Code
- `/components` - React components
- `/routes` - Page routes
- `/store` - Zustand state
- `/lib` - Utilities
- `/data` - Mock data
- `/types` - TypeScript types
- `/hooks` - Custom hooks

### `/public` - Static Assets
- `favicon.svg` - App icon
- `/images` - Image assets
- `/fonts` - Font files

### `/docs` - Documentation
- `STYLING_CHANGES.md` - Design system
- `IMPLEMENTATION_GUIDE.md` - Component guide
- `PROJECT_STATUS.md` - Current status
- And more...

### `/.github` - GitHub Configuration
- `/workflows` - GitHub Actions CI/CD
- `CODEOWNERS` - Code ownership
- Pull request templates
- Issue templates

### `/.husky` - Git Hooks
- `pre-commit` - Pre-commit hooks

---

## Why Files Stay at Root

### DotFiles (.prettierrc, .npmrc, etc.)
- **Reason:** Tools expect them at project root
- **Standard:** Unix convention for tool configuration
- **Example:** `npm run format` looks for `.prettierrc` at `./`

### package.json & tsconfig.json
- **Reason:** Build tools auto-detect at root
- **Standard:** Node.js/npm convention
- **Alternative:** Can be configured, but creates complexity

### Dockerfile & docker-compose
- **Reason:** Docker looks for `Dockerfile` at build context root
- **Note:** We organized by creating `/docker` folder with README
- **Future:** Can symlink or update build commands once tested

---

## Future Improvements

✅ **Done:**
- Organized Docker files in `/docker` folder
- Organized configs in `/config` folder
- Created README files in both
- Kept root clean with structure guide

⏳ **Could Do:**
- Create `/build` folder for build scripts
- Move `.github` to `/github` (but breaks GitHub detection)
- Create `.prettierrc` in `/config` with root pointing to it
- Update docker build commands to reference `/docker/Dockerfile`

❌ **Don't Do:**
- Move dotfiles from root (breaks tool auto-detection)
- Remove package.json from root (Node.js standard)
- Move tsconfig.json (TypeScript expects it at root)
