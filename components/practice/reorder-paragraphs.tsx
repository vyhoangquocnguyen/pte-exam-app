"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface ParagraphItem {
  id: string;
  content: string;
}

interface ReorderParagraphsProps {
  items: ParagraphItem[]; // Receives the current item order
  onDragEnd: (result: DropResult) => void; // Exposes the drag completion event
}

export default function ReorderParagraphs({ items, onDragEnd }: ReorderParagraphsProps) {
  return (
    // This component only focuses on the DND visual logic
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="p-4">
        <Droppable droppableId="droppable-list">
          {(droppableProvided) => (
            <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="space-y-3">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, snapshot) => (
                    <Card
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      className={`flex flex-row items-start p-3 shadow-md transition-all 
                        ${
                          snapshot.isDragging
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-background hover:shadow-lg"
                        }`}>
                      <div
                        {...draggableProvided.dragHandleProps}
                        className="mr-3 p-1 cursor-grab text-muted-foreground hover:text-primary transition-colors">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <CardContent className="p-0 text-sm flex-1">
                        <span className="font-semibold mr-2">{index + 1}.</span>
                        {item.content}
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </DragDropContext>
  );
}
