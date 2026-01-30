import { defineStore } from 'pinia'
import { navigateTo, useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', {
  id: 'auth',
  state: () => ({
    user: null as any,
    token: null as string | null,
    menus: [] as Array<any>,
    initialized: false, // session fetch completed
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'superadmin',
  },

  actions: {
    /** Login user and persist token */
    async login(payload: { email: string; password: string }) {
      const { $api } = useNuxtApp()

      const res: any = await $api('/auth/login', {
        method: 'POST',
        body: payload,
      })

      this.token = res.token
      this.user = res.user
      this.menus = res.menus

      // Persist token only on client
      if (process.client) {
        localStorage.setItem('token', res.token)
      }
    },

    /** Logout user and clear token */
    async logout() {
      const { $api } = useNuxtApp()

      try {
        await $api('/auth/logout', { method: 'POST' })
      } finally {
        this.$reset()
        if (process.client) {
          localStorage.removeItem('token')
        }
        navigateTo('/auth/login')
      }
    },

    /** Restore session on refresh */
    async fetchMe() {
      if (!process.client) {
        // Skip during SSR
        return
      }

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
      } catch (err) {
        console.error('Failed to fetch user:', err)
        this.$reset()
        localStorage.removeItem('token')
      } finally {
        this.initialized = true
      }
    },

    /** Initialize auth on client */
    init() {
      if (process.client && !this.initialized) {
        this.fetchMe()
      }
    },
  },
})
