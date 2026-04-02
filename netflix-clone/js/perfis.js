const profiles = [
  { name: "Perfil 1", avatar: "assets/avatars/avatar1.png" },
  { name: "Perfil 2", avatar: "assets/avatars/avatar2.png" },
  { name: "Perfil 3", avatar: "assets/avatars/avatar3.png" }
];

function entrarPerfil(perfil) {
  window.location.href = "home.html?perfil=" + perfil;
}

const profilesContainer = document.getElementById("profiles");

if (profilesContainer) {
  profiles.forEach((profile) => {
    const card = document.createElement("article");
    card.className = "profile-card";
    card.style.cursor = "pointer";
    card.addEventListener("click", () => entrarPerfil(profile.name));

    card.innerHTML = `
      <img src="${profile.avatar}" alt="${profile.name}" />
      <p>${profile.name}</p>
    `;

    profilesContainer.appendChild(card);
  });
}
