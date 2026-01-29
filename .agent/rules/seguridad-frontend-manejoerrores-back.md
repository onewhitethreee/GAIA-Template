---
trigger: always_on
---

1. Payload Sanitization (422 Prevention):
Before sending forms to the backend, always filter out empty optional fields (such as empty strings ""). If an optional field has no value, it must be removed from the payload object or sent as undefined/null, never as an empty string, to avoid Pydantic validation errors (e.g., min_length).

2. Safe Error Rendering (React Crash Prevention):
Never directly render the API error response (err.response.data.detail) in JSX. Backend validation errors are often objects or arrays. Always process the error to convert it into a safe string before displaying it (e.g., using JSON.stringify, joining arrays with .join(), or extracting specific messages).

3. Frontend Static Asset Management:
When initializing or modifying frontend projects (Vite/React), always verify the existence of the public directory and ensure that critical assets referenced in index.html (like favicon.ico, robots.txt, manifest.json) physically exist in that directory. If you generate a new project, create a default favicon if none exists to avoid 404 errors in the browser.

4. Docker Stack Reseeding After Restart:
Whenever the Docker stack for this project is stopped and then started again (e.g., using docker compose down/docker compose down -v followed by docker compose up or docker compose up --build), the backend database must be reseeded so that the system always has demo data available for manual testing: once the backend service is up and healthy, run docker compose exec backend python seed_data.py inside the container, ensure the command finishes successfully (exit code 0 and no critical errors in the output), and if seeding fails, do not proceed with any manual testing steps that assume the presence of demo data and clearly surface the failure in the workflow summary.

5. Docker Dependency Management:
When adding new libraries (frontend or backend), ALWAYS execute the installation command through Docker (e.g., docker compose exec frontend npm install <package>) or rebuild the container immediately. Never do it only locally, to ensure the execution environment recognizes the changes.