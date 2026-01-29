<script setup lang="ts">
const model = defineModel<string | null>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let drawing = false

onMounted(() => {
  const canvas = canvasRef.value!
  canvas.width = 600
  canvas.height = 400

  ctx = canvas.getContext('2d')!
  ctx.lineWidth = 3
  ctx.lineCap = 'round'

  // restore if exists
  if (model.value) {
    const img = new Image()
    img.src = model.value
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
  drawing = false
  model.value = canvasRef.value!.toDataURL('image/png')
}

function clearCanvas() {
  ctx!.clearRect(0, 0, 600, 400)
  model.value = null
}
</script>

<template>
  <div class="space-y-3">
    <canvas
      ref="canvasRef"
      class="rounded-xl border border-primary/20 bg-surface"
      @mousedown="start"
      @mousemove="draw"
      @mouseup="stop"
      @mouseleave="stop"
    />

    <button
      @click="clearCanvas"
      class="text-sm text-primary hover:underline"
    >
      Clear sketch
    </button>
  </div>
</template>
