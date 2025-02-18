import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, title, editIcon, deleteIcon }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="topics-row">
      {/* Fixed row number (not draggable) */}
      <div className="topic-number">{id}</div>

      {/* Draggable content (topic name and icons) */}
      <div
        {...attributes}
        {...listeners}
        className="topics-row-one"
      >
        <input type="text" value={title} readOnly className="topic-name" />
        <div className="topic-actions">
          <img src={editIcon} alt="edit" className="draggable-icon" />
          <img src={deleteIcon} alt="delete" className="draggable-icon" />
        </div>
      </div>
    </div>
  );
};
