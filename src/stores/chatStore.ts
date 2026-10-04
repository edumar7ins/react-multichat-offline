import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../types/conversation'
import type { Message } from '../types/message'
import type { Theme } from '../types/theme'

type ChatState = {
  conversations: Conversation[]
  activeChatId: string | null
  theme: Theme
  createConversation: () => string
  selectConversation: (id: string) => void
  addMessage: (message: Message) => void
  toggleTheme: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeChatId: null,
      theme: 'light',
      createConversation: () => {
        const id = crypto.randomUUID()
        set((state) => ({
          conversations: [...state.conversations, { id, messages: [] }],
          activeChatId: id,
        }))
        return id
      },
      selectConversation: (id) => {
        if (!get().conversations.some((conversation) => conversation.id === id)) return
        set({ activeChatId: id })
      },
      addMessage: (message) => {
        const { activeChatId } = get()
        if (!activeChatId) return

        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === activeChatId
              ? { ...conversation, messages: [...conversation.messages, message] }
              : conversation,
          ),
        }))
      },
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
      },
    }),
    {
      name: 'multi-chat-theme',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
