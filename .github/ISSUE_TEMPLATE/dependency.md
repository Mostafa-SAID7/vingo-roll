---
name: Dependency Issue
about: Report problems with dependencies (versions, conflicts, vulnerabilities)
title: "[DEPS] "
labels: "dependencies"
assignees: ""
---

## Dependency Issue

Describe the dependency problem clearly.

## Issue Type

- [ ] Outdated Dependency
- [ ] Vulnerable Dependency
- [ ] Version Conflict
- [ ] Dependency Missing
- [ ] Peer Dependency Issue
- [ ] Large Bundle Size
- [ ] Licensing Concern
- [ ] Installation Problem

## Affected Dependency

- **Package Name:** [e.g., react, zustand]
- **Current Version:** [e.g., 18.0.0]
- **Suggested Version:** [e.g., 19.0.0]
- **Latest Version:** [e.g., 19.5.0]

## Why This Matters

Explain the impact of this dependency issue:

- Performance impact
- Security concern
- Compatibility issue
- Build problem
- Runtime issue

## Current Status

```bash
# Paste output from:
npm audit
# or
npm ls [package-name]
```

## Environment

- OS: [e.g. Windows, macOS, Linux]
- Node version: [e.g. 20.x]
- npm version: [e.g. 9.x]

## Reproduction

Steps to reproduce the issue:

1. ...
2. ...
3. ...

## Error Message

```
Paste full error message or stack trace
```

## Suggested Solution

- [ ] Update to specific version
- [ ] Replace with alternative package
- [ ] Remove dependency
- [ ] Pin to specific version

## Migration Path

If updating or replacing, describe the migration steps:

1. ...
2. ...

## References

- [Link to npm package]
- [Security advisory if applicable]
- [Related issues/PRs]

