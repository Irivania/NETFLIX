/**
 * Movie Service
 * Camada de dados centralizada para gerenciar o catálogo de filmes
 * Abstrai a fonte de dados (hoje: hardcoded; próximo: API)
 */

const movieService = (() => {
  /**
   * Catálogo de filmes por perfil
   * Estrutura preparada para futura substituição por dados de API (TMDb, etc)
   */
  const catalogByProfile = {
    vania: [
      {
        titulo: "Interestelar",
        img: "https://img.youtube.com/vi/zSWdZVtXT7E/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&mute=1"
      },
      {
        titulo: "Matrix",
        img: "https://image.tmdb.org/t/p/w500/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg",
        trailer: "https://www.youtube.com/embed/vKQi3bBA1y8?autoplay=1&mute=1"
      },
      {
        titulo: "Vingadores: Ultimato",
        img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1&mute=1"
      },
      {
        titulo: "Inception",
        img: "https://img.youtube.com/vi/YoHD9XEInc0/maxresdefault.jpg",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0?autoplay=1&mute=1"
      },
      {
        titulo: "O Cavaleiro das Trevas",
        img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY?autoplay=1&mute=1"
      }
    ],

    francisco: [
      {
        titulo: "Invocação do Mal",
        img: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
        trailer: "https://www.youtube.com/embed/k10ETZ41q5o?autoplay=1&mute=1"
      },
      {
        titulo: "It: A Coisa",
        img: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
        trailer: "https://www.youtube.com/embed/xKJmEC5ieOk?autoplay=1&mute=1"
      },
      {
        titulo: "O Exorcista",
        img: "https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg",
        trailer: "https://www.youtube.com/embed/YDGw1MTEe9k?autoplay=1&mute=1"
      },
      {
        titulo: "Annabelle",
        img: "https://img.youtube.com/vi/paFgQNPGlsg/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/paFgQNPGlsg?autoplay=1&mute=1"
      },
      {
        titulo: "A Maldição de Bly Manor",
        img: "assets/bly-manor.jpg",
        trailer: "https://www.youtube.com/embed/tykS7QfTWMQ?autoplay=1&mute=1"
      }
    ],

    paulo: [
      {
        titulo: "Minecraft",
        img: "assets/minecraft.jpg",
        trailer: "https://www.youtube.com/embed/MmB9b5njVbA?autoplay=1&mute=1"
      },
      {
        titulo: "Among Us: O Jogo",
        img: "https://img.youtube.com/vi/NSJ4cESNQfE/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/NSJ4cESNQfE?autoplay=1&mute=1"
      },
      {
        titulo: "Homem-Aranha: Sem Volta para Casa",
        img: "https://img.youtube.com/vi/JfVOs4VSpmA/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/JfVOs4VSpmA?autoplay=1&mute=1"
      },
      {
        titulo: "Pantera Negra",
        img: "https://img.youtube.com/vi/xjDjIWPwcPU/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/xjDjIWPwcPU?autoplay=1&mute=1"
      },
      {
        titulo: "Aquaman",
        img: "https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
        trailer: "https://www.youtube.com/embed/-cP5VWnEsUQ?autoplay=1&mute=1"
      }
    ],

    matheus: [
      {
        titulo: "Peppa Pig: O Filme",
        img: "assets/peppa-pig.jpg",
        trailer: "https://www.youtube.com/embed/7iUu2bP0q7E?autoplay=1&mute=1"
      },
      {
        titulo: "Toy Story 4",
        img: "https://img.youtube.com/vi/wmiIUN-7qhE/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/wmiIUN-7qhE?autoplay=1&mute=1"
      },
      {
        titulo: "Frozen 2",
        img: "https://img.youtube.com/vi/Zi4LMpSDccc/hqdefault.jpg",
        trailer: "https://www.youtube.com/embed/Zi4LMpSDccc?autoplay=1&mute=1"
      },
      {
        titulo: "O Filme Super Mario Bros",
        img: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        trailer: "https://www.youtube.com/embed/kN-eDJJGEu8?autoplay=1&mute=1"
      },
      {
        titulo: "Encanto",
        img: "https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        trailer: "https://www.youtube.com/embed/ZQ9V2nEiMXc?autoplay=1&mute=1"
      }
    ]
  };

  /**
   * Perfis disponíveis na plataforma
   */
  const availableProfiles = [
    "vania",
    "francisco",
    "paulo",
    "matheus"
  ];

  /**
   * Retorna todos os filmes de um perfil específico
   * @param {string} profileName - Nome do perfil (minúsculo)
   * @returns {Array} Lista de filmes ou array vazio se perfil não existe
   */
  const getMoviesByProfile = (profileName) => {
    const normalized = profileName.toLowerCase();
    return catalogByProfile[normalized] || [];
  };

  /**
   * Retorna um filme específico pelo título
   * @param {string} movieTitle - Título do filme
   * @param {string} profileName - Nome do perfil
   * @returns {Object|null} Objeto do filme ou null se não encontrado
   */
  const getMovieByTitle = (movieTitle, profileName) => {
    const movies = getMoviesByProfile(profileName);
    return movies.find(m => m.titulo.toLowerCase() === movieTitle.toLowerCase()) || null;
  };

  /**
   * Retorna lista de todos os perfis disponíveis
   * @returns {Array} Nomes dos perfis em minúsculo
   */
  const getAvailableProfiles = () => {
    return [...availableProfiles];
  };

  /**
   * Verifica se um perfil existe
   * @param {string} profileName - Nome do perfil
   * @returns {boolean} true se perfil existe
   */
  const profileExists = (profileName) => {
    return availableProfiles.includes(profileName.toLowerCase());
  };

  /**
   * Retorna dados de todos os perfis com seus filmes
   * Útil para quando precisar sincronizar com API ou BD
   * @returns {Object} Catálogo completo
   */
  const getAllMovies = () => {
    return JSON.parse(JSON.stringify(catalogByProfile));
  };

  /**
   * Atualiza o catálogo (para futura integração com API)
   * @param {Object} newCatalog - Novo catálogo a ser usado
   */
  const updateCatalog = (newCatalog) => {
    Object.assign(catalogByProfile, newCatalog);
  };

  /**
   * Retorna contagem de filmes por perfil
   * @returns {Object} Objeto com perfil como chave e quantidade como valor
   */
  const getMovieCount = () => {
    const count = {};
    Object.entries(catalogByProfile).forEach(([profile, movies]) => {
      count[profile] = movies.length;
    });
    return count;
  };

  /**
   * Busca filmes contendo um termo no título (case-insensitive)
   * @param {string} term - Termo de busca
   * @param {string} profileName - Opcional: restringir a um perfil
   * @returns {Array} Filmes encontrados nos diferentes perfis
   */
  const searchMovies = (term, profileName = null) => {
    const searchTerm = term.toLowerCase();
    const results = [];

    if (profileName) {
      const movies = getMoviesByProfile(profileName);
      results.push(
        ...movies.filter(m => m.titulo.toLowerCase().includes(searchTerm))
      );
    } else {
      Object.entries(catalogByProfile).forEach(([profile, movies]) => {
        results.push(
          ...movies.filter(m => m.titulo.toLowerCase().includes(searchTerm))
        );
      });
    }

    return results;
  };

  /**
   * API pública do serviço
   */
  return {
    getMoviesByProfile,
    getMovieByTitle,
    getAvailableProfiles,
    profileExists,
    getAllMovies,
    updateCatalog,
    getMovieCount,
    searchMovies
  };
})();

// ✅ Exportar para uso em home.js
// Descomente se usando ES6 modules:
// export default movieService;
