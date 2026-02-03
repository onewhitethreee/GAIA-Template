import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "../ThemeContext";

// [Feature: Dark Mode] [Story: DM-USER-001] [Ticket: DM-USER-001-FE-T01]
const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();
  });

  it("should render children and provide default theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-value").textContent).toBe("light");
  });

  it("should update theme and persistence when setTheme is called", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const darkButton = screen.getByText("Set Dark");
    act(() => {
      darkButton.click();
    });

    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
    expect(localStorage.getItem("app-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should initialize theme from localStorage", () => {
    localStorage.setItem("app-theme", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-value").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
