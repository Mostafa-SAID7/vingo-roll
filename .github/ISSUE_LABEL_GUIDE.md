# GitHub Issues & Labels Guide

## How to Use Issue Templates

### 1. **Bug Report** 🐛
**Use when:** Something is broken or not working as expected

- Provide clear reproduction steps
- Include error messages and console output
- Specify affected component
- Indicate severity level

**Label:** `bug`

---

### 2. **Feature Request** ✨
**Use when:** You want a new feature or improvement

- Describe the problem it solves
- Explain the use case
- Consider alternatives
- Include mockups if applicable

**Label:** `enhancement`

---

### 3. **Question** ❓
**Use when:** You need help or clarification

- Check documentation first
- Ask specifically what you need
- Share relevant code if applicable
- Include environment details

**Label:** `question`

---

### 4. **Security Issue** 🔒
**Use when:** You found a security vulnerability

- ⚠️ **DO NOT create public issues for security bugs**
- Email security@vingo-roll.com instead
- Provide proof of concept privately
- Allow time for fixes

**Label:** `security` (for non-sensitive issues only)

---

### 5. **Accessibility Issue** ♿
**Use when:** Something is not accessible to all users

- Describe the barrier
- Specify assistive technology affected
- Include WCAG criteria violated
- Test with keyboard and screen reader

**Label:** `accessibility`

---

### 6. **Performance Issue** ⚡
**Use when:** Something is slow or uses too many resources

- Measure and report metrics
- Share browser DevTools output
- Explain user impact
- Suggest optimization ideas

**Label:** `performance`

---

### 7. **Dependency Issue** 📦
**Use when:** There's a problem with npm packages

- Specify package name and version
- Include npm audit output
- Explain the impact
- Suggest resolution

**Label:** `dependencies`

---

### 8. **Documentation Issue** 📚
**Use when:** Documentation is missing or incorrect

- Link to the affected documentation
- Explain what's wrong
- Suggest improvements
- Offer to contribute if interested

**Label:** `documentation`

---

### 9. **UI/UX Issue** 🎨
**Use when:** Design or user experience needs improvement

- Include current vs desired screenshots
- Explain impact on users
- Specify affected components
- Consider mobile and desktop

**Label:** `ui-ux`

---

### 10. **Regression Issue** 🔄
**Use when:** Something that worked before is now broken

- Specify last working version
- Include reproduction steps
- Note when it broke
- Link to related commits if known

**Label:** `regression`

---

### 11. **Chore / Maintenance** 🧹
**Use when:** Code cleanup, refactoring, or maintenance tasks

- Describe what needs to be done
- Explain why it's necessary
- Estimate effort
- Link to related issues

**Label:** `chore`

---

## Standard Labels

| Label | Color | Usage |
|-------|-------|-------|
| `bug` | 🔴 Red | Something is broken |
| `enhancement` | 💚 Green | New feature or improvement |
| `documentation` | 📘 Blue | Docs need update |
| `question` | 🟠 Orange | User is asking for help |
| `security` | ⚫ Black | Security-related issue |
| `accessibility` | 🟣 Purple | Accessibility barrier |
| `performance` | ⚡ Yellow | Performance problem |
| `dependencies` | 📦 Brown | Dependency issue |
| `ui-ux` | 🎨 Pink | Design/UX issue |
| `chore` | 🧹 Gray | Maintenance task |
| `regression` | 🔄 Red | Feature broke |
| `good first issue` | 💜 Purple | For newcomers |
| `help wanted` | 🆘 Red | Need community help |
| `wontfix` | ⛔ Red | Won't be fixed |
| `invalid` | ⚪ Gray | Not a valid issue |

---

## Priority Labels

| Label | Urgency | Response Time |
|-------|---------|---------------|
| `priority: critical` | 🔴 Must fix now | < 24 hours |
| `priority: high` | 🟠 Soon | < 3 days |
| `priority: medium` | 🟡 Normal | < 1 week |
| `priority: low` | 🟢 Eventually | < 2 weeks |

---

## Status Labels

| Label | Meaning |
|-------|---------|
| `status: triage` | Waiting to be reviewed |
| `status: in-progress` | Someone is working on it |
| `status: blocked` | Waiting for something else |
| `status: ready` | Ready to be implemented |
| `status: review` | Waiting for review |
| `status: done` | Completed |

---

## Type Labels

| Label | Type of Work |
|-------|-------------|
| `type: api` | API-related |
| `type: frontend` | Frontend/UI |
| `type: backend` | Backend logic |
| `type: ci-cd` | CI/CD pipeline |
| `type: test` | Testing |
| `type: build` | Build system |

---

## Best Practices

### Before Creating an Issue
- [ ] Search existing issues first
- [ ] Check documentation
- [ ] Review closed issues
- [ ] Test with latest version
- [ ] Prepare all required information

### When Creating an Issue
- [ ] Use the appropriate template
- [ ] Be clear and concise
- [ ] Include all relevant details
- [ ] Add screenshots if applicable
- [ ] Use proper formatting

### When Commenting
- [ ] Stay on topic
- [ ] Be respectful
- [ ] Provide helpful information
- [ ] Link to related issues
- [ ] Avoid duplicating information

---

## Closing Issues

Issues are closed when:
- ✅ Bug is fixed and deployed
- ✅ Feature is implemented and merged
- ✅ Question is answered
- ✅ Documentation is updated
- ✅ Issue is duplicate/invalid
- ⛔ Won't be fixed (with explanation)

---

## Issue Lifecycle

```
1. CREATE
   └─ Choose template
   └─ Provide details

2. TRIAGE
   └─ Review issue
   └─ Assign labels
   └─ Prioritize

3. DISCUSSION
   └─ Ask questions
   └─ Gather info
   └─ Refine scope

4. IMPLEMENTATION
   └─ Assign to developer
   └─ Create PR
   └─ Update status

5. REVIEW
   └─ Code review
   └─ Testing
   └─ Approval

6. CLOSE
   └─ Merge PR
   └─ Close issue
   └─ Document solution
```

---

## Getting Help

- 📖 [Documentation](../docs/INDEX.md)
- 💬 [Discussions](https://github.com/Mostafa-SAID7/vingo-roll-studio/discussions)
- 📧 [Email Support](mailto:support@vingo-roll.com)
- 🔐 [Security](./SECURITY.md)

