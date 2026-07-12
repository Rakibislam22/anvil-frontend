"use client";
import { useEffect, useState } from "react";
import Board from "@/components/tasks/Board";
import DateSelector from "@/components/tasks/DateSelector";
import { createTask, listTasks, updateTask } from "@/lib/apiClient";
import { useAnvilContext } from "@/context/useAnvilContext";
import type { Task, TaskStatus } from "@/types";
export default function TasksPage() {
  const { state } = useAnvilContext();
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  async function load() {
    try {
      setError("");
      setTasks(await listTasks());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tasks could not load.");
    }
  }
  useEffect(() => {
    if (state.isHydrating) return;
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [state.isHydrating]);
  const tasks = allTasks.filter(
    (task) => task.due_date.slice(0, 10) === state.selectedDate,
  );
  async function save(task: Partial<Task>) {
    // The backend expects a simple "YYYY-MM-DD" string for the date.
    const formattedDate = task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : undefined;
    const payload = {
      title: task.title,
      description: task.description ?? "", // Ensure description is not undefined
      status: task.status ?? "To Do",
      priority: task.priority ?? "Medium",
      due_date: formattedDate,
    };
    try {
      const saved = typeof task.id === "number" // Use explicit check for number
        ? await updateTask(task.id, payload) // Use explicit check for number
        : await createTask(payload);
      setTasks((current) =>
        task.id
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [...current, saved],
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save task.");
    }
  }
  async function move(id: string, status: TaskStatus) {
    const old = allTasks;
    setTasks((current) =>
      current.map((t) => (t.id === Number(id) ? { ...t, status } : t)),
    );
    try {
      await updateTask(Number(id), { status });
    } catch (e) {
      setTasks(old);
      setError(
        e instanceof Error ? e.message : "Task status could not update.",
      );
    }
  }
  return (
    // Render a loading state until the context has rehydrated from localStorage
    state.isHydrating ? <div className="page-shell"><p className="eyebrow">Loading...</p></div> :

      <div className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Daily queue</p>
            <h1 className="page-title">Task board</h1>
          </div>
          <DateSelector />
        </div>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <Board tasks={tasks} onSave={save} onMove={move} />
      </div>
  );
}
