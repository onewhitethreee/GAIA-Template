import { createBrowserRouter } from "react-router-dom";
import { TaskLayout } from "@/features/task-management/components/TaskLayout";
import { TaskPage } from "@/features/task-management/pages/TaskPage";

export const router = createBrowserRouter([
    {
        path: "/tasks",
        element: <TaskLayout />,
        children: [
            {
                index: true,
                element: <TaskPage />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome to GAIA Tasks</h1>
                    <a href="/tasks" className="mt-4 inline-block text-primary hover:underline">
                        Go to Dashboard
                    </a>
                </div>
            </div>
        )
    }
]);
