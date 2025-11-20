// js/principal.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:8000';

    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');

    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    // -------- Navegación header --------
    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            window.location.href = 'carrito.html';
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

    // -------- Render categorías en los menús laterales --------
    function renderCategorias(categorias) {
        if (navCategorias) {
            navCategorias.innerHTML = '';
            categorias.forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;
                navCategorias.appendChild(a);
            });
        }

        if (navMasBuscados) {
            navMasBuscados.innerHTML = '';
            categorias.slice(0, 4).forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;
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

    let baseRestaurantes = [];
    const carousels = []; // [{aside, prevBtn, nextBtn, data, visibleCount, startIndex, type}]

    function createCarousels() {
        const asides = document.querySelectorAll('.cartas');

        asides.forEach((aside, index) => {
            // Intentar encontrar botones con clase, si no, tomar los dos primeros del header
            const header = aside.querySelector('header');
            let prevBtn = aside.querySelector('.carousel-prev');
            let nextBtn = aside.querySelector('.carousel-next');

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
                // Primer aside -> "Populares cerca de ti", segundo -> "Los mejores puntuados"
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

    function computeCarouselData(restaurantes) {
        // Populares cerca de ti → por menor tiempo de entrega
        const porCercania = [...restaurantes].sort((a, b) => {
            const ta = a.entrega?.minutosPromedio ?? 999;
            const tb = b.entrega?.minutosPromedio ?? 999;
            return ta - tb;
        });

        // Mejores puntuados → por mayor rating
        const porRating = [...restaurantes].sort((a, b) => {
            const ra = a.calificacion?.promedio ?? 0;
            const rb = b.calificacion?.promedio ?? 0;
            return rb - ra;
        });

        carousels.forEach(carousel => {
            carousel.data = carousel.type === 'populares' ? porCercania : porRating;
            carousel.startIndex = 0;
            renderCarousel(carousel);
        });
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
        baseRestaurantes = await getRestaurantesTodos();
        computeCarouselData(baseRestaurantes);
    }

    // Búsqueda
    if (searchBar) {
        const form = searchBar.closest('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const query = searchBar.value.trim();

                if (!query) {
                    baseRestaurantes = await getRestaurantesTodos();
                } else {
                    baseRestaurantes = await getRestaurantesBusqueda(query);
                }

                computeCarouselData(baseRestaurantes);
            });
        }
    }

    // Filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const texto = button.textContent.trim();

            if (texto.includes('Mayor calificación')) {
                baseRestaurantes = await getRestaurantesFiltrados({ ratingMin: 4.5 });
            } else if (texto.includes('Menos de 30 min')) {
                baseRestaurantes = await getRestaurantesFiltrados({ tiempoMax: 30 });
            } else {
                baseRestaurantes = await getRestaurantesTodos();
            }

            computeCarouselData(baseRestaurantes);
        });
    });

    // Navegación móvil (simulado)
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
        createCarousels();                // detecta los 2 asides .cartas
        await cargarRestaurantesIniciales();
        const categorias = await getCategorias();
        renderCategorias(categorias);
    }

    init();
});
