import { cn } from '@/lib/utils';
import React from 'react';
import { ColorPickerStateContext, parseColor } from 'react-aria-components';

type Props = {
  className?: string
}

export const ColorEye: React.FC<Props> = ({ className }) => {
  const state = React.useContext(ColorPickerStateContext)!;

  // @ts-ignore
  if (typeof EyeDropper === 'undefined') {
    return 'EyeDropper is not supported in your browser.';
  }

  return (
    <button
      aria-label="Eye dropper"
      onClick={() => {
        // @ts-ignore
        new EyeDropper().open().then((result) =>
          state.setColor(parseColor(result.sRGBHex))
        );
      }}
      className={cn("flex items-center justify-center", className)}
    >
      <SamplerIcon />
    </button>
  );
}

const SamplerIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={"fill-white dark:fill-black"}  ><path fill="currentColor" d="M11.5 2.379A1.5 1.5 0 1 1 13.621 4.5l-1.5 1.5.707.707a1.5 1.5 0 1 1-2.121 2.121l-.268-.267L5.5 13.5a2.122 2.122 0 0 1-3-3l4.939-4.939-.267-.268a1.5 1.5 0 1 1 2.121-2.121l.707.707Zm-8 9.121a.707.707 0 0 0 1 1l4.939-4.939-1-1Z"></path></svg>
}