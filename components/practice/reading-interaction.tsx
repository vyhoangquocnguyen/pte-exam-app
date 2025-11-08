"use client";

import { useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import ReorderParagraphs from "./reorder-paragraphs"; // UI Component
import SubmitButton from "./submit-button"; // Reusable component

interface ParagraphItem {
  id: string;
  content: string;
}

interface ReadingInteractionProps {
  exerciseId: string;
  initialItems: ParagraphItem[];
}

// Utility function to reorder the list (can live here or as a lib function)
const reorder = (list: ParagraphItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function ReadingInteraction({ exerciseId, initialItems }: ReadingInteractionProps) {
  // ✅ STATE LOGIC HERE
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);

    setItems(newItems);
    // The final order is available in newItems.map(item => item.id)
  };

  return (
    <div className="space-y-6">
      <ReorderParagraphs
        items={items} // Pass current state down to the UI
        onDragEnd={onDragEnd} // Pass the state update handler to the UI
      />

      <div className="flex justify-end mt-6">
        <SubmitButton
          exerciseId={exerciseId}
          // Future: userResponse={items.map(item => item.id)}
        />
      </div>
    </div>
  );
}
