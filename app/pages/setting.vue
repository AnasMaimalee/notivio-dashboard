<script setup lang="ts">
import UpdatePassword from '@/components/settings/UpdatePassword.vue'
import BiometricSettings from '@/components/settings/BiometricSettings.vue'
import ProfileSettings from '@/components/settings/ProfileSettings.vue'
import ThemeSettings from '@/components/settings/ThemeSettings.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-12">
    <h1 class="text-3xl font-bold text-center text-text">Settings</h1>

    <!-- Profile Section -->
    <ProfileSettings />

    <!-- Password Section -->
    <UpdatePassword />

    <!-- Biometric Section -->
    <BiometricSettings />

    <!-- Theme Section -->
    <ThemeSettings />
  </div>
</template>
