<script setup lang="ts">
import { computed } from 'vue'
import { message } from 'ant-design-vue'

const { $api } = useNuxtApp()
const auth = useAuthStore()

/**
 * Fetch dashboard data from backend
 */
const { data, pending, error } = await useAsyncData('dashboard', async () => {
  try {
    return await $api('/dashboard')
  } catch (err) {
    message.error('Failed to load dashboard')
    throw err
  }
})

/**
 * Safe computed fallbacks
 */
const user = computed(() => data.value?.user ?? auth.user)

const stats = computed(() => ({
  myJottings: data.value?.stats?.my_jottings ?? 0,
  shared: data.value?.stats?.shared_with_me ?? 0,
  pending: data.value?.stats?.pending_contributions ?? 0,
}))

const recentJottings = computed(() => data.value?.recent_jottings ?? [])
</script>

<template>
  <div class="space-y-10">

    <!-- Loading -->
    <div
      v-if="pending"
      class="py-20 text-center opacity-60"
    >
      Loading dashboard…
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="py-20 text-center text-red-500"
    >
      Failed to load dashboard
    </div>

    <!-- Content -->
    <template v-else>

      <!-- Greeting -->
      <section>
        <h1 class="text-2xl font-semibold">
          Welcome back, {{ user?.name }} 👋
        </h1>
        <p class="opacity-70 mt-1">
          Capture your thoughts, sketches, and voice notes.
        </p>
      </section>

      <!-- Quick Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="stat in [
            { label: 'My Jottings', value: stats.myJottings },
            { label: 'Shared With Me', value: stats.shared },
            { label: 'Pending Contributions', value: stats.pending },
          ]"
          :key="stat.label"
          class="rounded-2xl bg-surface p-5 border border-primary/10
                 hover:border-primary/30 transition"
        >
          <p class="text-sm opacity-60">
            {{ stat.label }}
          </p>
          <p class="text-2xl font-bold mt-2 text-primary">
            {{ stat.value }}
          </p>
        </div>
      </section>

      <!-- Recent Jottings -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">
            Recent Jottings
          </h2>
          <NuxtLink
            to="/jottings"
            class="text-sm hover:text-primary"
          >
            View all
          </NuxtLink>
        </div>

        <div
          v-if="recentJottings.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <NuxtLink
            v-for="jot in recentJottings"
            :key="jot.id"
            :to="`/jottings/${jot.id}`"
            class="group rounded-2xl bg-surface p-5
                   border border-primary/10
                   hover:border-primary/40 hover:shadow transition"
          >
            <h3
              class="font-medium group-hover:text-primary transition"
            >
              {{ jot.title || 'Untitled Jotting' }}
            </h3>

            <p class="text-sm opacity-60 mt-2 line-clamp-2">
              {{ jot.summary || 'Text, voice and sketches combined.' }}
            </p>

            <div class="text-xs opacity-50 mt-4">
              Updated {{ new Date(jot.updated_at).toLocaleDateString() }}
            </div>
          </NuxtLink>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="rounded-2xl bg-surface p-10 text-center
                 border border-dashed border-primary/20 opacity-70"
        >
          No jottings yet — create your first one ✨
        </div>
      </section>

    </template>

  </div>
</template>
