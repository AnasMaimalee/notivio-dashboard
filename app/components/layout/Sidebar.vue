<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const collapsed = ref(false)

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

// Check if menu is active
const isActive = (path: string) => route.path.startsWith(path)
</script>

<template>
  <aside
    class="h-screen bg-surface border-r border-primary/10 flex flex-col transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- Brand -->
    <div class="flex items-center justify-center h-16 border-b border-primary/10">
      <span v-if="!collapsed" class="font-bold text-xl" :style="{ color: auth.theme?.primary }">Notivio</span>
      <span v-else class="font-bold text-xl" :style="{ color: auth.theme?.primary }">N</span>
    </div>

    <!-- Menu -->
    <ul class="flex-1 mt-4">
      <li
        v-for="menu in auth.menus"
        :key="menu.key"
        :class="['px-4 py-3 cursor-pointer flex items-center gap-3 transition hover:bg-primary/10', isActive(menu.path) ? 'bg-primary/10 font-semibold' : '']"
      >
        <NuxtLink :to="menu.path" class="flex-1" :style="{ color: auth.theme?.text }">
          <span>{{ collapsed ? '' : menu.label }}</span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Collapse button -->
    <button
      @click="toggleCollapse"
      class="p-2 m-4 rounded-full border border-primary/20 hover:bg-primary/10 transition self-end"
    >
      <span v-if="collapsed">▶</span>
      <span v-else>◀</span>
    </button>
  </aside>
</template>
