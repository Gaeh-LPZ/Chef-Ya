document.addEventListener('DOMContentLoaded', async () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const checkoutSections = document.querySelectorAll('.group.hover\\:bg-gray-50');

    let idUsuario = localStorage.getItem('usuario_id');

    if (!idUsuario) {
        const params = new URLSearchParams(window.location.search);
        idUsuario = params.get('id_usuario');
    }

    if (!idUsuario) {
        console.error('No se encontró usuario (ni en localStorage ni en la URL). Redirigiendo a login...');
        window.location.href = 'login.html';
        return;
    }

    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    let carritoActual = null;

    // === 1. Llamar a la API de carrito y pintar la vista ===
    async function cargarCarrito() {
        if (!idUsuario) return;

        try {
            const response = await fetch(`${API_BASE_URL}/carritos/usuario/${idUsuario}`);

            if (!response.ok) {
                console.error('Error al obtener el carrito:', response.status, response.statusText);
                return;
            }

            carritoActual = await response.json();   // MODIFICADO: guardamos carrito
            console.log('Carrito cargado:', carritoActual); // DEBUG
            renderCarrito(carritoActual);
        } catch (error) {
            console.error('Error de red al obtener el carrito:', error);
        }
    }

    function obtenerSimboloMoneda(moneda) {
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

        carrito.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex gap-4 py-4 border-b border-gray-100';

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

    // === 1.5 Lógica de aplicar cupón (con delegación) ===
    document.addEventListener('click', async (event) => {
        const target = event.target;

        // Nos aseguramos de atrapar clicks en el botón de aplicar cupón
        if (target && target.id === 'apply-coupon-btn') {
            console.log('Click en botón "Aplicar cupón"'); // DEBUG

            const couponInput = document.getElementById('coupon-code');
            if (!couponInput) {
                console.error('No se encontró el input de cupón (#coupon-code)');
                alert('No se encontró el campo para el cupón.');
                return;
            }

            if (!carritoActual || !carritoActual.id) {
                console.error('No hay carrito cargado para aplicar cupón', carritoActual);
                alert('No se encontró un carrito para aplicar el cupón.');
                return;
            }

            const codigo = couponInput.value.trim();
            if (!codigo) {
                alert('Por favor ingresa un código de cupón.');
                return;
            }

            try {
                console.log('Aplicando cupón con código:', codigo); // DEBUG
                const resp = await fetch(`${API_BASE_URL}/carritos/${carritoActual.id}/cupon`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ codigo }), // CarritoAplicarCuponRequest
                });

                console.log('Respuesta al aplicar cupón, status:', resp.status); // DEBUG

                if (!resp.ok) {
                    console.error('Error al aplicar cupón:', resp.status, resp.statusText);
                    alert('El cupón no es válido, ha expirado o no existe.');
                    return;
                }

                const carritoActualizado = await resp.json();
                console.log('Carrito actualizado tras aplicar cupón:', carritoActualizado); // DEBUG

                carritoActual = carritoActualizado;
                renderCarrito(carritoActualizado);

                couponInput.value = '';
                alert('¡Cupón aplicado correctamente!');
            } catch (error) {
                console.error('Error de red al aplicar cupón:', error);
                alert('Hubo un error al aplicar el cupón. Intenta de nuevo.');
            }
        }
    });

    // === 2. Lógica de Interacción en Secciones (Envío, Pago) ===
    checkoutSections.forEach(section => {
        section.addEventListener('click', () => {
            const sectionNameElem = section.querySelector('span:first-child');
            const sectionName = sectionNameElem ? sectionNameElem.textContent.trim() : 'Sección';
            console.log(`Click en sección: ${sectionName}. Redirigir o mostrar modal de edición.`);
        });
    });

    // === 3. Lógica de Finalización del Pedido (aún hipotética) ===
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener('click', async () => {
            console.log('Iniciando proceso de "Hacer pedido"...');

            const apiUrl = '/api/v1/orders/create';

            const orderDetails = {
                carritoId: carritoActual ? carritoActual.id : null,
                usuarioId: idUsuario,
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
