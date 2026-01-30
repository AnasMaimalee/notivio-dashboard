<script setup lang="ts">
import { onMounted } from 'vue'
import { Button, Card, Typography, Divider } from 'ant-design-vue'

onMounted(() => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 120)
  })
})
</script>

<template>
  <div class="bg-bg text-text overflow-x-hidden">

    <!-- HERO -->
    <section class="min-h-screen flex flex-col items-center justify-center px-6 text-center py-20">
      <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 reveal">
        Capture Ideas. <br />
        <span class="text-primary">Collaborate Smarter.</span>
      </h1>

      <p class="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto mb-10 reveal">
        Notivio is a modern academic jotting platform designed for
        <strong>BSc, MSc, and PhD students</strong> to capture ideas, organize knowledge, and collaborate effortlessly.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center reveal">
        <Button type="primary" size="large" class="rounded-xl px-8 py-3">
          <NuxtLink to="/auth/register" class="text-white">Get Started</NuxtLink>
        </Button>

        <Button size="large" class="rounded-xl px-8 py-3 border border-primary text-primary">
          <NuxtLink to="/auth/login">Login</NuxtLink>
        </Button>
      </div>
    </section>

    <!-- PURPOSE / WHY -->
    <section class="py-24 px-6 bg-primary-bg">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div class="reveal">
          <Typography.Title level={2}>Why Notivio Exists</Typography.Title>
          <Typography.Paragraph class="opacity-80 leading-relaxed">
            Academic ideas are fragile. Notivio captures them and transforms them into collaborative knowledge.
            It's built to help students, researchers, and teams organize ideas, sketches, and notes in one secure place.
          </Typography.Paragraph>
        </div>

        <div class="reveal">
          <Card bordered={false} class="p-8 rounded-3xl shadow-lg">
            <ul class="space-y-4 text-lg">
              <li>✍️ Write notes, sketches & voice memos</li>
              <li>🤝 Collaborate in real-time</li>
              <li>🎓 Academic workflows & templates</li>
              <li>🔐 Private & secure storage</li>
            </ul>
          </Card>
        </div>

      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-24 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <Typography.Title level={2} class="reveal">How It Works</Typography.Title>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <Card
            v-for="(step, i) in [
              ['Register', 'Create your profile'],
              ['Onboarding', 'Choose theme & preferences'],
              ['Create', 'Write notes & sketches easily'],
              ['Collaborate', 'Invite teammates & share ideas']
            ]"
            :key="i"
            class="reveal text-center rounded-2xl p-6 shadow hover:shadow-lg transition"
            bordered={false}
          >
            <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold bg-primary text-lg">
              {{ i + 1 }}
            </div>
            <Typography.Title level={4} class="mb-2">{{ step[0] }}</Typography.Title>
            <Typography.Paragraph class="opacity-70">{{ step[1] }}</Typography.Paragraph>
          </Card>
        </div>
      </div>
    </section>

    <!-- CREATOR / MOTIVATION -->
    <section class="py-24 px-6 bg-primary-bg">
      <div class="max-w-5xl mx-auto text-center reveal">
        <Typography.Title level={2}>Meet the Creator</Typography.Title>
        <Typography.Paragraph class="opacity-80 mb-6">
          Notivio was created by a passionate academic and developer who wanted to make idea-capturing simple, beautiful, and collaborative.  
          The goal is to help students and researchers focus on creativity instead of messy notes.
        </Typography.Paragraph>

        <Card bordered={false} class="p-8 rounded-3xl shadow-lg max-w-xl mx-auto">
          <Typography.Title level={4}>The Reason Behind Notivio</Typography.Title>
          <Typography.Paragraph class="opacity-70">
            Many students lose ideas because traditional note-taking is scattered and hard to share.  
            Notivio organizes ideas, supports sketches, voice, and collaborative editing—all in one place.
          </Typography.Paragraph>
        </Card>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 text-center">
      <div class="max-w-3xl mx-auto reveal">
        <Typography.Title level={2}>Ready to Start?</Typography.Title>
        <Button type="primary" size="large" class="rounded-xl px-10 py-4 mt-4">
          <NuxtLink to="/auth/register" class="text-white">Create Your Account</NuxtLink>
        </Button>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}
.reveal.show {
  opacity: 1;
  transform: translateY(0);
}

/* Primary colors from theme */
.text-primary {
  color: var(--primary-color);
}
.bg-primary {
  background-color: var(--primary-color);
}
.bg-primary-bg {
  background-color: rgba(var(--primary-rgb), 0.05);
}
.border-primary {
  border-color: var(--primary-color);
}
</style>
