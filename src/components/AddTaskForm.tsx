import { useState, type KeyboardEvent } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Priority } from "@/types"

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority) => void
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")

  const handleSubmit = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setTitle("")
    setPriority("medium")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 space-y-1">
          <Label htmlFor="task-input">New task</Label>
          <Input
            id="task-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="sm:w-36 space-y-1">
          <Label htmlFor="priority-select">Priority</Label>
          <Select
            value={priority}
            onValueChange={(v) => setPriority(v as Priority)}
          >
            <SelectTrigger id="priority-select">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">🟢 Low</SelectItem>
              <SelectItem value="medium">🟡 Medium</SelectItem>
              <SelectItem value="high">🔴 High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleSubmit} className="w-full sm:w-auto" disabled={!title.trim()}>
        <Plus className="h-4 w-4" />
        Add Task
      </Button>
    </div>
  )
}
