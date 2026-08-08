# Code Quality Standards

## Overview

This document defines the code quality standards and automated checks for the Vingo Roll Studio project.

## Standards

### TypeScript
- **Target**: 0 compilation errors
- **Command**: `npm run build` (includes TypeScript check)
- **Strict Mode**: Enabled (`tsconfig.json`)
- **exactOptionalPropertyTypes**: Enabled

### ESLint
- **Target**: 0 errors (warnings are acceptable during development)
- **Command**: `npm run lint`
- **Auto-Fix**: `npm run lint -- --fix`
- **Config**: `.eslintrc.js`
- **Plugins**:
  - eslint-plugin-react
  - eslint-plugin-react-hooks
  - @typescript-eslint

### Prettier
- **Print Width**: 100 characters
- **Tabs**: 2 spaces
- **Semi**: true
- **Single Quote**: false
- **Trailing Comma**: all
- **Line Ending**: LF
- **Command**: `npx prettier --write .`

## Automated Checks

### Pre-Commit Hook (Husky)
Runs automatically before each commit:
1. ESLint with `--fix` on staged files
2. Prettier on staged files
3. Git adds fixed files to staging area

**File**: `.husky/pre-commit`

### GitHub Actions Workflows

#### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
Runs on:
- Push to main, develop
- Pull requests
- Schedule: Daily at 00:00 UTC

Checks:
- ✅ TypeScript compilation (`npm run build`)
- ✅ ESLint validation (`npm run lint`)
- ✅ Type checking (included in build)

#### 2. **Auto Lint & Format** (`.github/workflows/lint-fix.yml`)
Runs on:
- Push to main, develop
- Pull requests
- Schedule: Daily at 2:00 AM UTC

Actions:
- Runs ESLint with `--fix`
- Runs Prettier with `--write`
- Auto-commits fixes (if any)
- Pushes to the same branch

#### 3. **Branch Protection** (`.github/workflows/branch-protection.yml`)
Automatically configures:
- **main**: Requires 1 approval, all status checks, no force push
- **develop**: Requires 1 approval, build+lint checks, no force push

## Setup Instructions

### Initial Setup

```bash
# Install dependencies
npm install

# Setup Husky hooks
npx husky install

# Verify setup
npm run lint
npm run build
```

### Running Checks Locally

```bash
# Full lint check
npm run lint

# Auto-fix lint issues
npm run lint -- --fix

# Format code with Prettier
npx prettier --write .

# Build (includes TypeScript check)
npm run build

# Run all checks before push
npm run lint && npm run build
```

## Commit Message Standards

Format: `<type>: <subject>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Formatting changes
- `docs`: Documentation
- `test`: Test-related
- `ci`: CI/CD changes
- `chore`: Maintenance

**Examples**:
```
feat: add dark mode toggle
fix: resolve React hooks violation
ci: update lint workflow
```

## Branch Strategy

### Main Branch
- Production-ready code
- Requires PR with 1 approval
- All checks must pass
- Auto-lint enabled

### Develop Branch
- Integration branch
- Requires PR with 1 approval
- Build + Lint checks required
- Auto-lint enabled

### Feature Branches
- Named: `feature/feature-name`
- Develop against `develop`
- Must pass all checks before PR

## Troubleshooting

### Pre-commit hook not running
```bash
# Re-install hooks
npx husky install
```

### ESLint cache issues
```bash
# Clear cache
npm run lint -- --fix --cache-location .eslintcache
```

### Prettier formatting conflicts
```bash
# Format all files
npx prettier --write .

# Verify no conflicts
npm run lint
```

### Line ending issues (CRLF vs LF)
```bash
# Configure Git
git config core.autocrlf true
git config core.safecrlf false

# Normalize existing files
git add --renormalize .
git commit -m "chore: normalize line endings"
```

## Performance Tips

1. **Use VSCode Extensions**
   - ESLint extension for real-time linting
   - Prettier extension for format-on-save

2. **Pre-commit Optimization**
   - Only runs on staged files
   - ~1-2 seconds for typical commits

3. **CI Caching**
   - npm dependencies cached
   - ESLint cache used across runs

## Continuous Improvement

This code quality setup is reviewed:
- Monthly for performance
- When new tools are adopted
- Based on team feedback

Report issues or suggestions in GitHub Issues.
