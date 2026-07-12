"use client";
import { useState } from "react";
import type { Task, TaskStatus } from "@/types";
import { useAnvilContext } from "@/context/useAnvilContext";
import Column from "./Column";
import TaskModal from "./TaskModal";
const columns: [string, TaskStatus][] = [
  ["To Do", "To Do"],
  ["In Progress", "In Progress"],
  ["Done", "Done"],
];
export default function Board({
  tasks,
  onSave,
  onMove,
  onDelete,
}: {
  tasks: Task[];
  onSave: (task: Partial<Task>) => Promise<void>;
  onMove: (id: number, status: TaskStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState<Task>();
  const [open, setOpen] = useState(false);
  const { state } = useAnvilContext();

  return (
    <>
      <div className="flex justify-end">
        <button
          className="button-primary"
          onClick={() => {
            setEditing(undefined);
            setOpen(true);
          }}
        >
          + Add task
        </button>
      </div>
      <div className="grid flex-1 gap-4 overflow-x-auto lg:grid-cols-3">
        {columns.map(([name, status]) => (
          <Column
            key={status}
            name={name}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onMove={onMove}
            onEdit={(t) => {
              setEditing(t);
              setOpen(true);
            }}
          />
        ))}
      </div>
      {open && (
        <TaskModal
          task={editing}
          date={state.selectedDate}
          onClose={() => setOpen(false)}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
