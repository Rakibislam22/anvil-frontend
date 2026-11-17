/* eslint-disable @next/next/no-img-element */
"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Annotation, Shape } from "@/types";

export interface AnnotationCanvasRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const AnnotationCanvas = forwardRef<
  AnnotationCanvasRef,
  {
    image: Annotation & { shapes: Shape[]; image_url: string };
    onSave: (shapes: Shape[]) => Promise<void>;
    editMode: boolean;
    visible: boolean;
  }
>(function AnnotationCanvas({ image, onSave, editMode, visible }, ref) {
  const [draft, setDraft] = useState<[number, number][]>([]);
  const [selected, setSelected] = useState<number>();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setDraft([]);
    setSelected(undefined);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [image.id]);

  const [error, setError] = useState("");

  function add(event: React.MouseEvent<SVGSVGElement>) {
    if (!editMode) return;
    const box = event.currentTarget.getBoundingClientRect();
    const point: [number, number] = [
      (((event.clientX - box.left) / box.width) * size.width) / zoom -
      pan.x / zoom,
      (((event.clientY - box.top) / box.height) * size.height) / zoom -
      pan.y / zoom,
    ];

    // Check if user clicked near the first point to close the polygon
    if (
      draft.length > 2 &&
      Math.hypot(point[0] - draft[0][0], point[1] - draft[0][1]) <
      Math.min(size.width, size.height) * 0.04
    ) {
      const newShape = { type: "polygon" as const, points: draft };

      // Optimistically update the UI
      image.shapes.push(newShape);
      onSave(image.shapes)
        .then(() => setDraft([]))
        .catch((reason) =>
          setError(
            reason instanceof Error ? reason.message : "Shape could not save.",
          ),
        );
      return;
    }
    setDraft([...draft, point]);
  }

  const points = (value: [number, number][]) =>
    value.map(([x, y]) => `${x},${y}`).join(" ");

  useImperativeHandle(ref, () => ({
    zoomIn: () => setZoom((z) => Math.min(z * 1.2, 5)),
    zoomOut: () => setZoom((z) => Math.max(z / 1.2, 0.2)),
    resetZoom: () => {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    },
  }));

  return (
    <div className="overflow-hidden">
      {/* Container with relative positioning and hidden overflow to prevent layout expansion */}
      <div className="relative h-[600px] rounded-lg bg-charcoal overflow-hidden">
        <img
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: "top left",
          }}
          src={image.image_url}
          alt="Annotation target"
          onLoad={(event) =>
            setSize({
              width: event.currentTarget.naturalWidth,
              height: event.currentTarget.naturalHeight,
            })
          }
          className="block h-full w-full object-contain"
        />
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          className={`absolute inset-0 h-full w-full ${editMode ? "cursor-crosshair" : "cursor-default"}`}
          onClick={add}
        >
          <g transform={`scale(${zoom}) translate(${pan.x}, ${pan.y})`}>
            {visible && (
              <>
                {image.shapes.map((shape, index) => (
                  <polygon
                    key={index}
                    points={points(shape.points)}
                    onClick={(event) => {
                      if (!editMode) return;
                      event.stopPropagation();
                      setSelected(index);
                    }}
                    fill={
                      selected === index
                        ? "rgba(139, 92, 246, 0.25)"
                        : "rgba(167, 139, 250, 0.2)"
                    }
                    stroke={selected === index ? "#7c3aed" : "#a78bfa"}
                    strokeWidth={Math.max(size.width, size.height) / 250 / zoom}
                  />
                ))}
                {draft.length > 0 && (
                  <polyline
                    points={points(draft)}
                    fill="rgba(139, 92, 246, 0.15)"
                    stroke="#7c3aed"
                    strokeWidth={Math.max(size.width, size.height) / 250 / zoom}
                  />
                )}
                {draft.map(([x, y], i) => (
                  <circle
                    key={`draft-point-${i}`}
                    cx={x}
                    cy={y}
                    r={Math.max(size.width, size.height) / 150 / zoom}
                    fill="#7c3aed"
                  />
                ))}
              </>
            )}
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs">
          Click to add vertices. Click near the first point to finish.
        </p>
        {editMode && draft.length > 0 && (
          <button className="button-secondary" onClick={() => setDraft([])}>
            Cancel shape
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

export default AnnotationCanvas;
