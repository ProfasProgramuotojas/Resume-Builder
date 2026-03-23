import { useState } from "react";

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
};

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  label,
  onChange,
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = onChange ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div style={{ width: "100%" }}>
      {label && <label>{label}</label>}
      <input
        className="accent-blue-200"
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
    </div>
  );
};
