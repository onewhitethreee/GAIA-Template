export function TaskPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">My Tasks</h2>
                <p className="text-muted-foreground">Manage your daily tasks efficiently.</p>
            </div>

            {/* Placeholder for Task List */}
            <div className="rounded-lg border border-dashed border-border p-8 text-center bg-muted/30">
                <p className="text-muted-foreground">Task List will appear here (T03)</p>
            </div>
        </div>
    );
}
