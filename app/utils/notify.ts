import { message } from 'ant-design-vue'

type MessageType = 'success' | 'error' | 'info' | 'warning'

export function notify(type: MessageType, content: string) {
  message.open({
    content,
    type,
    style: {
      position: 'fixed',
      top: '20px',       // distance from top
      left: '50%',       // centered horizontally
      transform: 'translateX(-50%)',
      zIndex: 9999
    },
    duration: 3, // seconds
  })
}
