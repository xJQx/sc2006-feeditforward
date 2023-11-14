import React from "react";
import Slider from "@mui/material/Slider";

interface FormSliderProps {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const FormSlider = (props: FormSliderProps) => {
  const { label, value, setValue } = props;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className="w-full my-4">
      <div>{label}</div>
      <div className="flex items-center gap-2 w-full">
        <div className="w-full">
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={0.1}
            min={0.0}
            max={5.0}
            valueLabelDisplay="auto"
            color="success"
            className="!py-1"
          />
        </div>
        <div>
          <div className="flex gap-1">
            <div>{value.toFixed(1)}</div>⭐
          </div>
        </div>
      </div>
    </div>
  );
};
