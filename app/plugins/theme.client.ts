export default defineNuxtPlugin(() => {
  const applyTheme = (theme: any, mode: 'light' | 'dark') => {
    const root = document.documentElement
    const colors = theme[mode]

    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)

    root.style.setProperty('--color-bg', colors.bg)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-text', colors.text)
  }

  return {
    provide: { applyTheme }
  }
})
