import { useState, useCallback, useEffect } from 'react'
import { getScreenSize, subscribe, unsubscribe } from '../utils/mediaQuery'

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(getScreenSize())

    const onSizeChanged = useCallback(() => {
        setScreenSize(getScreenSize())
    }, [])

    useEffect(() => {
        subscribe(onSizeChanged)

        return () => {
            unsubscribe(onSizeChanged)
        }
    }, [onSizeChanged])

    return screenSize // object { isXSmall, isSmall, isMedium, isLarge, isxLarge }
}
