<script setup lang="ts">
const colorMode = useColorMode()
const { $applyTheme } = useNuxtApp()

// theme comes from backend (login / refresh / store)
const theme = useState<any>('theme')

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
        <div class="flex items-center gap-4">

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full
                   hover:bg-primary/10 transition"
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
            class="relative p-2 rounded-full
                   hover:bg-primary/10 transition"
          >
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span
              class="absolute top-1 right-1 w-2 h-2
                     bg-secondary rounded-full"
            />
          </button>

          <!-- Profile -->
          <NuxtLink
            to="/profile"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full
                   hover:bg-primary/10 transition"
          >
            <img
              src="https://i.pravatar.cc/40"
              class="w-8 h-8 rounded-full
                     border border-primary/20"
            />
            <span class="hidden sm:block text-sm font-medium">
              Me
            </span>
          </NuxtLink>
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
