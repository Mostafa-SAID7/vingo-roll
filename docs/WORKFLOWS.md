# GitHub Workflows Guide

## Overview

This project uses comprehensive GitHub Actions workflows to ensure code quality, security, and proper GitFlow branch management. All workflows are automated and run on every push and pull request.

## Workflow Files

| File | Purpose | Trigger |
|------|---------|---------|
| `test.yml` | Testing & coverage | push, PR |
| `security.yml` | Security scanning | push, PR, daily schedule |
| `feature-branch.yml` | Feature branch validation | push to feature/*, bugfix/* |
| `gitflow-release.yml` | Release branch workflow | push to release/*, PR to main |
| `gitflow-hotfix.yml` | Critical hotfix workflow | push to hotfix/*, PR to main |
| `pr-validation.yml` | PR quality gates | PR events |
| `build.yml` | Build verification | push, PR |
| `ci.yml` | Continuous integration | push, PR |
| `release.yml` | Automated release tagging | push to main |
| `deploy.yml` | Deployment workflow | manual trigger |
| `docs.yml` | Documentation generation | push to main |

## Quick Start

### Testing Workflow

**Triggers**: Push to any branch, pull requests
**Duration**: ~3-5 minutes

```yaml
Jobs:
- unit-tests (Node 20.x, 22.x)
- integration-tests
- e2e-tests
- coverage-analysis
```

**Artifacts**:
- `coverage-reports/` - Code coverage data
- Codecov integration for coverage tracking

**View Results**:
1. Go to your PR
2. Look for "Testing & Coverage" check
3. Click "Details" to see full logs

### Security Workflow

**Triggers**: Push to any branch, pull requests, daily at 2 AM UTC
**Duration**: ~5-10 minutes

```yaml
Jobs:
- dependency-check (npm audit)
- sast-analysis (ESLint, TypeScript)
- code-analysis (complexity, smells)
- license-check (GPL/AGPL detection)
- secret-scanning (TruffleHog + patterns)
```

**Important**: 
- Weekly scans catch vulnerabilities
- PR comments show issues immediately
- High/critical issues block merge

**View Results**:
1. Check PR security checks
2. Review artifacts for detailed reports
3. Address high-severity issues

### Feature Branch Workflow

**Triggers**: Push to `feature/*` or `bugfix/*` branches
**Duration**: ~2-3 minutes

#### Branch Naming Convention

```
feature/feature-name          ✅ GOOD
feature/user-authentication   ✅ GOOD
bugfix/login-bug             ✅ GOOD
bugfix/cart-calculation-fix  ✅ GOOD

feature/Feature Name         ❌ BAD (spaces)
Feature/new-feature          ❌ BAD (capitalized)
feature_name                 ❌ BAD (no prefix)
```

#### Validation Steps

1. **Branch Naming** - Validates GitFlow convention
2. **Build & Test** - Compiles and runs tests
3. **Code Quality** - Lint, format, TypeScript checks
4. **Security** - Dependency audit and secret scan
5. **Documentation** - Checklist for code comments, docs, types

#### PR Comments

When you open a PR from a feature branch:
- Automated validation checklist
- File changes summary
- Build status
- Test results

#### Merge to Develop

```bash
# Feature branch opens PR to develop
# After review and approval:
# 1. PR is merged to develop
# 2. Feature branch can be deleted
# 3. Next: release branch or next feature
```

### Release Branch Workflow

**Triggers**: Push to `release/v*` or PR to main
**Duration**: ~5-8 minutes

#### Release Branch Naming

```
release/v1.0.0          ✅ CORRECT
release/v2.1.3          ✅ CORRECT
release/1.0.0           ❌ WRONG (no 'v')
release/v1.0            ❌ WRONG (missing patch)
```

#### Release Process

1. **Create release branch** from develop
   ```bash
   git checkout -b release/v1.2.0 develop
   ```

2. **Only bug fixes and version bumps** allowed

3. **Update version** in package.json
   ```json
   {
     "version": "1.2.0"
   }
   ```

4. **Update CHANGELOG.md**
   ```markdown
   ## [1.2.0] - 2024-08-08

   ### Added
   - New feature description

   ### Fixed
   - Bug fix description

   ### Changed
   - Breaking change description
   ```

5. **Open PR to main**
   - Workflow validates everything
   - Creates release notes automatically
   - Generates changelog from commits

6. **Merge to main**
   - Creates GitHub Release
   - Tags with version
   - Auto-merges back to develop

#### Release Checklist

Workflow validates:
- ✅ Version format correct
- ✅ Build successful
- ✅ All tests passing
- ✅ Security audit passed
- ✅ No high/critical vulnerabilities
- ✅ Bundle size reasonable

Manual checks before merge:
- [ ] CHANGELOG updated
- [ ] package.json version updated
- [ ] Documentation current
- [ ] No breaking changes (or documented)
- [ ] Database migrations tested
- [ ] API docs updated

### Hotfix Branch Workflow

**Triggers**: Push to `hotfix/v*` or PR to main
**Duration**: ~3-5 minutes
**Priority**: 🔴 **CRITICAL**

#### Hotfix Branch Naming

```
hotfix/v1.0.1           ✅ CORRECT (patch only)
hotfix/v1.0.2           ✅ CORRECT
hotfix/v1.1.0           ❌ WRONG (should only bump patch)
hotfix/v2.0.0           ❌ WRONG (major version)
```

#### When to Use Hotfix

✅ Production bug fix
✅ Security vulnerability
✅ Critical performance issue
✅ Data corruption fix

❌ New features (use feature branch)
❌ Refactoring (use feature branch)
❌ Non-critical bugs (use feature branch on develop)

#### Hotfix Process

1. **Create from main**
   ```bash
   git checkout -b hotfix/v1.0.1 main
   ```

2. **Fix the bug** (minimal changes only)

3. **Open PR to main** (NOT develop)

4. **Workflow validates**
   - Impact analysis
   - Regression tests
   - Security audit
   - Version validation (patch only)

5. **Merge to main**
   - Creates release tag
   - GitHub Release generated
   - Auto-merges to develop

#### Hotfix Checklist

Before merge:
- [ ] Issue is critical
- [ ] Fix is minimal
- [ ] No unrelated changes
- [ ] Regression tests pass
- [ ] Security reviewed
- [ ] Version bumped (patch only)
- [ ] CHANGELOG updated

## PR Validation Workflow

**Triggers**: All pull requests
**Duration**: ~5-10 minutes

### What It Checks

1. **PR Metadata**
   - Title format (conventional commits)
   - Description length (min 20 chars)
   - Linked issues

2. **Code Quality**
   - ESLint (code style)
   - Prettier (formatting)
   - TypeScript (type safety)

3. **Build & Test**
   - Project builds successfully
   - All tests pass
   - Coverage metrics

4. **Security**
   - Dependency audit
   - Secret scanning
   - Code analysis

5. **File Changes**
   - Categorizes changed files
   - Reports changes summary
   - Bundle size impact

### PR Title Format

Follow conventional commits:

```
feat(component): add new feature
fix(bug): resolve issue
docs(readme): update documentation
style(format): fix code style
refactor(module): reorganize code
perf(optimization): improve performance
test(coverage): add test cases
chore(deps): update dependencies
ci(workflow): update workflow
```

### Expected Comments

Workflow automatically comments:
- ✅ File changes summary
- ✅ Build status
- ✅ Test results
- ✅ Quality report
- ✅ Ready for review or issues to fix

## Artifact Retention

| Artifact | Retention |
|----------|-----------|
| Build artifacts | 5-7 days |
| Coverage reports | 30 days |
| Quality reports | 30 days |
| Test logs | 7 days |

## Scheduled Workflows

### Daily Security Scan (2 AM UTC)

```
Every day at 2:00 AM UTC:
- Dependency check
- Secret scanning
- Code analysis
- License compliance
```

## Troubleshooting

### Workflow Failed - Build Error

1. Check the workflow logs
2. Run locally: `npm run build`
3. Fix the error
4. Commit and push

### Workflow Failed - Test Error

1. Review test output in logs
2. Run locally: `npm run test:unit`
3. Fix tests or code
4. Commit and push

### Workflow Failed - Type Error

1. Check TypeScript errors in logs
2. Run locally: `npx tsc --noEmit`
3. Fix type issues
4. Commit and push

### Workflow Failed - Security Issue

**High/Critical Vulnerabilities**:
1. Review the vulnerability details
2. Update dependency: `npm update package-name`
3. Test the update
4. Commit and push

**Secrets Detected**:
1. Remove the secret immediately
2. Rotate credentials if in git history
3. Use `.env` or GitHub secrets
4. Commit and push

### PR Not Merging - Checks Failed

1. Review all check results
2. Address issues (see PR comments)
3. Commit fixes
4. Re-run workflow (automatic on push)

## Manual Workflow Triggers

Some workflows support manual triggers via `workflow_dispatch`:

```bash
# Trigger via GitHub UI:
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"
4. Fill in inputs if needed
5. Click "Run workflow"
```

Or via GitHub CLI:

```bash
# Trigger release workflow
gh workflow run release.yml

# Trigger specific workflow with input
gh workflow run build.yml -f force_version=v1.2.3
```

## Advanced Configuration

### Customizing Node Versions

Edit `test.yml`:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add more versions
```

### Changing Audit Level

Edit `security.yml`:
```yaml
- name: Audit npm dependencies
  run: npm audit --audit-level=high  # Change to high/critical
```

### Adjusting Test Timeouts

Edit `test.yml`:
```yaml
- name: Run tests
  timeout-minutes: 15  # Increase timeout
  run: npm run test:unit
```

## Status Badges

Add to README.md:

```markdown
![Tests](https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/test.yml/badge.svg)
![Security](https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/security.yml/badge.svg)
![Build](https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/build.yml/badge.svg)
```

## CI/CD Metrics

### Build Success Rate Target: 95%+
- Monitor build failures
- Address common issues
- Update dependencies regularly

### Test Coverage Target: 80%+
- Add tests for new features
- Maintain coverage ratio
- Review coverage reports

### Security Issue Response: 24 hours
- Critical: immediate
- High: within 24 hours
- Medium: within 1 week
- Low: within 2 weeks

## Integration with Branch Protection

Recommended branch protection rules:

### Main Branch
```
✅ Require status checks to pass:
  - ci/build
  - test
  - security
  - lint

✅ Require PR review: 1 approver
✅ Dismiss stale PR approvals
✅ Require branches be up to date
✅ Include administrators
```

### Develop Branch
```
✅ Require status checks to pass:
  - ci/build
  - test
  - security
  - lint

✅ Require PR review: 1 approver
✅ Require branches be up to date
```

## Performance Optimization

### Faster Builds

1. **Use Node caching**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: npm
   ```

2. **Use matrix builds for parallelization**
   ```yaml
   strategy:
     matrix:
       node-version: [20.x, 22.x]
   ```

3. **Conditional steps**
   ```yaml
   - if: always()
     run: npm run test
   ```

### Artifact Size

Keep artifacts small:
- Only upload necessary files
- Set appropriate retention
- Clean up after use

## Security Best Practices

1. **Never hardcode secrets** in workflows
2. **Use GitHub Secrets** for credentials
3. **Use OIDC** for cloud authentication
4. **Review workflow permissions**
5. **Audit workflow changes** in PRs
6. **Keep actions updated**

## Common Issues & Solutions

### Issue: Workflow takes too long

**Solution**:
- Run jobs in parallel (use `needs` strategically)
- Use caching for dependencies
- Remove unnecessary steps
- Use matrix for multiple configurations

### Issue: Out of memory errors

**Solution**:
- Increase runner specs (use larger runners)
- Reduce parallelization
- Clean up artifacts
- Use workflow concurrency limits

### Issue: Secrets exposed in logs

**Solution**:
- Add `::add-mask::` to sensitive data
- Review GitHub Actions masking
- Use encrypted secrets
- Rotate exposed secrets

## Support & Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Community Discussions](https://github.com/orgs/community/discussions)

## Related Documentation

- [GitFlow Guide](./GITFLOW.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Release Process](./RELEASES.md)
- [CI/CD Documentation](./CI_CD.md)
