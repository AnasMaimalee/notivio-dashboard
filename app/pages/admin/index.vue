<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { computed } from 'vue'

const { $api } = useNuxtApp()
const auth = useAuthStore()

// Fetch dashboard data
const { data, pending, error } = await useAsyncData('admin-dashboard', () =>
  $api('/admin/dashboard')
)

const stats = computed(() => data.value?.stats ?? {})
const recentJottings = computed(() => data.value?.recent_jottings ?? [])
</script>

<template>
  <div class="space-y-10">

    <PageHeader title="Admin Dashboard" subtitle="Overview of system activity" />

    <div v-if="pending" class="opacity-60">Loading dashboard…</div>
    <div v-else-if="error" class="text-red-500">Failed to load dashboard</div>
    <template v-else>
      <!-- Quick Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="rounded-2xl bg-surface p-5 border border-primary/10">
          <p class="text-sm opacity-60">Total Users</p>
          <p class="text-2xl font-bold mt-2">{{ stats.total_users || 0 }}</p>
        </div>

        <div class="rounded-2xl bg-surface p-5 border border-primary/10">
          <p class="text-sm opacity-60">Total Jottings</p>
          <p class="text-2xl font-bold mt-2">{{ stats.total_jottings || 0 }}</p>
        </div>

        <div class="rounded-2xl bg-surface p-5 border border-primary/10">
          <p class="text-sm opacity-60">Pending Contributions</p>
          <p class="text-2xl font-bold mt-2">{{ stats.pending_contributions || 0 }}</p>
        </div>
      </section>

      <!-- Recent Jottings -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Recent Jottings</h2>
          <NuxtLink to="/admin/jottings" class="text-sm hover:text-primary">View all</NuxtLink>
        </div>

        <div v-if="recentJottings.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="j in recentJottings"
            :key="j.id"
            :to="`/admin/jottings/${j.id}`"
            class="rounded-2xl bg-surface p-5 border border-primary/10 hover:shadow-md transition"
          >
            <h3 class="font-medium">{{ j.title || 'Untitled Jotting' }}</h3>
            <p class="text-sm opacity-60 mt-2 line-clamp-2">{{ j.summary || 'Text, voice & sketches.' }}</p>
            <div class="text-xs opacity-50 mt-4">{{ new Date(j.updated_at).toLocaleDateString() }}</div>
          </NuxtLink>
        </div>
        <div v-else class="opacity-60">No jottings yet.</div>
      </section>
    </template>

  </div>
</template>
