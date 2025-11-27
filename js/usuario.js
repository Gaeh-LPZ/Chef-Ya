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

    // ==========================
    //   SELECTORES GENERALES
    // ==========================
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn    = document.getElementById('user-login');

    const userMenu        = document.getElementById('user-menu');
    const userProfileBtn  = document.getElementById('user-profile-btn');
    const userLogoutBtn   = document.getElementById('user-logout-btn');
    const userNameLabel   = document.getElementById('user-name-label');
    const userEmailLabel  = document.getElementById('user-email-label');

    // PERFIL
    const perfilNombreInput     = document.getElementById('perfil-nombre');
    const perfilCorreoInput     = document.getElementById('perfil-correo');
    const perfilTelefonoInput   = document.getElementById('perfil-telefono');
    const perfilForm            = document.getElementById('perfil-form');
    const perfilMensajeEl       = document.getElementById('perfil-mensaje');
    const usuarioIdLabel        = document.getElementById('usuario-id-label');
    const perfilAvatarIniciales = document.getElementById('perfil-avatar-iniciales');

    const listaDireccionesEl = document.getElementById('lista-direcciones');
    const listaPedidosEl     = document.getElementById('lista-pedidos');

    const btnEditarPerfil  = document.getElementById('btn-editar-perfil');
    const btnGuardarPerfil = document.getElementById('btn-guardar-perfil');

    let menuAbierto   = false;
    let usuarioActual = null;
    let usuarioId     = null;
    let editMode      = false;

    if (userMenu) {
        userMenu.style.display = 'none';
    }

    // ==========================
    //   NAV HEADER (CARRITO + MENÚ USUARIO)
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

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!userMenu) return;

            menuAbierto = !menuAbierto;
            userMenu.style.display = menuAbierto ? 'flex' : 'none';
        });
    }

    document.addEventListener('click', (event) => {
        if (!userMenu) return;

        const clickDentroMenu = userMenu.contains(event.target);
        const clickEnBoton    = userLoginBtn && userLoginBtn.contains(event.target);

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

    // Botón "Ver mi usuario" dentro del menú
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

    if (userLogoutBtn) {
        userLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Aquí luego puedes hacer logout real
            // localStorage.removeItem('usuario_id');
            // window.location.href = 'login.html';
        });
    }

    // ==========================
    //   HELPERS FETCH
    // ==========================
    async function fetchJson(url, options = {}) {
        try {
            const resp = await fetch(url, options);
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

    async function actualizarUsuario(idUsuario, data) {
        const url = `${API_BASE_URL}/usuarios/${idUsuario}`;
        return fetchJson(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async function getDireccionesUsuario(idUsuario) {
        const url = `${API_BASE_URL}/usuarios/${idUsuario}/direcciones`;
        return fetchJson(url);
    }

    async function getPedidosUsuario(idUsuario, limite = 5) {
        const url = `${API_BASE_URL}/pedidos/usuario/${idUsuario}?limite=${limite}`;
        return fetchJson(url);
    }

    // ==========================
    //   RENDER USUARIO
    // ==========================
    function obtenerIniciales(nombre, correo) {
        if (nombre && nombre.trim()) {
            const partes = nombre.trim().split(/\s+/);
            const primera = partes[0]?.[0] || '';
            const segunda = partes[1]?.[0] || '';
            return (primera + segunda).toUpperCase();
        }
        if (correo && correo.trim()) {
            return correo[0].toUpperCase();
        }
        return 'U';
    }

    function setEditMode(enabled) {
        editMode = enabled;

        if (perfilNombreInput)   perfilNombreInput.disabled   = !enabled;
        if (perfilTelefonoInput) perfilTelefonoInput.disabled = !enabled;

        if (btnEditarPerfil)  btnEditarPerfil.style.display  = enabled ? 'none' : 'inline-flex';
        if (btnGuardarPerfil) btnGuardarPerfil.style.display = enabled ? 'inline-flex' : 'none';

        if (!enabled && usuarioActual) {
            // Restaurar valores por si el usuario escribió algo raro y canceló
            if (perfilNombreInput)   perfilNombreInput.value   = usuarioActual.nombre   || '';
            if (perfilTelefonoInput) perfilTelefonoInput.value = usuarioActual.telefono || '';
        }
    }

    function renderPerfilUsuario(usuario) {
        if (!usuario) return;

        usuarioActual = usuario;

        if (perfilNombreInput) {
            perfilNombreInput.value = usuario.nombre || '';
        }
        if (perfilCorreoInput) {
            perfilCorreoInput.value = usuario.correo || '';
        }
        if (perfilTelefonoInput) {
            perfilTelefonoInput.value = usuario.telefono || '';
        }

        if (usuarioIdLabel && usuario.id) {
            usuarioIdLabel.textContent = `ID de usuario: ${usuario.id}`;
        }

        if (perfilAvatarIniciales) {
            perfilAvatarIniciales.textContent = obtenerIniciales(usuario.nombre, usuario.correo);
        }

        // Siempre volvemos a modo solo lectura después de renderizar
        setEditMode(false);
    }

    function renderHeaderUserMenu(usuario) {
        if (!usuario) return;
        if (userNameLabel)  userNameLabel.textContent  = usuario.nombre || 'Usuario';
        if (userEmailLabel) userEmailLabel.textContent = usuario.correo || 'correo@ejemplo.com';
    }

    function renderDirecciones(direcciones) {
        if (!listaDireccionesEl) return;

        listaDireccionesEl.innerHTML = '';

        if (!direcciones || direcciones.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No tienes direcciones registradas.';
            p.classList.add('usuario-carrito-vacio');
            listaDireccionesEl.appendChild(p);
            return;
        }

        direcciones.forEach(dir => {
            const card = document.createElement('div');
            card.className = 'direccion-card';

            const cpText = dir.cp ? `, CP ${dir.cp}` : '';
            const geoText = dir.geo
                ? ` (lat: ${dir.geo.lat.toFixed(4)}, lng: ${dir.geo.lng.toFixed(4)})`
                : '';

            card.innerHTML = `
                <p><strong>${dir.etiqueta}</strong></p>
                <p>${dir.calle}, ${dir.ciudad}, ${dir.estado}${cpText}</p>
                <p>${geoText}</p>
            `;

            listaDireccionesEl.appendChild(card);
        });
    }

    function formatearFechaISO(iso) {
        if (!iso) return '–';
        const fecha = new Date(iso);
        if (isNaN(fecha.getTime())) return iso;
        return fecha.toLocaleString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function renderPedidos(pedidos) {
        if (!listaPedidosEl) return;

        listaPedidosEl.innerHTML = '';

        if (!pedidos || pedidos.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No tienes pedidos registrados.';
            p.classList.add('usuario-carrito-vacio');
            listaPedidosEl.appendChild(p);
            return;
        }

        pedidos.forEach(pedido => {
            const card = document.createElement('div');
            card.className = 'pedido-card';

            const total = pedido.montos?.total ?? '–';
            const fecha = formatearFechaISO(pedido.realizadoEn);
            const numItems = Array.isArray(pedido.items) ? pedido.items.length : 0;

            card.innerHTML = `
                <div class="pedido-header">
                    <div>
                        <strong>Folio:</strong> ${pedido.folio || '–'}
                    </div>
                    <span class="pedido-estado">${pedido.estado || '–'}</span>
                </div>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Total:</strong> $${total} MXN</p>
                <p><strong>Artículos:</strong> ${numItems}</p>
            `;

            listaPedidosEl.appendChild(card);
        });
    }

    // ==========================
    //   GUARDAR PERFIL
    // ==========================
    function mostrarMensajePerfil(texto, tipo) {
        if (!perfilMensajeEl) return;
        perfilMensajeEl.textContent = texto || '';
        perfilMensajeEl.classList.remove('ok', 'error');
        if (tipo) perfilMensajeEl.classList.add(tipo);
    }

    if (btnEditarPerfil) {
        btnEditarPerfil.addEventListener('click', () => {
            mostrarMensajePerfil('', null);
            setEditMode(true);
        });
    }

    if (perfilForm) {
        perfilForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!usuarioId || !perfilNombreInput || !perfilTelefonoInput) return;
            if (!editMode) return; // por seguridad

            mostrarMensajePerfil('Guardando...', null);
            if (btnGuardarPerfil) btnGuardarPerfil.disabled = true;

            const nombre   = perfilNombreInput.value.trim();
            const telefono = perfilTelefonoInput.value.trim();

            const payload = {
                nombre:   nombre || null,
                telefono: telefono || null,
            };

            const usuarioActualizado = await actualizarUsuario(usuarioId, payload);

            if (!usuarioActualizado) {
                mostrarMensajePerfil('No se pudo guardar. Intenta de nuevo.', 'error');
                if (btnGuardarPerfil) btnGuardarPerfil.disabled = false;
                return;
            }

            usuarioActual = usuarioActualizado;

            renderPerfilUsuario(usuarioActualizado);
            renderHeaderUserMenu(usuarioActualizado);

            mostrarMensajePerfil('Datos actualizados correctamente.', 'ok');

            if (btnGuardarPerfil) btnGuardarPerfil.disabled = false;
        });
    }

    // ==========================
    //   INIT
    // ==========================
    async function init() {
        actualizarHeaderUbicacion();

        const params = new URLSearchParams(window.location.search);
        usuarioId = params.get('id_usuario');

        if (!usuarioId) {
            usuarioId = localStorage.getItem('usuario_id');
        }

        if (!usuarioId) {
            console.warn('No se encontró id_usuario, redirigiendo a login...');
            window.location.href = 'login.html';
            return;
        }

        // Guardar por si llegamos vía URL directa
        localStorage.setItem('usuario_id', usuarioId);

        const usuario = await getUsuarioPorId(usuarioId);
        if (usuario) {
            renderPerfilUsuario(usuario);
            renderHeaderUserMenu(usuario);
        }

        const direcciones = await getDireccionesUsuario(usuarioId);
        renderDirecciones(direcciones || []);

        const pedidos = await getPedidosUsuario(usuarioId, 5);
        renderPedidos(pedidos || []);
    }

    init();
});
