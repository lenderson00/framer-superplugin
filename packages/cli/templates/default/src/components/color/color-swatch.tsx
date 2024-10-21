import { cn } from '@/lib/utils';
import { ColorSwatch as ColorSwatchAria, type ColorSwatchProps } from 'react-aria-components';

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <ColorSwatchAria
      {...props}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
        repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
      })}
      className={cn("w-6 h-6 rounded-md border border-neutral-300 dark:border-neutral-600 cursor-pointer [&data-selected=true]:rounded-full data-[selected=true]:border-black", props.className)}
    />
  );
}
