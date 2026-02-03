# User Stories: Task Management

## 1. Overview
The Task Management feature enables the "Productive Solo" user to manage their daily tasks with minimal friction. The focus is on speed, simplicity, and immediate utility without authentication.

**Objectives:**
- Enable task creation in < 3 clicks.
- Load the application in < 1s.
- Provide a clean, accessible interface for managing task lifecycle.

---

## 2. User Stories

### Story: List Pending Tasks
**ID:** `TM-USER-001`

**As a** Productive Solo user  
**I want** to see a list of my pending tasks ordered by creation date  
**So that** I can clear my mind and know what to focus on next.

#### Acceptance Criteria

**Scenario 1: Happy Path - Viewing the list**
- **Given** I have saved tasks in my local storage
- **When** I open the application
- **Then** I should see the list of tasks with status "pending"
- **And** the tasks should be ordered by creation (newest on top by default)
- **And** I should see the task title and a status indicator (checkbox).

**Scenario 2: Empty State**
- **Given** I have no recorded tasks
- **When** I open the application
- **Then** I should see a friendly empty state message (e.g., "No tasks yet")
- **And** a clear Call to Action (CTA) to add the first task.

**Scenario 3: Layout responsiveness (NFR)**
- **Given** I am on a mobile device (viewport width < 768px)
- **When** I view the task list
- **Then** the layout should adapt to fit the screen without horizontal scrolling
- **And** touch targets for list items should be at least 44x44px.

---

### Story: Create New Task
**ID:** `TM-USER-002`

**As a** Productive Solo user  
**I want** to quickly add a new task using a simple input field  
**So that** I can capture an idea or action before I forget it.

#### Acceptance Criteria

**Scenario 1: Happy Path - Creating a task**
- **Given** I am on the main screen
- **When** I type "Buy milk" into the input field
- **And** I press the "Enter" key or click the "Add" button
- **Then** the new task "Buy milk" should appear at the top of the list
- **And** the input field should be cleared automatically
- **And** the task should be persisted to LocalStorage.

**Scenario 2: Validation - Empty input**
- **Given** the input field is empty or contains only whitespace
- **When** I try to submit the task
- **Then** the system should ignore the action (no task created)
- **And** I should see a subtle visual cue (e.g., input shake or border flash) indicating valid input is required.

**Scenario 3: Security - XSS Prevention (NFR)**
- **Given** I try to enter a task with a script tag `<script>alert('XSS')</script>`
- **When** the task is created and rendered
- **Then** the script should NOT execute
- **And** the title should be displayed as safe text.

**Scenario 4: Performance - creation speed (NFR)**
- **Given** I submit a new task
- **When** the task data is processed
- **Then** the UI update should happen in less than 100ms.

---

### Story: Complete/Uncomplete Task
**ID:** `TM-USER-003`

**As a** Productive Solo user  
**I want** to toggle the completion status of a task  
**So that** I can track my progress and see what is left to do.

#### Acceptance Criteria

**Scenario 1: Happy Path - Marking as done**
- **Given** I have a pending task "Call Mom"
- **When** I click the checkbox next to "Call Mom"
- **Then** the task visual style should change to "completed" (e.g., strikethrough logic)
- **And** the status update should be persisted.

**Scenario 2: Happy Path - Unmarking (Undo completion)**
- **Given** I have a completed task "Call Mom"
- **When** I uncheck the checkbox
- **Then** the task should revert to "pending" state style.

**Scenario 3: A11y - Keyboard Interaction**
- **Given** I navigate the list using the `Tab` key
- **When** focus is on the task checkbox
- **Then** I should be able to toggle the state using the `Space` or `Enter` key.

---

### Story: Delete Task
**ID:** `TM-USER-004`

**As a** Productive Solo user  
**I want** to permanently remove a task  
**So that** I can keep my list clean and relevant.

#### Acceptance Criteria

**Scenario 1: Happy Path - Deleting a task**
- **Given** I have a task "Read book"
- **When** I click the "Delete" button (trash icon) for that task
- **Then** the task should be removed from the visible list immediately.

**Scenario 2: Undo Capability**
- **Given** I have just deleted a task
- **When** the deletion occurs
- **Then** a global notification (toast) should appear with an "Undo" button
- **And** if I click "Undo" within 5 seconds, the task should reappear in the list at its original position.

**Scenario 3: Confirmation/Persistence**
- **Given** I delete a task and do not Undo it
- **When** I refresh the page
- **Then** the deleted task should NOT be present.

---

### Story: Search Tasks
**ID:** `TM-USER-005`

**As a** Productive Solo user  
**I want** to filter my tasks by text  
**So that** I can quickly find a specific item in a long list.

#### Acceptance Criteria

**Scenario 1: Happy Path - Filtering**
- **Given** I have tasks "Buy milk", "Buy eggs", and "Call plumber"
- **When** I type "Buy" into the search bar
- **Then** only "Buy milk" and "Buy eggs" should be visible
- **And** "Call plumber" should be hidden.

**Scenario 2: Case Insensitivity**
- **Given** I search for "milk"
- **When** I have a task "Buy Milk"
- **Then** the task should be found/displayed regardless of capitalization.

**Scenario 3: Clearing Search**
- **Given** I have an active search filter
- **When** I clear the search input
- **Then** the full list of tasks should be visible again.
