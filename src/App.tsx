import { useState, useEffect, useMemo } from "react"
import { CheckSquare, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { AddTaskForm } from "@/components/AddTaskForm"
import { TaskItem } from "@/components/TaskItem"
import { TaskFilters } from "@/components/TaskFilters"
import type { Task, FilterType, Priority } from "@/types"

const STORAGE_KEY = "react-tasks"

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Learn React hooks (useState, useEffect, useMemo)",
    completed: false,
    priority: "high",
    createdAt: Date.now() - 3000,
  },
  {
    id: "2",
    title: "Build a UI with shadcn/ui components",
    completed: false,
    priority: "high",
    createdAt: Date.now() - 2000,
  },
  {
    id: "3",
    title: "Style the application with Tailwind CSS",
    completed: true,
    priority: "medium",
    createdAt: Date.now() - 1000,
  },
  {
    id: "4",
    title: "Write clean, readable TypeScript code",
    completed: false,
    priority: "medium",
    createdAt: Date.now(),
  },
]

function App() {
  // ─── State ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // ─── useEffect: Load tasks from localStorage on mount ───────────────────────
  useEffect(() => {
    // Simulate an async data-load (like fetching from an API)
    const timer = setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY)
      setTasks(stored ? (JSON.parse(stored) as Task[]) : INITIAL_TASKS)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // ─── useEffect: Persist tasks to localStorage whenever they change ───────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // ─── useMemo: Derive the visible task list without re-computing on every render
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "active") return !task.completed
        if (filter === "completed") return task.completed
        return true
      })
      .filter((task) =>
        task.title.toLowerCase().includes(search)
      )
      .sort((a, b) => {
        // Sort by priority (high > medium > low) then by creation time (newest first)
        const priorityOrder: Record<Priority, number> = {
          high: 0,
          medium: 1,
          low: 2,
        }
        const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
        return pDiff !== 0 ? pDiff : b.createdAt - a.createdAt
      })
  }, [tasks, filter, search])

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  )
  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  )

  // ─── Event handlers ─────────────────────────────────────────────────────────
  const handleAddTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          </div>
          <p className="text-muted-foreground">
            A React live-coding exercise — hooks, shadcn/ui &amp; Tailwind CSS
          </p>
        </div>

        {/* Main card */}
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>
              {loading
                ? "Loading…"
                : `${activeCount} task${activeCount !== 1 ? "s" : ""} remaining`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add task form */}
            <AddTaskForm onAdd={handleAddTask} />

            <Separator />

            {/* Filters */}
            <TaskFilters
              filter={filter}
              search={search}
              onFilterChange={setFilter}
              onSearchChange={setSearch}
              activeCount={activeCount}
              completedCount={completedCount}
            />

            {/* Task list */}
            <div className="space-y-2">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {search
                    ? `No tasks matching "${search}"`
                    : filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "active"
                    ? "All tasks completed! 🎉"
                    : "No tasks yet — add one above!"}
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Footer actions */}
            {!loading && completedCount > 0 && (
              <>
                <Separator />
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={handleClearCompleted}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear completed ({completedCount})
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tech stack note */}
        <p className="text-center text-xs text-muted-foreground">
          Built with React 19 · TypeScript · Vite · shadcn/ui · Tailwind CSS
        </p>
      </div>
    </div>
  )
}

export default App
