import { CanvasRootNode, framer } from "framer-plugin"
import { useEffect, useState } from "react"

export const useCanvasRoot = () => {
    const [canvasRoot, setCanvasRoot] = useState<CanvasRootNode | null>(null)

    useEffect(() => {
        const unsubscribe = framer.subscribeToCanvasRoot(setCanvasRoot)

        return () => {
          unsubscribe()
        }
    }, [])

    return canvasRoot
}