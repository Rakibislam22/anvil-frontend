"use client";
import type { Task } from "@/types";
export default function TaskCard({
  task,
  onEdit,
  onDragStart,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDragStart: (id: string) => void;
}) {
  return (
    <button
      draggable
      onDragStart={() => onDragStart(task.id)}
      onClick={() => onEdit(task)}
      className="block w-full rounded-lg border border-ink/15 bg-parchment p-4 text-left shadow-sm transition hover:-translate-y-0.5"
    >
      <div className="flex justify-between gap-3">
        <h3 className="font-display text-base">{task.title}</h3>
        <span className="font-mono text-[10px] uppercase text-ember">
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="mt-2 text-sm text-ink/70">{task.description}</p>
      )}
      <p className="mt-4 font-mono text-[10px] text-steel">
        {new Date(task.due_date).toLocaleDateString()}
      </p>
    </button>
  );
}
