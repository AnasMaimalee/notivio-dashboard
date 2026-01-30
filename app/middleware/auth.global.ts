export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  // Public routes
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password'
  ]

  // If route is public, no need to check auth
  if (publicRoutes.includes(to.path)) return

  // Ensure user is initialized
  if (!auth.initialized) {
    await auth.fetchMe()
  }

  // Not authenticated → redirect to login
  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Check menu access
  const allowedRoutes = auth.menus.map(m => m.route)
  const hasAccess = allowedRoutes.some(route => to.path.startsWith(route))

  if (!hasAccess) {
    return navigateTo('/dashboard')
  }
})
