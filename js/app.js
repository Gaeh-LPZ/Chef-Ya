document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com'; // O tu localhost:8000 si pruebas local
    const locationForm = document.querySelector('.Formulario');

    async function searchLocation(address) {
        console.log(`Validando ubicación: ${address}`);
        
        // Cambiamos a GET y usamos el endpoint real
        const url = `${API_BASE_URL}/ubicacion/validar?q=${encodeURIComponent(address)}`;
        
        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log('Ubicación encontrada:', data);
                
                // 1. GUARDAR EN LOCALSTORAGE
                // Guardamos el objeto completo para usarlo en otras páginas
                localStorage.setItem('ubicacion_usuario', JSON.stringify(data));

                alert(`Ubicación establecida: ${data.calle || data.direccion_completa}`);
                
                // 2. REDIRIGIR
                window.location.href = 'principal.html'; 
            } else {
                console.warn('Dirección no encontrada');
                alert('No pudimos encontrar esa dirección. Intenta ser más específico (ej: Calle, Ciudad).');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de conexión al validar la ubicación.');
        }
    }

    // Listener del formulario (sin cambios mayores, solo llama a la nueva función)
    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ojo: en tu HTML el input tiene name="ubicacion"
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
            alert('Por favor, ingresa tu dirección para ver los restaurantes disponibles.');
        });
    }

    const inputCategorias = document.getElementById('input-categorias');
    const boxSugerencias = document.getElementById('sugerencias-categorias');
    let listaCategorias = []; // Aquí guardaremos las categorías de la BD

    // 1. Cargar las categorías desde el backend al iniciar
    async function cargarCategorias() {
        try {
            // Asegúrate de que tu backend esté corriendo en el puerto 8000
            const response = await fetch('https://chef-ya-api.onrender.com/categorias');
            if (response.ok) {
                const data = await response.json();
                // Tu endpoint devuelve objetos: { nombre: "...", slug: "..." }
                listaCategorias = data; 
                console.log('Categorías cargadas:', listaCategorias);
            }
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    }

    cargarCategorias();

    // 2. Escuchar lo que escribe el usuario
    if (inputCategorias && boxSugerencias) {
        inputCategorias.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            boxSugerencias.innerHTML = ''; // Limpiar sugerencias anteriores

            if (texto.length === 0) {
                boxSugerencias.style.display = 'none';
                return;
            }

            // Filtrar categorías que coincidan
            const coincidencias = listaCategorias.filter(cat => 
                cat.nombre.toLowerCase().includes(texto)
            );

            // Si hay coincidencias, las mostramos
            if (coincidencias.length > 0) {
                coincidencias.forEach(cat => {
                    const item = document.createElement('div');
                    item.classList.add('suggestion-item');
                    item.textContent = cat.nombre;

                    // Al hacer click en una sugerencia
                    item.addEventListener('click', () => {
                        inputCategorias.value = cat.nombre; // Rellenar el input
                        boxSugerencias.style.display = 'none'; // Ocultar caja
                        
                        const slug = cat.slug || cat.nombre; // por si acaso
                        window.location.href = `principal.html?categoria=${encodeURIComponent(slug)}`;
                    });

                    boxSugerencias.appendChild(item);
                });
                boxSugerencias.style.display = 'block';
            } else {
                boxSugerencias.style.display = 'none';
            }
        });

        // Ocultar si el usuario hace clic fuera
        document.addEventListener('click', (e) => {
            if (!inputCategorias.contains(e.target) && !boxSugerencias.contains(e.target)) {
                boxSugerencias.style.display = 'none';
            }
        });
    }
});
