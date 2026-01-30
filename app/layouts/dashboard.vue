<script setup lang="ts">
import { ref, watch } from 'vue'

const colorMode = useColorMode()
const { $applyTheme, $api } = useNuxtApp()
const router = useRouter()

definePageMeta({
    layouts: 'default',
    middleware: 'auth'
})
// theme comes from backend (login / refresh / store)
const theme = useState<any>('theme')
const showMenu = ref(false)

watch(
  () => colorMode.value,
  (mode) => {
    if (theme.value) {
      $applyTheme(theme.value, mode)
    }
  },
  { immediate: true }
)

function toggleTheme() {
  colorMode.preference =
    colorMode.value === 'dark' ? 'light' : 'dark'
}

async function logout() {
  try {
    await $api('/auth/logout', { method: 'POST' })
  } finally {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-300
           bg-bg text-text"
  >

    <!-- Header -->
    <header
      class="sticky top-0 z-50 backdrop-blur-xl
             bg-surface/80 border-b border-primary/10"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <!-- Brand -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl
                   bg-primary text-white
                   flex items-center justify-center
                   font-bold shadow-lg"
          >
            N
          </div>
          <span class="text-lg font-semibold tracking-tight">
            Notivio
          </span>
        </div>

        <!-- Nav -->
        <nav class="hidden md:flex gap-6 text-sm font-medium">
          <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
          <NuxtLink to="/jottings" class="hover:text-primary">Jottings</NuxtLink>
          <NuxtLink to="/shared" class="hover:text-primary">Shared</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4 relative">

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-primary/10 transition"
          >
            <Icon
              :name="colorMode.value === 'dark'
                ? 'lucide:sun'
                : 'lucide:moon'"
              class="w-5 h-5"
            />
          </button>

          <!-- Notifications -->
          <button
            class="relative p-2 rounded-full hover:bg-primary/10 transition"
          >
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span
              class="absolute top-1 right-1 w-2 h-2
                     bg-secondary rounded-full"
            />
          </button>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="showMenu = !showMenu"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full
                     hover:bg-primary/10 transition"
            >
              <img
                src="https://i.pravatar.cc/40"
                class="w-8 h-8 rounded-full border border-primary/20"
              />
              <span class="hidden sm:block text-sm font-medium">
                Me
              </span>
              <Icon name="lucide:chevron-down" class="w-4 h-4 opacity-60" />
            </button>

            <!-- Dropdown -->
            <div
              v-if="showMenu"
              @click.outside="showMenu = false"
              class="absolute right-0 mt-3 w-44 rounded-xl
                     bg-surface border border-primary/10
                     shadow-xl overflow-hidden"
            >
              <NuxtLink
                to="/profile"
                class="flex items-center gap-2 px-4 py-2 text-sm
                       hover:bg-primary/10"
              >
                <Icon name="lucide:user" class="w-4 h-4" />
                Profile
              </NuxtLink>

              <NuxtLink
                to="/settings"
                class="flex items-center gap-2 px-4 py-2 text-sm
                       hover:bg-primary/10"
              >
                <Icon name="lucide:settings" class="w-4 h-4" />
                Settings
              </NuxtLink>

              <div class="border-t border-primary/10" />

              <button
                @click="logout"
                class="w-full flex items-center gap-2 px-4 py-2 text-sm
                       text-red-500 hover:bg-red-500/10"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

        </div>

      </div>
    </header>

    <!-- Main -->
    <main class="max-w-6xl mx-auto px-6 py-10">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-6 text-center text-xs opacity-70">
      © {{ new Date().getFullYear() }} Notivio — Think. Sketch. Remember.
    </footer>

  </div>
</template>
