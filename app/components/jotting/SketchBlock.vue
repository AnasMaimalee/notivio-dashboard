<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  block: {
    data: string | null
  }
}>()

const emit = defineEmits<{
  (e: 'update', value: string | null): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let drawing = false

onMounted(() => {
  const canvas = canvasRef.value!
  canvas.width = 600
  canvas.height = 400
  ctx = canvas.getContext('2d')!

  if (props.block.data) {
    const img = new Image()
    img.src = props.block.data
    img.onload = () => ctx!.drawImage(img, 0, 0)
  }
})

function start(e: MouseEvent) {
  drawing = true
  ctx!.beginPath()
  ctx!.moveTo(e.offsetX, e.offsetY)
}

function draw(e: MouseEvent) {
  if (!drawing) return
  ctx!.lineTo(e.offsetX, e.offsetY)
  ctx!.stroke()
}

function stop() {
  if (!drawing) return
  drawing = false
  emit('update', canvasRef.value!.toDataURL())
}

function clearCanvas() {
  ctx!.clearRect(0, 0, 600, 400)
  emit('update', null)
}
</script>

<template>
  <div class="space-y-3">
    <canvas
      ref="canvasRef"
      @mousedown="start"
      @mousemove="draw"
      @mouseup="stop"
      @mouseleave="stop"
      class="rounded-xl border border-primary/20 bg-surface"
    />

    <button
      type="button"
      @click="clearCanvas"
      class="text-sm opacity-60 hover:opacity-100"
    >
      Clear sketch
    </button>
  </div>
</template>
