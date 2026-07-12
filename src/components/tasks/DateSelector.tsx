"use client";
import { useAnvilContext } from "@/context/useAnvilContext";
export default function DateSelector() {
  const { state, dispatch } = useAnvilContext();
  return (
    <label className="font-mono text-xs uppercase tracking-wide">
      Board date
      <input
        aria-label="Board date"
        className="mt-1"
        type="date"
        value={state.selectedDate}
        onChange={(event) =>
          dispatch({ type: "SET_SELECTED_DATE", date: event.target.value })
        }
      />
    </label>
  );
}
