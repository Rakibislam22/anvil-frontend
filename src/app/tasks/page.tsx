"use client";
import { useEffect, useState } from "react";
import Board from "@/components/tasks/Board";
import DateSelector from "@/components/tasks/DateSelector";
import RequireAuth from "@/components/auth/RequireAuth";
import { createTask, deleteTask, listTasks, updateTask } from "@/lib/apiClient";
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
    const payload = {
      title: task.title,
      description: task.description ?? "",
      status: task.status ?? "To Do",
      priority: task.priority ?? "Medium",
      due_date: task.due_date,
      tags: task.tags ?? "",
    };
    try {
      const saved =
        typeof task.id === "number"
          ? await updateTask(task.id, payload)
          : await createTask(payload);
      setTasks((current) =>
        task.id
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [...current, saved],
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not save task.";
      setError(message);
      throw new Error(message);
    }
  }
  async function move(id: number, status: TaskStatus) {
    const previous = allTasks;
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
    try {
      await updateTask(id, { status });
    } catch (e) {
      setTasks(previous);
      const message =
        e instanceof Error ? e.message : "Task status could not update.";
      setError(message);
    }
  }
  async function remove(id: number) {
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Task could not delete.";
      setError(message);
      throw new Error(message);
    }
  }
  return (
    <RequireAuth>
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
        <Board tasks={tasks} onSave={save} onMove={move} onDelete={remove} />
      </div>
    </RequireAuth>
  );
}
