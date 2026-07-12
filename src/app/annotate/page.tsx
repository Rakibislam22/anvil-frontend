"use client";

import { useEffect, useState, useCallback } from "react";
import AnnotationCanvas from "@/components/annotate/AnnotationCanvas";
import RequireAuth from "@/components/auth/RequireAuth";
import ImageFilmstrip from "@/components/annotate/ImageFilmstrip";
import UploadButton from "@/components/annotate/UploadButton";
import {
  listAnnotations,
  createAnnotation,
  updateAnnotation,
  ApiError,
} from "@/lib/apiClient";
import type { Annotation, Shape } from "@/types";
import { useAnvilContext } from "@/context/useAnvilContext";

export default function AnnotatePage() {
  const { state } = useAnvilContext();
  const [images, setImages] = useState<Annotation[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const selected = images.find((image) => image.id === selectedId) ?? images[0];

  const load = useCallback(async () => {
    if (state.isHydrating) return;
    setLoading(true);
    try {
      setImages(await listAnnotations());
      setError("");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Annotations could not load.",
      );
    } finally {
      setLoading(false);
    }
  }, [state.isHydrating]);

  useEffect(() => {
    void load();
  }, [load]);

  async function upload(file: File) {
    const added = await createAnnotation(file, []);
    setImages((current) => [...current, added]);
    setSelectedId(added.id);
  }

  async function patch(shapes: Shape[]) {
    if (!selected) return;
    const updated = await updateAnnotation(selected.id, { shapes });
    setImages((current) =>
      current.map((image) => (image.id === updated.id ? updated : image)),
    );
  }

  return (
    <RequireAuth>
      <div className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Visual feedback</p>
            <h1 className="page-title">Annotation tool</h1>
          </div>
          <UploadButton onUpload={upload} />
        </div>
        {error && <p className="error">{error}</p>}
        {loading && <p className="eyebrow">Loading...</p>}
        <ImageFilmstrip
          images={images}
          selected={selected?.id}
          onSelect={(image) => setSelectedId(image.id)}
        />
        {selected ? (
          <AnnotationCanvas
            image={selected}
            onSave={(shape) => patch([...selected.shapes, shape])}
            onDelete={(index) =>
              patch(
                selected.shapes.filter((_, shapeIndex) => shapeIndex !== index),
              )
            }
          />
        ) : (
          <div className="rounded-lg bg-ink/5 p-10 text-center">
            Choose an image to inspect its annotations.
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
