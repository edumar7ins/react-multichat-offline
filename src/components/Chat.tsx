import { useEffect, useRef, useState } from 'react'
import type { Message, Sender } from '../types/message'
import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import ChatSidebar from './ChatSidebar'
import MessageList from './MessageList'
import ThemeToggle from './ThemeToggle'

export default function Chat() {
  const conversations = useChatStore((state) => state.conversations)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const addMessage = useChatStore((state) => state.addMessage)
  const theme = useChatStore((state) => state.theme)
  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeChatId,
  )
  const [sender, setSender] = useState<Sender>('user')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wasSidebarOpen = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (wasSidebarOpen.current && !sidebarOpen) menuButtonRef.current?.focus()
    wasSidebarOpen.current = sidebarOpen
  }, [sidebarOpen])

  function handleSend(text: string) {
    if (!activeChatId || !text.trim()) return

    const message: Message = {
      id: crypto.randomUUID(),
      text: text.trimStart(),
      sender,
    }

    addMessage(message)
  }

  function handleToggleSender() {
    setSender((currentSender) => (currentSender === 'user' ? 'robot' : 'user'))
  }

  return (
    <div className="flex h-dvh min-h-0 min-w-0 overflow-hidden bg-app text-primary transition-colors">
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="mx-auto flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center border-b border-theme px-3">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu de conversas"
            aria-expanded={sidebarOpen}
            aria-controls="mobile-chat-sidebar"
            className="rounded-lg p-2 text-primary transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ThemeToggle />
        </header>
        <MessageList
          messages={activeConversation?.messages ?? []}
          emptyMessage={
            activeChatId
              ? 'Nenhuma mensagem ainda. Envie a primeira!'
              : 'Nenhuma conversa aberta.'
          }
        />
        <ChatInput
          sender={sender}
          onToggleSender={handleToggleSender}
          onSend={handleSend}
          disabled={!activeChatId}
        />
      </main>
    </div>
  )
}
