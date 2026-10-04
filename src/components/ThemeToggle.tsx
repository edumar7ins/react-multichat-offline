import { useChatStore } from '../stores/chatStore'

export default function ThemeToggle() {
  const theme = useChatStore((state) => state.theme)
  const toggleTheme = useChatStore((state) => state.toggleTheme)
  const nextTheme = theme === 'light' ? 'escuro' : 'claro'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Tema atual: ${theme === 'light' ? 'claro' : 'escuro'}. Alternar para tema ${nextTheme}`}
      aria-pressed={theme === 'dark'}
      className="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme"
    >
      {theme === 'light' ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
        </svg>
      )}
      <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
