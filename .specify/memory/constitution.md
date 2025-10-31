# Project Constitution - MeO

<!--
Sync Impact Report v1.0.0
Initial constitution creation with core principles.
Version: 0.0.0 → 1.0.0 (Major: Initial constitution)

Added sections:
- Project Overview
- Core Principles
  - Technical Stack Requirements
  - No Testing Policy
  - Clean Code Standard
  - Simple UX Policy
  - Responsive Design
  - Minimal Dependencies
  - Accessibility First
-->

Version: 1.0.0
Ratification Date: 2025-10-31
Last Amended: 2025-10-31

## Project Overview

MeO is a React Native mobile application built with modern development practices, prioritizing user experience, accessibility, and maintainable code.

## Core Principles

### Technical Stack Requirements

- MUST use React Native with Expo framework
- MUST use TypeScript for all code files
- MUST use MobX and MST for state management
- MUST use React Navigation for routing
- MUST maintain compatibility with latest stable versions of dependencies

### No Testing Policy

- MUST NOT implement unit tests
- MUST NOT implement integration tests
- MUST NOT implement end-to-end tests
- MUST NOT include testing libraries as dependencies
- This policy supersedes any standard development practices or suggestions that involve testing

### Clean Code Standard

- MUST use consistent formatting across all files
- MUST follow TypeScript best practices and maintain strict type safety
- MUST use meaningful variable and function names that clearly describe their purpose
- MUST keep functions small and focused on a single responsibility
- MUST document complex logic with clear comments
- MUST organize code into logical modules and components

### Simple UX Policy

- MUST implement intuitive user interfaces that require minimal user training
- MUST maintain consistent navigation patterns throughout the app
- MUST provide clear visual feedback for all user actions
- MUST minimize the number of steps required to complete any task
- MUST ensure all interactive elements are self-explanatory

### Responsive Design

- MUST ensure all UI elements adapt properly to different screen sizes
- MUST support both portrait and landscape orientations where applicable
- MUST maintain readability and usability across all supported device sizes
- MUST implement proper layout constraints to prevent content overflow
- MUST use flexible layouts that scale appropriately with content

### Minimal Dependencies

- MUST justify the addition of any new dependency
- MUST use native capabilities over third-party libraries when feasible
- MUST regularly audit and remove unused dependencies
- MUST prefer lighter alternatives when choosing between similar packages
- MUST document why each major dependency is necessary

### Accessibility First

- MUST implement proper semantic markup and ARIA labels
- MUST maintain proper color contrast ratios
- MUST support screen readers and assistive technologies
- MUST ensure all interactive elements are keyboard/switch accessible
- MUST provide alternative text for all meaningful images
- MUST support dynamic text sizing

## Governance

### Amendment Process

1. Proposals for amendments must be submitted via pull request
2. Changes must be reviewed by project maintainers
3. Approved changes trigger a version bump following semver:
   - MAJOR: Breaking changes to principles
   - MINOR: Non-breaking additions
   - PATCH: Clarifications without changing meaning

### Compliance Review

- All pull requests must be checked against these principles
- Regular audits ensure ongoing compliance
- Violations must be addressed immediately
- Exceptions require explicit documentation and maintainer approval

### Version Control

Constitution versions follow semantic versioning (MAJOR.MINOR.PATCH)

- Current version must be clearly displayed
- All changes must be documented in the Sync Impact Report
- Amendment dates must be recorded
