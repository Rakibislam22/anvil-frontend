"use client";
import type { Task, TaskStatus } from "@/types";
import TaskCard from "./TaskCard";
export default function Column({
  name,
  status,
  tasks,
  onMove,
  onEdit,
  onDragStart,
}: {
  name: string;
  status: TaskStatus;
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (t: Task) => void;
  onDragStart: (id: string) => void;
}) {
  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onMove(e.dataTransfer.getData("text/plain"), status)}
      className="min-h-72 rounded-lg bg-ink/5 p-3"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display">{name}</h2>
        <span className="font-mono text-xs">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.length ? (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onEdit={onEdit}
              onDragStart={onDragStart}
            />
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-ink/20 p-4 text-sm">
            No tasks here yet.
          </p>
        )}
      </div>
    </section>
  );
}
