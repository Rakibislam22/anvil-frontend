"use client";
import { ChangeEvent, useState } from "react";
export default function UploadButton({
  onUpload,
}: {
  onUpload: (file: File) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
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
      <label className="button-primary inline-block cursor-pointer">
        {busy ? "Uploading…" : "Upload image"}
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          onChange={change}
          disabled={busy}
        />
      </label>
      {error && <p className="mt-2 text-sm text-ember">{error}</p>}
    </div>
  );
}
