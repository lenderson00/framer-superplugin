import { ColorField, Input } from 'react-aria-components';

export const HEXColorField = () => {
  return <div className="grid grid-cols-4 w-full" >
    <ColorField className="col-span-3 w-full" aria-label='HEX Color Field'>
      <Input className="!rounded-r-none w-full" aria-label='HEX Input' />
    </ColorField>
    <ColorField channel="alpha" className="col-span-1 ml-[1px] " aria-label='Alpha'>
      <Input className="!rounded-l-none w-full " aria-label='Alpha Input' />
    </ColorField>
  </div>
}

export function RGBColorField() {

  return (
    <div className="grid grid-cols-4 w-full gap-[1px]" aria-label='RGB Color Field'>
      <ColorField colorSpace="rgb" channel="red" className="col-span-1 w-full" aria-label='Red'>
        <Input className="!rounded-r-none w-full" aria-label='Red Input' />
      </ColorField>
      <ColorField colorSpace="rgb" channel="green" className="col-span-1 w-full" aria-label='Green'>
        <Input className="!rounded-none w-full" aria-label='Green Input' />
      </ColorField>
      <ColorField colorSpace="rgb" channel="blue" className="col-span-1 w-full" aria-label='Blue'>
        <Input className="!rounded-none w-full" aria-label='Blue Input' />
      </ColorField>
      <ColorField colorSpace="rgb" channel="alpha" className="col-span-1 w-full" aria-label='Alpha'>
        <Input className="!rounded-l-none w-full" aria-label='Alpha Input' />
      </ColorField>
    </div>
  );
}

export function HSLColorField() {
  return (
    <div className="grid grid-cols-4 w-full gap-[1px]">
      <ColorField colorSpace="hsl" channel="hue" className="col-span-1 w-full" aria-label='Hue'>
        <Input className="!rounded-r-none w-full" aria-label='Hue Input' />
      </ColorField>
      <ColorField colorSpace="hsl" channel="saturation" className="col-span-1 w-full" aria-label='Saturation'>
        <Input className="!rounded-none w-full" aria-label='Saturation Input' />
      </ColorField>
      <ColorField colorSpace="hsl" channel="lightness" className="col-span-1 w-full" aria-label='Lightness'>
        <Input className="!rounded-none w-full" aria-label='Lightness Input' />
      </ColorField>
      <ColorField colorSpace="hsl" channel="alpha" className="col-span-1 w-full" aria-label='Alpha'>
        <Input className="!rounded-l-none w-full" aria-label='Alpha Input' />
      </ColorField>
    </div>
  );
}

export function HSBColorField() {
  return (
    <div className="grid grid-cols-4 w-full gap-[1px]">
      <ColorField colorSpace="hsb" channel="hue" className="col-span-1 w-full" aria-label='Hue'>
        <Input className="!rounded-r-none w-full" aria-label='Hue Input' />
      </ColorField>
      <ColorField colorSpace="hsb" channel="saturation" className="col-span-1 w-full" aria-label='Saturation'>
        <Input className="!rounded-none w-full" aria-label='Saturation Input' />
      </ColorField>
      <ColorField colorSpace="hsb" channel="brightness" className="col-span-1 w-full" aria-label='Brightness'>
        <Input className="!rounded-none w-full" aria-label='Brightness Input' />
      </ColorField>
      <ColorField colorSpace="hsb" channel="alpha" className="col-span-1 w-full" aria-label='Alpha'>
        <Input className="!rounded-l-none w-full" aria-label='Alpha Input' />
      </ColorField>
    </div>
  );
}
