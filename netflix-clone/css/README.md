# CSS Modularizado - Arquitetura de Estilos

## 📁 Estrutura de Arquivos

```
css/
├── base.css              # Reset, CSS variables (tokens) e estilos globais
├── profile-page.css      # Estilos da página de seleção de perfis
├── catalog.css           # Estilos do catálogo de filmes
├── trailer-modal.css     # Estilos do modal de trailers
├── responsive.css        # Media queries e responsividade
└── style.css             # ⚠️ DEPRECADO - Use os arquivos modulares acima
```

## 🎨 Descrição de Cada Arquivo

### `base.css`
Define tudo que é compartilhado entre as páginas:
- CSS Custom Properties (design tokens) para cores, espaçamento, bordas
- Reset do navegador (margin 0, padding 0, box-sizing)
- Estilos globais (body, tipografia)
- Classe `.brand-logo` para o logo Netflix

**Importar em:** Todas as páginas (index.html, home.html)

### `profile-page.css`
Estilos exclusivos da página de seleção de perfis (index.html):
- `.brand-header` - Header fixo com gradiente
- `.profile-page__main` - Container principal centralizado
- `.profile-card` - Cards dos perfis com hover interativo
- `.profile-page__manage-btn` - Botão de gerenciar perfis

**Importar em:** index.html

### `catalog.css`
Estilos do catálogo de filmes (home.html):
- `.app-header` - Header com logo + navegação
- `.catalog-page` - Container principal
- `.catalog-grid` - Grid responsivo de filmes
- `.movie-card` - Cada card de filme
- `.trailer-modal` - Relacionado ao modal (veja trailer-modal.css)
- `.app-footer` - Rodapé

**Importar em:** home.html

### `trailer-modal.css`
Estilos do modal em tela cheia para trailers:
- `.trailer-modal` - Container fixo
- `.trailer-modal__backdrop` - Overlay semi-transparente
- `.trailer-modal__dialog` - Caixa do modal
- `.trailer-modal__close` - Botão X
- `.trailer-modal__sound` - Botão de áudio

**Importar em:** home.html

### `responsive.css`
Media queries aplicadas a todos os componentes:
- Breakpoint principal: `768px` (tablets)
- Breakpoint secundário: `480px` (celulares pequenos)

**Importar em:** Todas as páginas

### `style.css` ⚠️
Arquivo original com todos os estilos combinados.
**DEPRECADO** - Mantido por compatibilidade, mas não mais usado.

## 🔗 Como Importar no HTML

Ordem recomendada (do mais genérico para o mais específico):

```html
<!-- base.css sempre primeiro -->
<link rel="stylesheet" href="css/base.css" />

<!-- Estilos específicos da página -->
<link rel="stylesheet" href="css/profile-page.css" />  <!-- OU -->
<link rel="stylesheet" href="css/catalog.css" />
<link rel="stylesheet" href="css/trailer-modal.css" />

<!-- responsive.css sempre por último -->
<link rel="stylesheet" href="css/responsive.css" />
```

## 🎯 Benefícios da Modularização

✅ **Manutenibilidade**: Cada arquivo tem responsabilidade única  
✅ **Reutilização**: base.css compartilhado em todas as páginas  
✅ **Performance**: Carregar apenas os estilos necessários  
✅ **Escalabilidade**: Fácil adicionar novas páginas/componentes  
✅ **Cache**: Navegador cacheia base.css e responsive.css  
✅ **Legibilidade**: Código mais organizado e documentado  

## 📝 Padrões Utilizados

### Design Tokens (base.css)
```css
:root {
  --color-bg: #141414;           /* Fundo escuro */
  --color-brand: #e50914;        /* Vermelho Netflix */
  --radius-sm: 6px;              /* Bordas pequenas */
}
```

### BEM (Block Element Modifier)
```css
.profile-card { }                /* Bloco */
.profile-card__avatar { }        /* Elemento */
.profile-card--active { }        /* Modificador */
```

### Single Responsibility
Cada arquivo CSS tem um trabalho específico, sem sobreposição.

## 🔄 Migração de style.css

Se você estava usando `style.css`, substitua por:

```html
<!-- ANTES -->
<link rel="stylesheet" href="css/style.css" />

<!-- DEPOIS -->
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/profile-page.css" />  <!-- ou catalog.css -->
<link rel="stylesheet" href="css/trailer-modal.css" />
<link rel="stylesheet" href="css/responsive.css" />
```

## 🚀 Próximos Passos

Quando adicionar novas páginas ou componentes:

1. **Criar novo arquivo CSS**: `css/nome-componente.css`
2. **Manter base.css importado**: Para acessar tokens e estilos globais
3. **Sempre importar responsive.css**: Para adaptar a outros tamanhos
4. **Seguir padrão BEM**: Para classes consistentes

---

**Última atualização**: Modularização concluída  
**Arquivos criados**: 5 (base.css, profile-page.css, catalog.css, trailer-modal.css, responsive.css)
