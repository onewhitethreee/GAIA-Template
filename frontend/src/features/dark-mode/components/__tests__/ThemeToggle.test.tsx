import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeProvider } from '@/app/providers/ThemeContext'

// [Feature: Dark Mode] [Story: DM-USER-001] [Ticket: DM-USER-001-FE-T02]

describe('ThemeToggle', () => {
  it('should render moon icon and correct label when theme is light', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    const button = screen.getByRole('button')
    // aria-label for light theme (to switch to dark)
    expect(button).toHaveAttribute('aria-label', 'Cambiar a tema oscuro')
  })

  it('should toggle theme on click', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // After click, it should be dark theme, so label should suggest switching to light
    expect(button).toHaveAttribute('aria-label', 'Cambiar a tema claro')
  })
})
