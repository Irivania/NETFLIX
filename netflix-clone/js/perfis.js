/**
 * Dados da tela de seleção de perfis.
 * Cada perfil possui nome e avatar local.
 */
const profiles = [
  { name: "Vania", avatar: "assets/avatars/avatar_1.png" },
  { name: "Francisco", avatar: "assets/avatars/avatar_2.png" },
  { name: "Paulo", avatar: "assets/avatars/avatar_3.png" },
  { name: "Matheus", avatar: "assets/avatars/avatar_4.png" }
];

// Caminho esperado para o efeito sonoro de entrada (opcional).
const NETFLIX_TUDUM_URL = "assets/sounds/netflix-tudum.mp3";
const ENTER_DELAY_MS = 900;

let isNavigating = false;

/**
 * Redireciona para a home do perfil selecionado.
 */
function goToProfileHome(profileName) {
  window.location.href = `home.html?perfil=${encodeURIComponent(profileName)}`;
}

/**
 * Tenta tocar o som de entrada e depois navega para a home.
 * Se houver erro de áudio, a navegação segue normalmente.
 */
function playEntrySoundAndNavigate(profileName) {
  if (isNavigating) {
    return;
  }

  isNavigating = true;

  const audio = new Audio(NETFLIX_TUDUM_URL);
  const navigate = () => goToProfileHome(profileName);
  const fallbackTimer = setTimeout(navigate, ENTER_DELAY_MS);

  audio.addEventListener(
    "error",
    () => {
      clearTimeout(fallbackTimer);
      navigate();
    },
    { once: true }
  );

  audio.play().catch(() => {
    clearTimeout(fallbackTimer);
    navigate();
  });
}

/**
 * Cria o elemento visual de um perfil.
 */
function createProfileCard(profile) {
  const card = document.createElement("li");
  card.className = "profile-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Entrar como ${profile.name}`);

  // Suporte a mouse e teclado para acessibilidade.
  card.addEventListener("click", () => playEntrySoundAndNavigate(profile.name));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playEntrySoundAndNavigate(profile.name);
    }
  });

  card.innerHTML = `
    <img src="${profile.avatar}" alt="${profile.name}" />
    <p>${profile.name}</p>
  `;

  return card;
}

/**
 * Renderiza todos os perfis na lista.
 */
function renderProfiles() {
  const profilesContainer = document.getElementById("profiles");
  if (!profilesContainer) {
    return;
  }

  profilesContainer.innerHTML = "";
  profiles.forEach((profile) => {
    profilesContainer.appendChild(createProfileCard(profile));
  });
}

renderProfiles();
