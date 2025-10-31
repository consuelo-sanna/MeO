---
description: "Task list template for React Native feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story and our core principles for clean development and accessibility.

## Format: `[ID] [P?] [Story] [Category] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **[Category]**: Type of task:
  - [UI]: User interface implementation
  - [ACC]: Accessibility feature
  - [RESP]: Responsive design
  - [CLEAN]: Code organization/cleanup
  - [PERF]: Performance optimization
- Include exact file paths in descriptions

## Path Conventions

```text
src/
├── components/          # React Native components
│   ├── ui/             # Reusable UI components
│   └── feature/        # Feature-specific components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── stores/            # MobX stores
├── services/          # Business logic and API calls
├── constants/         # App-wide constants
└── types/            # TypeScript type definitions
```

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup

**Purpose**: Project initialization and technical configuration

- [ ] T001 [CLEAN] Setup project structure following plan.md
- [ ] T002 [CLEAN] Configure TypeScript with strict mode
- [ ] T003 [P] [CLEAN] Configure ESLint and Prettier
- [ ] T004 [P] [CLEAN] Setup MobX store structure
- [ ] T005 [CLEAN] Configure React Navigation

---

## Phase 2: Foundation Components

**Purpose**: Core components and accessibility setup

**⚠️ CRITICAL**: These components form the base for all user stories

- [ ] T006 [P] [ACC] Create accessible base button component
- [ ] T007 [P] [ACC] Create accessible text input component
- [ ] T008 [P] [RESP] Create responsive container components
- [ ] T009 [P] [UI] Setup theme provider with accessibility-first colors
- [ ] T010 [P] [ACC] Configure screen reader support
- [ ] T011 [CLEAN] Setup type definitions for components

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Implementation for User Story 1

- [ ] T012 [P] [US1] [CLEAN] Create types for feature data models
- [ ] T013 [P] [US1] [CLEAN] Setup MobX store for feature state
- [ ] T014 [US1] [UI] Create screen component structure
- [ ] T015 [US1] [RESP] Implement responsive layout
- [ ] T016 [US1] [ACC] Add ARIA labels and roles
- [ ] T017 [US1] [ACC] Implement keyboard navigation
- [ ] T018 [US1] [PERF] Optimize component rendering
- [ ] T019 [US1] [UI] Add loading and error states

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test\_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test\_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test\_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test\_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### Clean Code First

1. Set up proper TypeScript configuration
2. Establish coding standards and linting rules
3. Create type definitions and interfaces
4. Structure components for maintainability

### Accessibility Foundation

1. Configure base accessibility support
2. Set up screen reader compatibility
3. Implement keyboard navigation support
4. Establish color contrast standards

### Feature Development

1. Start with responsive layouts
2. Implement core UI components
3. Add accessibility features
4. Optimize performance
5. Manual validation of all features

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
