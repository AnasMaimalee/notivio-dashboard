<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const analytics = ref<any[]>([])

async function fetchAnalytics() {
  analytics.value = await $api('/admin/analytics')
}

fetchAnalytics()
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Analytics" back />

    <section v-if="!analytics.length" class="opacity-60">No analytics data yet</section>
    <section v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in analytics"
        :key="item.id"
        class="rounded-2xl bg-surface p-5 border border-primary/10"
      >
        <h3 class="font-semibold">{{ item.title }}</h3>
        <p class="text-2xl mt-2">{{ item.value }}</p>
      </div>
    </section>
  </div>
</template>
