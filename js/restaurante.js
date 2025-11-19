document.addEventListener('DOMContentLoaded', () => {
    const deliveryButtonsContainer = document.querySelector('.botones-tipo-pedido');
    const orderButton = document.querySelector('.btn-pedir');
    const favoriteButton = document.querySelector('.botones-banner button:first-child');

    let deliveryType = 'Entrega'; // Estado inicial

    // --- 1. Lógica del Toggle Entrega/Recolección ---
    if (deliveryButtonsContainer) {
        const buttons = deliveryButtonsContainer.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Eliminar la clase 'activo' de todos los botones
                buttons.forEach(btn => btn.classList.remove('activo'));
                
                // Agregar la clase 'activo' al botón clickeado
                button.classList.add('activo');
                
                deliveryType = button.textContent.trim();
                console.log(`Tipo de servicio seleccionado: ${deliveryType}`);

                // Aquí se podría actualizar la información de envío/tiempo de entrega
                // llamando a un endpoint del backend si fuera necesario
                // Ejemplo: fetch('/api/v1/restaurant/delivery-options', { method: 'POST', body: JSON.stringify({ type: deliveryType }) });
            });
        });
    }

    // --- 2. Lógica del Botón "Pedir Ahora" ---
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            console.log(`Iniciando pedido para el restaurante con servicio de: ${deliveryType}`);
            alert('Simulación: Redirigiendo a la selección de menú o al carrito.');
            // Redirigir a una página de menú o iniciar el flujo de pedido
            // window.location.href = `menu.html?restaurantId=${obtenerIdDelRestaurante()}`;
        });
    }

    // --- 3. Lógica del Botón de Favoritos ---
    if (favoriteButton) {
        favoriteButton.addEventListener('click', async () => {
            const restaurantId = 42; // ID simulado del restaurante (se obtendría de la URL o del HTML)
            const apiUrl = `/api/v1/user/favorites/toggle`; // Endpoint hipotético de FastAPI

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ restaurant_id: restaurantId }),
                });

                if (response.ok) {
                    const isFavorite = favoriteButton.classList.toggle('is-favorite');
                    const message = isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos';
                    console.log(message);
                    alert(message);
                    // Actualizar el SVG o el estilo para reflejar el estado (la clase .is-favorite debería tener estilos CSS)
                } else {
                    console.error('Error al actualizar favoritos');
                    alert('Error: No se pudo actualizar la lista de favoritos. ¿Necesitas iniciar sesión?');
                }

            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    }
});