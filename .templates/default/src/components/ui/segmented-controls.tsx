import { cn } from "@/lib/utils"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useId, useState } from "react"

export interface SegmentedControlItem<Value> {
  value: Value
  label?: string
}

export interface SegmentedControlsProps<Value> {
  title?: string
  items?: SegmentedControlItem<Value>[]
  defaultValue?: Value
  value?: Value | null
  onChange?: (value: Value) => void
  disabled?: boolean
}

const defaultItems: SegmentedControlItem<boolean>[] = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' },
]

export function SegmentedControls<Value>({
  items = defaultItems as SegmentedControlItem<Value>[],
  defaultValue,
  value,
  onChange,
  disabled = false,

}: SegmentedControlsProps<Value>) {
  const [active, setActive] = useState<SegmentedControlItem<Value> | null>()
  const id = useId()

  useEffect(() => {
    const initialValue = value !== undefined ? value : defaultValue
    const option = items.find((option) => option.value === initialValue) || items[0]
    setActive(option)
  }, [items, defaultValue, value])

  const selectOption = (option: SegmentedControlItem<Value>) => {
    if (disabled) return
    setActive(option)
    onChange?.(option.value)
  }

  return (
    <LayoutGroup id={id}>
      <div className="relative h-[30px]">
        <div className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-1 w-full p-[1px]  h-full bg-input rounded-[7px]",
          disabled && "opacity-50 cursor-not-allowed"
        )}>
          {items.map((option) => (
            <div key={`${id}-${String(option.value)}`} aria-label={option.label} data-selected={active?.value === option.value}>

              <motion.div

                key={`${id}-${String(option.value)}`}
                aria-label={option.label}
                data-selected={active?.value === option.value}
                className={cn(
                  "animated cursor-pointer h-full  relative z-50 flex items-center justify-center px-3  ",
                  active?.value === option.value
                    ? "font-semibold text-primary dark:text-white"
                    : "opacity-50 hover:opacity-80",
                  disabled && "cursor-not-allowed"
                )}
                onClick={() => selectOption(option)}
              >
                <div className={cn("flex items-center select-none justify-center relative z-[999]")}>
                  {option.label}
                </div>
              </motion.div>

              {
                active?.value === option.value && (
                  <motion.div
                    layoutId="active-segment"
                    className="absolute top-[1px] h-[calc(30px-2px)] mx-0 shadow-sm border border-input bg-white dark:bg-elevation rounded-[7px] p-2"
                    style={{ width: `calc((100% / ${items.length}) - 3px)` }}
                  />
                )
              }

            </div>
          ))}


        </div>
      </div>
    </LayoutGroup>
  )
}
