<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 120)
  })
})
</script>

<template>
  <div class="bg-bg text-text overflow-x-hidden">

    <!-- HERO -->
    <section class="min-h-screen flex items-center justify-center px-6">
      <div class="max-w-5xl text-center reveal">
        <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Capture Ideas. <br />
          <span class="text-primary">Collaborate Smarter.</span>
        </h1>

        <p class="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto mb-10">
          Notivio is a modern academic jotting platform designed for
          <strong>BSc, MSc, and PhD students</strong>.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/auth/register"
            class="px-8 py-3 rounded-xl font-medium text-white"
            :style="{ backgroundColor: 'rgb(var(--primary))' }"
          >
            Get Started
          </NuxtLink>

          <NuxtLink
            to="/auth/login"
            class="px-8 py-3 rounded-xl font-medium border"
            :style="{
              color: 'rgb(var(--primary))',
              borderColor: 'rgb(var(--primary))'
            }"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- PURPOSE -->
    <section class="py-24 px-6 bg-surface">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div class="reveal">
          <h2 class="text-3xl font-bold mb-4">
            Why Notivio Exists
          </h2>
          <p class="opacity-80 leading-relaxed">
            Academic ideas are fragile. Notivio captures them
            and turns them into collaborative knowledge.
          </p>
        </div>

        <div class="reveal">
          <div
            class="p-8 rounded-3xl border shadow-lg bg-bg"
            :style="{ borderColor: 'rgb(var(--primary) / 0.2)' }"
          >
            <ul class="space-y-4">
              <li>✍️ Text, sketches & voice</li>
              <li>🤝 Collaboration</li>
              <li>🎓 Academic workflows</li>
              <li>🔐 Secure access</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-16 reveal">
          How It Works
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div
            v-for="(step, i) in [
              ['Register', 'Create your profile'],
              ['Onboarding', 'Choose theme'],
              ['Create', 'Write & sketch'],
              ['Collaborate', 'Invite others']
            ]"
            :key="i"
            class="reveal p-6 rounded-2xl border text-center bg-bg"
            :style="{ borderColor: 'rgb(var(--primary) / 0.15)' }"
          >
            <div
              class="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold"
              :style="{ backgroundColor: 'rgb(var(--primary))' }"
            >
              {{ i + 1 }}
            </div>
            <h3 class="font-semibold mb-2">{{ step[0] }}</h3>
            <p class="opacity-70">{{ step[1] }}</p>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 text-center">
      <div class="max-w-3xl mx-auto reveal">
        <h2 class="text-4xl font-bold mb-6">
          Ready to Start?
        </h2>

        <NuxtLink
          to="/auth/register"
          class="inline-block px-10 py-4 rounded-xl text-lg font-semibold text-white"
          :style="{ backgroundColor: 'rgb(var(--primary))' }"
        >
          Create Your Account
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}
.reveal.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
