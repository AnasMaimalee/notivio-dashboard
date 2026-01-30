// plugins/api.ts
import { ofetch } from 'ofetch'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const api = ofetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      if (auth.token) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${auth.token}`,
        }
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
