# Contributing to Vingo Roll Studio

Thank you for your interest in contributing! We love your input. We want to make contributing to this project as easy and transparent as possible.

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## How to Contribute

### Reporting Bugs

**Before creating bug reports**, please check the issue list as you might find out that you don't need to create one.

When you are creating a bug report, please include as many details as possible:

- **Use a clear, descriptive title**
- **Describe the exact steps** which reproduce the problem
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** after following the steps
- **Explain which behavior you expected** to see instead and why
- **Include screenshots and animated GIFs** if possible
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear, descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **expected behavior**
- **Explain why this enhancement** would be useful

---

## Pull Requests

### Development Process

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
4. **Make changes** and commit (`git commit -m 'Add amazing feature'`)
5. **Push** to your fork (`git push origin feature/amazing-feature`)
6. **Open a Pull Request** on the main repository

### PR Guidelines

- Follow the existing code style and conventions
- Include clear, descriptive commit messages
- Update documentation if applicable
- Add tests for new features if applicable
- Keep PRs focused on a single feature or fix
- Reference related issues in PR description

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Getting Started

```bash
# 1. Clone your fork
git clone https://github.com/YOUR-USERNAME/vingo-roll-studio.git
cd vingo-roll-studio

# 2. Add upstream remote
git remote add upstream https://github.com/Mostafa-SAID7/vingo-roll-studio.git

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

# 5. Create feature branch
git checkout -b feature/your-feature
```

### Running Tests & Linters

```bash
# Lint code
npm run lint

# Format code
npm run format

# Build project
npm run build
```

---

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

**Format:**

```
Type: Brief description (72 chars max)

- Bullet point 1
- Bullet point 2

Fixes #123
Related to #456
```

**Types:**

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (formatting, etc)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding or updating tests
- `chore:` - Changes to build process, dependencies, etc

### JavaScript/TypeScript Style

- Use 2 spaces for indentation
- Use single quotes for strings (except JSX)
- Use semicolons
- No trailing commas
- Prefer `const` over `let`
- Use arrow functions when appropriate
- Add JSDoc comments for functions

**Example:**

```typescript
/**
 * Calculates the total price including tax
 * @param price - The base price
 * @param taxRate - The tax rate (0-1)
 * @returns The total price with tax
 */
const calculateTotal = (price: number, taxRate: number): number => {
  return price * (1 + taxRate);
};
```

### Component Style

- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for type safety
- Export only what's necessary
- Use meaningful names

**Example:**

```typescript
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div className="card-modern" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

---

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── common/      # Shared components
│   ├── layout/      # Layout components
│   ├── product/     # Product-specific components
│   └── ui/          # Base UI components
├── routes/          # Page components/routes
├── hooks/           # Custom React hooks
├── store/           # Zustand state stores
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
├── data/            # Mock data
└── styles.css       # Global styles
```

---

## Documentation

- Update `README.md` if you change functionality
- Update relevant files in `docs/` for feature documentation
- Add JSDoc comments to functions and components
- Keep `CHANGELOG.md` updated with significant changes

---

## Review Process

1. **Automated checks** - CI/CD pipeline runs lint, build, and type checks
2. **Code review** - Project maintainers review your code
3. **Testing** - Ensure all tests pass
4. **Approval** - Get approval from reviewers
5. **Merge** - Your PR is merged into main

---

## Community

- **Discussions** - [GitHub Discussions](https://github.com/Mostafa-SAID7/vingo-roll-studio/discussions)
- **Issues** - [GitHub Issues](https://github.com/Mostafa-SAID7/vingo-roll-studio/issues)
- **Twitter** - [@VingoRoll](https://twitter.com/vingoroll)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Acknowledgments

Thank you for contributing to make Vingo Roll Studio better! 🎉

Your contributions, no matter how big or small, are greatly appreciated.
