# React Live Coding Test — Task Manager

> A hands-on React challenge for junior developers exploring hooks, shadcn/ui, and Tailwind CSS.

![Task Manager Screenshot](https://github.com/user-attachments/assets/94403037-9b70-41c4-b64d-9fcc181bceea)

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v3** | Utility-first styling |
| **shadcn/ui** | Accessible component library (Radix UI + cva) |
| **Lucide React** | Icon library |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

---

## What This App Demonstrates

### React Hooks

| Hook | Where used | What it does |
|------|-----------|--------------|
| `useState` | `App.tsx`, `AddTaskForm.tsx` | Manages tasks list, filter, search, loading state, form fields |
| `useEffect` | `App.tsx` | Loads tasks from `localStorage` on mount, persists tasks on every change |
| `useMemo` | `App.tsx` | Derives the filtered & sorted task list without re-computing on unrelated renders |

### shadcn/ui Components Used

- `Button` — with multiple variants (`default`, `outline`, `ghost`, `destructive`)
- `Card`, `CardHeader`, `CardContent`, `CardDescription`, `CardTitle` — page layout
- `Input` — text fields (task input, search)
- `Label` — accessible form labels
- `Checkbox` — toggle task completion
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` — priority picker
- `Separator` — visual dividers
- `Badge` — priority labels
- `Skeleton` — loading placeholders

### Tailwind CSS Patterns

- Responsive layouts with `sm:` breakpoints
- Gradient background (`bg-gradient-to-br`)
- Dark mode support via CSS variables
- Utility composition with the `cn()` helper (`clsx` + `tailwind-merge`)

---

## Live Coding Challenges

Use this app as a starting point for the following exercises:

### 🟢 Beginner
1. **Add a "Complete All" button** — marks every active task as done.
2. **Task counter badge** — show the active task count in the page `<title>`.
3. **Empty state illustration** — replace the plain text empty state with an SVG or emoji graphic.

### 🟡 Intermediate
4. **Edit a task** — allow clicking the task title to rename it inline.
5. **Due dates** — add a date picker to each task and sort/highlight overdue ones.
6. **Drag-and-drop reordering** — let the user reorder tasks manually.

### 🔴 Advanced
7. **Custom `useTasks` hook** — extract all task state & handlers out of `App.tsx` into a reusable hook.
8. **Optimistic updates + mock API** — replace `localStorage` with simulated `fetch` calls; show loading & error states.
9. **Dark / Light mode toggle** — wire a theme toggle button to the `dark` class on `<html>`.

---

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui primitive components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   └── skeleton.tsx
│   ├── AddTaskForm.tsx   # Controlled form (useState, Select, Input)
│   ├── TaskFilters.tsx   # Filter buttons + search input
│   └── TaskItem.tsx      # Individual task row (Checkbox, Badge, Button)
├── lib/
│   └── utils.ts          # cn() helper
├── App.tsx               # Root component — all hooks live here
├── main.tsx              # React DOM entry point
├── index.css             # Tailwind directives + CSS variables
└── types.ts              # Shared TypeScript types (Task, Priority, FilterType)
```
