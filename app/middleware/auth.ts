export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  console.log('🟡 auth.initialized:', auth.initialized)
  console.log('🟡 auth.token BEFORE:', auth.token)

  if (!auth.initialized) {
    console.log('🟠 calling fetchMe()')
    await auth.fetchMe()
  }

  console.log('🟢 auth.token AFTER:', auth.token)

  if (!auth.isAuthenticated) {
    console.log('🔴 redirecting to login')
    return navigateTo('/auth/login')
  }
})
