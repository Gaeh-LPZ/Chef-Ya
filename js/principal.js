// js/principal.js
document.addEventListener('DOMContentLoaded', () => {
    // Cambia esto si tu backend corre en otra URL/puerto
    const API_BASE_URL = 'http://localhost:8000';

    const asideCartas = document.querySelectorAll('.cartas');
    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');

    // ------------------ helpers de UI ------------------
    async function getCategorias() {
        const url = `${API_BASE_URL}/categorias`;
        return fetchJson(url);
    }

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

        // Para "Los más buscados" puedes tomar, por ejemplo, las primeras 4
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


    function createRestaurantCard(restaurante) {
        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.setAttribute('data-id', restaurante.id);

        // Campos que vienen de la API
        const nombre = restaurante.nombre ?? 'Restaurante';
        const minutosProm = restaurante.entrega?.minutosPromedio ?? '–';
        const calificacion = restaurante.calificacion?.promedio ?? '–';
        const tarifaEnvio = restaurante.entrega?.tarifa ?? 0;

        // Como aún no tenemos imagen en la API, usamos una por defecto
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

        // Click en la tarjeta → ir a la página del restaurante
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-order-button-desktop')) {
                window.location.href = `restaurante.html?id=${restaurante.id}`;
            }
        });

        // Click en "Ordenar ahora"
        card.querySelector('.card-order-button-desktop').addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(`Iniciando pedido para ${nombre} (ID: ${restaurante.id})`);
            window.location.href = `restaurante.html?id=${restaurante.id}`;
        });

        return card;
    }

    function renderRestaurants(restaurantes) {
        asideCartas.forEach((cartasContainer) => {
            // limpiar tarjetas previas
            const existingCards = cartasContainer.querySelectorAll('.tarjeta');
            existingCards.forEach(card => card.remove());

            // agregar nuevas tarjetas
            restaurantes.forEach(rest => {
                const card = createRestaurantCard(rest);
                cartasContainer.appendChild(card);
            });
        });
    }

    // ------------------ llamadas a la API ------------------

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

    // ------------------ lógica principal ------------------

    async function cargarRestaurantesIniciales() {
        console.log('Cargando restaurantes iniciales...');
        const restaurantes = await getRestaurantesTodos();
        renderRestaurants(restaurantes);
    }

    // búsqueda
    if (searchBar) {
        const form = searchBar.closest('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const query = searchBar.value.trim();
                if (!query) {
                    // si no hay texto, volvemos a listar todos
                    await cargarRestaurantesIniciales();
                    return;
                }
                console.log(`Buscando restaurantes: ${query}`);
                const restaurantes = await getRestaurantesBusqueda(query);
                renderRestaurants(restaurantes);
            });
        }
    }

    // filtros (solo manejo dos de tus botones por ahora)
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const texto = button.textContent.trim();
            console.log(`Aplicando filtro: ${texto}`);

            let restaurantes = [];

            if (texto.includes('Mayor calificación')) {
                // por ejemplo, rating mínimo 4.5
                restaurantes = await getRestaurantesFiltrados({ ratingMin: 4.5 });
            } else if (texto.includes('Menos de 30 min')) {
                restaurantes = await getRestaurantesFiltrados({ tiempoMax: 30 });
            } else {
                // otros filtros futuros / reset
                restaurantes = await getRestaurantesTodos();
            }

            renderRestaurants(restaurantes);
        });
    });

    // navegación móvil (simulado)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                console.log(`Navegación móvil a: ${link.textContent}`);
            });
        });
    }

    async function init() {
        await cargarRestaurantesIniciales();

        const categorias = await getCategorias();
        renderCategorias(categorias);
    }

    init();
});
