# ESLint + Prettier - Guia de Configuração

## 📋 Visão Geral

Este projeto usa **ESLint** para linting (análise de código) e **Prettier** para formatação automática, garantindo qualidade e consistência do código.

## 🔧 Configuração

### Arquivos de Configuração

- **`.eslintrc.json`** - Regras de lint e environment
- **`.prettierrc.json`** - Configurações de formatação
- **`.prettierignore`** - Arquivos/pastas que Prettier ignora
- **`package.json`** - Scripts npm e dependências

## 📦 Instalação

### 1. Instalar Dependências

```bash
npm install
```

Instala **ESLint** e **Prettier** e suas dependências.

### 2. Verificar Instalação

```bash
npx eslint --version
npx prettier --version
```

## 🎯 Como Usar

### Formatar Código Automaticamente

```bash
npm run format
```

Aplica Prettier (formatação) em todos os arquivos do projeto.

### Verificar Formatação

```bash
npm run format:check
```

Mostra quais arquivos não estão formata dos (sem alterar).

### Lint e Corrigir Erros

```bash
npm run lint
```

Executa ESLint e corrige automaticamente erros encontrados em `js/`.

### Desenvolvimento (Lint + Format)

```bash
npm dev
```

Executa `format` + `lint` em sequência.

### Servidor Local

```bash
npm run serve
```

Inicia servidor Python na porta 8000 para visualizar o projeto.

## 📏 Regras ESLint

### Habilitadas (Obrigatórias)

| Regra | O que faz |
|-------|-----------|
| `indent` | Indentação com 2 espaços |
| `linebreak-style` | Line breaks Unix (LF) |
| `quotes` | Aspas duplas obrigatórias |
| `semi` | Ponto-e-vírgula obrigatório |
| `no-var` | Proíbe `var`, use `const`/`let` |
| `eqeqeq` | Operadores `===` e `!==` obrigatórios |
| `curly` | Chaves obrigatórias em blocos |

### Avisos (Recomendadas)

| Regra | O que faz |
|-------|-----------|
| `no-unused-vars` | Avisa sobre variáveis não usadas |
| `no-console` | Avisa sobre `console.log()` |
| `prefer-const` | Prefere `const` ao invés de `let` |

### Exceções

- Variáveis com prefixo `_` são ignoradas (ex: `_unused`)

## 🎨 Configurações Prettier

```json
{
  "semi": true,                    // Adiciona ; ao final das linhas
  "singleQuote": false,            // Usa aspas duplas
  "tabWidth": 2,                   // 2 espaços por indentação
  "trailingComma": "es5",         // Vírgula após último item de array
  "printWidth": 100,              // Quebra linha em 100 caracteres
  "arrowParens": "always",        // Arrow functions com parênteses
  "endOfLine": "lf",              // Line breaks Unix (LF)
  "bracketSpacing": true          // Espaço dentro de chaves
}
```

### Exemplos de Formatação Prettier

#### Antes
```javascript
const x=[1,2,3]
function hello(){console.log('test')}
```

#### Depois
```javascript
const x = [1, 2, 3];
function hello() {
  console.log("test");
}
```

## 🚀 Integração com VS Code

### Extensões Recomendadas

1. **ESLint** (dbaeumer.vscode-eslint)
   - Mostra erros de lint no editor

2. **Prettier** (esbenp.prettier-vscode)
   - Preview e formatting no editor

### Configurar VS Code

Adicione ao `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Assim, ao salvar um arquivo:
- ✅ Prettier formata automaticamente
- ✅ ESLint corrige erros automáticos

## 🔍 Verificando Erros

### Rodar ESLint Manualmente

```bash
npx eslint js/
```

Mostra todos os erros na pasta `js/`.

### Corrigir Erros Automáticos

```bash
npx eslint js/ --fix
```

Corrige problemas que ESLint consegue resolver automaticamente.

### Verificar Formatação

```bash
npx prettier --check .
```

Mostra arquivos que não estão formatados.

## 📋 Checklist de Setup

- [ ] `npm install` executado
- [ ] ESLint e Prettier instalados
- [ ] `.eslintrc.json` está na raiz do projeto
- [ ] `.prettierrc.json` está na raiz do projeto
- [ ] VS Code mostra erros de lint no editor
- [ ] Saving formata código automaticamente
- [ ] `npm run lint` funciona sem erros
- [ ] `npm run format` funciona

## 🎓 Boas Práticas

### 1. Formatar Antes de Commitar

```bash
npm run format
npm run lint
git add .
git commit -m "Refactor: update code style"
```

### 2. Verificar Código Antes de PR

```bash
npm run format:check
```

### 3. Não Desabilitar Regras sem Motivo

Se encontrar uma regra irritante, converse antes de desabilitar:
```javascript
// ❌ Evitar
// eslint-disable-next-line no-console
console.log("teste");

// ✅ Preferir: arrumar o código
logger.info("teste");
```

### 4. Manter Consistência

- Use `const` por default, `let` quando precisar reatribuir
- Sempre use `===` em comparações
- Commente blocos complexos

## 🔗 Recursos

- [ESLint Docs](https://eslint.org/)
- [Prettier Docs](https://prettier.io/)
- [Configurações Recomendadas](https://prettier.io/docs/en/index.html)

## ❓ FAQ

**P: Por que 2 espaços?**  
R: Padrão da indústria e mais compacto em tamanho de arquivo.

**P: Posso usar backticks para strings?**  
R: Sim, Prettier os aceita. ESLint força aspas duplas só em regras opcionais.

**P: Preciso instalar globalmente?**  
R: Não, `npm install` é suficiente. Use `npx` para rodar local.

**P: Funciona com PHP/Python?**  
R: Este setup é JavaScript. Prettier suporta HTML/CSS também.

---

**Próximo passo:** Adicionar testes unitários com Jest
