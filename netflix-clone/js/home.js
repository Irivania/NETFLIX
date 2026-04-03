/**
 * Dados dos filmes são carregados do movieService
 * que atua como camada de dados centralizada.
 * Veja: js/services/movieService.js
 */

const HOVER_PREVIEW_DELAY_MS = 800;
const COVER_FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
  "linear-gradient(135deg, #312e81 0%, #1f2937 100%)",
  "linear-gradient(135deg, #7f1d1d 0%, #1f2937 100%)",
  "linear-gradient(135deg, #14532d 0%, #1f2937 100%)"
];

/**
 * Estado central da tela para reduzir variaveis globais soltas.
 */
const appState = {
  selectedProfile: "",
  movies: [],
  myList: [],
  currentTrailerUrl: "",
  hoverAudioUnlocked: true,
  lastTriggerElement: null,
  movieIndexByTitle: new Map()
};

/**
 * Cache dos elementos DOM usados no fluxo da tela.
 */
const ui = {
  homeTitle: document.getElementById("homeTitle"),
  homeDescription: document.getElementById("homeDescription"),
  suggestionsGrid: document.getElementById("catalogoPerfil"),
  myListGrid: document.getElementById("minhaLista"),
  emptyMyListMessage: document.getElementById("minhaListaVazia"),
  trailerModal: document.getElementById("trailerModal"),
  trailerFrame: document.getElementById("trailerFrame"),
  trailerCloseButton: document.getElementById("closeTrailer"),
  trailerSoundButton: document.getElementById("soundTrailer"),
  openYoutubeLink: document.getElementById("openYoutube")
};

function initializeApp() {
  setupProfileContext();
  updateIntroTexts();
  renderAllSections();
  bindEvents();
}

/**
 * Le perfil pela URL, resolve filmes do movieService e restaura Minha Lista do localStorage.
 */
function setupProfileContext() {
  const params = new URLSearchParams(window.location.search);
  appState.selectedProfile = (params.get("perfil") || "").toLowerCase();
  
  // Dados agora vêm do movieService (camada de dados centralizada)
  appState.movies = movieService.getMoviesByProfile(appState.selectedProfile);
  appState.movieIndexByTitle = new Map(appState.movies.map((movie) => [movie.titulo, movie]));
  appState.myList = loadMyListFromStorage();
}

function getMyListStorageKey() {
  return `minha-lista:${appState.selectedProfile || "anonimo"}`;
}

/**
 * Le titulos salvos e converte novamente em objetos de filme.
 */
function loadMyListFromStorage() {
  try {
    const rawStorage = localStorage.getItem(getMyListStorageKey());
    if (!rawStorage) {
      return [];
    }

    const titles = JSON.parse(rawStorage);
    if (!Array.isArray(titles)) {
      return [];
    }

    return titles
      .map((title) => appState.movieIndexByTitle.get(title))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function saveMyListToStorage() {
  const titles = appState.myList.map((movie) => movie.titulo);
  localStorage.setItem(getMyListStorageKey(), JSON.stringify(titles));
}

function updateIntroTexts() {
  if (ui.homeTitle) {
    if (appState.selectedProfile) {
      const formattedProfile = appState.selectedProfile[0].toUpperCase() + appState.selectedProfile.slice(1);
      ui.homeTitle.textContent = `Bem-vindo(a), ${formattedProfile}`;
    } else {
      ui.homeTitle.textContent = "Bem-vindo(a)";
    }
  }

  if (ui.homeDescription) {
    ui.homeDescription.textContent = appState.movies.length
      ? "Sugestoes para voce"
      : "Perfil nao encontrado. Volte e selecione um perfil valido.";
  }
}

function renderAllSections() {
  renderSuggestions();
  renderMyList();
}

function renderSuggestions() {
  if (!ui.suggestionsGrid) {
    return;
  }

  ui.suggestionsGrid.innerHTML = "";
  appState.movies.forEach((movie) => {
    ui.suggestionsGrid.appendChild(createMovieCard(movie));
  });
}

function renderMyList() {
  if (!ui.myListGrid || !ui.emptyMyListMessage) {
    return;
  }

  ui.myListGrid.innerHTML = "";
  appState.myList.forEach((movie) => {
    ui.myListGrid.appendChild(createMovieCard(movie));
  });

  ui.emptyMyListMessage.style.display = appState.myList.length ? "none" : "block";
}

/**
 * Cria um card reutilizavel para as secoes Sugestoes e Minha Lista.
 */
function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";
  card.setAttribute("role", "listitem");

  const isInList = appState.myList.some((currentMovie) => currentMovie.titulo === movie.titulo);
  const listButtonLabel = isInList ? "Remover" : "Minha Lista";
  const listButtonModifier = isInList ? " active" : "";

  card.innerHTML = `
    <div class="card-media">
      <img src="${movie.img}" alt="${movie.titulo}" loading="lazy" />
      <iframe class="card-trailer" src="" title="Trailer ${movie.titulo}" allow="autoplay; encrypted-media" allowfullscreen tabindex="-1"></iframe>
      <div class="card-media__fallback" aria-hidden="true">
        <span class="card-media__fallback-initials">${getMovieInitials(movie.titulo)}</span>
        <span class="card-media__fallback-title">${movie.titulo}</span>
      </div>
    </div>
    <h3 class="movie-card__title">${movie.titulo}</h3>
    <div class="movie-actions">
      <a class="play-link" href="${movie.trailer}" data-action="open-trailer" data-trailer="${movie.trailer}">Assistir trailer</a>
      <button class="list-btn${listButtonModifier}" type="button" data-action="toggle-list" data-title="${movie.titulo}">${listButtonLabel}</button>
    </div>
  `;

  attachImageFallback(card, movie);
  attachHoverPreview(card, movie.trailer);

  return card;
}

function getMovieInitials(title) {
  const words = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "");

  return words.join("") || "MV";
}

function buildFallbackGradient(title) {
  const hash = [...title].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COVER_FALLBACK_GRADIENTS[hash % COVER_FALLBACK_GRADIENTS.length];
}

/**
 * Evita cards sem imagem: quando capa falha, aplica placeholder visual local.
 */
function attachImageFallback(card, movie) {
  const media = card.querySelector(".card-media");
  const image = card.querySelector("img");
  if (!media || !image) {
    return;
  }

  image.addEventListener(
    "error",
    () => {
      media.classList.add("card-media--fallback");
      media.style.background = buildFallbackGradient(movie.titulo);
    },
    { once: true }
  );
}

/**
 * Ativa preview de trailer no hover com delay, evitando piscadas.
 */
function attachHoverPreview(card, trailerUrl) {
  const previewFrame = card.querySelector(".card-trailer");
  if (!previewFrame) {
    return;
  }

  let hoverTimer = null;

  card.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      if (!card.matches(":hover")) {
        return;
      }

      // Preview com audio ativo em todos os perfis.
      previewFrame.src = buildTrailerUrl(trailerUrl, false);
      card.classList.add("playing");
    }, HOVER_PREVIEW_DELAY_MS);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    card.classList.remove("playing");
    previewFrame.src = "";
  });
}

/**
 * Uniformiza URLs do trailer para controlar autoplay e mute.
 */
function buildTrailerUrl(rawUrl, muted) {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("mute", muted ? "1" : "0");
    url.searchParams.set("controls", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Atualiza estado da Minha Lista e re-renderiza secoes.
 */
function toggleMovieInMyList(movieTitle) {
  const movie = appState.movieIndexByTitle.get(movieTitle);
  if (!movie) {
    return;
  }

  const alreadyInList = appState.myList.some((currentMovie) => currentMovie.titulo === movieTitle);
  appState.myList = alreadyInList
    ? appState.myList.filter((currentMovie) => currentMovie.titulo !== movieTitle)
    : [...appState.myList, movie];

  saveMyListToStorage();
  renderAllSections();
}

function openTrailerModal(trailerUrl, triggerElement) {
  if (!ui.trailerModal || !ui.trailerFrame) {
    return;
  }

  appState.currentTrailerUrl = trailerUrl;
  if (triggerElement instanceof HTMLElement) {
    appState.lastTriggerElement = triggerElement;
  }

  // Clique em "Assistir trailer" é gesto do usuario, entao abre com som.
  ui.trailerFrame.src = buildTrailerUrl(trailerUrl, false);

  // Atualiza link de fallback para abrir no YouTube
  if (ui.openYoutubeLink) {
    try {
      const embedUrl = new URL(trailerUrl);
      const videoId = embedUrl.pathname.split("/").pop();
      ui.openYoutubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    } catch {
      ui.openYoutubeLink.href = "#";
    }
  }

  ui.trailerModal.classList.add("is-open");
  ui.trailerModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (ui.trailerCloseButton) {
    ui.trailerCloseButton.focus();
  }
}

function closeTrailerModal() {
  if (!ui.trailerModal || !ui.trailerFrame) {
    return;
  }

  ui.trailerModal.classList.remove("is-open");
  ui.trailerModal.setAttribute("aria-hidden", "true");
  ui.trailerFrame.src = "";
  appState.currentTrailerUrl = "";
  document.body.style.overflow = "";

  if (appState.lastTriggerElement) {
    appState.lastTriggerElement.focus();
    appState.lastTriggerElement = null;
  }
}

function playModalTrailerWithSound() {
  if (!ui.trailerFrame || !appState.currentTrailerUrl) {
    return;
  }

  ui.trailerFrame.src = buildTrailerUrl(appState.currentTrailerUrl, false);
}

function bindEvents() {
  bindGridActions(ui.suggestionsGrid);
  bindGridActions(ui.myListGrid);

  if (ui.trailerCloseButton) {
    ui.trailerCloseButton.addEventListener("click", closeTrailerModal);
  }

  if (ui.trailerSoundButton) {
    ui.trailerSoundButton.addEventListener("click", playModalTrailerWithSound);
  }

  if (ui.trailerModal) {
    ui.trailerModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeTrailerModal();
      }
    });
  }

  document.addEventListener("keydown", handleGlobalKeyboardShortcuts);
}

/**
 * Delegacao de eventos para evitar repeticao entre os dois grids.
 */
function bindGridActions(gridElement) {
  if (!gridElement) {
    return;
  }

  gridElement.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const trailerLink = target.closest("[data-action='open-trailer']");
    if (trailerLink instanceof HTMLElement) {
      event.preventDefault();
      const trailerUrl = trailerLink.getAttribute("data-trailer");
      if (trailerUrl) {
        openTrailerModal(trailerUrl, trailerLink);
      }
      return;
    }

    const listButton = target.closest("[data-action='toggle-list']");
    if (listButton instanceof HTMLElement) {
      const movieTitle = listButton.getAttribute("data-title");
      if (movieTitle) {
        toggleMovieInMyList(movieTitle);
      }
    }
  });
}

function getFocusableElementsInModal() {
  if (!ui.trailerModal) {
    return [];
  }

  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "iframe",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  return Array.from(ui.trailerModal.querySelectorAll(selector));
}

/**
 * Atalhos globais: ESC para fechar modal e Tab trap para acessibilidade.
 */
function handleGlobalKeyboardShortcuts(event) {
  if (event.key === "Escape") {
    closeTrailerModal();
    return;
  }

  if (
    event.key !== "Tab" ||
    !ui.trailerModal ||
    !ui.trailerModal.classList.contains("is-open")
  ) {
    return;
  }

  const focusableElements = getFocusableElementsInModal();
  if (!focusableElements.length) {
    event.preventDefault();
    return;
  }

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey && activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  }

  if (!event.shiftKey && activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
}

initializeApp();
