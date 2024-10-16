import { ColorPicker as ColorPickerAria, ColorPickerProps } from "react-aria-components"
import { ColorEye } from "./color-eye"
import { ColorArea } from "./color-area"
import { ColorSlider } from "./color-slider"

type Props = ColorPickerProps

export const ColorPicker: React.FC<Props> = (props) => {
  return (
    <ColorPickerAria {...props}>
      <ColorArea 
        className="w-full h-[130px] rounded-lg" 
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"/>
        <ColorSlider colorSpace="hsb" channel="hue"/>
        <ColorSlider channel="alpha" />
      <ColorEye className="w-[62px] h-[30px]" />
    </ColorPickerAria>
  )
}