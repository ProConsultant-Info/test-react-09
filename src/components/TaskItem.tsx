import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Task } from "@/types"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const priorityConfig = {
  low: { label: "Low", variant: "secondary" as const, icon: "🟢" },
  medium: { label: "Medium", variant: "outline" as const, icon: "🟡" },
  high: { label: "High", variant: "destructive" as const, icon: "🔴" },
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { label, variant, icon } = priorityConfig[task.priority]

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3 transition-colors",
        task.completed
          ? "bg-muted/40 border-muted"
          : "bg-card hover:bg-accent/20"
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          "flex-1 cursor-pointer text-sm",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </label>
      <Badge variant={variant} className="hidden sm:inline-flex shrink-0">
        {icon} {label}
      </Badge>
      <span className="sm:hidden text-xs shrink-0">{icon}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.title}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
