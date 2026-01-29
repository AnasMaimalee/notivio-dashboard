export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Public routes
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

  if (publicRoutes.includes(to.path)) {
    return
  }

  // Not logged in
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
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
