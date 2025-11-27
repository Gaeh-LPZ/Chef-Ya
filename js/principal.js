document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // ==========================
    //   UBICACIÓN EN HEADER
    // ==========================
    function actualizarHeaderUbicacion() {
        const ubicacionGuardada = localStorage.getItem('ubicacion_usuario');
        if (!ubicacionGuardada) return;

        try {
            const data = JSON.parse(ubicacionGuardada);
            const headerLocationText = document.querySelector('.main-header div p');

            if (headerLocationText) {
                const textoMostrar = data.calle
                    ? `${data.calle}, ${data.cp || ''}`
                    : data.direccion_completa;

                headerLocationText.textContent = textoMostrar.length > 30
                    ? textoMostrar.substring(0, 30) + '...'
                    : textoMostrar;

                headerLocationText.title = data.direccion_completa;
            }
        } catch (e) {
            console.error('Error al leer ubicación guardada:', e);
        }
    }

    actualizarHeaderUbicacion();

    // ==========================
    //   SELECTORES GENERALES
    // ==========================
    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');

    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    // ELEMENTOS DEL MENÚ DE USUARIO
    const userMenu = document.getElementById('user-menu');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    // Agregamos ahora los datos de los usuarios
    const userNameLabel = document.getElementById('user-name-label');
    const userEmailLabel = document.getElementById('user-email-label');
    
    // Estado del menú
    let menuAbierto = false;

    // Asegurar que empiece oculto (por si acaso)
    if (userMenu) {
        userMenu.style.display = 'none';
    }

    // CAMBIO: ahora tomamos los aside por sus clases nuevas
    const asidePopulares = document.querySelector('.cartas-populares');
    const asideMejores = document.querySelector('.cartas-mejores');

    let tituloPopularesElem = asidePopulares
        ? asidePopulares.querySelector('header h1')
        : null;
    let tituloMejoresElem = asideMejores
        ? asideMejores.querySelector('header h1')
        : null;

    const DEFAULT_POPULARES_TITLE = 'Populares cerca de ti';
    const DEFAULT_MEJORES_TITLE = 'Los mejores puntuados';

    // Modo "resultados" (búsqueda/categoría) activo
    let modoResultados = false;

    // ==========================
    //   NAV HEADER
    // ==========================
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
    async function getUsuarioPorId(idUsuario) {
        const url = `${API_BASE_URL}/usuarios/${idUsuario}`;

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                console.error('Error al obtener datos de usuario:', resp.status, resp.statusText);
                return null;
            }
            return await resp.json();
        } catch (err) {
            console.error('Error de red al obtener usuario:', err);
            return null;
        }
    }

    async function rellenarDatosUsuarioMenu() {
        if (!userNameLabel || !userEmailLabel) return;

        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) {
            // Si no hay usuario logueado, puedes dejar los textos por defecto
            return;
        }

        const usuario = await getUsuarioPorId(idUsuario);
        if (!usuario) return;

        // Según tu esquema de la API, UsuarioLeer tiene nombre y correo
        userNameLabel.textContent = usuario.nombre || 'Usuario';
        userEmailLabel.textContent = usuario.correo || 'correo@ejemplo.com';
    }

    // BOTÓN DE USUARIO: abre/cierra menú
    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            

            if (!userMenu) return;

            menuAbierto = !menuAbierto;
            userMenu.style.display = menuAbierto ? 'flex' : 'none';
        });
    }

    // Cerrar el menú si se hace click fuera de él y del botón
    document.addEventListener('click', (event) => {
        if (!userMenu) return;

        const clickDentroMenu = userMenu.contains(event.target);
        const clickEnBoton = userLoginBtn && userLoginBtn.contains(event.target);

        if (!clickDentroMenu && !clickEnBoton) {
            userMenu.style.display = 'none';
            menuAbierto = false;
        }
    });

    // Evitar que clicks dentro del menú lo cierren
    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    userProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) {
            window.location.href = 'login.html';
            return;
        }
        window.location.href = `usuario.html?id_usuario=${encodeURIComponent(idUsuario)}`;
    });

    if (userLogoutBtn) {
        userLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmar = confirm('¿Seguro que quieres cerrar sesión?');
        if (!confirmar) return;

        // Elimina la información principal del usuario
        localStorage.removeItem('usuario_id');
        localStorage.removeItem('usuario_data'); // solo si la usas
        // Si guardas también el token, puedes borrarlo aquí:
        // localStorage.removeItem('access_token');

        // Opcional: también podrías limpiar ubicación si quieres que se pida de nuevo
        // localStorage.removeItem('ubicacion_usuario');

        // Redirigir a login
        window.location.href = 'principal.html';
        });
    }

    // ==========================
    //   HELPERS FETCH
    // ==========================
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

    async function getRestaurantesFiltrados({ ratingMin = null, tiempoMax = null, costoEnvioMax = null } = {}) {
        const params = new URLSearchParams();
        params.append('solo_activos', 'true');

        if (ratingMin !== null) params.append('rating_min', String(ratingMin));
        if (tiempoMax !== null) params.append('tiempo_max', String(tiempoMax));
        if (costoEnvioMax !== null) params.append('costo_envio_max', String(costoEnvioMax));

        const url = `${API_BASE_URL}/restaurantes/filtrar?${params.toString()}`;
        return fetchJson(url);
    }

    async function getRestaurantesPopulares(limite = 6) {
        const url = `${API_BASE_URL}/restaurantes/populares?limite=${limite}`;
        return fetchJson(url);
    }

    async function getRestaurantesPorCategoriaSlug(slugCategoria) {
        const url = `${API_BASE_URL}/restaurantes/por-categorias`;
        const body = { categorias: [slugCategoria] };

        try {
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

    // ==========================
    //   BUSQUEDA EN FRONTEND
    // ==========================
    function filtrarRestaurantesCoincidentes(restaurantes, query) {
        if (!query) return restaurantes;
        const q = query.toLowerCase();

        return restaurantes.filter(r => {
            const nombre = (r.nombre || '').toLowerCase();
            const cats = Array.isArray(r.categorias)
                ? r.categorias.join(' ').toLowerCase()
                : '';
            return nombre.includes(q) || cats.includes(q);
        });
    }

    // ==========================
    //   TARJETAS
    // ==========================
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

        card.style.gridRowStart = 'auto';

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-order-button-desktop')) {
                window.location.href = `restaurante.html?id=${restaurante.id}`;
            }
        });

        card.querySelector('.card-order-button-desktop').addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `restaurante.html?id=${restaurante.id}`;
        });

        return card;
    }

    function renderLista(aside, restaurantes) {
        if (!aside) return;

        aside.querySelectorAll('.tarjeta').forEach(card => card.remove());
        aside.querySelectorAll('.no-results').forEach(msg => msg.remove());

        if (!restaurantes || restaurantes.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No se encontraron restaurantes.';
            msg.style.marginTop = '1rem';
            msg.classList.add('no-results');
            aside.appendChild(msg);
            return;
        }

        restaurantes.forEach(r => {
            const card = createRestaurantCard(r);
            aside.appendChild(card);
        });
    }

    // ==========================
    //   CARRUSEL (MODO NORMAL)
    // ==========================
    const carousels = [];

    function createCarousels() {
        const asides = document.querySelectorAll('.cartas');

        asides.forEach((aside, index) => {
            const header = aside.querySelector('header');
            let prevBtn = null;
            let nextBtn = null;

            if (header) {
                prevBtn = header.querySelector('button:nth-of-type(1)');
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

            aside.addEventListener('wheel', (e) => {
                if (!e.shiftKey || modoResultados) return;
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

        aside.querySelectorAll('.tarjeta').forEach(card => card.remove());
        aside.querySelectorAll('.no-results').forEach(msg => msg.remove());

        const total = data.length;
        if (!total) {
            const msg = document.createElement('p');
            msg.textContent = 'No se encontraron restaurantes.';
            msg.style.marginTop = '1rem';
            msg.classList.add('no-results');
            aside.appendChild(msg);
            return;
        }

        const maxVisible = Math.min(visibleCount, total);

        for (let i = 0; i < maxVisible; i++) {
            const idx = (startIndex + i) % total;
            const restaurante = data[idx];
            const card = createRestaurantCard(restaurante);
            aside.appendChild(card);
        }
    }

    function moveCarousel(carousel, step) {
        const total = carousel.data.length;
        if (!total) return;

        carousel.startIndex = (carousel.startIndex + step + total) % total;
        renderCarousel(carousel);
    }

    // ==========================
    //   FLECHAS / "VER TODOS"
    // ==========================
    function ocultarControlesCarrusel() {
        const asides = document.querySelectorAll('.cartas');
        asides.forEach(aside => {
            const header = aside.querySelector('header');
            if (!header) return;

            const controlsDiv = header.querySelector('div');
            if (controlsDiv) {
                controlsDiv.style.display = 'none';
            }
        });
    }

    function mostrarControlesCarrusel() {
        const asides = document.querySelectorAll('.cartas');
        asides.forEach(aside => {
            const header = aside.querySelector('header');
            if (!header) return;

            const controlsDiv = header.querySelector('div');
            if (controlsDiv) {
                controlsDiv.style.display = '';
            }
        });
    }

    // ==========================
    //   MODO RESULTADOS
    // ==========================
    function mostrarResultados(restaurantes, titulo) {
        modoResultados = true;

        ocultarControlesCarrusel();

        if (asidePopulares) {
            if (tituloPopularesElem) tituloPopularesElem.textContent = titulo;
            renderLista(asidePopulares, restaurantes);
        }

        if (asideMejores) {
            asideMejores.style.display = 'none';
        }

        if (tituloMejoresElem) tituloMejoresElem.textContent = '';
    }

    async function restaurarVistaInicial() {
        modoResultados = false;

        if (asideMejores) {
            asideMejores.style.display = '';
        }

        mostrarControlesCarrusel();
        await cargarRestaurantesIniciales();
    }

    // ==========================
    //   CATEGORÍAS / ETIQUETAS
    // ==========================
    function renderCategorias(categorias) {
        if (navCategorias) {
            navCategorias.innerHTML = '';
            navCategorias.style.minHeight = '230px';
            navCategorias.style.overflowY = 'auto';

            categorias.forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;

                const slug = cat.slug || cat.nombre;

                a.addEventListener('click', async (e) => {
                    e.preventDefault();

                    let restaurantesCat = await getRestaurantesPorCategoriaSlug(slug);
                    restaurantesCat = restaurantesCat || [];

                    const ordenados = [...restaurantesCat].sort((a, b) => {
                        const ra = a.calificacion?.promedio ?? 0;
                        const rb = b.calificacion?.promedio ?? 0;
                        return rb - ra;
                    });

                    mostrarResultados(ordenados, cat.nombre);
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

                const slug = cat.slug || cat.nombre;

                a.addEventListener('click', async (e) => {
                    e.preventDefault();

                    let restaurantesCat = await getRestaurantesPorCategoriaSlug(slug);
                    restaurantesCat = restaurantesCat || [];

                    const ordenados = [...restaurantesCat].sort((a, b) => {
                        const ra = a.calificacion?.promedio ?? 0;
                        const rb = b.calificacion?.promedio ?? 0;
                        return rb - ra;
                    });

                    mostrarResultados(ordenados, cat.nombre);
                });

                navMasBuscados.appendChild(a);
            });
        }
    }

    // ==========================
    //   ESTADO DE RESTAURANTES
    // ==========================
    let todosRestaurantes = [];
    let popularesRestaurantes = [];
    let mejoresRestaurantes = [];

    async function cargarRestaurantesIniciales() {
        if (tituloPopularesElem) tituloPopularesElem.textContent = DEFAULT_POPULARES_TITLE;
        if (tituloMejoresElem) tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE;

        if (!todosRestaurantes.length) {
            todosRestaurantes = await getRestaurantesTodos();
        }

        popularesRestaurantes = await getRestaurantesPopulares(6);
        setCarouselData('populares', popularesRestaurantes);

        mejoresRestaurantes = [...todosRestaurantes].sort((a, b) => {
            const ra = a.calificacion?.promedio ?? 0;
            const rb = b.calificacion?.promedio ?? 0;
            return rb - ra;
        });
        setCarouselData('mejores', mejoresRestaurantes);
    }

    // ==========================
    //   BÚSQUEDA EN VIVO
    // ==========================
    let searchTimeout = null;

    async function aplicarBusqueda(query) {
        const q = query.trim();

        if (!q) {
            await restaurarVistaInicial();
            return;
        }

        if (!todosRestaurantes.length) {
            todosRestaurantes = await getRestaurantesTodos();
        }

        let resultados = filtrarRestaurantesCoincidentes(todosRestaurantes, q);
        mostrarResultados(resultados, q);
    }

    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const value = e.target.value;
            if (searchTimeout) clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                aplicarBusqueda(value);
            }, 250);
        });

        const form = searchBar.closest('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const query = searchBar.value;
                aplicarBusqueda(query);
            });
        }
    }

    // ==========================
    //   FILTROS
    // ==========================
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const texto = button.textContent.trim();

            modoResultados = false;

            if (asideMejores) {
                asideMejores.style.display = '';
            }

            if (tituloPopularesElem) tituloPopularesElem.textContent = DEFAULT_POPULARES_TITLE;
            if (tituloMejoresElem) tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE;

            mostrarControlesCarrusel();

            if (!popularesRestaurantes.length) {
                popularesRestaurantes = await getRestaurantesPopulares(6);
            }
            setCarouselData('populares', popularesRestaurantes);

            let filtrados = [];
            if (texto.includes('Mayor calificación')) {
                filtrados = await getRestaurantesFiltrados({ ratingMin: 4.5 });
            } else if (texto.includes('Menos de 30 min')) {
                filtrados = await getRestaurantesFiltrados({ tiempoMax: 30 });
            } else {
                filtrados = await getRestaurantesTodos();
            }

            filtrados = filtrados || [];
            const ordenados = [...filtrados].sort((a, b) => {
                const ra = a.calificacion?.promedio ?? 0;
                const rb = b.calificacion?.promedio ?? 0;
                return rb - ra;
            });

            setCarouselData('mejores', ordenados);
        });
    });

    // ==========================
    //   NAV MÓVIL
    // ==========================
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

    // ==========================
    //   INIT
    // ==========================
    async function init() {
        createCarousels();

        const params = new URLSearchParams(window.location.search);
        const categoriaSlug = params.get('categoria');

        todosRestaurantes = await getRestaurantesTodos();

        if (categoriaSlug) {
            let restaurantesCat = await getRestaurantesPorCategoriaSlug(categoriaSlug);
            restaurantesCat = restaurantesCat || [];

            const ordenados = [...restaurantesCat].sort((a, b) => {
                const ra = a.calificacion?.promedio ?? 0;
                const rb = b.calificacion?.promedio ?? 0;
                return rb - ra;
            });

            mostrarResultados(ordenados, categoriaSlug);
        } else {
            await cargarRestaurantesIniciales();
        }

        const categorias = await getCategorias();
        renderCategorias(categorias);
        await rellenarDatosUsuarioMenu();
    }

    init();
});
