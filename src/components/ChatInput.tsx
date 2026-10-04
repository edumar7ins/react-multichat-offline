import { useRef, useState } from 'react'
import type { Sender } from '../types/message'
import SenderToggle from './SenderToggle'

type ChatInputProps = {
  sender: Sender
  onToggleSender: () => void
  onSend: (text: string) => void
  disabled?: boolean
}

const MAX_TEXTAREA_HEIGHT = 144

export default function ChatInput({
  sender,
  onToggleSender,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = !disabled && text.trim() !== ''

  function adjustTextareaHeight() {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }

  function resetTextarea() {
    setText('')
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
    }
  }

  function handleSend() {
    if (!canSend) return
    onSend(text)
    resetTextarea()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const isUser = sender === 'user'

  return (
    <div className="px-4 pb-4">
      <div
        className={`rounded-lg border-2 bg-surface p-4 shadow-md transition-colors duration-200 ${
          isUser ? 'border-theme' : 'border-purple-500'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <div className="flex items-end gap-3">
          <SenderToggle sender={sender} onToggle={onToggleSender} disabled={disabled} />
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              adjustTextareaHeight()
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Digite uma mensagem..."
            rows={1}
            className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-primary placeholder-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="rounded-lg bg-action px-4 py-2 text-white transition-colors hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
