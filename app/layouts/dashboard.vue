<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const { $api } = useNuxtApp()

definePageMeta({
  middleware: 'auth'
})

const userMenu = ref(false)

async function logout() {
  try {
    await $api('/auth/logout', { method: 'POST' })
  } catch {}
  router.push('/auth/login')
}
</script>

<template>
  <a-layout class="min-h-screen bg-[#f5f7fb]">

    <!-- HEADER -->
    <a-layout-header
      class="flex items-center justify-between px-6"
      style="background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.06)"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-lg flex items-center justify-center
                 text-white font-bold"
          style="background: var(--ant-primary-color)"
        >
          N
        </div>
        <span class="text-lg font-semibold">
          Notivio
        </span>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4">
        <a-button type="text" shape="circle">
          <Icon name="lucide:bell" />
        </a-button>

        <a-dropdown placement="bottomRight">
          <div class="flex items-center gap-2 cursor-pointer">
            <a-avatar src="https://i.pravatar.cc/40" />
            <span class="hidden sm:block font-medium">Me</span>
          </div>

          <template #overlay>
            <a-menu>
              <a-menu-item @click="router.push('/profile')">
                Profile
              </a-menu-item>
              <a-menu-item @click="router.push('/settings')">
                Settings
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item danger @click="logout">
                Logout
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>

    <!-- CONTENT -->
    <a-layout-content class="px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <slot />
      </div>
    </a-layout-content>

    <!-- FOOTER -->
    <a-layout-footer class="text-center text-xs opacity-60">
      © {{ new Date().getFullYear() }} Notivio — Think. Sketch. Remember.
    </a-layout-footer>

  </a-layout>
</template>
