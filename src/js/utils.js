const isCustomElementsSupported = Boolean(window.customElements)
const isShadowDomSupported = Boolean(document.documentElement.attachShadow)

export const canUseWebComponents = isCustomElementsSupported && isShadowDomSupported

export const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion)').matches
