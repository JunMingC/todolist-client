import { useEffect } from "react"
import { useScreenSize } from "./useScreenSize"

export const useScreenSizeClass = () => {
    const screenSize = useScreenSize()

    function screenSizeClass(screenSize) {
        if (screenSize.isXSmall) {
            return "screen-xsmall"
        } else if (screenSize.isSmall) {
            return "screen-small"
        } else if (screenSize.isMedium) {
            return "screen-medium"
        } else if (screenSize.isLarge) {
            return "screen-large"
        } else if (screenSize.isxLarge) {
            return "screen-xlarge"
        }
    }

    function screenMinSizeClass(screenSize) {
        if (screenSize.isxLarge) {
            return ["screen-min-xlarge", "screen-min-large", "screen-min-medium", "screen-min-small", "screen-min-xsmall"]
        } else if (screenSize.isLarge) {
            return ["screen-min-large", "screen-min-medium", "screen-min-small", "screen-min-xsmall"]
        } else if (screenSize.isMedium) {
            return ["screen-min-medium", "screen-min-small", "screen-min-xsmall"]
        } else if (screenSize.isSmall) {
            return ["screen-min-small", "screen-min-xsmall"]
        } else if (screenSize.isXSmall) {
            return ["screen-min-xsmall"]
        }
    }

    useEffect(() => {
        // Handle screen sizes
        document.body.classList.remove('screen-xsmall', 'screen-small', 'screen-medium', 'screen-large', 'screen-xlarge')
        document.body.classList.add(screenSizeClass(screenSize))

        // Handle screen min sizes
        document.body.classList.remove('screen-min-xsmall', 'screen-min-small', 'screen-min-medium', 'screen-min-large', 'screen-min-xlarge')
        document.body.classList.add(...screenMinSizeClass(screenSize))

    }, [screenSize])
}