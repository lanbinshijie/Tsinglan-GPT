<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'
import { useAuthStore } from '@/store'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-bold">
        Version - {{ pkg.version }}
      </h2>
      <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
        <p>
          欢迎使用ChatGPT清澜山学校版本。本版本由学生搭建并维护，只能用于经过维护人员审批的Capstone等学术项目的研究用途，严禁他用！用户使用前需要向邮箱 <a
            class="text-blue-600 dark:text-blue-500"
            href="mailto:chengweisun@tsinglan.cn"
            target="_blank"
          >
          chengweisun@tsinglan.cn
          </a>
          提出正式的使用申请，经过批准后方可使用。
        </p>
        <p>
          如果你觉得此项目对你有帮助或有任何建议，请发送邮件致20270244@tsinglan.cn
        </p>
      </div>
      <p>{{ $t("setting.api") }}：{{ config?.apiModel === "ChatGPTAPI" ? 'API接口' : '付费使用量' }}</p>
      <p v-if="isChatGPTAPI">
        {{ $t("setting.monthlyUsage") }}：{{ config?.usage ?? '-' }}
      </p>
      <p v-if="!isChatGPTAPI">
        {{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}
      </p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}ms</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-'}}</p>
      <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>
    </div>
  </NSpin>
</template>
