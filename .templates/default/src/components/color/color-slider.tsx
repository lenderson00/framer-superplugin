import {ColorSlider as ColorSliderAria, ColorSliderProps, ColorThumb, Label, SliderOutput, SliderTrack} from 'react-aria-components';

type Props = ColorSliderProps & {
  className?: string
}

export const ColorSlider: React.FC<Props> = (props) => {
  return (<ColorSliderAria {...props} className={props.className}>
    <SliderTrack className="h-[10px] rounded-full">
      <ColorThumb className="w-[14px] h-[14px] shadow-thumb rounded-full top-1/2" />
    </SliderTrack>
  </ColorSliderAria>)
}