// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T02]
export type TaskStatus = 'pending' | 'completed';

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T02]
export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: number;
    description?: string; // Future proofing
}
