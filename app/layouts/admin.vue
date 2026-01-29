<template>
  <div class="min-h-screen flex bg-bg text-text">

    <!-- Sidebar -->
    <aside class="w-64 bg-surface border-r border-primary/10 p-6 space-y-4">
      <h2 class="font-bold text-lg">Admin</h2>
      <NuxtLink to="/admin/users">Users</NuxtLink>
      <NuxtLink to="/admin/jottings">Jottings</NuxtLink>
      <NuxtLink to="/admin/reports">Reports</NuxtLink>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-8">
      <slot />
    </main>

  </div>
</template>
