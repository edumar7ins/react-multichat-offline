import { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/chatStore'

type ChatSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const conversations = useChatStore((state) => state.conversations)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const createConversation = useChatStore((state) => state.createConversation)
  const selectConversation = useChatStore((state) => state.selectConversation)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  const content = (
    <>
      <button
        type="button"
        onClick={() => {
          createConversation()
          onClose()
        }}
        className="rounded-lg bg-action px-4 py-3 text-left text-white transition-colors hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme"
      >
        + Nova conversa
      </button>

      <nav aria-label="Conversas" className="flex flex-col gap-1">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeChatId

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => {
                selectConversation(conversation.id)
                onClose()
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`break-all rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme ${
                isActive
                  ? 'bg-surface-hover font-medium text-primary'
                  : 'text-primary hover:bg-surface-hover'
              }`}
            >
              {conversation.id}
            </button>
          )
        })}
      </nav>
    </>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col gap-4 border-r border-theme bg-sidebar p-4 md:flex">
        {content}
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              onClose()
              return
            }

            if (event.key !== 'Tab' || !dialogRef.current) return
            const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
              'button:not(:disabled), [href], textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
            )
            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first?.focus()
            }
          }}
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full cursor-default"
            aria-label="Fechar menu de conversas"
            onClick={onClose}
          />
          <aside
            ref={dialogRef}
            id="mobile-chat-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Conversas"
            className="relative z-10 flex h-full w-[min(20rem,85vw)] flex-col gap-4 overflow-y-auto border-r border-theme bg-sidebar p-4"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="self-end rounded-lg p-2 text-primary hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme"
              aria-label="Fechar conversas"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
