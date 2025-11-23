// ./js/carrito.js
document.addEventListener('DOMContentLoaded', async () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const checkoutSections = document.querySelectorAll('.group.hover\\:bg-gray-50'); // Envío, Pago

    // NUEVO: referencias al input y botón de cupón
    const couponInput = document.getElementById('coupon-code');      // NUEVO
    const aplicarCuponBtn = document.getElementById('apply-coupon-btn'); // NUEVO

    // === 0. Obtener id_usuario desde localStorage o, en su defecto, desde el query string ===

    // NUEVO: intentamos primero desde localStorage
    let idUsuario = localStorage.getItem('usuario_id'); // NUEVO

    // NUEVO: si no está en localStorage, probamos con el query string (compatibilidad)
    if (!idUsuario) { // NUEVO
        const params = new URLSearchParams(window.location.search); // NUEVO
        idUsuario = params.get('id_usuario'); // NUEVO
    } // NUEVO

    // NUEVO: si aún no hay idUsuario, exigimos inicio de sesión
    if (!idUsuario) { // NUEVO
        console.error('No se encontró usuario (ni en localStorage ni en la URL). Redirigiendo a login...'); // NUEVO
        window.location.href = 'login.html'; // NUEVO
        return; // NUEVO
    } // NUEVO

    // Si tu API está en el mismo dominio/puerto que el frontend, deja esto vacío.
    // Si no, pon algo tipo: 'http://localhost:8000'
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // NUEVO: variable global para guardar el carrito actual
    let carritoActual = null; // NUEVO

    // === 1. Llamar a la API de carrito y pintar la vista ===
    async function cargarCarrito() {
        if (!idUsuario) return;

        try {
            const response = await fetch(`${API_BASE_URL}/carritos/usuario/${idUsuario}`);

            if (!response.ok) {
                console.error('Error al obtener el carrito:', response.status, response.statusText);
                return;
            }

            /** @type {import('./types').CarritoLeer} (si tuvieras types) */
            // MODIFICADO: guardamos el carrito en una variable global
            carritoActual = await response.json();              // MODIFICADO
            renderCarrito(carritoActual);                       // MODIFICADO
        } catch (error) {
            console.error('Error de red al obtener el carrito:', error);
        }
    }

    function obtenerSimboloMoneda(moneda) {
        // Ajusta según cómo manejes la moneda en tu API
        if (moneda === 'MXN') return '$';
        if (moneda === 'USD') return 'US$';
        return '$';
    }

    function renderCarrito(carrito) {
        const itemsContainer = document.getElementById('cart-items');
        const subtotalSpan = document.getElementById('subtotal-amount');
        const shippingSpan = document.getElementById('shipping-amount');
        const totalSpan = document.getElementById('total-amount');
        const itemsCountSpan = document.getElementById('cart-items-count');

        if (!itemsContainer) return;

        itemsContainer.innerHTML = ''; // limpiar items previos

        const monedaSymbol = obtenerSimboloMoneda(carrito.moneda);
        const totalItems = carrito.items.reduce((acc, item) => acc + item.cantidad, 0);

        // Pintar cada item del carrito
        carrito.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex gap-4 py-4 border-b border-gray-100';

            // Si luego agregas imagen y nombre de restaurante a tu API,
            // aquí puedes reemplazar el contenido correspondiente.
            itemDiv.innerHTML = `
            <!-- Image -->
            <div class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                    src="${item.imagen || ''}" 
                    class="imagen-comida-carrito" 
                    alt="imagen comida"
                >
            </div>
            
            <!-- Details -->
            <div class="flex-1 flex justify-between">
                <div class="flex flex-col justify-center">
                    <span class="text-xs text-gray-400 mb-1">
                        Restaurante ${item.restauranteId || ''}
                    </span>
                    <h3 class="text-sm font-medium text-gray-900">${item.nombre}</h3>
                    <span class="text-sm text-gray-500 mt-1">Cantidad: ${item.cantidad}</span>
                </div>
                <div class="font-medium text-sm pt-5 md:pt-0 flex items-center">
                    ${monedaSymbol}${item.subtotal.toFixed(2)}
                </div>
            </div>
            `;

            itemsContainer.appendChild(itemDiv);
        });

        // Actualizar totales
        if (itemsCountSpan) {
            itemsCountSpan.textContent = totalItems.toString();
        }
        if (subtotalSpan) {
            subtotalSpan.textContent = `${monedaSymbol}${carrito.subtotal.toFixed(2)}`;
        }
        if (shippingSpan) {
            shippingSpan.textContent = `${monedaSymbol}${carrito.tarifaEnvio.toFixed(2)}`;
        }
        if (totalSpan) {
            totalSpan.textContent = `${monedaSymbol}${carrito.total.toFixed(2)}`;
        }
    }

    // Cargar carrito al entrar a la página
    await cargarCarrito();

    // === 1.5 Aplicar cupón al carrito ===
    if (aplicarCuponBtn) { // NUEVO
        aplicarCuponBtn.addEventListener('click', async () => { // NUEVO
            if (!carritoActual || !carritoActual.id) { // NUEVO
                console.error('No hay carrito cargado para aplicar cupón'); // NUEVO
                alert('No se encontró un carrito para aplicar el cupón.'); // NUEVO
                return; // NUEVO
            } // NUEVO

            const codigo = couponInput ? couponInput.value.trim() : ''; // NUEVO
            if (!codigo) { // NUEVO
                alert('Por favor ingresa un código de cupón.'); // NUEVO
                return; // NUEVO
            } // NUEVO

            try { // NUEVO
                const resp = await fetch(`${API_BASE_URL}/carritos/${carritoActual.id}/cupon`, { // NUEVO
                    method: 'POST', // NUEVO
                    headers: { // NUEVO
                        'Content-Type': 'application/json', // NUEVO
                    }, // NUEVO
                    body: JSON.stringify({ codigo }), // NUEVO  (CarritoAplicarCuponRequest)
                }); // NUEVO

                if (!resp.ok) { // NUEVO
                    console.error('Error al aplicar cupón:', resp.status, resp.statusText); // NUEVO
                    // Aquí asumimos que si no es OK, el cupón es inválido / no existe
                    alert('El cupón no es válido, ha expirado o no existe.'); // NUEVO
                    return; // NUEVO
                } // NUEVO

                const carritoActualizado = await resp.json(); // NUEVO
                carritoActual = carritoActualizado; // NUEVO
                renderCarrito(carritoActualizado); // NUEVO

                if (couponInput) couponInput.value = ''; // NUEVO
                alert('¡Cupón aplicado correctamente!'); // NUEVO
            } catch (error) { // NUEVO
                console.error('Error de red al aplicar cupón:', error); // NUEVO
                alert('Hubo un error al aplicar el cupón. Intenta de nuevo.'); // NUEVO
            } // NUEVO
        }); // NUEVO
    } // NUEVO

    // === 2. Lógica de Interacción en Secciones (Envío, Pago) ===
    checkoutSections.forEach(section => {
        section.addEventListener('click', () => {
            const sectionName = section.querySelector('span:first-child').textContent.trim();
            console.log(`Click en sección: ${sectionName}. Redirigir o mostrar modal de edición.`);

            // Aquí podrías navegar a páginas específicas:
            // window.location.href = `edit-${sectionName.toLowerCase()}.html`;
        });
    });

    // === 3. Lógica de Finalización del Pedido (aún hipotética) ===
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener('click', async () => {
            console.log('Iniciando proceso de "Hacer pedido"...');

            // Aquí podrías usar la info real del carrito para crear el pedido.
            const apiUrl = '/api/v1/orders/create'; // Ajusta a tu endpoint real cuando lo tengas

            const orderDetails = {
                carritoId: carritoActual ? carritoActual.id : null, // MODIFICADO: usamos carritoActual si existe
                usuarioId: idUsuario,
                // Podrías incluir items, totales, dirección seleccionada, etc.
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Pedido realizado con éxito:', result);
                    alert(`¡Tu pedido (${result.order_id || 'sin id'}) ha sido realizado con éxito!`);
                } else {
                    console.error('Error al crear el pedido:', response.status, response.statusText);
                    alert('Error: No se pudo procesar tu pedido. Por favor, revisa tus datos de pago.');
                }
            } catch (error) {
                console.error('Error de red o servidor:', error);
                alert('Error de conexión al intentar realizar el pedido.');
            }
        });
    }
});
