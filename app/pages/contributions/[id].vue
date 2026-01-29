<script setup lang="ts">
import ContributionEditor from '@/components/contribution/ContributionEditor.vue'

const route = useRoute()
const loading = ref(true)
const contribution = ref<any>(null)

onMounted(async () => {
  contribution.value = await $fetch(`/api/contributions/${route.params.id}`)
  loading.value = false
})

async function submit() {
  await $fetch(`/api/contributions/${route.params.id}/submit`, {
    method: 'POST'
  })
  navigateTo('/shared')
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <div v-if="loading">Loading…</div>

    <template v-else>
      <h1 class="text-2xl font-semibold">
        Contribute to Jotting
      </h1>

      <ContributionEditor
        v-model="contribution.items"
      />

      <button
        @click="submit"
        class="w-full py-3 rounded-xl
               bg-primary text-white font-semibold"
      >
        Send Back to Owner
      </button>
    </template>
  </div>
</template>
