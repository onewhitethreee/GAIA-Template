# Dark Mode — Implementation Tickets

This feature focuses on implementing a theme toggle system (Light/Dark) with system preference detection and persistence. Since this is a client-side only MVP (using LocalStorage), there are no DB or BE tickets required.

---

### Story: DM-USER-001 — Manual Theme Toggle

**Source**: `user-stories.md`
**Key Scenarios**:

- Toggle to Dark Mode
- Toggle to Light Mode
- Persistence (LocalStorage)

#### Tickets for DM-USER-001

1. - [ ] **DM-USER-001-FE-T01 — Implement Theme Context and Persistence**
   - **Type**: FE
   - **Description**: Create a React Context and Anchor to manage the theme state (light/dark). Handle LocalStorage persistence and provide a custom hook `useTheme`.
   - **Scope**:
     - `ThemeContext` provider.
     - `useTheme` hook.
     - LocalStorage sync logic.
     - `useEffect` to apply `dark` class to `document.documentElement`.
   - **Dependencies**: None.
   - **Deliverables**: Theme provider wrapping the app, unit tests for persistence.

2. - [ ] **DM-USER-001-FE-T02 — Create Theme Toggle Component**
   - **Type**: FE
   - **Description**: Implement a visual toggle button (Sun/Moon icon) using the `useTheme` hook to switch states.
   - **Scope**:
     - Responsive Toggle button.
     - Sun/Moon SVG icons.
     - Accessible button labels (aria-label).
   - **Dependencies**: DM-USER-001-FE-T01
   - **Deliverables**: `ThemeToggle` component, integration in the Main Header/Layout.

---

### Story: DM-USER-002 — System Theme Detection

**Source**: `user-stories.md`
**Key Scenarios**:

- Default to System Preference (Dark)
- Default to System Preference (Light)
- Manual Override precedence

#### Tickets for DM-USER-002

1. - [ ] **DM-USER-002-FE-T01 — Implement System Preference Sync**
   - **Type**: FE
   - **Description**: Update the `ThemeContext` to detect `prefers-color-scheme: dark` on startup if no manual override exists in LocalStorage.
   - **Scope**:
     - Detection logic using `window.matchMedia`.
     - Priority logic: LocalStorage > System Preference > Default (Light).
   - **Dependencies**: DM-USER-001-FE-T01
   - **Deliverables**: Updated `ThemeContext` with detection logic, unit tests for precedence.

---

### Story: GLOBAL — Styling Refactor

**Source**: N/A (Feature-wide requirement)
**Key Scenarios**: All scenarios

#### Tickets for GLOBAL

1. - [ ] **DM-USER-000-FE-T01 — Update CSS Variables for Dark Mode**
   - **Type**: FE
   - **Description**: Refactor existing Tailwind classes to use dark mode variants (`dark:`) or CSS variables that change based on the `.dark` class.
   - **Scope**:
     - Update colors for: Backgrounds, Text, Borders, Cards, Buttons, Inputs.
     - Verification of accessibility (contrast ratios).
   - **Dependencies**: DM-USER-001-FE-T01
   - **Deliverables**: Updated CSS/Tailwind configuration and component styles.
