import { useState } from "react";

export default function ProjectColorPicker({ onColorSelect }) {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");

  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#F97316", // Orange
    "#22D3EE", // Cyan
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    if (onColorSelect) onColorSelect(color); // send color to parent form
  };

  return (
    <div>
      <h1 className="text-sm font-bold text-gray-700 mb-2">Project Color</h1>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleColorClick(color)}
            className={`w-8 h-8 rounded-full border-2 transition 
              ${selectedColor === color ? "border-black scale-110" : "border-transparent"}
            `}
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
}
