"use client";
import { ChangeEvent, useRef, useState } from "react";
import { IconUpload } from "../icons";

export default function UploadButton({
  onUpload,
}: {
  onUpload: (file: File) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function change(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      await onUpload(file);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Image could not upload.",
      );
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label
        className={`button-secondary inline-flex cursor-pointer items-center gap-2 ${
          busy && "cursor-not-allowed"
        }`}
        aria-disabled={busy}
      >
        <IconUpload />
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={change}
          disabled={busy}
        />
      </label>
      {error && <p className="error mt-2">{error}</p>}
    </div>
  );
}
