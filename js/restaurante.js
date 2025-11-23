// js/restaurante.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com/'; // ajusta si tu API tiene prefijo /api/v1
    const TEST_USER_ID = '6921cd24502884b6d7ce5f48'; // <-- remplaza por el id real de prueba

    // --- Lógica de Navegación de Header (Desktop/Tablet) ---
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            console.log('Navegando a la página de carrito.');
            // aquí luego puedes agregar el id_usuario en la URL
            window.location.href = `carrito.html?id_usuario=${encodeURIComponent(TEST_USER_ID)}`;
        });
    }

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', () => {
            console.log('Navegando a la página de login.');
            window.location.href = 'login.html';
        });
    }
    
    // --- Helpers ---

    function getRestaurantIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

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

    // --- Referencias a elementos del DOM ---

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

    let deliveryType = 'Entrega'; // estado inicial
    let restauranteActual = null; // guardamos los datos del restaurante
    let restauranteId = getRestaurantIdFromUrl();

    // --- Cargar datos del restaurante desde el backend ---

    async function cargarRestaurante() {
        if (!restauranteId) {
            console.error('No se encontró el parámetro "id" en la URL');
            return;
        }

        console.log('Cargando restaurante con id:', restauranteId);

        // Endpoint: GET /restaurantes/{id_restaurante}
        const url = `${API_BASE_URL}/restaurantes/${restauranteId}`;
        const datos = await fetchJson(url);

        if (!datos) {
            console.error('No se pudieron obtener los datos del restaurante');
            return;
        }

        restauranteActual = datos;
        rellenarDatosRestaurante(datos);

        // Después de cargar el restaurante, cargamos sus productos
        await cargarProductosRestaurante(restauranteId);
    }

    function rellenarDatosRestaurante(r) {
        // Título y nombre
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

        // Imagen de perfil
        if (imgPerfil) {
            const imagen = r.imagen || imgPerfil.getAttribute('src'); // si no hay, dejamos la que estaba
            imgPerfil.setAttribute('src', imagen);
        }

        // Rating
        if (ratingElem) {
            const promedio = r.calificacion?.promedio ?? '–';
            const conteo = r.calificacion?.conteo ?? 0;
            ratingElem.innerHTML = `<strong>⭐ ${promedio}</strong> (${conteo}+)`;
        }

        // Categorías
        if (categoriasElem) {
            if (Array.isArray(r.categorias) && r.categorias.length > 0) {
                categoriasElem.textContent = r.categorias.join(' • ');
            } else {
                categoriasElem.textContent = 'Sin categorías';
            }
        }

        // Dirección
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

        // Descripción
        if (descripcionElem && r.descripcion) {
            descripcionElem.textContent = r.descripcion;
        }

        // Info de entrega: costo de envío y tiempo
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
            const tiempoFooter = tiempoBox.querySelector('footer');

            if (tiempoHeader) {
                tiempoHeader.textContent = minutos ? `${minutos} min` : '—';
            }
            if (tiempoFooter) {
                // dejamos el texto original
            }
        }

        // Cambiar título de la pestaña
        document.title = `Chef Ya! | ${r.nombre}`;
    }

    // --- Cargar productos del restaurante ---

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

    function formatearPrecio(valor) {
        if (typeof valor !== 'number') return '$0.00';
        return `$${valor.toFixed(2)}`;
    }

    function renderProductos(productos) {
        listaProductosElem.innerHTML = ''; // limpiar

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

                try {
                    // 1) Obtener (o crear) carrito del usuario de prueba
                    const carritoResp = await fetch(`${API_BASE_URL}/carritos/usuario/${TEST_USER_ID}`);
                    if (!carritoResp.ok) {
                        console.error('Error al obtener/crear carrito:', carritoResp.status, carritoResp.statusText);
                        alert('No se pudo obtener el carrito del usuario.');
                        return;
                    }
                    const carrito = await carritoResp.json();
                    if (!carrito || !carrito.id) {
                        console.error('Respuesta de carrito inesperada:', carrito);
                        alert('No se pudo obtener el carrito del usuario.');
                        return;
                    }

                    const carritoId = carrito.id;

                    // 2) Agregar item al carrito
                    // CarritoItemCrear: { restauranteId, productoId, nombre, precio, cantidad }
                    const body = {
                        restauranteId: restauranteId,    // de la URL
                        productoId: prod.id,            // ajusta si tu API usa otro campo
                        nombre: prod.nombre,
                        precio: prod.precio,
                        cantidad: 1
                    };

                    const addResp = await fetch(`${API_BASE_URL}/carritos/${carritoId}/items`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    if (!addResp.ok) {
                        console.error('Error al agregar item al carrito:', addResp.status, addResp.statusText);
                        alert('No se pudo agregar el producto al carrito.');
                        return;
                    }

                    const carritoActualizado = await addResp.json();
                    console.log('Carrito actualizado:', carritoActualizado);
                    alert(`"${prod.nombre}" se agregó al carrito.`);
                } catch (err) {
                    console.error('Error de red al agregar producto al carrito:', err);
                    alert('Error de conexión al intentar agregar al carrito.');
                }
            });

            listaProductosElem.appendChild(card);
        });
    }

    // --- 1. Lógica del Toggle Entrega/Recolección ---

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

    // --- 2. Lógica del Botón "Pedir Ahora" ---

    if (orderButton) {
        orderButton.addEventListener('click', () => {
            if (!restauranteId) {
                alert('No se encontró el restaurante.');
                return;
            }
            console.log(`Iniciando pedido para restaurante ${restauranteId} con servicio de: ${deliveryType}`);

            // Podrías redirigir al menú o al carrito
            window.location.href = `menu.html?restauranteId=${restauranteId}&tipo=${encodeURIComponent(deliveryType)}`;
        });
    }

    // --- 3. Lógica del Botón de Favoritos ---

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

    cargarRestaurante();
});
