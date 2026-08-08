# Project Configuration

This folder contains configuration files for development tools and linting.

## Files

- **.prettierrc** - Code formatter configuration
- **.prettierignore** - Files to exclude from formatting
- **.lintstagedrc.json** - Pre-commit linting rules
- **.rabbit-code-review.yml** - AI code review settings
- **bunfig.toml** - Bun package manager config
- **components.json** - UI component registry

## Configuration Reference

### Prettier (.prettierrc)
- Semicolons: auto
- Quotes: double
- Tab width: 2 spaces
- Trailing commas: es5

### Lint-staged (.lintstagedrc.json)
Runs on commit:
- TypeScript/JavaScript: ESLint + Prettier
- JSON/Markdown: Prettier
- CSS/SCSS: Prettier

### Bunfig (bunfig.toml)
Alternative package manager configuration when using Bun.

## Usage

All tools are configured to be run from root. Configuration files are referenced from package.json scripts.
