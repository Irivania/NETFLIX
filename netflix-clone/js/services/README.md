# Data Service Layer - Documentação

## 📋 Visão Geral

O **Movie Service** é uma camada de dados centralizada que abstrai toda a lógica de acesso aos dados de filmes. Isso permite fácil migração de dados hardcoded para uma API real no futuro.

**Localização**: `js/services/movieService.js`

## 🏗️ Arquitetura

```
home.html → movieService.js → catalogByProfile (dados)
                ↓
           home.js (lógica UI)
```

### Antes (Acoplado)
```javascript
// home.js continha todos os dados
const catalogByProfile = { ... }
appState.movies = catalogByProfile[profileName]
```

### Depois (Desacoplado)
```javascript
// home.js usa o serviço
appState.movies = movieService.getMoviesByProfile(profileName)
```

## 📚 API do Service

### `getMoviesByProfile(profileName)`
Retorna array de filmes para um perfil. 

```javascript
const moviesForVania = movieService.getMoviesByProfile("vania");
// Retorna: Array com 5 filmes
```

**Parâmetros:**
- `profileName` (string): Nome do perfil em minúsculo

**Retorn:**
- Array com objetos de filme `{ titulo, img, trailer }`
- Array vazio se perfil não existe

---

### `getMovieByTitle(movieTitle, profileName)`
Busca um filme específico por título dentro de um perfil.

```javascript
const film = movieService.getMovieByTitle("Interestelar", "vania");
// Retorna: { titulo: "Interestelar", img: "...", trailer: "..." }
```

**Parâmetros:**
- `movieTitle` (string): Título do filme
- `profileName` (string): Nome do perfil

**Retorna:**
- Objeto do filme ou `null` se não encontrado

---

### `getAvailableProfiles()`
Lista todos os perfis disponíveis na plataforma.

```javascript
const profiles = movieService.getAvailableProfiles();
// Retorna: ["vania", "francisco", "paulo", "matheus"]
```

**Retorna:**
- Array de nomes de perfis em minúsculo

---

### `profileExists(profileName)`
Verifica se um perfil existe.

```javascript
if (movieService.profileExists("vania")) {
  // Carregar catálogo
}
```

**Retorna:**
- `true` se perfil existe
- `false` caso contrário

---

### `getAllMovies()`
Retorna catálogo completo de todos os perfis (deep copy).

```javascript
const fullCatalog = movieService.getAllMovies();
// Retorna: { vania: [...], francisco: [...], ... }
```

**Retorna:**
- Objeto com perfis como chaves e arrays de filmes como valores

---

### `updateCatalog(newCatalog)`
Atualiza o catálogo (para futura integração com API).

```javascript
// Quando integrar com TMDb API:
const newData = await fetch("https://api.tmdb.org/...").then(r => r.json());
movieService.updateCatalog(newData);
```

**Parâmetros:**
- `newCatalog` (Object): Novo catálogo a ser usado

---

### `getMovieCount()`
Retorna contagem de filmes por perfil.

```javascript
const counts = movieService.getMovieCount();
// Retorna: { vania: 5, francisco: 5, paulo: 5, matheus: 5 }
```

**Retorna:**
- Objeto com perfil como chave e quantidade como valor

---

### `searchMovies(term, profileName)`
Busca filmes contendo um termo no título (case-insensitive).

```javascript
// Buscar em todos os perfis
movieService.searchMovies("Matrix");

// Buscar em um perfil específico
movieService.searchMovies("Matrix", "vania");
```

**Parâmetros:**
- `term` (string): Termo de busca
- `profileName` (string, opcional): Restringir busca a um perfil

**Retorna:**
- Array com filmes encontrados

---

## 🔄 Fluxo de Dados

```
1. home.html carrega movieService.js
   ↓
2. home.js inicializa:
   - setupProfileContext() → movieService.getMoviesByProfile()
   - Dados carregados em appState.movies
   ↓
3. renderAllSections() monta UI com os dados
   ↓
4. Interações do usuário mantêm dados sincronizados
   - toggleMovieInMyList() usa appState.movies
```

## 🚀 Como Usar no Seu Código

### Carregar Filmes de um Perfil
```javascript
// home.js - setupProfileContext()
appState.movies = movieService.getMoviesByProfile(selectedProfile);
```

### Validar Perfil Antes de Carregar
```javascript
if (!movieService.profileExists(profileName)) {
  console.error("Perfil inválido!");
  return;
}
const movies = movieService.getMoviesByProfile(profileName);
```

### Buscar um Filme Específico
```javascript
const movie = movieService.getMovieByTitle("Interestelar", "vania");
if (movie) {
  openTrailerModal(movie.trailer);
}
```

### Listar Todos os Perfis
```javascript
const profiles = movieService.getAvailableProfiles();
profiles.forEach(profile => console.log(profile));
```

## 🔗 Integração com API Real

### Estrutura de Mudança Esperada

Hoje:
```javascript
// movieService.js
const catalogByProfile = { vania: [...], ... };
```

No futuro com **TMDb API**:
```javascript
// movieService.js
const loadCatalogFromAPI = async () => {
  const response = await fetch("https://api.themoviedb.org/3/list/...");
  const data = await response.json();
  catalogByProfile = transformAPIResponse(data); // adaptar formato
};

// Chamar ao inicializar:
await loadCatalogFromAPI();
```

## 📝 Padrão: Module Pattern (IIFE)

O `movieService` usa padrão **Module Pattern** (IIFE - Immediately Invoked Function Expression) para:

✅ Encapsular dados (privados)  
✅ Expor apenas API pública  
✅ Evitar poluição do escopo global  
✅ Preparar para transição a ES6 Modules

```javascript
const movieService = (() => {
  // Privado: só visível aqui
  const catalogByProfile = { ... };
  
  // Público: exposto fora
  return {
    getMoviesByProfile,
    searchMovies,
    // ... outras funções
  };
})();
```

## 🧪 Testando o Service

```javascript
// No console (DevTools):

// 1. Listar perfis
movieService.getAvailableProfiles();

// 2. Filmes de um perfil
movieService.getMoviesByProfile("vania");

// 3. Validar perfil
movieService.profileExists("pedro"); // false

// 4. Buscar filme
movieService.getMovieByTitle("Matrix", "vania");

// 5. Contar filmes
movieService.getMovieCount();

// 6. Pesquisar
movieService.searchMovies("Matrix");
```

## 📦 Estrutura de um Filme

Todos os filmes seguem este formato:

```javascript
{
  titulo: "Nome do Filme",
  img: "https://...",         // URL da imagem/poster
  trailer: "https://..."      // URL do trailer (YouTube embed)
}
```

## ✅ Checklist de Integração

- [x] `movieService.js` criado com todos os dados
- [x] `home.js` refatorado para usar `movieService`
- [x] `home.html` importa `movieService.js` antes de `home.js`
- [x] Testes manual verificaram funcionamento
- [ ] (Próximo) Integrar com TMDb API
- [ ] (Próximo) Adicionar cache com localStorage

## 🎯 Benefícios

1. **Separação de Responsabilidades** - Dados vs. UI
2. **Facilidade de Testes** - Testar service isoladamente
3. **Preparação para API** - Trocar fonte de dados sem mexer em home.js
4. **Reutilização** - Service pode ser usado em outras páginas
5. **Manutenibilidade** - Mudanças centralizadas em um arquivo

---

**Próximas Melhorias:**
- [ ] Cache com localStorage
- [ ] Paginação de filmes
- [ ] Filtros por gênero
- [ ] Integração com API TMDb

