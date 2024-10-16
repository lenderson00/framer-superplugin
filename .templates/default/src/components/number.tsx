import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider"
import NumberFlow, { Format } from '@number-flow/react'

interface Props {
  value: number;
  min: number;
  max: number;
  step?: number;
  placeholder?: string;
  unit?: string;
  onChange: (value: number) => void;
  format?: Format;
  displayStepper?: boolean;
}

function IconMinus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <path
        d="M 0 4.75 C 0 4.336 0.336 4 0.75 4 L 8.75 4 C 9.164 4 9.5 4.336 9.5 4.75 C 9.5 5.164 9.164 5.5 8.75 5.5 L 0.75 5.5 C 0.336 5.5 0 5.164 0 4.75 Z"
        fill="white"
      ></path>
    </svg>
  );
}

function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <path
        d="M 4 0.75 C 4 0.336 4.336 0 4.75 0 C 5.164 0 5.5 0.336 5.5 0.75 L 5.5 4 L 8.75 4 C 9.164 4 9.5 4.336 9.5 4.75 C 9.5 5.164 9.164 5.5 8.75 5.5 L 5.5 5.5 L 5.5 8.75 C 5.5 9.164 5.164 9.5 4.75 9.5 C 4.336 9.5 4 9.164 4 8.75 L 4 5.5 L 0.75 5.5 C 0.336 5.5 0 5.164 0 4.75 C 0 4.336 0.336 4 0.75 4 L 4 4 Z"
        fill="white"
      ></path>
    </svg>
  );
}

export const TickerUp = ({ rotate, onClick }: { rotate?: boolean, onClick?: () => void }) => {

  return (
    <motion.div
      className="cursor-pointer select-none p-1"
      animate={{ y: rotate ? -2 : 2 }}
      whileTap={{ y: 0 }}
      onTap={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="4" className={cn("dark:invert animated cursor-pointer opacity-70 hover:opacity-100 ", rotate && "rotate-180")}><path d="M 5.4 3.2 C 5.647 3.53 5.412 4 5 4 L 1 4 C 0.588 4 0.353 3.53 0.6 3.2 L 2.6 0.533 C 2.8 0.267 3.2 0.267 3.4 0.533 Z" fill="black"></path></svg>
    </motion.div>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function NumberInput({ displayStepper = false, value: defaultValue = 0, min = -Infinity, max = Infinity, step: stepAmount = 1, onChange, format = {
  style: "decimal"
} }: Props) {
  const [value, setValue] = useState(defaultValue)

  const inputRef = useRef<HTMLInputElement>(null)
  const [animated, setAnimated] = useState(true)
  const [showCaret, setShowCaret] = useState(true)
  const [maxValueHitted, setMaxValueHitted] = useState(false)
  const [minValueHitted, setMinValueHitted] = useState(false)

  useEffect(() => {
    if (value === min) {
      setMinValueHitted(true)
    } else {
      setMinValueHitted(false)
    }
    if (value === max) {
      setMaxValueHitted(true)
    } else {
      setMaxValueHitted(false)
    }
  }, [max, min, value])

  const increase = () => {
    const newVal = clamp(value + stepAmount, min, max)
    setValue(newVal)
    onChange?.(newVal)
  }

  const decrease = () => {
    const newVal = clamp(value - stepAmount, min, max)
    setValue(newVal)
    onChange?.(newVal)
  }

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setAnimated(false);

    if (inputValue === '-') {
      console.log('minus');
    }

    if (inputValue === '') {
      setValue(0);
      onChange?.(0);
      setMaxValueHitted(false);
      setMinValueHitted(false);
      return;
    }

    // Remover zeros à esquerda e pontos finais
    const cleanedValue = inputValue.replace(/^0+(?=\d)/, '').replace(/\.$/, '');
    const num = parseFloat(cleanedValue);

    const clampedNum = clamp(num, min, max);
    setValue(clampedNum);
    onChange?.(clampedNum);

    // Verificar se atingiu o valor máximo ou mínimo
    setMaxValueHitted(clampedNum === max);
    setMinValueHitted(clampedNum === min);

    // Atualizar o valor do input manualmente
    if (inputRef.current) {
      inputRef.current.value = clampedNum.toString();
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className={cn(
        "relative group h-[30px] col-span-1 shrink-0",
      )} >
        <input
          aria-label="number"
          ref={inputRef}
          className={cn(
            showCaret ? 'caret-primary' : 'caret-transparent',
            'h-[30px] w-full bg-input font-[inherit] outline-none !text-transparent',
            maxValueHitted && '!shadow-[inset_0_0_0_1px_red] ',
            minValueHitted && '!shadow-[inset_0_0_0_1px_red]'
          )}
          // Make sure to disable kerning, to match NumberFlow:
          style={{ fontKerning: 'none' }}
          type="number"
          min={min}
          step={stepAmount}
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={value}
          onInput={handleInput}
          onBlur={() => setAnimated(true)}
        />
        <NumberFlow
          value={value}
          format={format}
          aria-hidden
          trend
          animated={animated}
          onAnimationsStart={() => setShowCaret(false)}
          onAnimationsFinish={() => setShowCaret(true)}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[10px] w-full"
          willChange
        />

        <div className="animated opacity-0 group-hover:opacity-100 w-fit flex flex-col h-full  items-center justify-between absolute top-0 right-0 px-1">
          <TickerUp onClick={increase} />
          <TickerUp rotate onClick={decrease} />
        </div>
      </div>

      {
        displayStepper ? (
          <div className="bg-input rounded-lg flex-shrink-0 flex items-center  col-span-1  relative w-full">
            <motion.button
              tabIndex={-1}
              className={cn(
                "bg-transparent w-1/2 flex items-center justify-center relative active:!bg-transparent focus:!bg-transparent hover:bg-transparent press:bg-transparent opacity-70 hover:opacity-100",
                min != null && value <= min && "opacity-50 cursor-not-allowed hover:opacity-70"
              )}
              disabled={min != null && value <= min}
              onClick={decrease}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', time: 0.1 }}
            >
              <IconMinus />
            </motion.button>

            <div className="w-px h-3 flex-shrink-0 bg-gray-300 dark:bg-neutral-700" />

            <motion.button
              tabIndex={-1}
              className={cn(
                "bg-transparent w-1/2 flex items-center justify-center relative active:!bg-transparent focus:!bg-transparent hover:bg-transparent press:bg-transparent opacity-70 hover:opacity-100",
                max != null && value >= max && "opacity-50 cursor-not-allowed hover:opacity-70"
              )}
              disabled={max != null && value >= max}
              onClick={increase}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', time: 0.1 }}
            >
              <IconPlus />
            </motion.button>
          </div>
        ) : (
          <div className="rounded-lg flex-shrink-0 flex items-center  col-span-1  relative w-full">
            <Slider defaultValue={[value]} min={min} max={max} step={stepAmount} onValueChange={(value) => {
              const [newValue] = value;
              setValue(newValue);
              onChange?.(newValue);
            }} />
          </div>
        )}
    </div>
  );
}
