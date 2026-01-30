import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,

    onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
          Accept: 'application/json',
        }
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.logout()
        navigateTo('/auth/login')
      }
    },
  })

  return {
    provide: { api },
  }
})
