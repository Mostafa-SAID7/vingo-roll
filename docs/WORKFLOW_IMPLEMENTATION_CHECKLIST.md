# Workflow Implementation & Testing Checklist

## Quick Start - Get Automation Working

### Phase 1: Verification (30 minutes)

- [ ] **Verify all workflows exist**

  ```bash
  ls -la .github/workflows/
  # Should show 11 files:
  # - build.yml
  # - ci.yml
  # - deploy.yml
  # - docs.yml
  # - feature-branch.yml
  # - gitflow-hotfix.yml
  # - gitflow-release.yml
  # - pr-validation.yml
  # - release.yml
  # - security.yml
  # - test.yml
  ```

- [ ] **Check workflow syntax** (GitHub validates automatically)
  - Go to Actions tab in GitHub
  - Verify no red X marks on workflows
  - All workflows show in list

- [ ] **Review workflow triggers**
  - Each workflow has correct `on:` triggers
  - No overlapping triggers
  - All needed events covered

### Phase 2: Branch Protection Rules (15 minutes)

#### Set Up Main Branch Protection

1. Go to Repository Settings → Branches
2. Add rule for `main` branch:
   - [ ] Require pull request reviews (1 approver)
   - [ ] Require status checks to pass:
     - [ ] ci/build
     - [ ] test
     - [ ] security
     - [ ] pr-validation
   - [ ] Require branches to be up to date
   - [ ] Dismiss stale pull request approvals
   - [ ] Include administrators

#### Set Up Develop Branch Protection

1. Add rule for `develop` branch:
   - [ ] Require pull request reviews (1 approver)
   - [ ] Require status checks to pass:
     - [ ] ci/build
     - [ ] test
     - [ ] security
     - [ ] feature-branch (for feature branches)
   - [ ] Require branches to be up to date

### Phase 3: Team Communication (15 minutes)

- [ ] **Create team guide document**
  - Copy: `docs/WORKFLOW_AUTOMATION_GUIDE.md`
  - Share with all developers
  - Explain branch naming conventions
  - Show example workflows

- [ ] **Distribute guides**
  - Aurelle Team: "How to Create a Feature"
  - QA Team: "How to Report Bugs"
  - Release Manager: "How to Create a Release"

- [ ] **Set expectations**
  - Features require feature/ or bugfix/ branch
  - PRs require passing checks
  - Code review is mandatory
  - Releases follow release/v* naming

### Phase 4: Test with Real Workflow (1-2 hours)

#### Test 1: Feature Development

1. **Create test feature branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/test-workflow
   ```

2. **Make a small change**

   ```bash
   echo "# Test feature" >> README.md
   git add README.md
   git commit -m "feat: test workflow automation"
   git push -u origin feature/test-workflow
   ```

3. **Verify automated workflow**
   - [ ] feature-branch.yml runs
   - [ ] Checks pass
   - [ ] PR created automatically (if configured)
   - [ ] Message: "Feature branch validation passed"

4. **Create manual PR**
   - Go to GitHub
   - Create PR from feature/test-workflow to develop
   - Title: "feat: test workflow automation"
   - Description: "Testing workflow automation"

5. **Verify PR validation**
   - [ ] pr-validation.yml runs
   - [ ] All checks execute:
     - [ ] Metadata validation
     - [ ] Lint & format
     - [ ] TypeScript check
     - [ ] Build check
     - [ ] Test coverage
     - [ ] Security scan
   - [ ] Status shows "Ready for review"
   - [ ] File changes summary posted
   - [ ] Bundle size reported

6. **Request review and merge**
   - [ ] Ask team member to review
   - [ ] After approval, merge PR
   - [ ] Verify branch deleted

**Result**: ✅ Feature workflow working

---

#### Test 2: Bug Fix

1. **Create test bugfix branch**

   ```bash
   git checkout develop
   git checkout -b bugfix/test-bug-fix
   ```

2. **Make a change**

   ```bash
   echo "# Bug fix" >> README.md
   git add README.md
   git commit -m "fix: test bug fix workflow"
   git push -u origin bugfix/test-bug-fix
   ```

3. **Verify workflows run**
   - [ ] feature-branch.yml runs (same as features)
   - [ ] All checks pass
   - [ ] Create PR to develop

4. **Merge after review**
   - [ ] Code review
   - [ ] Tests pass
   - [ ] Merge PR

**Result**: ✅ Bug fix workflow working

---

#### Test 3: Release

1. **Create test release branch**

   ```bash
   git checkout develop
   git checkout -b release/v1.1.0
   ```

2. **Update version**

   ```bash
   # Edit package.json version to 1.1.0
   # Edit CHANGELOG.md
   git add package.json CHANGELOG.md
   git commit -m "chore: prepare release v1.1.0"
   git push -u origin release/v1.1.0
   ```

3. **Verify release workflow**
   - [ ] gitflow-release.yml runs
   - [ ] Validates version format (v1.1.0)
   - [ ] Generates changelog
   - [ ] Creates release checklist
   - [ ] Create PR to main

4. **Verify PR on main**
   - [ ] pr-validation.yml runs
   - [ ] All checks pass
   - [ ] Ready for review indicator

5. **Merge release to main**
   - [ ] Code review
   - [ ] Merge PR
   - [ ] Verify:
     - [ ] release.yml creates tag
     - [ ] GitHub Release created
     - [ ] Auto-merged back to develop

**Result**: ✅ Release workflow working

---

#### Test 4: Hotfix (Optional - Critical Only)

1. **Create hotfix branch** (ONLY if production bug)

   ```bash
   git checkout main
   git checkout -b hotfix/v1.0.1
   ```

2. **Fix critical issue**

   ```bash
   # Make minimal fix only
   git commit -m "fix: critical production issue"
   git push -u origin hotfix/v1.0.1
   ```

3. **Verify hotfix workflow**
   - [ ] gitflow-hotfix.yml runs
   - [ ] Validates patch version only
   - [ ] Quick regression tests
   - [ ] Impact analysis
   - [ ] Create PR to main

4. **Urgent merge**
   - [ ] Immediate code review
   - [ ] Merge ASAP
   - [ ] Verify auto-deployment

**Result**: ✅ Hotfix workflow working

---

### Phase 5: Monitoring & Optimization (Ongoing)

#### Monitor Performance

- [ ] Track workflow execution times
  - Average feature: < 5 minutes
  - Average test: < 3 minutes
  - Average security: < 5 minutes
  - Average PR validation: < 10 minutes

- [ ] Monitor success rates
  - Build success: > 95%
  - Test pass rate: > 95%
  - Security issues: Should decrease

- [ ] Check error frequency
  - Document common failures
  - Add to team FAQs
  - Optimize if patterns emerge

#### Gather Feedback

- [ ] Team survey
  - Is workflow clear?
  - Any confusing parts?
  - Too strict? Too loose?
  - Missing checks?

- [ ] Adjust based on feedback
  - Add/remove checks
  - Adjust thresholds
  - Improve documentation

---

## Automated Workflows Status

### Current Implementation

| Workflow       | File                | Status    | Purpose                      |
| -------------- | ------------------- | --------- | ---------------------------- |
| Testing        | test.yml            | ✅ Active | Unit, integration, E2E tests |
| Security       | security.yml        | ✅ Active | Scan, audit, quality checks  |
| Feature Branch | feature-branch.yml  | ✅ Active | Feature/bugfix validation    |
| Release        | gitflow-release.yml | ✅ Active | Release branch management    |
| Hotfix         | gitflow-hotfix.yml  | ✅ Active | Emergency hotfix workflow    |
| PR Validation  | pr-validation.yml   | ✅ Active | All PR quality gates         |
| Build          | build.yml           | ✅ Active | Build verification           |
| CI             | ci.yml              | ✅ Active | Continuous integration       |
| Docs           | docs.yml            | ✅ Active | Documentation                |
| Deploy         | deploy.yml          | ✅ Active | Deployment (manual)          |
| Release Tags   | release.yml         | ✅ Active | Automated tagging            |

### What's Automated

✅ **Features**: Full workflow from branch to merge
✅ **Bug Fixes**: Same as features with validation
✅ **Releases**: Version validation, changelog, tagging
✅ **Hotfixes**: Emergency path with urgent checks
✅ **Code Quality**: Lint, format, TypeScript on every PR
✅ **Testing**: Unit, integration, E2E on every change
✅ **Security**: Scanning, audits, vulnerability detection
✅ **Documentation**: Auto-generated from commits
✅ **Deployment**: Manual trigger with environments
✅ **Releases**: Auto-tagging, GitHub releases

### What's Manual

🔍 **Code Review**: Approval needed
🚀 **Release Decision**: When to release decided by team
📢 **Communication**: Announcements, notifications
🎯 **Planning**: Feature prioritization

---

## Quick Reference Commands

### Create Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/feature-name
```

### Create Bugfix Branch

```bash
git checkout develop
git checkout -b bugfix/bug-name
```

### Create Release Branch

```bash
git checkout develop
git checkout -b release/vX.Y.Z
```

### Create Hotfix Branch

```bash
git checkout main
git checkout -b hotfix/vX.Y.Z  # PATCH only!
```

### View Workflow Status

- GitHub: Actions tab → Select workflow
- Or: https://github.com/ORG/REPO/actions

### Debug Failed Workflow

1. Click workflow run
2. Click failed job
3. Expand steps to see error
4. Fix locally, commit, push

---

## Common Issues & Solutions

### Issue: Feature branch workflow didn't run

**Solution**:

- [ ] Check branch name follows `feature/name` convention
- [ ] Verify branch exists on GitHub
- [ ] Wait a few seconds, refresh
- [ ] Check Actions tab for errors

### Issue: PR validation failed

**Solution**:

- [ ] Check which check failed
- [ ] Run locally: `npm run build`
- [ ] Run tests: `npm run test:unit`
- [ ] Run lint: `npm run lint`
- [ ] Fix issues
- [ ] Commit and push

### Issue: Security scan failed

**Solution**:

- [ ] Review vulnerability report
- [ ] Update dependency: `npm update package`
- [ ] Remove hardcoded secrets
- [ ] Fix linting warnings
- [ ] Commit and push

### Issue: Release validation failed

**Solution**:

- [ ] Check version format (v1.2.3)
- [ ] Verify CHANGELOG updated
- [ ] Verify package.json version matches
- [ ] Run full test suite locally
- [ ] Fix and push

---

## Success Criteria

### ✅ Automation is Working When

1. **Feature workflow**:
   - Create branch → auto validates
   - Create PR → checks run
   - Merge PR → branch auto-deleted

2. **Testing**:
   - Tests run on every push
   - Coverage reported on PR
   - Failures block merge

3. **Security**:
   - Dependencies scanned
   - Secrets detected
   - Results posted to PR

4. **Releases**:
   - Version validated
   - Changelog generated
   - Tag created automatically
   - GitHub Release created

5. **Quality**:
   - Format enforced
   - Types checked
   - Build verified
   - Bundle size tracked

---

## Training for Teams

### For Developers

Teach them:

1. Branch naming conventions
2. How to create feature branches
3. How to write conventional commits
4. How to respond to workflow failures
5. PR review process

### For QA

Teach them:

1. How to report bugs (bugfix branches)
2. How to verify fixes
3. How to participate in release testing
4. Hotfix procedures

### For Release Manager

Teach them:

1. Release branch creation
2. Version numbering (semver)
3. Changelog maintenance
4. Release approval process
5. Hotfix procedures

---

## Success Metrics

Track these metrics:

| Metric             | Baseline | Target     | Current |
| ------------------ | -------- | ---------- | ------- |
| Build success rate | ?        | 95%+       | ?       |
| Test coverage      | ?        | 80%+       | ?       |
| PR cycle time      | ?        | < 24h      | ?       |
| Security issues    | ?        | Decreasing | ?       |
| Release frequency  | ?        | 2-4/month  | ?       |

---

## Next: Full Automation

After testing, the team should:

1. ✅ Use workflows on all PRs
2. ✅ Follow branch naming
3. ✅ Follow conventional commits
4. ✅ Respect status checks
5. ✅ Complete code reviews
6. ✅ Use release process

**Result**: Fully automated CI/CD with zero manual steps!

---

## Support

- Questions: Check `docs/WORKFLOWS.md`
- Issues: Review GitHub Actions logs
- Improvements: Discuss with team
- Updates: Modify workflow files as needed
