<script setup lang="ts">
import { computed } from 'vue'
import { useNuxtApp } from '#app'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { $api } = useNuxtApp()

const { data, error } = await useAsyncData(
  'user-dashboard',
  () => $api('/user/dashboard')
)

const stats = computed(() => [
  {
    title: 'My Jottings',
    value: data.value?.stats?.my_jottings ?? 0,
    icon: 'lucide:file-text',
  },
  {
    title: 'My Courses',
    value: data.value?.stats?.my_courses ?? 0,
    icon: 'lucide:book-open',
  },
  {
    title: 'Shared With Me',
    value: data.value?.stats?.shared_with_me ?? 0,
    icon: 'lucide:users',
  },
])

const recentJottings = computed(() => data.value?.recent_jottings || [])
const recentActivity = computed(() => data.value?.recent_activity || [])
</script>

<template>
  <div class="p-5 sm:p-1">

    <!-- HERO -->
    <a-card :bordered="false" style="margin-bottom: 24px">
      <div
        style="display:flex; align-items:center; justify-content:space-between; gap:16px"
      >
        <div>
          <div class="lg:text-lg sm:text-xs" style="margin-bottom:0">
            Welcome back 👋
          </div>
          <a-typography-text type="secondary">
            Pick up where you left off.
          </a-typography-text>
        </div>

        <NuxtLink to="/jottings/create">
          <a-button type="primary" size="large">
            <template #icon>
              <Icon name="lucide:plus" />
            </template>
            New Jotting
          </a-button>
        </NuxtLink>
      </div>
    </a-card>

    <!-- STATS -->
    <a-row :gutter="16" style="margin-bottom:24px">
      <a-col
        v-for="s in stats"
        :key="s.title"
        :xs="24"
        :sm="8"
      >
        <a-card :bordered="false">
          <div style="display:flex; align-items:center; gap:16px">
            <a-avatar size="large">
              <Icon :name="s.icon" />
            </a-avatar>

            <div>
              <a-typography-text type="secondary">
                {{ s.title }}
              </a-typography-text>
              <a-typography-title :level="3" style="margin:0">
                {{ s.value }}
              </a-typography-title>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- CONTENT -->
    <a-row :gutter="16">

      <!-- RECENT JOTTINGS -->
      <a-col :xs="24" :lg="12">
        <a-card title="Recent Jottings" :bordered="false">
          <a-list
            v-if="recentJottings.length"
            :data-source="recentJottings"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <NuxtLink :to="`/jottings/${item.id}`">
                  {{ item.title }}
                </NuxtLink>
                <template #actions>
                  <span>
                    {{ new Date(item.updated_at).toLocaleDateString() }}
                  </span>
                </template>
              </a-list-item>
            </template>
          </a-list>

          <a-typography-text v-else type="secondary">
            No jottings yet.
          </a-typography-text>
        </a-card>
      </a-col>

      <!-- ACTIVITY -->
      <a-col :xs="24" :lg="12">
        <a-card title="Recent Activity" :bordered="false">
          <a-list
            v-if="recentActivity.length"
            :data-source="recentActivity"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                {{ item.action }}
                <template #actions>
                  <span>
                    {{ new Date(item.created_at).toLocaleDateString() }}
                  </span>
                </template>
              </a-list-item>
            </template>
          </a-list>

          <a-typography-text v-else type="secondary">
            No activity yet.
          </a-typography-text>
        </a-card>
      </a-col>

    </a-row>

    <!-- ERROR -->
    <a-alert
      v-if="error"
      type="error"
      message="Failed to load dashboard data"
      show-icon
      style="margin-top:24px"
    />

  </div>
</template>
