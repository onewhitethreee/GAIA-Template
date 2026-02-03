# DM-USER-000-FE-T01 — Implementation Plan

**Source ticket**: `specs/features/dark-mode/tickets.md` → **DM-USER-000-FE-T01**  
**Related user story**: **DM-USER-001/002** (Global refinement)  
**Plan version**: v1.0 — Antigravity, 2026-02-03
**Traceability**: This plan ensures that all existing and future components adhere to the Dark Mode visual standards.

---

## 1) Context & Objective

- **Ticket summary**: Refactor and verify the global styling to ensure a high-quality Dark Mode experience. This involves auditing all existing components (`TaskLayout`, `TaskPage`) to ensure they use Tailwind semantic tokens (e.g., `text-foreground`, `bg-background`) instead of hardcoded light-only colors, and verifying contrast ratios against WCAG AA standards.
- **Impacted entities/tables**: N/A.
- **Impacted services/modules**:
  - `src/index.css` (CSS variables audit)
  - `src/features/task-management/components/TaskLayout.tsx`
  - `src/features/task-management/pages/TaskPage.tsx`
- **Impacted tests or business flows**:
  - Visual consistency across all screens.

## 2) Scope

- **In scope**:
  - Auditing `index.css` to confirm `.dark` variables are correct.
  - Updating component classes to use `dark:` prefix where semantic tokens are insufficient.
  - Ensuring background and text colors transition smoothly.
  - Verifying the "placeholder" components in `TaskPage` look good in dark mode.
- **Out of scope**:
  - Implementing new features (Task list logic).
  - Changing the base brand colors (unless contrast fails).
- **Assumptions**:
  - The project uses Tailwind v4 with the `@theme` block in `index.css`.
- **Open questions**: None.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing

1. **Define/Update tests**
   - Since CSS/styling is hard to unit test, we will perform **Visual Verification** using the dev server.
   - We will also add a simple E2E test skeleton (if Playwright is ready) to check for the `.dark` class existence on the `html` element.
2. **Implementation**
   - Check `index.css` for any missing variables in the `.dark` block.
   - Refactor `TaskLayout` and `TaskPage` to ensure they use semantic tokens.
3. **Audit**: Use browser dev tools to check contrast ratios (Accessibility audit).

### 3.2 NFR hooks

- **Accessibility**:
  - MUST meet WCAG AA (contrast ≥ 4.5:1 for normal text).
  - Ensure `border-border` and `bg-muted` are distinguishable in dark mode.
- **Brand & Visuals**:
  - Follow `brand-guidelines.md` section 10 (Theming).
  - Background surface: `--background` (Dark variant).
  - Text: `--foreground` (Light variant).

## 4) Atomic Task Breakdown

### Task 1: Audit and Refine Global CSS Variables

- **Purpose**: Ensure the foundation for dark mode styling is complete and accessible (`DM-USER-000`).
- **Artifacts impacted**: `src/index.css`.
- **Action**: Verify the values in the `.dark` layer. Ensure `border` and `input` variables have enough contrast against `background`.

### Task 2: Refactor Task Management UI for Dark Mode

- **Purpose**: Apply semantic tokens and dark-specific styles to existing components (`DM-USER-000`).
- **Artifacts impacted**:
  - `src/features/task-management/components/TaskLayout.tsx`
  - `src/features/task-management/pages/TaskPage.tsx`
- **Action**:
  - Ensure `TaskPage` placeholders use `bg-muted/20` or similar for better dark mode blending.
  - Verify header borders and typography.

### Task 3: Visual QA and Accessibility Check

- **Purpose**: Verify the implementation across both themes (`DM-USER-000`).
- **Action**:
  - Toggle between themes.
  - Inspect contrast for all text elements.
  - Verify system sync (if possible in environment).
