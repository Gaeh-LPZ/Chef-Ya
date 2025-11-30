document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://chef-ya-api.onrender.com'; // O tu localhost:8000 si pruebas local
    const locationForm = document.querySelector('.Formulario');

    const inputUbicacion = document.getElementById('input-ubicacion');
    const boxSugerenciasUbicacion = document.getElementById('sugerencias-ubicacion');
    let debounceTimer;

    if (inputUbicacion && boxSugerenciasUbicacion) {
        
        inputUbicacion.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Limpiar timer anterior si sigue escribiendo
            clearTimeout(debounceTimer);
            
            // Ocultar si está vacío
            if (query.length < 4) {
                boxSugerenciasUbicacion.style.display = 'none';
                return;
            }

            // Esperar 500ms antes de llamar a la API (Debounce)
            debounceTimer = setTimeout(async () => {
                try {
                    const url = `${API_BASE_URL}/ubicacion/buscar?q=${encodeURIComponent(query)}`;
                    const resp = await fetch(url);
                    
                    if (resp.ok) {
                        const resultados = await resp.json();
                        mostrarSugerenciasUbicacion(resultados);
                    }
                } catch (error) {
                    console.error("Error buscando sugerencias:", error);
                }
            }, 500);
        });

        // Ocultar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!inputUbicacion.contains(e.target) && !boxSugerenciasUbicacion.contains(e.target)) {
                boxSugerenciasUbicacion.style.display = 'none';
            }
        });
    }

    function mostrarSugerenciasUbicacion(lista) {
        boxSugerenciasUbicacion.innerHTML = ''; // Limpiar

        if (lista.length === 0) {
            boxSugerenciasUbicacion.style.display = 'none';
            return;
        }

        lista.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            
            // Mostramos la dirección completa formateada
            // Usamos un tamaño de letra pequeño para que quepa bien
            div.innerHTML = `
                <div style="font-size: 0.9rem; font-weight: bold;">${item.calle || item.direccion_completa.split(',')[0]}</div>
                <div style="font-size: 0.75rem; color: #666;">${item.ciudad}, ${item.estado}</div>
            `;

            div.addEventListener('click', () => {
                // 1. Rellenar input
                inputUbicacion.value = item.direccion_completa;
                
                // 2. Guardar directamente la data validada (ya la tenemos, no hace falta validar de nuevo)
                localStorage.setItem('ubicacion_usuario', JSON.stringify(item));
                
                // 3. Ocultar caja
                boxSugerenciasUbicacion.style.display = 'none';

                // 4. (Opcional) Redirigir automáticamente o avisar
                console.log("Ubicación seleccionada:", item);
                alert(`Ubicación establecida: ${item.calle}`);
                window.location.href = 'principal.html'; 
            });

            boxSugerenciasUbicacion.appendChild(div);
        });

        boxSugerenciasUbicacion.style.display = 'block';
    }

    async function searchLocation(address) {
        console.log(`Validando ubicación manual: ${address}`);
        const url = `${API_BASE_URL}/ubicacion/validar?q=${encodeURIComponent(address)}`;
        
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('ubicacion_usuario', JSON.stringify(data));
                window.location.href = 'principal.html'; 
            } else {
                alert('No pudimos encontrar esa dirección exacta. Intenta seleccionar una de las sugerencias.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const address = inputUbicacion.value.trim();
            if (address) {
                searchLocation(address);
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
                        
                        const slug = cat.nombre || cat.slug; // por si acaso
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
