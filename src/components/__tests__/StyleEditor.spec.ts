import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StyleEditor from '../StyleEditor.vue'

describe('StyleEditor', () => {
  it('renders properly', () => {
    const wrapper = mount(StyleEditor, {
      props: { code: 'body { color: red; }' }
    })
    expect(wrapper.find('.style-editor').exists()).toBe(true)
  })

  it('exposes goBottom method', () => {
    const wrapper = mount(StyleEditor, {
      props: { code: 'test' }
    })
    expect(typeof wrapper.vm.goBottom).toBe('function')
  })
})
