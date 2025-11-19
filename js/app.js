document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.querySelector('.Formulario');

    /**
     * Función para simular el envío de la dirección al backend (FastAPI)
     * y redirigir a la página principal si tiene éxito.
     * @param {string} address - La dirección ingresada por el usuario.
     */
    async function searchLocation(address) {
        console.log(`Buscando ubicación para: ${address}`);
        const apiUrl = '/api/v1/location/search'; // Endpoint hipotético de FastAPI
        
        try {
            // Simulación de una llamada POST al backend
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: address }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Ubicación establecida con éxito:', data);
                // Redirigir a la página principal (principal.html)
                window.location.href = 'principal.html'; 
            } else {
                console.error('Error al establecer la ubicación:', response.statusText);
                alert('No se pudo encontrar la ubicación. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error de red o servidor:', error);
            alert('Error de conexión. Por favor, verifica tu conexión a internet.');
        }
    }

    // Listener para el formulario de búsqueda de ubicación
    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const locationInput = locationForm.querySelector('input[name="ubicacion"]');
            const address = locationInput.value.trim();

            if (address) {
                searchLocation(address);
            } else {
                alert('Por favor, ingresa una dirección.');
            }
        });
    }

    // Lógica adicional: Botón "HAZ CLICK PARA VER MÁS" (mobile)
    const ctaMore = document.querySelector('.cta-more');
    if (ctaMore) {
        ctaMore.addEventListener('click', () => {
            // En la versión mobile, al no haber categorías visibles, el botón 
            // puede redirigir directamente a la página principal después de ingresar ubicación.
            // Para este ejemplo, solo simularemos un mensaje.
            alert('Por favor, ingresa tu dirección para ver los restaurantes disponibles.');
        });
    }
});