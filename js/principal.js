document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');

    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    // NUEVO: título dinámico para el carrusel "mejores"
    let tituloMejoresElem = null;                          // NUEVO
    const DEFAULT_MEJORES_TITLE = 'Los mejores puntuados'; // NUEVO

    // -------- Navegación header --------
    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            const idUsuario = localStorage.getItem('usuario_id');

            if (!idUsuario) {
                console.warn('No hay usuario_id en localStorage, redirigiendo a login...');
                window.location.href = 'login.html';
                return;
            }

            window.location.href = `carrito.html?id_usuario=${encodeURIComponent(idUsuario)}`;
        });
    }

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // -------- Helpers de fetch --------
    async function fetchJson(url) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                console.error('Error al llamar a la API:', resp.status, resp.statusText);
                return [];
            }
            return await resp.json();
        } catch (err) {
            console.error('Error de red al llamar a la API:', err);
            return [];
        }
    }

    async function getCategorias() {
        const url = `${API_BASE_URL}/categorias`;
        return fetchJson(url);
    }

    async function getRestaurantesTodos() {
        const url = `${API_BASE_URL}/restaurantes?solo_activos=true`;
        return fetchJson(url);
    }

    async function getRestaurantesBusqueda(query) {
        const url = `${API_BASE_URL}/restaurantes/buscar?q=${encodeURIComponent(query)}&solo_activos=true`;
        return fetchJson(url);
    }

    async function getRestaurantesFiltrados({ ratingMin = null, tiempoMax = null, costoEnvioMax = null } = {}) {
        const params = new URLSearchParams();
        params.append('solo_activos', 'true');

        if (ratingMin !== null) params.append('rating_min', String(ratingMin));
        if (tiempoMax !== null) params.append('tiempo_max', String(tiempoMax));
        if (costoEnvioMax !== null) params.append('costo_envio_max', String(costoEnvioMax));

        const url = `${API_BASE_URL}/restaurantes/filtrar?${params.toString()}`;
        return fetchJson(url);
    }

    // 👉 NUEVO: endpoint de populares
    async function getRestaurantesPopulares(limite = 6) {
        const url = `${API_BASE_URL}/restaurantes/populares?limite=${limite}`;
        return fetchJson(url);
    }

    // 👉 NUEVO: restaurantes por categoría usando slugs y POST /restaurantes/por-categorias
    async function getRestaurantesPorCategoriaSlug(slugCategoria) {          // NUEVO
        const url = `${API_BASE_URL}/restaurantes/por-categorias`;          // NUEVO
        const body = { categorias: [slugCategoria] };                       // NUEVO

        try {                                                               // NUEVO
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!resp.ok) {
                console.error('Error al obtener restaurantes por categoría:', resp.status, resp.statusText);
                return [];
            }

            return await resp.json();
        } catch (err) {
            console.error('Error de red en restaurantes por categoría:', err);
            return [];
        }
    }

    // -------- Render categorías en los menús laterales --------
    function renderCategorias(categorias) {
        if (navCategorias) {
            navCategorias.innerHTML = '';

            navCategorias.style.minHeight = '230px';
            navCategorias.style.overflowY = 'auto';

            categorias.forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;

                // IMPORTANTE: usamos el slug que viene de la API
                const slug = cat.slug || cat.nombre; // NUEVO (fallback por si acaso)

                a.addEventListener('click', async (e) => { // NUEVO
                    e.preventDefault();

                    // Pedimos a la API los restaurantes de esa categoría (por slug)
                    baseRestaurantes = await getRestaurantesPorCategoriaSlug(slug);

                    const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
                        const ra = a.calificacion?.promedio ?? 0;
                        const rb = b.calificacion?.promedio ?? 0;
                        return rb - ra;
                    });
                    setCarouselData('mejores', mejoresOrdenados);

                    // Cambiamos el título del carrusel de "Los mejores puntuados"
                    if (tituloMejoresElem) {                    // NUEVO
                        tituloMejoresElem.textContent = cat.nombre;
                    }
                });

                navCategorias.appendChild(a);
            });
        }

        if (navMasBuscados) {
            navMasBuscados.innerHTML = '';
            categorias.slice(0, 6).forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;

                const slug = cat.slug || cat.nombre; // NUEVO (mismo que arriba)

                a.addEventListener('click', async (e) => { // NUEVO
                    e.preventDefault();

                    baseRestaurantes = await getRestaurantesPorCategoriaSlug(slug);

                    const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
                        const ra = a.calificacion?.promedio ?? 0;
                        const rb = b.calificacion?.promedio ?? 0;
                        return rb - ra;
                    });
                    setCarouselData('mejores', mejoresOrdenados);

                    if (tituloMejoresElem) {                    // NUEVO
                        tituloMejoresElem.textContent = cat.nombre;
                    }
                });

                navMasBuscados.appendChild(a);
            });
        }
    }

    // -------- Crear tarjeta de restaurante --------
    function createRestaurantCard(restaurante) {
        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.setAttribute('data-id', restaurante.id);

        const nombre = restaurante.nombre ?? 'Restaurante';
        const minutosProm = restaurante.entrega?.minutosPromedio ?? '–';
        const calificacion = restaurante.calificacion?.promedio ?? '–';
        const tarifaEnvio = restaurante.entrega?.tarifa ?? 0;

        const imagenUrl = restaurante.imagen || restaurante.imageUrl || './assets/images/Coffe-surf.jpg';

        card.innerHTML = `
            <img src="${imagenUrl}" alt="Imagen del restaurante">
            <h2>${nombre}</h2>

            <div class="card-mobile-info">
                <div class="card-info-top">
                    <span class="card-time">${minutosProm} min</span>
                    <span class="card-rating">${calificacion} ★</span>
                </div>
                <p class="card-cost">Costo de envío: $${tarifaEnvio} MXN</p>
            </div>

            <button class="card-order-button-desktop">Ordenar ahora</button>
        `;

        // Click en la tarjeta
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-order-button-desktop')) {
                window.location.href = `restaurante.html?id=${restaurante.id}`;
            }
        });

        // Click en "Ordenar ahora"
        card.querySelector('.card-order-button-desktop').addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `restaurante.html?id=${restaurante.id}`;
        });

        return card;
    }

    // =====================================================
    //               LÓGICA DE CARRUSELES
    // =====================================================

    let baseRestaurantes = [];       // para "mejores puntuados"
    let popularesRestaurantes = [];  // para "populares cerca de ti"
    const carousels = [];            // [{aside, prevBtn, nextBtn, data, visibleCount, startIndex, type}]

    function createCarousels() {
        const asides = document.querySelectorAll('.cartas');

        asides.forEach((aside, index) => {
            const header = aside.querySelector('header');
            let prevBtn = aside.querySelector('.carousel-prev');
            let nextBtn = aside.querySelector('.carousel-next');

            // NUEVO: guardamos el <h1> del segundo carrusel ("Los mejores puntuados")
            if (index === 1 && header) {                            // NUEVO
                tituloMejoresElem = header.querySelector('h1');     // NUEVO
            }                                                       // NUEVO

            // Si no tienen clase, tomamos los dos primeros <button> del header
            if (!prevBtn && header) {
                prevBtn = header.querySelector('button:nth-of-type(1)');
            }
            if (!nextBtn && header) {
                nextBtn = header.querySelector('button:nth-of-type(2)');
            }

            const carousel = {
                aside,
                prevBtn,
                nextBtn,
                data: [],
                visibleCount: 3,
                startIndex: 0,
                type: index === 0 ? 'populares' : 'mejores'
            };

            carousels.push(carousel);

            if (prevBtn) {
                prevBtn.addEventListener('click', () => moveCarousel(carousel, -1));
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => moveCarousel(carousel, +1));
            }

            // Scroll + Shift para navegar
            aside.addEventListener('wheel', (e) => {
                if (!e.shiftKey) return;
                e.preventDefault();
                if (e.deltaY > 0 || e.deltaX > 0) {
                    moveCarousel(carousel, +1);
                } else if (e.deltaY < 0 || e.deltaX < 0) {
                    moveCarousel(carousel, -1);
                }
            }, { passive: false });
        });
    }

    function setCarouselData(type, data) {
        const carousel = carousels.find(c => c.type === type);
        if (!carousel) return;
        carousel.data = data || [];
        carousel.startIndex = 0;
        renderCarousel(carousel);
    }

    function renderCarousel(carousel) {
        const { aside, data, visibleCount, startIndex } = carousel;

        // borrar tarjetas actuales (no tocamos el header)
        aside.querySelectorAll('.tarjeta').forEach(card => card.remove());

        const total = data.length;
        if (!total) return;

        const maxVisible = Math.min(visibleCount, total);

        for (let i = 0; i < maxVisible; i++) {
            const idx = (startIndex + i) % total; // circular
            const restaurante = data[idx];
            const card = createRestaurantCard(restaurante);
            aside.appendChild(card); // se posicionan en el grid según tu CSS
        }
    }

    function moveCarousel(carousel, step) {
        const total = carousel.data.length;
        if (!total) return;

        carousel.startIndex = (carousel.startIndex + step + total) % total;
        renderCarousel(carousel);
    }

    // =====================================================
    //               LÓGICA PRINCIPAL
    // =====================================================

    async function cargarRestaurantesIniciales() {
        // Aseguramos que el título del carrusel de "mejores" arranque bien
        if (tituloMejoresElem) {
            tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE; // NUEVO
        }

        // 1) Populares
        popularesRestaurantes = await getRestaurantesPopulares(6);
        setCarouselData('populares', popularesRestaurantes);

        // 2) Todos: se usan para "mejores puntuados"
        baseRestaurantes = await getRestaurantesTodos();
        const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
            const ra = a.calificacion?.promedio ?? 0;
            const rb = b.calificacion?.promedio ?? 0;
            return rb - ra;
        });
        setCarouselData('mejores', mejoresOrdenados);
    }

    // Búsqueda → solo afecta "mejores puntuados"
    if (searchBar) {
        const form = searchBar.closest('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const query = searchBar.value.trim();

                // Al buscar, regresamos el título a su valor por defecto
                if (tituloMejoresElem) {                       // NUEVO
                    tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE;
                }

                if (!query) {
                    baseRestaurantes = await getRestaurantesTodos();
                } else {
                    baseRestaurantes = await getRestaurantesBusqueda(query);
                }

                const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
                    const ra = a.calificacion?.promedio ?? 0;
                    const rb = b.calificacion?.promedio ?? 0;
                    return rb - ra;
                });
                setCarouselData('mejores', mejoresOrdenados);
            });
        }
    }

    // Filtros → también solo afectan "mejores puntuados"
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const texto = button.textContent.trim();

            // Al usar filtros, devolvemos también el título original
            if (tituloMejoresElem) {                       // NUEVO
                tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE;
            }

            if (texto.includes('Mayor calificación')) {
                baseRestaurantes = await getRestaurantesFiltrados({ ratingMin: 4.5 });
            } else if (texto.includes('Menos de 30 min')) {
                baseRestaurantes = await getRestaurantesFiltrados({ tiempoMax: 30 });
            } else {
                baseRestaurantes = await getRestaurantesTodos();
            }

            const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
                const ra = a.calificacion?.promedio ?? 0;
                const rb = b.calificacion?.promedio ?? 0;
                return rb - ra;
            });
            setCarouselData('mejores', mejoresOrdenados);
        });
    });

    // Navegación móvil (simulada)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Init
    async function init() {
    createCarousels();

    const params = new URLSearchParams(window.location.search);
    const categoriaSlug = params.get('categoria');

    // 1) Populares siempre
    popularesRestaurantes = await getRestaurantesPopulares(6);
    setCarouselData('populares', popularesRestaurantes);

    // 2) Si viene ?categoria=..., filtramos por esa categoría
    if (categoriaSlug) {
        baseRestaurantes = await getRestaurantesPorCategoriaSlug(categoriaSlug);

        const mejoresOrdenados = [...baseRestaurantes].sort((a, b) => {
            const ra = a.calificacion?.promedio ?? 0;
            const rb = b.calificacion?.promedio ?? 0;
            return rb - ra;
        });
        setCarouselData('mejores', mejoresOrdenados);

        // si ya cargaste las categorías, puedes buscar el nombre por slug y
        // ponerlo como título; si no, podrías usar el slug directo
        if (tituloMejoresElem) {
            tituloMejoresElem.textContent = categoriaSlug;
        }
    } else {
        // Comportamiento normal
        await cargarRestaurantesIniciales();
    }

    const categorias = await getCategorias();
    renderCategorias(categorias);
}


    init();
});
