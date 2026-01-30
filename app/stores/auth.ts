import { defineStore } from 'pinia'
import { navigateTo, useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    theme: null as any,
    menus: [] as Array<any>, // add menus array
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'superadmin',
  },

  actions: {
    async login(payload: { email: string; password: string }) {
      const { $api } = useNuxtApp()
      const res: any = await $api('/auth/login', {
        method: 'POST',
        body: payload,
      })

      this.token = res.token
      this.user = res.user
      this.theme = res.theme
      this.menus = res.menus // store menus from backend

    },

    async logout() {
      const { $api } = useNuxtApp()
      await $api('/auth/logout', { method: 'POST' })

      this.token = null
      this.user = null
      this.theme = null
      this.menus = []
      navigateTo('/login')
    },

   async fetchMe() {
    const { $api, $applyTheme } = useNuxtApp()
    const res: any = await $api('/auth/me')

    this.user = res.user
    this.theme = res.theme
    this.menus = res.menus

    if (res.theme) {
        $applyTheme(res.theme, 'light')
    }
    },
  },
})

