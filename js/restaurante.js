// js/restaurante.js
document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:8000'; // ajusta si tu API tiene prefijo /api/v1

    // --- Helpers para URL y fetch ---

    // --- Lógica de Navegación de Header (Desktop/Tablet) ---
    const shoppingCartBtn = document.getElementById('shopping-cart');
    const userLoginBtn = document.getElementById('user-login');

    if (shoppingCartBtn) {
        shoppingCartBtn.addEventListener('click', () => {
            console.log('Navegando a la página de carrito.');
            window.location.href = 'carrito.html';
        });
    }

    if (userLoginBtn) {
        userLoginBtn.addEventListener('click', () => {
            console.log('Navegando a la página de login.');
            window.location.href = 'login.html';
        });
    }
    
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

    const imgBanner = document.querySelector(".imagen-restaurante-banner")
    const imgPerfil = document.querySelector('.restaurante-perfil');
    const tituloElem = document.querySelector('.info-general h2');
    const ratingElem = document.querySelector('.info-general .rating');
    const categoriasElem = document.querySelector('.info-general .categorias');
    const direccionElem = document.querySelector('.info-general .direccion');
    const descripcionElem = document.querySelector('.info-general .descripcion');

    const infoBoxes = document.querySelectorAll('.info-entrega .info-box'); // [0] envío, [1] tiempo

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

        // Endpoint: GET /restaurantes/id/{id}
        const url = `${API_BASE_URL}/restaurantes/${restauranteId}`;
        const datos = await fetchJson(url);

        if (!datos) {
            console.error('No se pudieron obtener los datos del restaurante');
            return;
        }

        restauranteActual = datos;
        rellenarDatosRestaurante(datos);
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
            const imagen_banner = r.imagen_banner || imgBanner.getAttribute("src")
            imgBanner.setAttribute("src", imagen_banner)
        }
        // Imagen de perfil (si en un futuro tu API tiene campo imagen)
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

        // Categorías (por ahora solo mostramos los ids/strings que vengan)
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
                // dejamos el texto original y solo lo ajustamos si quieres:
                // tiempoFooter.firstChild.nodeValue = 'Llegada estimada ';
            }
        }

        // Cambiar título de la pestaña
        document.title = `Chef Ya! | ${r.nombre}`;
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

            // Aquí podrías redirigir a la página del menú del restaurante
            // o iniciar el flujo de carrito.
            // Por ahora: redirigimos a una página hipotética menu.html
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

            // Por ahora mantenemos un toggle en el front.
            // Cuando tengas auth y endpoint real, aquí llamarías a:
            // POST /usuarios/{id_usuario}/favoritos/{id_restaurante}
            const isFavorite = favoriteButton.classList.toggle('is-favorite');
            const message = isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos';
            alert(message);

            // Si quieres cambiar el icono (por ejemplo, relleno/outline),
            // puedes agregar estilos en CSS para .is-favorite
        });
    }

    // --- Inicio: cargar datos del restaurante ---

    cargarRestaurante();
});
