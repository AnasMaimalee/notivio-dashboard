<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const jottings = ref<any[]>([])

async function fetchJottings() {
  jottings.value = await $api('/admin/jottings')
}

fetchJottings()

const columns = [
  { title: 'Title', key: 'title' },
  { title: 'Author', key: 'author' },
  { title: 'Updated', key: 'updated_at' },
  { title: 'Actions', key: 'actions' }
]
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Jottings" back />

    <a-table :columns="columns" :data-source="jottings" row-key="id">
      <template #actions="{ record }">
        <NuxtLink :to="`/admin/jottings/${record.id}`" class="text-primary hover:underline">
          View
        </NuxtLink>
      </template>
    </a-table>
  </div>
</template>
