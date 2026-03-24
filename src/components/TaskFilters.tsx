import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { FilterType } from "@/types"

interface TaskFiltersProps {
  filter: FilterType
  search: string
  onFilterChange: (filter: FilterType) => void
  onSearchChange: (search: string) => void
  activeCount: number
  completedCount: number
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
]

export function TaskFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
  activeCount,
  completedCount,
}: TaskFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex gap-1">
        {filters.map(({ value, label }) => (
          <Button
            key={value}
            variant={filter === value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(value)}
            className={cn("flex-1 sm:flex-none")}
          >
            {label}
            <span className="ml-1 text-xs opacity-70">
              {value === "active"
                ? activeCount
                : value === "completed"
                ? completedCount
                : activeCount + completedCount}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
