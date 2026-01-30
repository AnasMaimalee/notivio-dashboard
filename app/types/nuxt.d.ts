export {}

declare module '#app' {
  interface NuxtApp {
    $applyTheme: (theme: any, mode?: 'light' | 'dark') => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $applyTheme: (theme: any, mode?: 'light' | 'dark') => void
  }
}
