<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const { $api } = useNuxtApp()

const { data, pending, refresh } = await useAsyncData('admin-users', () =>
  $api('/admin/users')
)

async function toggleStatus(user: any) {
  try {
    await $api(`/admin/users/${user.id}/status`, {
      method: 'PATCH',
      body: { active: !user.active },
    })
    message.success('User status updated')
    refresh()
  } catch {
    message.error('Failed to update status')
  }
}

async function changeRole(user: any, role: string) {
  try {
    await $api(`/admin/users/${user.id}/role`, {
      method: 'PATCH',
      body: { role },
    })
    message.success('Role updated')
    refresh()
  } catch {
    message.error('Failed to update role')
  }
}

/* columns ONLY define structure */
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Active', key: 'active' },
  { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' },
]
</script>
<template>
    <PageHeader
        title="Users"
        subtitle="Manage system users"
        :back="true"
        />
  <a-table
    :columns="columns"
    :data-source="data"
    :loading="pending"
    row-key="id"
    bordered
  >
    <!-- ROLE -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'role'">
        <a-select
          :value="record.role"
          size="small"
          style="width: 110px"
          @change="(val) => changeRole(record, val)"
        >
          <a-select-option value="user">User</a-select-option>
          <a-select-option value="admin">Admin</a-select-option>
        </a-select>
      </template>

      <!-- ACTIVE -->
      <template v-else-if="column.key === 'active'">
        <a-switch
          :checked="record.active"
          @change="() => toggleStatus(record)"
        />
      </template>

      <!-- LAST LOGIN FALLBACK -->
      <template v-else-if="column.key === 'last_login'">
        {{ record.last_login || '—' }}
      </template>
    </template>
  </a-table>
</template>
