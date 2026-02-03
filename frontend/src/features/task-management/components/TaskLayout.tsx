import { Outlet } from "react-router-dom";

export function TaskLayout() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        Task Dashboard
                    </h1>
                </div>
            </header>
            <main className="container mx-auto py-8 px-4">
                <Outlet />
            </main>
        </div>
    );
}
