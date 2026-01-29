<script setup lang="ts">
const { $api } = useNuxtApp()

/**
 * Fetch jottings from backend
 * Expected endpoint: GET /jottings
 */
const { data, pending, error } = await useAsyncData('jottings', () =>
  $api('/jottings')
)

const jottings = computed(() => data.value?.data ?? [])
</script>

<template>
  <!-- Loading -->
  <div v-if="pending" class="opacity-60">
    Loading your jottings…
  </div>

  <!-- Error -->
  <div v-else-if="error" class="text-red-500">
    Failed to load jottings
  </div>

  <!-- Empty -->
  <div
    v-else-if="!jottings.length"
    class="opacity-60 text-center py-12"
  >
    No jottings yet — create your first one ✨
  </div>

  <!-- List -->
  <div
    v-else
    class="grid gap-6 md:grid-cols-2"
  >
    <NuxtLink
      v-for="j in jottings"
      :key="j.id"
      :to="`/jottings/${j.id}`"
      class="group bg-surface p-6 rounded-2xl
             border border-primary/10
             hover:border-primary/40 transition"
    >
      <h3 class="font-semibold text-lg group-hover:text-primary">
        {{ j.title || 'Untitled Jotting' }}
      </h3>

      <p class="text-sm opacity-70 mt-2">
        Updated {{ new Date(j.updated_at).toLocaleString() }}
      </p>
    </NuxtLink>
  </div>
</template>
