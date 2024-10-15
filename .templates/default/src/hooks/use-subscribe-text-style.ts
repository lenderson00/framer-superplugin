import { framer } from "framer-plugin"
import { useEffect, useState } from "react"
import { TextStyle } from "framer-plugin"

export const useSubscribeTextStyle = () => {
    const [textStyles, setTextStyles] = useState<TextStyle[]>([])

    useEffect(() => {
        const unsubscribe = framer.subscribeToTextStyles(setTextStyles)
        return () => {
            unsubscribe()
        }
    }, [])

    return textStyles
}