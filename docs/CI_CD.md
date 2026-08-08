# CI/CD Pipeline Documentation

Complete guide to the automated CI/CD workflows for Vingo Roll Studio.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Workflows](#workflows)
3. [Build Workflow](#build-workflow)
4. [Release Workflow](#release-workflow)
5. [Deployment Workflow](#deployment-workflow)
6. [Documentation Workflow](#documentation-workflow)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Vingo Roll Studio uses **GitHub Actions** to automate:

- ✅ **Build Testing** - Multi-version Node.js compatibility
- ✅ **Code Quality** - Linting, formatting, TypeScript checks
- ✅ **Automated Releases** - Semantic versioning with auto-tagging
- ✅ **Deployment** - Staging and production deployments
- ✅ **Documentation** - Link validation and structure checks

### Workflow Files

Located in: `.github/workflows/`

```
.github/workflows/
├── build.yml          # Build & quality checks
├── release.yml        # Automated release & tagging
├── deploy.yml         # Staging & production deployment
├── docs.yml           # Documentation validation
└── ci.yml             # Legacy CI checks (if exists)
```

---

## 🔄 Workflows

### Overview Table

| Workflow | Trigger | Purpose | Actions |
| --- | --- | --- | --- |
| **Build** | Push to any branch, PR | Test code quality | Lint, TypeScript, build |
| **Release** | Push to main, manual | Create releases | Tag, release notes, version bump |
| **Deploy** | Release published, manual | Deploy to servers | Build, test, deploy |
| **Docs** | Changes to docs, manual | Validate documentation | Link check, structure validation |

---

## 🏗️ Build Workflow

### File: `.github/workflows/build.yml`

**Purpose**: Verify code quality and build on every push

**Triggers**:
- Push to: `main`, `develop`, `feature/*`, `bugfix/*`
- Pull requests to: `main`, `develop`
- Manual trigger via GitHub Actions

### Build Steps

1. **Checkout Code** - Clone repository
2. **Setup Node.js** - Test on 20.x and 22.x
3. **Install Dependencies** - `npm ci` for reproducible builds
4. **Lint Code** - ESLint checks
5. **Format Check** - Prettier verification
6. **TypeScript** - Type checking with `tsc --noEmit`
7. **Build** - Production build with `npm run build`
8. **Archive** - Upload build artifacts

### Build Results

- ✅ Builds stored as artifacts (5-day retention)
- ✅ Quality reports uploaded (30-day retention)
- ✅ Fails if linting or TypeScript errors exist

### Accessing Build Artifacts

1. Go to GitHub Actions tab
2. Click on "Build & Quality Checks" workflow
3. Select workflow run
4. Download artifacts under "Artifacts" section

---

## 🚀 Release Workflow

### File: `.github/workflows/release.yml`

**Purpose**: Automatically create releases with semantic versioning

**Triggers**:
- Push to `main` branch
- Tag push (v*)
- Manual workflow dispatch with optional version override

### Release Steps

1. **Determine Version** - Analyze commits since last tag
2. **Detect Version Bump**:
   - `feat:` → Minor version (1.x.0)
   - `fix:` / `perf:` → Patch version (1.0.x)
   - `BREAKING CHANGE` → Major version (2.0.0)
3. **Create Git Tag** - Annotated tag with release message
4. **Generate Release Notes** - Auto-generated from PRs
5. **Create GitHub Release** - Published on GitHub
6. **Update package.json** - Version bump in package.json

### Determining Release Version

The workflow analyzes commits to determine version bump:

```bash
# Example commits since v1.0.0
feat: add new feature          # → Minor bump
fix: resolve issue             # → Patch bump
docs: update README            # → No bump (docs only)

# Result: v1.1.1 (Minor: feat, Patch: fix)
```

### Manual Release Trigger

You can manually trigger release with a specific version:

1. Go to GitHub Actions
2. Select "Automated Release & Tagging"
3. Click "Run workflow"
4. Enter version (e.g., `v1.2.0`)
5. Click "Run workflow"

### What Gets Released

- 🏷️ **Git Tag** - Semantic version tag
- 📄 **GitHub Release** - Release notes and changelog
- 📦 **Package.json** - Version updated
- 📝 **Release Notes** - Auto-generated from commits

---

## 📤 Deployment Workflow

### File: `.github/workflows/deploy.yml`

**Purpose**: Deploy releases to staging and production

**Triggers**:
- Release published
- Manual workflow dispatch (select environment)

### Deployment Environments

#### Staging
- **URL**: https://staging.vingo-roll.example.com
- **Auto-triggered**: On release publish
- **Approval**: No approval needed
- **Rollback**: Automatic on failure

#### Production
- **URL**: https://vingo-roll.example.com
- **Auto-triggered**: Manual only
- **Approval**: Manual workflow dispatch required
- **Rollback**: Manual procedure required

### Deployment Steps

1. **Checkout Code** - Get released version
2. **Setup Environment** - Install dependencies
3. **Build Project** - Production build
4. **Pre-deployment Checks** - Lint, TypeScript, build
5. **Create Deployment** - GitHub deployment record
6. **Deploy** - Execute deployment commands
7. **Update Status** - Mark deployment complete

### Deployment Checklist

Before production deployment:

- [ ] All tests passing
- [ ] Build succeeds
- [ ] No linting errors
- [ ] TypeScript checks pass
- [ ] Staging deployment successful
- [ ] Documentation updated
- [ ] CHANGELOG reviewed

### Manual Deployment

1. Go to GitHub Actions
2. Select "Deploy to Production"
3. Click "Run workflow"
4. Select environment: `production`
5. Click "Run workflow"

---

## 📚 Documentation Workflow

### File: `.github/workflows/docs.yml`

**Purpose**: Validate documentation quality and integrity

**Triggers**:
- Push to `main` or `develop` (changes to docs)
- Pull requests (changes to docs)
- Manual trigger

### Documentation Checks

1. **Validate Markdown** - Structure and syntax
2. **Check Links** - Broken link detection
3. **Validate Structure** - Required files exist
4. **Generate TOC** - Table of contents
5. **Test Examples** - Code examples compile
6. **Build Artifacts** - Package documentation

### Validation Results

- ✅ Broken links detected and reported
- ✅ Missing documentation files flagged
- ✅ Code examples validated
- ✅ Documentation archived (30-day retention)

### Documentation Requirements

Required files that must exist:

```
✅ README.md
✅ CONTRIBUTING.md
✅ CHANGELOG.md
✅ docs/INDEX.md
✅ docs/GITFLOW.md
✅ docs/RELEASES.md
✅ docs/ERROR_HANDLING.md
```

---

## 🔍 Monitoring Workflows

### GitHub Actions Dashboard

1. Click **Actions** tab in repository
2. View recent workflow runs
3. Click workflow run for details
4. View job logs and artifacts

### Workflow Status

Status indicators:
- ✅ **Success** - All jobs completed successfully
- ❌ **Failed** - One or more jobs failed
- ⏸️ **Skipped** - Workflow conditions not met
- ⏳ **In Progress** - Jobs currently running

### Viewing Logs

1. Click workflow run
2. Click job name
3. Expand step to view logs
4. Search logs with browser search

---

## 🚨 Troubleshooting

### Build Failures

**Problem**: Build fails on lint errors

```
❌ npm run lint failed
```

**Solution**:
1. Pull latest code
2. Run `npm run lint` locally
3. Fix errors
4. Commit and push
5. Workflow auto-retries

**Problem**: TypeScript errors in CI

```
❌ npx tsc --noEmit failed
```

**Solution**:
1. Run TypeScript check locally: `npx tsc --noEmit`
2. Fix type errors
3. Verify with `npm run build`
4. Commit and push

### Release Not Triggering

**Problem**: No release created after merge to main

```
⏭️  Release skipped - no release-worthy commits detected
```

**Solution**:
- Ensure commits follow [Conventional Commits](../GITFLOW.md#commit-convention)
- Use: `feat:`, `fix:`, `perf:`, `BREAKING CHANGE`
- Docs/chore commits don't trigger releases

**Manual Release**:
1. Go to GitHub Actions
2. Select "Automated Release & Tagging"
3. Click "Run workflow"
4. Enter version (e.g., `v1.2.0`)
5. Click "Run workflow"

### Deployment Failures

**Problem**: Deployment to production failed

```
❌ Deploy to Production failed
```

**Solution**:
1. Check workflow logs for error
2. Fix issue locally
3. Push fix to main
4. Create new release
5. Re-trigger deployment

### Documentation Issues

**Problem**: Broken links in documentation

```
⚠️  Broken link found: docs/MISSING.md
```

**Solution**:
1. Fix link in documentation
2. Verify file exists
3. Commit changes
4. Push to develop or main

---

## 📊 Workflow Performance

### Build Time

- **Typical**: 2-5 minutes
- **Node setup**: ~30 seconds
- **Dependencies**: ~1 minute
- **Lint/TypeScript**: ~30 seconds
- **Build**: ~1 minute

### Release Time

- **Typical**: 1-2 minutes
- **Version detection**: ~30 seconds
- **Tag creation**: ~30 seconds
- **Release notes**: ~30 seconds
- **Package.json update**: ~30 seconds

### Deployment Time

- **Staging**: 3-8 minutes
- **Production**: 5-15 minutes
- **Build**: ~1 minute
- **Deploy**: 2-7 minutes

---

## 🔐 Secrets & Permissions

### Required Secrets

- `GITHUB_TOKEN` - Automatic (GitHub provides)
- `DEPLOY_KEY` - For deployment (if needed)
- `SLACK_WEBHOOK` - For notifications (if configured)

### Required Permissions

**For Release Workflow**:
- `contents: write` - Create tags and releases
- `packages: write` - Publish packages

**For Deployment Workflow**:
- `contents: read` - Read code
- `deployments: write` - Create deployments

---

## 📝 Workflow Configuration

### Modifying Workflows

Edit files in `.github/workflows/`:

```yaml
on:
  push:
    branches: [main, develop]  # Trigger on these branches
  pull_request:
    branches: [main]           # Trigger on PRs to main
  workflow_dispatch:           # Allow manual trigger
```

### Adding New Workflows

1. Create new file: `.github/workflows/my-workflow.yml`
2. Define triggers, jobs, steps
3. Commit and push
4. Workflow appears in Actions tab

### Disabling Workflows

Comment out `on:` section:

```yaml
# on:
#   push:
#     branches: [main]
```

---

## 📞 Support

### Workflow Issues

- Check GitHub Actions logs
- Review workflow YAML syntax
- Test locally with `npm run build`

### Need Help?

1. Check [GitHub Actions Docs](https://docs.github.com/actions)
2. Review workflow logs in Actions tab
3. Open GitHub Issue for problems
4. Check project discussions

---

## 🔗 Related Documentation

- [GITFLOW.md](./GITFLOW.md) - Git workflow
- [RELEASES.md](./RELEASES.md) - Release process
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines
- [GitHub Actions](https://docs.github.com/actions) - Official docs

---

**Version**: 1.0  
**Last Updated**: August 2026  
**Status**: ✅ Active
