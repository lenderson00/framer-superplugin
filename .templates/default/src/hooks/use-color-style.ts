import { framer } from "framer-plugin"
import { useEffect, useState } from "react"
import { ColorStyle } from "framer-plugin"

export const useColorStyle = () => {
    const [colorStyles, setColorStyles] = useState<ColorStyle[]>([])

    useEffect(() => {
        const unsubscribe = framer.subscribeToColorStyles(setColorStyles)
        return () => {
            unsubscribe()
        }
    }, [])

    return colorStyles
}