# 🚀 Quick Start Guide - Netflix Clone

Comece em 5 minutos!

## ⚡ Setup Rápido

### 1. Clonar e Entrar
```bash
git clone <seu-repo>
cd netflix-clone
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Rodar Servidor
```bash
npm run serve
```

### 4. Abrir no Browser
```
http://localhost:8000/netflix-clone/index.html
```

**Pronto! Projeclaro funcionando! 🎉**

---

## 📂 Arquivo Mais Importante

```
netflix-clone/
├── index.html        ← Página de entrada (perfis)
├── home.html         ← Catálogo (depois de selecionar perfil)
├── css/              ← Estilos (modularizados em 5 arquivos)
├── js/               ← Lógica (perfis.js, home.js, services/)
└── assets/           ← Imagens e sons
```

---

## 🎮 Como Usar

1. **Escolha um perfil** na tela inicial
2. **Navegue** pelo catálogo
3. **Passe mouse** para ver preview do trailer
4. **Clique** para abrir em tela cheia
5. **Adicione** à "Minha Lista"
6. **Dados salvam** automaticamente

---

## 📝 Scripts Disponíveis

```bash
npm run serve         # Rodar servidor (http://localhost:8000)
npm run format        # Formatar código (Prettier)
npm run lint          # Verificar/corrigir erros (ESLint)
npm run format:check  # Ver quais arquivos precisam formatação
npm run dev           # Format + Lint (recomendado antes de commit)
```

---

## 🎓 Maiores Destaques

✨ **Modularização CSS** - 5 arquivos organizados (Base, Profile, Catalog, Modal, Responsive)

🎯 **Data Service Layer** - Camada centralizada de dados pronta para API

🔧 **ESLint + Prettier** - Linting e formatação automática

📱 **Mobile-Friendly** - Responsivo em todos os tamanhos

♿ **Accessible** - ARIA labels, keyboard navigation, focus management

---

## 🔗 Documentação Detalhada

- **CSS**: [css/README.md](./css/README.md)
- **Movie Service**: [js/services/README.md](./js/services/README.md)
- **Linting**: [LINTING.md](./LINTING.md)
- **Completo**: [README-COMPLETO.md](./README-COMPLETO.md)

---

## 💡 Dicas

### Adicionar novo filme
1. Edite `js/services/movieService.js`
2. Adicione objeto na array do perfil
3. Pronto!

### Mudar cores
1. Edite `css/base.css` (`:root`)
2. Todas as cores usam CSS variables

### Formatar antes de commit
```bash
npm run dev
git add .
git commit -m "Add new feature"
```

### Ver erros de lint
```bash
npx eslint js/
```

---

## ❓ Pequenos Problemas?

| Problema | Solução |
|----------|---------|
| "Arquivo não encontrado" | Verifique paths em index.html e home.html |
| "Trailers não carregam" | Verifique URLs do YouTube em movieService.js |
| "localStorage não funciona" | Firefox: desabilite "Delete on Exit" |
| "ESLint não roda" | Execute `npm install` novamente |

---

## 📖 Próximas Lições

1. **Entenda o Flow**: index.html → home.html com perfil como parâmetro
2. **Estude o State**: `appState` em home.js centraliza tudo
3. **Explore o Service**: `movieService.js` é exemplo de bom design
4. **Veja o CSS**: Arquivo bem organizado com BEM naming

---

## 🎯 Exercícios para Aprender

1. ✏️ **Fácil**: Adicione um novo perfil (5 min)
2. ✏️ **Médio**: Implemente busca por filme (30 min)
3. ✏️ **Difícil**: Integre com TMDb API (2 horas)

---

## 📞 Suporte

- Erro? Abra [Issue](https://github.com/seu-usuario/netflix-clone/issues)
- Dúvida? Cheque os READMEs detalhados
- Ideia? Faça um Pull Request!

---

**Boa codificação! 🚀**
