# React Live Coding Test: Task Manager

> A hands-on React challenge for junior/intermediate developers.
>
> **Duration:** 1 hour. Take a few minutes to read the code, then your interviewer will assign challenges from the list below. You are free to use any tools you like: browser, documentation, AI assistants, etc.

![Task Manager Screenshot](https://github.com/user-attachments/assets/94403037-9b70-41c4-b64d-9fcc181bceea)

## Tech Stack

| Tool                | Purpose                                       |
| ------------------- | --------------------------------------------- |
| **React 19**        | UI framework                                  |
| **TypeScript**      | Type safety                                   |
| **Vite**            | Build tool & dev server                       |
| **Tailwind CSS v3** | Utility-first styling                         |
| **shadcn/ui**       | Accessible component library (Radix UI + cva) |
| **Lucide React**    | Icon library                                  |
| **Vitest**          | Unit testing framework                        |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

---

## Key Concepts

This app uses `useState`, `useEffect`, and `useMemo` for state management and derived data. Components are built with shadcn/ui (Radix UI primitives) and styled with Tailwind CSS utility classes. Tasks are persisted to `localStorage`.

Take a few minutes to read through the code before starting the challenges.

---

## Live Coding Challenges

Your interviewer will assign one or more of the following. Read the existing code carefully before you begin.

### 1. Bug hunt (~15 min)

The app has a couple of bugs. Use the app, read the code, and find them. Explain what causes each bug and fix it.

A. The initial tasks defined in the code are never displayed.

B. If we type "React" in the Search input, we should see the initial task with "React" in its name, but it does not appear.

### 2. Task counter in page title (~5 min)

Show the number of active tasks in the browser tab title (e.g. `(3) Task Manager`). The title should update automatically as tasks change.

### 3. "Complete All" toggle (~10 min)

Add a button that marks every active task as completed. If all tasks are already completed, the button should mark them all as active again.

### 4. Edit a task inline (~20 min)

Allow the user to click a task title to rename it. Show an input field on click, and save changes on Enter or blur.

### 5. Write tests (~20 min)

The project includes Vitest and Testing Library. Add meaningful tests for the app's core logic: adding a task, toggling completion, filtering, and search.

### 6. Custom `useTasks` hook (~20 min)

Extract all task state and handlers from `App.tsx` into a reusable `useTasks` hook. The component should only handle rendering.

### 7. Dark / light mode toggle (~15 min)

Wire a theme toggle button that switches between light and dark mode by toggling the `dark` class on `<html>`. Persist the user's choice.

---

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui primitive components
│   ├── AddTaskForm.tsx   # Controlled form (useState, Select, Input)
│   ├── TaskFilters.tsx   # Filter buttons + search input
│   └── TaskItem.tsx      # Individual task row (Checkbox, Badge, Button)
├── lib/
│   └── utils.ts          # cn() helper
├── test/
│   └── setup.ts          # Vitest setup (Testing Library matchers)
├── App.tsx               # Root component
├── App.test.tsx          # Test scaffold
├── main.tsx              # React DOM entry point
├── index.css             # Tailwind directives + CSS variables
└── types.ts              # Shared TypeScript types (Task, Priority, FilterType)
```
