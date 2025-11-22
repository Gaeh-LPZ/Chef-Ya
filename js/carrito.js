// ./js/carrito.js
document.addEventListener('DOMContentLoaded', async () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const checkoutSections = document.querySelectorAll('.group.hover\\:bg-gray-50'); // Envío, Pago

    // === 0. Obtener id_usuario desde el query string ===
    // Ejemplo de URL: pago.html?id_usuario=123
    const params = new URLSearchParams(window.location.search);
    const idUsuario = params.get('id_usuario');

    if (!idUsuario) {
        console.error('No se encontró el parámetro "id_usuario" en la URL.');
        // Podrías mostrar un mensaje al usuario aquí si quieres
    }

    // Si tu API está en el mismo dominio/puerto que el frontend, deja esto vacío.
    // Si no, pon algo tipo: 'http://localhost:8000'
    const API_BASE_URL = 'http://localhost:8000';

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
            const carrito = await response.json();
            renderCarrito(carrito);
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
            // Por ahora lo dejo similar a tu ejemplo original.
            const apiUrl = '/api/v1/orders/create'; // Ajusta a tu endpoint real cuando lo tengas

            const orderDetails = {
                carritoId: null,
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
