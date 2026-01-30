type ThemeColors = {
  primary?: string
  secondary?: string
  bg?: string
  surface?: string
  text?: string
}

export default defineNuxtPlugin(() => {
  const applyTheme = (
    theme: ThemeColors,
    mode: 'light' | 'dark' = 'light'
  ) => {
    const root = document.documentElement

    // Apply colors
    Object.entries(theme).forEach(([key, value]) => {
      if (!value) return
      root.style.setProperty(`--${key}`, value)
    })

    // Theme mode
    root.dataset.theme = mode
  }

  return {
    provide: {
      applyTheme,
    },
  }
})
