# Rabbit Code Review - Setup & Usage Guide

## Overview

Rabbit Code Review is an automated code quality and security analysis tool that integrates with GitHub to provide intelligent PR reviews.

**Status:** ✅ Configured and ready to use

---

## 🚀 Features

### Code Quality Analysis

- ✅ TypeScript type checking (strict mode)
- ✅ ESLint rule validation
- ✅ Cyclomatic complexity analysis
- ✅ Code duplication detection
- ✅ Unused code detection
- ✅ Naming conventions checking

### Security Analysis

- ✅ SAST (Static Application Security Testing)
- ✅ SQL injection detection
- ✅ XSS vulnerability detection
- ✅ CSRF vulnerability detection
- ✅ Hardcoded secrets detection
- ✅ Insecure cryptography detection
- ✅ Dependency vulnerability scanning
- ✅ License compliance checking

### Performance Analysis

- ✅ Bundle size checking
- ✅ Memory leak detection
- ✅ Render performance analysis
- ✅ Unnecessary re-renders detection
- ✅ Component complexity analysis

### Best Practices

- ✅ React hooks validation
- ✅ Component patterns checking
- ✅ Code organization verification
- ✅ Documentation requirements
- ✅ TypeScript annotation checking

---

## 📁 Configuration Files

### Primary Configuration

```
.rabbit-code-review.yml
```

Comprehensive configuration for all code review rules and settings.

### GitHub Workflow

```
.github/workflows/rabbit-code-review.yml
```

Automated workflow that runs on every PR.

---

## 🔧 Setup Instructions

### Step 1: Enable Rabbit Code Review

The workflow is already configured. It will activate automatically on:

- PR creation
- PR updates
- PR reopening
- Manual trigger via GitHub Actions UI

### Step 2: GitHub Token Setup

The workflow uses GitHub's built-in `GITHUB_TOKEN` for authentication. No additional setup needed.

### Step 3: Review Configuration (Optional)

Edit `.rabbit-code-review.yml` to customize:

- Which files to scan
- Complexity thresholds
- Security rules
- Performance targets
- Reporting preferences

---

## 📋 How It Works

### When a PR is Created/Updated

```
1. Workflow triggers automatically
   ↓
2. Code is checked out
   ↓
3. Dependencies installed
   ↓
4. Rabbit Code Review runs
   ├─ TypeScript checking
   ├─ ESLint validation
   ├─ Complexity analysis
   ├─ Security scanning
   ├─ Performance analysis
   └─ Best practices checking
   ↓
5. Results posted to PR
   ├─ Comment with summary
   ├─ Individual issue comments
   └─ Suggestion for fixes
   ↓
6. Workflow status
   ├─ ✅ Pass (no critical issues)
   └─ ❌ Fail (critical issues found)
```

---

## 📊 Report Format

### PR Comment Example

```
🐰 Rabbit Code Review Results

Total Issues Found: 5
Critical: 0
High: 1
Medium: 2
Low: 2

### Issues

- High: src/store/cart-store.ts:42 - Missing error handling
- Medium: src/components/Button.tsx:15 - Unused variable 'disabled'
- Medium: src/routes/checkout.tsx:28 - Cyclomatic complexity exceeds threshold
- Low: src/utils/helpers.ts:5 - Missing JSDoc comment
- Low: src/types/index.ts:12 - Unused import
```

---

## ⚙️ Configuration Guide

### Include/Exclude Patterns

**Include files to scan:**

```yaml
include:
  - "src/**/*.ts"
  - "src/**/*.tsx"
```

**Exclude files:**

```yaml
exclude:
  - "node_modules/**"
  - "**/*.test.ts"
  - "**/*.stories.tsx"
```

### Complexity Thresholds

```yaml
complexity:
  maxCyclomaticComplexity: 10 # Function complexity
  maxCognitiveComplexity: 15 # Mental effort needed
  maxNestingLevel: 4 # Nesting depth
  maxLineLength: 120 # Line character limit
```

### Security Rules

**Enable/disable specific checks:**

```yaml
security:
  sast:
    rules:
      - "sql-injection"
      - "xss-vulnerability"
      - "csrf-vulnerability"
      - "hardcoded-secrets"
      - "insecure-crypto"
```

### Severity Mapping

```yaml
severities:
  critical: # Blocks merge (fail PR check)
    - sql-injection
    - hardcoded-secrets

  high: # Should be fixed
    - xss-vulnerability
    - memory-leak

  medium: # Consider fixing
    - complexity-high
    - duplication

  low: # Minor issues
    - code-style
    - documentation
```

### Custom Rules

Add project-specific rules:

```yaml
customRules:
  rules:
    - name: "no-console-in-production"
      pattern: "console\\.(log|warn|error)"
      severity: "medium"
      files: "src/**/*.ts"
      exclude: "**/utils/logger.ts"
```

---

## 🎯 Usage Patterns

### For Feature Development

1. Create feature branch
2. Make changes
3. Open PR
4. Rabbit Code Review runs automatically
5. Review feedback in PR comments
6. Fix issues
7. Push changes
8. Rabbit re-runs automatically
9. All checks pass → Ready to merge

### For Hotfixes

1. Create hotfix branch
2. Make minimal changes
3. Open PR
4. Rabbit Code Review runs
5. Fix any critical issues
6. Merge when checks pass

### For Refactoring

1. Use Rabbit feedback for:
   - Complexity reduction suggestions
   - Duplication elimination ideas
   - Performance optimization opportunities

---

## 📈 Metrics & Reports

### Available Metrics

```
Code Quality
├─ Cyclomatic Complexity
├─ Cognitive Complexity
├─ Code Duplication %
├─ Test Coverage
└─ Type Coverage

Security
├─ SAST Issues
├─ Vulnerability Count
├─ Secret Patterns Found
└─ Dependency Alerts

Performance
├─ Bundle Size
├─ Gzip Size
├─ Memory Leaks
└─ Render Performance
```

### Viewing Reports

Reports are available:

- ✅ In PR comments (live)
- ✅ In GitHub Checks tab
- ✅ In workflow artifacts (if enabled)
- ✅ In Rabbit dashboard (if configured)

---

## 🛠️ Troubleshooting

### Workflow Not Running

**Check:**

1. Workflow file exists: `.github/workflows/rabbit-code-review.yml`
2. PR targets correct branches
3. Files match `paths` filter in workflow
4. Workflows are enabled in repository settings

**Fix:**

```bash
# Verify workflow syntax
cd .github/workflows
cat rabbit-code-review.yml | head -20
```

### Configuration Not Applied

**Check:**

1. `.rabbit-code-review.yml` is in repository root
2. YAML syntax is valid
3. Configuration is committed and pushed
4. Workflow uses `main` branch configuration

**Fix:**

```bash
# Validate YAML
npm install -g yaml-validator
yaml-validator .rabbit-code-review.yml
```

### Too Many False Positives

**Solutions:**

1. Adjust complexity thresholds in `.rabbit-code-review.yml`
2. Add exclusions for specific files
3. Create custom rules for your patterns
4. Suppress specific rules for code sections

**Example - Suppress rule:**

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function complexFunction(args: any) {
  // Implementation
}
```

### Workflow Timing Out

**Solutions:**

1. Reduce number of files analyzed
2. Exclude large directories
3. Disable heavy analysis (complexity, duplication)
4. Split analysis into multiple jobs

---

## 🔐 Security Considerations

### Secret Detection

Rabbit detects:

- API keys and tokens
- Database passwords
- Private keys
- SSH keys
- AWS credentials

**If detected:**

1. Rabbit will flag as CRITICAL
2. PR will fail checks
3. Rotate the exposed secret immediately
4. Remove from code
5. Re-push changes

### SAST Rules

Rabbit checks for:

- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) issues
- CSRF (Cross-Site Request Forgery) vulnerabilities
- Command injection risks
- Insecure cryptography

---

## 📝 Best Practices

### Keep Complexity Low

- Break functions into smaller pieces
- Extract helper functions
- Use early returns
- Reduce nesting levels

### Write Type Annotations

- Always type function parameters
- Always type return values
- Use strict TypeScript mode
- Avoid `any` types

### Handle Errors Properly

- Don't swallow exceptions
- Provide meaningful error messages
- Use try-catch appropriately
- Log errors for debugging

### Avoid Code Duplication

- Extract common patterns
- Create reusable utilities
- Use shared components
- Follow DRY principle

### Document Your Code

- Add comments for complex logic
- Write clear variable names
- Include type definitions
- Update docs with changes

---

## 🎓 Learning Resources

### Code Quality

- [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Secure Coding](https://www.securecoding.cert.org/)

### Performance

- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Bundle Analysis](https://webpack.js.org/plugins/bundle-analyzer/)

---

## 🔗 Integration Points

### GitHub Integration

- ✅ PR comments
- ✅ Check runs
- ✅ Status checks
- ✅ Review suggestions

### CI/CD Pipeline

- ✅ Runs on every PR
- ✅ Blocks merge if critical
- ✅ Passes artifacts to deploy
- ✅ Integrates with other checks

### Team Communication

- ✅ PR feedback loop
- ✅ Issue tracking
- ✅ Code review insights
- ✅ Quality metrics

---

## 📞 Support

For issues with Rabbit Code Review:

1. **Check Configuration**
   - Review `.rabbit-code-review.yml`
   - Validate YAML syntax
   - Check include/exclude patterns

2. **Check Workflow**
   - View workflow runs
   - Check logs for errors
   - Verify GitHub token permissions

3. **Review Documentation**
   - See this guide
   - Check Rabbit docs
   - Review ESLint/TypeScript docs

4. **Contact**
   - Email: support@vingo-roll.com
   - GitHub Issues: Use "code-review" label
   - Discussions: GitHub Discussions tab

---

## 📊 Version

- **Created:** August 8, 2026
- **Configuration Version:** 1.0
- **Status:** ✅ Production Ready

---

## ✨ Summary

Rabbit Code Review is now:

- ✅ Configured for your project
- ✅ Running on every PR
- ✅ Providing automated feedback
- ✅ Helping maintain code quality
- ✅ Detecting security issues
- ✅ Analyzing performance

No further setup needed - it works automatically!
