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

// Dummy reviews fixture with avatars
const reviews = [
  { name: 'Sarah L.', avatar: 'https://i.pravatar.cc/100?img=32', text: "Notivio changed how I take notes. It's intuitive and collaborative!", rating: 5 },
  { name: 'James T.', avatar: 'https://i.pravatar.cc/100?img=33', text: "The best tool for organizing academic projects. Highly recommend.", rating: 4 },
  { name: 'Maria K.', avatar: 'https://i.pravatar.cc/100?img=34', text: "Finally, a platform that lets me sketch, write, and collaborate in one place.", rating: 5 },
  { name: 'David P.', avatar: 'https://i.pravatar.cc/100?img=35', text: "Perfect for research groups. Easy, clean, and effective.", rating: 4 },
  { name: 'Emma W.', avatar: 'https://i.pravatar.cc/100?img=36', text: "Love the design and how simple it is to share ideas.", rating: 5 },
  { name: 'Lucas H.', avatar: 'https://i.pravatar.cc/100?img=37', text: "A must-have tool for students and academics.", rating: 5 },
]

onMounted(() => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 150)
  })
})
</script>

<template>

  <div class="relative bg-bg text-text overflow-x-hidden">
    <div class="floating-objects">
    <img src="https://img.icons8.com/emoji/48/000000/pencil-emoji.png" class="floating-object pencil" />
    <img src="https://img.icons8.com/emoji/48/000000/notebook-emoji.png" class="floating-object notebook" />
    <img src="https://img.icons8.com/emoji/48/000000/microphone-emoji.png" class="floating-object recorder" />
    <img src="https://img.icons8.com/emoji/48/000000/crayon-emoji.png" class="floating-object crayon" />
    <img src="https://img.icons8.com/emoji/48/000000/paper-emoji.png" class="floating-object paper" />
    </div>

    <!-- HERO -->
    <section class="min-h-screen flex flex-col items-center justify-center px-6 text-center py-20 reveal-section">
      <!-- Floating objects container -->
      <div class="floating-objects"></div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 reveal mx-auto text-center">
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
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center text-center"> 
        <div class="reveal mx-auto"> 
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center mx-auto"> 
            Why <span class="text-primary">Notivio</span> Exists 
          </h2> 
          <p class="text-base sm:text-lg md:text-xl opacity-80 leading-relaxed mx-auto max-w-xl"> 
            Academic ideas are fragile. 
            <span class="text-primary">Notivio</span> captures them and transforms them into collaborative knowledge. It's built to help students, researchers, and teams organize ideas, sketches, and notes in one secure place. 
          </p> 
        </div> 
        <div class="reveal mx-auto"> 
          <Card bordered={false} class="p-8 rounded-3xl shadow-lg bg-primary-light/20 mx-auto max-w-sm"> 
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
      <div class="max-w-6xl mx-auto text-center"> 
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 reveal text-center mx-auto"> How 
          <span class="text-primary">It Works</span> 
        </h2> 
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
          <Card v-for="(step, i) in [ ['Register', 'Create your profile'], ['Create', 'Write notes & sketches easily'], ['Collaborate', 'Invite teammates & share ideas'] ]" 
                :key="i" 
                class="reveal text-center rounded-2xl p-6 shadow hover:shadow-lg transition bg-primary-light/20 mx-auto" 
                bordered={false} 
          > 
            <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold bg-primary text-lg"> {{ i + 1 }} </div> 
            <h3 class="font-semibold mb-2">{{ step[0] }}</h3> 
            <p class="opacity-70">{{ step[1] }}</p> 
          </Card> 
        </div> 
      </div> 
    </section>

    <!-- FEATURES / TOOLS -->
    <section class="py-24 px-6 reveal-section relative bg-primary-bg">
      <div class="floating-objects"></div>
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 reveal">
          Academic <span class="text-primary">Tools</span> You Need
        </h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="reveal rounded-2xl shadow-lg p-6 bg-primary-light/20 mx-auto" bordered={false}>
            <h3 class="font-semibold mb-2 text-lg">Voice Notes</h3>
            <p class="opacity-80">Record and attach voice memos to your notes for richer context.</p>
          </Card>
          <Card class="reveal rounded-2xl shadow-lg p-6 bg-primary-light/20 mx-auto" bordered={false}>
            <h3 class="font-semibold mb-2 text-lg">Sketchpad</h3>
            <p class="opacity-80">Draw sketches directly in your notes to capture ideas visually.</p>
          </Card>
          <Card class="reveal rounded-2xl shadow-lg p-6 bg-primary-light/20 mx-auto" bordered={false}>
            <h3 class="font-semibold mb-2 text-lg">Templates</h3>
            <p class="opacity-80">Use pre-built templates for academic workflows and group projects.</p>
          </Card>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section class="py-24 px-6 bg-primary-bg reveal-section relative">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 reveal mx-auto text-center">
          What <span class="text-primary">Users Say</span>
        </h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            v-for="(review, i) in reviews"
            :key="i"
            class="reveal rounded-2xl shadow-lg p-6 bg-primary-light/10 mx-auto max-w-sm"
            bordered={false}
          >
            <div class="flex items-center justify-center mb-4 gap-3">
              <img :src="review.avatar" class="w-12 h-12 rounded-full border border-primary/20" />
              <span class="font-semibold text-primary">{{ review.name }}</span>
            </div>
            <p class="mb-2 text-base sm:text-lg md:text-base">{{ review.text }}</p>
            <Rate :disabled="true" :default-value="review.rating" class="mb-2 review-star" style="color: yellow;"/>
          </Card>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="py-24 px-6 reveal-section relative">
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

    <!-- FOOTER -->
    <footer class="bg-primary-bg py-12 mt-12 relative overflow-hidden">
    <div class="max-w-6xl mx-auto text-center">
        <h3 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4">About & Contact</h3>
        <p class="opacity-80 mb-6">
        Full Stack Developer – <strong>Anas Maimalee</strong>
        </p>

        <!-- Social Links Centered -->
        <div class="flex flex-wrap justify-center items-center gap-4 mb-6">
        <!-- Twitter -->
        <a href="https://twitter.com/anasmaimalee" target="_blank" rel="noopener" 
            class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-lg transition-all duration-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter
        </a>

        <!-- LinkedIn -->
        <a href="https://linkedin.com/in/anas-abdussalam-91a66a374" target="_blank" rel="noopener" 
            class="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl shadow-lg transition-all duration-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
        </a>

        <!-- GitHub -->
        <a href="https://github.com/anasmaimalee" target="_blank" rel="noopener" 
            class="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-2xl shadow-lg transition-all duration-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.176.768.84 1.236 1.911 1.236 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
        </a>

        <!-- Gmail -->
        <a href="mailto:anasment6@gmail.com" 
            class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl shadow-lg transition-all duration-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Gmail
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/2348123442014" target="_blank" rel="noopener" 
            class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow-lg transition-all duration-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            WhatsApp
        </a>
        </div>

        <p class="opacity-60 text-sm">© 2026 Notivio. All rights reserved.</p>
    </div>
    </footer>
  </div>
</template>
<style scoped>
/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}
.reveal.show {
  opacity: 1;
  transform: translateY(0);
}

/* Scoped deep selector for Ant Design Vue Rate stars */
::v-deep(.review-star) .ant-rate-star,
::v-deep(.review-star) .ant-rate-star-full,
::v-deep(.review-star) .ant-rate-star-half,
::v-deep(.review-star) .ant-rate-star-zero {
  color: #FFD700 !important; /* Gold/yellow stars */
  fill: #FFD700 !important;  /* For SVG fill */
}


/* Scoped deep selector for Ant Design Vue Rate stars */
::v-deep(.review-star .ant-rate-star-full),
::v-deep(.review-star .ant-rate-star-half) {
  color: #FFD700 !important; /* Gold/yellow */
}

/* Primary colors */
.text-primary { color: var(--primary-color); }
.bg-primary { background-color: var(--primary-color); }
.bg-primary-bg { background-color: rgba(var(--primary-rgb), 0.05); }
.border-primary { border-color: var(--primary-color); }

/* Cards background */
.bg-primary-light { background-color: rgba(var(--primary-rgb), 0.15); }

/* Yellow stars for reviews */
.ant-rate-star .ant-rate-star-full { color: #FFD700 !important; }
.ant-rate-star .ant-rate-star-half { color: #FFD700 !important; }

/* Floating objects container */
.floating-objects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: visible;
  z-index: -1;
}

/* Each floating object */
.floating-object {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.8;
  animation: floatObj linear infinite;
}

/* Different speeds and positions */
.floating-object.pencil { top: 10%; left: 20%; animation-duration: 15s; }
.floating-object.notebook { top: 40%; left: 70%; animation-duration: 20s; }
.floating-object.recorder { top: 60%; left: 30%; animation-duration: 18s; }
.floating-object.crayon { top: 80%; left: 50%; animation-duration: 22s; }
.floating-object.paper { top: 25%; left: 40%; animation-duration: 17s; }

/* Animation movement */
@keyframes floatObj {
  0% { transform: translateY(0) rotate(0deg);}
  50% { transform: translateY(-30px) rotate(15deg);}
  100% { transform: translateY(0) rotate(0deg);}
}
</style>
