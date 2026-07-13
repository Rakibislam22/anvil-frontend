"use client";

export const ANNOTATION_CLASSES = ["Tumor", "Cyst", "Lesion", "Normal"];

export default function ClassSelector({
    selectedClass,
    onChange,
}: {
    selectedClass: string;
    onChange: (newClass: string) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="class-selector" className="text-sm font-medium">
                Class:
            </label>
            <select
                id="class-selector"
                className="input"
                value={selectedClass}
                onChange={(e) => onChange(e.target.value)}
            >
                {ANNOTATION_CLASSES.map((c) => (
                    <option key={c}>{c}</option>
                ))}
            </select>
        </div>
    );
}