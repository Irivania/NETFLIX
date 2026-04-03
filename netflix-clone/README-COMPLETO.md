# 🎬 Netflix Clone - Projeto Front-End

Um clone funcional da Netflix construído com **vanilla JavaScript**, **HTML5** e **CSS3**. Projeto educacional focado em boas práticas de desenvolvimento e arquitetura clean code.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-e50914?style=for-the-badge&logo=netflix)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Complete-E34C26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-BEM-1572B6?style=for-the-badge&logo=css3)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Features](#-features)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Documentação](#-documentação)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Visão Geral

Este projeto implementa uma interface similar à Netflix com as seguintes funcionalidades:

- ✅ Seleção de perfis (4 perfis pré-configurados)
- ✅ Catálogo de filmes personalizado por perfil
- ✅ Preview de trailers ao passar o mouse (hover)
- ✅ Modal full-screen para trailers com controle de áudio
- ✅ "Minha Lista" (favoritos) com persistência em localStorage
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Efeito sonoro Netflix na entrada

## 🚀 Features

### 1. **Seleção de Perfis**
- 4 perfis pré-configurados (Vania, Francisco, Paulo, Matheus)
- Avatares personalizados
- Suporte a teclado (Enter/Space para selecionar)
- Efeito sonoro Netflix ao entrar

### 2. **Catálogo Personalizado**
- Cada perfil tem seus próprios filmes
- Grid responsivo 5 colunas (desktop) → 3 colunas (mobile)
- Busca visual rápida
- Contagem de filmes por perfil

### 3. **Preview de Trailers**
- Hover preview com delay de 800ms
- Muted por padrão (política de autoplay do navegador)
- Áudio ativado após primeiro gesto do usuário
- Smooth fade in/out

### 4. **Modal de Trailers**
- Full-screen video player
- Botão para ativar som
- Botão para fechar (ou ESC)
- Focus management para acessibilidade
- Tab trap para navegação acessível

### 5. **Minha Lista**
- Adicionar/remover filmes favoritos
- Persistência com localStorage (separado por perfil)
- Visual feedback (botões com estado ativo)
- Sincronização em tempo real

### 6. **Design Responsivo**
- Mobile-first approach
- Breakpoints: 480px (celular), 768px (tablet)
- Touch-friendly buttons e elementos
- Imagens otimizadas com lazy loading

## 🏗️ Arquitetura

### Padrão de Arquivos

```
User selects profile (index.html)
         ↓
Navigate to home.html?perfil=name
         ↓
  [home.html inicializa]
         ↓
  movieService.getMoviesByProfile(name)
         ↓
  home.js renderiza catálogo
         ↓
  User interacts (hover, click)
         ↓
  Events handled (preview, modal, list)
         ↓
  State synced to localStorage
```

### Separação de Responsabilidades

- **HTML**: Estrutura semântica
- **CSS**: Apresentação (BEM + Design Tokens)
- **JavaScript**: Lógica (State management, Events, localStorage)
- **Movie Service**: Camada de dados (pronta para API)

### State Management

```javascript
appState = {
  selectedProfile: "vania",
  movies: [...],           // Catálogo do perfil
  myList: [...],           // Favoritos salvos
  currentTrailerUrl: "",
  hoverAudioEnabled: false,
  movieIndexByTitle: Map
}
```

### Fluxo de Dados

```
movieService.js (Data)
        ↓
home.js (Logic)
        ↓
UI Rendering
        ↓
localStorage (Persistence)
```

## 💻 Tecnologias

### Frontend Stack
- **HTML5** - Semântica, accessibility, ARIA labels
- **CSS3** - Grid, flexbox, custom properties, BEM nomenclature
- **JavaScript ES6+** - Vanilla JS (sem frameworks)
- **localStorage API** - Persistência de dados

### Padrões de Código
- **Module Pattern (IIFE)** - Encapsulamento (movieService.js)
- **State Centralization** - appState object
- **Event Delegation** - Performance e mantenibilidade
- **BEM Naming** - Organização CSS
- **CSS Custom Properties** - Design tokens
- **JSDoc Comments** - Documentação inline

### Ferramentas
- **ESLint** - Static code analysis
- **Prettier** - Code formatting
- **Python HTTP Server** - Desenvolvimento local

## 📦 Instalação

### Pré-requisitos
- Node.js 14+ (para ESLint/Prettier)
- Python 3 (servidor local)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/netflix-clone.git
cd netflix-clone
```

### 2. Instalar Dependências de Desenvolvimento
```bash
npm install
```

Instala **ESLint** e **Prettier** para linting e formatação.

### 3. Iniciar Servidor Local
```bash
npm run serve
# ou: python -m http.server 8000
```

O projeto será aberto em `http://localhost:8000`

### 4. (Opcional) Formatar Código
```bash
npm run format    # Prettier formatting
npm run lint      # ESLint checks
npm run dev       # Format + Lint
```

## 🎮 Como Usar

### Interface do Usuário

#### 1. **Tela de Perfis** (index.html)
- Clique em um avatar para entrar
- Ou use teclado: `Tab` para navegar, `Enter/Space` para selecionar
- Botão "Gerenciar Perfis" (funcional para futuros usos)

#### 2. **Catálogo** (home.html)
- Visualize filmes do seu perfil
- **Sugestões**: Todos os filmes disponíveis
- **Minha Lista**: Seus favoritos salvos

#### 3. **Preview de Trailers**
- Passe o mouse sobre um filme
- Aguarde 800ms para preview carregar
- Modo silencioso (autoplay)

#### 4. **Modal de Trailer**
- Clique em "Assistir trailer" no card
- Modal abre em tela cheia
- Clique em "Tocar com som" para ativar áudio
- Pressione `ESC` ou clique X para fechar

#### 5. **Adicionar à "Minha Lista"**
- Clique em "Minha Lista" no card
- Filme é salvo em localStorage
- Botão muda para "Remover"
- Dados persistem entre sessões

### Keyboard Shortcuts

| Atalho | Ação |
|--------|------|
| `Tab` | Navegar entre elementos |
| `Enter` / `Space` | Selecionar perfil / Clicar botão |
| `ESC` | Fechar modal de trailer |

## 📁 Estrutura de Pastas

```
netflix-clone/
├── index.html                    # Página de perfis
├── home.html                     # Página de catálogo
├── package.json                  # Dependências npm
├── .eslintrc.json               # Configuração ESLint
├── .prettierrc.json             # Configuração Prettier
├── .prettierignore              # Arquivos ignorados Prettier
│
├── README.md                     # Este arquivo (documentação)
├── LINTING.md                   # Guia ESLint + Prettier
│
├── css/
│   ├── base.css                 # Reset, vars, estilos globais
│   ├── profile-page.css         # Estilos página perfis
│   ├── catalog.css              # Estilos catálogo
│   ├── trailer-modal.css        # Estilos modal
│   ├── responsive.css           # Media queries
│   ├── style.css                # ⚠️ DEPRECADO (use acima)
│   └── README.md                # Documentação CSS
│
├── js/
│   ├── perfis.js                # Lógica seleção perfis
│   ├── home.js                  # Lógica catálogo (2000+ LOC)
│   └── services/
│       ├── movieService.js      # Camada dados centralizada
│       └── README.md            # Documentação Movie Service
│
└── assets/
    ├── avatars/
    │   ├── avatar_1.png         # Avatar Vania
    │   ├── avatar_2.png         # Avatar Francisco
    │   ├── avatar_3.png         # Avatar Paulo
    │   └── avatar_4.png         # Avatar Matheus
    └── sounds/
        └── netflix-tudum.mp3    # Efeito sonoro entrada (opcional)
```

## 📚 Documentação

### CSS Architecture
Veja [css/README.md](./css/README.md)
- Modularização em 5 arquivos
- Design tokens com CSS variables
- BEM naming convention
- Responsividade incluída

### Data Service Layer
Veja [js/services/README.md](./js/services/README.md)
- 8 métodos públicos
- Encapsulamento com Module Pattern
- Pronto para integração com API
- Exemplos de uso

### Linting & Formatting
Veja [LINTING.md](./LINTING.md)
- Setup ESLint + Prettier
- Como rodaro lint
- Integração VS Code
- Boas práticas

## 🎨 Design System

### Paleta de Cores
```css
--color-bg: #141414;              /* Fundo escuro */
--color-bg-soft: #1f1f1f;         /* Fundo suave */
--color-border: #2e2e2e;          /* Bordas */
--color-text: #ffffff;            /* Texto principal */
--color-text-muted: #b7b7b7;      /* Texto secundário */
--color-brand: #e50914;           /* Vermelho Netflix */
```

### Espaçamento
```css
--radius-sm: 6px;                 /* Bordas pequenas */
--radius-md: 10px;                /* Bordas médias */
```

## 🚀 Roadmap (Próximos Passos)

### MVP Atual ✅
- [x] Seleção de perfis
- [x] Catálogo personalizado
- [x] Preview de trailers
- [x] Modal full-screen
- [x] Minha Lista (localStorage)
- [x] Design responsivo
- [x] CSS modularizado (BEM)
- [x] Data Service Layer
- [x] ESLint + Prettier

### Próximas Versões

#### v1.1 (Médio Prazo)
- [ ] Integração com TMDb API
- [ ] Testes unitários (Jest)
- [ ] Cache inteligente (Service Workers)
- [ ] Busca por título / filtros

#### v2.0 (Longo Prazo)
- [ ] Backend próprio (Node.js + MongoDB)
- [ ] Autenticação de usuários
- [ ] Histórico de visualizações
- [ ] Recomendações personalizadas
- [ ] Deploy em produção

## 🤝 Contribuindo

### Como Contribuir

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código

Antes de fazer commit:

```bash
npm run format    # Formatar código
npm run lint      # Verificar erros
npm run dev       # Executar ambos
```

### Convenções

- **Commits**: Use conventional commits (`feat:`, `fix:`, `docs:`)
- **Branches**: `feature/`, `fix/`, `docs/`, `refactor/`
- **PRs**: Descreva bem o que foi feito e por quê

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**  
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin)
- Portfolio: [seu-portfolio.com](https://seu-portfolio.com)

## 🙏 Agradecimentos

- Netflix pela interface incrível
- [TMDb API](https://www.themoviedb.org/settings/api) pelos dados de filmes
- Comunidade open source por ferramentas incríveis

## ❓ FAQ

### P: Posso usar este código em produção?
R: Sim, mas respeite os direitos de marca Netflix e dados de terceiros (imagens/trailers).

### P: Como integrar com API real?
R: Veja [js/services/README.md](./js/services/README.md) - o serviço já está preparado.

### P: Quanto tempo levou para fazer?
R: Aproximadamente 40+ horas de desenvolvimento, testes e refatoração.

### P: É mobile-friendly?
R: Sim! Design responsivo com breakpoints em 480px e 768px.

### P: Preciso instalar Node?
R: Apenas para ESLint/Prettier. Para rodar o projeto, só Python (servidor).

## 📞 Contato

Dúvidas ou sugestões?
- Abra uma [Issue](https://github.com/seu-usuario/netflix-clone/issues)
- Mande um email para seu-email@example.com

---

<div align="center">

**Feito com ❤️ para portfolio front-end**

⭐ Se curtiu, deixe uma star! ⭐

</div>
