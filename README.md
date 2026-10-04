# Multi-chat Offline

Aplicação de chat offline para criar e alternar entre várias conversas independentes. Cada conversa mantém seu histórico durante a sessão atual. Ao recarregar a página, as conversas são descartadas; a preferência de tema é mantida no navegador.

## Funcionalidades

- **Múltiplas conversas** — crie conversas e alterne entre elas pelo sidebar; cada uma é identificada pelo próprio ID.
- **Históricos independentes** — as mensagens ficam associadas à conversa em que foram enviadas.
- **Estado inicial vazio** — a aplicação inicia sem conversa ativa e habilita o input após criar ou selecionar uma conversa.
- **Dois remetentes** — alterne entre usuário e robô; mensagens do usuário aparecem à direita e as do robô à esquerda.
- **Envio de mensagens** — `Enter` envia e `Shift + Enter` insere uma quebra de linha. Espaços no início são removidos ao enviar.
- **Sidebar responsivo** — fixo à esquerda em telas maiores e retrátil pelo botão hamburger em dispositivos móveis.
- **Temas Light e Dark** — paleta clara âmbar e paleta azul-escura, com preferência salva no navegador.
- **Textura sutil** — gradientes de fundo suaves, ajustados à paleta de cada tema.
- **Acessibilidade** — controles com rótulos acessíveis, foco visível, suporte a teclado e estados desabilitados.

## Persistência

| Informação | Comportamento |
|---|---|
| Conversas e mensagens | Mantidas em memória durante a sessão; descartadas ao recarregar |
| Conversa ativa | Não restaurada ao recarregar |
| Tema escolhido | Salvo no armazenamento local do navegador |

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e servidor de desenvolvimento |
| [React 19](https://react.dev/) | Interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado compartilhado e persistência da preferência de tema |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

Requer Node.js e npm.

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Executar o lint
npm run lint

# Criar o build de produção
npm run build

# Visualizar o build de produção
npm run preview
```

## Uso

1. Selecione **Nova conversa** no sidebar para começar.
2. Digite uma mensagem e envie pelo botão ou com `Enter`. Use `Shift + Enter` para quebrar a linha.
3. Use o controle de remetente no campo de mensagem para alternar entre usuário e robô.
4. Selecione outra conversa na lista para abrir seu histórico.
5. Em telas pequenas, use o botão hamburger para abrir o menu de conversas.
6. Use o controle no cabeçalho para alternar entre os temas Light e Dark.

## Estrutura do projeto

```text
src/
├── components/
│   ├── Chat.tsx           # Layout principal e integração do chat
│   ├── ChatInput.tsx      # Campo de mensagem, remetente e envio
│   ├── ChatSidebar.tsx    # Criar e selecionar conversas; drawer mobile
│   ├── MessageBubble.tsx  # Bolha de mensagem
│   ├── MessageList.tsx    # Histórico, estado vazio e auto-scroll
│   ├── SenderToggle.tsx   # Alternância entre usuário e robô
│   └── ThemeToggle.tsx    # Alternância de tema
├── stores/
│   └── chatStore.ts       # Conversas em memória e preferência de tema
├── types/
│   ├── conversation.ts    # Tipo Conversation
│   ├── message.ts         # Tipos Message e Sender
│   └── theme.ts           # Tipo Theme
├── App.tsx
└── index.css              # Tailwind e tokens de tema/textura
```

## Documentação da funcionalidade

- [Brain dump](.docs/features/multi-chat/brain-dump.md)
- [PRD e fases de implementação](.docs/features/multi-chat/prd.md)
