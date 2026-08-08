# Release Management Guide

Complete guide to managing releases, versioning, and automated tagging for Vingo Roll Studio.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Semantic Versioning](#semantic-versioning)
3. [Release Workflow](#release-workflow)
4. [Automated Tagging](#automated-tagging)
5. [Creating Releases](#creating-releases)
6. [Release Notes](#release-notes)
7. [Hotfix Releases](#hotfix-releases)
8. [Version History](#version-history)

---

## 🎯 Overview

Vingo Roll Studio uses **Semantic Versioning** and **GitFlow** for managing releases. All releases are:

- ✅ Tagged with semantic version
- ✅ Automatically generated from commits
- ✅ Published with release notes
- ✅ Tracked in CHANGELOG.md

### Key Principles

1. **Semantic Versioning**: MAJOR.MINOR.PATCH
2. **Conventional Commits**: Automatic version detection
3. **Automated Tagging**: CI/CD creates tags and releases
4. **Release Notes**: Auto-generated from commit messages
5. **Changelog**: Manually maintained for clarity

---

## 🔢 Semantic Versioning

### Format

```
vMAJOR.MINOR.PATCH
```

**Example**: `v1.2.3`

### Version Bumping

| Change Type                            | Bump  | Example       | Commit Type       |
| -------------------------------------- | ----- | ------------- | ----------------- |
| **Breaking API change**                | MAJOR | 1.x.x → 2.0.0 | `BREAKING CHANGE` |
| **New features (backward compatible)** | MINOR | 1.2.x → 1.3.0 | `feat:`           |
| **Bug fixes**                          | PATCH | 1.2.3 → 1.2.4 | `fix:`            |
| **Performance improvements**           | PATCH | 1.2.3 → 1.2.4 | `perf:`           |

### Current Version

**Latest**: v1.0.0 (Released: 2026-08-08)

View all versions: [GitHub Releases](https://github.com/yourusername/vingo-roll-studio/releases)

---

## 🔄 Release Workflow

### Step 1: Develop Features

Work on features, bugfixes, and improvements in feature branches:

```bash
# Create feature branch
git checkout develop
git checkout -b feature/new-feature

# Make changes, commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR to develop
git push -u origin feature/new-feature
```

### Step 2: Create Release Branch

When ready to release:

```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update CHANGELOG.md with release notes
# Update version in package.json (optional, CI can do this)

# Commit
git add package.json CHANGELOG.md
git commit -m "chore: prepare release v1.2.0"
git push -u origin release/v1.2.0

# Create PR: release/v* → main
```

### Step 3: Merge to Main

```bash
# After PR approval, merge to main on GitHub
# This triggers the automated release workflow
```

### Step 4: Automated Release

The CI/CD pipeline automatically:

1. Detects version from commits
2. Creates git tag
3. Generates release notes
4. Publishes GitHub release
5. Updates package.json

### Step 5: Merge Back to Develop

```bash
# Merge main back to develop
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop

# Delete release branch
git push origin --delete release/v1.2.0
```

---

## 🏷️ Automated Tagging

### How It Works

**File**: `.github/workflows/release.yml`

1. **Trigger**: Push to main branch
2. **Analysis**: Reads commits since last tag
3. **Detection**: Determines version bump needed
4. **Tagging**: Creates git tag
5. **Release**: Publishes to GitHub

### Tag Format

```
v1.0.0  ← starts with 'v'
 ↑
 Semantic version (MAJOR.MINOR.PATCH)
```

### Commit Analysis

The workflow reads commit messages to determine version:

```
feat:      → Minor bump (new feature)
fix:       → Patch bump (bug fix)
perf:      → Patch bump (performance)
docs:      → No bump (documentation)
chore:     → No bump (maintenance)
BREAKING CHANGE → Major bump (breaking change)
```

### Example

```
# Commits since v1.0.0:
feat: add new feature          ← New minor feature
fix: resolve bug               ← Bug fix
docs: update README            ← No bump

# Result: v1.1.1 (Minor: feat, Patch: fix)
```

---

## 📦 Creating Releases

### Automatic Release (Recommended)

1. **Make commits** with conventional message types:

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue"
   ```

2. **Create PR to main**
   - Merge when ready to release
   - CI automatically creates tag and release

3. **CI Does Everything**:
   - ✅ Runs tests
   - ✅ Creates tag
   - ✅ Generates release notes
   - ✅ Publishes release
   - ✅ Updates package.json

### Manual Release (If Needed)

```bash
# 1. Checkout main
git checkout main
git pull origin main

# 2. Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0

- Feature description
- Another feature
- Bug fix"

# 3. Push tag (triggers CI)
git push origin v1.2.0

# 4. GitHub creates release automatically
```

### Release Checklist

Before creating a release:

- [ ] All features merged to develop
- [ ] All tests passing
- [ ] Code review completed
- [ ] Commit messages are conventional
- [ ] CHANGELOG.md updated
- [ ] version in package.json matches tag
- [ ] No breaking changes in PATCH releases
- [ ] Documentation updated

---

## 📝 Release Notes

### Auto-Generated

GitHub automatically generates release notes from:

- ✅ Merged pull requests
- ✅ Contributors
- ✅ Commit messages
- ✅ Referenced issues

### Example Auto-Generated Release

```
## What's Changed

### New Features
- **feat**: Add style finder quiz (#456)
- **feat**: Implement wishlist system (#789)

### Bug Fixes
- **fix**: Correct cart calculation (#321)
- **fix**: Resolve loading state (#654)

### Improvements
- **perf**: Optimize image loading (#987)
- **refactor**: Simplify component logic

### Documentation
- Update README with API docs
- Add contributing guidelines

### Contributors
- @dev1 made 3 contributions
- @dev2 made 1 contribution

**Full Changelog**: [v1.0.0...v1.1.0](link)
```

### Manual Release Notes

For detailed release notes, edit GitHub release after creation:

1. Go to [GitHub Releases](https://github.com/yourusername/vingo-roll-studio/releases)
2. Click "Edit" on the release
3. Add custom release notes
4. Save

---

## 🚨 Hotfix Releases

For critical production issues:

### Hotfix Process

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# 2. Fix the issue
git add .
git commit -m "fix: resolve critical production issue"

# 3. Push and create PR to main
git push -u origin hotfix/critical-issue

# 4. After approval, merge to main
# This triggers automated release as PATCH version

# 5. Merge back to develop
git checkout develop
git merge --no-ff main
git push origin develop

# 6. Delete hotfix branch
git push origin --delete hotfix/critical-issue
```

### Hotfix Example

```
Current version: v1.2.0
Hotfix created: v1.2.1 (automatic patch bump)
Next feature: v1.3.0 (minor bump continues)
```

---

## 📊 Version History

### Current Releases

| Version     | Date       | Status    | Key Features           |
| ----------- | ---------- | --------- | ---------------------- |
| v1.0.0      | 2026-08-08 | ✅ Latest | MVP, all core features |
| v1.0.0-beta | 2026-07-01 | 🔴 Beta   | Pre-release testing    |

### Upcoming

| Version | Status            | Target  |
| ------- | ----------------- | ------- |
| v1.1.0  | 🔄 In Development | Q1 2027 |
| v2.0.0  | 📋 Planned        | Q2 2027 |

### View All Releases

- [GitHub Releases](https://github.com/yourusername/vingo-roll-studio/releases)
- [CHANGELOG.md](../CHANGELOG.md)

---

## 🔍 CI/CD Pipeline

### Release Workflow File

**Location**: `.github/workflows/release.yml`

**Triggers**:

- Push to main branch
- Manual trigger via GitHub Actions
- Tag push

**Steps**:

1. Determine version from commits
2. Create git tag
3. Generate release notes
4. Create GitHub release
5. Update package.json
6. Notify team

### View Workflow Status

1. Go to [GitHub Actions](https://github.com/yourusername/vingo-roll-studio/actions)
2. Select "Automated Release & Tagging"
3. View workflow runs
4. Check logs for details

### Workflow Outputs

The workflow provides:

- **version**: Detected semantic version
- **should-release**: Whether to create release
- **release-url**: URL of created release
- **release-id**: GitHub release ID

---

## 📚 Related Documentation

- [GITFLOW.md](./GITFLOW.md) - Git workflow strategies
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines
- [CHANGELOG.md](../CHANGELOG.md) - Change history
- [README.md](../README.md) - Project overview

---

## 💡 Best Practices

### ✅ DO

- Use conventional commit messages
- Create release branches for stability
- Update CHANGELOG before releasing
- Create annotated tags for releases
- Write clear PR descriptions
- Test before releasing
- Document breaking changes
- Tag with semantic version

### ❌ DON'T

- Commit directly to main
- Use vague commit messages
- Release without testing
- Forget to update CHANGELOG
- Create lightweight tags for releases
- Release without code review
- Skip documentation
- Force push to main or tags

---

## ⚙️ Configuration

### Package.json

```json
{
  "name": "vingo-roll-studio",
  "version": "1.0.0",
  "description": "Modern ecommerce platform for window treatments",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/vingo-roll-studio.git"
  }
}
```

### GitHub Settings

1. **Branch Protection** (main):
   - Require PR reviews
   - Require status checks to pass
   - Dismiss stale reviews
   - Require branches to be up to date

2. **Automated Releases**:
   - Enable via Actions workflow
   - Configure permissions (contents: write)

3. **Release Tags**:
   - Protect tags matching `v*`
   - Require code review
   - Auto-tag on merge

---

## 🤝 Examples

### Creating a Feature Release

```bash
# Develop features
git checkout feature/new-feature
git commit -m "feat: add new dashboard
- Implement real-time updates
- Add analytics widgets"

# Merge to develop
git checkout develop
git merge feature/new-feature

# Create release
git checkout -b release/v1.1.0
# Update CHANGELOG, package.json
git commit -m "chore: prepare release v1.1.0"
git push origin release/v1.1.0

# Merge to main (via PR)
# CI automatically creates v1.1.0 tag and release
```

### Creating a Hotfix Release

```bash
# Fix critical issue
git checkout main
git checkout -b hotfix/payment-bug
git commit -m "fix: resolve payment processing error"

# Merge to main
git checkout main
git merge hotfix/payment-bug

# CI automatically creates v1.0.1 tag
```

---

## 📞 Support

For questions about releases:

- Check [GITFLOW.md](./GITFLOW.md)
- Review [GitHub Actions Logs](https://github.com/yourusername/vingo-roll-studio/actions)
- Open a [GitHub Issue](https://github.com/yourusername/vingo-roll-studio/issues)
- Start a [GitHub Discussion](https://github.com/yourusername/vingo-roll-studio/discussions)

---

**Version**: 1.0  
**Last Updated**: August 2026  
**Status**: ✅ Active
