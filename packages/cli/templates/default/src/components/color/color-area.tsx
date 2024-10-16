import { ColorArea as ColorAreaAria, ColorAreaProps, ColorThumb} from 'react-aria-components';

type Props = ColorAreaProps & {
  className?: string
}

export const ColorArea: React.FC<Props> = (props) => {

  return <ColorAreaAria {...props} className={props.className}>
    <ColorThumb className="w-[14px] h-[14px] shadow-thumb rounded-full cursor-pointer" />
  </ColorAreaAria>
}