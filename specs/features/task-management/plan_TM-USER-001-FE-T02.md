# TM-USER-001-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/task-management/tickets.md` → **TM-USER-001-FE-T02**  
**Related user story**: **TM-USER-001** (List pending tasks) - Data Integ.  
**Plan version**: v1.0 — (Agent, 2026-02-03)

---

## 1) Context & Objective
- **Ticket summary**: Implement the Domain Model (`Task` entity) and the Persistence Layer (`LocalStorageAdapter`) for the Task Management feature. This establishes the client-side database mechanism required for the MVP.
- **Impacted entities**: `Task` (New).
- **Impacted services/modules**: `src/features/task-management/types`, `src/features/task-management/api`.
- **Impacted tests**: Unit tests for the adapter.

## 2) Scope
- **In scope**: 
  - Defining `Task`, `TaskStatus` interfaces/types.
  - Defining `TaskRepository` interface (Port).
  - Implementing `LocalStorageTaskRepository` (Adapter).
  - Implementing methods: `getAll()`, `save(task)`, `delete(id)`.
  - Unit tests using Vitest.
- **Out of scope**: 
  - react-query hooks (belongs to T03).
  - UI components.
- **Assumptions**: 
  - `vitest` is configured (needs check, if not, scaffold minimal test setup).
  - `zod` installed for validation (optional here, but good for data integrity).

## 3) Detailed Work Plan (TDD)

### 3.1 Test-first sequencing
1.  **Define Domain Types**: Create `Task.ts` (types).
2.  **Define Repository Interface**: Create `TaskRepository.ts`.
3.  **Write Tests (Red)**: Create `LocalStorageTaskRepository.test.ts`.
    - Test case: `save` stores a task and `getAll` retrieves it.
    - Test case: `delete` removes a task.
    - Test case: `update` functionality (toggling status).
4.  **Implement (Green)**: Create `LocalStorageTaskRepository.ts` implementation using `window.localStorage`.
5.  **Refactor**: Ensure safe parsing (JSON.parse validation) and error handling.

### 3.2 NFR hooks
- **Performance**: Operations should be synchronous and fast (local).
- **Security**: LocalStorage is vulnerable to XSS (already noted in risks), but for this MVP it's acceptable. Data validation on "read" prevents corrupted data crashing the UI.

## 4) Atomic Task Breakdown

### Task 1: Domain Definition
- **Purpose**: Define the shape of data. `TM-USER-001-FE-T02`.
- **Artifacts**: `src/features/task-management/types/Task.ts`.
- **Content**: `interface Task { id: string; title: string; status: 'pending'|'completed'; createdAt: number; }`

### Task 2: Repository Implementation (TDD)
- **Purpose**: Implement persistence. `TM-USER-001-FE-T02`.
- **Artifacts**: 
  - `src/features/task-management/api/TaskRepository.ts` (interface).
  - `src/features/task-management/api/LocalStorageTaskRepository.ts` (impl).
  - `src/features/task-management/api/__tests__/LocalStorageTaskRepository.test.ts`.
- **Test types**: Unit Test.
- **BDD Acceptance**: 
  - **Given** an empty repository
  - **When** I save a task
  - **Then** I can retrieve it via getAll.

## 5) Verification Plan
- **Automated**: Run `npm run test` (or `npx vitest`) to verify repository logic.
- **Manual**: None required for this data-layer ticket (verified via tests).
