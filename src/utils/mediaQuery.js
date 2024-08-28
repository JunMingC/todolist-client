export const subscribe = handler => handlers.push(handler)

export const unsubscribe = handler => {
    handlers = handlers.filter(item => item !== handler)
}

export const getScreenSize = () => {
    return {
        isXSmall: xSmallMedia.matches,
        isSmall: smallMedia.matches,
        isMedium: mediumMedia.matches,
        isLarge: largeMedia.matches,
        isxLarge: xlargeMedia.matches,
    }
}

// https://v4.mui.com/customization/breakpoints/
const xSmallMedia = window.matchMedia("(min-width: 0px) and (max-width: 599px)")
const smallMedia = window.matchMedia("(min-width: 600px) and (max-width: 959px)")
const mediumMedia = window.matchMedia("(min-width: 960px) and (max-width: 1279px)")
const largeMedia = window.matchMedia("(min-width: 1280px) and (max-width: 1919px)")
const xlargeMedia = window.matchMedia("(min-width: 1920px)")
let handlers = [];

[xSmallMedia, smallMedia, mediumMedia, largeMedia, xlargeMedia].forEach(media => {
    media.addEventListener("change", (e) => {
        e.matches && handlers.forEach(handler => handler())

    });
})
