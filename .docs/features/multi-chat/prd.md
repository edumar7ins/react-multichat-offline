# PRD — Múltiplas conversas

## 1. Visão geral

Evoluir o chat offline de uma conversa única para uma experiência com várias conversas independentes. A pessoa usuária poderá criar conversas, alternar entre elas e manter em cada uma seu próprio histórico de mensagens. A aplicação começa sem conversa ativa.

O estado das conversas será gerenciado com Zustand em `src/stores`. As conversas e mensagens existirão somente em memória; a preferência de tema será salva no navegador.

**Stack atual:** Vite + React + TypeScript + Tailwind CSS. Zustand deverá ser adicionado como dependência.

## 2. Objetivos e critérios de sucesso

| Objetivo | Critério de sucesso |
|---|---|
| Criar e alternar entre conversas | Cada conversa aparece no sidebar identificada por seu ID; selecionar uma mostra somente seu histórico |
| Isolar os históricos | Enviar mensagens em uma conversa não altera as mensagens das demais |
| Começar sem conversa ativa | Após abrir ou recarregar o site, nenhuma conversa é selecionada e o input fica desabilitado |
| Oferecer temas light e dark | O controle de tema alterna os estilos da aplicação e mantém a escolha após recarregar |
| Funcionar em telas pequenas | Sidebar retrátil e navegação utilizável em mobile, sem comprometer o uso do chat |

## 3. Escopo

### Incluído

- Estado global de conversas e conversa ativa com Zustand.
- Criação de uma conversa vazia, com ID único, e ativação imediata da nova conversa.
- Seleção de uma conversa existente pelo sidebar.
- Histórico independente por conversa, preservando todas as propriedades de `Message`.
- Estado vazio inicial e estado vazio de uma conversa sem mensagens.
- Input desabilitado quando não houver conversa ativa.
- Sidebar à esquerda em telas maiores e retrátil em dispositivos móveis.
- Alternância entre os temas light e dark, com preferência salva no navegador.
- Layout responsivo, mobile first, ícones operacionais e controles acessíveis.

### Fora de escopo

- Persistir conversas ou mensagens (em `localStorage`, backend ou outro meio).
- Excluir, renomear, ordenar manualmente ou pesquisar conversas.
- Autenticação, sincronização entre dispositivos ou chat com serviço externo.
- Alterar o modelo ou o conteúdo das mensagens além de mantê-las em seu histórico atual.

## 4. Requisitos funcionais

### RF-01 — Inicialização sem conversa ativa

- Ao abrir ou recarregar a aplicação, `activeChatId` deve começar sem valor e nenhuma conversa deve estar ativa.
- A preferência de tema pode ser restaurada, mas não deve restaurar conversas nem mensagens.
- A área principal deve comunicar que nenhuma conversa está aberta e oferecer uma ação para criar uma.
- O input, o textarea, o toggle de remetente e o botão de envio devem ficar desabilitados, com opacidade visual de aproximadamente 50%. Nenhuma ação nesses controles deve alterar o estado.
- O botão para criar conversa e o controle de tema permanecem funcionais.

### RF-02 — Criar conversa

- O sidebar deve apresentar um botão para criar uma conversa.
- Ao acioná-lo, criar uma conversa com ID único (por exemplo, `crypto.randomUUID()`), histórico vazio e ativá-la imediatamente.
- A conversa recém-criada deve aparecer na lista do sidebar identificada pelo próprio ID.
- A criação deve habilitar o input e exibir o estado vazio do histórico da conversa.

### RF-03 — Listar e selecionar conversas

- Exibir no sidebar todas as conversas criadas durante a sessão, cada uma identificada pelo seu ID.
- Selecionar uma conversa torna seu ID o ativo e exibe exclusivamente o histórico correspondente.
- A seleção não deve modificar ou apagar o histórico das outras conversas.
- A conversa ativa deve ter indicação visual distinta na lista.

### RF-04 — Enviar e exibir mensagens

- Preservar o comportamento existente de envio: mensagem não vazia após `trim`, Enter envia e Shift+Enter insere uma quebra de linha.
- Cada mensagem continua seguindo o tipo existente:

  ```ts
  type Message = {
    id: string
    text: string
    sender: 'user' | 'robot'
  }
  ```

- Adicionar a mensagem somente ao histórico da conversa ativa.
- Manter o remetente selecionado pelo toggle e os alinhamentos existentes: usuário à direita e robô à esquerda.
- Após enviar, limpar o campo, manter a conversa ativa e exibir a mensagem no histórico.
- Ao alternar entre conversas, mostrar as mensagens em ordem cronológica e rolar até a mais recente, quando aplicável.
- Conversas sem mensagens exibem um estado vazio dentro da área de histórico.

### RF-05 — Alternar tema

- Disponibilizar um controle funcional para alternar entre Light e Dark.
- O tema inicial é Light quando não houver preferência previamente salva.
- O tema Light usa uma paleta clara com âmbar suave/transparente; o Dark usa uma paleta azul-escura.
- A mudança deve ser aplicada consistentemente ao sidebar, área do chat, histórico, input, estados vazios, botões e controles.
- Salvar somente a preferência de tema no armazenamento local do navegador e restaurá-la na próxima abertura.
- O controle deve identificar de forma compreensível o tema atual e a ação disponível.

### RF-06 — Sidebar responsivo

- Em telas maiores, manter o sidebar à esquerda da área principal.
- Em dispositivos móveis, ocultar o sidebar inicialmente e permitir abri-lo por um botão hamburger no lado esquerdo.
- O botão deve alternar abrir/fechar o sidebar; selecionar uma conversa no mobile também deve fechá-lo para revelar o chat.
- O botão de menu deve ter nome acessível e indicar seu estado expandido/recolhido.
- A adaptação a telas pequenas não deve causar rolagem horizontal nem ocultar controles essenciais.

## 5. Modelo de estado e regras de persistência

O store Zustand deve ficar em `src/stores` e conter, no mínimo:

- As conversas e seus históricos completos, incluindo todas as propriedades de cada `Message`.
- O ID da conversa ativa, ou `null` quando nenhuma estiver ativa.
- O estado do tema Light/Dark.
- Ações para criar conversa, selecionar conversa, adicionar mensagem à conversa ativa e alternar tema.

Modelo conceitual sugerido:

```ts
type Conversation = {
  id: string
  messages: Message[]
}

type Theme = 'light' | 'dark'
```

As conversas podem ser armazenadas como lista de `Conversation` ou estrutura indexada por ID, desde que seja possível renderizar a lista e acessar o histórico por conversa.

| Dado | Persistência |
|---|---|
| Conversas e mensagens | Apenas memória; reiniciar ou recarregar inicia uma sessão vazia |
| Conversa ativa | Apenas memória; nenhuma conversa é selecionada após recarregar |
| Preferência de tema | Armazenamento local do navegador; padrão Light se não houver preferência |
| Sidebar aberto/fechado no mobile | Estado de interface transitório; inicia fechado |
| Remetente do toggle | Estado transitório da interface; inicia em `user` |

## 6. Requisitos visuais e de interação

- Usar abordagem mobile first e ocupar a altura disponível da viewport.
- Manter histórico e input no layout da conversa; o input permanece na parte inferior da área de chat.
- O input desabilitado deve comunicar claramente a indisponibilidade por estado visual e atributos nativos de desabilitação, não apenas por opacidade.
- Os controles devem ter áreas de toque adequadas em mobile, foco visível e estados hover/focus/disabled coerentes com o tema.
- Ícones devem corresponder a ações reais; botões apenas decorativos ou sem comportamento não atendem ao requisito.
- Garantir contraste suficiente entre texto, fundo, bordas e estados de foco nos dois temas.
- Respeitar as convenções existentes do projeto: tipos em `src/types` usando `type`, componentes em `src/components` e Tailwind CSS para estilos.

## 7. Arquitetura sugerida

```text
src/
├── stores/
│   └── chatStore.ts       # Zustand: conversas, seleção, envio e tema
├── components/
│   ├── Chat.tsx           # Layout principal da conversa e integração dos componentes
│   ├── ChatSidebar.tsx    # Criar/listar/selecionar conversas e menu mobile
│   ├── ChatInput.tsx      # Input e envio, incluindo estado desabilitado
│   └── ...                # Componentes existentes de mensagem e remetente
├── types/
│   └── message.ts         # Sender e Message existentes
└── App.tsx
```

A estrutura exata pode seguir os componentes existentes, sem duplicar lógica de envio ou estado. A preferência de tema pode usar o middleware de persistência do Zustand, configurado para persistir somente o tema, nunca os históricos ou a conversa ativa.

## 8. Fases de implementação

Marque cada item conforme for implementado e verificado. Uma fase é considerada concluída quando todos os seus itens estiverem marcados.

### Fase 1 — Fundação e estado global

- [x] Adicionar Zustand e criar o store em `src/stores`, com conversas, histórico por conversa e ID ativo.
- [x] Implementar as ações do store para criar conversa, selecionar conversa e adicionar mensagem sem misturar históricos.
- [x] Inicializar sem conversas e sem conversa ativa, sem persistir conversas ou mensagens.
- [x] Integrar o estado vazio inicial e o input desabilitado quando não houver conversa ativa.

### Fase 2 — Fluxos de conversa e mensagens

- [x] Criar conversas com ID único e ativar automaticamente a conversa recém-criada.
- [x] Exibir conversas pelo ID no sidebar e permitir alternar entre elas, destacando a seleção ativa.
- [x] Conectar histórico e input à conversa ativa, preservando o tipo `Message` e o comportamento de envio existente.
- [x] Verificar isolamento, ordem e retenção em memória dos históricos ao alternar entre conversas.

### Fase 3 — Sidebar responsivo e acessibilidade

- [x] Posicionar o sidebar à esquerda em telas maiores e integrar sua navegação ao layout principal.
- [x] Em mobile, permitir abrir e fechar o sidebar pelo botão hamburger e fechá-lo após selecionar uma conversa.
- [x] Garantir que não haja rolagem horizontal e que os controles essenciais permaneçam acessíveis em telas pequenas.
- [x] Verificar nomes acessíveis, navegação por teclado, foco visível e estados disabled/expanded.

### Fase 4 — Temas, acabamento e validação

- [x] Implementar os temas Light (âmbar suave/transparente) e Dark (azul-escuro), aplicando-os a todas as áreas e controles.
- [x] Persistir somente a preferência de tema, usando Light como padrão quando não houver preferência salva.
- [x] Revisar contraste, estados visuais, ícones e comportamento mobile nos dois temas.
- [x] Executar e corrigir build TypeScript/Vite e lint.
- [x] Verificar todos os critérios de aceite, incluindo o comportamento após recarregar a página.

## 9. Critérios de aceite

1. Em uma sessão nova, a tela não seleciona nem exibe conversa e os controles de envio estão desabilitados e visualmente atenuados.
2. Criar uma conversa gera um ID, inclui esse ID no sidebar, seleciona a conversa e habilita o input.
3. Criar duas conversas e enviar mensagens diferentes em cada uma; alternar entre elas mostra os históricos corretos, sem mistura ou perda durante a sessão.
4. Mensagens mantêm `id`, `text` e `sender`, a ordem de envio e os alinhamentos já existentes.
5. Recarregar a página remove todas as conversas e inicia sem conversa ativa.
6. Alternar o tema muda a interface entre a paleta âmbar clara e a azul-escura; após recarregar, o tema escolhido permanece, mas conversas e mensagens não.
7. Em mobile, o sidebar abre e fecha pelo hamburger e fecha após selecionar uma conversa; a interface não apresenta rolagem horizontal.
8. Os controles funcionam por teclado e possuem rótulos acessíveis, foco visível e estados de disabled/expanded anunciados corretamente.
9. A implementação passa pelo build TypeScript/Vite e pelo lint configurado no projeto.
