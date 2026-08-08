# GitFlow Quick Start Guide

Quick reference for common GitFlow operations. See [docs/GITFLOW.md](./docs/GITFLOW.md) for detailed guide.

---

## 🚀 Quick Commands

### Start a Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Commit with Conventional Format

```bash
git commit -m "feat: add new feature

- Description
- Key points"

# Types: feat, fix, perf, refactor, docs, test, chore
```

### Push and Create PR

```bash
git push -u origin feature/your-feature-name
# Then create PR on GitHub: feature/* → develop
```

### Fix a Bug (Non-Urgent)

```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/bug-name

# Make changes
git add .
git commit -m "fix: resolve bug

- What was wrong
- How it's fixed"

git push -u origin bugfix/bug-name
# Create PR: bugfix/* → develop
```

### Emergency Hotfix (Production)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# Fix the issue
git add .
git commit -m "fix: resolve production issue"

git push -u origin hotfix/critical-issue
# Create PR: hotfix/* → main
```

### Create Release

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update package.json version to 1.2.0
git add package.json
git commit -m "chore: prepare release v1.2.0"
git push -u origin release/v1.2.0

# Create PR: release/* → main
# After approval, merge and GitHub creates tag automatically
```

---

## 📋 Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/name` | `feature/dashboard` |
| Bug Fix | `bugfix/name` | `bugfix/cart-error` |
| Hotfix | `hotfix/name` | `hotfix/payment-down` |
| Release | `release/vX.Y.Z` | `release/v1.2.0` |

---

## 🔄 Release Workflow

```
develop
   ↓
[Create release branch: release/vX.Y.Z]
   ↓
[Update version, commit]
   ↓
[Create PR to main]
   ↓
[Merge to main]
   ↓
[GitHub creates tag automatically]
   ↓
[Merge back to develop]
   ↓
main (production)
```

---

## 🏷️ Automatic Versioning

### How It Works

Your commits automatically determine the version:

| Commits | Version |
|---------|---------|
| `feat: ...` | Minor bump (1.0.0 → 1.1.0) |
| `fix: ...` | Patch bump (1.1.0 → 1.1.1) |
| `BREAKING CHANGE` | Major bump (1.5.0 → 2.0.0) |
| `docs:`, `chore:` | No release |

### Automatic Tag Creation

When you merge to main, GitHub Actions:
1. ✅ Calculates next version
2. ✅ Creates tag automatically
3. ✅ Generates release notes
4. ✅ Publishes release

**No manual tagging needed!**

---

## ✅ Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `perf:` - Performance improvement
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `chore:` - Build, dependencies

### Example

```
feat: add dark mode support

- Toggle theme switcher in header
- Save preference to localStorage
- Update all components for dark colors
- Add theme transition animations

Closes #123
```

---

## 🔀 Keep Your Branch Updated

```bash
# Fetch latest
git fetch origin

# Rebase on develop
git rebase origin/develop

# If conflicts:
# 1. Resolve in editor
# 2. Stage: git add .
# 3. Continue: git rebase --continue

# Force push
git push -f origin feature/name
```

---

## 🚨 Emergency Hotfix

```bash
# From main (production)
git checkout main
git pull origin main
git checkout -b hotfix/critical

# Fix and commit
git add .
git commit -m "fix: resolve critical issue"
git push -u origin hotfix/critical

# After merge to main:
# 1. Merge to main (GitHub)
# 2. Tag created automatically
# 3. Merge back to develop

git checkout develop
git merge --no-ff main
git push origin develop
```

---

## 🆘 Common Issues

### Merge Conflicts

```bash
# Pull latest
git pull origin branch-name

# Resolve in editor (look for <<<, ===, >>>)

# Stage and continue
git add .
git commit -m "chore: resolve conflicts"
git push origin branch-name
```

### Undo Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Wrong Branch

```bash
git checkout correct-branch
```

### Stash Work

```bash
# Save work
git stash

# Apply later
git stash apply
```

---

## 📚 Full Documentation

- **[docs/GITFLOW.md](./docs/GITFLOW.md)** - Complete GitFlow guide
- **[docs/VERSIONING.md](./docs/VERSIONING.md)** - Semantic versioning details
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

---

## 🎯 Summary

**Key Points:**
1. ✅ Always branch off develop
2. ✅ Use semantic commit messages
3. ✅ Create PRs for review
4. ✅ Merge to develop first
5. ✅ Release from main via GitHub
6. ✅ Tags created automatically

**You don't need to:**
- ❌ Create tags manually
- ❌ Update version numbers manually
- ❌ Write release notes manually
- ❌ Commit directly to main

**GitHub Actions handles:**
- ✅ Version detection
- ✅ Tag creation
- ✅ Release publishing
- ✅ Changelog generation

---

**Start coding! 🚀**
