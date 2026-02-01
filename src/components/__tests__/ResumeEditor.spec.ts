import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResumeEditor from '../ResumeEditor.vue'

describe('ResumeEditor', () => {
  it('renders raw markdown when enableHtml is false', () => {
    const wrapper = mount(ResumeEditor, {
      props: { markdown: '# Hello', enableHtml: false }
    })
    expect(wrapper.find('pre.raw').exists()).toBe(true)
  })

  it('renders HTML when enableHtml is true', () => {
    const wrapper = mount(ResumeEditor, {
      props: { markdown: '# Hello', enableHtml: true }
    })
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('exposes goBottom and goTop methods', () => {
    const wrapper = mount(ResumeEditor, {
      props: { markdown: 'test', enableHtml: false }
    })
    expect(typeof wrapper.vm.goBottom).toBe('function')
    expect(typeof wrapper.vm.goTop).toBe('function')
  })
})
