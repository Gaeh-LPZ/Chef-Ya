document.addEventListener('DOMContentLoaded', () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const checkoutSections = document.querySelectorAll('.group.hover\\:bg-gray-50'); // Envío, Pago

    // --- 1. Lógica de Interacción en Secciones (Envío, Pago) ---
    checkoutSections.forEach(section => {
        section.addEventListener('click', () => {
            const sectionName = section.querySelector('span:first-child').textContent.trim();
            console.log(`Click en sección: ${sectionName}. Redirigir o mostrar modal de edición.`);
            
            // Lógica para navegar a la página de edición de dirección o método de pago
            // window.location.href = `edit-${sectionName.toLowerCase()}.html`;
        });
    });

    // --- 2. Lógica de Finalización del Pedido ---
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener('click', async () => {
            console.log('Iniciando proceso de "Hacer pedido"...');

            // Recoger la información del pedido (simulación)
            const orderDetails = {
                items: [
                    { name: 'Agua de frutos rojos', price: 40.00, quantity: 1, restaurant: 'La Antigua' },
                    { name: 'Calzone', price: 120.00, quantity: 1, restaurant: 'La Antigua' },
                ],
                subtotal: 160.00,
                shipping_cost: 32.00,
                total: 192.00,
                address_id: 123, // ID de la dirección seleccionada
                payment_method_id: 456, // ID del método de pago
            };

            const apiUrl = '/api/v1/orders/create'; // Endpoint hipotético de FastAPI

            try {
                // Envío de la información del pedido al backend
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
                    alert(`¡Tu pedido (${result.order_id || 'simulado'}) ha sido realizado con éxito!`);
                    // Redirigir a la página de confirmación de pedido
                    // window.location.href = `order-confirmation.html?id=${result.order_id}`;
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