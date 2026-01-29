<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const courses = ref<any[]>([])

async function fetchCourses() {
  courses.value = await $api('/admin/courses')
}

fetchCourses()
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Courses" back />

    <a-table :data-source="courses" row-key="id">
      <a-table-column title="Name" dataIndex="name" key="name" />
      <a-table-column title="Instructor" dataIndex="instructor" key="instructor" />
      <a-table-column title="Created At" dataIndex="created_at" key="created_at" />
      <a-table-column title="Actions" key="actions">
        <template #default="{ record }">
          <NuxtLink :to="`/admin/courses/${record.id}`" class="text-primary hover:underline">
            View
          </NuxtLink>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
