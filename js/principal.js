document.addEventListener('DOMContentLoaded', () => {
    const asideCartas = document.querySelectorAll('.cartas');
    
    // Función de ejemplo para renderizar una tarjeta de restaurante (tarjeta)
    function createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.className = 'tarjeta';
        card.setAttribute('data-id', restaurant.id); 
        card.innerHTML = `
            <img src="${restaurant.imageUrl}" alt="Imagen del restaurante">
            <h2>${restaurant.name}</h2>
            
            <div class="card-mobile-info">
                <div class="card-info-top">
                    <span class="card-time">${restaurant.deliveryTime} min</span>
                    <span class="card-rating">${restaurant.rating} ★</span>
                </div>
                <p class="card-cost">Costo de envío: $${restaurant.shippingCost}MXN</p>
            </div>
            
            <button class="card-order-button-desktop">Ordenar ahora</button>
        `;

        card.addEventListener('click', (e) => {
            // Evitar que el click en el botón active el evento de la tarjeta
            if (!e.target.classList.contains('card-order-button-desktop')) {
                // Redirigir a la página del restaurante
                window.location.href = `restaurante.html?id=${restaurant.id}`;
            }
        });

        // Manejar el botón "Ordenar ahora" (desktop)
        card.querySelector('.card-order-button-desktop').addEventListener('click', () => {
             console.log(`Iniciando pedido para ${restaurant.name} (ID: ${restaurant.id})`);
             // Lógica para añadir un ítem por defecto o redirigir a la página de menú
             window.location.href = `restaurante.html?id=${restaurant.id}`;
        });
        
        return card;
    }


    /**
     * Función para obtener datos de restaurantes del backend
     */
    async function fetchRestaurants() {
        console.log('Obteniendo lista de restaurantes...');
        const apiUrl = '/api/v1/restaurants'; // Endpoint hipotético de FastAPI
        
        // Datos simulados (reemplazar con la llamada fetch)
        const dummyRestaurants = [
            { id: 1, name: 'La Antigua', imageUrl: './assets/images/Antigua.jpg', deliveryTime: '25-35', rating: '4.7', shippingCost: '15.00' },
            { id: 2, name: 'Coffe Surf', imageUrl: './assets/images/Coffe-surf.jpg', deliveryTime: '15-25', rating: '4.9', shippingCost: '0.00' },
            { id: 3, name: 'Sabor a la mesa', imageUrl: './assets/images/Coffe-surf.jpg', deliveryTime: '30-40', rating: '4.1', shippingCost: '35.00' },
        ];
        
        // La estructura HTML de principal.html tiene 2 secciones de .cartas, usaremos los mismos datos
        asideCartas.forEach((cartasContainer) => {
            // Limpiar el contenido existente (simulado)
            const existingCards = cartasContainer.querySelectorAll('.tarjeta');
            existingCards.forEach(card => card.remove());

            // Renderizar las nuevas tarjetas
            dummyRestaurants.forEach(restaurant => {
                const newCard = createRestaurantCard(restaurant);
                // Insertar antes del header, ya que el header es el primer elemento en el grid
                cartasContainer.appendChild(newCard); 
            });
        });

        // En un escenario real, aquí iría el try...catch con fetch(apiUrl)
        /*
        try {
             const response = await fetch(apiUrl);
             const restaurants = await response.json();
             // ... lógica de renderizado con los datos reales ...
        } catch (error) {
             console.error('No se pudieron cargar los restaurantes:', error);
        }
        */
    }

    // Inicializar la carga de restaurantes
    fetchRestaurants();
    
    // --- Lógica de Filtros y Búsqueda ---
    const searchBar = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filtros button');
    
    // Simulación de búsqueda
    if (searchBar) {
        searchBar.closest('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchBar.value.trim();
            console.log(`Busqueda activada para: ${query}. (Llamar a /api/v1/restaurants/search)`);
            alert(`Simulación de búsqueda para: ${query}`);
            // Aquí iría una nueva llamada a fetchRestaurants(query)
        });
    }

    // Simulación de filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterText = button.textContent;
            console.log(`Filtro activado: ${filterText}. (Llamar a /api/v1/restaurants?filter=...)`);
            alert(`Simulación de filtro: ${filterText}`);
            // Aquí iría una nueva llamada a fetchRestaurants(filter)
        });
    });

    // --- Lógica de Navegación (mobile) ---
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                console.log(`Navegación móvil a: ${link.textContent}`);
                // Lógica para cambiar la vista o cargar datos diferentes
            });
        });
    }
});