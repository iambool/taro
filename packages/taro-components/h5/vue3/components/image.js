import { h } from 'vue'
import { useForwardRef } from '../forwardRef'

export default {
  emits: ['tap'],
  setup (props, { slots, emit, attrs }) {
    const forwardRef = useForwardRef()
    return () => (
      h(
        'taro-image-core',
        {
          ref: forwardRef,
          class: ['hydrated', {
            'taro-img__widthfix': attrs.mode === 'widthFix'
          }],
          onClick (e) {
            emit('tap', e)
          }
        },
        slots
      )
    )
  }
}
