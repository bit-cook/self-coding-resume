<template>
  <div class="style-editor" ref="containerRef">
    <div class="code" v-html="codeInStyleTag"></div>
    <pre class="highlight" v-html="highlightedCode"></pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Prism from 'prismjs'

interface Props {
  code: string
}

const props = defineProps<Props>()
const containerRef = ref<HTMLDivElement>()

const highlightedCode = computed(() => {
  return Prism.highlight(props.code, Prism.languages.css, 'css')
})

const codeInStyleTag = computed(() => {
  return `<style>${props.code}</style>`
})

const goBottom = () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}

defineExpose({ goBottom })
</script>

<style>
.style-editor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
}

.highlight {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.code {
  display: none;
}
</style>
