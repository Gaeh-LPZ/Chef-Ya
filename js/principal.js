document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com'; // Asegúrate de usar la URL correcta (localhost o render)

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
    //   NOTIFICACIONES (Polling)
    // ==========================
    const idUsuarioGlobal = localStorage.getItem('usuario_id');

    // 1. Pedir permiso
    if ("Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }

    // 2. Consultar
    async function consultarNotificaciones() {
        if (!idUsuarioGlobal) return;

        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${idUsuarioGlobal}/notificaciones/no-leidas`);
            if (response.ok) {
                const notificaciones = await response.json();
                
                notificaciones.forEach(notif => {
                    if (Notification.permission === "granted") {
                        new Notification(notif.titulo, {
                            body: notif.mensaje,
                            icon: './assets/images/Logo.png'
                        });
                    } else {
                        console.log(`🔔 Notificación: ${notif.titulo} - ${notif.mensaje}`);
                    }
                });
            }
        } catch (error) {
            console.error("Error polling notificaciones (ignorable si es red):", error);
        }
    }

    // 3. Activar intervalo (cada 10s)
    if (idUsuarioGlobal) {
        setInterval(consultarNotificaciones, 10000);
    }

    // ==========================
    //   SELECTORES GENERALES
    // ==========================
    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    const navMasBuscados = document.getElementById('nav-mas-buscados');
    const navCategorias = document.getElementById('nav-categorias');
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    // Elementos Menú Usuario
    const userMenu = document.getElementById('user-menu');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    const userNameLabel = document.getElementById('user-name-label');
    const userEmailLabel = document.getElementById('user-email-label');

    let menuAbierto = false;
    if (userMenu) userMenu.style.display = 'none';

    // Secciones
    const asidePopulares = document.querySelector('.cartas-populares') || document.querySelectorAll('.cartas')[0];
    const asideMejores = document.querySelector('.cartas-mejores') || document.querySelectorAll('.cartas')[1];

    let tituloPopularesElem = asidePopulares ? asidePopulares.querySelector('header h1') : null;
    let tituloMejoresElem = asideMejores ? asideMejores.querySelector('header h1') : null;

    const DEFAULT_POPULARES_TITLE = 'Populares cerca de ti';
    const DEFAULT_MEJORES_TITLE = 'Los mejores puntuados';
    
    let modoResultados = false;

    // ==========================
    //   NAV HEADER & USUARIO
    // ==========================
    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            if (!idUsuarioGlobal) {
                window.location.href = 'login.html';
                return;
            }
            window.location.href = `carrito.html?id_usuario=${encodeURIComponent(idUsuarioGlobal)}`;
        });
    }

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!userMenu) return; // Si no existe el menú, no hacemos nada
            menuAbierto = !menuAbierto;
            userMenu.style.display = menuAbierto ? 'flex' : 'none';
        });
    }

    // Cerrar menú al dar clic fuera
    document.addEventListener('click', (event) => {
        if (!userMenu) return;
        if (!userMenu.contains(event.target) && !userLoginBtn.contains(event.target)) {
            userMenu.style.display = 'none';
            menuAbierto = false;
        }
    });

    // Cargar datos usuario
    async function cargarDatosUsuarioMenu() {
        if (!idUsuarioGlobal || !userNameLabel) return;
        try {
            const resp = await fetch(`${API_BASE_URL}/usuarios/${idUsuarioGlobal}`);
            if (resp.ok) {
                const u = await resp.json();
                if(userNameLabel) userNameLabel.textContent = u.nombre;
                if(userEmailLabel) userEmailLabel.textContent = u.correo;
            }
        } catch(e) { console.error(e); }
    }

    // ==========================
    //   HELPERS FETCH
    // ==========================
    async function fetchJson(url) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                console.error('API Error:', resp.status);
                return [];
            }
            return await resp.json();
        } catch (err) {
            console.error('Fetch Error:', err);
            return [];
        }
    }

    async function getCategorias() { return fetchJson(`${API_BASE_URL}/categorias`); }
    async function getRestaurantesTodos() { return fetchJson(`${API_BASE_URL}/restaurantes?solo_activos=true`); }
    async function getRestaurantesPopulares(limite = 6) { return fetchJson(`${API_BASE_URL}/restaurantes/populares?limite=${limite}`); }
    
    async function getRestaurantesFiltrados(opts = {}) {
        const p = new URLSearchParams({ solo_activos: 'true' });
        if (opts.ratingMin) p.append('rating_min', opts.ratingMin);
        if (opts.tiempoMax) p.append('tiempo_max', opts.tiempoMax);
        return fetchJson(`${API_BASE_URL}/restaurantes/filtrar?${p}`);
    }

    async function getRestaurantesPorCategoriaSlug(slug) {
        try {
            const resp = await fetch(`${API_BASE_URL}/restaurantes/por-categorias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categorias: [slug] })
            });
            return resp.ok ? await resp.json() : [];
        } catch (e) { return []; }
    }

    // ==========================
    //   UI & CARDS
    // ==========================
    function createRestaurantCard(r) {
        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.onclick = (e) => {
            if(!e.target.classList.contains('card-order-button-desktop')) 
                window.location.href = `restaurante.html?id=${r.id}`;
        };

        const img = r.imagen || './assets/images/Coffe-surf.jpg';
        const min = r.entrega?.minutosPromedio ?? '--';
        const cal = r.calificacion?.promedio ?? '--';
        const envio = r.entrega?.tarifa ?? 0;

        card.innerHTML = `
            <img src="${img}" alt="${r.nombre}">
            <h2>${r.nombre}</h2>
            <div class="card-mobile-info">
                <div class="card-info-top">
                    <span class="card-time">${min} min</span>
                    <span class="card-rating">${cal} ★</span>
                </div>
                <p class="card-cost">Envío: $${envio}</p>
            </div>
            <button class="card-order-button-desktop">Ordenar</button>
        `;
        
        card.querySelector('button').onclick = (e) => {
            e.stopPropagation();
            window.location.href = `restaurante.html?id=${r.id}`;
        };
        return card;
    }

    // ==========================
    //   CARRUSEL LÓGICA
    // ==========================
    const carousels = [];
    document.querySelectorAll('.cartas').forEach((aside, idx) => {
        const header = aside.querySelector('header');
        const prev = header?.querySelector('button:nth-of-type(1)');
        const next = header?.querySelector('button:nth-of-type(2)');

        const carousel = { aside, data: [], visibleCount: 3, startIndex: 0, type: idx === 0 ? 'populares' : 'mejores' };
        carousels.push(carousel);

        if(prev) prev.onclick = () => moveCarousel(carousel, -1);
        if(next) next.onclick = () => moveCarousel(carousel, 1);
    });

    function setCarouselData(type, data) {
        const c = carousels.find(x => x.type === type);
        if(c) {
            c.data = data || [];
            c.startIndex = 0;
            renderCarousel(c);
        }
    }

    function renderCarousel(c) {
        c.aside.querySelectorAll('.tarjeta, .no-results').forEach(e => e.remove());
        const total = c.data.length;
        if(!total) return;

        const max = Math.min(c.visibleCount, total);
        for(let i=0; i<max; i++) {
            const item = c.data[(c.startIndex + i) % total];
            c.aside.appendChild(createRestaurantCard(item));
        }
    }

    function moveCarousel(c, step) {
        if(!c.data.length) return;
        c.startIndex = (c.startIndex + step + c.data.length) % c.data.length;
        renderCarousel(c);
    }

    function renderListaResultados(aside, lista) {
        aside.querySelectorAll('.tarjeta, .no-results').forEach(e => e.remove());
        lista.forEach(r => aside.appendChild(createRestaurantCard(r)));
    }

    // ==========================
    //   LÓGICA PRINCIPAL
    // ==========================
    async function init() {
        // 1. Cargar datos iniciales
        const [todos, populares] = await Promise.all([
            getRestaurantesTodos(),
            getRestaurantesPopulares(6)
        ]);

        // 2. Configurar Carruseles
        setCarouselData('populares', populares);
        
        const mejores = [...todos].sort((a,b) => (b.calificacion?.promedio||0) - (a.calificacion?.promedio||0));
        setCarouselData('mejores', mejores);

        // 3. Categorías
        const cats = await getCategorias();
        renderCategorias(cats);

        // 4. Usuario
        cargarDatosUsuarioMenu();

        // 5. Revisar si hay filtro por URL (?categoria=...)
        const params = new URLSearchParams(window.location.search);
        const catSlug = params.get('categoria');
        if (catSlug) {
            // Activar modo búsqueda
            const porCat = await getRestaurantesPorCategoriaSlug(catSlug);
            activarModoResultados(asidePopulares, porCat, catSlug);
        }
    }

    function activarModoResultados(contenedor, lista, titulo) {
        if (!contenedor) return;
        // Ocultar el segundo carrusel
        if(asideMejores) asideMejores.style.display = 'none';
        
        // Cambiar título
        if(tituloPopularesElem) tituloPopularesElem.textContent = titulo || 'Resultados';
        
        // Ocultar controles de carrusel
        const ctrls = contenedor.querySelector('header div');
        if(ctrls) ctrls.style.display = 'none';

        renderListaResultados(contenedor, lista);
    }

    function renderCategorias(list) {
        if(!navCategorias && !navMasBuscados) return;
        
        const fill = (nav, items) => {
            if(!nav) return;
            nav.innerHTML = '';
            items.forEach(c => {
                const a = document.createElement('a');
                a.textContent = c.nombre;
                a.href = '#';
                a.onclick = async (e) => {
                    e.preventDefault();
                    const res = await getRestaurantesPorCategoriaSlug(c.slug);
                    activarModoResultados(asidePopulares, res, c.nombre);
                };
                nav.appendChild(a);
            });
        };

        fill(navCategorias, list);
        fill(navMasBuscados, list.slice(0,6));
    }

    // Búsqueda manual
    if (searchBar) {
        searchBar.closest('form').onsubmit = async (e) => {
            e.preventDefault();
            const q = searchBar.value.toLowerCase();
            // Filtrar de lo que ya tenemos cargado (todosRestaurantes se cargó en init, pero lo perdimos de scope)
            // Mejor volver a pedir o guardar en variable global. 
            // Simplificación: pedir búsqueda al backend
            const res = await fetchJson(`${API_BASE_URL}/restaurantes/buscar?q=${q}&solo_activos=true`);
            activarModoResultados(asidePopulares, res, `Búsqueda: ${q}`);
        };
    }

    // Inicializar todo
    init();
});