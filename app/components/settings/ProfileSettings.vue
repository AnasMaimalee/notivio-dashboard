<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({
  name: '',
  email: ''
})
const { $api } = useNuxtApp()

onMounted(async () => {
  try {
    const res = await $api('/profile')
    form.name = res.name
    form.email = res.email
  } catch (e) {
    console.error(e)
  }
})

async function updateProfile() {
  try {
    await $api('/profile', {
      method: 'PUT',
      body: form
    })
    alert('Profile updated!')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="bg-surface p-6 rounded-2xl border border-primary/10 space-y-4">
    <h2 class="text-xl font-semibold">Profile Info</h2>
    <input v-model="form.name" placeholder="Name" class="input" />
    <input v-model="form.email" placeholder="Email" class="input" type="email" />
    <button @click="updateProfile" class="btn-primary w-full">Update Profile</button>
  </div>
</template>
