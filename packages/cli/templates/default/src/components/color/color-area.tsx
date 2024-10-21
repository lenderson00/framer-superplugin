import { ColorArea as ColorAreaAria, ColorAreaProps, ColorThumb } from 'react-aria-components';

type Props = ColorAreaProps & {
  className?: string
}

export const ColorArea: React.FC<Props> = (props) => {

  return <ColorAreaAria {...props} className={props.className} aria-label='Color Area'>
    <ColorThumb className="w-[14px] h-[14px] shadow-thumb rounded-full cursor-pointer" aria-label='Color Thumb' />
  </ColorAreaAria>
}