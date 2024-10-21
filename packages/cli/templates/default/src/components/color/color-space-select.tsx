import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectColorSpaceProps {
  onChange?: (value: string) => void;
}

export function SelectColorSpace({ onChange }: SelectColorSpaceProps) {
  const [selectedValue, setSelectedValue] = useState('RGB');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <Select
      value={selectedValue}
      onValueChange={handleChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="RGB" aria-label='Selected Value ' />
      </SelectTrigger>
      <SelectContent className="w-[50px]">
        {['HEX', 'RGB', 'HSL', 'HSB'].map((value) => (
          <SelectItem aria-label="Select item" key={value} value={value} className=" cursor-pointer flex items-center justify-center ">
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
