"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AnnotationCanvas, { AnnotationCanvasRef } from "@/components/annotate/AnnotationCanvas";
import RequireAuth from "@/components/auth/RequireAuth";
import ClassSelector, {
  ANNOTATION_CLASSES,
} from "@/components/annotate/ClassSelector";
import ImageFilmstrip from "@/components/annotate/ImageFilmstrip";
import UploadButton from "@/components/annotate/UploadButton";
import {
  listAnnotations,
  createAnnotation,
  uploadImage,
  getAnnotationsForImage,
  getAnnotation,
  updateAnnotation,
  ApiError,
} from "@/lib/apiClient";
import type { Annotation, Shape } from "@/types";
import { useAnvilContext } from "@/context/useAnvilContext";
import {
  IconArrowLeft,
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconPencil,
  IconTrash,
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
} from "@/components/icons";

export default function AnnotatePage() {
  const { state } = useAnvilContext();
  const [images, setImages] = useState<Annotation[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const [selectedClass, setSelectedClass] = useState(ANNOTATION_CLASSES[0]);
  const [editMode, setEditMode] = useState(false);
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  const saveTimeout = useRef<NodeJS.Timeout>();
  const canvasRef = useRef<AnnotationCanvasRef>(null);
  const selected = images.find((image) => image.id === selectedId) ?? images[0];

  const selectedIndex = selected ? images.indexOf(selected) : -1;
  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < images.length - 1;

  const load = useCallback(async () => {
    if (state.isHydrating) return;
    setLoading(true);
    try {
      // 1. Fetch all image uploads, which contain the image URL
      const imageUploads = await listAnnotations(); // This should call /api/image-uploads/

      // 2. Fetch all annotations for these images
      const annotationsByImage = await Promise.all(
        imageUploads.map(img => getAnnotationsForImage(img.id).catch(() => []))
      );

      // 3. Combine them: use image data from imageUploads and shape data from annotations
      const combinedImages = imageUploads.map(imageUpload => {
        const annotations = annotationsByImage.find(annList => annList[0]?.image === imageUpload.id) || [];
        const allShapes = annotations.flatMap(ann => {
          try {
            return typeof ann.shape_data === 'string' ? JSON.parse(ann.shape_data) : (ann.shapes || []);
          } catch { return []; }
        });
        return { ...imageUpload, shapes: allShapes };
      });

      setImages(combinedImages);
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
    const { id: imageId } = await uploadImage(file);
    const added = await createAnnotation(imageId, []);
    setImages((current) => [...current, { ...added, shapes: added.shapes ?? [] }]);
    setSelectedId(added.id);
  }

  async function patch(shapes: Shape[]) {
    if (!selected) return;
    setSaving("saving");
    clearTimeout(saveTimeout.current);
    try {
      const updated = await updateAnnotation(selected.id, { shapes: shapes });
      setImages(current =>
        current.map(image =>
          image.id === updated.id ? { ...updated, shapes: updated.shapes ?? [] } : image,
        ),
      );
      setSaving("saved");
      saveTimeout.current = setTimeout(() => setSaving("idle"), 2000);
    } catch (err) {
      setError("Could not save annotations.");
      setSaving("idle");
    }
  }

  function selectPrevious() {
    if (!canGoPrev) return;
    setSelectedId(images[selectedIndex - 1].id);
  }

  function selectNext() {
    if (!canGoNext) return;
    setSelectedId(images[selectedIndex + 1].id);
  }

  return (
    <RequireAuth>
      <div className="page-shell overflow-x-hidden ">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Visual feedback</p>
            <h1 className="page-title">Annotation tool</h1>
          </div>
          <div className="flex items-center">
            <UploadButton onUpload={upload} />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {loading && <p className="eyebrow">Loading...</p>}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button className="button-secondary" onClick={selectPrevious} disabled={!canGoPrev}>
                Previous
              </button>
              {selected && (
                <span className="font-mono text-sm text-ink/60">
                  {selectedIndex + 1} / {images.length}
                </span>
              )}
              <button className="button-secondary" onClick={selectNext} disabled={!canGoNext}>
                Next
              </button>
            </div>

            <div className="h-6 w-px bg-ink/10" />

            {/* Canvas & Annotation Tools */}
            <div className="flex items-center gap-2">
              <button
                className={editMode ? "button-primary" : "button-secondary"}
                onClick={() => setEditMode(!editMode)}
              >
                Edit
              </button>
              <button
                className="button-secondary"
                onClick={() => setAnnotationsVisible(!annotationsVisible)}
              >
                {annotationsVisible ? "Hide" : "Show"}
              </button>
              <button className="button-secondary" onClick={() => canvasRef.current?.zoomIn()} aria-label="Zoom In" >
                <IconZoomIn />
              </button>
              <button className="button-secondary" onClick={() => canvasRef.current?.zoomOut()} aria-label="Zoom Out" >
                <IconZoomOut />
              </button>
              <button className="button-secondary" onClick={() => canvasRef.current?.resetZoom()} aria-label="Reset Zoom" >
                <IconZoomReset />
              </button>
            </div>

            <div className="flex-1" />

            <ClassSelector
              selectedClass={selectedClass}
              onChange={setSelectedClass}
            />
          </div>
        </div>
        {selected ? (
          <div className="mx-auto max-w-5xl">
            <AnnotationCanvas
              ref={canvasRef}
              image={selected}
              editMode={editMode}
              visible={annotationsVisible}
              onSave={(shapes) => patch(shapes)}
            />
          </div>
        ) : (
          <div className="rounded-lg bg-ink/5 p-10 text-center">
            Choose an image to inspect its annotations.
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
