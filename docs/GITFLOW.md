# GitFlow & Automated Release Process

Complete guide to GitFlow branching strategy and automatic release with semantic versioning and tags.

---

## 📚 Table of Contents

1. [GitFlow Overview](#gitflow-overview)
2. [Branch Structure](#branch-structure)
3. [Workflow Steps](#workflow-steps)
4. [Commit Convention](#commit-convention)
5. [Release Process](#release-process)
6. [Automated Tagging](#automated-tagging)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Troubleshooting](#troubleshooting)

---

## 🔄 GitFlow Overview

GitFlow is a branching model that provides a robust framework for managing releases and features. It enables:

- ✅ Parallel development of features and releases
- ✅ Automatic versioning and tagging
- ✅ Clean separation between development and production
- ✅ Predictable release cycles
- ✅ Easy hotfix management

---

## 🌳 Branch Structure

### Main Branches

```
main (production)
  ↑
  └─ release/* (release candidates)
       ↑
develop (integration)
  ↑
  ├─ feature/* (features)
  ├─ bugfix/* (bug fixes)
  └─ hotfix/* (production fixes)
```

### Branch Naming Convention

| Branch Type | Naming                | Example                   | Purpose                   |
| ----------- | --------------------- | ------------------------- | ------------------------- |
| **Feature** | `feature/description` | `feature/style-finder`    | New features              |
| **Bugfix**  | `bugfix/description`  | `bugfix/cart-calculation` | Bug fixes (non-urgent)    |
| **Hotfix**  | `hotfix/description`  | `hotfix/payment-error`    | Production fixes (urgent) |
| **Release** | `release/v*`          | `release/v1.2.0`          | Release preparation       |
| **Main**    | `main`                | -                         | Production releases       |
| **Develop** | `develop`             | -                         | Integration branch        |

---

## 🔧 Workflow Steps

### 1️⃣ Feature Development

#### Starting a Feature

```bash
# 1. Update develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch from develop
git checkout -b feature/your-feature-name

# 3. Make changes
# ... edit files ...

# 4. Stage and commit
git add .
git commit -m "feat: add new feature

- Description of changes
- Key improvements
- Related issues #123"

# 5. Push to remote
git push -u origin feature/your-feature-name

# 6. Create Pull Request on GitHub
# - Open PR from feature/* → develop
# - Add description and screenshots
# - Request review
```

#### Updating Your Feature

```bash
# Keep branch updated with develop
git fetch origin
git rebase origin/develop

# If conflicts occur:
# 1. Resolve conflicts in editor
# 2. Stage resolved files
git add .

# 3. Continue rebase
git rebase --continue

# 4. Force push your branch
git push -f origin feature/your-feature-name
```

#### Merging Feature

```bash
# After PR approval:
# GitHub will merge with "Squash and merge"
# This keeps history clean
```

---

### 2️⃣ Bug Fixes (Non-Urgent)

#### Create Bugfix Branch

```bash
# Similar to feature, but from develop
git checkout develop
git pull origin develop
git checkout -b bugfix/description

# Make changes
git add .
git commit -m "fix: resolve bug

- What was broken
- Why it happened
- How it's fixed"

git push -u origin bugfix/description
```

#### Merge to Develop

```bash
# Create PR: bugfix/* → develop
# After approval, merge
```

---

### 3️⃣ Hotfix (Production Issues)

#### Create Hotfix Branch

```bash
# Hotfix branches come FROM main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# Make changes
git add .
git commit -m "fix: resolve critical production issue

- Issue description
- Impact
- Solution"

git push -u origin hotfix/critical-issue
```

#### Merge Hotfix

```bash
# 1. Create PR: hotfix/* → main
# 2. After approval, merge to main
# 3. Merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff hotfix/critical-issue
git push origin develop

# 4. Delete hotfix branch
git push origin --delete hotfix/critical-issue
```

---

### 4️⃣ Release Process

#### Prepare Release

```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Update version in package.json
# Edit package.json:
# "version": "1.2.0"

# 3. Update CHANGELOG.md (if applicable)
# - Document all changes in this release

# 4. Commit version bump
git add package.json CHANGELOG.md
git commit -m "chore: prepare release v1.2.0"

# 5. Push release branch
git push -u origin release/v1.2.0

# 6. Create PR: release/v* → main
```

#### Finalize Release

```bash
# 1. After PR approval and CI passes:
# GitHub merges release to main

# 2. Create release tag
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release version 1.2.0"

# 3. Push tag (triggers automated release)
git push origin v1.2.0

# 4. Merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop

# 5. Delete release branch
git push origin --delete release/v1.2.0
```

---

## 📝 Commit Convention

Follow **Conventional Commits** for automatic versioning.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type                | Semver     | Description                             |
| ------------------- | ---------- | --------------------------------------- |
| **feat**            | Minor      | New feature                             |
| **fix**             | Patch      | Bug fix                                 |
| **perf**            | Patch      | Performance improvement                 |
| **refactor**        | Patch      | Code refactoring (no functional change) |
| **style**           | Patch      | Code style changes (formatting, etc)    |
| **docs**            | No release | Documentation updates                   |
| **test**            | No release | Test additions/modifications            |
| **chore**           | No release | Build, dependency updates, etc          |
| **BREAKING CHANGE** | Major      | Breaking API change                     |

### Examples

**Feature**

```
feat: add style finder quiz

- Implement multi-step quiz interface
- Add result recommendations
- Persist quiz answers to localStorage

Closes #456
```

**Bug Fix**

```
fix: correct cart total calculation

- Apply tax after discounts
- Handle edge case with zero total
- Add validation for negative values

Fixes #789
```

**Breaking Change**

```
feat!: redesign product API

BREAKING CHANGE: Product endpoint now returns array instead of object

The /api/products endpoint has been restructured.
See migration guide in docs/MIGRATION.md

Closes #123
```

---

## 🚀 Release Process

### Automated Release Workflow

When you push a tag, the automated release workflow:

1. ✅ Runs CI checks (lint, build, tests)
2. ✅ Generates release notes from commits
3. ✅ Creates GitHub release with changelog
4. ✅ Publishes to npm (if applicable)
5. ✅ Notifies team via GitHub

### Manual Release Steps

```bash
# 1. Ensure develop is ready
git checkout develop
git pull origin develop

# 2. Create release branch
git checkout -b release/vX.Y.Z

# 3. Update version
# Edit: package.json, version field

# 4. Commit
git add package.json
git commit -m "chore: bump version to X.Y.Z"
git push -u origin release/vX.Y.Z

# 5. Create PR to main
# - Set PR title: "Release vX.Y.Z"
# - Add release notes in description

# 6. After approval, merge to main
# - On GitHub, merge and create release

# 7. Merge back to develop
git checkout develop
git merge --no-ff main
git push origin develop

# 8. Delete release branch
git push origin --delete release/vX.Y.Z
```

---

## 🏷️ Automated Tagging

### Tag Format

```
vMAJOR.MINOR.PATCH
```

**Examples:**

- `v1.0.0` - Initial release
- `v1.2.0` - New feature release
- `v1.2.3` - Patch/bugfix release
- `v2.0.0` - Major breaking change

### Automatic Versioning

Based on commits since last tag:

| Commits                     | Result                           |
| --------------------------- | -------------------------------- |
| `feat:` commits             | Minor bump (e.g., 1.1.0 → 1.2.0) |
| `fix:`, `perf:` commits     | Patch bump (e.g., 1.2.0 → 1.2.1) |
| `BREAKING CHANGE`           | Major bump (e.g., 1.2.0 → 2.0.0) |
| Only `docs:`, `chore:`, etc | No release                       |

### Creating Tags

#### Automatic (via CI)

When you merge to main, CI automatically:

1. Detects version from commits
2. Creates and pushes tag
3. Creates GitHub release

#### Manual Tag Creation

```bash
# 1. Checkout main
git checkout main
git pull origin main

# 2. Create annotated tag
git tag -a v1.2.0 -m "Release version 1.2.0

- Feature 1 description
- Feature 2 description
- Bug fixes"

# 3. Push tag (triggers CI)
git push origin v1.2.0

# 4. View all tags
git tag -l

# 5. Delete tag (if needed)
git tag -d v1.2.0  # local
git push origin :refs/tags/v1.2.0  # remote
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

File: `.github/workflows/release.yml`

```yaml
name: Automated Release

on:
  push:
    branches: [main]
    tags: ["v*"]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Detect version
        id: version
        run: echo "version=$(git describe --tags --always)" >> $GITHUB_OUTPUT

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ steps.version.outputs.version }}
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### What It Does

✅ Runs on every push to main or tag push  
✅ Auto-generates changelog from commits  
✅ Creates GitHub release  
✅ Publishes release artifacts  
✅ Sends notifications

---

## 📊 Complete Example Workflow

### Scenario: Release v1.2.0 with new features and bugfixes

```bash
# ===== Step 1: Feature Development =====

# Start feature
git checkout develop
git checkout -b feature/new-dashboard

# ... make changes ...

git add .
git commit -m "feat: create new dashboard

- Add analytics widgets
- Implement real-time updates"

git push -u origin feature/new-dashboard

# Create PR, get approval, merge to develop


# ===== Step 2: Bug Fixes =====

# Start bugfix
git checkout develop
git checkout -b bugfix/cart-issue

# ... fix bug ...

git add .
git commit -m "fix: resolve cart calculation error

- Apply tax correctly
- Add validation"

git push -u origin bugfix/cart-issue

# Create PR, get approval, merge to develop


# ===== Step 3: Prepare Release =====

# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update version
# Edit package.json: "version": "1.2.0"

git add package.json
git commit -m "chore: prepare release v1.2.0"
git push -u origin release/v1.2.0

# Create PR to main, get approval


# ===== Step 4: Create Release =====

# On GitHub: Merge PR to main

# Create tag (can be automatic or manual)
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# CI automatically:
# 1. Runs tests
# 2. Creates release notes
# 3. Publishes release
# 4. Notifies team


# ===== Step 5: Merge Back to Develop =====

git checkout develop
git merge --no-ff main
git push origin develop

# Delete release branch
git push origin --delete release/v1.2.0
```

---

## ⚠️ Troubleshooting

### Issue: Merge Conflicts

```bash
# 1. Pull latest
git pull origin branch-name

# 2. Resolve conflicts in editor
# Look for: <<<<<<, ======, >>>>>>

# 3. Stage resolved files
git add .

# 4. Complete merge
git commit -m "chore: resolve merge conflicts"
git push origin branch-name
```

### Issue: Wrong Branch

```bash
# 1. Check current branch
git branch

# 2. Switch to correct branch
git checkout main

# 3. Verify
git branch
```

### Issue: Need to Undo Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo pushed commits (create new commit)
git revert HEAD~2..HEAD
git push origin branch-name
```

### Issue: Stash Work in Progress

```bash
# Save work temporarily
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Delete stash
git stash drop
```

### Issue: Update Feature with Latest Develop

```bash
# Fetch latest
git fetch origin

# Rebase on develop
git rebase origin/develop

# If conflicts, resolve and continue
# ... resolve conflicts ...
git add .
git rebase --continue

# Force push
git push -f origin feature/name
```

---

## 📋 Checklist

### Before Starting Feature

- [ ] Branch off from develop: `git checkout develop && git pull`
- [ ] Create feature branch: `git checkout -b feature/description`
- [ ] Follow naming convention: `feature/*`

### Before Creating PR

- [ ] Commit messages follow convention (feat:, fix:, etc)
- [ ] Code passes linting: `npm run lint`
- [ ] Code passes formatting: `npm run format`
- [ ] Tests pass (if applicable)
- [ ] No console errors/warnings
- [ ] Documentation updated

### Before Release

- [ ] All features merged to develop
- [ ] All tests passing
- [ ] Version bumped in package.json
- [ ] Changelog updated
- [ ] Release branch created from develop
- [ ] PR created to main

### After Release

- [ ] Tag created: `v*.*.* `
- [ ] Release published
- [ ] Merge back to develop
- [ ] Release branch deleted
- [ ] Team notified

---

## 🔗 Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - General contribution guidelines
- [README.md](../README.md) - Project overview
- [.github/workflows/](../.github/workflows/) - CI/CD configuration

---

## 💡 Best Practices

✅ **DO:**

- Keep feature branches small and focused
- Commit frequently with clear messages
- Use semantic versioning
- Write good PR descriptions
- Review code thoroughly
- Keep develop and main in sync

❌ **DON'T:**

- Commit directly to main or develop
- Use vague commit messages ("fix bugs")
- Force push to main or develop
- Mix multiple features in one PR
- Forget to update documentation
- Leave merge conflicts unresolved

---

## 📞 Questions?

- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Open a [GitHub Discussion](https://github.com/Mostafa-SAID7/vingo-roll-studio/discussions)
- Review examples in [Git History](https://github.com/Mostafa-SAID7/vingo-roll-studio/commits)

---

**Version:** 1.0  
**Last Updated:** August 2026  
**Status:** ✅ Active & Applied
