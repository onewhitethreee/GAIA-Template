# DM-USER-001-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/dark-mode/tickets.md` → **DM-USER-001-FE-T02**  
**Related user story**: **DM-USER-001** (from `specs/features/dark-mode/user-stories.md`)  
**Plan version**: v1.0 — Antigravity, 2026-02-03
**Traceability**: All tasks include inline references to `DM-USER-001-FE-T02` and `DM-USER-001` scenarios.

---

## 1) Context & Objective

- **Ticket summary**: Implement a visual toggle button that allows users to switch between Light and Dark themes manually. The component will use the `useTheme` hook created in the previous ticket and will be placed in the main application header.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**:
  - `src/features/dark-mode/components/ThemeToggle.tsx` (New)
  - `src/features/task-management/components/TaskLayout.tsx` (Integration)
- **Impacted tests or business flows**:
  - `DM-USER-001`: Manual Theme Toggle (Toggle scenarios).

## 2) Scope

- **In scope**:
  - A responsive button component.
  - Integration with `Lucide-React` (Sun and Moon icons).
  - Accessibility: `aria-label` localized in Spanish as per `brand-guidelines.md`.
  - Visual states: Hover and Focus ring.
  - Placement in the right side of the main header.
- **Out of scope**:
  - Complex animations (e.g., GSAP).
  - System preference detection logic (handled in `DM-USER-002-FE-T01`).
- **Assumptions**:
  - `Lucide-React` icons are available.
  - The `useTheme` hook works correctly from `src/app/providers/ThemeContext`.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing

1. **Define/Update tests**
   - Create `src/features/dark-mode/components/__tests__/ThemeToggle.test.tsx`.
   - Test that the toggle renders the correct icon based on the current theme.
   - Test that clicking the toggle calls the `setTheme` function. (Scenario: Toggle to Dark/Light Mode).
   - Test accessibility: verify presence of `aria-label` in Spanish.
2. **Minimal implementation** to pass tests.
3. **Refactor**: Style the component using Tailwind CSS, adhering to `brand-guidelines.md` (8pt grid, spacing tokens).

### 3.2 NFR hooks

- **Accessibility**:
  - `aria-label` MUST be in Spanish: "Cambiar a tema oscuro" / "Cambiar a tema claro".
  - Button MUST have a visible focus ring (min 2px).
  - Touch target target ≥ 44x44px.
- **Performance**: Very low impact.
- **Brand & Visuals**:
  - Use `Lucide-React`.
  - Multiforce focus ring using Tailwind utility classes.
- **Connectivity & Routing**: Integrated as a sub-component of the global/main layout.

## 4) Atomic Task Breakdown

### Task 1: Create ThemeToggle Component

- **Purpose**: Build the UI toggle component and link it to the theme state (`DM-USER-001`).
- **Prerequisites**: `DM-USER-001-FE-T01` completed.
- **Artifacts impacted**: `src/features/dark-mode/components/ThemeToggle.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** I am a user looking at the header
  - **When** the current theme is Light
  - **Then** I should see a "Moon" icon with the label "Cambiar a tema oscuro".

### Task 2: Implement Unit Tests for ThemeToggle

- **Purpose**: Verify the component logic and accessibility (`DM-USER-001-FE-T02`).
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `src/features/dark-mode/components/__tests__/ThemeToggle.test.tsx`.
- **Test types**: Unit.
- **BDD Acceptance**:
  - **Given** the component is rendered
  - **When** I click the button
  - **Then** the `setTheme` mock should be called with the opposite theme.

### Task 3: Integrate into TaskLayout

- **Purpose**: Final assembly of the feature in the main UI (`DM-USER-001-FE-T02`).
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `src/features/task-management/components/TaskLayout.tsx`.
- **Test types**: Manual/E2E.
- **BDD Acceptance**:
  - **Given** I am on the Task Dashboard
  - **When** I look at the header
  - **Then** I should see the theme toggle in the top-right area.
