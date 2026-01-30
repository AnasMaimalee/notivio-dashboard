<script setup lang="ts">
const props = defineProps<{ id: string }>()
const { $api } = useNuxtApp()

async function accept() {
  await $api(`/api/contributions/${props.id}/accept`, { method: 'POST' })
  navigateTo('/inbox')
}

async function reject() {
  await $api(`/api/contributions/${props.id}/reject`, { method: 'POST' })
  navigateTo('/inbox')
}
</script>

<template>
  <div class="flex gap-4">
    <button @click="accept" class="btn-primary">
      Accept & Merge
    </button>
    <button @click="reject" class="btn-danger">
      Reject
    </button>
  </div>
</template>
