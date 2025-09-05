# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla JavaScript Pomodoro Timer web application with no external dependencies. The application consists of only 4 files:
- `index.html` - Single page application
- `style.css` - Modern, minimalist styling
- `script.js` - All timer functionality
- `README.md` - Setup and usage instructions

## Development Commands

Since this is a vanilla HTML/CSS/JS application, no build tools or package managers are used:

- **Run locally**: Open `index.html` directly in a browser
- **Deploy**: Upload files to any static hosting (GitHub Pages compatible)
- **Test**: Manual testing by opening in browser

## Architecture

**Single-Page Application Structure:**
- All functionality contained in `script.js` with modern ES6+ JavaScript
- Settings stored in localStorage (persistent across sessions)
- Timer state can optionally persist in localStorage
- Modal-based settings interface overlaying main timer

**Core Components:**
- Timer display (MM:SS format)
- Start/Pause toggle button
- Reset button
- Settings modal with form inputs for customizing durations
- Three timer modes: Work (25min), Short Break (5min), Long Break (15min)

**Data Flow:**
- Settings are saved to localStorage separately from timer state
- Custom timer durations are configurable via settings modal
- Sound notification triggers on timer completion
- Visual mode indicators show current timer type

## Key Constraints

- **NO external dependencies** - vanilla JS only
- **NO backend/database** - purely client-side
- **Desktop-first design** - mobile responsive is optional
- **Single color theme** - uses CSS variables for easy theming
- **Minimalist approach** - avoid complex animations or features

## Implementation Notes

- Use semantic HTML5 elements
- Modern ES6+ syntax (const/let, arrow functions)
- CSS variables for consistent theming
- Max-width 400px centered layout
- Settings modal with backdrop blur effect
- All code comments should focus on main functions only