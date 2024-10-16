import { Color, ColorPicker as ColorPickerAria, ColorPickerProps, parseColor } from "react-aria-components"
import { ColorEye } from "./color-eye"
import { ColorArea } from "./color-area"
import { ColorSlider } from "./color-slider"
import { HEXColorField, HSLColorField, RGBColorField, HSBColorField } from "./color-filed"
import { SelectColorSpace } from "./color-space-select"
import { useState } from "react"

type Props = ColorPickerProps & {
  className?: string
  color?: string;
  onChange?: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = (props) => {
  const [color, setColor] = useState(parseColor(props.color || '#FFc700'));
  const [colorSpace, setColorSpace] = useState('HEX');

  const handleChange = (color: Color) => {
    setColor(color);
    props.onChange?.(color.toString("hex"));
  }

  return (
    <div className={props.className}>
      <ColorPickerAria {...props} defaultValue={color} value={color} onChange={handleChange}>
        <ColorArea
          className="w-full h-[130px] rounded-lg"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness" />

        <div className="flex gap-2 mt-[10px]">
          <div className="flex flex-col gap-2 w-full">
            <ColorSlider colorSpace="hsb" channel="hue" />
            <ColorSlider channel="alpha" />
          </div>
          <ColorEye className="w-[62px] h-[30px] shrink-0" />
        </div>

        <div className="flex gap-2 mt-[10px]">
          {colorSpace === 'RGB' && <RGBColorField />}
          {colorSpace === 'HEX' && <HEXColorField />}
          {colorSpace === 'HSL' && <HSLColorField />}
          {colorSpace === 'HSB' && <HSBColorField />}
          <div className="flex gap-2 w-[62px] shrink-0 h-[30px]">
            <SelectColorSpace onChange={(value) => setColorSpace(value as 'HEX' | 'RGB' | 'HSL' | 'HSB')} />
          </div>
        </div>
      </ColorPickerAria>
    </div>
  )
}