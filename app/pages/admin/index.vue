<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'
import { useNuxtApp } from '#app'

const auth = useAuthStore()
const { $api } = useNuxtApp()

// Fetch admin dashboard data
const { data, pending, error } = await useAsyncData('admin-dashboard', () =>
  $api('/admin/dashboard')
)

const stats = computed(() => data.value?.stats ?? {
  total_users: 0,
  total_jottings: 0,
  pending_contributions: 0,
  active_courses: 0
})

const recentUsers = computed(() => data.value?.recent_users ?? [])

/** Handlers */
function changeRole(user: any, role: string) {
  user.role = role
  $api(`/admin/users/${user.id}/role`, { method: 'POST', body: { role } })
}

function toggleStatus(user: any) {
  user.active = !user.active
  $api(`/admin/users/${user.id}/status`, { method: 'POST', body: { active: user.active } })
}

/** Table columns */
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Active', key: 'active' },
  { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' }
]
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-bg text-text">

      <!-- Header -->
      <section class="mb-6">
        <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
        <p class="opacity-70 mt-1">Manage users, courses, and contributions at a glance.</p>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="rounded-2xl bg-surface p-5 border border-primary/10" v-for="(value, key) in stats" :key="key">
          <p class="text-sm opacity-60">{{ key.replaceAll('_', ' ').toUpperCase() }}</p>
          <p class="text-2xl font-bold mt-2">{{ value }}</p>
        </div>
      </section>

      <!-- Recent Users Table -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Recent Users</h2>
          <NuxtLink to="/admin/users" class="text-sm hover:text-primary">View all</NuxtLink>
        </div>

        <a-table :columns="columns" :data-source="recentUsers" row-key="id">
          <!-- Role Column -->
          <template #bodyCell="{ column, record }" v-if="column.key === 'role'">
            <a-select
              v-model="record.role"
              size="small"
              style="width: 110px"
              @change="val => changeRole(record, val)"
            >
              <a-select-option value="user">User</a-select-option>
              <a-select-option value="admin">Admin</a-select-option>
            </a-select>
          </template>

          <!-- Active Column -->
          <template #bodyCell="{ column, record }" v-if="column.key === 'active'">
            <a-switch
              v-model:checked="record.active"
              @change="() => toggleStatus(record)"
            />
          </template>
        </a-table>
      </section>

    </main>
  </div>
</template>
