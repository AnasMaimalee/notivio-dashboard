<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button, Card, Input, Form, Rate } from 'ant-design-vue'
import { MailOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons-vue'

const name = ref('')
const email = ref('')
const message = ref('')
const submitForm = () => {
  console.log({ name: name.value, email: email.value, message: message.value })
  alert('Message submitted! Thank you.')
  name.value = ''
  email.value = ''
  message.value = ''
}

// Random reviews fixture
const reviews = [
  { name: 'Sarah L.', text: "Notivio changed how I take notes. It's intuitive and collaborative!", rating: 5 },
  { name: 'James T.', text: "The best tool for organizing academic projects. Highly recommend.", rating: 4 },
  { name: 'Maria K.', text: "Finally, a platform that lets me sketch, write, and collaborate in one place.", rating: 5 },
  { name: 'David P.', text: "Perfect for research groups. Easy, clean, and effective.", rating: 4 },
  { name: 'Emma W.', text: "Love the design and how simple it is to share ideas.", rating: 5 },
  { name: 'James T.', text: "The best tool for organizing academic projects. Highly recommend.", rating: 4 },

]

onMounted(() => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 150)
  })
})
</script>

<template>
  <div class="relative bg-bg text-text overflow-x-hidden">

    <!-- HERO -->
    <section class="min-h-screen flex flex-col items-center justify-center px-6 text-center py-20 reveal-section">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 reveal text-center mx-auto">
        Capture Ideas. <br />
        <span class="text-primary">Collaborate Smarter.</span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10 reveal text-center">
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
    <section class="py-24 px-6 bg-primary-bg relative reveal-section">
      <div class="absolute -z-10 w-full h-full overflow-hidden">
        <div class="animated-bg"></div>
      </div>
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center text-center">
        <div class="reveal mx-auto">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center mx-auto">
            Why <span class="text-primary">Notivio</span> Exists
          </h2>
          <p class="text-base sm:text-lg md:text-xl opacity-80 leading-relaxed mx-auto max-w-xl">
            Academic ideas are fragile. <span class="text-primary">Notivio</span> captures them and transforms them into collaborative knowledge.
            It's built to help students, researchers, and teams organize ideas, sketches, and notes in one secure place.
          </p>
        </div>

        <div class="reveal mx-auto">
          <Card bordered={false} class="p-8 rounded-3xl shadow-lg bg-primary/10 mx-auto max-w-sm">
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
    <section class="py-24 px-6 reveal-section relative">
      <div class="absolute -z-10 w-full h-full overflow-hidden">
        <div class="animated-bg"></div>
      </div>
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 reveal text-center mx-auto">
          How <span class="text-primary">It Works</span>
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="(step, i) in [
              ['Register', 'Create your profile'],
              ['Create', 'Write notes & sketches easily'],
              ['Collaborate', 'Invite teammates & share ideas']
            ]"
            :key="i"
            class="reveal text-center rounded-2xl p-6 shadow hover:shadow-lg transition bg-primary/10 mx-auto"
            bordered={false}
          >
            <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold bg-primary text-lg">
              {{ i + 1 }}
            </div>
            <h3 class="font-semibold mb-2">{{ step[0] }}</h3>
            <p class="opacity-70">{{ step[1] }}</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section class="py-24 px-6 bg-primary-bg reveal-section relative">
      <div class="absolute -z-10 w-full h-full overflow-hidden">
        <div class="animated-bg"></div>
      </div>
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 reveal mx-auto text-center">
          What <span class="text-primary">Users Say</span>
        </h2>

        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          <Card v-for="(review, i) in reviews" :key="i" class="reveal rounded-2xl shadow-lg p-6 bg-primary/10 mx-auto max-w-sm" bordered={false}>
            <p class="mb-2 text-base sm:text-lg md:text-base">{{ review.text }}</p>
            <Rate :disabled="true" :default-value="review.rating" class="mb-2" />
            <p class="text-primary font-semibold mt-2">— {{ review.name }}</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- COMMENT / CONTACT FORM -->
    <section class="py-24 px-6 reveal-section relative">
      <div class="absolute -z-10 w-full h-full overflow-hidden">
        <div class="animated-bg"></div>
      </div>
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 reveal text-center mx-auto">
          Send <span class="text-primary">Us a Message</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl opacity-80 mb-8 reveal">
          Have questions or feedback? Let us know!
        </p>

        <a-form layout="vertical" class="space-y-4 reveal" @submit.prevent="submitForm">
          <a-form-item label="Full Name" required>
            <a-input v-model:value="name" placeholder="Your full name" />
          </a-form-item>

          <a-form-item label="Email" required>
            <a-input v-model:value="email" placeholder="Your email" type="email" />
          </a-form-item>

          <a-form-item label="Message" required>
            <a-textarea v-model:value="message" rows="5" placeholder="Your message" />
          </a-form-item>

          <Button type="primary" html-type="submit" size="large">Submit</Button>
        </a-form>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 text-center reveal-section">
      <div class="max-w-3xl mx-auto reveal">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
        <Button type="primary" size="large" class="rounded-xl px-10 py-4 mt-4">
          <NuxtLink to="/auth/register" class="text-white">Create Your Account</NuxtLink>
        </Button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-primary-bg py-12 mt-12 relative overflow-hidden">
      <div class="absolute -z-10 w-full h-full footer-bg"></div>
      <div class="max-w-6xl mx-auto text-center">
        <h3 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4">About & Contact</h3>
        <p class="opacity-80 mb-4">
          Full Stack Developer – <strong>Anas Maimalee</strong>
        </p>

        <div class="flex justify-center gap-6 mb-6 text-primary text-2xl">
          <a href="mailto:your-email@gmail.com" target="_blank" class="hover:text-primary/80 transition"><MailOutlined /></a>
          <a href="https://github.com/your-github" target="_blank" class="hover:text-primary/80 transition"><GithubOutlined /></a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" class="hover:text-primary/80 transition"><LinkedinOutlined /></a>
        </div>

        <p class="opacity-60 text-sm">
          © 2026 Notivio. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Reveal animation from bottom */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}
.reveal.show {
  opacity: 1;
  transform: translateY(0);
}
.reveal-section {
  overflow: hidden;
}

/* Primary colors */
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

/* Floating animated background for sections except first */
.animated-bg, .footer-bg {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb),0.15), transparent 40%),
              radial-gradient(circle at 70% 70%, rgba(var(--primary-rgb),0.2), transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb),0.1), transparent 60%);
  animation: floatBg 20s linear infinite;
}

@keyframes floatBg {
  0% { transform: translate(0,0) rotate(0deg);}
  50% { transform: translate(30px,50px) rotate(180deg);}
  100% { transform: translate(0,0) rotate(360deg);}
}
</style>
