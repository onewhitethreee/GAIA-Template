# DM-USER-002-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/dark-mode/tickets.md` → **DM-USER-002-FE-T01**  
**Related user story**: **DM-USER-002** (from `specs/features/dark-mode/user-stories.md`)  
**Plan version**: v1.0 — Antigravity, 2026-02-03
**Traceability**: All tasks include inline references to `DM-USER-002-FE-T01` and `DM-USER-002` scenarios.

---

## 1) Context & Objective

- **Ticket summary**: Enhance the existing `ThemeContext` to support automatic system theme detection. If the user has not explicitly set a theme preference in LocalStorage, the application should default to the system's light or dark mode preference.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**:
  - `src/app/providers/ThemeContext.tsx` (Logic update)
- **Impacted tests or business flows**:
  - `DM-USER-002`: System Theme Detection (Standard and Override scenarios).

## 2) Scope

- **In scope**:
  - Initialization logic using `window.matchMedia('(prefers-color-scheme: dark)').matches`.
  - Preference priority logic: LocalStorage (Manual) > System Preference > Default (Light).
  - Continuous listening for system theme changes (Optional but recommended for consistency).
- **Out of scope**:
  - Manual toggle UI (already implemented).
  - Style refactoring.
- **Assumptions**:
  - `matchMedia` is available in the target browsers.
- **Open questions**: Should we update the theme automatically if the user changes the system theme _while_ the app is open, even if they never manually set one? (Assumption: Yes, if no manual preference exists).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing

1. **Define/Update tests**
   - Update `src/app/providers/__tests__/ThemeContext.test.tsx` (or create a new test file).
   - Mock `window.matchMedia` to simulate system dark mode.
   - Test initialization when system is dark and no LocalStorage is present. (Scenario: Default to System Preference (Dark)).
   - Test that LocalStorage manual override still works. (Scenario: Manual Override takes precedence).
2. **Minimal implementation** to pass tests.
3. **Refactor**: Clean up the media query listener logic to prevent memory leaks.

### 3.2 NFR hooks

- **Performance**: Use efficient event listeners for theme changes.
- **Accessibility**: Ensures the app respects users' OS-level accessibility preferences.
- **Observability**: None needed.

## 4) Atomic Task Breakdown

### Task 1: Add System Detection Logic to ThemeProvider

- **Purpose**: Update the state initialization to check system preference if LocalStorage is empty (`DM-USER-002-FE-T01`).
- **Prerequisites**: `DM-USER-001-FE-T01` implemented.
- **Artifacts impacted**: `src/app/providers/ThemeContext.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** my system preference is Dark
  - **And** I have no app-specific preference saved
  - **When** I initialize the app
  - **Then** the application should start in Dark mode.

### Task 2: Listen for System Theme Changes

- **Purpose**: Ensure the app reacts to system theme changes in real-time when no manual override is active (`DM-USER-002`).
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `src/app/providers/ThemeContext.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** the app is running with no manual preference
  - **When** I change my system theme from Light to Dark
  - **Then** the application interface should automatically switch to Dark theme.

### Task 3: Update Unit Tests

- **Purpose**: Verify system detection and priority logic (`DM-USER-002-FE-T01`).
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `src/app/providers/__tests__/ThemeContext.test.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** mocked system preference
  - **Then** all DM-USER-002 scenarios must pass.
