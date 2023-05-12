import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'

// type ScrollElement = HTMLDivElement | null

interface ScrollReturn {
  scrollRef: Ref<HTMLDivElement | null>
  scrollToBottom: () => Promise<void>
  scrollToTop: () => Promise<void>
  scrollToBottomIfAtBottom: () => Promise<void>
}

export function useScroll(): ScrollReturn {
  const scrollRef = ref<HTMLDivElement | null>(null)  // 设置初始值为 null

  const scrollToBottom = async () => {
    await nextTick()
    if (scrollRef.value !== null)
      (scrollRef.value as HTMLDivElement).scrollTop = scrollRef.value.scrollHeight
  }
  
  const scrollToTop = async () => {
    await nextTick()
    if (scrollRef.value !== null)
      (scrollRef.value as HTMLDivElement).scrollTop = 0
  }
  
  const scrollToBottomIfAtBottom = async () => {
    await nextTick()
    if (scrollRef.value !== null) {
      const threshold = 100 // 阈值，表示滚动条到底部的距离阈值
      const distanceToBottom = (scrollRef.value as HTMLDivElement).scrollHeight - (scrollRef.value as HTMLDivElement).scrollTop - (scrollRef.value as HTMLDivElement).clientHeight
      if (distanceToBottom <= threshold)
        (scrollRef.value as HTMLDivElement).scrollTop = (scrollRef.value as HTMLDivElement).scrollHeight
    }
  }

  return {
    // @ts-ignore
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  }
}
