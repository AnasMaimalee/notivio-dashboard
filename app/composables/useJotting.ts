export const useJotting = () => {
  const createJotting = async (blocks: any[]) => {
    return await $fetch('/api/jottings', {
      method: 'POST',
      body: {
        title: 'Untitled',
        items: blocks.map(b => ({
          type: b.type,
          content: b.content ?? null,
          metadata: b.metadata ?? null
        }))
      }
    })
  }

  return { createJotting }
}
