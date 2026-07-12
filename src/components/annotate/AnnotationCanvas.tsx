/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import type { AnnotatedImage, Shape } from "@/types";
export default function AnnotationCanvas({
  image,
  onSave,
  onDelete,
}: {
  image: AnnotatedImage;
  onSave: (shape: Shape) => Promise<void>;
  onDelete: (index: number) => Promise<void>;
}) {
  const [draft, setDraft] = useState<[number, number][]>([]);
  const [selected, setSelected] = useState<number>();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [error, setError] = useState("");
  function add(event: React.MouseEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const point: [number, number] = [
      ((event.clientX - box.left) * size.width) / box.width,
      ((event.clientY - box.top) * size.height) / box.height,
    ];
    if (
      draft.length > 2 &&
      Math.hypot(point[0] - draft[0][0], point[1] - draft[0][1]) <
        Math.min(size.width, size.height) * 0.04
    ) {
      onSave({ type: "polygon", points: draft })
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
  return (
    <div>
      <div className="relative overflow-hidden rounded-lg bg-charcoal">
        <img
          src={image.image}
          alt="Annotation target"
          onLoad={(event) =>
            setSize({
              width: event.currentTarget.naturalWidth,
              height: event.currentTarget.naturalHeight,
            })
          }
          className="block h-auto w-full"
        />
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full cursor-crosshair"
          onClick={add}
        >
          {image.shapes.map((shape, index) => (
            <polygon
              key={index}
              points={points(shape.points)}
              onClick={(event) => {
                event.stopPropagation();
                setSelected(index);
              }}
              fill={
                selected === index
                  ? "rgba(196,73,31,.25)"
                  : "rgba(79,115,150,.2)"
              }
              stroke={selected === index ? "#c4491f" : "#4f7396"}
              strokeWidth={Math.max(size.width, size.height) / 500}
            />
          ))}
          {draft.length > 0 && (
            <polyline
              points={points(draft)}
              fill="rgba(196,73,31,.15)"
              stroke="#c4491f"
              strokeWidth={Math.max(size.width, size.height) / 500}
            />
          )}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs">
          Click to add vertices. Click near the first point to finish.
        </p>
        {selected !== undefined && (
          <button
            className="button-secondary"
            onClick={() =>
              onDelete(selected)
                .then(() => setSelected(undefined))
                .catch((reason) =>
                  setError(
                    reason instanceof Error
                      ? reason.message
                      : "Shape could not delete.",
                  ),
                )
            }
          >
            Delete selected shape
          </button>
        )}
        {draft.length > 0 && (
          <button className="button-secondary" onClick={() => setDraft([])}>
            Cancel shape
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
