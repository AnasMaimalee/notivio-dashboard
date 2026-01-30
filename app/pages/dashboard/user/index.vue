<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { $api } = useNuxtApp()

/** Fetch user dashboard data */
const { data, pending, error } = await useAsyncData('user-dashboard', () =>
  $api('/user/dashboard')
)

/** Stats cards */
const stats = computed(() => [
  {
    title: 'My Courses',
    value: data.value?.stats?.my_courses ?? 0,
    icon: 'lucide:book-open',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'My Jottings',
    value: data.value?.stats?.my_jottings ?? 0,
    icon: 'lucide:file-text',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Shared With Me',
    value: data.value?.stats?.shared_with_me ?? 0,
    icon: 'lucide:users',
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Recent Activity',
    value: data.value?.stats?.recent_activity ?? 0,
    icon: 'lucide:activity',
    color: 'bg-green-100 text-green-600',
  },
])

const recentJottings = computed(() => data.value?.recent_jottings || [])
const recentActivity = computed(() => data.value?.recent_activity || [])
</script>

<template>
  <div class="flex min-h-screen">

    <main class="flex-1 p-6 bg-bg text-text">
      <!-- Header -->
      <section class="mb-6">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-gray-500 mt-1">Your workspace overview</p>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="flex items-center gap-4 p-5 rounded-xl shadow-sm border border-primary/10 bg-white"
        >
          <div :class="`p-3 rounded-lg ${stat.color} flex items-center justify-center`">
            <Icon :name="stat.icon" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <p class="text-2xl font-semibold">{{ stat.value }}</p>
          </div>
        </div>
      </section>

      <!-- Panels -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Jottings -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h2 class="text-xl font-semibold mb-4">Recent Jottings</h2>

          <a-table :columns="[
            { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Last Updated', dataIndex: 'updated_at', key: 'updated_at' }
          ]"
          :data-source="recentJottings"
          row-key="id"
          :pagination="{ pageSize: 5 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'title'">
                <NuxtLink :to="`/jottings/${record.id}`" class="hover:text-primary">
                  {{ record.title }}
                </NuxtLink>
              </template>
              <template v-else-if="column.key === 'updated_at'">
                {{ new Date(record.updated_at).toLocaleDateString() }}
              </template>
            </template>
          </a-table>

          <p v-if="!recentJottings.length" class="text-gray-400 mt-4">
            You haven’t created any jottings yet
          </p>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul v-if="recentActivity.length" class="space-y-3">
            <li v-for="a in recentActivity" :key="a.id" class="flex justify-between items-center">
              <span>{{ a.action }}</span>
              <span class="text-xs text-gray-400">{{ new Date(a.created_at).toLocaleDateString() }}</span>
            </li>
          </ul>

          <p v-else class="text-gray-400 mt-4">No recent activity yet</p>
        </div>
      </section>

      <!-- Error -->
      <div v-if="error" class="mt-6 text-red-500">
        Failed to load dashboard data
      </div>
    </main>
  </div>
</template>
