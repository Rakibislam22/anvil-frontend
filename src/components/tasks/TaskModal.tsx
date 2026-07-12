"use client";

import { FormEvent, useState } from "react";
import type { Priority, Task, TaskStatus } from "@/types";

export default function TaskModal({
  task,
  date,
  onClose,
  onSave,
  onDelete,
}: {
  task?: Task;
  date: string;
  onClose: () => void;
  onSave: (task: Partial<Task>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Task>>(
    task ?? {
      title: "",
      description: "",
      priority: "Medium",
      due_date: date,
      status: "To Do",
      tags: "",
    },
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Task could not save.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function remove() {
    if (!task) return;
    setSaving(true);
    setError("");
    try {
      await onDelete(task.id);
      onClose();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Task could not delete.",
      );
    } finally {
      setSaving(false);
    }
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
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-ink/30 bg-parchment p-3"
            />
          </label>
          <label>
            Priority
            <select
              value={form.priority}
              onChange={(event) =>
                setForm({ ...form, priority: event.target.value as Priority })
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
              type="date"
              value={form.due_date?.slice(0, 10)}
              onChange={(event) =>
                setForm({ ...form, due_date: event.target.value })
              }
            />
          </label>
          <label>
            Tags
            <input
              value={form.tags ?? ""}
              onChange={(event) =>
                setForm({ ...form, tags: event.target.value })
              }
              placeholder="design, urgent"
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as TaskStatus })
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>
        </div>
        {error && (
          <p role="alert" className="error mt-4">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <button className="button-primary flex-1" disabled={saving}>
            {saving ? "Saving…" : "Save task"}
          </button>
          {task && (
            <button
              type="button"
              className="button-secondary"
              disabled={saving}
              onClick={remove}
            >
              Delete task
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
