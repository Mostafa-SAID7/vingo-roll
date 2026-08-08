# Versioning & Release Strategy

Guide to semantic versioning and release management for Vingo Roll Studio.

---

## 📌 Version Format

We follow **Semantic Versioning (SemVer)**:

```
MAJOR.MINOR.PATCH
v  1  .  2  .  0
   |     |     |
   |     |     └─ Patch: Bug fixes, minor changes
   |     └─────── Minor: New features, backward compatible
   └───────────── Major: Breaking changes
```

### Examples

| Version | Type | Reason |
|---------|------|--------|
| v1.0.0 | Release | Initial release |
| v1.1.0 | Minor | New feature added |
| v1.1.1 | Patch | Bug fix |
| v2.0.0 | Major | Breaking API change |
| v1.2.3 | Patch | Security fix |

---

## 🔄 Automatic Version Bumping

### How It Works

1. **Commits are analyzed** - We look at commits since last tag
2. **Type is determined** - Based on commit messages
3. **Version is calculated** - Using SemVer rules
4. **Tag is created** - Automatically on main branch
5. **Release is published** - With auto-generated changelog

### Commit Type → Version Bump

| Commit Type | Version Impact | Example |
|------------|--------|---------|
| `feat:` | Minor bump | `1.0.0` → `1.1.0` |
| `fix:` | Patch bump | `1.1.0` → `1.1.1` |
| `perf:` | Patch bump | `1.0.5` → `1.0.6` |
| `refactor:` | Patch bump | `1.0.0` → `1.0.1` |
| `BREAKING CHANGE` | Major bump | `1.5.0` → `2.0.0` |
| `docs:`, `test:`, `chore:` | No release | (no version bump) |

### Examples

**Minor Release (new feature)**
```
feat: add new dashboard widget
```
Result: `1.0.0` → `1.1.0`

**Patch Release (bug fix)**
```
fix: resolve chart rendering issue
```
Result: `1.1.0` → `1.1.1`

**Major Release (breaking change)**
```
feat!: redesign API endpoints

BREAKING CHANGE: Product endpoints now return arrays
```
Result: `1.5.3` → `2.0.0`

---

## 📋 Release Checklist

### Before Release

- [ ] All features merged to develop
- [ ] All PRs reviewed and approved
- [ ] All tests passing
- [ ] Linting checks passed
- [ ] No critical bugs outstanding
- [ ] Documentation updated
- [ ] CHANGELOG.md prepared

### Release Branch

- [ ] Created from develop: `release/vX.Y.Z`
- [ ] Version updated in package.json
- [ ] Final testing complete
- [ ] PR to main created
- [ ] Release notes prepared

### Publishing

- [ ] PR approved and merged to main
- [ ] GitHub tag created: `vX.Y.Z`
- [ ] CI/CD pipeline runs
- [ ] Release notes auto-generated
- [ ] Package available for download
- [ ] Merge back to develop

---

## 🏷️ Tag Management

### Creating Tags

#### Automatic (Recommended)

```bash
# Just merge to main, automation handles the rest!
# CI automatically:
# 1. Detects new commits
# 2. Calculates version
# 3. Creates tag
# 4. Publishes release
```

#### Manual

```bash
# Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0

## What's New
- Feature 1
- Bug fix 1

## Contributors
- @author1
- @author2"

# Push to trigger CI
git push origin v1.2.0
```

### Viewing Tags

```bash
# List all tags
git tag

# List with descriptions
git tag -l -n1

# Show specific tag
git show v1.2.0

# View commits in a release
git log v1.1.0..v1.2.0
```

### Tag Naming

- ✅ Correct: `v1.2.0`, `v2.0.0-beta`, `v1.0.0-rc.1`
- ❌ Incorrect: `1.2.0`, `release-1.2.0`, `version1.2.0`

---

## 📝 Changelog Management

### CHANGELOG.md Format

```markdown
# Changelog

All notable changes to this project are documented in this file.

## [1.2.0] - 2026-08-08

### Added
- New dashboard component
- Real-time data updates
- Analytics reports

### Fixed
- Chart rendering bug
- Cart calculation error
- Mobile layout issues

### Changed
- Improved performance
- Updated documentation

### Deprecated
- Old API endpoints (use v2 instead)

### Removed
- Legacy components

### Security
- Fixed XSS vulnerability
- Updated dependencies

## [1.1.0] - 2026-07-15

### Added
- Style Finder quiz

## [1.0.0] - 2026-06-01

### Added
- Initial release
```

### Auto-Generated vs Manual

**Automatic Generation (on Release)**
- GitHub auto-generates from commit messages
- Uses conventional commit types
- Organized by type (Added, Fixed, Changed, etc)

**Manual Updates**
- Add human-readable summaries
- Include migration guides for breaking changes
- Highlight important changes
- Add contributor credits

---

## 🔐 Pre-Release Versions

### Beta Releases

```
v1.2.0-beta.1  # First beta
v1.2.0-beta.2  # Second beta
```

**When to use:**
- Major features ready for testing
- Not production-ready
- Need user feedback

```bash
# Create beta tag
git tag -a v1.2.0-beta.1 -m "Release candidate v1.2.0-beta.1"
git push origin v1.2.0-beta.1
```

### Release Candidates

```
v1.2.0-rc.1   # Release candidate 1
v1.2.0-rc.2   # Release candidate 2
```

**When to use:**
- Almost ready for production
- Final testing phase
- Collecting feedback

```bash
# Create RC tag
git tag -a v1.2.0-rc.1 -m "Release candidate v1.2.0-rc.1"
git push origin v1.2.0-rc.1
```

---

## 🚀 Release Workflow

### Quick Release

```bash
# 1. Merge feature to develop (via PR)
git checkout develop
git pull origin develop

# 2. Create release branch
git checkout -b release/v1.2.0

# 3. Update version
# Edit package.json: "version": "1.2.0"

# 4. Commit
git add package.json
git commit -m "chore: prepare release v1.2.0"
git push -u origin release/v1.2.0

# 5. Create PR to main (GitHub)
# - Set as "Release v1.2.0"
# - Add release notes

# 6. Merge to main (on GitHub)
# - GitHub auto-creates release
# - CI creates tag automatically
# - Release notes auto-generated

# 7. Merge back to develop
git checkout develop
git merge --no-ff main
git push origin develop
```

### With Manual Tagging

```bash
# After merging to main:
git checkout main
git pull origin main

# Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0"

# Push tag (triggers CI)
git push origin v1.2.0

# CI automatically:
# 1. Creates release on GitHub
# 2. Generates release notes
# 3. Notifies team
```

---

## 📊 Version History Example

```
Latest: v1.2.1 (Aug 8, 2026)
├─ v1.2.1 (Patch) - Bug fixes
├─ v1.2.0 (Minor) - New features
├─ v1.1.3 (Patch) - Security update
├─ v1.1.2 (Patch) - Bug fixes
├─ v1.1.1 (Patch) - Hotfix
├─ v1.1.0 (Minor) - Feature release
├─ v1.0.5 (Patch) - Bug fixes
├─ v1.0.4 (Patch) - Performance
├─ v1.0.3 (Patch) - Bug fixes
├─ v1.0.2 (Patch) - Bug fixes
├─ v1.0.1 (Patch) - Bug fixes
└─ v1.0.0 (Initial) - Initial release
```

---

## 🔄 Continuous Deployment

### Version Propagation

```
Feature Branch
     ↓
  Develop (integration)
     ↓
  Release Branch
     ↓
  Main (production)
     ↓
  Tagged Release
     ↓
  Published Version
```

### CI/CD Pipeline

1. **Commit pushed** → Lint & build checks
2. **PR merged to main** → Version calculated
3. **Tag created** → Release published
4. **Release assets** → Available for download
5. **Notifications** → Team informed

---

## 💡 Best Practices

### ✅ DO

- Use semantic versioning consistently
- Follow conventional commit format
- Update CHANGELOG.md
- Tag releases properly
- Document breaking changes
- Plan major releases carefully
- Test before releasing
- Communicate with team

### ❌ DON'T

- Skip patch versions
- Use non-semantic versions (`1.2`, `2`, etc)
- Forget to update version in package.json
- Release without testing
- Merge PRs directly to main
- Use unclear commit messages
- Release without documentation
- Forget to merge back to develop

---

## ⚠️ Troubleshooting

### Incorrect Version Generated

```bash
# Delete wrong tag
git tag -d v1.2.0  # local
git push origin :refs/tags/v1.2.0  # remote

# Recreate with correct version
git tag -a v1.2.1 -m "Release v1.2.1"
git push origin v1.2.1
```

### Need to Update Release Notes

```bash
# Edit release on GitHub manually
# 1. Go to Releases
# 2. Click on release version
# 3. Click "Edit"
# 4. Update release notes
# 5. Save
```

### Missed Commits in Release

```bash
# Create patch release
git checkout main
git checkout -b release/v1.2.2

# Cherry-pick missing commits
git cherry-pick <commit-hash>

# Update version
# npm version patch

# Commit and merge
git push -u origin release/v1.2.2
# Create PR → Merge → Tag created automatically
```

---

## 📚 Related Documents

- [GITFLOW.md](./GITFLOW.md) - Git branching strategy
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [.github/workflows/release.yml](../.github/workflows/release.yml) - Automated release workflow

---

## 🔗 External Resources

- [Semantic Versioning](https://semver.org/) - Official SemVer specification
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message standard
- [Keep a Changelog](https://keepachangelog.com/) - Changelog guidelines

---

**Version:** 1.0  
**Last Updated:** August 2026  
**Status:** ✅ Active

