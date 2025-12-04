document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // ========================
    //   UBICACIÓN EN HEADER
    // ========================
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

    // ========================
    //   SELECTORES HEADER / USUARIO
    // ========================
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    const userMenu = document.getElementById('user-menu');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    const userNameLabel = document.getElementById('user-name-label');
    const userEmailLabel = document.getElementById('user-email-label');

    let menuAbierto = false;
    let usuarioId = null;
    let usuarioActual = null;
    let usuarioLogueado = false;

    if (userMenu) {
        userMenu.style.display = 'none';
    }

    // ========================
    //   NAV HEADER
    // ========================
    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            console.log('Navegando a la página de carrito.');

            const idUsuario = localStorage.getItem('usuario_id');
            console.log('idUsuario desde localStorage (header restaurante.js):', idUsuario);

            if (!idUsuario) {
                console.warn('No hay usuario_id en localStorage, redirigiendo a login...');
                window.location.href = 'login.html';
                return;
            }

            window.location.href = `carrito.html?id_usuario=${encodeURIComponent(idUsuario)}`;
        });
    }

    // ========================
    //   HELPERS GENERALES (HEADER USUARIO)
    // ========================
    async function fetchJson(url) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                console.error('Error al llamar a la API:', resp.status, resp.statusText);
                return null;
            }
            return await resp.json();
        } catch (err) {
            console.error('Error de red al llamar a la API:', err);
            return null;
        }
    }

    async function getUsuarioPorId(idUsuario) {
        const url = `${API_BASE_URL}/usuarios/${idUsuario}`;
        return fetchJson(url);
    }

    function renderHeaderUserMenu(usuario) {
        if (!usuario) return;
        if (userNameLabel) userNameLabel.textContent = usuario.nombre || 'Usuario';
        if (userEmailLabel) userEmailLabel.textContent = usuario.correo || 'correo@ejemplo.com';
    }

    async function initUsuarioHeader() {
        usuarioId = localStorage.getItem('usuario_id');
        usuarioLogueado = false;  // por defecto

        if (!usuarioId) {
            // No hay id en localStorage → aseguramos que el menú esté oculto
            if (userMenu) userMenu.style.display = 'none';
            return;
        }

        const usuario = await getUsuarioPorId(usuarioId);
        if (!usuario) {
            // No se pudo obtener usuario de la API → lo tratamos como no logueado
            if (userMenu) userMenu.style.display = 'none';
            return;
        }

        // Usuario válido
        usuarioActual = usuario;
        usuarioLogueado = true;
        renderHeaderUserMenu(usuario);
    }

    // Botón de usuario: ir a login si NO hay sesión, o togglear menú si SÍ hay
    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (!usuarioLogueado) {
                console.log('No hay usuario logueado, navegando a la página de login.');
                window.location.href = 'login.html';
                return;
            }

            if (!userMenu) return;
            menuAbierto = !menuAbierto;
            userMenu.style.display = menuAbierto ? 'flex' : 'none';
        });
    }

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (event) => {
        if (!userMenu) return;

        const clickDentroMenu = userMenu.contains(event.target);
        const clickEnBoton = userLoginBtn && userLoginBtn.contains(event.target);

        if (!clickDentroMenu && !clickEnBoton) {
            userMenu.style.display = 'none';
            menuAbierto = false;
        }
    });

    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Botón "Ver mi usuario"
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const idUsuario = localStorage.getItem('usuario_id');
            if (!idUsuario) {
                window.location.href = 'login.html';
                return;
            }
            window.location.href = `usuario.html?id_usuario=${encodeURIComponent(idUsuario)}`;
        });
    }

    // Botón "Logout"
    if (userLogoutBtn) {
        userLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmar = confirm('¿Seguro que quieres cerrar sesión?');
            if (!confirmar) return;

            // Borrar datos de sesión
            localStorage.removeItem('usuario_id');
            localStorage.removeItem('usuario_data');
            // Si manejas token:
            // localStorage.removeItem('access_token');

            // Limpiar estado en memoria
            usuarioId = null;
            usuarioActual = null;
            usuarioLogueado = false;
            menuAbierto = false;
            if (userMenu) userMenu.style.display = 'none';

            // Redirigir
            window.location.href = 'principal.html';
        });
    }

    // ========================
    //   HELPERS GENERALES (RESTO)
    // ========================
    function getRestaurantIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function formatearPrecio(valor) {
        if (typeof valor !== 'number') return '$0.00';
        return `$${valor.toFixed(2)}`;
    }

    // ========================
    //   SELECTORES DEL DOM
    // ========================
    const deliveryButtonsContainer = document.querySelector('.botones-tipo-pedido');
    const orderButton = document.querySelector('.btn-pedir');
    const favoriteButton = document.querySelector('.botones-banner button:first-child');

    const imgBanner = document.querySelector(".imagen-restaurante-banner");
    const imgPerfil = document.querySelector('.restaurante-perfil');
    const tituloElem = document.querySelector('.info-general h2');
    const ratingElem = document.querySelector('.info-general .rating');
    const categoriasElem = document.querySelector('.info-general .categorias');
    const direccionElem = document.querySelector('.info-general .direccion');
    const descripcionElem = document.querySelector('.info-general .descripcion');

    const infoBoxes = document.querySelectorAll('.info-entrega .info-box'); // [0] envío, [1] tiempo

    const productosSection = document.getElementById('productos-restaurante');
    const listaProductosElem = productosSection
        ? productosSection.querySelector('.lista-productos')
        : null;

    // --- Tarjeta de ubicación ---
    const ubicacionCard = document.querySelector('.ubicacion-card');
    const direccionCortaElem = ubicacionCard ? ubicacionCard.querySelector('.direccion-corta') : null;
    const estadoAbiertoElem = ubicacionCard ? ubicacionCard.querySelector('footer p strong') : null;
    const horarioTextoElem = ubicacionCard ? ubicacionCard.querySelector('.horario') : null;
    const footerInfoDiv = ubicacionCard ? ubicacionCard.querySelector('footer div') : null;

    // Contenedor desplegable para los horarios de todos los días
    let horarioDetalleContainer = null;
    if (ubicacionCard) {
        horarioDetalleContainer = document.createElement('div');
        horarioDetalleContainer.className = 'horario-detallado';
        horarioDetalleContainer.style.display = 'none';
        horarioDetalleContainer.style.marginTop = '0.5rem';
        horarioDetalleContainer.style.fontSize = '0.9rem';

        const footer = ubicacionCard.querySelector('footer');
        if (footer) {
            footer.insertAdjacentElement('afterend', horarioDetalleContainer);
        }
    }

    let deliveryType = 'Entrega';
    let restauranteActual = null;
    let restauranteId = getRestaurantIdFromUrl();

    // Guardaremos aquí la respuesta completa de /horario
    let horarioCompletoData = null;

    // ========================
    //   HELPERS HORARIO
    // ========================
    function obtenerDiaSemanaActual() {
        const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const idx = new Date().getDay(); // 0 = domingo
        return dias[idx];
    }

    function formatearHora(horaStr) {
        if (!horaStr || typeof horaStr !== 'string') return horaStr || '';
        const [h, m] = horaStr.split(':').map(Number);
        if (Number.isNaN(h) || Number.isNaN(m)) return horaStr;

        let sufijo = 'AM';
        let hora12 = h;

        if (h === 0) {
            hora12 = 12;
            sufijo = 'AM';
        } else if (h === 12) {
            hora12 = 12;
            sufijo = 'PM';
        } else if (h > 12) {
            hora12 = h - 12;
            sufijo = 'PM';
        }

        const minutos = String(m).padStart(2, '0');
        return `${hora12}:${minutos} ${sufijo}`;
    }

    function abreviarDia(dia) {
        const mapa = {
            lunes: 'Lun',
            martes: 'Mar',
            miercoles: 'Mié',
            miércoles: 'Mié',
            jueves: 'Jue',
            viernes: 'Vie',
            sabado: 'Sáb',
            sábado: 'Sáb',
            domingo: 'Dom',
        };
        const key = (dia || '').toLowerCase();
        return mapa[key] || dia;
    }

    function capitalizarDia(dia) {
        const mapa = {
            lunes: 'Lunes',
            martes: 'Martes',
            miercoles: 'Miércoles',
            miércoles: 'Miércoles',
            jueves: 'Jueves',
            viernes: 'Viernes',
            sabado: 'Sábado',
            sábado: 'Sábado',
            domingo: 'Domingo',
        };
        const key = (dia || '').toLowerCase();
        return mapa[key] || (dia ? dia.charAt(0).toUpperCase() + dia.slice(1) : '');
    }

    function formatearDiasServicio(diasServicio) {
        if (!Array.isArray(diasServicio) || diasServicio.length === 0) {
            return 'Horario no disponible';
        }
        const abrevs = diasServicio.map(abreviarDia);

        if (abrevs.length === 7) {
            return 'Abierto todos los días';
        }
        return 'Abierto ' + abrevs.join(', ');
    }

    function obtenerHorarioDeHoy(horarioData) {
        const hoy = obtenerDiaSemanaActual();
        const horarioObj = horarioData?.horario || null;
        if (!horarioObj) return null;

        const info = horarioObj[hoy];
        if (!info) return null;

        return {
            dia: hoy,
            abre: info.abre,
            cierra: info.cierra
        };
    }

    function estaAbiertoAhora(infoHoy) {
        if (!infoHoy || !infoHoy.abre || !infoHoy.cierra) return false;

        const ahora = new Date();
        const [ha, ma] = infoHoy.abre.split(':').map(Number);
        const [hc, mc] = infoHoy.cierra.split(':').map(Number);

        if ([ha, ma, hc, mc].some(v => Number.isNaN(v))) return false;

        const inicio = new Date(ahora);
        inicio.setHours(ha, ma, 0, 0);

        const fin = new Date(ahora);
        fin.setHours(hc, mc, 0, 0);

        return ahora >= inicio && ahora <= fin;
    }

    function renderHorarioDetallado(horarioData) {
        if (!horarioDetalleContainer || !horarioData || !horarioData.horario) return;

        const diasOrdenados = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        let html = '<ul style="list-style:none; padding-left:0; margin:0;">';

        diasOrdenados.forEach((dia) => {
            const info = horarioData.horario[dia];
            if (!info) return;

            html += `
                <li style="margin-bottom: 2px;">
                    <strong>${capitalizarDia(dia)}:</strong>
                    ${formatearHora(info.abre)} – ${formatearHora(info.cierra)}
                </li>
            `;
        });

        html += '</ul>';
        horarioDetalleContainer.innerHTML = html;
    }

    async function cargarHorarioRestaurante(idRestaurante) {
        if (!ubicacionCard) return;

        try {
            const url = `${API_BASE_URL}/restaurantes/id/${idRestaurante}/horario`;
            console.log('Cargando horario de restaurante:', url);

            const horarioData = await fetchJson(url);
            if (!horarioData) {
                console.warn('No se pudo obtener el horario del restaurante');
                return;
            }

            horarioCompletoData = horarioData;
            renderHorarioDetallado(horarioData);

            const diasServicio = horarioData.diasServicio || [];
            const infoHoy = obtenerHorarioDeHoy(horarioData);

            if (horarioTextoElem) {
                const textoDias = formatearDiasServicio(diasServicio);
                if (infoHoy && infoHoy.cierra) {
                    const cierre = formatearHora(infoHoy.cierra);
                    horarioTextoElem.textContent = `${textoDias} · Hoy cierra a las ${cierre}.`;
                } else {
                    horarioTextoElem.textContent = textoDias;
                }
            }

            if (estadoAbiertoElem) {
                if (infoHoy && estaAbiertoAhora(infoHoy)) {
                    estadoAbiertoElem.textContent = 'Abierto';
                } else {
                    estadoAbiertoElem.textContent = 'Cerrado';
                }
            }

            if (direccionCortaElem && restauranteActual && restauranteActual.direccion) {
                const d = restauranteActual.direccion;
                const partesCortas = [d.calle, d.ciudad].filter(Boolean);
                direccionCortaElem.textContent = partesCortas.join(', ');
            }

        } catch (err) {
            console.error('Error al cargar horario del restaurante:', err);
        }
    }

    if (footerInfoDiv && horarioDetalleContainer) {
        let desplegado = false;

        footerInfoDiv.style.cursor = 'pointer';

        footerInfoDiv.addEventListener('click', () => {
            if (!horarioCompletoData) {
                return;
            }
            desplegado = !desplegado;
            horarioDetalleContainer.style.display = desplegado ? 'block' : 'none';
        });
    }

    // ========================
    //   CARGA RESTAURANTE
    // ========================
    async function cargarRestaurante() {
        if (!restauranteId) {
            console.error('No se encontró el parámetro "id" en la URL');
            return;
        }

        console.log('Cargando restaurante con id:', restauranteId);

        const url = `${API_BASE_URL}/restaurantes/${restauranteId}`;
        const datos = await fetchJson(url);

        if (!datos) {
            console.error('No se pudieron obtener los datos del restaurante');
            return;
        }

        restauranteActual = datos;
        rellenarDatosRestaurante(datos);

        await cargarHorarioRestaurante(restauranteId);
        await cargarProductosRestaurante(restauranteId);
    }

    function rellenarDatosRestaurante(r) {
        if (tituloElem) {
            const ciudad = r.direccion?.ciudad || '';
            tituloElem.textContent = ciudad
                ? `${r.nombre} (${ciudad})`
                : r.nombre;
        }

        if (imgBanner) {
            const imagen_banner = r.imagen_banner || imgBanner.getAttribute("src");
            imgBanner.setAttribute("src", imagen_banner);
        }

        if (imgPerfil) {
            const imagen = r.imagen || imgPerfil.getAttribute('src');
            imgPerfil.setAttribute('src', imagen);
        }

        if (ratingElem) {
            const promedio = r.calificacion?.promedio ?? '–';
            const conteo = r.calificacion?.conteo ?? 0;
            ratingElem.innerHTML = `<strong>⭐ ${promedio}</strong> (${conteo}+)`;
        }

        if (categoriasElem) {
            if (Array.isArray(r.categorias) && r.categorias.length > 0) {
                categoriasElem.textContent = r.categorias.join(' • ');
            } else {
                categoriasElem.textContent = 'Sin categorías';
            }
        }

        if (direccionElem) {
            const d = r.direccion || {};
            const partes = [
                d.calle,
                d.ciudad,
                d.estado,
                d.cp,
            ].filter(Boolean);
            direccionElem.textContent = partes.join(', ');
        }

        if (descripcionElem && r.descripcion) {
            descripcionElem.textContent = r.descripcion;
        }

        if (infoBoxes && infoBoxes.length >= 2) {
            const envioBox = infoBoxes[0];
            const tiempoBox = infoBoxes[1];

            const tarifa = r.entrega?.tarifa ?? 0;
            const minutos = r.entrega?.minutosPromedio ?? null;

            const envioHeader = envioBox.querySelector('header');
            const envioFooter = envioBox.querySelector('footer');

            if (envioHeader) {
                if (tarifa === 0) {
                    envioHeader.textContent = 'Costo de envío $0';
                } else {
                    envioHeader.textContent = `Costo de envío $${tarifa}`;
                }
            }
            if (envioFooter) {
                envioFooter.textContent = 'Aplican condiciones';
            }

            const tiempoHeader = tiempoBox.querySelector('header');
            if (tiempoHeader) {
                tiempoHeader.textContent = minutos ? `${minutos} min` : '—';
            }
        }

        const mapaVisual = document.querySelector('.mapa-visual');
        if (mapaVisual && r.url_localizacion) {
            mapaVisual.innerHTML = `<iframe 
                src="${r.url_localizacion}" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>`;
        }
        
        document.title = `Chef Ya! | ${r.nombre}`;
    }

    // ========================
    //   PRODUCTOS
    // ========================
    async function cargarProductosRestaurante(idRestaurante) {
        if (!listaProductosElem) return;

        console.log('Cargando productos del restaurante:', idRestaurante);

        const url = `${API_BASE_URL}/productos/restaurante/${idRestaurante}`;
        const productos = await fetchJson(url);

        if (!productos || !Array.isArray(productos) || productos.length === 0) {
            listaProductosElem.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
            return;
        }

        renderProductos(productos);
    }

    function renderProductos(productos) {
        if (!listaProductosElem) return;
        listaProductosElem.innerHTML = '';

        productos.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'tarjeta-producto';

            const imagen = prod.imagen || './assets/images/placeholder-producto.png';
            const nombre = prod.nombre || 'Producto';
            const descripcion = prod.descripcion || '';
            const precio = formatearPrecio(prod.precio);

            card.innerHTML = `
                <div class="tarjeta-producto-imagen">
                    <img src="${imagen}" alt="${nombre}">
                </div>
                <div class="tarjeta-producto-contenido">
                    <h4>${nombre}</h4>
                    <p class="tarjeta-producto-descripcion">${descripcion}</p>
                    <div class="tarjeta-producto-footer">
                        <span class="tarjeta-producto-precio">${precio}</span>
                        <button type="button" class="btn-agregar-producto">
                            Agregar
                        </button>
                    </div>
                </div>
            `;

            const btnAgregar = card.querySelector('.btn-agregar-producto');
            btnAgregar.addEventListener('click', async () => {
                console.log('Click en Agregar producto:', prod);

                const idUsuario = localStorage.getItem('usuario_id');
                console.log('idUsuario desde localStorage (restaurante.js, agregar):', idUsuario);

                if (!idUsuario) {
                    alert('Debes iniciar sesión para agregar productos al carrito.');
                    window.location.href = 'login.html';
                    return;
                }

                try {
                    const carritoUrl = `${API_BASE_URL}/carritos/usuario/${idUsuario}`;
                    console.log('GET carrito URL:', carritoUrl);

                    const carritoResp = await fetch(carritoUrl);
                    console.log('Respuesta GET carrito status:', carritoResp.status);

                    if (!carritoResp.ok) {
                        console.error('Error al obtener/crear carrito:', carritoResp.status, carritoResp.statusText);
                        alert('No se pudo obtener el carrito del usuario.');
                        return;
                    }
                    const carrito = await carritoResp.json();
                    console.log('Carrito recibido en restaurante.js (antes de agregar):', carrito);

                    if (!carrito || !carrito.id) {
                        console.error('Respuesta de carrito inesperada:', carrito);
                        alert('No se pudo obtener el carrito del usuario.');
                        return;
                    }

                    const carritoId = carrito.id;

                    const body = {
                        restauranteId: restauranteId,
                        productoId: prod.id,
                        nombre: prod.nombre,
                        precio: prod.precio,
                        cantidad: 1,
                        imagen: prod.imagen || null
                    };
                    console.log('Body para agregar item:', body);

                    const addUrl = `${API_BASE_URL}/carritos/${carritoId}/items`;
                    console.log('POST agregar item URL:', addUrl);

                    const addResp = await fetch(addUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    console.log('Respuesta POST agregar item status:', addResp.status);

                    if (!addResp.ok) {
                        console.error('Error al agregar item al carrito:', addResp.status, addResp.statusText);
                        alert('No se pudo agregar el producto al carrito.');
                        return;
                    }

                    const carritoActualizado = await addResp.json();
                    console.log('Carrito actualizado en restaurante.js:', carritoActualizado);
                    alert(`"${prod.nombre}" se agregó al carrito.`);
                } catch (err) {
                    console.error('Error de red al agregar producto al carrito:', err);
                    alert('Error de conexión al intentar agregar al carrito.');
                }
            });

            listaProductosElem.appendChild(card);
        });
    }

    // ========================
    //   TOGGLE ENTREGA / RECOLECCIÓN
    // ========================
    if (deliveryButtonsContainer) {
        const buttons = deliveryButtonsContainer.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('activo'));
                button.classList.add('activo');

                deliveryType = button.textContent.trim();
                console.log(`Tipo de servicio seleccionado: ${deliveryType}`);
            });
        });
    }

    // ========================
    //   BOTÓN "PEDIR AHORA"
    // ========================
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            if (!restauranteId) {
                alert('No se encontró el restaurante.');
                return;
            }
            console.log(`Iniciando pedido para restaurante ${restauranteId} con servicio de: ${deliveryType}`);

            window.location.href = `restaurante.html?id=${restauranteId}#productos-restaurante`;
        });
    }

    // ========================
    //   BOTÓN FAVORITOS
    // ========================
    if (favoriteButton) {
        favoriteButton.addEventListener('click', async () => {
            if (!restauranteId) {
                alert('No se encontró el restaurante.');
                return;
            }

            console.log('Click favorito para restaurante:', restauranteId);

            const isFavorite = favoriteButton.classList.toggle('is-favorite');
            const message = isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos';
            alert(message);
        });
    }

    // ========================
    //   INICIO
    // ========================
    (async function init() {
        await initUsuarioHeader();
        await cargarRestaurante();
    })();
});
