<template>
  <div class="resume-editor" :class="{ htmlMode: enableHtml }" ref="containerRef">
    <div v-if="enableHtml" class="content" v-html="htmlContent"></div>
    <pre v-else class="raw">{{ markdown }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'

interface Props {
  markdown: string
  enableHtml: boolean
}

const props = defineProps<Props>()
const containerRef = ref<HTMLDivElement>()

const htmlContent = computed(() => {
  return marked(props.markdown, { async: false }) as string
})

const goBottom = () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}

const goTop = () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
  }
}

defineExpose({ goBottom, goTop })
</script>

<style>
.raw {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.content {
  padding: 1.5em;
}

.content h2 {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
  color: #333;
}

.content ul,
.content ol {
  list-style: none;
  padding-left: 0;
}

.content ul > li::before {
  content: '•';
  margin-right: .5em;
  color: #666;
}

.content ol {
  counter-reset: section;
}

.content ol li::before {
  counter-increment: section;
  content: counters(section, '.') ' ';
  margin-right: .5em;
  color: #666;
}

.content blockquote {
  margin: 1em;
  padding: .5em;
  background: #f5f5f5;
  border-left: 4px solid #ddd;
}

.content a {
  color: #0366d6;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

.htmlMode {
  animation: flip 2s;
}

@keyframes flip {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
