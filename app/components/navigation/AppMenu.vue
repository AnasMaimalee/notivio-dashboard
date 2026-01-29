<script setup lang="ts">
const auth = useAuthStore()
</script>

<template>
  <nav class="space-y-1">
    <NuxtLink
      v-for="menu in auth.menus"
      :key="menu.name"
      :to="menu.route"
      class="flex items-center gap-3 px-4 py-2 rounded-xl
             hover:bg-primary/10 transition"
    >
      <Icon :name="menu.icon" class="w-5 h-5" />
      <span>{{ menu.label }}</span>
    </NuxtLink>
  </nav>
</template>
