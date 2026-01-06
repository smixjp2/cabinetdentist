"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ToothProps extends React.SVGProps<SVGPathElement> {
  toothId: number;
  onToothClick: (toothId: number) => void;
  isSelected: boolean;
}

const Tooth: React.FC<ToothProps> = ({ toothId, onToothClick, isSelected, ...props }) => {
  return (
    <path
      {...props}
      data-tooth-id={toothId}
      onClick={() => onToothClick(toothId)}
      className={cn(
        "cursor-pointer fill-white stroke-gray-400 transition-all hover:fill-primary/20",
        isSelected && "fill-primary stroke-primary-foreground"
      )}
    />
  );
};

const teethPaths = {
    // Upper Right
    18: "M 10 30 C 10 20, 30 20, 30 30 L 30 40 C 30 50, 10 50, 10 40 Z",
    17: "M 35 28 C 35 18, 55 18, 55 28 L 55 42 C 55 52, 35 52, 35 42 Z",
    16: "M 60 26 C 60 16, 80 16, 80 26 L 80 44 C 80 54, 60 54, 60 44 Z",
    15: "M 85 24 C 85 14, 105 14, 105 24 L 105 46 C 105 56, 85 56, 85 46 Z",
    14: "M 110 22 C 110 12, 130 12, 130 22 L 130 48 C 130 58, 110 58, 110 48 Z",
    13: "M 135 20 C 135 10, 155 10, 155 20 L 155 50 C 155 60, 135 60, 135 50 Z",
    12: "M 160 18 C 160 8, 180 8, 180 18 L 180 52 C 180 62, 160 62, 160 52 Z",
    11: "M 185 16 C 185 6, 205 6, 205 16 L 205 54 C 205 64, 185 64, 185 54 Z",
    // Upper Left
    21: "M 220 16 C 220 6, 240 6, 240 16 L 240 54 C 240 64, 220 64, 220 54 Z",
    22: "M 245 18 C 245 8, 265 8, 265 18 L 265 52 C 265 62, 245 62, 245 52 Z",
    23: "M 270 20 C 270 10, 290 10, 290 20 L 290 50 C 290 60, 270 60, 270 50 Z",
    24: "M 295 22 C 295 12, 315 12, 315 22 L 315 48 C 315 58, 295 58, 295 48 Z",
    25: "M 320 24 C 320 14, 340 14, 340 24 L 340 46 C 340 56, 320 56, 320 46 Z",
    26: "M 345 26 C 345 16, 365 16, 365 26 L 365 44 C 365 54, 345 54, 345 44 Z",
    27: "M 370 28 C 370 18, 390 18, 390 28 L 390 42 C 390 52, 370 52, 370 42 Z",
    28: "M 395 30 C 395 20, 415 20, 415 30 L 415 40 C 415 50, 395 50, 395 40 Z",
    // Lower Left
    31: "M 220 116 C 220 106, 240 106, 240 116 L 240 154 C 240 164, 220 164, 220 154 Z",
    32: "M 245 118 C 245 108, 265 108, 265 118 L 265 152 C 265 162, 245 162, 245 152 Z",
    33: "M 270 120 C 270 110, 290 110, 290 120 L 290 150 C 290 160, 270 160, 270 150 Z",
    34: "M 295 122 C 295 112, 315 112, 315 122 L 315 148 C 315 158, 295 158, 295 148 Z",
    35: "M 320 124 C 320 114, 340 114, 340 124 L 340 146 C 340 156, 320 156, 320 146 Z",
    36: "M 345 126 C 345 116, 365 116, 365 126 L 365 144 C 365 154, 345 154, 345 144 Z",
    37: "M 370 128 C 370 118, 390 118, 390 128 L 390 142 C 390 152, 370 152, 370 142 Z",
    38: "M 395 130 C 395 120, 415 120, 415 130 L 415 140 C 415 150, 395 150, 395 140 Z",
    // Lower Right
    48: "M 10 130 C 10 120, 30 120, 30 130 L 30 140 C 30 150, 10 150, 10 140 Z",
    47: "M 35 128 C 35 118, 55 118, 55 128 L 55 142 C 55 152, 35 152, 35 142 Z",
    46: "M 60 126 C 60 116, 80 116, 80 126 L 80 144 C 80 154, 60 154, 60 144 Z",
    45: "M 85 124 C 85 114, 105 114, 105 124 L 105 146 C 105 156, 85 156, 85 146 Z",
    44: "M 110 122 C 110 112, 130 112, 130 122 L 130 148 C 130 158, 110 158, 110 148 Z",
    43: "M 135 120 C 135 110, 155 110, 155 120 L 155 150 C 155 160, 135 160, 135 150 Z",
    42: "M 160 118 C 160 108, 180 108, 180 118 L 180 152 C 180 162, 160 162, 160 152 Z",
    41: "M 185 116 C 185 106, 205 106, 205 116 L 205 154 C 205 164, 185 164, 185 154 Z",
};
  
const toothNumbers = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38
];

export default function DentalChart() {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  const handleToothClick = (toothId: number) => {
    setSelectedTooth(toothId);
  };
  
  return (
    <div className='flex justify-center items-center'>
      <Popover open={selectedTooth !== null} onOpenChange={(isOpen) => !isOpen && setSelectedTooth(null)}>
        <PopoverTrigger asChild>
            <svg viewBox="0 0 425 170" className="max-w-full h-auto">
                <rect width="425" height="170" fill="transparent"/>
                {toothNumbers.map(num => (
                    <Tooth
                        key={num}
                        toothId={num}
                        d={teethPaths[num as keyof typeof teethPaths]}
                        onToothClick={handleToothClick}
                        isSelected={selectedTooth === num}
                    />
                ))}
            </svg>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dent n° {selectedTooth}</h4>
              <p className="text-sm text-muted-foreground">
                Ajouter un nouveau soin.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="procedure">Soin</Label>
                <Input id="procedure" defaultValue="Carie" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes cliniques..." className="col-span-2" />
              </div>
            </div>
             <Button>Enregistrer le soin</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
