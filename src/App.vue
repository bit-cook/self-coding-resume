<template>
  <div id="app" :class="{ mobile: isMobile }">
    <StyleEditor ref="styleEditorRef" :code="currentStyle" />
    <ResumeEditor ref="resumeEditorRef" :markdown="currentMarkdown" :enable-html="enableHtml" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StyleEditor from './components/StyleEditor.vue'
import ResumeEditor from './components/ResumeEditor.vue'

// Configuration - Modify these values to customize your resume
const CONFIG = {
  name: 'Your Name',
  interval: 40, // Typing speed in ms
}

// Reactive state
const isMobile = ref(false)
const currentStyle = ref('')
const currentMarkdown = ref('')
const enableHtml = ref(false)
const styleEditorRef = ref<InstanceType<typeof StyleEditor>>()
const resumeEditorRef = ref<InstanceType<typeof ResumeEditor>>()

const checkDevice = () => {
  isMobile.value = window.innerWidth <= 500
}

// Styles - Desktop & Mobile layouts with 3D effects
const getFullStyle = (mobile: boolean): string[] => {
  const baseStyle = `/*
* Inspired by http://strml.net/
* Hi, I'm ${CONFIG.name}.
* Let me show you my resume!
*/

/* Add transition effects */
* {
  transition: all .3s;
}

/* Dark theme background */
html {
  color: rgb(222,222,222);
  background: rgb(0,43,54);
}
body {
  color: rgb(222,222,222);
  background: rgb(0,43,54);
}

/* Code highlighting */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 3D perspective effect */
html{
  perspective: 1000px;
}
`

  const desktopLayout = `
.style-editor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px);
  transform: rotateY(10deg) translateZ(-100px);
}

.resume-editor {
  position: fixed; right: 0; top: 0;
  padding: .5em; margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
`

  const mobileLayout = `
.style-editor {
  padding: .5em;
  border: 1px solid;
  overflow: auto;
  width: 90vw;
  margin: 2.5vh 5vw;
  height: 45vh;
  position: fixed; left: 0; top: 0;
  -webkit-transform: rotateX(-10deg) translateZ(-50px);
  transform: rotateX(-10deg) translateZ(-50px);
}

.resume-editor {
  position: fixed;
  top: 50%; left: 0;
  padding: .5em; margin: 2.5vh;
  width: 95vw; height: 45vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
`

  const endStyle = `/* Now let me write my resume */`

  return [
    baseStyle + (mobile ? mobileLayout : desktopLayout) + endStyle,
    `/* This resume needs some formatting
 * It's Markdown, I need to convert it to HTML
 * Using a library to translate it
 */`,
    `/* Add some HTML styles */
.resume-editor .content {
  padding: 2em;
}
.resume-editor .content h2 {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resume-editor .content ul,
.resume-editor .content ol {
  list-style: none;
}
.resume-editor .content ul > li::before {
  content: '•';
  margin-right: .5em;
}
.resume-editor .content ol {
  counter-reset: section;
}
.resume-editor .content ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resume-editor .content blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`
  ]
}

// ============================================
// EDIT YOUR RESUME CONTENT BELOW (MARKDOWN)
// ============================================
const fullMarkdown = `${CONFIG.name}
====

Contact
====

* Phone: +1 234 567 8900
* Email: your.email@example.com
* Website: www.yourwebsite.com
* GitHub: [github.com/yourusername](https://github.com/yourusername)

Education
====

- 20XX-20XX: University Name, Bachelor of Science in Computer Science
- 20XX-20XX: Another University, Master of Engineering

Experience
====

- 20XX-Present: Company Name, Senior Software Engineer
  - Led development of core product features
  - Optimized application performance by 40%
  - Mentored junior developers

- 20XX-20XX: Previous Company, Software Developer
  - Built RESTful APIs serving 1M+ requests/day
  - Implemented CI/CD pipelines

Skills
====

Technical Skills
----
- Languages: JavaScript, TypeScript, Python, Java, Go
- Frontend: Vue.js, React, HTML5, CSS3, Tailwind
- Backend: Node.js, Express, Django, Spring Boot
- Database: PostgreSQL, MongoDB, Redis, Elasticsearch
- DevOps: Docker, Kubernetes, AWS, GitHub Actions
- Tools: Git, VS Code, Figma, Postman

Soft Skills
----
- Communication, Leadership, Problem-solving
- Agile/Scrum methodologies
- Team collaboration

Projects
====

- Project One
  - Description of your amazing project
  - Technologies: Vue.js, Node.js, MongoDB
  - Link: [github.com/yourusername/project-one](https://github.com/yourusername/project-one)

- Project Two
  - Another cool project description
  - Technologies: React, Python, PostgreSQL
  - Link: [github.com/yourusername/project-two](https://github.com/yourusername/project-two)

Links
====

* [GitHub](https://github.com/yourusername)
* [LinkedIn](https://linkedin.com/in/yourusername)
* [Personal Blog](https://yourblog.com)

About Me
====
- Passionate about building scalable applications
- Love open source contributions
- Always learning new technologies
`
// ============================================
// END OF RESUME CONTENT
// ============================================

const getStyleLength = (styles: string[], index: number): number => {
  return styles
    .filter((_, i) => i <= index)
    .reduce((sum, item) => sum + item.length, 0)
}

const progressivelyShowStyle = (n: number, styles: string[]): Promise<void> => {
  return new Promise((resolve) => {
    const style = styles[n]
    if (!style) {
      resolve()
      return
    }

    const length = getStyleLength(styles, n)
    const prefixLength = length - style.length

    const showNextChar = () => {
      if (currentStyle.value.length < length) {
        const l = currentStyle.value.length - prefixLength
        const char = style.substring(l, l + 1) || ' '
        currentStyle.value += char

        if (style.substring(l - 1, l) === '\n') {
          styleEditorRef.value?.goBottom()
        }

        setTimeout(showNextChar, CONFIG.interval)
      } else {
        resolve()
      }
    }

    showNextChar()
  })
}

const progressivelyShowResume = (): Promise<void> => {
  return new Promise((resolve) => {
    const length = fullMarkdown.length

    const showNextChar = () => {
      if (currentMarkdown.value.length < length) {
        currentMarkdown.value = fullMarkdown.substring(0, currentMarkdown.value.length + 1)
        const prevChar = currentMarkdown.value[currentMarkdown.value.length - 2]

        if (prevChar === '\n') {
          resumeEditorRef.value?.goBottom()
        }

        setTimeout(showNextChar, CONFIG.interval)
      } else {
        resolve()
      }
    }

    showNextChar()
  })
}

const showHtml = (): Promise<void> => {
  return new Promise((resolve) => {
    enableHtml.value = true
    setTimeout(() => {
      resumeEditorRef.value?.goTop()
      resolve()
    }, 100)
  })
}

const makeResume = async () => {
  checkDevice()
  const styles = getFullStyle(isMobile.value)

  await progressivelyShowStyle(0, styles)
  await progressivelyShowResume()
  await progressivelyShowStyle(1, styles)
  await showHtml()
  await progressivelyShowStyle(2, styles)
}

onMounted(() => {
  window.addEventListener('resize', checkDevice)
  makeResume()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

html {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
