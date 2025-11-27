document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // ==========================
    //   SELECTORES
    // ==========================
    const searchBar = document.querySelector('.search-bar');
    const selectOrdenar = document.getElementById('filtro-ordenar');
    const selectEnvio = document.getElementById('filtro-envio');
    const btnCalificacion = document.getElementById('btn-filtro-calificacion');
    const btnRapido = document.getElementById('btn-filtro-rapido');

    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    // Menú de usuario
    const userMenu = document.getElementById('user-menu');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    const userNameLabel = document.getElementById('user-name-label');
    const userEmailLabel = document.getElementById('user-email-label');

    // Elementos de la vista principal
    const asidePopulares = document.querySelector('.cartas-populares');
    const asideMejores = document.querySelector('.cartas-mejores');
    let tituloPopularesElem = asidePopulares ? asidePopulares.querySelector('header h1') : null;
    let tituloMejoresElem = asideMejores ? asideMejores.querySelector('header h1') : null;

    const DEFAULT_POPULARES_TITLE = 'Populares cerca de ti';
    const DEFAULT_MEJORES_TITLE = 'Los mejores puntuados';

    // Estado global
    let todosRestaurantes = [];
    let popularesRestaurantes = [];
    let mejoresRestaurantes = [];
    let modoResultados = false;
    let menuAbierto = false;
    let searchTimeout = null;

    let estadoFiltros = {
        texto: '',
        orden: '',
        envio: ''
    };

    if (userMenu) userMenu.style.display = 'none';

    // ==========================
    //   UTILIDADES GEO & API
    // ==========================
    function obtenerUbicacionUsuario() {
        const data = localStorage.getItem('ubicacion_usuario');
        return data ? JSON.parse(data) : null;
    }

    function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;

        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = R * c;

        return parseFloat(distancia.toFixed(1));
    }

    function actualizarHeaderUbicacion() {
        const data = obtenerUbicacionUsuario();
        if (!data) return;

        const headerLocationText = document.querySelector('.main-header div p');
        if (headerLocationText) {
            const textoMostrar = data.calle ?
                `${data.calle}, ${data.cp || ''}` :
                data.direccion_completa;

            headerLocationText.textContent = textoMostrar.length > 30 ?
                textoMostrar.substring(0, 30) + '...' :
                textoMostrar;
            headerLocationText.title = data.direccion_completa;
        }
    }

    async function fetchJson(url, options = {}) {
        try {
            const resp = await fetch(url, options);
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async function getRestaurantesTodos() {
        return fetchJson(`${API_BASE_URL}/restaurantes?solo_activos=true`);
    }
    async function getCategorias() {
        return fetchJson(`${API_BASE_URL}/categorias`);
    }
    async function getRestaurantesPopulares(limite) {
        return fetchJson(`${API_BASE_URL}/restaurantes/populares?limite=${limite}`);
    }
    async function getRestaurantesPorCategoriaSlug(slug) {
        try {
            const resp = await fetch(`${API_BASE_URL}/restaurantes/por-categorias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categorias: [slug] })
            });
            return resp.ok ? await resp.json() : [];
        } catch { return []; }
    }
    async function getUsuarioPorId(id) {
        return fetchJson(`${API_BASE_URL}/usuarios/${id}`);
    }

    // ==========================
    //   LÓGICA DE FILTRADO
    // ==========================
    function aplicarFiltrosGlobales() {
        // Si no hay filtros activos, volvemos a la vista normal
        if (!estadoFiltros.texto && !estadoFiltros.orden && !estadoFiltros.envio) {
            restaurarVistaInicial();
            return;
        }

        let resultados = [...todosRestaurantes];
        // Nota: todosRestaurantes YA viene filtrado por distancia < 20km desde la carga inicial

        // 1. Filtro por Texto
        if (estadoFiltros.texto) {
            const q = estadoFiltros.texto.toLowerCase();
            resultados = resultados.filter(r => {
                const nombre = (r.nombre || '').toLowerCase();
                const cats = Array.isArray(r.categorias) ? r.categorias.join(' ').toLowerCase() : '';
                return nombre.includes(q) || cats.includes(q);
            });
        }

        // 2. Filtro por Envío
        if (estadoFiltros.envio) {
            if (estadoFiltros.envio === 'gratis') {
                resultados = resultados.filter(r => (r.entrega?.tarifa || 0) === 0);
            } else {
                const max = parseFloat(estadoFiltros.envio);
                resultados = resultados.filter(r => (r.entrega?.tarifa || 0) <= max);
            }
        }

        // 3. Ordenamiento Unificado
        if (estadoFiltros.orden) {
            resultados.sort((a, b) => {
                if (estadoFiltros.orden === 'calificacion') {
                    return (b.calificacion?.promedio || 0) - (a.calificacion?.promedio || 0);
                }
                if (estadoFiltros.orden === 'tiempo') {
                    return (a.entrega?.minutosPromedio || 999) - (b.entrega?.minutosPromedio || 999);
                }
                if (estadoFiltros.orden === 'envio') {
                    return (a.entrega?.tarifa || 0) - (b.entrega?.tarifa || 0);
                }
                if (estadoFiltros.orden === 'cercania') {
                    return (a.distanciaKm || 999) - (b.distanciaKm || 999);
                }
                return 0;
            });
        }

        // Definir título
        let titulo = "Resultados";
        if (estadoFiltros.texto) titulo = `Resultados para "${estadoFiltros.texto}"`;
        else if (estadoFiltros.orden === 'calificacion') titulo = "Mejor calificados";
        else if (estadoFiltros.orden === 'tiempo') titulo = "Los más rápidos";
        else if (estadoFiltros.orden === 'cercania') titulo = "Más cercanos a ti";

        mostrarResultados(resultados, titulo);
    }

    // Listeners de filtros
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            estadoFiltros.texto = e.target.value.trim();
            if (searchTimeout) clearTimeout(searchTimeout);
            searchTimeout = setTimeout(aplicarFiltrosGlobales, 300);
        });
        const form = searchBar.closest('form');
        if (form) form.addEventListener('submit', e => {
            e.preventDefault();
            aplicarFiltrosGlobales();
        });
    }

    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', (e) => {
            estadoFiltros.orden = e.target.value;
            aplicarFiltrosGlobales();
        });
    }

    if (selectEnvio) {
        selectEnvio.addEventListener('change', (e) => {
            estadoFiltros.envio = e.target.value;
            aplicarFiltrosGlobales();
        });
    }

    if (btnCalificacion) {
        btnCalificacion.addEventListener('click', () => {
            estadoFiltros.orden = 'calificacion';
            if (selectOrdenar) selectOrdenar.value = 'calificacion';
            aplicarFiltrosGlobales();
        });
    }

    if (btnRapido) {
        btnRapido.addEventListener('click', () => {
            estadoFiltros.orden = 'tiempo';
            if (selectOrdenar) selectOrdenar.value = 'tiempo';
            aplicarFiltrosGlobales();
        });
    }

    // ==========================
    //   RENDERIZADO (UI)
    // ==========================
    function createRestaurantCard(restaurante) {
        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.setAttribute('data-id', restaurante.id);

        const nombre = restaurante.nombre ?? 'Restaurante';
        const minutosProm = restaurante.entrega?.minutosPromedio ?? '–';
        const calificacion = restaurante.calificacion?.promedio ?? '–';
        const tarifaEnvio = restaurante.entrega?.tarifa ?? 0;
        
        // Manejo de imagen con fallback
        const imagenUrl = restaurante.imagen || './assets/images/Coffe-surf.jpg';

        const distanciaTexto = restaurante.distanciaKm ?
            `<span style="font-size: 0.75rem; color: #666; display:block; margin-bottom:0.25rem;">📍 ${restaurante.distanciaKm} km</span>` :
            '';

        card.innerHTML = `
            <img 
                src="${imagenUrl}" 
                alt="Imagen del restaurante"
                onerror="this.onerror=null;this.src='./assets/images/Coffe-surf.jpg';"
            >
            <h2>${nombre}</h2>
            <div style="padding: 0 1rem;">${distanciaTexto}</div>

            <div class="card-mobile-info">
                <div class="card-info-top">
                    <span class="card-time">${minutosProm} min</span>
                    <span class="card-rating">${calificacion} ★</span>
                </div>
                <p class="card-cost">Costo de envío: $${tarifaEnvio} MXN</p>
            </div>

            <button class="card-order-button-desktop">Ordenar ahora</button>
        `;

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
            aside.appendChild(createRestaurantCard(r));
        });
    }

    function renderCarousel(carousel) {
        const { aside, data, visibleCount, startIndex } = carousel;

        // Limpieza
        aside.querySelectorAll('.tarjeta').forEach(card => card.remove());
        aside.querySelectorAll('.no-results').forEach(msg => msg.remove());
        let track = aside.querySelector('.mobile-track');

        const total = data.length;
        if (!total) {
            if (track) track.remove();
            const msg = document.createElement('p');
            msg.textContent = 'No hay restaurantes.';
            msg.classList.add('no-results');
            aside.appendChild(msg);
            return;
        }

        const esMovil = window.innerWidth <= 768;
        const count = esMovil ? total : Math.min(visibleCount, total);

        // Crear/Destruir track móvil
        if (esMovil) {
            if (!track) {
                track = document.createElement('div');
                track.className = 'mobile-track';
                const header = aside.querySelector('header');
                if (header) header.insertAdjacentElement('afterend', track);
                else aside.appendChild(track);
            }
        } else {
            if (track) track.remove();
            track = null;
        }

        // Renderizar tarjetas
        for (let i = 0; i < count; i++) {
            const idx = esMovil ? i : (startIndex + i) % total;
            const restaurante = data[idx];
            const card = createRestaurantCard(restaurante);

            if (esMovil && track) {
                track.appendChild(card);
            } else {
                aside.appendChild(card);
            }
        }
    }

    function configurarCarrusel(aside, datosRestaurantes) {
        const header = aside.querySelector('header');
        let prevBtn = header ? header.querySelector('button:nth-of-type(1)') : null;
        let nextBtn = header ? header.querySelector('button:nth-of-type(2)') : null;

        const carousel = {
            aside,
            data: datosRestaurantes,
            visibleCount: 3,
            startIndex: 0
        };

        // Listeners para botones (clonamos para evitar duplicidad de eventos si se re-configura)
        if (prevBtn) {
            const newPrev = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrev, prevBtn);
            newPrev.addEventListener('click', () => {
                const total = carousel.data.length;
                carousel.startIndex = (carousel.startIndex - 1 + total) % total;
                renderCarousel(carousel);
            });
        }
        if (nextBtn) {
            const newNext = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNext, nextBtn);
            newNext.addEventListener('click', () => {
                const total = carousel.data.length;
                carousel.startIndex = (carousel.startIndex + 1) % total;
                renderCarousel(carousel);
            });
        }

        // Scroll con rueda en desktop
        aside.addEventListener('wheel', (e) => {
            if (window.innerWidth <= 768 || modoResultados) return;
            if (e.shiftKey) {
                e.preventDefault();
                const total = carousel.data.length;
                if (e.deltaY > 0 || e.deltaX > 0) {
                    carousel.startIndex = (carousel.startIndex + 1) % total;
                } else if (e.deltaY < 0 || e.deltaX < 0) {
                    carousel.startIndex = (carousel.startIndex - 1 + total) % total;
                }
                renderCarousel(carousel);
            }
        }, { passive: false });

        renderCarousel(carousel);
    }

    // ==========================
    //   ESTRUCTURA DINÁMICA
    // ==========================
    function renderCategoriasDinamicas(categorias, todosLosRestaurantes) {
        const contenedor = document.getElementById('contenedor-categorias-dinamicas');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        categorias.forEach(cat => {
            const restaurantesDeLaCategoria = todosLosRestaurantes.filter(r =>
                Array.isArray(r.categorias) && r.categorias.includes(cat.slug)
            );

            if (restaurantesDeLaCategoria.length === 0) return;

            const aside = document.createElement('aside');
            aside.className = 'cartas';
            aside.style.marginTop = '3rem';
            aside.style.marginBottom = '1rem';

            aside.innerHTML = `
                <header>
                    <h1>${cat.nombre}</h1>
                    <div style="display: flex; height: 20px; gap: 1rem;">
                        <nav>
                            <a href="principal.html?categoria=${cat.slug}">Ver Todos</a>
                        </nav>
                        <button type="button"><img src="./assets/icons/arrow-narrow-left.svg"></button>
                        <button type="button"><img src="./assets/icons/arrow-narrow-right.svg"></button>
                    </div>
                </header>
            `;

            contenedor.appendChild(aside);
            configurarCarrusel(aside, restaurantesDeLaCategoria);
        });
    }

    // Helper para actualizar datos de los carruseles estáticos (Populares/Mejores)
    function actualizarCarruselEstatico(clase, nuevosDatos) {
        const aside = document.querySelector(`.${clase}`);
        if(aside) {
            configurarCarrusel(aside, nuevosDatos); 
        }
    }

    // ==========================
    //   MANEJO DE VISTAS
    // ==========================
    function ocultarControlesCarrusel() {
        document.querySelectorAll('.cartas header div').forEach(div => div.style.display = 'none');
    }

    function mostrarControlesCarrusel() {
        document.querySelectorAll('.cartas header div').forEach(div => div.style.display = '');
    }

    function mostrarResultados(restaurantes, titulo) {
        modoResultados = true;
        ocultarControlesCarrusel();

        if (asidePopulares) {
            if (tituloPopularesElem) tituloPopularesElem.textContent = titulo;
            renderLista(asidePopulares, restaurantes);
        }

        if (asideMejores) asideMejores.style.display = 'none';
        if (tituloMejoresElem) tituloMejoresElem.textContent = '';

        const catContainer = document.getElementById('contenedor-categorias-dinamicas');
        if (catContainer) catContainer.style.display = 'none';
    }

    async function restaurarVistaInicial() {
        modoResultados = false;
        if (asideMejores) asideMejores.style.display = '';
        
        const catContainer = document.getElementById('contenedor-categorias-dinamicas');
        if (catContainer) catContainer.style.display = 'block';

        mostrarControlesCarrusel();
        await cargarRestaurantesIniciales();
    }

    // ==========================
    //   CARGA INICIAL DE DATOS
    // ==========================
    async function cargarRestaurantesIniciales() {
        if (tituloPopularesElem) tituloPopularesElem.textContent = DEFAULT_POPULARES_TITLE;
        if (tituloMejoresElem) tituloMejoresElem.textContent = DEFAULT_MEJORES_TITLE;

        const DISTANCIA_MAXIMA_PERMITIDA = 20; // km

        // 1. Cargar y filtrar LISTA PRINCIPAL
        if (!todosRestaurantes.length) {
            todosRestaurantes = await getRestaurantesTodos();
            
            const ubicacionUsuario = obtenerUbicacionUsuario();
            if (ubicacionUsuario && ubicacionUsuario.lat && ubicacionUsuario.lon) {
                // A) Calcular distancias
                todosRestaurantes.forEach(r => {
                    const latRest = r.direccion?.geo?.lat;
                    const lngRest = r.direccion?.geo?.lng;
                    r.distanciaKm = calcularDistanciaKm(
                        ubicacionUsuario.lat, ubicacionUsuario.lon, latRest, lngRest
                    );
                });

                // B) Filtrar lista principal inmediatamente
                todosRestaurantes = todosRestaurantes.filter(r => {
                    // Si no tiene distancia válida (o no hay geoloc), lo dejamos pasar 
                    // O lo filtramos si preferimos estricto. Aquí estricto > 20km:
                    if (r.distanciaKm === null || r.distanciaKm === undefined) return true;
                    return r.distanciaKm <= DISTANCIA_MAXIMA_PERMITIDA;
                });
                
                console.log("Restaurantes cercanos:", todosRestaurantes.map(r => `${r.nombre}: ${r.distanciaKm}km`));
            }
        }

        // 2. Obtener y filtrar POPULARES
        // Pedimos más (20) para tener margen de filtrado por distancia
        let popularesRaw = await getRestaurantesPopulares(20); 
        
        popularesRestaurantes = [];
        popularesRaw.forEach(p => {
            // Buscamos el match en la lista general que YA está filtrada por distancia
            const match = todosRestaurantes.find(t => t.id === p.id);
            if(match) {
                popularesRestaurantes.push(match);
            }
        });
        // Cortamos a 6
        popularesRestaurantes = popularesRestaurantes.slice(0, 6);
        
        // 3. Calcular MEJORES (Usando la lista ya filtrada)
        mejoresRestaurantes = [...todosRestaurantes].sort((a, b) => 
            (b.calificacion?.promedio || 0) - (a.calificacion?.promedio || 0)
        );

        // 4. Renderizar
        actualizarCarruselEstatico('cartas-populares', popularesRestaurantes);
        actualizarCarruselEstatico('cartas-mejores', mejoresRestaurantes);
    }

    // ==========================
    //   CATEGORÍAS / NAV BAR
    // ==========================
    function renderNavCategorias(categorias) {
        // Lógica para la barra lateral izquierda
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
                    let results = await getRestaurantesPorCategoriaSlug(slug);
                    
                    // Inyectar distancia si existe usuario
                    const ubicacionUsuario = obtenerUbicacionUsuario();
                    if(ubicacionUsuario){
                         results.forEach(r => {
                            const match = todosRestaurantes.find(t => t.id === r.id);
                            if(match) r.distanciaKm = match.distanciaKm;
                         });
                    }
                    
                    // Filtrar por distancia también aquí por seguridad visual
                    results = results.filter(r => {
                        if (r.distanciaKm && r.distanciaKm > 20) return false;
                        return true;
                    });

                    const ordenados = [...results].sort((a, b) => 
                        (b.calificacion?.promedio || 0) - (a.calificacion?.promedio || 0)
                    );
                    mostrarResultados(ordenados, cat.nombre);
                });
                navCategorias.appendChild(a);
            });
        }
        
        // Más buscados
        if (navMasBuscados) {
            navMasBuscados.innerHTML = '';
            categorias.slice(0, 6).forEach(cat => {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = cat.nombre;
                const slug = cat.slug || cat.nombre;
                a.addEventListener('click', async (e) => {
                    e.preventDefault();
                    // Misma lógica...
                    let results = await getRestaurantesPorCategoriaSlug(slug);
                    const ubicacionUsuario = obtenerUbicacionUsuario();
                    if(ubicacionUsuario){
                         results.forEach(r => {
                            const match = todosRestaurantes.find(t => t.id === r.id);
                            if(match) r.distanciaKm = match.distanciaKm;
                         });
                    }
                    // Filtro distancia
                    results = results.filter(r => (!r.distanciaKm || r.distanciaKm <= 20));

                    const ordenados = [...results].sort((a, b) => 
                        (b.calificacion?.promedio || 0) - (a.calificacion?.promedio || 0)
                    );
                    mostrarResultados(ordenados, cat.nombre);
                });
                navMasBuscados.appendChild(a);
            });
        }
    }

    // ==========================
    //   HEADER / USUARIO INTERFAZ
    // ==========================
    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            const id = localStorage.getItem('usuario_id');
            if (!id) window.location.href = 'login.html';
            else window.location.href = `carrito.html?id_usuario=${encodeURIComponent(id)}`;
        });
    }

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = localStorage.getItem('usuario_id');
            if (!id) {
                window.location.href = 'login.html';
                return;
            }
            if (userMenu) {
                menuAbierto = !menuAbierto;
                userMenu.style.display = menuAbierto ? 'flex' : 'none';
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (!userMenu) return;
        if (!userMenu.contains(event.target) && (!userLoginBtn || !userLoginBtn.contains(event.target))) {
            userMenu.style.display = 'none';
            menuAbierto = false;
        }
    });

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = localStorage.getItem('usuario_id');
            if (id) window.location.href = `usuario.html?id_usuario=${encodeURIComponent(id)}`;
            else window.location.href = 'login.html';
        });
    }

    if (userLogoutBtn) {
        userLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Cerrar sesión?')) {
                localStorage.removeItem('usuario_id');
                localStorage.removeItem('usuario_data');
                window.location.href = 'principal.html';
            }
        });
    }

    // Notificaciones
    const idUsuarioGlobal = localStorage.getItem('usuario_id');
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    async function consultarNotificaciones() {
        if (!idUsuarioGlobal) return;
        try {
            const r = await fetch(`${API_BASE_URL}/usuarios/${idUsuarioGlobal}/notificaciones/no-leidas`);
            if (r.ok) {
                const notifs = await r.json();
                notifs.forEach(n => {
                    if (Notification.permission === "granted") new Notification(n.titulo, { body: n.mensaje });
                    else console.log(`Notif: ${n.titulo}`);
                });
            }
        } catch {}
    }
    if (idUsuarioGlobal) setInterval(consultarNotificaciones, 10000);

    // ==========================
    //   DATOS DE USUARIO
    // ==========================
    async function rellenarDatosUsuarioMenu() {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        const usuario = await getUsuarioPorId(idUsuario);
        
        if (usuario) {
            if (userNameLabel) userNameLabel.textContent = usuario.nombre || 'Usuario';
            if (userEmailLabel) userEmailLabel.textContent = usuario.correo || 'correo@ejemplo.com';
        }
    }

    // ==========================
    //   INIT
    // ==========================
    async function init() {
        actualizarHeaderUbicacion();
        await rellenarDatosUsuarioMenu();

        // 1. Cargar datos base (esto llenará todosRestaurantes con filtro de distancia)
        await cargarRestaurantesIniciales();

        const categorias = await getCategorias();
        renderNavCategorias(categorias);

        // 2. Verificar URL params (si vienes de "Buscar categoría")
        const params = new URLSearchParams(window.location.search);
        const categoriaSlug = params.get('categoria');

        if (categoriaSlug) {
            let results = await getRestaurantesPorCategoriaSlug(categoriaSlug);
            
            // Inyectar distancia si existe usuario
            const ubicacionUsuario = obtenerUbicacionUsuario();
            if(ubicacionUsuario){
                results.forEach(r => {
                   const match = todosRestaurantes.find(t => t.id === r.id);
                   if(match) r.distanciaKm = match.distanciaKm;
                });
            }
            
            // Filtrar lejanos
            results = results.filter(r => (!r.distanciaKm || r.distanciaKm <= 20));

            const ordenados = [...results].sort((a, b) => 
                (b.calificacion?.promedio || 0) - (a.calificacion?.promedio || 0)
            );
            mostrarResultados(ordenados, categoriaSlug);
        } else {
            // 3. Si no hay categoría en URL, renderizamos las categorías dinámicas en el home
            renderCategoriasDinamicas(categorias, todosRestaurantes); 
        }
    }

    init();
});