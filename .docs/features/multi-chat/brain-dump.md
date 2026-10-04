## Feature: Single-chat to Multi-chat

Preciso transformar o chat de conversa única para um de múltiplas conversas.

### Aspectos Técnicos
Vamos usar a biblioteca Zustand para gerenciamento de estado.

Store na biblioteca Zustand armazenando 2 informações:
- Histórico de cada conversa individualmente(com todas as indormações do type Message).
- Qual Chat está ativo(com um id).

A store do Zustand deve ficar no src/stores.

### Fluxo de Informações

Ao abrir o site, não estará em nenhuma conversa(empty state).

### Aspectos Visuais

No sidebar teremos a lista das conversas e um botão para criar uma nova conversa.

A identificação do chat no sidebar, é exibindo o próprio id dele.

O sidebar ficará do lado esquerdo, sendo retrátil no celular(botão hamburger no lado esquerdo)

O imput fiva desabilitado quando não há conversas ativas(opacidade de 50% e botões não funcionam)

Crie também ainda com o Zustand(se for mais eficiente), um modo dark/light. Com o Light tenho como funco um ambar bem tranparente e o tema Dark um azul escuro. Fique á vontada para criar um estilo simples e leve, mas moderno e de bom gosto. Crie icones funcionais e ativos.

Conisdere fortemente a responsividade, mobile first.