<script setup lang="ts">
const inbox = ref<any[]>([])
const { $api } = useNuxtApp()

onMounted(async () => {
  inbox.value = await $api('/api/contributions/inbox')
})
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <h1 class="text-2xl font-semibold">Incoming Contributions</h1>

    <div
      v-for="c in inbox"
      :key="c.id"
      class="p-5 bg-surface rounded-2xl
             border border-primary/10"
    >
      <p class="font-medium">
        From {{ c.contributor.name }}
      </p>

      <NuxtLink
        :to="`/contributions/${c.id}?preview=1`"
        class="text-primary text-sm"
      >
        Review contribution
      </NuxtLink>
    </div>
  </div>
</template>
