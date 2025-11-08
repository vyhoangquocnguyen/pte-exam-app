"use client";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  onClear: () => void;
}

import React from "react";

const AudioPlayer = ({ audioUrl, onClear }: AudioPlayerProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-secondary/20">
      <audio src={audioUrl} controls className="flex-glow h-10" />
      <Button variant="ghost" size="icon" onClick={onClear} aria-label="Delete Recording">
        <Trash2 className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  );
};

export default AudioPlayer;
