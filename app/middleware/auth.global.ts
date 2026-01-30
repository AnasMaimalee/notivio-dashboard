export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Public routes
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/index']

  if (publicRoutes.includes(to.path)) {
    return
  }

  // Not logged in
  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Check menu access
  const allowedRoutes = auth.menus.map(m => m.route)

  const hasAccess = allowedRoutes.some(route =>
    to.path.startsWith(route)
  )

  if (!hasAccess) {
    return navigateTo('/dashboard')
  }
})
