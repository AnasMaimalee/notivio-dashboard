// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    primary: '#6366F1',      // default fallback
    secondary: '#10B981',    // default fallback
  }),
  actions: {
    setTheme(primary: string, secondary: string) {
      this.primary = primary
      this.secondary = secondary
    },
  },
})
