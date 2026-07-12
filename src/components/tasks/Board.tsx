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
}: {
  tasks: Task[];
  onSave: (task: Partial<Task>) => Promise<void>;
  onMove: (id: string, status: TaskStatus) => Promise<void>;
}) {
  const [editing, setEditing] = useState<Task>();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAnvilContext();
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
      {!tasks.length ? (
        <div className="rounded-lg border border-dashed border-ink/30 p-8 text-center">
          No tasks for this day. Add the first task to shape the work.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map(([name, status]) => (
            <Column
              key={status}
              name={name}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              onMove={(id, next) => {
                dispatch({ type: "END_DRAG" });
                onMove(id, next);
              }}
              onEdit={(t) => {
                setEditing(t);
                setOpen(true);
              }}
              onDragStart={(id) => dispatch({ type: "START_DRAG", taskId: id })}
            />
          ))}
        </div>
      )}
      {open && (
        <TaskModal
          task={editing}
          date={state.selectedDate}
          onClose={() => setOpen(false)}
          onSave={onSave}
        />
      )}
    </>
  );
}
