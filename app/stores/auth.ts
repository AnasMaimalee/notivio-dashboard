import { defineStore } from 'pinia'
import { navigateTo, useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    menus: [] as Array<any>,
    initialized: false, // 👈 important
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
      this.menus = res.menus

      // ✅ persist token
      localStorage.setItem('token', res.token)
    },

    async logout() {
      const { $api } = useNuxtApp()

      try {
        await $api('/auth/logout', { method: 'POST' })
      } finally {
        this.$reset()
        localStorage.removeItem('token')
        navigateTo('/auth/login')
      }
    },

    /** Restore session on refresh */
    async fetchMe() {
      const { $api } = useNuxtApp()

      const token = localStorage.getItem('token')
      if (!token) {
        this.initialized = true
        return
      }

      this.token = token

      try {
        const res: any = await $api('/auth/me')
        this.user = res.user
        this.menus = res.menus
      } catch {
        this.$reset()
        localStorage.removeItem('token')
      } finally {
        this.initialized = true
      }
    },
  },
})
