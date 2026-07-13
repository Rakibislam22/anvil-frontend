"use client";
import type { AnnotatedImage } from "@/types";

export default function ImageFilmstrip({
  images,
  selected,
  onSelect,
}: {
  images: AnnotatedImage[];
  selected: string | undefined;
  onSelect: (image: AnnotatedImage) => void;
}) {
  if (!images.length)
    return (
      <p className="rounded-lg border border-dashed border-ink/30 p-5 text-sm">
        No images yet. Upload an image to start marking it up.
      </p>
    );

  return (
    // Added min-w-0 to prevent flex item overflow
    <div className="flex gap-3 overflow-x-auto pb-2 min-w-0">
      {images.map((image) => (
        <button
          key={image.id}
          onClick={() => onSelect(image)}
          // shrink-0 prevents the button from getting squished
          className={`shrink-0 rounded-lg border-2 p-1 ${
            selected === image.id ? "border-ember" : "border-transparent"
          }`}
        >
          <img
            className="h-20 w-28 rounded object-cover block"
            src={image.image}
            alt="Uploaded annotation"
          />
        </button>
      ))}
    </div>
  );
}
