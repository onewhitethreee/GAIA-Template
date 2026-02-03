# DM-USER-001-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/dark-mode/tickets.md` → **DM-USER-001-FE-T01**  
**Related user story**: **DM-USER-001** (from `specs/features/dark-mode/user-stories.md`)  
**Plan version**: v1.0 — Antigravity, 2026-02-03
**Traceability**: All tasks include inline references to `DM-USER-001-FE-T01` and `DM-USER-001` scenarios.

---

## 1) Context & Objective

- **Ticket summary**: Create a React Context (`ThemeContext`) to manage the application's theme (light/dark). This includes a provider to wrap the app, a custom hook `useTheme` for consuming the state, and persistence logic using `LocalStorage` to ensure the user's choice survives page reloads.
- **Impacted entities/tables**: N/A (Frontend only).
- **Impacted services/modules**:
  - `src/app/providers/ThemeContext.tsx` (New)
  - `src/main.tsx` (Integration)
- **Impacted tests or business flows**:
  - `DM-USER-001`: Manual Theme Toggle (Persistence scenario).

## 2) Scope

- **In scope**:
  - `Theme` type definition (`light` | `dark`).
  - `ThemeContext` and `ThemeProvider` component.
  - `useTheme` custom hook.
  - LocalStorage key constant (e.g., `app-theme`).
  - Side effect to sync theme with `document.documentElement` class list.
  - Initial state logic (check LocalStorage).
- **Out of scope**:
  - System preference detection (handled in `DM-USER-002-FE-T01`).
  - The toggle UI component (handled in `DM-USER-001-FE-T02`).
  - Detailed styling of components (handled in `DM-USER-000-FE-T01`).
- **Assumptions**:
  - Standard React Context API is sufficient.
  - No complex theme multi-tenancy needed.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing

1. **Define/Update tests**
   - Create `src/app/providers/__tests__/ThemeContext.test.tsx`.
   - Test that `ThemeProvider` renders children.
   - Test that `useTheme` returns the default theme (`light`).
   - Test that calling `setTheme` updates the state and LocalStorage. (Scenario: Manual Theme Toggle).
   - Test that `ThemeProvider` initializes from LocalStorage if present. (Scenario: Persistence).
2. **Minimal implementation** to pass tests.
3. **Refactor**: Ensure clean separation of concerns and proper TypeScript typing.

### 3.2 NFR hooks

- **Accessibility**: None directly for the context, but ensures downstream accessibility for theme-dependent colors.
- **Performance**: Ensure no unnecessary re-renders of the entire app when theme changes (though usually acceptable for theme).
- **Brand & Visuals**: Use the `surface-0-dark` and `surface-1-dark` tokens indirectly by applying the `.dark` class.
- **Connectivity & Routing**: The `ThemeProvider` will wrap the `RouterProvider` in `main.tsx`.

## 4) Atomic Task Breakdown

### Task 1: Initialize ThemeContext and Provider

- **Purpose**: Create the foundational context and provider for theme management (`DM-USER-001-FE-T01`).
- **Prerequisites**: Ensure `frontend/src/app/providers` exists.
- **Artifacts impacted**: `src/app/providers/ThemeContext.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** the app is starting
  - **When** the `ThemeProvider` is rendered
  - **Then** children components should have access to the current theme via `useTheme`.

### Task 2: Implement Persistence and DOM Sync

- **Purpose**: Ensure the theme choice is saved and applied to the HTML element (`DM-USER-001`, Scenario: Persistence).
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `src/app/providers/ThemeContext.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** I have set the theme to "dark"
  - **When** I refresh the page
  - **Then** the `html` element should have the `dark` class
  - **And** the theme state should be "dark".

### Task 3: Global Integration

- **Purpose**: Wrap the entire application with the `ThemeProvider` (`DM-USER-001-FE-T01`).
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `src/main.tsx`.
- **Test types**: Integration/E2E (manual verification for now).
- **BDD Acceptance**:
  - **Given** the `main.tsx` is executed
  - **Then** the `RouterProvider` should be a child of `ThemeProvider`.
