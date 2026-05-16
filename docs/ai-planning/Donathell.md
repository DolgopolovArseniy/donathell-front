# Donathell - Project Context

## Overview
Donathell is a pet project application designed to receive donations. It provides features for users to track donations, review statistics and charts, and see real-time incoming donations via SSE (Server-Sent Events). 

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS (for glassmorphism)
- **Icons**: Lucide React
- **API**: Axios for REST, native `EventSource` for SSE.

## Design & Styling Rules
- **Theme**: Dark mode by default (e.g., backgrounds like `#121315`).
- **Aesthetic**: Glassmorphism is heavily used. Components utilize `.glass`, `.glass-input`, and `.glass-button` classes defined in `src/glass.css`.
- **Accent Color**: Neon green (e.g., `rgba(82, 251, 21, 0.945)` used in box-shadows or `text-donathell-main`).

## Core Features
1. **Donations List**: Paginated display of transactions.
2. **Real-time Updates**: SSE integration to stream new donations live.
3. **Filtering**: Advanced filtering by Currency, Donor Name (from), Date Range, and Amount Range.
4. **Statistics**: (Planned/Existing) Charts and stats for donation analysis.

## Development Rules & Constraints
*As requested by the user, these rules MUST be strictly followed during all tasks:*
1. **Clean Code**: Produce clean, readable, and maintainable code. Follow existing architectural patterns.
2. **Test & Verify**: All results must be tested and verified for errors and correct usage before finalizing.
3. **Responsive Design**: All components must be thoroughly tested for correct adaptation on both **mobile** and **desktop** screens.
4. **Discussion First**: Existing problems or new feature implementations must be discussed with the user before actually modifying the code. Await user permission.
