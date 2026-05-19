---
trigger: always_on
---

# Design System

Donathell uses an iOS-inspired liquid/frosted glass aesthetic. Follow these conventions by default, but you may propose alternatives if there's a strong reason.

## Visual Style
- Dark theme throughout — no light mode
- Glass morphism as the primary UI pattern: frosted/translucent surfaces, not flat or material
- Brand accent color: `#54fb15` (green) — used for focus glows, highlights, active states
- Asymmetric borders to simulate light direction (lighter top/left, darker bottom/right)
- Layered `box-shadow inset` for 3D depth on cards and containers

## Tailwind
- Tailwind CSS v4 — do not use v3 syntax or arbitrary values unless necessary
- Use utility classes; avoid inline styles
- Custom glass styles live in `glass.css` — extend there, don't duplicate in components

## Components
- Prefer composable, single-responsibility components
- Match existing component patterns before introducing new ones
- When proposing a visual change, explain how it fits or intentionally diverges from the glass aesthetic