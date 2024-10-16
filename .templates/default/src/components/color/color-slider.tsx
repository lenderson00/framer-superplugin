import { cn } from '@/lib/utils';
import { ColorSlider as ColorSliderAria, ColorSliderProps, ColorThumb, Label, SliderOutput, SliderTrack } from 'react-aria-components';

type Props = ColorSliderProps & {
  className?: string
}

export const ColorSlider: React.FC<Props> = (props) => {

  return (<ColorSliderAria {...props} className={cn(props.className, "relative")}>
    <SliderTrack className="h-[10px] rounded-full relative" style={({ defaultStyle }) => ({
      background: `${defaultStyle.background},
            repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
    })}>
      {
        props.channel === "alpha" && (
          <>
            <div className="dark:bg-black/50 -z-10 w-full h-full rounded-full absolute top-0 left-0" />
            <div className="dark:bg-gradient-to-r from-black/70 via-black/40 to-black/0 w-full h-full rounded-full absolute top-0 left-0" />
          </>
        )
      }
      <ColorThumb className="w-[14px] h-[14px] shadow-thumb rounded-full top-1/2" />
    </SliderTrack>
  </ColorSliderAria>)
}