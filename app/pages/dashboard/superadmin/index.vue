<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: 'auth',
})

const { $api } = useNuxtApp()

/** Fetch admin dashboard data */
const { data, pending, error } = await useAsyncData('admin-dashboard', () =>
  $api('/admin/dashboard')
)

/** Stats (MATCH BACKEND EXACTLY) */
const stats = computed(() => ({
  total_users: data.value?.stats?.total_users ?? 10,
  active_users: data.value?.stats?.active_users ?? 0,
  total_courses: data.value?.stats?.total_courses ?? 0,
  total_jottings: data.value?.stats?.total_jottings ?? 0,
  shared_jottings: data.value?.stats?.shared_jottings ?? 0,
  trashed_items: data.value?.stats?.trashed_items ?? 0,
}))

/** Recent users */
const recentUsers = computed(() => data.value?.recent_users ?? [])

/** Handlers */
async function changeRole(user: any, role: string) {
  user.role = role
  await $api(`/admin/users/${user.id}/role`, {
    method: 'PUT',
    body: { role },
  })
}

async function toggleStatus(user: any) {
  user.active = !user.active
  await $api(`/admin/users/${user.id}/status`, {
    method: 'PUT',
    body: { active: user.active },
  })
}

/** Table columns */
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Active', key: 'active' },
  { title: 'Last Login', dataIndex: 'last_login_at', key: 'last_login_at' },
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
        <p class="opacity-70 mt-1">
          Manage users, courses, and system activity at a glance.
        </p>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div
          v-for="(value, key) in stats"
          :key="key"
          class="rounded-2xl bg-surface p-5 border border-primary/10"
        >
          <p class="text-sm opacity-60">
            {{ key.replace(/_/g, ' ').toUpperCase() }}
          </p>
          <p class="text-2xl font-bold mt-2">{{ value }}</p>
        </div>
      </section>

      <!-- Recent Users -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Recent Users</h2>
          <NuxtLink
            to="/admin/users"
            class="text-sm hover:text-primary"
          >
            View all
          </NuxtLink>
        </div>

        <a-table
          :columns="columns"
          :data-source="recentUsers"
          :loading="pending"
          row-key="id"
        >
          <template #bodyCell="{ column, record }">
            <!-- Role -->
            <template v-if="column.key === 'role'">
              <a-select
                v-model:value="record.role"
                size="small"
                style="width: 120px"
                @change="val => changeRole(record, val)"
              >
                <a-select-option value="user">User</a-select-option>
                <a-select-option value="admin">Admin</a-select-option>
                <a-select-option value="superadmin">Super Admin</a-select-option>
              </a-select>
            </template>

            <!-- Active -->
            <template v-else-if="column.key === 'active'">
              <a-switch
                v-model:checked="record.active"
                @change="() => toggleStatus(record)"
              />
            </template>

            <!-- Last login -->
            <template v-else-if="column.key === 'last_login_at'">
              <span class="opacity-70">
                {{ record.last_login_at || '—' }}
              </span>
            </template>
          </template>
        </a-table>

        <div v-if="error" class="mt-4 text-red-500">
          Failed to load dashboard data
        </div>
      </section>
    </main>
  </div>
</template>
