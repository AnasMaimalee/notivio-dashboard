<script setup lang="ts">
import { defineModel, ref, onMounted } from 'vue'

const block = defineModel<{ id: string; type: 'sketch'; data: string | null }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  const canvas = canvasRef.value!
  canvas.width = 600
  canvas.height = 400
  ctx = canvas.getContext('2d')!

  if (block.data) {
    const img = new Image()
    img.src = block.data
    img.onload = () => ctx!.drawImage(img, 0, 0)
  }
})

function start(e: MouseEvent) {
  ctx!.beginPath()
  ctx!.moveTo(e.offsetX, e.offsetY)
  canvasRef.value!.addEventListener('mousemove', draw)
}

function draw(e: MouseEvent) {
  ctx!.lineTo(e.offsetX, e.offsetY)
  ctx!.stroke()
  block.data = canvasRef.value!.toDataURL()
}

function stop() {
  canvasRef.value!.removeEventListener('mousemove', draw)
}

function clearCanvas() {
  ctx!.clearRect(0, 0, 600, 400)
  block.data = null
}
</script>

<template>
  <canvas
    ref="canvasRef"
    @mousedown="start"
    @mouseup="stop"
    @mouseleave="stop"
    class="rounded-xl border border-primary/20 bg-surface"
  />
  <button @click="clearCanvas">Clear</button>
</template>
