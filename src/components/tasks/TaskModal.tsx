"use client";
import { FormEvent, useState } from "react";
import type { Priority, Task, TaskStatus } from "@/types";
export default function TaskModal({
  task,
  date,
  onClose,
  onSave,
}: {
  task?: Task;
  date: string;
  onClose: () => void;
  onSave: (task: Partial<Task>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Task>>(
    task ?? {
      title: "",
      description: "",
      priority: "Medium",
      due_date: `${date}T00:00:00Z`,
      status: "To Do",
    },
  );
  async function submit(e: FormEvent) {
    e.preventDefault();
    await onSave(form);
    onClose();
  }
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-charcoal/70 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-lg bg-pale-steel p-6 shadow-xl"
      >
        <div className="flex justify-between">
          <h2 className="font-display text-2xl">
            {task ? "Edit task" : "Add task"}
          </h2>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <label>
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-ink/30 bg-parchment p-3"
            />
          </label>
          <label>
            Priority
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Priority })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
          <label>
            Due date
            <input
              type="datetime-local"
              value={form.due_date?.slice(0, 16)}
              onChange={(e) =>
                setForm({
                  ...form,
                  due_date: new Date(e.target.value).toISOString(),
                })
              }
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as TaskStatus })
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>
        </div>
        <button className="button-primary mt-6 w-full">Save task</button>
      </form>
    </div>
  );
}
