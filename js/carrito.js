document.addEventListener('DOMContentLoaded', async () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // === 0. Obtener usuario y parámetros de la URL ===
    const params = new URLSearchParams(window.location.search);

    let idUsuario = localStorage.getItem('usuario_id');
    if (!idUsuario) {
        idUsuario = params.get('id_usuario');
    }

    if (!idUsuario) {
        console.error('No se encontró usuario (ni en localStorage ni en la URL). Redirigiendo a login...');
        window.location.href = 'login.html';
        return;
    }

    const pagoExitoso = params.get('pago_exitoso');
    const carritoIdFromUrl = params.get('carritoId');

    let carritoActual = null;

    // === 1. Utilidades ===
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

        if (!carrito) {
            // Carrito nulo o indefinido --> mostrar todo en 0
            if (itemsCountSpan) itemsCountSpan.textContent = '0';
            if (subtotalSpan) subtotalSpan.textContent = '$0.00';
            if (shippingSpan) shippingSpan.textContent = '$0.00';
            if (totalSpan) totalSpan.textContent = '$0.00';
            return;
        }

        const monedaSymbol = obtenerSimboloMoneda(carrito.moneda || 'MXN');
        const totalItems = carrito.items.reduce((acc, item) => acc + item.cantidad, 0);

        carrito.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex gap-4 py-4 border-b border-gray-100';

            itemDiv.innerHTML = `
            <!-- Image -->
            <div class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                    src="${item.imagen || ''}" 
                    class="imagen-comida-carrito w-full h-full object-cover" 
                    alt="imagen comida"
                    onerror="this.style.display='none';"
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

    // === 2. Cargar carrito desde la API ===
    async function cargarCarrito() {
        if (!idUsuario) return;

        try {
            const response = await fetch(`${API_BASE_URL}/carritos/usuario/${idUsuario}`);

            if (!response.ok) {
                console.error('Error al obtener el carrito:', response.status, response.statusText);
                return;
            }

            carritoActual = await response.json();
            console.log('Carrito cargado:', carritoActual);
            renderCarrito(carritoActual);
        } catch (error) {
            console.error('Error de red al obtener el carrito:', error);
        }
    }

    // === 3. Vaciar carrito si venimos de un pago exitoso ===
    async function vaciarCarritoSiPagoExitoso() {
        if (pagoExitoso === '1' && carritoIdFromUrl) {
            try {
                console.log('Pago exitoso detectado. Vaciando carrito:', carritoIdFromUrl);

                const resp = await fetch(`${API_BASE_URL}/carritos/${carritoIdFromUrl}`, {
                    method: 'DELETE',
                });

                if (!resp.ok) {
                    console.error('Error al vaciar carrito tras pago exitoso:', resp.status, resp.statusText);
                    // Igual seguimos, pero mostramos el carrito luego
                    return;
                }

                const carritoVacio = await resp.json();
                carritoActual = carritoVacio;
                renderCarrito(carritoVacio);

                alert('¡Pago procesado correctamente! Tu carrito ha sido vaciado.');
            } catch (error) {
                console.error('Error de red al vaciar carrito tras pago exitoso:', error);
            }
        }
    }

    // === 4. Flujo inicial al cargar la página ===
    // 4.1. Si venimos de un pago exitoso, intentamos vaciar el carrito primero
    await vaciarCarritoSiPagoExitoso();

    // 4.2. Si todavía no tenemos carritoActual (no venía de pago exitoso), lo cargamos normalmente
    if (!carritoActual) {
        await cargarCarrito();
    }

    // === 5. Lógica de aplicar cupón (delegación de eventos) ===
    document.addEventListener('click', async (event) => {
        const target = event.target;

        if (target && target.id === 'apply-coupon-btn') {
            console.log('Click en botón "Aplicar cupón"');

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
                console.log('Aplicando cupón con código:', codigo);
                const resp = await fetch(`${API_BASE_URL}/carritos/${carritoActual.id}/cupon`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ codigo }),
                });

                console.log('Respuesta al aplicar cupón, status:', resp.status);

                if (!resp.ok) {
                    console.error('Error al aplicar cupón:', resp.status, resp.statusText);
                    alert('El cupón no es válido, ha expirado o no existe.');
                    return;
                }

                const carritoActualizado = await resp.json();
                console.log('Carrito actualizado tras aplicar cupón:', carritoActualizado);

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

    // === 6. Lógica de interacción en sección ENVÍO (opcional) ===
    const envioSection = document.querySelector('.checkout-section-envio');
    if (envioSection) {
        envioSection.addEventListener('click', () => {
            console.log('Click en sección ENVÍO. Aquí podrías abrir un modal para editar dirección.');
        });
    }

    // === 7. Lógica de Finalización del Pedido con Stripe ===
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener('click', async () => {
            console.log('Iniciando proceso de "Hacer pedido" con Stripe...');

            if (!carritoActual || !carritoActual.id || !Array.isArray(carritoActual.items) || carritoActual.items.length === 0) {
                alert('Tu carrito está vacío o no se pudo cargar correctamente.');
                return;
            }

            try {
                const basePath = `${window.location.origin}${window.location.pathname}`;
                const successUrl = `${basePath}?pago_exitoso=1&carritoId=${encodeURIComponent(
                    carritoActual.id
                )}&session_id={CHECKOUT_SESSION_ID}`;
                const cancelUrl = basePath;

                const response = await fetch(`${API_BASE_URL}/pagos/stripe/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        carritoId: carritoActual.id,
                        successUrl,
                        cancelUrl,
                    }),
                });

                if (!response.ok) {
                    console.error('Error al crear sesión de Stripe Checkout:', response.status, response.statusText);
                    alert('No se pudo iniciar el pago. Intenta de nuevo.');
                    return;
                }

                const data = await response.json();
                console.log('Stripe Checkout URL:', data.checkoutUrl);

                // Redirigir a Stripe Checkout
                window.location.href = data.checkoutUrl;
            } catch (error) {
                console.error('Error de red o servidor al iniciar Stripe:', error);
                alert('Error de conexión al intentar iniciar el pago.');
            }
        });
    }
});
