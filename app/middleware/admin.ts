export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()

  if (auth.user?.role !== 'superadmin') {
    return navigateTo('/')
  }
})
