<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ref } from 'vue'

interface LoginAttempt {
  id: string
  user_name: string
  email: string
  ip_address: string
  device: string
  status: 'success' | 'failed'
  created_at: string
}

const attempts = ref<LoginAttempt[]>([])

async function fetchAttempts() {
  try {
    attempts.value = await $api('/admin/login-attempts')
  } catch (err) {
    console.error('Failed to fetch login attempts', err)
  }
}

fetchAttempts()
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Login Attempts" back />

    <a-table :dataSource="attempts" rowKey="id" :pagination="{ pageSize: 10 }">
      <a-table-column title="Name" dataIndex="user_name" key="user_name" />
      <a-table-column title="Email" dataIndex="email" key="email" />
      <a-table-column title="IP Address" dataIndex="ip_address" key="ip_address" />
      <a-table-column title="Device" dataIndex="device" key="device" />
      <a-table-column title="Status" key="status">
        <template #customRender="{ record }">
          <span
            :class="record.status === 'success' ? 'text-green-500' : 'text-red-500'"
            class="font-medium"
          >
            {{ record.status.toUpperCase() }}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="Date & Time" dataIndex="created_at" key="created_at">
        <template #customRender="{ text }">
          {{ new Date(text).toLocaleString() }}
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
